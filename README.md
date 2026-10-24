# Alignment Worship Experience: volunteer registration

A single-page form for Alignment Worship Experience (Ibadan, Sunday 22nd November 2026, 3:00pm WAT).
Open `index.html` in a browser, or host the folder on any static host (GitHub Pages, Netlify, Vercel).

## Files

| File | Purpose |
|---|---|
| `index.html` | The page: flyer, three-step form, thank-you screen |
| `alignment-flyer.jpg`, `alignment-flyer.webp` | The flyer (the page uses WebP and falls back to JPG) |
| `google-apps-script.gs` | Saves each registration to a Google Sheet |

## Connect it to a Google Sheet (needed before it can save anything)

1. Create a new Google Sheet.
2. Open **Extensions > Apps Script**, delete the sample code, and paste in `google-apps-script.gs`. Save.
3. Select **Deploy > New deployment > Web app**.
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Select **Deploy**, approve the permissions, and copy the **Web app URL**.
5. In `index.html`, replace `PASTE_YOUR_GOOGLE_APPS_SCRIPT_WEB_APP_URL_HERE` with that URL.
6. Submit a test registration. A **Volunteers** tab with a header row is created on the first submission.

If you change the script later, use **Deploy > Manage deployments > Edit > New version** so the URL stays the same.

## Good to know

- A second registration with the same email address is refused and the person is told why.
- All questions are required except "Is there anything else you would like the organising team to know?".
- Until the Web app URL is added, submitting shows a "not connected" message instead of a false success.
- The old Tribesmen script URL and bed-allocation logic were removed. This form does not use them.
