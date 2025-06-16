# gcv3-site-static

Este é um projeto de site estático, gerado a partir de uma base de código React + Vite.

## Desenvolvimento

Para iniciar o servidor de desenvolvimento, execute:

```bash
npm install
npm run dev
```

## Build

Para gerar a versão estática do site para produção, execute:

```bash
npm run build
```

Os arquivos serão gerados no diretório `dist/`.

## Deploy

Este projeto está pronto para ser implantado em qualquer serviço de hospedagem estática, como Vercel, Netlify ou GitHub Pages.

Para a Vercel, as seguintes configurações podem ser usadas:

- **Framework Preset:** Vite
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

Nenhuma configuração adicional é necessária. A Vercel detectará automaticamente que é um projeto Vite e o implantará corretamente. 