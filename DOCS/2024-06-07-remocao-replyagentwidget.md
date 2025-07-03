# Remoção do ReplyAgentWidget (ReplyAgent)

## O que foi alterado
- Todo o script referente ao ReplyAgentWidget (ReplyAgent) foi removido do arquivo `client/index.html`.
- Foi realizada uma varredura completa no projeto para garantir que não existam mais referências, imports ou ações relacionadas ao ReplyAgentWidget, replyagent, `ra-chatbot-widget`, `chatbot-sdk` ou `sitewidget.net`.
- Não foram encontrados arquivos `.vue` ou qualquer outro ponto de integração com ReplyAgent no código-fonte ou nos arquivos de build.

## Por que foi alterado
- O widget estava gerando erro 400 (Bad Request) ao tentar buscar o widget do ReplyAgent, conforme log apresentado.
- O objetivo é eliminar completamente qualquer dependência, referência ou ação relacionada ao ReplyAgent, conforme solicitado.

## Próximos passos
- Caso o widget de chatbot precise ser substituído por outra solução, avaliar alternativas e planejar a integração.
- Monitorar o ambiente para garantir que o erro não volte a ocorrer e que não há efeitos colaterais na experiência do usuário.
- Caso surjam novas referências ou integrações legadas, removê-las imediatamente.

---

*Documento gerado automaticamente após a execução da tarefa de remoção do ReplyAgentWidget.* 