const $ = (s, root=document) => root.querySelector(s);
const $$ = (s, root=document) => [...root.querySelectorAll(s)];

const menuToggle = $("#menuToggle");
const nav = $("#nav");
menuToggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", open);
});
$$(".nav a").forEach(a => a.addEventListener("click", () => nav.classList.remove("open")));

const toast = $("#toast");
function showToast(message){
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => toast.classList.remove("show"), 3500);
}

const bookingForm = $("#bookingForm");
bookingForm?.addEventListener("submit", e => {
  e.preventDefault();
  const data = new FormData(bookingForm);
  const name = data.get("name");
  showToast(`Thanks ${name}! Your appointment request has been received.`);
  bookingForm.reset();
});

const loginModal = $("#loginModal");
$$("[data-open-login]").forEach(btn => btn.addEventListener("click", () => {
  loginModal.classList.add("open");
  loginModal.setAttribute("aria-hidden","false");
}));
$$("[data-close-login]").forEach(btn => btn.addEventListener("click", closeLogin));
loginModal?.addEventListener("click", e => { if(e.target === loginModal) closeLogin(); });
function closeLogin(){
  loginModal.classList.remove("open");
  loginModal.setAttribute("aria-hidden","true");
}
$("#loginForm")?.addEventListener("submit", e => {
  e.preventDefault();
  closeLogin();
  showToast("Demo login successful — welcome back!");
  e.target.reset();
});

$("#searchBtn")?.addEventListener("click", () => {
  const term = prompt("Search HealthCare+ services, doctors or departments:");
  if(term?.trim()) showToast(`Searching for “${term.trim()}” — demo search.`);
});

$$(".department").forEach(btn => btn.addEventListener("click", () => {
  showToast(`${btn.dataset.dept} department selected. Choose an appointment to continue.`);
  location.hash = "appointment";
}));

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
$$(".reveal").forEach(el => observer.observe(el));

const sections = $$("main section[id], header[id], footer[id]");
const links = $$(".nav a");
window.addEventListener("scroll", () => {
  let current = "home";
  sections.forEach(section => {
    if(window.scrollY >= section.offsetTop - 130) current = section.id;
  });
  links.forEach(link => link.classList.toggle("active", link.getAttribute("href") === `#${current}`));
});
