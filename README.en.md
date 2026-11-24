<p align="center">
  <img src="assets/banner.en.png?v=2" alt="custom-to-dsh — OLED skin, glass UI & effects for DeepSeek Harness" width="100%">
</p>

<p align="center">
  <a href="LICENSE"><img alt="license" src="https://img.shields.io/badge/LICENSE-MIT-0a0a0a?style=for-the-badge&labelColor=ffffff"></a>
  <img alt="node" src="https://img.shields.io/badge/NODE-%E2%89%A520-ffffff?style=for-the-badge&labelColor=0a0a0a&logo=nodedotjs&logoColor=white">
  <img alt="dependencies" src="https://img.shields.io/badge/DEPENDENCIES-NONE-0a0a0a?style=for-the-badge&labelColor=ffffff">
  <img alt="profile" src="https://img.shields.io/badge/DSH-WEB%20PROFILE-ffffff?style=for-the-badge&labelColor=0a0a0a">
</p>

<p align="center">
  <a href="README.md">русский</a> · <b>english</b>
</p>

---

**custom-to-dsh** is a client-side customization plugin for DeepSeek Harness
(evolved from `oled-skin`). It layers a true-black OLED token palette, custom
wallpapers, floating frosted-glass panels, branding overrides, message entrance
animations, and smooth stream typing behind a tabbed left-edge drawer.

Press **`Ctrl+Alt+K`** or click the thin handle on the left edge of the window.

## Features

- **Wallpapers & presets.** 8 built-in presets (including the monochrome Planet
  art and pure OLED), drag-and-drop or file-picker upload, IndexedDB overflow
  storage for large images, zoom, X/Y positioning, background blur, vignette,
  and user-saved presets.
- **Glass, colors & geometry.** Unified accent color with automatic button
  foreground contrast, panel tint, floating vs flat layout, configurable gaps,
  corner radius, border glow, chat column width, and message bubble styling.
- **Auto-contrast telemetry.** Samples luminance and detail in the chat region
  and automatically scales dimming, blur, and text shadow so content stays
  legible over bright wallpapers.
- **Branding & status.** Replace the sidebar wordmark (tinted, custom text,
  custom image, or hidden), customize the empty-chat hero headline & `Preview`
  badge, and rewrite the running shimmer label (`{t}` = elapsed timer).
- **Motion & smooth typing.** 6 message entrance animations, an interactive live
  preview box inside the drawer, and steady stream reveal with optional blurred
  leading glyphs via the CSS Custom Highlight API.
- **Instant bypass & JSON config.** The `Скин активен` switch in the left rail
  compares with stock DSH in one click without losing state, plus inline JSON
  export/import.

## Studio UI

<p align="center">
  <img src="assets/panel-wall.png?v=2" alt="Wallpapers and presets" width="410">
  &nbsp;&nbsp;
  <img src="assets/panel-glass.png?v=2" alt="Glass and contrast" width="410">
</p>

<p align="center">
  <img src="assets/panel-brand.png?v=2" alt="Branding and status" width="410">
  &nbsp;&nbsp;
  <img src="assets/panel-fx.png?v=2" alt="Animations and smooth typing" width="410">
</p>

## Quick install

Requires **Node.js 20+** and an initialized DSH profile.

```bash
git clone https://github.com/ext3ndedsoft/custom-to-dsh.git
cd custom-to-dsh
node install.mjs
```

Without cloning:

```powershell
# Windows (PowerShell)
irm https://raw.githubusercontent.com/ext3ndedsoft/custom-to-dsh/main/install.mjs -OutFile install.mjs; node install.mjs
```

```bash
# macOS / Linux
curl -fsSLO https://raw.githubusercontent.com/ext3ndedsoft/custom-to-dsh/main/install.mjs && node install.mjs
```

Upgrading from `oled-skin` is seamless: `install.mjs` migrates `cordis.patch.yml`
automatically and `client.js` reads the exact same `dsh-skin:*` browser keys, so
existing settings and wallpapers stay intact.

## License

MIT — see [LICENSE](LICENSE).
