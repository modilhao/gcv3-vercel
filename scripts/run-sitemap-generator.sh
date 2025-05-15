#!/bin/bash
# Script para executar o gerador de sitemap

# Carregar variáveis de ambiente (caso existam)
if [ -f ".env" ]; then
  export $(grep -v '^#' .env | xargs)
fi

echo "Executando gerador de sitemap..."
node scripts/generate-sitemap.js

echo "Verificando se o sitemap foi gerado..."
if [ -f "public/sitemap.xml" ]; then
  echo "Sitemap gerado com sucesso em public/sitemap.xml"
else
  echo "Erro: Sitemap não foi gerado"
  exit 1
fi