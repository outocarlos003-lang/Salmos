#!/usr/bin/env node
'use strict';

const fs = require('node:fs');
const path = require('node:path');

const dataDir = path.join(__dirname, '..', 'data');
const files = Array.from({ length: 15 }, (_, i) =>
  `salmos-${String(i * 10 + 1).padStart(3, '0')}-${String(i * 10 + 10).padStart(3, '0')}.json`
);

const psalms = [];
for (const file of files) {
  const fullPath = path.join(dataDir, file);
  if (!fs.existsSync(fullPath)) throw new Error(`Arquivo ausente: ${fullPath}`);
  const parsed = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
  if (!Array.isArray(parsed)) throw new Error(`${file}: esperado um array JSON`);
  psalms.push(...parsed);
}

if (psalms.length !== 150) throw new Error(`Esperados 150 salmos; encontrados ${psalms.length}`);

let totalVerses = 0;
psalms.forEach((psalm, index) => {
  const expectedNumber = index + 1;
  if (psalm.number !== expectedNumber) {
    throw new Error(`Posição ${expectedNumber}: número de salmo incorreto (${psalm.number})`);
  }
  if (!Array.isArray(psalm.verses) || psalm.verses.length === 0) {
    throw new Error(`Salmo ${expectedNumber}: versículos ausentes`);
  }
  psalm.verses.forEach((verse, verseIndex) => {
    if (verse.number !== verseIndex + 1 || typeof verse.text !== 'string' || !verse.text.trim()) {
      throw new Error(`Salmo ${expectedNumber}, posição de versículo ${verseIndex + 1}: dados inválidos`);
    }
  });
  totalVerses += psalm.verses.length;
});

// Total estrutural conhecido para o livro dos Salmos na numeração hebraica comum.
if (totalVerses !== 2461) {
  throw new Error(`Esperados 2461 versículos no conjunto; encontrados ${totalVerses}`);
}

console.log(`Validação estrutural aprovada: ${psalms.length} salmos, ${totalVerses} versículos; numeração sequencial e textos não vazios.`);
console.log('Observação: esta verificação não substitui a colação editorial palavra por palavra com uma edição de referência.');
