# Salmos — leitura integral

Aplicação web estática para leitura contínua dos 150 Salmos em português. Todos os capítulos são exibidos verticalmente na mesma página, com botão individual **Copiar Salmo**.

## Executar localmente

Requer Python 3 para servir os arquivos estáticos (ou qualquer servidor HTTP estático):

```bash
python3 -m http.server 8000
```

Abra http://localhost:8000. Não há dependências de runtime nem API externa; os textos ficam armazenados localmente em `data/`. Para validar os dados com Node.js 18 ou superior:

```bash
npm test
```

## Publicação

No GitHub, acesse **Settings → Pages → Build and deployment → Deploy from a branch**, selecione `main` e a pasta `/(root)`. O arquivo `.nojekyll` evita processamento desnecessário pelo Jekyll.

## Fonte bíblica e termos de uso

- **Tradução:** João Ferreira de Almeida, conforme identificada no corpus de origem.
- **Fonte intermediária dos dados:** [pd-text-corpus](https://github.com/sangchy1972/pd-text-corpus), arquivo de cada capítulo em [bibles/pt/books/psalms/chapters](https://github.com/sangchy1972/pd-text-corpus/tree/main/bibles/pt/books/psalms/chapters).
- **Fonte indicada pelo corpus:** [por-almeida.usfx.xml, no projeto open-bibles](https://github.com/seven1m/open-bibles/blob/master/por-almeida.usfx.xml).
- **Direitos:** o README do corpus classifica João Ferreira de Almeida em português como **domínio público**. Consulte a documentação da fonte antes de redistribuir ou alterar a atribuição; a licença do texto bíblico é independente da licença do código.
- **Licença do código deste repositório:** GNU GPL-3.0, conforme o arquivo `LICENSE`.

Os textos estão copiados em arquivos JSON versionados no repositório, para que a leitura funcione sem consultar serviços externos em tempo de execução.

## Integridade e validação

- Os dados são divididos em 15 arquivos JSON, com 10 salmos por arquivo.
- A aplicação verifica em tempo de execução que existem 150 salmos sequenciais e que os versículos de cada salmo estão numerados continuamente a partir de 1.
- `npm test` verifica a presença dos 150 salmos, a numeração sequencial dos salmos e versículos, textos não vazios e o total estrutural de 2.461 versículos.
- O botão de cada salmo copia somente o título e os versículos daquele salmo, usando a Clipboard API e um fallback quando permitido pelo navegador.
- A validação estrutural não comprova, por si só, a exatidão de cada palavra em relação a uma edição impressa. Não se declara concluída uma colação editorial independente nem testes automatizados em navegadores reais/dispositivos móveis.

## Arquivos principais

- `index.html`: página principal.
- `styles.css`: estilo responsivo e acessível.
- `app.js`: renderização, validação estrutural e cópia individual.
- `data/salmos-001-010.json` até `data/salmos-141-150.json`: base local.
- `scripts/validate-data.js`: verificação estrutural executável com Node.js.
