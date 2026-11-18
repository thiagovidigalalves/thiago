# Conferência dos tutoriais — 18/11/2026, 22:44:20

- Prints iguais: **91**
- Prints que **mudaram**: **37**
- Passos que **quebraram** (roteiro precisa de ajuste): **16**
- Telas do menu **sem tutorial**: **9**
- Tutoriais pulados por falta de login: nenhum

## Prints que mudaram
- `cadastrar-cliente/passo-1.png` — 3% diferente
- `cadastrar-funcionario/passo-4.png` — 5% diferente
- `cadastrar-funcionario/passo-5.png` — 4% diferente
- `cadastrar-funcionario/passo-6.png` — 4% diferente
- `cadastrar-produto/passo-5.png` — 4% diferente
- `caixa-sangria-fechamento/passo-1.png` — 8% diferente
- `central-de-cobranca/passo-2.png` — 18% diferente
- `central-de-cobranca/passo-3.png` — 7% diferente
- `condicional/passo-1.png` — 18% diferente
- `condicional/passo-5.png` — 19% diferente
- `conhecendo-o-menu/passo-1.png` — 3% diferente
- `conhecendo-o-menu/passo-3.png` — 8% diferente
- `conhecendo-o-menu/passo-4.png` — 8% diferente
- `conhecendo-o-menu/passo-5.png` — 8% diferente
- `consultar-vendas/passo-4.png` — 4% diferente
- `entrada-nfe/passo-1.png` — 9% diferente
- `entrada-nfe/passo-2.png` — 10% diferente
- `entrada-nfe/passo-5.png` — 10% diferente
- `entrar-no-sistema/passo-1.png` — 85% diferente
- `entrar-no-sistema/passo-2.png` — 85% diferente
- `entrar-no-sistema/passo-4.png` — 85% diferente
- `esqueci-a-senha/passo-1.png` — 84% diferente
- `esqueci-a-senha/passo-2.png` — 90% diferente
- `esqueci-a-senha/passo-3.png` — 92% diferente
- `etiquetas/passo-2.png` — 5% diferente
- `etiquetas/passo-4.png` — 9% diferente
- `etiquetas/passo-5.png` — 9% diferente
- `ordem-de-servico/passo-1.png` — 7% diferente
- `ordem-de-servico/passo-3.png` — 7% diferente
- `ordem-de-servico/passo-4.png` — 4% diferente
- `portal-do-contador/passo-2.png` — 88% diferente
- `relatorio-caixas-dre/passo-1.png` — 10% diferente
- `vender-no-pdv/passo-6.png` — 99% diferente
- `whatsapp/passo-1.png` — 5% diferente
- `whatsapp/passo-2.png` — 5% diferente
- `whatsapp/passo-3.png` — 11% diferente
- `whatsapp/passo-4.png` — 3% diferente

## Passos que quebraram (ver o que mudou na tela e ajustar o roteiro)
- `entrar-no-sistema/passo-3.png` — Clique em Entrar
- `criar-conta/passo-1.png` — Clique em "Criar conta"
- `criar-conta/passo-2.png` — Preencha seus dados
- `criar-conta/passo-3.png` — Clique em "Criar conta"
- `entrar-funcionario/passo-1.png` — Clique em "Sou funcionário"
- `entrar-funcionario/passo-2.png` — Preencha empresa, usuário e senha
- `entrar-funcionario/passo-3.png` — Clique em "Entrar"
- `portal-do-contador/passo-1.png` — Clique em "Sou contador"
- `vender-no-pdv/passo-1.png` — Abra o PDV
- `vender-no-pdv/passo-2.png` — Abra o caixa (início do dia)
- `vender-no-pdv/passo-3.png` — Clique em "Nova venda"
- `vender-no-pdv/passo-4.png` — Lance os produtos
- `vender-no-pdv/passo-5.png` — Clique em "Finalizar venda" (F9)
- `caixa-sangria-fechamento/passo-4.png` — Feche o caixa
- `contas-a-pagar/passo-5.png` — Pagou? Clique em "Pagar"
- `entrada-nfe/passo-3.png` — Encontre a nota

## Telas do menu sem tutorial (criar roteiro novo)
- Agenda — `/comercial/agenda`
- Preço inteligente — `/estoque/preco-inteligente`
- Compra inteligente — `/estoque/compra-inteligente`
- Boletos (remessa e retorno) — `/financeiro/boletos`
- Conciliação bancária — `/financeiro/conciliacao`
- Avaliações — `/whatsapp/avaliacoes`
- Ordem de serviço — `/whatsapp/ordem-servico`
- Pós-Venda — `/relatorios/pos-venda`
- Recursos inteligentes — `/configuracoes/recursos-ia`

## Depois de ajustar
1. Revisar a privacidade dos prints novos (nada de dado de cliente legível).
2. `node tutoriais/gerar-ajuda.js` e republicar a Central (mesmo link).
