# VELTOR® — Step Into Greatness

A responsive, static luxury footwear storefront concept designed for GitHub Pages.

## Included
- Cinematic video hero with a photographic fallback
- Formal, smart-casual, boots and men's palms categories with subcategories
- Product cards, filters, search and a demo shopping bag
- Custom-build enquiry form
- Responsive desktop, tablet and mobile layouts
- GitHub Actions workflow for automatic GitHub Pages deployment

## Before publishing
1. Replace `assets/veltor-logo.png` if you have a higher-resolution transparent logo.
2. Replace `hello@veltor.example` in `script.js` with your real business email.
3. Confirm all product names and prices in `index.html`.
4. Confirm image/video licensing and replace demo stock URLs with assets you have permission to use.
5. The hero uses a remote Pexels video and a Pexels shoe photograph fallback. Remote media requires an internet connection and can be changed by the media host. For maximum reliability, download media you are licensed to use and store it in your own `assets/` folder.
6. The product and category photos use remote stock-image URLs with a fallback image handler. If your network blocks a stock-media host, replace the URL with a locally hosted licensed image.
6. Add a real commerce backend/payment provider and a real newsletter service before accepting online payments or subscriptions.

## Publish for free with GitHub Pages
1. Sign in to GitHub and create a **public** repository named `veltor-footwear`.
2. Upload all files and folders from this project (including `.github/workflows/deploy.yml`) to the repository's `main` branch.
3. Open **Settings → Pages**.
4. Under **Build and deployment → Source**, choose **GitHub Actions**.
5. Open the **Actions** tab and wait for **Deploy VELTOR website to GitHub Pages** to finish successfully.
7. Your site will be available at `https://YOUR-USERNAME.github.io/veltor-footwear/` (replace `YOUR-USERNAME` with your GitHub username).
8. When you update files and commit to `main`, GitHub Actions will publish the changes again.

## Important limitations
GitHub Pages hosts static files. The bag is a browser-only demo and does not process payments or save orders centrally. The custom-build form opens the visitor's email app and newsletter form is a visual demo until connected to services. Do not present demo prices as confirmed offers.
