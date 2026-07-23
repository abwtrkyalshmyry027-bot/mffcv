const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
async function loadCV(){
 const {data:p,error}=await supabaseClient.from("profiles").select("*").limit(1).maybeSingle();
 if(error||!p){document.querySelector("#cv").innerHTML='<div class="wrap"><p>لم يتم إعداد بيانات السيرة الذاتية بعد.</p></div>';return}
 const [e,ed,c,s,pr]=await Promise.all([
  supabaseClient.from("experiences").select("*").order("sort_order"),
  supabaseClient.from("education").select("*").order("sort_order"),
  supabaseClient.from("certificates").select("*").order("sort_order"),
  supabaseClient.from("skills").select("*").order("sort_order"),
  supabaseClient.from("projects").select("*").order("sort_order")
 ]);
 const photo=p.photo_url?`<div class="photo-frame"><img src="${esc(p.photo_url)}"></div>`:`<div class="photo-frame"><div class="photo-placeholder">صورتك</div></div>`;
 document.querySelector("#cv").innerHTML=`
 <section class="hero"><div class="wrap hero-grid"><div><h1 class="name">${esc(p.name)}</h1><div class="role">${esc(p.role)}</div><p class="bio">${esc(p.bio)}</p><div class="actions">${p.cv_url?`<a class="btn primary" target="_blank" href="${esc(p.cv_url)}">تحميل السيرة الذاتية</a>`:""}<a class="btn" href="#contact">تواصل معي</a></div></div><div>${photo}</div></div></section>
 <section id="about"><div class="wrap"><div class="eyebrow">من أنا</div><h2 class="title">${esc(p.headline)}</h2><div class="about-grid"><p class="muted">${esc(p.bio)}</p><div class="stats"><div class="stat"><b>${esc(p.years)}</b><span>سنوات الخبرة</span></div><div class="stat"><b>${esc(p.projects_count)}</b><span>المشاريع</span></div><div class="stat"><b>${esc(p.certificates_count)}</b><span>الشهادات</span></div><div class="stat"><b>${esc(p.commitment)}</b><span>الالتزام</span></div></div></div></div></section>
 <section id="experience" class="alt"><div class="wrap"><div class="eyebrow">الخبرة</div><h2 class="title">الخبرات العملية</h2>${(e.data||[]).map(x=>`<div class="entry"><div class="period">${esc(x.period)}</div><div><h3>${esc(x.title)}</h3><div class="org">${esc(x.org)}</div><p class="muted">${esc(x.description)}</p></div></div>`).join("")}</div></section>
 <section id="education"><div class="wrap"><div class="eyebrow">التعليم</div><h2 class="title">التعليم والمؤهلات</h2>${(ed.data||[]).map(x=>`<div class="entry"><div class="period">${esc(x.period)}</div><div><h3>${esc(x.title)}</h3><div class="org">${esc(x.org)}</div><p class="muted">${esc(x.description)}</p></div></div>`).join("")}</div></section>
 <section id="certificates" class="alt"><div class="wrap"><div class="eyebrow">الشهادات</div><h2 class="title">الشهادات والدورات</h2><div class="cards">${(c.data||[]).map(x=>`<div class="card"><h3>${esc(x.title)}</h3>${x.file_url?`<a class="cert-link" target="_blank" href="${esc(x.file_url)}">عرض الملف</a>`:"<span class='muted'>لا يوجد ملف</span>"}</div>`).join("")}</div></div></section>
 <section id="skills"><div class="wrap"><div class="eyebrow">المهارات</div><h2 class="title">المهارات المهنية</h2><div class="cards">${(s.data||[]).map(x=>`<div class="card"><h3>${esc(x.category)}</h3><ul>${(x.items||[]).map(i=>`<li class="muted">• ${esc(i)}</li>`).join("")}</ul></div>`).join("")}</div></div></section>
 <section id="projects" class="alt"><div class="wrap"><div class="eyebrow">المشاريع</div><h2 class="title">المشاريع والإنجازات</h2><div class="cards">${(pr.data||[]).map(x=>`<div class="card"><h3>${esc(x.title)}</h3><p class="muted">${esc(x.description)}</p></div>`).join("")}</div></div></section>
 <section id="contact"><div class="wrap"><div class="eyebrow">التواصل</div><h2 class="title">تواصل معي</h2><div class="contact"><div class="contact-row"><span class="key">الاسم</span><span>${esc(p.name)}</span></div><div class="contact-row"><span class="key">البريد</span><span><a href="mailto:${esc(p.email)}">${esc(p.email)}</a></span></div><div class="contact-row"><span class="key">الجوال</span><span>${esc(p.phone)}</span></div><div class="contact-row"><span class="key">الموقع</span><span>${esc(p.location)}</span></div></div></div></section>`;
 document.querySelector("#footer").textContent=`${p.name} — جميع الحقوق محفوظة`;
}
loadCV();
