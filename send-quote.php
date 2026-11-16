<?php
/**
 * Rock Art — quote request handler (plain PHP mail(), no SMTP password needed).
 *
 * Setup: change $TO_EMAIL below, upload this file next to index.html. That's it.
 * The browser form (js/forms.js) posts here with fetch() and expects a JSON reply.
 */

declare(strict_types=1);

// ───────────── Settings ─────────────
$TO_EMAIL    = 'info@rockart-eg.com';   // where quote requests are delivered
$SITE_NAME   = 'Rock Art';
$MIN_SECONDS = 3;                        // faster than this = bot
$MAX_PER_10M = 5;                        // requests allowed per IP every 10 minutes
// Sender must be an address on YOUR domain, otherwise mail goes to spam. Auto: no-reply@yourdomain
$host       = preg_replace('/^www\./i', '', strtolower(preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? 'localhost')));
$FROM_EMAIL = 'no-reply@' . $host;
// ─────────────────────────────────────

// Some shared hosts ship PHP without mbstring — tiny fallbacks keep the form working there.
if (!function_exists('mb_substr')) {
    function mb_internal_encoding(string $encoding): bool { return true; }
    function mb_strlen(string $s): int { return count(preg_split('//u', $s, -1, PREG_SPLIT_NO_EMPTY) ?: []); }
    function mb_substr(string $s, int $start, ?int $length = null): string
    {
        return implode('', array_slice(preg_split('//u', $s, -1, PREG_SPLIT_NO_EMPTY) ?: [], $start, $length));
    }
    function mb_encode_mimeheader(string $s, string $charset = 'UTF-8'): string { return '=?UTF-8?B?' . base64_encode($s) . '?='; }
}

mb_internal_encoding('UTF-8');
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
header('X-Content-Type-Options: nosniff');

function respond(int $status, array $payload): void
{
    http_response_code($status);
    echo json_encode($payload, JSON_UNESCAPED_UNICODE);
    exit;
}

/** One-line, trimmed, length-limited text. Strips control chars so headers can't be injected. */
function clean_line(?string $value, int $max): string
{
    $value = preg_replace('/[\x00-\x1F\x7F]+/u', ' ', (string) $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

/** Multi-line text, limited length, control chars (except newline) removed. */
function clean_text(?string $value, int $max): string
{
    $value = str_replace(["\r\n", "\r"], "\n", (string) $value);
    $value = preg_replace('/[\x00-\x09\x0B-\x1F\x7F]+/u', '', $value) ?? '';
    return mb_substr(trim($value), 0, $max);
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    header('Allow: POST');
    respond(405, ['ok' => false, 'error' => 'Method not allowed']);
}

// Only accept submissions coming from our own pages.
$origin = $_SERVER['HTTP_ORIGIN'] ?? '';
if ($origin !== '' && strcasecmp((string) parse_url($origin, PHP_URL_HOST), preg_replace('/:\d+$/', '', $_SERVER['HTTP_HOST'] ?? '')) !== 0) {
    respond(403, ['ok' => false, 'error' => 'Forbidden']);
}

// Honeypot: real visitors never see or fill this field. Pretend success so bots move on.
if (trim((string) ($_POST['website'] ?? '')) !== '') {
    respond(200, ['ok' => true]);
}

// Too-fast submissions are bots.
$started = (int) ($_POST['started'] ?? 0);
if ($started > 0 && (time() - intdiv($started, 1000)) < $MIN_SECONDS) {
    respond(429, ['ok' => false, 'error' => 'Too fast']);
}

// Simple per-IP rate limit (file in the system temp dir).
$ip       = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$rateFile = sys_get_temp_dir() . '/rockart_quote_' . md5($ip) . '.json';
$now      = time();
$hits     = [];
if (is_file($rateFile)) {
    $hits = json_decode((string) file_get_contents($rateFile), true) ?: [];
    $hits = array_values(array_filter($hits, static fn ($t) => is_int($t) && $t > $now - 600));
}
if (count($hits) >= $MAX_PER_10M) {
    respond(429, ['ok' => false, 'error' => 'Too many requests']);
}

// ───────────── Validate ─────────────
$name      = clean_line($_POST['name'] ?? '', 120);
$phone     = clean_line($_POST['phone'] ?? '', 30);
$email     = clean_line($_POST['email'] ?? '', 120);
$interest  = clean_line($_POST['interest'] ?? '', 120);
$region    = clean_line($_POST['region'] ?? '', 120);
$notes     = clean_text($_POST['notes'] ?? '', 2000);
$reference = preg_match('/^RA-\d{5}$/', (string) ($_POST['reference'] ?? '')) ? $_POST['reference'] : 'RA-' . random_int(10000, 99999);
$lang      = ($_POST['lang'] ?? 'ar') === 'en' ? 'en' : 'ar';

$digits = preg_replace('/[\s\-()+]/', '', $phone) ?? '';
if (mb_strlen($name) < 2 || !preg_match('/^\d{8,15}$/', $digits) || $interest === ''
    || ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL))) {
    respond(400, ['ok' => false, 'error' => 'Invalid input']);
}

// ───────────── Send ─────────────
$subject = "[$SITE_NAME] طلب عرض سعر $reference - $name";
$body = implode("\n", [
    "طلب عرض سعر جديد من الموقع ($reference)",
    str_repeat('-', 40),
    "الاسم:      $name",
    "الهاتف:     $phone",
    'البريد:     ' . ($email !== '' ? $email : '—'),
    "المطلوب:    $interest",
    "الموقع:     $region",
    "لغة الصفحة: $lang",
    '',
    'التفاصيل:',
    $notes !== '' ? $notes : '—',
    str_repeat('-', 40),
    'IP: ' . $ip,
    'Date: ' . date('Y-m-d H:i:s'),
]);

$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/plain; charset=UTF-8',
    'Content-Transfer-Encoding: 8bit',
    'From: ' . mb_encode_mimeheader($SITE_NAME, 'UTF-8') . " <$FROM_EMAIL>",
    'X-Mailer: PHP/' . PHP_VERSION,
];
if ($email !== '') {
    $headers[] = 'Reply-To: ' . $email;
}

$sent = @mail(
    $TO_EMAIL,
    mb_encode_mimeheader($subject, 'UTF-8'),
    $body,
    implode("\r\n", $headers),
    '-f' . $FROM_EMAIL
);

if (!$sent) {
    respond(500, ['ok' => false, 'error' => 'Mail failed']);
}

$hits[] = $now;
@file_put_contents($rateFile, json_encode($hits), LOCK_EX);

respond(200, ['ok' => true, 'reference' => $reference]);
