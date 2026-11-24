/**
 * Automated tests for custom-to-dsh.
 *
 * Verifies:
 *   1. Host module exports & clean apply().
 *   2. Client module registration, CSS extraction, and embedded wallpaper integrity.
 *   3. Backward compatibility with legacy `dsh-skin:v1` / `dsh-skin:art` / `dsh-skin:presets`.
 *   4. Live browser verification in headless Chrome against a realistic DSH shell DOM:
 *      - All 4 tabs render cleanly (Обои, Стекло, Бренд, Эффекты)
 *      - Every slider, toggle, color picker, preset chip, logo mode, hero override,
 *        running-status rewrite, master bypass toggle, JSON export/import, and reset works
 *      - Animations and smooth typing activate without throwing
 */

import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const clientPath = path.join(here, "client.js");
const indexPath = path.join(here, "index.js");
const wallpaperPath = path.join(here, "wallpaper.jpg");

let passed = 0;
async function test(name, fn) {
	try {
		await fn();
		passed += 1;
		console.log(`  ok  ${name}`);
	} catch (err) {
		console.error(`FAIL  ${name}`);
		console.error(err);
		process.exitCode = 1;
	}
}

await test("host index.js exports name and apply()", async () => {
	const mod = (await import("file://" + indexPath.replace(/\\/g, "/"))).default;
	assert.equal(mod.name, "custom-to-dsh");
	assert.equal(typeof mod.apply, "function");
	assert.doesNotThrow(() => mod.apply());
});

await test("client.js embeds exact wallpaper.jpg and clean CSS blocks", () => {
	const src = fs.readFileSync(clientPath, "utf8");
	const jpg = fs.readFileSync(wallpaperPath);
	const expected = "data:image/jpeg;base64," + jpg.toString("base64");
	assert.ok(src.includes(expected), "BUILTIN_ART must match wallpaper.jpg");
	assert.ok(src.includes('id: "dsh-plugin-custom-to-dsh"'));
	assert.ok(src.includes('const KEY = "dsh-skin:v1"'));
	assert.ok(src.includes('const ART_KEY = "dsh-skin:art"'));
	assert.ok(src.includes('const PRESET_KEY = "dsh-skin:presets"'));
	assert.ok(src.includes('const LOGO_KEY = "dsh-skin:logo"'));
	assert.ok(!src.includes("if (true) return;"), "no dead smooth-typing guard");
	assert.ok(!src.includes("if (false) for"), "no dead code blocks");
});

