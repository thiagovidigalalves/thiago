# Central de Ajuda — THGestor

Tutoriais passo a passo, com imagem de cada tela e **bolinhas vermelhas numeradas** mostrando onde clicar.

Abra `ajuda/index.html` no navegador para ver a central.

## Como funciona

1. Cada tutorial é um roteiro em `tutoriais/roteiros/` (os passos, os textos e onde vai a bolinha).
2. Um robô (Playwright) abre o sistema, faz os passos e tira o print já marcado:
   ```bash
   export TUTORIAL_EMAIL="usuario-demo@..."   # usuário da empresa de DEMONSTRAÇÃO
   export TUTORIAL_SENHA="..."
   # ou, com usuário de funcionário da empresa demo:
   # export TUTORIAL_EMPRESA="EMP_..." TUTORIAL_USUARIO="tutorial" TUTORIAL_SENHA="..."
   node tutoriais/capturar.js            # todos
   node tutoriais/capturar.js clientes   # só um
   ```
3. Gere a central: `node tutoriais/gerar-ajuda.js`.

Quando uma tela do sistema mudar, basta rodar a captura de novo: os prints se atualizam sozinhos.

## Ligar a ajuda dentro do sistema

Hospede a pasta `ajuda/` (ex.: em `/ajuda/`) e crie um botão "Ajuda" em cada tela apontando para
`/ajuda/#<id-do-tutorial>` — por exemplo `/ajuda/#clientes`. Para abrir já num passo: `/ajuda/#clientes/3`.
