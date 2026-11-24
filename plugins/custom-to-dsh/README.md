# custom-to-dsh

Клиентский скин-плагин для веб-оболочки DeepSeek Harness.

## Устройство

- `index.js` — пустая хост-заглушка (`name: "custom-to-dsh"`), чтобы профиль DSH
  подключал модуль стандартным способом.
- `client.js` — вся работа в браузере:
  - `#dsh-oled-skin` (`PALETTE`) — переопределение `--dsw-alias-*` и
    `--dsw-specific-*` в true-black OLED.
  - `#dsh-skin-wallpaper` (`SKIN`) — фон (`body::before`), виньетка
    (`body::after`), парящие стеклянные колонки (`sidebarCol`, `centerCol`,
    активный `rightbarCol`), карточка ввода (`[data-composer-card]`),
    выделения, логотип, приветствие, статус и анимации.
  - `#dsh-ctd-panel` (`PANEL_CSS`) — 4-вкладочное меню (`.ctd-panel`) и левая
    ручка (`.ctd-edge`).
- `wallpaper.jpg` — исходник встроенных обоев «Планета» (вшит в `client.js` как
  data URL).
- `test.mjs` — проверка экспорта, целостности вшитого фона и прогон реального
  `client.js` в headless Chrome против мока DOM DSH.

## Ключи хранения в браузере

Все ключи совместимы с прежним `oled-skin`:

- `dsh-skin:v1` — основная конфигурация JSON
- `dsh-skin:art` — загруженные обои (или `"idb:art"`, если перенесено в IndexedDB)
- `dsh-skin:presets` — пользовательские пресеты
- `dsh-skin:logo` — картинка логотипа (или `"idb:logo"`)
- `dsh-skin:ui` — последняя открытая вкладка меню
- IndexedDB `dsh-skin-media` (store `blobs`) — хранение тяжёлых картинок и
  обоев пользовательских пресетов.

## Проверка

```bash
node test.mjs
```
