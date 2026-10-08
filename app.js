const form=document.getElementById("messageForm");
const input=document.getElementById("message");
const count=document.getElementById("count");
const status=document.getElementById("status");
const KEY="clopePlay_messages";

input.addEventListener("input",()=>count.textContent=input.value.length);
form.addEventListener("submit",e=>{
  e.preventDefault();
  const text=input.value.trim();
  if(!text)return;
  const messages=JSON.parse(localStorage.getItem(KEY)||"[]");
  messages.push({id:crypto.randomUUID(),text,createdAt:new Date().toISOString(),read:false});
  localStorage.setItem(KEY,JSON.stringify(messages));
  input.value=""; count.textContent="0";
  status.textContent="Mensagem enviada! 💜";
  setTimeout(()=>status.textContent="",2500);
});