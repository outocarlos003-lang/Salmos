(() => {
  const root = document.getElementById('psalms');
  const status = document.getElementById('status');
  const escapeHtml = (s) => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  async function loadData() {
    // Os dados ficam versionados no repositório; nenhum serviço externo é usado em execução.
    const files = ['data/salmos-001-010.json','data/salmos-011-020.json','data/salmos-021-030.json','data/salmos-031-040.json','data/salmos-041-050.json','data/salmos-051-060.json','data/salmos-061-070.json','data/salmos-071-080.json','data/salmos-081-090.json','data/salmos-091-100.json','data/salmos-101-110.json','data/salmos-111-120.json','data/salmos-121-130.json','data/salmos-131-140.json','data/salmos-141-150.json'];
    const chunks = await Promise.all(files.map(async file => { const response = await fetch(file); if (!response.ok) throw new Error('Não foi possível carregar '+file); return response.json(); }));
    return chunks.flat();
  }
  function render(psalms) {
    if (psalms.length !== 150 || psalms.some((p,i) => p.number !== i+1 || !Array.isArray(p.verses) || !p.verses.length || p.verses.some((v,j)=>v.number!==j+1 || !v.text))) throw new Error('A base de dados não passou na validação estrutural.');
    const fragment = document.createDocumentFragment();
    for (const psalm of psalms) {
      const section = document.createElement('section'); section.className='psalm'; section.id='salmo-'+psalm.number;
      const heading = document.createElement('div'); heading.className='psalm-heading';
      const h2 = document.createElement('h2'); h2.id='titulo-'+psalm.number; h2.textContent='Salmo '+psalm.number;
      const button = document.createElement('button'); button.className='copy'; button.type='button'; button.textContent='Copiar Salmo'; button.setAttribute('aria-describedby','copy-status-'+psalm.number);
      const feedback = document.createElement('p'); feedback.className='copy-status'; feedback.id='copy-status-'+psalm.number; feedback.setAttribute('role','status'); feedback.setAttribute('aria-live','polite');
      button.addEventListener('click', async () => {
        const text = 'Salmo '+psalm.number+'\n\n'+psalm.verses.map(v=>v.number+'. '+v.text).join('\n');
        try {
          if (navigator.clipboard && window.isSecureContext) await navigator.clipboard.writeText(text);
          else { const area=document.createElement('textarea'); area.value=text; area.setAttribute('readonly',''); area.style.position='fixed'; area.style.opacity='0'; document.body.appendChild(area); area.select(); const ok=document.execCommand('copy'); area.remove(); if(!ok) throw new Error('Cópia não autorizada pelo navegador.'); }
          feedback.textContent='Salmo '+psalm.number+' copiado.';
        } catch (e) { feedback.textContent='Não foi possível copiar automaticamente. Selecione e copie o texto manualmente.'; }
      });
      heading.append(h2,button); section.append(heading);
      for (const verse of psalm.verses) { const p=document.createElement('p'); p.className='verse'; const n=document.createElement('span'); n.className='verse-number'; n.textContent=verse.number; n.setAttribute('aria-label','Versículo '+verse.number); const t=document.createElement('span'); t.textContent=verse.text; p.append(n,t); section.append(p); }
      section.append(feedback); fragment.append(section);
    }
    root.replaceChildren(fragment); status.textContent='150 salmos carregados · todos os versículos são exibidos nesta página.';
  }
  loadData().then(render).catch(error=>{ status.textContent='Erro ao carregar o texto: '+error.message; status.classList.add('error'); });
})();