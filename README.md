# Salmos — leitura integral

Aplicação web estática para leitura contínua dos 150 Salmos em português. Todos os capítulos são exibidos verticalmente na mesma página, com botão individual **Copiar Salmo**.

## Executar localmente

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000. Não há dependências npm nem API externa em tempo de execução.

## Publicação

No GitHub, acesse Settings → Pages → Deploy from a branch → `main` → `/ (root)`. O arquivo `.nojekyll` evita processamento desnecessário pelo Jekyll.

## Fonte, tradução e direitos

- Tradução identificada pela fonte: **João Ferreira de Almeida**, texto português indicado como domínio público.
- Fonte: [pd-text-corpus](https://github.com/sangchy1972/pd-text-corpus), diretório `bibles/pt/books/psalms/chapters/`.
- O README do projeto de origem declara a tradução portuguesa como domínio público; cada tradução do corpus tem licença própria. Consulte também [SOURCES.md](https://github.com/sangchy1972/pd-text-corpus/blob/main/SOURCES.md) antes de redistribuir.
- Os textos são copiados para arquivos JSON locais versionados; a aplicação não depende da fonte remota para funcionar.
- A licença GPL-3.0 já existente neste repositório permanece para o código do projeto. A licença do texto bíblico é independente.

## Validação e limitações

O navegador verifica que existem exatamente 150 salmos sequenciais e que os versículos de cada salmo estão numerados continuamente desde 1. O botão copia somente o título e os versículos do salmo escolhido, com Clipboard API e fallback compatível quando permitido pelo navegador.

A validação estrutural não equivale a uma colação editorial independente de cada palavra com uma edição impressa. Testes automatizados em navegadores reais e dispositivos móveis ainda devem ser executados pelo mantenedor; não se declara que esses testes foram executados.

## Arquivos

- `index.html`: página principal.
- `styles.css`: estilo responsivo e acessível.
- `app.js`: renderização, validação estrutural e cópia individual.
- `data/salmos-001-010.json` até `data/salmos-141-150.json`: base local dividida em lotes de dez salmos.
