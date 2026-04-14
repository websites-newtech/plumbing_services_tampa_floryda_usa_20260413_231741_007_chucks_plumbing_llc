# Chuck's Plumbing LLC — Website

A production-ready, 5-page static website for Chuck's Plumbing LLC, New York.

## Tech Stack

- Pure HTML5 (no framework)
- Custom CSS with CSS custom properties (no Tailwind, no Bootstrap)
- Vanilla JavaScript (no jQuery, no libraries)
- Google Fonts: Bebas Neue + Source Sans 3

## File Structure

```
website/
├── index.html          ← Home page
├── services.html       ← Services detail
├── about.html          ← About us
├── contact.html        ← Contact + form
├── privacy.html        ← Privacy policy
├── assets/
│   ├── css/
│   │   └── main.css
│   └── js/
│       └── main.js
├── design_decisions.md
└── README.md
```

## Deployment Options

### Option 1: GitHub Pages (Free — Recommended)

1. Create a new repository on GitHub (e.g. `chucks-plumbing`)
2. Push the contents of the `website/` folder to the repo root:
   ```bash
   cd website
   git init
   git add .
   git commit -m "Initial website deployment"
   git remote add origin https://github.com/YOUR_USERNAME/chucks-plumbing.git
   git push -u origin main
   ```
3. Go to **Settings → Pages → Source → Deploy from branch → main → / (root)**
4. Site will be live at `https://YOUR_USERNAME.github.io/chucks-plumbing/`

### Option 2: Netlify Drop (Fastest — 30 seconds)

1. Go to [https://app.netlify.com/drop](https://app.netlify.com/drop)
2. Drag and drop the entire `website/` folder onto the page
3. Your site is live instantly with a Netlify URL
4. Add a custom domain in **Site Settings → Domain Management**

### Option 3: Vercel

1. Install Vercel CLI: `npm install -g vercel`
2. From the `website/` directory: `vercel`
3. Follow the prompts — static sites deploy in seconds

### Option 4: Traditional cPanel / FTP Hosting

1. Log into your cPanel or FTP client
2. Navigate to `public_html/` (or your domain's root folder)
3. Upload all files from the `website/` folder, maintaining the folder structure
4. Ensure `index.html` is at the root level

### Option 5: Amazon S3 Static Hosting

1. Create an S3 bucket named after your domain
2. Enable static website hosting in bucket properties
3. Upload all files with public read permissions
4. Point your domain's DNS to the S3 endpoint

---

## Custom Domain Setup

After deploying, to use `chucksplumbing.com`:

1. **Netlify/Vercel:** Go to domain settings and add your custom domain. They provide DNS instructions.
2. **GitHub Pages:** Go to Settings → Pages → Custom domain → enter `chucksplumbing.com`
3. **DNS:** Update your registrar's DNS to point to your host's servers (instructions vary by host)

---

## After Deployment: Important Next Steps

### 1. Update Contact Form
The contact form currently simulates submission. To make it functional, integrate one of:
- **Formspree:** Replace form action with `https://formspree.io/f/YOUR_ID`
- **Netlify Forms:** Add `netlify` attribute to the `<form>` tag (auto-works on Netlify)
- **EmailJS:** Add EmailJS SDK to send emails client-side

**Formspree (easiest):**
```html
<form class="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
```

**Netlify Forms (if hosted on Netlify):**
```html
<form class="contact-form" netlify name="contact">
```

### 2. Replace Placeholder Contact Info
Update these values throughout all HTML files when real info is confirmed:
- Phone: `555-555-5555` → real number
- Email: `chuck@detarienterprises.com` → confirmed email
- Address: `1234 Street, New York, NY 10002` → confirmed address

### 3. Add Real Images (Optional but Recommended)
Place images in `assets/images/` and reference them in HTML. Suggested images:
- `hero-bg.jpg` — team at work or branded van
- `about-photo.jpg` — Chuck or team portrait
- `services-drain.jpg`, `services-pipe.jpg` — work in progress photos

### 4. Google Analytics (Optional)
Add before `</head>` on all pages:
```html
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

### 5. Google Search Console
After deploying to your real domain:
1. Go to [search.google.com/search-console](https://search.google.com/search-console)
2. Add property → verify ownership
3. Submit sitemap (create `sitemap.xml` with all page URLs)

---

## Browser Support

Tested and works in:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+
- iOS Safari 14+
- Android Chrome 90+

---

## Customization Guide

### Changing Colors
Edit CSS custom properties in `assets/css/main.css` at the top:
```css
:root {
  --color-amber: #f59e0b;      /* Main accent color */
  --color-dark: #111111;        /* Main background */
  --color-amber-dark: #d97706;  /* Darker amber for hovers */
}
```

### Changing Fonts
1. Update Google Fonts `<link>` in each HTML `<head>`
2. Update in `assets/css/main.css`:
```css
:root {
  --font-display: 'Your Display Font', sans-serif;
  --font-body: 'Your Body Font', sans-serif;
}
```

### Adding a Page
1. Copy `about.html` as a template
2. Update the `<title>`, `<meta name="description">`, and content
3. Update `aria-current="page"` on the correct nav link
4. Add link to navigation in all pages

---

## Performance Checklist

- [x] Google Fonts with `display=swap`
- [x] `defer` on JavaScript
- [x] No render-blocking resources
- [x] Zero layout shift (no images without dimensions)
- [x] Passive scroll listeners
- [x] `IntersectionObserver` for animations (no scroll jank)
- [x] CSS custom properties (no inline styles)
- [x] Semantic HTML throughout

---

*Built with care. Designed to convert.*