# Central de Ajuda do THGestor

Este repositório guarda os **tutoriais passo a passo** (com prints marcados por bolinhas numeradas)
do sistema THGestor, para a Central de Ajuda dos clientes.

- Para criar/atualizar tutoriais, siga `.claude/agents/tutorial.md` (agente `tutorial`).
- Roteiros: `tutoriais/roteiros/*.js` · Captura: `node tutoriais/capturar.js [id]` · Central: `node tutoriais/gerar-ajuda.js`
- Saída: `ajuda/index.html` + `ajuda/img/<id>/passo-N.png`.
- Prints e vídeos SEMPRE na empresa de demonstração **TH Gestor · Demonstração** (`EMP_DEMOTHGE_STOR01`),
  com **dados fictícios** (padrão do `capturar.js`): nomes, telefones, CPF/CNPJ, e-mails e valores reais viram
  inventados, sem nada borrado (pedido do dono). Nunca use empresa de cliente.
  Exceção autorizada pelo dono: o tutorial **Entrada de NF-e** usa a THIAGO INFORMATICA (`EMP_MT236D4F_KRZBER`), que tem
  notas da SEFAZ (campo `empresa` no roteiro); os emitentes das notas também viram nomes fictícios.

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
- Regras do dono para TODO vídeo: a voz é SEMPRE a dele: ElevenLabs, voz profissional **"Clone voz profissional"** (id `mbxPtQTaDkexDD8Ysw20`, modelo `eleven_v4`; aprovada; os clones rápidos ficaram robotizados). O botão "Ouvir" do Thiaguinho foi REMOVIDO a pedido do dono (gastava crédito): a voz dele fica só nos vídeos; "BI" se fala "bi-ai"; a logo da
  Thiago Informática NUNCA com fundo branco (logo transparente, só sombra); o passo 1 começa no início e mostra o
  caminho pelo menu (o robô descobre sozinho: grupo › subgrupo › item); voz natural na velocidade normal (1,1x ficou rápido e robotizado; nada de
  filtro forte na voz), pausas curtas e música de fundo baixinha. Grave os vídeos quando nenhuma captura estiver rodando (limite de acessos).
- JEITO DE FALAR (aprovado pelo dono, guardado como padrão de TODOS os vídeos): voz profissional `eleven_v4`,
  velocidade 1.0, stability 0.4, similarity 0.8, style 0.25 (`tutoriais/video-voz.js`); frases curtas de conversa,
  como o Thiago explicando para um cliente ("Aqui tem...", "é só...", "pra você"), nada de texto lido de manual.
  Final dos vídeos explicativos: "Qualquer dúvida, é só chamar no grupo de suporte." (NÃO mandar chamar no WhatsApp).
- DOIS FORMATOS (o dono diz qual quer): **explicativo** = deitado, tela de computador 1366x768, como os tutoriais
  (`video.js`); **status** = em pé 1080x1920 para o status do WhatsApp (animação `-status`, cortada em partes de ~40 s).
- Tutorial com narração: `node tutoriais/video.js <id>` → `ajuda/videos/<id>.mp4` (vinheta + passos + voz ElevenLabs).
  A chave do ElevenLabs fica como network secret do ambiente (host `api.elevenlabs.io`, header `xi-api-key`).
- Vinheta e apresentação: `node tutoriais/animar.js vinheta|apresentacao|apresentacao-status` (animações em `tutoriais/animacoes/`).
  A apresentação (fala, cenas e efeitos) foi APROVADA pelo dono: é o padrão. Não mude as falas sem ele pedir.
  `apresentacao-status` é a mesma em pé (1080x1920) para o status do WhatsApp; corte em 2 partes (0-40 s e 40 s-fim)
  porque o status aceita vídeos curtos. Ao mudar uma, mude a outra igual.
- SEMPRE que um vídeo ficar pronto (pedido do dono): mande o arquivo pra ele aqui na conversa E publique sozinho:
  `node tutoriais/publicar-video.js <id>` (sobe mp4/jpg e grava em Super Admin › Vídeos do Thiaguinho, com
  `assunto: {chave, acoes, rotas}` do roteiro) + cópia leve em `ajuda/videos-web/` (ffmpeg 1024 px, crf 30) +
  `node tutoriais/gerar-ajuda.js` e republique a Central (ela só leva `videos-web/`: o limite da página é 256 MB).
  Fila de tudo que falta: `bash tutoriais/gravar-todos.sh` (grava + publica no Thiaguinho; não publica se der erro).
  O Thiaguinho mostra "🎬 Ver vídeo" junto de "Me explica" / "Faz comigo" quando a pergunta é do assunto.
