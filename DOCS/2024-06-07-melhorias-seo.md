# Melhorias de SEO – 2024-06-07

## O que foi alterado
- O arquivo `client/index.html` foi simplificado para conter apenas o SEO mínimo estático (title, description, robots, author, keywords, favicon, theme-color, viewport, manifest, preload/preconnect de fontes e CSS). Todas as meta tags dinâmicas (Open Graph, Twitter, canonical, JSON-LD, etc) foram removidas do HTML base para evitar duplicidade com o SEO dinâmico do React.
- O componente `SEO.tsx` foi aprimorado para limpar/remover todas as tags dinâmicas antigas (meta OG, Twitter, alternates, canonical, JSON-LD, etc) antes de adicionar as novas, evitando poluição do `<head>` e duplicidade de tags.

## Por que foi alterado
- Evitar duplicidade/confusão de metadados para os buscadores, garantindo que apenas as tags dinâmicas estejam presentes e atualizadas conforme a navegação.
- Melhorar a performance, escalabilidade e precisão do SEO dinâmico, centralizando toda a lógica no React.
- Garantir que o `<head>` permaneça limpo e sem tags obsoletas após navegação entre páginas.

## Próximos passos
- Realizar testes manuais com Google Lighthouse, Rich Results Test e Google Search Console para validar as melhorias.
- Monitorar o ambiente de produção para garantir que as tags dinâmicas estejam corretas em todas as rotas.
- Avaliar a inclusão de testes automatizados para SEO em futuras pipelines de CI/CD.
- Caso surjam novas necessidades de SEO (ex: novos tipos de JSON-LD, tags específicas para campanhas, etc), centralizar sempre no componente React.

---

*Documento gerado automaticamente após a execução das melhorias de SEO.* 