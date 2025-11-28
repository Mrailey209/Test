# The Golf Lab - Deployment Guide

A complete, single-page golf fitness website with workouts, mobility routines, range sessions, training gear reviews, and periodized programs.

**Live Site:** https://aquamarine-praline-0f4f0b.netlify.app/

---

## Auto-Deploy Setup (Recommended)

Connect your GitHub repo to Netlify for automatic deployments. Any push to GitHub will update your live site within 30 seconds.

### Step 1: Connect Netlify to GitHub

1. Log in to [Netlify](https://app.netlify.com)
2. Click your site (`aquamarine-praline-0f4f0b`)
3. Go to **Site settings** > **Build & deploy** > **Continuous deployment**
4. Click **Link site to Git**
5. Choose **GitHub** and authorize Netlify
6. Select this repository: `Mrailey209/Test`
7. Set build settings:
   - **Branch to deploy:** `main` (or your default branch)
   - **Build command:** (leave empty)
   - **Publish directory:** `/` or `.`
8. Click **Deploy site**

Now every push to GitHub automatically updates your website!

---

## Updating Products (Easy!)

Edit `products.json` to add, remove, or update products.

### Add a New Product

Open `products.json` and add a new product to any category:

```json
{
  "id": "newproduct",
  "name": "Product Name",
  "description": "Product description here.",
  "category": "Category Name",
  "rating": 4.5,
  "badge": "New Addition",
  "asin": "AMAZON-ASIN-HERE",
  "image": "https://m.media-amazon.com/images/I/XXXXX.jpg"
}
```

### Find Amazon ASIN

1. Go to the Amazon product page
2. Look in the URL for `/dp/XXXXXXXXXX/`
3. That 10-character code is the ASIN

### Find Amazon Product Image

1. Right-click the product image on Amazon
2. Select "Copy image address"
3. Use that URL in the `image` field

### Update Affiliate ID

Change the `affiliate_id` at the top of `products.json`:

```json
{
  "affiliate_id": "thegolflab08-20",
  ...
}
```

---

## Updating News (Weekly)

Edit `news.json` to update the news section.

### Add a New Article

```json
{
  "id": 7,
  "featured": false,
  "date": "December 1, 2024",
  "title": "Your News Headline Here",
  "summary": "A brief summary of the article (1-2 sentences).",
  "image": "https://images.unsplash.com/photo-XXXXX?w=600&h=300&fit=crop",
  "link": "https://example.com/full-article"
}
```

### Make an Article Featured

Set `"featured": true` for the main story (displayed larger at the top).

### Free Image Sources

- [Unsplash](https://unsplash.com) - Search "golf" for free images
- Add `?w=600&h=300&fit=crop` to any Unsplash URL to resize

---

## Quick Workflow

### To Update Products:

1. Edit `products.json`
2. Commit and push to GitHub
3. Site updates automatically in ~30 seconds

### To Update News:

1. Edit `news.json`
2. Commit and push to GitHub
3. Site updates automatically in ~30 seconds

### Using GitHub Web Interface:

1. Go to your repo on GitHub
2. Click on `products.json` or `news.json`
3. Click the pencil icon to edit
4. Make your changes
5. Click "Commit changes"
6. Done! Site updates automatically

---

## File Structure

```
/
├── index.html           # Main website
├── products.json        # Product data (edit this for products)
├── news.json            # News articles (edit this for news)
├── README.md            # This guide
├── content-database.md  # All workout/mobility content
└── newsletter-links.md  # Links for Beehiiv emails
```

---

## Section URLs

| Section | URL |
|---------|-----|
| Home | https://aquamarine-praline-0f4f0b.netlify.app/#home |
| News | https://aquamarine-praline-0f4f0b.netlify.app/#news |
| Workouts | https://aquamarine-praline-0f4f0b.netlify.app/#workouts |
| Mobility | https://aquamarine-praline-0f4f0b.netlify.app/#mobility |
| Range Sessions | https://aquamarine-praline-0f4f0b.netlify.app/#range |
| Gear | https://aquamarine-praline-0f4f0b.netlify.app/#gear |
| Programs | https://aquamarine-praline-0f4f0b.netlify.app/#programs |

---

## Amazon Affiliate Info

- **Affiliate ID:** `thegolflab08-20`
- **Products:** 14 total with affiliate links
- **FTC Disclosure:** Added to Gear section

---

## Customization

### Changing Colors

Edit the CSS variables in `index.html`:

```css
:root {
    --primary-green: #1a5336;
    --gold: #c9a227;
    --cream: #f8f6f0;
}
```

### Adding Google Analytics

Add before `</head>` in `index.html`:

```html
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

Built for golfers who want to train smarter and play better.
