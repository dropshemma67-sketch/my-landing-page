#!/usr/bin/env bash
# Empaqueta el tema en un ZIP listo para subir a Shopify.
set -euo pipefail
cd "$(dirname "$0")"

OUT="maerk-theme.zip"
rm -f "$OUT"

zip -r -q "$OUT" \
  assets config layout locales sections snippets templates \
  -x '*.DS_Store' '*/.*'

echo "Listo: $OUT ($(du -h "$OUT" | cut -f1))"
echo "Súbelo en Shopify → Tienda online → Temas → Agregar tema → Subir archivo ZIP"
