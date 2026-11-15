# CorSentri homepage

A responsive Next.js App Router homepage, built with TypeScript and custom CSS. The homepage uses CorSentri's supplied logo files, Inter typography, and photography from the existing CorSentri Webflow site.

## Run locally

```sh
npm ci
npm run dev
```

Open http://localhost:3000.

## Production

```sh
npm run typecheck
npm run build
```

The production build is a static export in `out/`, ready for static hosting. `npm start` is not used for static exports; serve `out/` with a static web server.

## Brand and design

Brand-book colors (slide 18): ink `#0F1512`, forest `#263931`, sage `#92A297`, ivory `#E8E8E1`. Supplied SVG artwork is preserved as delivered; some SVG colors differ slightly from the brand book.

The design uses large editorial typography, alternating dark and light sections, a CSS animated orbital brand sculpture, scroll reveals, a weekly coverage visualization, a service accordion, accessible process tabs, FAQs, and a responsive menu. Motion respects the operating system reduced-motion preference; an additional pause control is provided in the hero. Fonts and images are served locally. There is no analytics or tracking integration.

## Scope

Only the homepage is implemented. Navigation to homepage sections stays local. Consultation, risk assessment, pricing, full solutions, industry details, articles and legal links point to the existing https://corsentri.webflow.io site. No new form backend, CMS, Calendly integration or additional pages are included.

## Main files

- `app/page.tsx`: homepage content and interactions
- `app/globals.css`: brand tokens, responsive layouts and animation
- `app/layout.tsx`: fonts and metadata
- `public/brand/`: supplied brand SVGs
- `public/images/`: existing CorSentri photography
- `.openai/hosting.json`: private preview deployment configuration

## Content and reference sources

- Content: https://corsentri.webflow.io/
- Brand: ../Files/Slides/18.jpg, ../Files/Slides/22.jpg, ../Files/Logo Files/
- Visual references: https://www.deep.co.uk/, https://fableco.uk/, https://madebyshape.co.uk/

## Verification

Production static export and TypeScript checks pass. Browser checks cover desktop and 390px mobile layouts, service expansion, process tabs and arrow-key navigation, FAQ expansion, image loading, and console errors.
# corsentri-website
