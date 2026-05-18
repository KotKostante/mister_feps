#!/bin/bash
# Открывает дорожную карту в браузере при старте сессии
ROADMAP="/home/konstantin/Рабочий стол/Клининг /roadmap-cursor-site.html"

if [ -f "$ROADMAP" ]; then
  xdg-open "$ROADMAP" 2>/dev/null &
fi

echo '{}'
exit 0
