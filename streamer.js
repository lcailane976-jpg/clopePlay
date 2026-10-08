const KEY="clopePlay_messages";
const messagesEl=document.getElementById("messages");
const totalEl=document.getElementById("total");
const pendingEl=document.getElementById("pending");
const voiceEl=document.getElementById("voiceStatus");

function getMessages(){return JSON.parse(localStorage.getItem(KEY)||"[]")}
function save(m){localStorage.setItem(KEY,JSON.stringify(m));render()}
function render(){
 const msgs=getMessages().reverse();
 totalEl.textContent=msgs.length;
 pendingEl.textContent=msgs.filter(x=>!x.read).length;
 if(!msgs.length){messagesEl.innerHTML='<div class="empty">Ainda não chegaram mensagens.<br><br>Abra a página pública e envie uma para testar.</div>';return}
 messagesEl.innerHTML=msgs.map(m=>`<article class="message">
   <div class="message-top"><span>Mensagem</span><span>${new Date(m.createdAt).toLocaleTimeString("pt-BR",{hour:"2-digit",minute:"2-digit"})}</span></div>
   <div class="message-text">${escapeHtml(m.text)}</div>
   <div class="actions">
     <button class="read" onclick="speak('${encodeURIComponent(m.text)}','${m.id}')">🔊 Ler em voz alta</button>
     <button class="remove" onclick="removeMessage('${m.id}')">Excluir</button>
   </div>
 </article>`).join("");
}
function escapeHtml(s){return s.replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[c]))}
function speak(encoded,id){
 const text=decodeURIComponent(encoded);
 if(!("speechSynthesis" in window)){alert("Seu navegador não oferece leitura em voz alta.");return}
 speechSynthesis.cancel();
 const u=new SpeechSynthesisUtterance(text); u.lang="pt-BR"; u.rate=.95; u.pitch=1;
 voiceEl.textContent="Lendo...";
 u.onend=()=>voiceEl.textContent="Pronto";
 speechSynthesis.speak(u);
 const m=getMessages(); const item=m.find(x=>x.id===id); if(item)item.read=true; save(m);
}
function removeMessage(id){save(getMessages().filter(x=>x.id!==id))}
document.getElementById("clearBtn").addEventListener("click",()=>{if(confirm("Limpar todas as mensagens?"))save([])});
window.addEventListener("storage",render);
setInterval(render,1000);
render();