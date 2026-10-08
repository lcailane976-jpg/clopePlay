# clopePlay

Site estático para mensagens de uma live da Twitch.

## Páginas
- `index.html`: página pública para espectadores.
- `streamer.html`: painel do streamer.

## Teste local
Abra `index.html` e `streamer.html` no mesmo navegador. As mensagens usam `localStorage` nesta primeira versão.

## Próxima etapa
A estrutura foi separada para facilitar a troca do `localStorage` por uma API/WebSocket ou serviço em tempo real. Depois podem ser adicionados:
- login/moderação;
- filtros automáticos;
- fila de mensagens;
- integração com Twitch;
- overlay para OBS;
- banco de dados e sincronização em tempo real.
