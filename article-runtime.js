(() => {
  'use strict';
  const scripts = new Map();
  let observer;
  let cleanupFeature;
  let mathQueue = Promise.resolve();
  let diagramQueue = Promise.resolve();
  let diagramId = 0;
  function loadScript(src) {
    if (scripts.has(src)) return scripts.get(src);
    const task = new Promise((resolve,reject) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => resolve();
      script.onerror = () => {scripts.delete(src);script.remove();reject(new Error('Unable to load '+src));};
      document.head.appendChild(script);
    });
    scripts.set(src,task); return task;
  }
  function dispose() { observer?.disconnect(); observer=null; cleanupFeature?.();cleanupFeature=null; }
  function sourceFallback(node, source, english) {
    node.className='diagram-source';
    const details=document.createElement('details');details.open=true;
    const summary=document.createElement('summary');summary.textContent=english?'Diagram source (rendering unavailable)':'图表源码（当前无法渲染）';
    const pre=document.createElement('pre');pre.textContent=source;
    details.append(summary,pre);node.replaceChildren(details);
  }
  async function draw(node, source, english) {
    if(!node.isConnected)return;
    try {
      await loadScript('vendor/mermaid/mermaid.min.js');
      if(!node.isConnected)return;
      window.mermaid.initialize({startOnLoad:false,securityLevel:'strict',theme:'default',fontFamily:'Inter, Noto Sans SC, sans-serif',maxTextSize:200000});
      const result=await window.mermaid.render('local-diagram-'+(++diagramId),source);
      if(!node.isConnected)return;
      node.innerHTML=typeof result==='string'?result:result.svg;
      node.classList.remove('mermaid-pending');
      result.bindFunctions?.(node);
    } catch(error) {if(node.isConnected)sourceFallback(node,source,english);console.warn('Diagram rendering:',error.message);}
  }
  async function typeset(entry) {
    if(!entry.isConnected)return;
    if(!window.MathJax){window.MathJax={tex:{inlineMath:[['$','$'],['\\(','\\)']],displayMath:[['$$','$$'],['\\[','\\]']],processEscapes:true},svg:{fontCache:'local'},startup:{typeset:false},options:{skipHtmlTags:['script','noscript','style','textarea','pre','code']}};}
    await loadScript('vendor/mathjax/tex-svg.js');
    await window.MathJax.startup.promise;
    if(entry.isConnected)await window.MathJax.typesetPromise([entry]);
  }
  function enhance(entry,english=false,key) {
    dispose();
    const feature=window.BLOG_ARTICLE_FEATURES?.[key];
    if(feature)cleanupFeature=feature(entry);
    if(feature)entry.addEventListener('click',event=>{if(event.target.closest('.filter-btn,.paper-tag'))window.dispatchEvent(new Event('article-layout'));});
    entry.querySelectorAll('table').forEach(table=>{
      if(table.closest('.article-table-scroll'))return;
      const shell=document.createElement('div');shell.className='article-table-scroll';shell.tabIndex=0;
      shell.setAttribute('role','region');shell.setAttribute('aria-label',english?'Scrollable table':'可横向滚动的表格');
      table.before(shell);shell.append(table);
    });
    entry.querySelectorAll('a[href^="#"]').forEach(a=>{
      if(!a.getAttribute('href').startsWith('#/')){
        try{a.dataset.jump=decodeURIComponent(a.getAttribute('href').slice(1));}catch(_){a.dataset.jump=a.getAttribute('href').slice(1);}
      }
    });
    const diagrams=[];
    entry.querySelectorAll('pre > code.language-mermaid, .mermaid').forEach(original=>{
      const source=original.textContent;
      const node=document.createElement('div');node.className='mermaid mermaid-pending';node.setAttribute('role','img');node.setAttribute('aria-label',english?'Article diagram':'文章图表');
      (original.matches('code')?original.parentElement:original).replaceWith(node);
      diagrams.push({node,source});
    });
    const jobs=new Map(diagrams.map(d=>[d.node,d]));
    observer=new IntersectionObserver(items=>{
      for(const item of items){if(!item.isIntersecting)continue;observer?.unobserve(item.target);const job=jobs.get(item.target);if(job)diagramQueue=diagramQueue.then(()=>draw(job.node,job.source,english));}
    },{rootMargin:'800px'});
    diagrams.forEach(d=>observer.observe(d.node));
    // Detect TeX in text nodes; the loader is fully local and runs once per session.
    if(/\\\(|\\\[|\$/.test(entry.textContent)){
      mathQueue=mathQueue.catch(()=>{}).then(()=>typeset(entry)).catch(error=>{console.warn('Math rendering:',error.message);});
    }
    // Keep inherited filter controls from appearing actionable without their page script.
    entry.querySelectorAll('.lb-filter-bar').forEach(node=>node.remove());
    if(!feature)entry.querySelectorAll('.paper-filter-bar,.paper-filter-results').forEach(node=>node.remove());
    entry.querySelectorAll('.lb-hidden').forEach(node=>node.classList.remove('lb-hidden'));
  }
  window.BlogRuntime={loadScript,enhance,dispose};
})();
