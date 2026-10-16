const $ = (selector, root=document) => root.querySelector(selector);
const $$ = (selector, root=document) => [...root.querySelectorAll(selector)];

$("#year").textContent = new Date().getFullYear();

// Mobile navigation
const menuToggle = $("#menuToggle");
const mainNav = $("#mainNav");
menuToggle.addEventListener("click", () => {
  const open = mainNav.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(open));
});
$$('#mainNav a').forEach(link => link.addEventListener("click", () => {
  mainNav.classList.remove("open");
  menuToggle.setAttribute("aria-expanded", "false");
}));

// Search panel filters the visible product cards by name or category.
const searchPanel = $("#searchPanel");
$("#searchToggle").addEventListener("click", () => {
  searchPanel.hidden = !searchPanel.hidden;
  if (!searchPanel.hidden) $("#productSearch").focus();
});
$("#closeSearch").addEventListener("click", () => searchPanel.hidden = true);
$("#productSearch").addEventListener("input", event => {
  const term = event.target.value.trim().toLowerCase();
  let count = 0;
  $$(".product-card").forEach(card => {
    const match = (card.dataset.name + " " + card.textContent).toLowerCase().includes(term);
    card.hidden = !match;
    if (match) count++;
  });
  $("#resultsCount").textContent = `${String(count).padStart(2,"0")} PIECES`;
  $("#featured").scrollIntoView({behavior:"smooth", block:"start"});
});

// Category filter
$$(".filter-button").forEach(button => button.addEventListener("click", () => {
  $$(".filter-button").forEach(b => b.classList.remove("selected"));
  button.classList.add("selected");
  $("#productSearch").value = "";
  const filter = button.dataset.filter;
  let count = 0;
  $$(".product-card").forEach(card => {
    const show = filter === "all" || card.dataset.category === filter;
    card.hidden = !show;
    if (show) count++;
  });
  $("#resultsCount").textContent = `${String(count).padStart(2,"0")} PIECES`;
}));

// Demo shopping bag: state lives only in this browser tab and is not a real checkout.
const bag = [];
const bagDialog = $("#bagDialog");
const toast = $("#toast");
let toastTimeout;
function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 3000);
}
function renderBag() {
  $("#bagCount").textContent = bag.length;
  $("#bagItems").innerHTML = bag.length
    ? bag.map((name, i) => `<div class="bag-item"><span>${escapeHTML(name)}</span><button data-remove="${i}">Remove</button></div>`).join("")
    : '<p class="empty-bag">Your bag is waiting for something exceptional.</p>';
  $("#bagTotal").textContent = bag.length;
  $$("[data-remove]", $("#bagItems")).forEach(button => button.addEventListener("click", () => {
    bag.splice(Number(button.dataset.remove), 1);
    renderBag();
  }));
}
function escapeHTML(value) {
  return value.replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));
}
$$("[data-product]").forEach(button => button.addEventListener("click", () => {
  bag.push(button.dataset.product);
  renderBag();
  showToast(`${button.dataset.product} added to your demo bag.`);
}));
$("#bagButton").addEventListener("click", () => bagDialog.showModal());
$("#closeBag").addEventListener("click", () => bagDialog.close());
bagDialog.addEventListener("click", event => {
  if (event.target === bagDialog) bagDialog.close();
});
$("#bagEnquiry").addEventListener("click", () => {
  if (!bag.length) return showToast("Your bag is empty. Explore the collection first.");
  const message = `Hello VELTOR, I would like to enquire about:\n${bag.map(item => "• " + item).join("\n")}\nPlease confirm availability and pricing.`;
  // Replace this demo address with your official business email.
  window.location.href = `mailto:hello@veltor.example?subject=${encodeURIComponent("VELTOR product enquiry")}&body=${encodeURIComponent(message)}`;
});

// Custom-build form opens an email draft; replace the address before launch.
$("#customOrderForm").addEventListener("submit", event => {
  event.preventDefault();
  const data = new FormData(event.currentTarget);
  const lines = [...data.entries()].map(([key, value]) => `${key}: ${value}`).join("\n");
  window.location.href = `mailto:hello@veltor.example?subject=${encodeURIComponent("VELTOR custom shoe enquiry")}&body=${encodeURIComponent(lines)}`;
  showToast("Your email draft is opening. Add your real business email in script.js before launch.");
});

// Static newsletter feedback: connect a mailing service to collect real subscribers.
$("#newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  $("#newsletterMessage").textContent = "Thanks for your interest. Connect a newsletter service to collect subscriptions.";
  event.currentTarget.reset();
});

// If video cannot load, the CSS hero fallback remains visible.
const heroVideo = $("#heroVideo");
heroVideo.addEventListener("error", () => heroVideo.style.display = "none");
heroVideo.addEventListener("canplay", () => heroVideo.classList.add("video-ready"));


// Media resilience: if an externally hosted product image fails, retry with a
// known footwear photograph from Pexels. If that also fails, hide the broken icon.
const FALLBACK_FOOTWEAR_IMAGE = "https://images.pexels.com/photos/296159/pexels-photo-296159.jpeg?auto=compress&cs=tinysrgb&w=1600";
document.querySelectorAll("img[data-media-fallback]").forEach(image => {
  image.addEventListener("error", () => {
    if (!image.dataset.fallbackTried) {
      image.dataset.fallbackTried = "true";
      image.src = image.dataset.mediaFallback || FALLBACK_FOOTWEAR_IMAGE;
    } else {
      image.style.visibility = "hidden";
    }
  });
});
