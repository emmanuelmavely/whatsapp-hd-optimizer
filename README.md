# WA HD Optimizer

An offline-first, client-side PWA for preparing videos and photos on-device. Videos use FFmpeg WebAssembly; photos use a local browser JPEG encoder with the same resize and quality workflow intended for Squoosh. The selected media stays in the browser and no application server receives it. Photo output is JPEG, resized to a maximum of **4096 × 2692 pixels** while preserving aspect ratio.

## Run

Requires Node 20 (see `.nvmrc`). Serve the folder over HTTP because service workers do not run from `file://`:

```sh
npx --yes http-server . -p 8080
```

Open `http://localhost:8080`, allow the FFmpeg assets to cache once, then the app can be used offline. The first load needs network access for the pinned jsDelivr assets. When using a plain `http://<LAN-IP>` address, browsers disable CacheStorage and the app loads assets directly instead; use HTTPS for full offline PWA behavior.

## Test

```sh
npm test
```

The test is intentionally offline and checks the shell, encoder constraints, and service-worker lifecycle. A real encode should be smoke-tested in a browser with a representative clip.

## Docker

```sh
docker build -t wa-hd-optimizer .
docker run --rm -p 8080:8080 wa-hd-optimizer
```

FFmpeg's browser build and the WhatsApp inspector are external runtime behavior; neither can be validated by the static test suite.

## Publish on GitHub Pages

This repository includes `.github/workflows/pages.yml`. After pushing the `main` branch:

1. Open the repository on GitHub and go to **Settings → Pages**.
2. Under **Build and deployment**, choose **GitHub Actions**.
3. Pushes to `main` will deploy the static PWA automatically.

The resulting site is served over HTTPS, which enables the service worker and full offline caching. The first visit still needs network access to cache the pinned FFmpeg assets.
