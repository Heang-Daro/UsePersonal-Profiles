/* ---------- Content (edit here) ---------- */
const PROJECTS = [
  {title:"Student Management", desc:"Desktop application for managing student records.", tags:["Java","MySQL","Swing"], cat:"Java", link:""},
  {title:"Library System", desc:"Web application for managing a library.", tags:["Java EE","JSP","Servlet"], cat:"Java", link:""},
  {title:"Web Portfolio", desc:"This responsive portfolio website.", tags:["HTML","CSS","Bootstrap"], cat:"Web", link:"https://github.com/Heang-Daro/UsePersonal-Profiles"},
  {title:"School Management", desc:"School records system built on file data structures.", tags:["C/C++","File structures"], cat:"C/C++", link:""},
  {title:"Gas Station System", desc:"Desktop system for gas station operations.", tags:["Java","Swing"], cat:"Java", link:""}
];
const EXPERIENCE = [
  {when:"Apr 2025 – now", title:"Web Developer", text:"Developed responsive websites and web applications using HTML, CSS, Bootstrap, and JavaScript."},
  {when:"Mar 2024", title:"Assistant Management", text:"Assisted managers with planning, organizing, and coordinating tasks. Managed documents, schedules, and staff coordination."},
  {when:"First professional role", title:"IT Support Office", text:"My first job, in life and in tech. I learned how the job works and improved my programming in my free time."},
  {when:"2023 – 2026", title:"Bachelor's degree in Computer Science", text:"Studying computer science, programming, databases, and web development. Completed projects in Java, web apps, and software engineering."}
];
const SKILLS = {
  "Backend":["Java","Spring","JSP"],
  "Database":["MySQL"],
  "Frontend":["HTML","CSS","Bootstrap","JavaScript"],
  "Systems":["C","C++"]
};
const EMAILJS = {publicKey:"joOoGBpGqC1421j1a", service:"service_jvm4aiz", template:"template_qo9fsgf"};

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));

/* ---------- Theme ---------- */
const html = document.documentElement, icon = $("#icon"), toggleBtn = $("#toggleBtn");
function applyTheme(t){
  html.setAttribute("data-bs-theme", t);
  icon.textContent = t === "dark" ? "light_mode" : "dark_mode";
  toggleBtn.setAttribute("aria-label", t === "dark" ? "Switch to light theme" : "Switch to dark theme");
  try{ localStorage.setItem("theme", t); }catch(e){}
}
applyTheme(html.getAttribute("data-bs-theme"));
toggleBtn.addEventListener("click", () => applyTheme(html.getAttribute("data-bs-theme") === "dark" ? "light" : "dark"));

/* ---------- Projects with filter ---------- */
function renderProjects(cat){
  $("#projectGrid").innerHTML = PROJECTS.filter(p => cat === "All" || p.cat === cat).map(p => `
    <div class="col-12 col-md-6 col-lg-4"><article class="project-card">
      <h3>${esc(p.title)}</h3><p>${esc(p.desc)}</p>
      <div>${p.tags.map(t => `<span class="tag">${esc(t)}</span>`).join("")}</div>
      ${p.link ? `<a class="project-link" href="${esc(p.link)}" target="_blank" rel="noopener">View source <i class="material-icons" style="font-size:1.1em" aria-hidden="true">open_in_new</i></a>` : ""}
    </article></div>`).join("");
}
const cats = ["All", ...new Set(PROJECTS.map(p => p.cat))];
$("#filters").innerHTML = cats.map((c, i) => `<button type="button" class="filter-btn" aria-pressed="${i === 0}">${esc(c)}</button>`).join("");
$("#filters").addEventListener("click", e => {
  const b = e.target.closest(".filter-btn"); if(!b) return;
  document.querySelectorAll(".filter-btn").forEach(x => x.setAttribute("aria-pressed", x === b));
  renderProjects(b.textContent);
});
renderProjects("All");

/* ---------- Timeline & skills ---------- */
$("#timeline").innerHTML = EXPERIENCE.map(e => `<li><div class="when">${esc(e.when)}</div><h3>${esc(e.title)}</h3><p>${esc(e.text)}</p></li>`).join("");
$("#skillGroups").innerHTML = Object.entries(SKILLS).map(([g, items]) =>
  `<div class="col-12 col-sm-6 col-lg-3"><div class="skill-group"><h3>${esc(g)}</h3>${items.map(i => `<span class="chip">${esc(i)}</span>`).join("")}</div></div>`).join("");

/* ---------- Back to top ---------- */
const toTop = $("#toTop");
addEventListener("scroll", () => toTop.classList.toggle("show", scrollY > 600), {passive:true});
toTop.addEventListener("click", () => scrollTo({top:0}));

/* ---------- Contact form ---------- */
emailjs.init(EMAILJS.publicKey);
const form = $("#contactForm"), btn = $("#sendBtn"), status = $("#status");
form.addEventListener("submit", e => {
  e.preventDefault();
  status.textContent = "";
  form.classList.add("was-validated");
  if(!form.checkValidity()) return;
  btn.disabled = true; btn.querySelector(".label").textContent = "Sending…";
  emailjs.sendForm(EMAILJS.service, EMAILJS.template, form).then(() => {
    status.innerHTML = '<span class="ok">Message sent. I will reply to your email.</span>';
    form.reset(); form.classList.remove("was-validated");
  }, err => {
    console.error(err);
    status.innerHTML = '<span class="err">Message not sent. Check your connection and try again, or message me on Telegram.</span>';
  }).finally(() => { btn.disabled = false; btn.querySelector(".label").textContent = "Send message"; });
});
