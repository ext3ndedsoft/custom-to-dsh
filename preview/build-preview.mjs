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
const brushArtPath = path.join(here, "brush-girl.png");

const artB64 = "data:image/png;base64," + fs.readFileSync(brushArtPath).toString("base64");

if (mode === "banner" || mode === "banner-en") {
	const en = mode === "banner-en";
	const cards = en
		? [
			["OLED & wallpapers", "True-black palette, custom art & vignette", "dark", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`],
			["Glass & accent", "Floating panels, blur & auto-contrast", "light", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>`],
			["Brand & status", "Custom logo, hero title & status template", "light", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`],
			["FX & smooth typing", "Entrance animations & smooth stream reveal", "dark", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`],
		]
		: [
			["OLED и обои", "True-black палитра, свой фон и виньетка", "dark", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="3"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="m21 15-5-5L5 21"/></svg>`],
			["Стекло и акцент", "Парящие панели, блюр и автоконтраст", "light", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9z"/></svg>`],
			["Бренд и статус", "Логотип, приветствие и шаблон статуса", "light", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>`],
			["Эффекты и печать", "Анимации и плавный вывод текста", "dark", `<svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>`],
		];
	const eyebrow = en ? "OLED STUDIO · ZERO DEPS · DSH PLUGIN" : "OLED STUDIO · ZERO DEPS · DSH ПЛАГИН";
	const subtitle = en
		? "OLED palette, wallpapers, frosted glass UI, and smooth typing in DeepSeek Harness"
		: "OLED-палитра, обои, матовое стекло и плавная печать в DeepSeek Harness";
	const topRight = "✦ Ctrl+Alt+K";
	const pill = en ? "4 tabs · JSON" : "4 вкладки · JSON";

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
  background: #ffffff;
  border: 2px solid #0a0a0a;
}
.art {
  position: absolute; right: 205px; top: -8px; width: 368px; height: 368px;
  object-fit: contain; mix-blend-mode: multiply; pointer-events: none; z-index: 1;
}
.left {
  position: relative; z-index: 2; width: 650px; height: 100%;
  padding: 24px 34px 24px 36px; display: flex; flex-direction: column; justify-content: space-between;
}
.eyebrow {
  display: inline-flex; align-items: center; gap: 8px; align-self: flex-start;
  padding: 5px 13px; border-radius: 999px;
  background: #0a0a0a; color: #ffffff;
  font-family: Consolas, ui-monospace, monospace;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.8px;
}
.eyebrow i { width: 6px; height: 6px; border-radius: 50%; background: #ffffff; }
.hero { margin: 2px 0 4px; }
.title-row {
  display: flex; align-items: center; gap: 12px;
}
.title-row .word {
  font-size: 54px; font-weight: 900; letter-spacing: -2.2px; line-height: 1; color: #0a0a0a;
}
.to-pill {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 5px 13px; border-radius: 999px;
  background: #ffffff; color: #0a0a0a; border: 2px solid #0a0a0a;
  font-family: Consolas, ui-monospace, monospace;
  font-size: 15px; font-weight: 800; letter-spacing: 0.6px;
}
.dsh-box {
  display: inline-flex; align-items: center; justify-content: center;
  padding: 4px 18px 8px; border-radius: 14px;
  background: #0a0a0a; color: #ffffff;
  font-size: 54px; font-weight: 900; letter-spacing: -2px; line-height: 1;
  box-shadow: 4px 4px 0 rgba(10,10,10,0.18);
}
.subtitle {
  margin-top: 8px; font-size: 14.5px; font-weight: 500; color: #18181b; line-height: 1.3;
}
.grid {
  display: grid; grid-template-columns: 1fr 1fr; gap: 10px;
}
.card {
  display: flex; align-items: center; gap: 11px;
  padding: 10px 13px; border-radius: 12px;
  border: 1.5px solid #0a0a0a;
  box-shadow: 3px 3px 0 rgba(10,10,10,0.18);
}
.card.dark { background: #0a0a0a; color: #ffffff; }
.card.light { background: #ffffff; color: #0a0a0a; }
.card .ico {
  width: 30px; height: 30px; border-radius: 8px; flex: none;
  display: grid; place-items: center;
}
.card.dark .ico { background: #ffffff; color: #0a0a0a; }
.card.light .ico { background: #0a0a0a; color: #ffffff; }
.card .txt { min-width: 0; }
.card b {
  display: block; font-size: 12.5px; font-weight: 750; letter-spacing: -0.2px; margin-bottom: 2px;
}
.card .txt span {
  display: block; font-size: 11px; font-weight: 500; line-height: 1.25; opacity: 0.82;
}
.top-pill {
  position: absolute; right: 26px; top: 22px; z-index: 3;
  padding: 5px 13px; border-radius: 999px;
  background: #ffffff; color: #0a0a0a; border: 1.5px solid #0a0a0a;
  box-shadow: 2px 2px 0 #0a0a0a;
  font-family: Consolas, ui-monospace, monospace;
  font-size: 11px; font-weight: 800; letter-spacing: 0.5px;
}
.float-pill {
  position: absolute; right: 26px; bottom: 20px; z-index: 3;
  display: inline-flex; align-items: center; gap: 8px;
  padding: 7px 14px; border-radius: 999px;
  background: #0a0a0a; color: #ffffff; border: 1.5px solid #0a0a0a;
  box-shadow: 3px 3px 0 rgba(10,10,10,0.22);
  font-family: Consolas, ui-monospace, monospace;
  font-size: 10.5px; font-weight: 700; letter-spacing: 0.5px;
}
.float-pill i {
  width: 6px; height: 6px; border-radius: 50%; background: #ffffff;
}
</style></head>
<body>
<div class="canvas">
  <img class="art" src="${artB64}" alt="">
  <div class="left">
    <div class="eyebrow"><i></i>${eyebrow}</div>
    <div class="hero">
      <div class="title-row">
        <span class="word">custom</span>
        <span class="to-pill">TO</span>
        <span class="dsh-box">dsh</span>
      </div>
      <div class="subtitle">${subtitle}</div>
    </div>
    <div class="grid">
      ${cards
        .map(
          ([title, desc, tone, icon]) =>
            `<div class="card ${tone}"><span class="ico">${icon}</span><div class="txt"><b>${title}</b><span>${desc}</span></div></div>`
        )
        .join("")}
    </div>
  </div>
  <div class="top-pill">${topRight}</div>
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
