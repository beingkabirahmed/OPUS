# THE OPUS NETWORK website

A responsive, static multi-page website built with HTML, CSS and vanilla JavaScript. The original `D:\Opus portfolio` directory remains untouched.

## Pages

- `index.html` — home and company overview
- `about.html` — company story and operating principles
- `fleet.html` — swipeable five-model fleet catalogue and detail dialogs
- `ecosystem.html` — interactive Indofast, Mooving and Battery Smart network
- `services.html` — rider services, rental process and business partnerships
- `contact.html` — enquiry form and frequently asked questions

## Content and assets

`js/data.js` is the central source for vehicle specifications, battery ecosystem relationships, FAQs and contact links. The supplied enquiry form opens in Google Forms. Website styles are in `css/`; responsive behavior, motion, and reduced-motion support are included. Approved vehicle photos and logo assets are in `images/`.

The site has no build step or dependency installation. For a local preview, open `index.html` in a browser or serve this folder with a static web server. Google Fonts require an internet connection.

The shared Mineral / Volt design system lives in `css/theme-premium.css`. It keeps a soft mineral light palette and a layered charcoal dark palette, with OPUS orange and energy teal accents. The theme toggle preference is shared across pages.

Before publishing, confirm vehicle specifications and rental terms, complete the privacy notice, and update `sitemap.xml` and `robots.txt` with the public domain.
## Navigation

The site is split across the Home, About, Fleet, Battery Ecosystem, Services and Contact pages. The mobile drawer and saved light/dark theme are shared across the site.
