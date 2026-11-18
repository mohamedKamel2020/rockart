#!/usr/bin/env bash
# Run locally where the videos exist: extracts one poster frame per video (needs ffmpeg).
# Pick a CompanyProfile timestamp that does NOT show the "coment" typo (e.g. achievements / Lock Stone slide).
set -e
cd "$(dirname "$0")/.."
ffmpeg -y -ss "${1:-12}" -i assets/videos/CompanyProfile.mp4 -frames:v 1 -vf scale=1280:-2 -q:v 3 assets/images/posters/company-profile.jpg
ffmpeg -y -ss 5 -i "assets/videos/شرح شركه روك ارت.mp4" -frames:v 1 -vf scale=1280:-2 -q:v 3 assets/images/posters/tahya-misr-engineering.jpg
ffmpeg -y -ss 5 -i "assets/videos/فيديو تعريفي للحوائط لوك ستون.mp4" -frames:v 1 -vf scale=1280:-2 -q:v 3 assets/images/posters/lock-stone-intro.jpg
