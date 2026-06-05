# Site - Montagem de Móveis (Jeffersom)

## Como rodar
- Abra `index.html` no navegador (Google Chrome/Edge/Firefox).

## Conteúdo (fotos/vídeos)
O site já está preparado para as mídias ficarem em:
- `assets/images/hero-moveis.jpg`
- `assets/images/sobre.jpg`
- `assets/images/og-cover.jpg` (imagem do compartilhamento)
- `assets/images/galeria/antes-1.jpg`, `depois-1.jpg`, etc.

Substitua os arquivos pelos seus materiais reais.

### Galeria
- A galeria usa botões com `data-kind="antes"` / `data-kind="depois"`.
- Para adicionar mais imagens, copie um dos botões `.photo` e atualize:
  - `data-kind` (antes/depois)
  - `src` e `alt` da imagem.

### Vídeo
- No bloco de vídeo existe um `iframe` do YouTube.
- Troque o ID do vídeo alterando a URL do `src`:
  - `https://www.youtube.com/embed/SEU_ID`

## WhatsApp
- WhatsApp usado no site está configurado com o telefone: `5569992131686`.
- Se precisar trocar, edite os links no `index.html` e o envio do formulário em `app.js`.

## Schema/SEO
- SEO básico já incluído no `index.html` (title, description, OpenGraph) e schema `LocalBusiness`.

## Observações
- O formulário envia automaticamente uma mensagem formatada e abre o WhatsApp.

