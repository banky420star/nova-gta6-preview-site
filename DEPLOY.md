# NOVA GTA VI: deployment guide

## What this package provides

A static, responsive site with interactive platform filters, a South Africa launch timer, official Rockstar media links, embedded official Rockstar YouTube videos, screenshot lightbox, original NOVA promotional videos, product references, a demo checkout and **printable sample receipt**. It is ready to preview or upload as a static site to a host after visual and legal approval.

**Not yet included:** a live merchant account; real orders, secure checkout, key allocation, payment status webhooks, notification email sending, supplier authorisation, business registration/contact details, or a live inventory feed. These are not functionality that a static HTML file can safely simulate as genuine orders.

## Preview locally

1. Unzip the archive preserving folder paths.
2. Open `index.html` in a browser with internet access. Official GTA VI images and official YouTube trailers load from their original sources; local NOVA videos load from `assets/` and `social/`.
3. Select `VIEW ORDER DEMO` to test PS5 vs Xbox, editions, customer-delivery email, optional console-account ID, and the branded **DEMO / NOT PAID** receipt.

## Upload as a static preview

Deploy all files in the root of this folder as a standard static website on Netlify, Cloudflare Pages, GitHub Pages or similar. `index.html` must be at the site root; preserve relative paths to CSS, JS, original audio/video and images. Site is intentionally `noindex` until verification.

## Commercial go-live requirements

- Verify actual supplier/reseller agreement: game SKU distribution rights, format (code-in-box vs direct digital codes), pricing, territory, promotional/logo usage, and allocation/availability.
- Enter real business identity, legal contact details, sale terms, POPIA privacy policy, delivery commitments and dispute procedures.
- Install the Shopify theme from the separate provided theme package, or build a hosted checkout using approved Shopify APIs. Import CSV products in **draft/unpublished** state; enable only inventory the supplier allocates and prices the merchant confirms.
- Never issue a **paid** receipt until the payment gateway confirms the transaction server-side. The included order-preview is client-only and cannot be considered proof of payment.
- Email delivery of valid game keys should only be offered if a supplier contract specifically provides that format. The physical code-in-box contains a code, not a disc.
- Test email notifications, payment/webhook handling, refunds, reconciliation, product region, digital fulfilment and physical shipping/tracking before launch.
- Before commercial publication, confirm your contract covers the official game art, trailers and Rockstar publisher logos used in the site. Current images are remotely loaded for demonstration and product identification only.

## Data and security

The demo checkout runs entirely in-browser; no form submission or storage. The sample receipt is explicitly watermarked and status is NOT PAID. Do not ask for PSN or Microsoft passwords, 2FA codes, or customer account access.

## Release date

Rockstar and PlayStation state release is **19 November 2026** at midnight South Africa local time, `2026-11-19T00:00:00+02:00`. The JavaScript automatically switches to a launch-day message when the countdown reaches zero.
