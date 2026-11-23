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

## REGRA PERMANENTE: a Demonstração é uma loja de verdade funcionando (pedido do dono, 20/11/2026)
- Todo vídeo e print é gravado na **TH Gestor · Demonstração** (`EMP_DEMOTHGE_STOR01`). Lá PODE lançar e SALVAR de verdade,
  sempre com dados fictícios (cliente, funcionário, valores inventados): vender, pagar salário, lançar advertência,
  cadastrar, agendar... O vídeo fica completo, mostrando o Salvar e o resultado salvo.
- No roteiro, `gravaDados: true` libera o robô a clicar em Salvar/Lançar/Pagar. O `capturar.js` só aceita isso na
  Demonstração; em qualquer outra empresa (inclusive a THIAGO INFORMATICA da Entrada de NF-e) ele continua só marcando.
- Antes de gravar: se a tela estiver vazia na Demonstração, PRIMEIRO cadastre dados fictícios pra ela parecer uma loja real
  funcionando (ex.: compromissos na Agenda, produtos com grade, vendas, contas). Deixe esses dados lá pros próximos vídeos.
- Nunca use dados reais de cliente e nunca salve nada em empresa de cliente.
- (Pedido do dono, 21/11/2026) Vídeo NÃO é só explicação: faz o passo a passo COMPLETO de verdade na Demonstração,
  digitando cada campo e salvando (ex.: venda no caixa de verdade até o fim, conta a pagar/receber digitada e lançada,
  cadastro preenchido e salvo). Refazer nesse padrão os vídeos que hoje só mostram a tela. Sempre deixar dados
  fictícios na Demonstração para o dono mostrar às pessoas. Nota fiscal de verdade continua proibida (só mostrar).

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
5. Tutorial NOVO também entra na Ajuda de DENTRO do sistema (Utilitários › Ajuda, `/ajuda`): no app Base44,
   `base44/shared/tutoriaisAjuda/p1..p4.js` (mesmo id do roteiro) + a tela em `rotas.js` (é por ela que o botão "Me ajuda nesta tela" do Thiaguinho acha o vídeo da tela; o "Ajuda desta tela" saiu das páginas)
   + o teste `tests/ajuda-central.test.mjs` (quantidade). O vídeo aparece sozinho no topo do tutorial (id `tut-<id>`)
   e na página Vídeos (`/ajuda?videos=1`). A grade tinha ficado de fora: não esquecer.
   Prints novos também vão para a Ajuda do sistema: `node tutoriais/publicar-imagens-ajuda.js` (sobe só o que mudou)
   e copie `tutoriais/imagens-ajuda.js` para o app em `base44/shared/tutoriaisAjuda/imagens.js`.
6. `node tutoriais/gerar-ajuda.js`, republique a Central no MESMO link
   (https://claude.ai/artifact/MRUQr3ptkgF2jGomadCt3K), atualize `tutoriais/estado.json`, commit e push.

## Vídeos
- VÍDEOS INTERNOS DA EQUIPE (pedido do dono, 20/11/2026): telas do Super Admin (Suporte em grupos, Central de Atendimento...)
  são SÓ para o Super Admin e a equipe da Thiago Informática. Roteiro com `somente_admin: true` e `superAdmin: true`
  (grava fora de empresa, nomes fictícios, `borrar` para desfocar conversas/dados de cliente). Ficam em Super Admin ›
  Suporte › Vídeos da equipe (/admin/videos-equipe) e no Thiaguinho só do Super Admin; NUNCA na Central dos clientes,
  na Ajuda das empresas, no Thiaguinho do cliente nem no WhatsApp de cliente. O dono quer depois vídeos de TODAS as telas
  do Super Admin para a equipe se virar sozinha.
- Regras do dono para TODO vídeo: a voz é SEMPRE a dele: ElevenLabs, voz profissional **"Clone voz profissional"** (id `mbxPtQTaDkexDD8Ysw20`, modelo `eleven_v4`; aprovada; os clones rápidos ficaram robotizados). O botão "Ouvir" do Thiaguinho foi REMOVIDO a pedido do dono (gastava crédito): a voz dele fica só nos vídeos; "BI" se fala "bi-ai"; a logo da
  Thiago Informática NUNCA com fundo branco (logo transparente, só sombra); o passo 1 começa no início e mostra o
  caminho pelo menu (o robô descobre sozinho: grupo › subgrupo › item); voz natural na velocidade normal (1,1x ficou rápido e robotizado; nada de
  filtro forte na voz), pausas curtas e música de fundo baixinha. Grave os vídeos quando nenhuma captura estiver rodando (limite de acessos).
- ÁUDIO SEMPRE BATENDO COM A TELA + CORTAR ESPERA (pedido do dono, 21/11/2026, para TODOS os vídeos): a fala de cada passo
  começa junto com as ações (o que a voz diz acontece na tela na mesma hora); tela demorando para abrir (PDV, recarga,
  limite de acessos) é cortada do vídeo, sem cortar a voz; o vídeo é esticado para o relógio real (a gravação do navegador
  perde quadros). Feito no `video.js` (cortarEspera, fimWall/k). Conferir sempre a sincronia antes de mandar.
- CLIQUE JUNTO COM A PALAVRA (pedido do dono, 23/11/2026): quando a voz diz "clica em Cadastros, Produtos", o clique em
  Cadastros acontece na hora em que ela diz "Cadastros" (nada de clicar primeiro e falar depois). O `video.js` pega o tempo
  de cada palavra pelo alinhamento do ElevenLabs (`alinhar` em `video-voz.js`, cache `-alinha.json`) e espera a palavra para
  clicar no menu e nos botões citados na fala. Salvar que demora: `aguardarFechar: true` (a espera é cortada).
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
- MANDAR VÍDEO PRO CLIENTE (só quando o dono pedir, com o número que ele der):
  `node tutoriais/enviar-video.js <id> <telefone> ["Nome"]` envia a cópia LEVE do vídeo (`video_leve`, pedido do dono) e pelo WhatsApp do suporte (número do Super Admin)
  o link curto `https://thgestor.thiagoinformatica.com.br/v/<id>` (página pública, abre o vídeo sem login).
  No sistema: Super Admin › Vídeos do Thiaguinho (botão 📲 Enviar, com busca) e o pop-up do vídeo (botão Enviar no WhatsApp, só Super Admin).
  O Thiaguinho do Super Admin também envia: "manda o vídeo da grade para 34 99999-0000" (ou "... pra Maria 34...").
  POR ENQUANTO vai só a mensagem com o link (pedido do dono). A chave "Mandar o arquivo do vídeo junto"
  (Super Admin › Vídeos do Thiaguinho, `SystemSettings.videos_whatsapp_com_arquivo`) liga o vídeo + capa ▶ (`capa_mini`).
