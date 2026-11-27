# HELIX DROP 3D — GamerKie Edition

An original, single-page 3D helix tower game inspired by the supplied reference. It runs on Three.js (CDN) and vanilla JavaScript; no server, login, API key, or build step is required.

## Core gameplay

- The hero falls automatically under gravity and repeatedly bounces when it lands on a safe platform.
- The player only rotates the complete tower with touch/mouse drag or keyboard arrows / A-D.
- Every platform is a 12-sector ring with a gap and dark danger sectors. A gap aligned under the hero lets it fall to the next platform.
- Landing on a normal safe tile causes an automatic bounce. Landing on a dark danger tile ends the run.
- Passing through 3 gaps consecutively charges a fireball. The next solid or danger platform is smashed instead of stopping/killing the hero.
- On a smash, platform sectors break into smaller 3D fragments, which tumble outward and fall under gravity.
- The camera follows the hero down the tower.

## Other features

- 15 platforms per level, with gap width and danger-sector count increasing as levels progress.
- Daily Challenge, local gem saving, character skins, pause, restart, sound toggle, level rewards, and responsive touch controls.
- Procedural character and tower geometry; no copied proprietary game assets.

## Run locally

Open `index.html` in a modern browser while connected to the internet. Three.js is loaded from cdnjs. A local static server is recommended:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## GitHub Pages

1. Upload `index.html` and this README to the repository root.
2. Open **Settings → Pages**.
3. Set the source to **Deploy from a branch**, choose `main` and `/ (root)`, then save.
4. Use the published Pages URL in your Blogger iframe.

## Blogger iframe

```html
<div style="width:100%;max-width:900px;margin:auto;aspect-ratio:9/16;overflow:hidden;background:#17113d">
  <iframe src="https://YOUR-USERNAME.github.io/YOUR-REPOSITORY/" title="Helix Drop 3D — GamerKie" allow="fullscreen; gamepad" allowfullscreen style="width:100%;height:100%;border:0;display:block"></iframe>
</div>
```

## Controls

- Phone/tablet: drag left or right anywhere over the game to rotate the tower.
- Desktop: click-drag, or use left/right arrows and A/D.
- Pause: pause button, Escape, or Space.

## Tests

Run the deterministic gameplay rules tests with Node.js:

```bash
node tests/game-logic.test.js
```

The tests cover angle wrapping, sector selection, gravity-impact outcomes, safe bounce, hazard death, three-gap fireball charging, and fireball smash.

## Notes

This is an independent implementation of the general helix-drop arcade mechanic, not the proprietary source code, characters, or assets of another game. Save data is local to the current browser/device.
