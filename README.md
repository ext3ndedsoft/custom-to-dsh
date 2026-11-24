<p align="center">
  <img src="assets/banner.png?v=2" alt="custom-to-dsh — кастомизация и стекло для DeepSeek Harness" width="100%">
</p>

<p align="center">
  <a href="LICENSE"><img alt="лицензия" src="https://img.shields.io/badge/LICENSE-MIT-0a0a0a?style=for-the-badge&labelColor=ffffff"></a>
  <img alt="node" src="https://img.shields.io/badge/NODE-%E2%89%A520-ffffff?style=for-the-badge&labelColor=0a0a0a&logo=nodedotjs&logoColor=white">
  <img alt="зависимости" src="https://img.shields.io/badge/DEPENDENCIES-NONE-0a0a0a?style=for-the-badge&labelColor=ffffff">
  <img alt="профиль" src="https://img.shields.io/badge/DSH-WEB%20PROFILE-ffffff?style=for-the-badge&labelColor=0a0a0a">
</p>

<p align="center">
  <b>русский</b> · <a href="README.en.md">english</a>
</p>

---

**custom-to-dsh** — клиентский скин-плагин для DeepSeek Harness (эволюция
`oled-skin`). Превращает оболочку в true-black OLED с фоновой картинкой,
парящими стеклянными панелями, своим брендингом, анимациями сообщений и плавной
печатью ответа.

Открывается по **`Ctrl+Alt+K`** или клику по тонкой ручке на левом краю окна.

## Что умеет

- **Обои и пресеты.** 8 встроенных тем (включая монохромную «Планету» и чистый
  OLED без картинки), загрузка своих обоев перетаскиванием или выбором файла,
  хранение крупных картинок в IndexedDB без упирания в лимит 5 МБ, зум,
  позиционирование по X/Y, размытие фона и виньетка. Свои пресеты сохраняются и
  подсвечиваются в сетке.
- **Стекло, цвета и геометрия.** Единый акцентный цвет с автоконтрастом текста
  кнопок, выбор тона стекла, парящий или плоский макет, настройка отступов,
  скругления, яркости рамок, ширины колонки чата и пузырей.
- **Автоконтраст под фон.** Считает яркость и детализацию в зоне чата и сам
  подтягивает затемнение и блюр, чтобы текст оставался читаемым на любой
  картинке.
- **Брендинг и статус.** Замена логотипа в сайдбаре (акцентный цвет, свой
  текст, своя картинка или скрытие), настройка приветственного экрана пустого
  чата и бейджа `Preview`, шаблон строки статуса работы модели (`{t}` — таймер)
  и её цвета.
- **Эффекты и плавная печать.** 6 режимов появления сообщений, живое превью
  прямо внутри меню и рабочая плавная посимвольная подача стрима с мягким
  размытием свежих букв (через CSS Custom Highlight API, без ломки DOM).
- **Быстрый обход и перенос.** Переключатель `Скин активен` в левой панели
  мгновенно возвращает стоковый вид DSH для сравнения без потери настроек, а
  встроенный JSON-редактор даёт скопировать или перенести конфигурацию.

## Как выглядит меню

<p align="center">
  <img src="assets/panel-wall.png?v=2" alt="Вкладка Обои и пресеты" width="410">
  &nbsp;&nbsp;
  <img src="assets/panel-glass.png?v=2" alt="Вкладка Стекло и контраст" width="410">
</p>

<p align="center">
  <img src="assets/panel-brand.png?v=2" alt="Вкладка Бренд и статус" width="410">
  &nbsp;&nbsp;
  <img src="assets/panel-fx.png?v=2" alt="Вкладка Эффекты и печать" width="410">
</p>

## Быстрая установка

### Через интерфейс DSH (рекомендуется)

Откройте **Плагины → Добавить плагин** в DSH и вставьте ссылку на репозиторий:

```text
https://github.com/ext3ndedsoft/custom-to-dsh
```

Или через CLI:

```bash
dsh plugin --profile web add https://github.com/ext3ndedsoft/custom-to-dsh
```

### Через скрипт `install.mjs`

Понадобится **Node.js 20+** и профиль DSH.

```bash
git clone https://github.com/ext3ndedsoft/custom-to-dsh.git
cd custom-to-dsh
node install.mjs
```

Без клона — скачать один установщик, остальное он подтянет сам:

```powershell
# Windows (PowerShell)
irm https://raw.githubusercontent.com/ext3ndedsoft/custom-to-dsh/main/install.mjs -OutFile install.mjs; node install.mjs
```

```bash
# macOS / Linux
curl -fsSLO https://raw.githubusercontent.com/ext3ndedsoft/custom-to-dsh/main/install.mjs && node install.mjs
```

### Миграция с `oled-skin` без потери настроек

Если у вас уже стоял `oled-skin`, ничего перенастраивать не придётся:

- установщик сам заменит запись `oled-skin` → `custom-to-dsh` в `cordis.patch.yml`
  (бэкап сохраняется как `.bak`);
- плагин читает те же ключи браузера (`dsh-skin:v1`, `dsh-skin:art`,
  `dsh-skin:presets`, `dsh-skin:logo`), поэтому обои, цвета, пресеты и надписи
  подхватятся автоматически.

После установки перезагрузите вкладку (`Ctrl+F5`) или перезапустите оболочку
DSH. Флаги установщика: `--dry-run`, `--keep`, `--uninstall`, `--profile <name>`.

## Документация

- [Установка, миграция и удаление](docs/install.md)
- [Технические детали плагина](plugins/custom-to-dsh/README.md)
- [История изменений](CHANGELOG.md)
- [Безопасность](SECURITY.md)

## Лицензия

MIT — см. [LICENSE](LICENSE).
