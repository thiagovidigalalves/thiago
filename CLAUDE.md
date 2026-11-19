# Central de Ajuda do THGestor

Este repositório guarda os **tutoriais passo a passo** (com prints marcados por bolinhas numeradas)
do sistema THGestor, para a Central de Ajuda dos clientes.

- Para criar/atualizar tutoriais, siga `.claude/agents/tutorial.md` (agente `tutorial`).
- Roteiros: `tutoriais/roteiros/*.js` · Captura: `node tutoriais/capturar.js [id]` · Central: `node tutoriais/gerar-ajuda.js`
- Saída: `ajuda/index.html` + `ajuda/img/<id>/passo-N.png`.
- Prints e vídeos SEMPRE na empresa de demonstração **TH Gestor · Demonstração** (`EMP_DEMOTHGE_STOR01`),
  com **dados fictícios** (padrão do `capturar.js`): nomes, telefones, CPF/CNPJ, e-mails e valores reais viram
  inventados, sem nada borrado (pedido do dono). Nunca use empresa de cliente.

## REGRA PERMANENTE: o sistema mudou → conferir os tutoriais (pedido do dono)

Sempre que o THGestor ganhar módulo novo, tela nova, campo novo ou mudar um botão, **e também ao
começar qualquer sessão neste repositório**, faça a conferência completa. Não espere o dono pedir.

1. Veja o que mudou no app (Base44 id `6a8469ea2eec118b03c63b1e`): checkpoints/conversa desde a
   data em `tutoriais/estado.json` e o código das páginas afetadas (`src/pages`, `Sidebar.jsx`).
2. Login para capturar: gere o link de acesso único (`POST /api/apps/{app_id}/embed-url`, e-mail do
   dono, vale 60 s) e rode com `TUTORIAL_LINK=<embed_url>` e `TUTORIAL_VER_EMPRESA=EMP_DEMOTHGE_STOR01`.
3. `node tutoriais/conferir.js` → lê `tutoriais/relatorio-conferencia.md`:
   - **prints que mudaram** → confira a imagem e troque (`--aplicar`);
   - **passos que quebraram** → ajuste o roteiro (texto do botão/campo mudou) e capture de novo;
   - **telas sem tutorial** → escreva o roteiro novo (siga `.claude/agents/tutorial.md`);
   - **campo novo** numa tela que já tem tutorial → acrescente o passo/explicação no roteiro.
4. Revise a privacidade de todo print novo (nenhum dado de cliente legível).
5. `node tutoriais/gerar-ajuda.js`, republique a Central no MESMO link
   (https://claude.ai/artifact/MRUQr3ptkgF2jGomadCt3K), atualize `tutoriais/estado.json`, commit e push.

## Vídeos
- Regras do dono para TODO vídeo: a voz é SEMPRE a dele: ElevenLabs, voz **"Thiago Informatica"** (id `k1RZuOyhqikku8ZLZvgx`; vale também para o Thiaguinho); a logo da
  Thiago Informática NUNCA com fundo branco (logo transparente, só sombra); o passo 1 começa no início e mostra o
  caminho pelo menu (o robô descobre sozinho: grupo › subgrupo › item); voz natural na velocidade normal (1,1x ficou rápido e robotizado; nada de
  filtro forte na voz), pausas curtas e música de fundo baixinha. Grave os vídeos quando nenhuma captura estiver rodando (limite de acessos).
- Tutorial com narração: `node tutoriais/video.js <id>` → `ajuda/videos/<id>.mp4` (vinheta + passos + voz ElevenLabs).
  A chave do ElevenLabs fica como network secret do ambiente (host `api.elevenlabs.io`, header `xi-api-key`).
- Vinheta e apresentação: `node tutoriais/animar.js vinheta|apresentacao` (animações em `tutoriais/animacoes/`).
- O Thiaguinho (app, `src/lib/videosTutoriais.js`) mostra o vídeo da tela no "Me explica": ao publicar vídeos
  novos, suba o mp4 como asset do app e acrescente na lista `VIDEOS_TUTORIAIS` (rotas, palavras, titulo, video, capa).
