# CONTENT_TODO — needs client confirmation

## Technical
- [ ] Block size: sources say 45 / 45.5 / 46 x 31 (and 48 x 31). Site shows nominal 20 x 30 x 45 cm +/-1 cm. One-line change: `LOCK_STONE_BLOCK_SIZE` in js/data.js.
- [ ] FRP pin diameter/length: removed "13 x 130 mm" (sources conflict with ⌀12 x 15 cm). Site says "2 FRP pins per block". MoS says 15 cm pins.
- [ ] Concrete fill design: "350 kg/m2" and "concrete every 60 cm" removed. Confirm the top-course concrete + FRP rod design.
- [ ] Footing width range: site says 20 cm x 60 cm per approved drawings (old "0.6-1.2 m" removed).
- [ ] Compressive strength (250 kg/cm2) and ASTM C140 / C1372-17 / HBRC certificates: removed, need lab reports.
- [ ] "ISO & ASTM" claim: only G-TEX ISO 9001:2015 and the geogrid test methods (ASTM D6637 / ISO 10319) are kept.
- [ ] Max wall height: "more than 12 m with proper soil reinforcement" (old "20 m" removed). Confirm.
- [ ] Brochure slide 4 (Arabic) still says 20 m: it is shown as an image only if still referenced; replace in P3.

## Company / claims
- [ ] Partner count "30+" removed; hero now says "15+ major projects". Confirm the number.
- [ ] Extra client names (Trustcom, Al-Badawi, Petrojet, Nile Valley, Al Sharif, Concord, AGCO, Nasr City Contracting, Intro Group): kept only in an UNVERIFIED comment in data.js.
- [ ] "First fiberglass bar plant in Africa / Middle East / Egypt": removed (UNVERIFIED comment). Need proof.
- [ ] Seashell Development: removed (not in portfolio, AI image).
- [ ] GRC & GRP (EN) vs GRB (client PDFs). Arabic: جي آر سي وجي آر بي.
- [ ] Phone: site keeps 01064611274 and 01153936569; the PDFs show 01112408811 as the second number.
- [ ] Email: info@rockart-eg.com is the primary email (already in COMPANY_INFO).

## Media
- [ ] Which project each WhatsApp photo belongs to (captions are generic on purpose).
- [ ] Videos are NOT in the repo copy I received: copy assets/videos/*.mp4 locally, then run `scripts/make-posters.sh <seconds>`; current posters are interim photos. For CompanyProfile pick a frame without the "coment" typo.
- [ ] COMPANY_VIDEO is used on the home page only (about.js has no video block); do not reuse it elsewhere.
- [ ] Permission for client logos and for the RAMLA/AZHA fence-wall drawing (NOT published).
- [ ] MoS drawings (block detail, reinforcement section, drainage and PC footing): embed only from a vector/high-res source.
- [ ] Cladding / planter product specs (sizes, finishes) were not verifiable from the PDFs.
- [ ] P3 not done: brochure slide images (Arabic text baked in) are still in the "face profiles" block. Replace with HTML cards from cropped illustrations.
- [ ] New project photos 04, 15, 20, 21, 27 resemble brochure photos with the "Tahya Misr 500 500" wall: probably Hospital 500500, UNCONFIRMED. Captions stay generic.
- [x] P3 done: face-profile cards now use 4 illustrations cropped from the brochure (prochor.pdf), no baked-in text. The 3 foundation/spec brochure slides were removed (content lives in the 4 stages).
- [ ] Still showing Arabic-text brochure slides: about.js (brochureSlide1About) and products.js (brochureSlide9/10). Handle in the About and Products page reviews.
- [ ] Hero background (all pages + OG image) is hero_retaining_wall_1794852048110.jpg, which is AI-generated. Kept by the site owner's decision; replace with a real photo when the client agrees.
- [ ] Company video poster is the logo (assets/images/logowithoutback.png), chosen by the owner.
- [ ] Planters / fountains / cladding product claims (sizes POT-01C etc., finishes, 'weather-resistant', E-209) are not in the client's PDFs. Home copy was softened; check Products and Projects pages.
- [ ] 'City Block' (EN, per fact sheet) vs 'سيتي بلاك' (AR, per the client's PDF): confirm the English spelling.
- [ ] Logo file logowithoutback.png has a typo ('Pructs'): ask the client for a corrected logo. The video poster uses only the logo mark, no text.
- [ ] Patent scope: removed 'mortise-and-tenon' wording; the brochure only says the blocks are registered under no. 2018/1412.
- [ ] EgyptianWall500500.png (used as the poster of the Tahya Misr video, in the curved-walls slider and later in Projects) looks like an AI-recreated image of the real wall. Confirm with the client or replace it with the real photo.
- [ ] Lock Stone page: 'Selected photos' captions are generic; the 500 500 caption only states the sign on a white Lock Stone wall.
- [ ] Basalt wording removed (not in the sources); banded wall is described as charcoal/terracotta courses.
- [ ] Products page: SKUs, dimensions (e.g. 50 x 20 cm tiles, POT sizes) and colour names come from the old catalog data and could not be verified from the PDFs. Descriptions were reduced to style + colour only; 'GRC / waterproof / UV / reinforced' wording removed. Product names invented by the site (e.g. 'Charcoal Noir', 'Smoked Manor Brick') need client confirmation.
- [ ] Catalog plates now use crops of brochure sheets 9 and 10 (Latin codes only). The curb/paver and GRC codes (1001-1008, 2001-2009) are the client's own.
- [ ] Removed projects: 'Brick Boundary Wall' (its photos were product swatches), 'Cast-Stone Planters' and 'Abu Rawash Showroom Garden' (same photo as the Products page, not delivered projects).
- [ ] Planters POT-01C / POT-04 / POT-01D no longer show a photo (the only photo was a fountain shared by 4 products); they show a colour swatch until the client sends real photos and confirms the sizes.
- [ ] About page: headline rewritten (no 'founded' / 'engineering office' claims). Showroom captions no longer say 'manufactured in-house' or 'hand-carved' (unverified). Confirm booth A16 details (event name, year) with the client.
- [ ] Contact page: working hours (Sat-Thu 9-5) were removed (not in sources). Add real hours if the client confirms them. Quote-form product options now include Cladding tiles, GRC & GRP works and Interlocking pavers & curbs.
- [ ] Removed the 3 planters without photos (POT-01C, POT-04, POT-01D). Re-add them when the client sends photos and confirms sizes. Home Lock Stone section now shows a 4-photo group instead of the 4 stages; the stage cards live only on the Lock Stone page.
