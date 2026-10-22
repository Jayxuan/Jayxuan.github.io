(() => {
'use strict';
const config=window.BLOG_CONFIG,originals=[...window.BLOG_POSTS].sort((a,b)=>b.date.localeCompare(a.date)),app=document.getElementById('app'),backTop=document.getElementById('backToTop');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
let language=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh',headingNodes=[],renderToken=0;
window.BLOG_ARTICLE_CONTENT=window.BLOG_ARTICLE_CONTENT||{};
const wide=matchMedia('(min-width:1360px)');
const tx=(zh,en)=>language==='en'?en:zh;
const categoryName=key=>({research:tx('研究','Research'),weekly:tx('周报','Weekly'),essay:tx('随笔','Notes')})[key];
const allPosts=()=>originals.map(p=>({...p,...(language==='en'?window.BLOG_TRANSLATIONS?.[p.slug]||{}:{})}));
const nav=()=>'<a href="#/projects">Project</a><a href="#/research">Research</a><a href="#/blog">Blog</a><a href="#/about">About</a>';
function languageLinks(){return '<nav class="language-switch site-language-switch" aria-label="'+tx('阅读语言','Reading language')+'"><a href="?lang=zh'+(location.hash||'#/')+'" data-language="zh" lang="zh-CN" '+(language==='zh'?'aria-current="page"':'')+'>中文</a><span aria-hidden="true">/</span><a href="?lang=en'+(location.hash||'#/')+'" data-language="en" lang="en" '+(language==='en'?'aria-current="page"':'')+'>English</a></nav>';}
function footer(){return '<footer class="footer"><div class="social-links"><a href="#/" aria-label="'+tx('首页','Home')+'"><svg viewBox="0 0 24 24"><path d="m3 10 9-7 9 7M5 9v12h14V9M9 21v-8h6v8"/></svg></a>'+(config.email?'<a href="mailto:'+esc(config.email)+'" aria-label="Email"><svg viewBox="0 0 24 24"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 6 9 7 9-7"/></svg></a>':'')+(config.github?'<a href="'+esc(config.github)+'" target="_blank" rel="noopener noreferrer">GitHub</a>':'')+'</div><p>'+esc(config.footer)+'</p><a class="footer-link" href="#/about">'+tx('个人博客与研究笔记','Personal Blog & Research Notes')+'</a></footer>';}
function sidebar(){return '<div class="wrapper-sidebar" lang="en"><header class="sidebar clearfix"><div class="site-info"><div class="site-avatar">'+(config.avatar?'<img src="'+esc(config.avatar)+'" alt="'+esc(config.name)+'">':'<div class="site-avatar-placeholder" aria-label="'+esc(config.name)+'">'+esc(config.name.slice(0,1))+'</div>')+'</div><h1 class="site-name"><a href="#/">'+esc(config.name)+'</a></h1><p class="site-description">'+esc(config.description)+'</p><p class="site-tagline">'+esc(config.tagline)+'</p></div></header><div class="navlist"><nav aria-label="Site navigation">'+nav()+'</nav><div class="site-stats"><span>'+originals.length+' articles</span><span class="stats-divider">·</span><span>'+new Set(originals.map(p=>p.category)).size+' topics</span></div></div><div class="wrapper-footer-desktop">'+footer()+'</div></div>';}
function pageShell(title,html){document.body.className='';headingNodes=[];app.innerHTML=sidebar()+'<main id="main" tabindex="-1" class="wrapper-content"><div class="container"><article class="page"><header class="page-heading"><h1>'+esc(title)+'</h1>'+languageLinks()+'</header><div class="entry">'+html+'</div></article></div><div class="wrapper-footer-mobile">'+footer()+'</div></main>';document.title=title+' – '+config.name;}
function card(p){const recent=p.date>='2026-10-01';return '<a class="rc-card" href="#/post/'+p.slug+'"><h3 class="rc-title">'+esc(p.title)+'</h3><p class="rc-excerpt">'+esc(p.excerpt)+'</p><div class="rc-meta"><span class="rc-label rc-label-'+(p.category==='essay'?'blog':p.category)+'">'+categoryName(p.category)+'</span><span>'+tx('更新于','Updated')+' <time datetime="'+p.date+'">'+p.date+'</time></span>'+(recent?'<span class="rc-new">'+tx('近期更新','Recent')+'</span>':'')+'</div></a>';}
function monthLabel(m){return language==='en'?new Date(m+'-02T12:00:00').toLocaleDateString('en',{year:'numeric',month:'long'}):m.slice(0,4)+' 年 '+Number(m.slice(5))+' 月';}
function monthGroups(posts){const months=[...new Set(posts.map(p=>p.date.slice(0,7)))];return '<nav class="rc-jump" aria-label="'+tx('按月份跳转','Jump to month')+'">'+months.map(m=>'<a href="#m-'+m+'" data-jump="m-'+m+'">'+monthLabel(m)+'<span class="n">'+posts.filter(p=>p.date.startsWith(m)).length+'</span></a>').join('')+'</nav>'+months.map(m=>'<h2 class="rc-group" id="m-'+m+'">'+monthLabel(m)+'<span class="count">'+posts.filter(p=>p.date.startsWith(m)).length+' '+tx('篇','posts')+'</span></h2><div class="rc-grid">'+posts.filter(p=>p.date.startsWith(m)).map(card).join('')+'</div>').join('');}
function home(){const posts=allPosts();pageShell(tx('最新文章','Latest posts'),'<p class="rc-intro">'+tx('共 '+posts.length+' 篇文章，按更新时间倒序：',posts.length+' posts, most recently updated first:')+' <a href="#/research">'+categoryName('research')+' '+posts.filter(p=>p.category==='research').length+'</a> · <a href="#/category/weekly">'+categoryName('weekly')+' '+posts.filter(p=>p.category==='weekly').length+'</a> · <a href="#/category/essay">'+categoryName('essay')+' '+posts.filter(p=>p.category==='essay').length+'</a></p>'+monthGroups(posts));}
function category(key){const posts=allPosts().filter(p=>p.category===key);pageShell(categoryName(key),'<p class="rc-intro">'+tx('共 '+posts.length+' 篇文章，按更新时间倒序。',posts.length+' posts, most recently updated first.')+' <a href="#/">'+tx('查看全部文章','All posts')+'</a></p>'+monthGroups(posts));}
function blog(){const posts=allPosts().filter(p=>p.category!=='research');pageShell('Blog','<p class="rc-intro">'+tx('每周记录与个人随笔。','Weekly updates and personal notes.')+'</p><nav class="rc-jump"><a href="#weekly" data-jump="weekly">'+categoryName('weekly')+'<span class="n">'+posts.filter(p=>p.category==='weekly').length+'</span></a><a href="#notes" data-jump="notes">'+categoryName('essay')+'<span class="n">'+posts.filter(p=>p.category==='essay').length+'</span></a></nav>'+['weekly','essay'].map(key=>'<h2 class="rc-group" id="'+(key==='weekly'?'weekly':'notes')+'">'+categoryName(key)+'<span class="count">'+posts.filter(p=>p.category===key).length+' '+tx('篇','posts')+'</span></h2><div class="rc-grid">'+posts.filter(p=>p.category===key).map(card).join('')+'</div>').join(''));}
function about(){pageShell('About','<div class="about-content"><h2>'+esc(config.name)+'</h2><p>'+esc(tx(config.about,config.aboutEn))+'</p><h2>'+tx('关注方向','Interests')+'</h2><ul><li>'+tx('人工智能与具身智能','Artificial intelligence and embodied intelligence')+'</li><li>'+tx('工程实践与研究方法','Engineering practice and research methods')+'</li><li>'+tx('阅读、写作与日常观察','Reading, writing, and everyday observations')+'</li></ul><h2>'+tx('关于本站','About this blog')+'</h2><p>'+tx('本站的布局、配色与文章卡片样式参照','The layout, colors, and article cards follow')+' <a href="https://tingdeliu.github.io/" target="_blank" rel="noopener noreferrer">Tingde Liu</a> '+tx('的个人网站。',"'s personal website.")+'</p><p class="sample-note">'+tx('文章署名为 Tingde Liu，并按 CC BY 4.0 许可转载。','Articles are attributed to Tingde Liu and republished under CC BY 4.0.')+'</p></div>');}
function projects(){pageShell('Project','<p class="rc-intro">'+tx('个人项目与实践记录。','Personal projects and experiments.')+'</p><section class="project-card"><h2>'+tx('个人博客','Personal blog')+'</h2><p>'+tx('整理研究笔记、工程实践与每周记录。','A home for research notes, engineering practice, and weekly updates.')+'</p><div class="paper-tags-row"><span class="paper-tag">'+tx('写作','Writing')+'</span><span class="paper-tag">'+tx('知识管理','Knowledge management')+'</span></div><a href="#/">'+tx('浏览文章','Read the posts')+'</a></section>');}
function setDrawer(open,restore=true){document.body.classList.toggle('toc-drawer-open',open);const trigger=document.querySelector('.article-toc-trigger');trigger?.setAttribute('aria-expanded',String(open));const toc=document.querySelector('.article-toc');if(toc)toc.inert=!wide.matches&&!open;if(open)document.querySelector('.article-toc-close')?.focus();else if(restore)trigger?.focus();}
async function article(slug,token,section,focus){
const posts=allPosts();let p=posts.find(p=>p.slug===slug);if(!p)return notFound();
if(p.contentFile){
  const key=(p.contentLanguage||'zh')+'/'+slug;
  if(!window.BLOG_ARTICLE_CONTENT[key]){
    pageShell(p.title,'<p role="status">'+tx('正在读取本地文章…','Loading the local article…')+'</p>');
    try{await window.BlogRuntime.loadScript(p.contentFile);}catch(error){if(token===renderToken)pageShell(p.title,'<p>'+tx('文章文件未能读取，请确认已完整解压博客目录。','The article could not be loaded. Please check that the complete blog folder has been extracted.')+'</p><button data-retry-article type="button">'+tx('重试','Retry')+'</button>');return;}
  }
  if(token!==renderToken)return;
  p={...p,...window.BLOG_ARTICLE_CONTENT[key]};
}
document.body.className='no-sidebar article-page has-article-toc';
const index=posts.findIndex(item=>item.slug===slug),previous=posts[index+1],next=posts[index-1];
app.innerHTML='<div class="article-progress" aria-hidden="true"><span class="article-progress-bar"></span></div><button class="article-toc-trigger" type="button" aria-label="'+tx('打开目录','Open contents')+'" aria-controls="article-toc" aria-expanded="false"><svg viewBox="0 0 24 24"><path d="M5 6h14M5 12h14M5 18h14"/></svg><span>'+tx('目录','Contents')+'</span></button><button class="article-toc-overlay" type="button" aria-label="'+tx('关闭目录','Close contents')+'" tabindex="-1"></button><div class="article-reading-shell"><aside id="article-toc" class="article-toc" aria-label="'+tx('文章目录','Article contents')+'"><div class="article-toc-nav"><nav><a href="#/projects">Project</a><a href="#/research">Research</a><a href="#/blog">Blog</a></nav><button class="article-toc-close" type="button" aria-label="'+tx('关闭目录','Close contents')+'">×</button></div><div class="article-toc-heading"><span>'+tx('目录','Contents')+'</span><span class="article-toc-depth">H1—H3</span></div><div class="article-toc-scroll"><ul class="article-toc-list"></ul></div></aside><main id="main" tabindex="-1" class="wrapper-content"><div class="container"><article class="posts paper-figures"><h1 id="article-title">'+esc(p.title)+'</h1>'+languageLinks()+'<div class="post-meta"><time datetime="'+p.date+'">'+p.date+'</time>'+p.tags.map(t=>'<span class="local-tag">'+esc(t)+'</span>').join('')+'<span class="local-reading-time">'+esc(p.read)+'</span></div><div class="entry">'+p.body+'</div></article><div class="pagination"><a href="#/" class="home-link">'+tx('返回全部文章','Back to all posts')+'</a>'+(previous?'<div class="prev"><a href="#/post/'+previous.slug+'">'+tx('上一篇','Previous post')+'</a></div>':'')+(next?'<div class="next"><a href="#/post/'+next.slug+'">'+tx('下一篇','Next post')+'</a></div>':'')+'</div></div></main></div><div class="wrapper-footer-mobile">'+footer()+'</div>';
headingNodes=[...document.querySelectorAll('.posts h1[id],.posts .entry h2[id],.posts .entry h3[id]')];
document.querySelector('.article-toc-list').innerHTML=headingNodes.map(h=>'<li class="toc-level-'+h.tagName.slice(1)+'"><a href="#'+h.id+'" data-jump="'+h.id+'">'+esc(h.textContent)+'</a></li>').join('');
if(p.author&&p.sourceUrl){
  const note=document.createElement('aside');note.className='article-source';
  note.innerHTML=tx('作者：','Author: ')+esc(p.author)+' · <a href="'+esc(p.sourceUrl)+'" target="_blank" rel="noopener noreferrer">'+tx('原文','Source')+'</a> · <a href="https://creativecommons.org/licenses/by/4.0/" target="_blank" rel="noopener noreferrer">CC BY 4.0</a><br><span>'+tx('转载说明：适配排版与站内链接；第三方配图与部分引文以来源链接呈现。','Republication: layout and internal links adapted; third-party figures and selected quotations are provided as source links.')+'</span>';
  document.querySelector('.post-meta').after(note);
}
const entry=document.querySelector('.posts .entry');
document.querySelector('article.posts').className=(p.articleClasses||['posts','paper-figures']).join(' ');
entry.lang=p.contentLanguage==='en'?'en':'zh-CN';
if(language==='en'&&p.contentLanguage==='zh'){
  const note=document.createElement('p');note.className='translation-note';note.textContent='This article is available in Chinese only.';entry.before(note);
}
window.BlogRuntime.enhance(entry,language==='en',p.contentLanguage+'/'+slug);
setDrawer(false,false);document.title=p.title+' – '+config.name;
if(focus)document.getElementById('main')?.focus({preventScroll:true});
if(section){requestAnimationFrame(()=>document.getElementById(section)?.scrollIntoView());}
onScroll();
}
function notFound(){pageShell(tx('未找到文章','Page not found'),'<p>'+tx('这篇笔记暂时不存在。','This note is not available.')+'</p><a href="#/">'+tx('返回首页','Back to home')+'</a>');}
function render(focus=false){
renderToken++;
window.BlogRuntime?.dispose();
try{if(window.MathJax?.typesetClear)window.MathJax.typesetClear();}catch(_){}
const [routePath,routeQuery='']=location.hash.replace(/^#\/?/,'').split('?');
const route=routePath.split('/');
if(!route[0]||route[0]==='home')home();
else if(route[0]==='research')category('research');
else if(route[0]==='blog')blog();
else if(route[0]==='category'&&['research','weekly','essay'].includes(route[1]))category(route[1]);
else if(route[0]==='about')about();
else if(route[0]==='projects')projects();
else if(route[0]==='post')article(route[1],renderToken,new URLSearchParams(routeQuery).get('section'),focus);
else if(route[0]==='archive')home();
else notFound();
document.documentElement.lang=language==='en'?'en':'zh-CN';
if(focus){document.getElementById('main')?.focus({preventScroll:true});window.scrollTo({top:0,behavior:'instant'});}
onScroll();
}
function onScroll(){
backTop.hidden=scrollY<300;
const progress=document.querySelector('.article-progress-bar');
if(progress){const height=document.documentElement.scrollHeight-innerHeight;progress.style.transform='scaleX('+(height>0?Math.min(1,scrollY/height):0)+')';}
if(headingNodes.length){let current=headingNodes[0];for(const h of headingNodes){if(h.getClientRects().length&&h.getBoundingClientRect().top<=100)current=h;}document.querySelectorAll('.article-toc-list a').forEach(a=>{const target=document.getElementById(a.dataset.jump);a.parentElement.hidden=!target?.getClientRects().length;const active=a.dataset.jump===current.id;a.classList.toggle('is-active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}
}
document.addEventListener('click',e=>{
if(e.target.closest('[data-retry-article]')){render();return;}
const langLink=e.target.closest('[data-language]');
if(langLink){e.preventDefault();language=langLink.dataset.language;const url=new URL(location.href);url.searchParams.set('lang',language);url.searchParams.delete('theme');try{history.replaceState(null,'',url);}catch(_){}render();return;}
const localLink=e.target.closest('a[data-local-language]');
if(localLink&&!e.ctrlKey&&!e.metaKey&&!e.shiftKey&&!e.altKey){e.preventDefault();language=localLink.dataset.localLanguage;const url=new URL(location.href);url.searchParams.set('lang',language);url.hash=localLink.getAttribute('href');try{history.pushState(null,'',url);}catch(_){location.hash=url.hash;}render(true);return;}
const jump=e.target.closest('[data-jump]');
if(jump){e.preventDefault();const node=document.getElementById(jump.dataset.jump);setDrawer(false,false);node?.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth',block:'start'});if(node){node.setAttribute('tabindex','-1');node.focus({preventScroll:true});}return;}
if(e.target.closest('.article-toc-trigger'))setDrawer(true);
if(e.target.closest('.article-toc-close,.article-toc-overlay'))setDrawer(false);
if(e.target.closest('.skip-link')){e.preventDefault();document.getElementById('main')?.focus();}
});
document.addEventListener('keydown',e=>{if(!document.body.classList.contains('toc-drawer-open'))return;if(e.key==='Escape')setDrawer(false);if(e.key==='Tab'){const links=[...document.querySelectorAll('.article-toc a,.article-toc button')].filter(el=>el.getClientRects().length),first=links[0],last=links.at(-1);if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}}});
backTop.addEventListener('click',()=>window.scrollTo({top:0,behavior:matchMedia('(prefers-reduced-motion:reduce)').matches?'instant':'smooth'}));
wide.addEventListener('change',()=>{if(document.querySelector('.article-toc'))setDrawer(false,false);});
window.addEventListener('scroll',onScroll,{passive:true});
window.addEventListener('article-layout',onScroll);
window.addEventListener('popstate',()=>{language=new URLSearchParams(location.search).get('lang')==='en'?'en':'zh';render(true);});
window.addEventListener('hashchange',()=>render(true));
const cleanUrl=new URL(location.href);cleanUrl.searchParams.delete('theme');try{history.replaceState(null,'',cleanUrl);}catch(_){}
render();
})();
