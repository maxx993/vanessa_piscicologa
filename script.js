const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)];
const P=['inicio','sobre','atendimentos','duvidas','contato','privacidade'];
const T={sobre:'Sobre',atendimentos:'Atendimentos',duvidas:'Dúvidas',contato:'Contato',privacidade:'Privacidade'};
const wa=t=>'https://wa.me/11968889858?text='+encodeURIComponent(t);
const hi='Olá, Vanessa! Vim pelo seu site e gostaria de agendar um atendimento.';
['hwa','bwa','awa','twa'].forEach(i=>$('#'+i).href=wa(hi));
function go(id){
  if(!P.includes(id))id='inicio';
  $$('.page').forEach(p=>p.hidden=p.id!==id);
  $$('nav [data-go]').forEach(a=>a.classList.toggle('on',a.dataset.go===id));
  $('#menu').classList.remove('open');$('#burger').setAttribute('aria-expanded','false');
  document.title=(T[id]?T[id]+' | ':'')+'Vanessa Araújo, Psicóloga em Osasco';
  window.scrollTo(0,0);
}
document.addEventListener('click',e=>{const a=e.target.closest('[data-go]');if(a){e.preventDefault();go(a.dataset.go)}});
$('#burger').onclick=()=>{const o=$('#menu').classList.toggle('open');$('#burger').setAttribute('aria-expanded',o)};
window.addEventListener('hashchange',()=>go(location.hash.slice(1)));
go(location.hash.slice(1));

let b=0;const bt=$('#bt');
if(!matchMedia('(prefers-reduced-motion:reduce)').matches)setInterval(()=>{b^=1;bt.textContent=b?'expire':'inspire'},4500);

$('#f').addEventListener('submit',e=>{
  e.preventDefault();const d=new FormData(e.target);
  const t='Olá, Vanessa! Meu nome é '+d.get('n')+'. Tenho interesse em: '+d.get('a')+'.'+(d.get('m')?' '+d.get('m'):'');
  const o=$('#ok'),a=document.createElement('a');
  a.href=wa(t);a.target='_blank';a.rel='noopener';a.className='btn';a.textContent='Enviar pelo WhatsApp';
  o.hidden=false;o.textContent='Mensagem pronta. Toque no botão para enviar: ';o.append(document.createElement('br'),a);
});

const R=[
[/suicid|me matar|morrer|tirar minha vida|me machucar|automutil|emergencia|crise/,'Sinto muito que você esteja passando por isso. Se houver risco agora, ligue 192 (SAMU) ou 188 (CVV, 24 horas, gratuito). Você também pode falar com a Vanessa pelo WhatsApp.'],
[/valor|preco|quanto|custa|pagamento|pix|cartao/,'Os valores variam conforme o tipo de atendimento e são informados no primeiro contato pelo WhatsApp.'],
[/convenio|plano de saude/,'Sobre convênios, a Vanessa confirma as condições atuais pelo WhatsApp.'],
[/horario|hora|funciona|aberto|sabado/,'Segunda e terça: 8h às 19h. Quarta: 8h às 17h. Quinta: 8h às 19h. Sexta: 8h às 18h. Sábado e domingo fechado.'],
[/endereco|onde|local|fica|chegar|mapa/,'O consultório fica na Avenida Vila Yara, 517 - 6º andar - Vila Yara, Osasco - SP, 06028-110.'],
[/crianca|infantil|filho|filha/,'Há atendimento infantil com recursos lúdicos e orientação aos pais. A Vanessa pode te orientar no primeiro contato.'],
[/adolescente/,'Sim, há atendimento para adolescentes, com sigilo e respeito ao momento de cada um.'],
[/avaliacao|laudo/,'A Vanessa realiza avaliação psicológica, com devolutiva explicada. Os detalhes dependem de cada caso.'],
[/primeira|como funciona|sessao|consulta/,'A primeira sessão é uma conversa de acolhimento para entender o que te trouxe e combinar como será o acompanhamento.'],
[/sigilo|privacidade|confidencial/,'O sigilo é uma obrigação ética da profissão. Tudo o que é dito na sessão é protegido.'],
[/online|video/,'A disponibilidade de atendimento online deve ser confirmada diretamente com a Vanessa.'],
[/agendar|marcar|vaga|iniciar|comecar/,'Para agendar, o caminho mais rápido é o WhatsApp.']];
const log=$('#log');
function add(t,me,link){
  const d=document.createElement('div');d.className='m'+(me?' me':'');d.textContent=t;
  if(link){const a=document.createElement('a');a.href=wa(hi);a.target='_blank';a.rel='noopener';a.textContent='Falar no WhatsApp';d.append(document.createElement('br'),a)}
  log.append(d);log.scrollTop=log.scrollHeight;
}
function ask(q){
  q=q.trim();if(!q)return;add(q,1);
  const n=q.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase(),r=R.find(x=>x[0].test(n));
  setTimeout(()=>add(r?r[1]:'Não tenho essa informação, mas a Vanessa pode te responder diretamente.',0,1),350);
}
['Como é a primeira sessão?','Quais os horários?','Onde fica?','Atende crianças?','Quero agendar'].forEach(q=>{
  const x=document.createElement('button');x.textContent=q;x.onclick=()=>ask(q);$('#chips').append(x);
});
let first=1;
$('#fab').onclick=()=>{
  const c=$('#chat'),o=c.hidden;c.hidden=!o;$('#fab').setAttribute('aria-expanded',o);$('#fab').textContent=o?'Fechar':'Tirar dúvidas';
  if(o&&first){first=0;add('Olá! Sou o assistente virtual do consultório. Respondo dúvidas gerais, mas não faço diagnóstico. Como posso ajudar?')}
};
$('#cs').onclick=()=>{ask($('#ci').value);$('#ci').value=''};
$('#ci').addEventListener('keydown',e=>{if(e.key==='Enter')$('#cs').click()});