# The Golf Lab - Deployment Guide

A complete, single-page golf fitness website with workouts, mobility routines, range sessions, training gear reviews, and periodized programs.

## Quick Start (5 Minutes)

### Option 1: Netlify (Recommended - FREE)

1. Go to [netlify.com](https://netlify.com) and sign up for a free account
2. From the dashboard, click "Add new site" > "Deploy manually"
3. Drag and drop the `index.html` file onto the upload area
4. Your site is live! You'll get a URL like `golf-lab-abc123.netlify.app`

### Option 2: GitHub Pages (FREE)

1. Create a new repository on GitHub
2. Upload `index.html` to the repository
3. Go to Settings > Pages
4. Select "main" branch and save
5. Your site will be at `yourusername.github.io/repo-name`

### Option 3: Vercel (FREE)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click "New Project" > "Import" your GitHub repo or upload files
3. Deploy with one click
4. Get a URL like `golf-lab.vercel.app`

## Custom Domain Setup (Optional)

### Purchasing a Domain (~$12/year)

Recommended registrars:
- [Namecheap](https://namecheap.com)
- [Google Domains](https://domains.google)
- [Cloudflare](https://cloudflare.com/products/registrar)

Suggested domains:
- `thegolflab.com`
- `golflab.co`
- `golflabnewsletter.com`

### Connecting to Netlify

1. In Netlify, go to "Domain settings"
2. Click "Add custom domain"
3. Enter your domain name
4. Add the DNS records Netlify provides to your domain registrar
5. Wait 24-48 hours for DNS propagation

## Newsletter Integration (Beehiiv)

### Setting Up Beehiiv

1. Sign up at [beehiiv.com](https://beehiiv.com) (free tier available)
2. Create your publication "The Golf Lab"
3. Customize your branding to match the website colors:
   - Primary Green: `#1a5336`
   - Gold Accent: `#c9a227`

### Embedding the Signup Form

Replace the newsletter form in `index.html` with your Beehiiv embed code:

```html
<!-- Find this section in index.html -->
<form class="newsletter-form" onsubmit="handleNewsletter(event)">
    <input type="email" placeholder="Enter your email" required>
    <button type="submit">Subscribe Free</button>
</form>

<!-- Replace with Beehiiv embed -->
<iframe
    src="https://embeds.beehiiv.com/YOUR-PUBLICATION-ID"
    data-test-id="beehiiv-embed"
    width="100%"
    height="52"
    frameborder="0"
    scrolling="no"
    style="border-radius: 6px; background-color: transparent;">
</iframe>
```

## Section URLs for Newsletters

Use these URLs in your Beehiiv newsletters to link to specific content:

| Section | URL Path | Use Case |
|---------|----------|----------|
| Home | `yourdomain.com/#home` | General landing |
| Workouts | `yourdomain.com/#workouts` | Weekly workout emails |
| Mobility | `yourdomain.com/#mobility` | Mobility tip emails |
| Range Sessions | `yourdomain.com/#range` | Practice plan emails |
| Gear Reviews | `yourdomain.com/#gear` | Product recommendation emails |
| Programs | `yourdomain.com/#programs` | Program overview emails |

## Website Features

### 6 Complete Sections

1. **Home** - Hero banner, stats, content cards, newsletter signup
2. **Workouts** - 4 complete programs (Lower Body, Upper Body, Rotational, Full Body)
3. **Mobility** - 4 routines (T-Spine, Hips, Shoulders, Full Pre-Round)
4. **Range Sessions** - 4 practice plans (Driver, Irons, Short Game, Complete)
5. **Training Gear** - 12+ product reviews in 4 categories
6. **Programs** - 4-month periodization timeline

### Technical Features

- Single HTML file (no server required)
- Mobile responsive design
- URL hash routing for deep linking
- Tab navigation within sections
- Research citations throughout
- Professional green/gold color scheme

## Customization

### Changing Colors

Edit the CSS variables at the top of `index.html`:

```css
:root {
    --primary-green: #1a5336;      /* Main brand color */
    --primary-green-light: #2d7a4e;
    --primary-green-dark: #0f3321;
    --gold: #c9a227;               /* Accent color */
    --gold-light: #e6c45c;
    --gold-dark: #9a7b1c;
    --cream: #f8f6f0;              /* Background */
}
```

### Adding New Content

Each section uses a consistent structure. To add a new workout:

1. Find the workouts section in the HTML
2. Copy an existing `<div class="program-card">` block
3. Modify the content
4. Add a new tab button if needed

### Adding Analytics

Add Google Analytics before the closing `</head>` tag:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

## File Structure

```
/
├── index.html           # Complete website (single file)
├── README.md            # This deployment guide
├── content-database.md  # All content in markdown format
└── newsletter-links.md  # Copy-paste links for emails
```

## Support

For questions about:
- **Deployment**: Check Netlify/Vercel documentation
- **Newsletter**: Beehiiv help center
- **Customization**: Edit the HTML/CSS directly

## License

This template is provided for personal and commercial use. Customize it for your golf newsletter or fitness brand.

---

Built for golfers who want to train smarter and play better.
