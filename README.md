Lenana Springs Garden - static website

Files:
- index.html - image-led landing page
- the-building.html - building, amenities and finishes
- neighborhood.html - Kilimani location story
- contact.html - enquiry and viewing page
- styles.css - shared responsive styling
- script.js - mobile navigation, modal and demo form handling
- sitemap.xml - search engine sitemap
- robots.txt - crawler instructions
- favicon.svg - browser/site icon

Images are bundled inside the site:
assets/images/

Each image has WebP variants:
- image.webp - desktop/high-resolution source
- image-800.webp - smaller mobile/tablet source

Preview locally:

python3 -m http.server --directory /Users/brianmunene/Desktop/LenanaSpringGarden/site 8000

Then visit:
http://localhost:8000

Before launch:
- Connect the enquiry forms to a backend, CRM or form service.
- Confirm the production domain. The current SEO metadata assumes https://lenanaspringsgarden.co.ke/.
- Configure long-lived cache headers for assets/images, styles.css, script.js and favicon.svg.
