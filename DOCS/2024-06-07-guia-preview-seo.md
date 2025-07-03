# Guia Rápido: Edição de Preview SEO (Título, Meta Descrição, Imagem, Favicon e Negrito)

## Como editar o título e a meta descrição
- O título e a meta descrição do site são definidos por página, via componente `SEO`.
- Exemplo (em `client/src/pages/Home.tsx`):

```tsx
<SEO 
  title="Geração de Conteúdo V3 – Sistemas vivos para vendas inteligentes"
  description="Ecossistemas digitais com bots, IA e webapps para empresas B2B. Sistemas vivos que convertem enquanto você dorme."
  image="/og-image.jpg" // Caminho relativo ou absoluto
  boldWords={["bots", "IA", "vendas"]} // Palavras para destacar no preview visual (apenas em dev)
/>
```

- Os valores padrão ficam em `client/src/lib/seoDefaults.ts`.
- Para outras páginas, basta sobrescrever as props.

## Como editar a imagem de preview (Open Graph / Social)
- A imagem de preview é definida pela prop `image` do componente SEO.
- O arquivo padrão é `/og-image.jpg` na raiz pública do projeto.
- Para trocar, substitua o arquivo ou altere o caminho na prop.

## Como editar o favicon
- O favicon é definido no `client/index.html`:
```html
<link rel="icon" href="/favicon.ico" sizes="any">
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
<link rel="apple-touch-icon" href="/apple-touch-icon.png">
```
- Basta substituir os arquivos correspondentes na pasta pública.

## Como destacar palavras em negrito na meta descrição (preview visual)
- Use a prop `boldWords` no componente SEO, passando um array de palavras.
- O preview visual só aparece em ambiente de desenvolvimento e serve para simular como o Google pode destacar termos buscados.
- **Atenção:** O Google não lê HTML `<b>` na meta tag, mas destaca automaticamente termos buscados no snippet.

## Dicas de melhores práticas
- O Google não impõe limite rígido de caracteres para título/meta descrição, mas recomenda títulos claros e descrições entre 150-160 caracteres.
- Use palavras-chave importantes no início do título e da descrição.
- Certifique-se de que a imagem de preview tenha proporção 1200x630px para melhor exibição em redes sociais.
- Sempre revise o preview visual em dev para garantir clareza e impacto.

---

*Guia gerado automaticamente para facilitar a edição e preview do SEO do site.* 