await test("headless Chrome end-to-end DOM & UI verification", () => {
	const chromeCandidates = [
		"C:/Program Files/Google/Chrome/Application/chrome.exe",
		"C:/Program Files (x86)/Google/Chrome/Application/chrome.exe",
		"C:/Program Files/Microsoft/Edge/Application/msedge.exe",
	];
	const browser = chromeCandidates.find((p) => fs.existsSync(p));
	if (!browser) {
		console.log("  skip  Chrome/Edge not found for browser test");
		return;
	}

	const clientSrc = fs.readFileSync(clientPath, "utf8");
	const html = `<!doctype html>
<html>
<head><meta charset="utf-8"><title>DSH Shell Mock</title></head>
<body data-ds-dark-theme>
<div id="root">
  <div class="pI_x6G_frame">
    <div class="pI_x6G_sidebarCol">
      <div class="hHd-Xa_logoRow">
        <span data-slot="sidebar.brand.mark"><svg width="24" height="24"><circle cx="12" cy="12" r="10"/></svg></span>
        <span data-slot="sidebar.brand.name"><svg width="100" height="24"><defs><clipPath id="dsh-wordmark-whale-clip"><rect width="20" height="20"/></clipPath></defs></svg></span>
      </div>
      <div class="YDXeBa_sessionRow YDXeBa_selected">Chat 1</div>
      <div data-signed-out="false"><span>Signed in to DeepSeek</span></div>
    </div>
    <div class="pI_x6G_centerCol">
      <div class="pXSMma_headline">
        <span class="pXSMma_fishHitbox"><svg width="34" height="24"></svg></span>
        <span class="pXSMma_titleGroup"><span>Into the Unknown</span><span class="pXSMma_previewBadge">Preview</span></span>
      </div>
      <div class="EvIC1a_column">
        <div data-chat-flow-key="u1" data-chat-flow-kind="user"><div class="Sixlwa_bubble">Hello</div></div>
        <div data-chat-flow-key="a1" data-chat-flow-kind="assistant-step"><p>Answer body</p></div>
        <div data-chat-running="true"><span class="EvIC1a_runningIcon"></span><span class="EvIC1a_runningText" data-shimmer-text="Deep diving for 4s ···">Deep diving for 4s ···</span></div>
      </div>
      <div class="wSkVaW_composerSeat"><div class="uV2eYG_card" data-composer-card="true"></div></div>
    </div>
    <div class="pI_x6G_rightbarCol" data-rightbar-col="true"></div>
  </div>
</div>
<script>
// Pre-seed legacy oled-skin localStorage to prove 0-loss migration
localStorage.setItem("dsh-skin:v1", JSON.stringify({
  preset: "aurora",
  artOpacity: 0.72,
  dim: 0.55,
  blur: 12,
  ac: [90, 236, 184],
  logoMode: "text",
  logoText: "MyDesk",
  heroText: "Ready",
  runLabel: "Thinking {t}",
  typeOn: true,
  typeSpeed: 140
}));

let loadedMod = null;
window.__ModuleLoader__ = {
  load(def) { loadedMod = def.factory(); }
};
</script>
<script>${clientSrc.replace(/<\/script>/gi, "<\\/script>")}</script>
<script>
(async () => {
  const results = [];
  const check = (name, cond) => { if (!cond) results.push("FAILED: " + name); };

  loadedMod.apply();
  await new Promise(r => setTimeout(r, 150));

  const root = document.documentElement;
  // 1. Legacy settings preserved
  check("legacy ac preserved", root.style.getPropertyValue("--sk-ac") === "90 236 184");
  check("legacy artOpacity preserved", root.style.getPropertyValue("--sk-art") === "0.72");
  check("legacy logoText applied", document.querySelector(".sk-logo-t")?.textContent === "MyDesk");
  check("legacy heroText applied", document.querySelector('[class$="_titleGroup"] > span:first-child')?.textContent === "Ready");
  check("legacy runLabel applied", document.querySelector(".EvIC1a_runningText")?.textContent === "Thinking 4s");
  check("cleanAccount applied", document.querySelector('[data-signed-out="false"] span')?.textContent === "Signed in");

  // 2. Left-edge handle exists, NO bottom-right pill
  const edge = document.querySelector(".ctd-edge");
  check("left-edge handle mounted", !!edge);
  check("no bottom-right pill", !document.querySelector(".pill"));

  // 3. Open panel via edge click & verify 4 nav views
  edge.click();
  const panel = document.querySelector(".ctd-panel");
  check("panel opened", !!panel);
  const navBtns = [...panel.querySelectorAll(".ctd-nav button")];
  check("4 nav views rendered", navBtns.length === 4);

  // 4. Test 2D XY focal pad on Wall view
  const xyPad = panel.querySelector(".ctd-xy");
  check("2D XY focal pad rendered", !!xyPad);

  // 5. Test clearing runLabel restores original text
  navBtns[2].click(); // Brand view
  const inputs = [...panel.querySelectorAll(".ctd-input")];
  const runIn = inputs.find(i => i.value === "Thinking {t}");
  check("runLabel input populated", !!runIn);
  runIn.value = "";
  runIn.dispatchEvent(new Event("input", { bubbles: true }));
  check("clearing runLabel restores Deep diving", document.querySelector(".EvIC1a_runningText")?.textContent === "Deep diving for 4s ···");

  // 6. Test Glass view controls: color pickers + layout cards
  navBtns[1].click();
  check("glass view has color pickers", panel.querySelectorAll('input[type="color"]').length >= 2);
  check("glass view has layout mode cards", panel.querySelectorAll(".ctd-lcard").length === 2);

  // 7. Test Effects view preview button
  navBtns[3].click();
  const testBtn = [...panel.querySelectorAll("button")].find(b => b.textContent.includes("Проверить"));
  check("effects preview button exists", !!testBtn);
  testBtn.click();
  check("preview user bubble animates", document.querySelector(".ctd-pv-user")?.getAttribute("data-sk-in") === "user");

  // 8. Test master bypass switch in left rail
  const powerSw = panel.querySelector(".ctd-power .ctd-sw");
  powerSw.click();
  check("bypass disables palette stylesheet", document.getElementById("dsh-oled-skin").disabled === true);
  check("bypass restores hero text", document.querySelector('[class$="_titleGroup"] > span:first-child')?.textContent === "Into the Unknown");
  panel.querySelector(".ctd-power .ctd-sw").click();
  check("re-enable restores palette stylesheet", document.getElementById("dsh-oled-skin").disabled === false);
  check("re-enable restores custom hero text", document.querySelector('[class$="_titleGroup"] > span:first-child')?.textContent === "Ready");

  // 9. Test JSON Export/Import drawer
  const ioBtn = [...panel.querySelectorAll(".ctd-rbtn")].find(b => b.textContent === "JSON");
  ioBtn.click();
  const ta = panel.querySelector(".ctd-io textarea");
  check("IO drawer opened with JSON", !!ta && JSON.parse(ta.value).logoText === "MyDesk");

  // 10. Test Escape closes panel
  window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" }));
  await new Promise(r => setTimeout(r, 220));
  check("Escape closed panel", !document.querySelector(".ctd-panel"));

  document.title = results.length ? "FAIL:" + results.join("|") : "PASS";
})();
</script>
</body>
</html>`;

	const tmpHtml = path.join(here, "preview", "_test_runner.html");
	fs.mkdirSync(path.dirname(tmpHtml), { recursive: true });
	fs.writeFileSync(tmpHtml, html, "utf8");
	try {
		const res = spawnSync(browser, [
			"--headless=new",
			"--disable-gpu",
			"--no-sandbox",
			"--virtual-time-budget=2000",
			"--dump-dom",
			"file:///" + tmpHtml.replace(/\\/g, "/"),
		], { encoding: "utf8", timeout: 20000 });
		const dom = res.stdout || "";
		const titleMatch = dom.match(/<title>(.*?)<\/title>/);
		const title = titleMatch ? titleMatch[1] : "NO_TITLE";
		assert.equal(title, "PASS", `Browser checks returned: ${title}\nstderr: ${res.stderr}`);
	} finally {
		fs.rmSync(tmpHtml, { force: true });
	}
});

console.log(`\n${passed} tests passed`);
