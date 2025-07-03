# Guia Detalhado para Deploy Seguro no Vercel

## Contexto do Projeto
- **Variáveis de ambiente sensíveis:** Não utilizadas
- **Integrações externas críticas:** Não há
- **Domínio:** Usará o domínio padrão do Vercel
- **CI/CD:** Deploy será feito manualmente pelo painel do Vercel
- **Testes automatizados:** Não há
- **Build customizada:** Não há

---

## 1. Preparação do Projeto

- [ ] Certifique-se de que todas as alterações desejadas estão commitadas e pushadas para o repositório principal.
- [ ] Execute o build localmente:
  ```bash
  npm run build
  ```
  - O build deve finalizar sem erros. Warnings podem ser analisados, mas não devem impedir o deploy.
- [ ] Execute o linter (se houver):
  ```bash
  npm run lint
  ```
- [ ] Execute o TypeScript para checar tipagem:
  ```bash
  npx tsc --noEmit
  ```
- [ ] Atualize o Browserslist:
  ```bash
  npx update-browserslist-db@latest
  ```
- [ ] Faça um teste manual completo do site localmente:
  - Navegue por todas as páginas.
  - Teste formulários, botões e interações.
  - Teste responsividade (mobile, tablet, desktop).
  - Teste acessibilidade básica (tab, foco, contraste).
  - Rode o Lighthouse para performance, acessibilidade e SEO.

---

## 2. Configuração do Vercel

- [ ] No painel do Vercel, conecte o repositório do projeto.
- [ ] Configure o diretório de build como `client`.
- [ ] Configure o diretório de saída como `dist`.
- [ ] Defina o comando de build como:
  ```bash
  npm run build
  ```
- [ ] Não é necessário configurar variáveis de ambiente.
- [ ] Não é necessário configurar domínio customizado, redirects ou headers.

---

## 3. Deploy e Validação

- [ ] Realize o deploy pelo painel do Vercel (ou via push para a branch principal).
- [ ] Acompanhe o log de build do Vercel e garanta que não há erros.
- [ ] Após o deploy, acesse a URL de preview/produção do Vercel.
- [ ] Teste o site em diferentes navegadores e dispositivos.
- [ ] Valide responsividade, navegação e interações.
- [ ] Rode o Lighthouse na URL de produção para garantir performance e acessibilidade.
- [ ] Teste rotas inexistentes para garantir fallback 404.

---

## 4. Pós-Deploy

- [ ] Monitore erros no console do navegador e no painel do Vercel.
- [ ] Valide analytics (se houver).
- [ ] Comunique stakeholders sobre o sucesso do deploy.

---

## Checklist Resumido

- [ ] Build local sem erros
- [ ] Lint e TypeScript sem erros
- [ ] Teste manual completo (navegação, responsividade, acessibilidade)
- [ ] Browserslist atualizado
- [ ] Deploy realizado no Vercel
- [ ] Teste completo no ambiente de produção
- [ ] Monitoramento pós-deploy

---

## Observações Finais

- O warning do Tailwind sobre `user-is-tabbing` pode ser ignorado com segurança.
- Caso futuramente sejam adicionadas variáveis de ambiente, integrações externas ou domínio customizado, revise este guia e ajuste as configurações no Vercel.
- Mantenha a rotina de build e testes manuais antes de cada deploy para garantir estabilidade. 