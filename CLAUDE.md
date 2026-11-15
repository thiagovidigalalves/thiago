# Central de Ajuda do THGestor

Este repositório guarda os **tutoriais passo a passo** (com prints marcados por bolinhas numeradas)
do sistema THGestor, para a Central de Ajuda dos clientes.

- Para criar/atualizar tutoriais, siga `.claude/agents/tutorial.md` (agente `tutorial`).
- Roteiros: `tutoriais/roteiros/*.js` · Captura: `node tutoriais/capturar.js [id]` · Central: `node tutoriais/gerar-ajuda.js`
- Saída: `ajuda/index.html` + `ajuda/img/<id>/passo-N.png`.
- Nunca use login de empresa de cliente. Permitido: empresa de demonstração ou a própria THIAGO INFORMATICA
  (autorizada pelo dono), sempre com o desfoque de dados ligado (padrão do `capturar.js`).
