/**
 * Builds static previews of the custom-to-dsh UI panels and B&W manga banners.
 *
 * The panel screenshots execute the real `plugins/custom-to-dsh/client.js`
 * inside a monochrome high-contrast frame (`border-radius: 18px` on `#0d1117`),
 * so docs never drift from the actual DOM & CSS.
 *
 *   node preview/build-preview.mjs banner
 *   node preview/build-preview.mjs banner-en
 *   node preview/build-preview.mjs wall
 *   node preview/build-preview.mjs glass
 *   node preview/build-preview.mjs fx
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const mode = (process.argv[2] || "wall").toLowerCase();
const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, "..");
const clientPath = path.join(root, "plugins", "custom-to-dsh", "client.js");
const wallpaperPath = path.join(root, "plugins", "custom-to-dsh", "wallpaper.jpg");

const artB64 = "data:image/jpeg;base64," + fs.readFileSync(wallpaperPath).toString("base64");

if (mode === "banner" || mode === "banner-en") {
	const en = mode === "banner-en";
	const cards = en
		? [
			["01 · OLED + WALLPAPER", "True-black tokens, custom image, zoom, vignette"],
			["02 · GLASS + ACCENT", "Floating regions, blur, auto-contrast telemetry"],
			["03 · BRAND + STATUS", "Custom logo, hero title, running shimmer text"],
			["04 · MOTION + TYPING", "Message entrance FX & smooth stream reveal"],
		]
		: [
			["01 · OLED И ОБОИ", "True-black палитра, свой фон, зум и виньетка"],
			["02 · СТЕКЛО И АКЦЕНТ", "Парящие панели, блюр и автоконтраст под фон"],
			["03 · БРЕНД И СТАТУС", "Логотип, приветствие и шаблон «модель думает»"],
			["04 · ЭФФЕКТЫ И ПЕЧАТЬ", "Анимации появления и плавный вывод текста"],
		];
	const eyebrow = en ? "DEEPSEEK HARNESS · VISUAL SKIN & GLASS UI" : "DEEPSEEK HARNESS · ОФОРМЛЕНИЕ И СТЕКЛО";
	const pill = en ? "✦ CTRL+ALT+K · 4 TABS · JSON" : "✦ CTRL+ALT+K · 4 ВКЛАДКИ · JSON";

	const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><style>
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  width: 1200px; height: 360px; overflow: hidden;
  background: #0d1117;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
}
.canvas {
  position: relative; width: 1200px; height: 360px;
  border-radius: 18px; overflow: hidden;
  background: #000000;
  border: 1px solid rgba(255,255,255,0.14);
}
.bg-art {
  position: absolute; top: 0; bottom: 0; right: -210px; width: 1120px;
  background: url("${artB64}") 50% 94% / 138% auto no-repeat;
  filter: contrast(1.15) brightness(1.1);
}
.bg-fade {
  position: absolute; inset: 0;
  background:
    linear-gradient(90deg, #000000 0%, #000000 44%, rgba(0,0,0,0.8) 51%, rgba(0,0,0,0.0) 60%, rgba(0,0,0,0.0) 100%);
}
.left {
  position: relative; z-index: 2; width: 650px; height: 100%;
  padding: 28px 34px; display: flex; flex-direction: column; justify-content: space-between;
}
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
  padding: 5px 12px; border-radius: 999px;
  background: #0a0a0a; border: 1px solid rgba(255,255,255,0.22);
  color: #e4e4e7; font-family: Consolas, ui-monospace, monospace;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.9px;
}
.eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: #fff; }
.title-row {
  display: flex; align-items: center; gap: 14px; margin: 4px 0 6px;
}
.title-row span {
  font-size: 56px; font-weight: 850; letter-spacing: -2px; line-height: 1; color: #ffffff;
}
.to-box {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 6px 14px; border-radius: 12px;
  background: #ffffff; color: #060608;
  font-family: Consolas, ui-monospace, monospace;
  font-size: 24px; font-weight: 900; letter-spacing: 1px;
  box-shadow: 4px 4px 0 rgba(255,255,255,0.25);
}
.grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}
.card {
  padding: 12px 14px; border-radius: 12px;
  border: 1.5px solid #ffffff;
}
.card.dark {
  background: #0a0a0c; color: #ffffff;
  box-shadow: 3px 3px 0 rgba(255,255,255,0.22);
}
.card.light {
  background: #ffffff; color: #09090b;
  box-shadow: 3px 3px 0 rgba(255,255,255,0.25);
}
.card b {
  display: block; font-family: Consolas, ui-monospace, monospace;
  font-size: 11px; font-weight: 800; letter-spacing: 0.6px; margin-bottom: 4px;
}
.card span {
  display: block; font-size: 12.5px; font-weight: 500; line-height: 1.3; opacity: 0.88;
}
.float-pill {
  position: absolute; right: 26px; bottom: 22px; z-index: 3;
  display: inline-flex; align-items: center; gap: 9px;
  padding: 8px 15px; border-radius: 999px;
  background: #ffffff; color: #09090b; border: 2px solid #09090b;
  box-shadow: 0 12px 28px rgba(0,0,0,0.75);
  font-family: Consolas, ui-monospace, monospace;
  font-size: 11px; font-weight: 800; letter-spacing: 0.7px;
}
.float-pill i {
  width: 8px; height: 8px; border-radius: 50%; background: #09090b;
}
</style></head>
<body>
<div class="canvas">
  <div class="bg-art"></div>
  <div class="bg-fade"></div>
  <div class="left">
    <div class="eyebrow"><i></i>${eyebrow}</div>
    <div class="title-row">
      <span>custom</span>
      <div class="to-box">TO</div>
      <span>dsh</span>
    </div>
    <div class="grid">
      <div class="card dark"><b>${cards[0][0]}</b><span>${cards[0][1]}</span></div>
      <div class="card light"><b>${cards[1][0]}</b><span>${cards[1][1]}</span></div>
      <div class="card light"><b>${cards[2][0]}</b><span>${cards[2][1]}</span></div>
      <div class="card dark"><b>${cards[3][0]}</b><span>${cards[3][1]}</span></div>
    </div>
  </div>
  <div class="float-pill"><i></i>${pill}</div>
</div>
</body></html>`;
	const out = path.join(here, `banner-${mode}.html`);
	fs.writeFileSync(out, html, "utf8");
	console.log("written:", out);
	process.exit(0);
}

if (!["wall", "glass", "brand", "fx"].includes(mode)) {
	console.error("usage: node preview/build-preview.mjs banner|banner-en|wall|glass|brand|fx");
	process.exit(1);
}

const clientSrc = fs.readFileSync(clientPath, "utf8");
const tagText = mode === "wall" ? "01 · ОБОИ И ПРЕСЕТЫ" : mode === "glass" ? "02 · СТЕКЛО И КОНТРАСТ" : mode === "brand" ? "03 · БРЕНД И СТАТУС" : "04 · ЭФФЕКТЫ И ПЕЧАТЬ";
const chipRight = mode === "wall" ? "B&W · 8 PRESETS" : mode === "glass" ? "AUTO CONTRAST" : mode === "brand" ? "CUSTOM BRAND" : "SMOOTH STREAM";

const html = `<!doctype html>
<html lang="ru"><head><meta charset="utf-8"><title>custom-to-dsh · ${mode}</title>
<style>
html, html > body { margin: 0; width: 692px; height: 646px; background: #0d1117 !important; overflow: hidden; }
html > body::before, html > body::after { display: none !important; }
.frame {
  position: relative; z-index: 2;
  width: 692px; height: 646px; padding: 18px 24px 20px; box-sizing: border-box;
  font-family: ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif;
  display: flex; flex-direction: column; align-items: center; justify-content: flex-start;
  background: #ffffff; border: 2px solid #0a0a0a; border-radius: 18px; overflow: hidden;
}
.top-bar { width: 644px; display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
.tag-blk {
  display: inline-flex; align-items: center; gap: 7px; padding: 4px 11px; border-radius: 999px;
  background: #0a0a0a; color: #fff; font-family: Consolas, monospace; font-size: 10px; font-weight: 700; letter-spacing: 0.7px;
}
.tag-blk i { width: 5px; height: 5px; border-radius: 50%; background: #fff; }
.tag-wht {
  padding: 4px 11px; border-radius: 999px; background: #fff; color: #0a0a0a;
  border: 1.5px solid #0a0a0a; box-shadow: 2px 2px 0 #0a0a0a;
  font-family: Consolas, monospace; font-size: 10px; font-weight: 800; letter-spacing: 0.5px;
}
/* Override panel positioning so the 644x556 studio sits cleanly inside the white manga frame */
.ctd-panel {
  position: static !important; transform: none !important; animation: none !important;
  width: 644px !important; height: 562px !important; max-height: none !important;
  box-shadow: 0 18px 42px rgba(0,0,0,0.34) !important;
}
.ctd-edge { display: none !important; }
.ctd * { animation: none !important; transition: none !important; }
</style></head>
<body data-ds-dark-theme>
<div class="frame">
  <div class="top-bar">
    <span class="tag-blk"><i></i>${tagText}</span>
    <span class="tag-wht">${chipRight}</span>
  </div>
  <div id="mount-target"></div>
</div>
<script>
localStorage.setItem("dsh-skin:v1", JSON.stringify({
  preset: "planet",
  ac: [255, 255, 255],
  tint: [8, 8, 11],
  typeOn: true,
  typeSpeed: 120
}));
localStorage.setItem("dsh-skin:ui", JSON.stringify({ tab: "${mode}" }));
let mod = null;
window.__ModuleLoader__ = { load(def) { mod = def.factory(); } };
</script>
<script>${clientSrc.replace(/<\/script>/gi, "<\\/script>")}</script>
<script>
mod.apply();
setTimeout(() => {
  document.querySelector(".ctd-edge")?.click();
  const p = document.querySelector(".ctd-panel");
  if (p) document.getElementById("mount-target").appendChild(p);
}, 60);
</script>
</body></html>`;

const out = path.join(here, `preview-${mode}.html`);
fs.writeFileSync(out, html, "utf8");
console.log("written:", out);
