# Установка и миграция

## Скриптом

```bash
git clone https://github.com/ext3ndedsoft/custom-to-dsh.git
cd custom-to-dsh
node install.mjs
```

Установщик:

1. Находит профиль DSH (`web` или единственный существующий).
2. Копирует `plugins/custom-to-dsh` в `<профиль>/plugins/custom-to-dsh`.
3. Если в `cordis.patch.yml` уже есть `oled-skin`, заменяет его на
   `custom-to-dsh` (одноразовая копия сохраняется как `cordis.patch.yml.bak`).
   Иначе добавляет запись в секцию `insert:`.
4. Проверяет синтаксис установленных файлов через `node --check`.

Флаги:
- `--dry-run` — показать действия без записи на диск
- `--keep` — не перезаписывать изменённые файлы
- `--uninstall` — удалить плагин и запись из `cordis.patch.yml` (настройки в
  браузере остаются)
- `--profile <name>` / `--dsh-home <dir>` — явный выбор профиля или каталога DSH

## Руками

```bash
cp -r plugins/custom-to-dsh ~/.dsh/profiles/web/plugins/custom-to-dsh
```

В `~/.dsh/profiles/web/cordis.patch.yml` (внутри секции `- insert:`):

```yaml
- insert:
    - id: custom-to-dsh
      name: "./plugins/custom-to-dsh/index.js"
```

Если раньше был подключён `oled-skin`, замените его запись на `custom-to-dsh`,
чтобы не загружать два скина одновременно. Перезапустите DSH (или обновите
страницу с очисткой кэша `Ctrl+F5`).
