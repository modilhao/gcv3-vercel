# Correção de Alias e Cores de Destaque

data: 2024-06-07

autor: AI + revisão do time

## O que foi alterado
- Criado `tsconfig.json` com path alias `@` para resolver imports quebrados no TypeScript.
- Atualizadas as variáveis CSS `--primary` e `--accent` para o laranja #f7a53a em todos os temas (claro e escuro).

## Por que foi alterado
- Garantir que todos os imports funcionem corretamente no editor e no build, facilitando a manutenção e escalabilidade do código.
- Padronizar a cor de destaque do projeto conforme a identidade visual definida.

## Próximos passos
- Revisar componentes para garantir que não há mais uso de classes Tailwind fixas de azul (`text-blue-*`, `bg-blue-*`).
- Considerar a criação de um arquivo de tokens de design para facilitar futuras manutenções e expansões da identidade visual. 