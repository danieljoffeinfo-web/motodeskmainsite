# Moto Desk — marketing website

A monochrome, responsive landing page for Moto Desk, built with Vite, vanilla JavaScript and a Three.js integration keyboard.

## Development

```sh
npm ci
npm run dev
```

## Verification and production build

```sh
npm run check
npm run build
```

Vercel detects the Vite framework. Build command: `npm run build`; output: `dist`. No environment variables or backend services are required.

## Features

- Procedural 3D keyboard with locally hosted integration artwork, key presses, pointer response, offscreen rendering suspension, pause control and reduced-motion support.
- Keyboard-accessible integration and product tabs, mobile navigation, semantic FAQ accordions.
- Three illustrative product previews: Lead Centre, owner Command Centre, people and payroll. All displayed people and figures are synthetic examples.
- Front-end early-access form with browser validation and an explicitly labelled demo confirmation. It performs no requests and stores no personal details.
- The original three-bar mark and lowercase wordmark from `danieljoffeinfo-web/Styfe-DMS-/src/components/shell/logo.tsx`.

## Content boundaries

The product copy is based on the platform repository's September 2026 README and feature contracts. Broader stock, deals, websites and finance capabilities are labelled roadmap; the eight integrations are a phased ecosystem, not promises of all being available today. No claims of automatic statutory calculations, banking, tax filing or production email/PDF payslip delivery are made.

## Assets

Integration sources and DiskDrive image-edit provenance are documented in `ASSETS.md`. The seven vector marks are scalable at any resolution. DiskDrive was cleaned and upscaled from the supplied image; it is not an official vector master. Third-party marks remain the property of their owners and do not imply partnership or endorsement.

Fonts: DM Sans and Manrope via Google Fonts, with sans-serif fallback. The site remains usable if that external font request fails.

## Connecting signup later

Replace the clearly labelled demo handler in `src/main.js` with a validated server-side submission endpoint. Add appropriate privacy information, consent handling, abuse protection and email delivery. Never expose provider secrets in client code.

## Browser support

Modern browsers with WebGL 2 show the 3D keyboard. If WebGL is unavailable or any keyboard texture fails, the named integration controls remain usable. The content and form layout adapt from narrow mobile to wide desktop. Dynamic product previews and the demo form require JavaScript.
