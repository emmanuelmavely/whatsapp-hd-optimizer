# WA HD Optimizer

An offline-first, client-side PWA for preparing videos on-device with FFmpeg WebAssembly. The selected video is written to the worker's in-memory filesystem; no application server receives it.

## Run

Requires Node 20 (see `.nvmrc`). Serve the folder over HTTP because service workers do not run from `file://`:

```sh
npx --yes http-server . -p 8080
```

Open `http://localhost:8080`, allow the FFmpeg assets to cache once, then the app can be used offline. The first load needs network access for the pinned jsDelivr assets.

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
