#!/bin/bash
echo "📦 Деплой на Vercel..."
cd "$(dirname "$0")"
git add -A
git commit -m "${1:-update site}"
git push
echo "✅ Готово! Сайт обновится на Vercel через ~2 минуты"
