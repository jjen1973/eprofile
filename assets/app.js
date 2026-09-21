document.addEventListener("DOMContentLoaded",()=>{
 const body=document.body,toggle=document.querySelector("#theme-toggle"),icon=toggle?.querySelector("i"),modal=document.querySelector("#contact-window"),close=document.querySelector("#close-contact"),form=document.querySelector("#contact-form"),status=document.querySelector("#form-status");let previous;
 const theme=t=>{const dark=t==="dark";body.classList.toggle("theme-dark",dark);icon?.classList.toggle("fa-moon",!dark);icon?.classList.toggle("fa-sun",dark);toggle?.setAttribute("aria-label",dark?"Switch to light theme":"Switch to dark theme")};
 theme(localStorage.getItem("theme")||(matchMedia("(prefers-color-scheme:dark)").matches?"dark":"light"));
 toggle?.addEventListener("click",()=>{const next=body.classList.contains("theme-dark")?"light":"dark";theme(next);localStorage.setItem("theme",next)});
 const open=e=>{e?.preventDefault();previous=document.activeElement;modal.classList.add("is-open");modal.setAttribute("aria-hidden","false");body.style.overflow="hidden";document.querySelector("#name").focus()};
 const shut=()=>{modal.classList.remove("is-open");modal.setAttribute("aria-hidden","true");body.style.overflow="";previous?.focus()};
 document.querySelectorAll("#open-contact,.footer-contact").forEach(x=>x.addEventListener("click",open));close?.addEventListener("click",shut);modal?.addEventListener("click",e=>{if(e.target===modal)shut()});document.addEventListener("keydown",e=>{if(e.key==="Escape"&&modal?.classList.contains("is-open"))shut()});
 if(window.emailjs)emailjs.init({publicKey:"NipmTQ5Q0maM3Qb18"});
 form?.addEventListener("submit",async e=>{e.preventDefault();const button=form.querySelector("button[type=submit]");button.disabled=true;status.textContent="Sending...";status.className="";try{await emailjs.send("service_qa8tdoc","template_auu796j",{name:form.elements.name.value.trim(),email:form.elements.email.value.trim(),message:form.elements.message.value.trim()});status.textContent="Thanks! Your message is on its way.";status.className="success";form.reset()}catch(error){console.error("EmailJS error:",error);status.textContent="That didn't send. Please try again or email me directly.";status.className="error"}finally{button.disabled=false}});

 const projectGrid=document.querySelector(".project-grid");
 if(projectGrid){
  const cards=[...projectGrid.querySelectorAll(".project")];
  const setProjectRows=()=>{let row=-1,lastTop=null,indexInRow=0;cards.forEach(card=>{const top=Math.round(card.offsetTop);if(lastTop===null||Math.abs(top-lastTop)>4){row+=1;indexInRow=0;lastTop=top}card.classList.add("project-card-reveal");card.classList.toggle("reveal-from-right",row%2===0);card.classList.toggle("reveal-from-left",row%2===1);card.style.setProperty("--reveal-delay",`${indexInRow*90}ms`);indexInRow+=1})};
  setProjectRows();
  window.addEventListener("resize",setProjectRows);
  if("IntersectionObserver" in window){const projectObserver=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");projectObserver.unobserve(entry.target)}})},{threshold:.15});cards.forEach(card=>projectObserver.observe(card))}else{cards.forEach(card=>card.classList.add("is-visible"))}
 }
});
