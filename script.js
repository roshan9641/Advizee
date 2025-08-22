// Navbar
let lastScrollTop = 0;
let ticking = false;
const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      navbar.style.top = (scrollTop > lastScrollTop) ? "-80px" : "0";
      lastScrollTop = scrollTop;
      ticking = false;
    });
    ticking = true;
  }
});

//  WhatsApp number
const whatsappNumber = "919641460041"; 

// Modal Elements
const modal = document.getElementById("contactModal");   
const callModal = document.getElementById("callModal");  

//  Page Loader with Fade Transition
function showPage(page) {
  const content = document.getElementById("content");

  // before content change
  content.classList.remove("fade-in");
  setTimeout(() => {
    switch (page) {
      case "home":
        content.innerHTML = `
          <section class="hero fade-in">
            <h1>Grow Your Business With Us 🚀</h1>
            <p>We provide digital solutions that help you connect with your customers faster.</p>
            <div class="btn-group">
              <a href="#" id="bookCallBtn" class="btn">📞 Book a Call</a>
              <a href="https://wa.me/${whatsappNumber}" target="_blank" class="btn whatsapp">💬 Chat on WhatsApp</a>
            </div>
          </section>

          <section class="services fade-in">
            <h2>Our Services</h2>
            <div class="service-grid">
              <div class="card fade-in"><h3>🌐 Web Development</h3><p>Modern websites built for speed & performance.</p></div>
              <div class="card fade-in"><h3>📱 Mobile Apps</h3><p>Cross-platform apps for Android & iOS.</p></div>
              <div class="card fade-in"><h3>📈 Digital Marketing</h3><p>Grow your brand with SEO & ads strategies.</p></div>
            </div>
          </section>
        `;

        // Call button event
        document.getElementById("bookCallBtn").addEventListener("click", (e) => {
          e.preventDefault();
          callModal.style.display = "flex";
        });
        break;

      case "about":
        content.innerHTML = `
          <section class="fade-in">
            <h2>About Us</h2>
            <p>We are a passionate team building modern digital solutions for startups and enterprises.</p>
          </section>
        `;
        break;

      case "services":
        content.innerHTML = `
          <section class="fade-in">
            <h2>Our Services</h2>
            <p>We provide web, mobile, and marketing solutions to grow your business.</p>
          </section>
        `;
        break;

      case "contact":
        modal.style.display = "flex"; 
        break;
    }

    // re-run animations
    animateOnScroll();
  }, 150); 
}

// Active Navbar Link
function setActiveLink(page) {
  const links = document.querySelectorAll("#nav-links a");
  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
    }
  });
}

// Navbar Link Events
document.getElementById("nav-links").addEventListener("click", (e) => {
  if (e.target.tagName === "A") {
    e.preventDefault();
    const page = e.target.getAttribute("data-page");
    showPage(page);
    setActiveLink(page);
  }
});

// Close modals (both close button + outside click)
document.addEventListener("click", (e) => {
  if (e.target === modal || e.target.classList.contains("close")) {
    modal.style.display = "none";
  }
  if (e.target === callModal || e.target.classList.contains("call-close")) {
    callModal.style.display = "none";
  }
});

// WhatsApp Contact Form
document.getElementById("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const name = encodeURIComponent(document.getElementById("name").value);
  const phone = encodeURIComponent(document.getElementById("phone").value);
  const message = encodeURIComponent(document.getElementById("message").value);

  const whatsappURL = `https://wa.me/${whatsappNumber}?text=Hello, my name is ${name}. My contact number is ${phone}. ${message}`;
  window.open(whatsappURL, "_blank");

  form.reset(); 
  modal.style.display = "none"; 
});

// Book a Call 
document.getElementById("callForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const form = e.target;

  const name = document.getElementById("callName").value;
  const phone = document.getElementById("callPhone").value;
  const date = document.getElementById("callDate").value;
  const time = document.getElementById("callTime").value;

  alert(`✅ Thanks ${name}! Your call is scheduled on ${date} at ${time}. We'll contact you at ${phone}.`);

  form.reset(); 
  callModal.style.display = "none"; 
});

// Scroll animations
function animateOnScroll() {
  const elements = document.querySelectorAll(".fade-in");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

// Scroll-to-top button
const scrollBtn = document.createElement("button");
scrollBtn.innerHTML = "⬆️";
scrollBtn.id = "scrollTopBtn";
document.body.appendChild(scrollBtn);

scrollBtn.style.cssText = `
  position: fixed;
  bottom: 80px;
  right: 25px;
  padding: 10px 15px;
  border: none;
  border-radius: 50%;
  background: #007bff;
  color: #fff;
  cursor: pointer;
  font-size: 18px;
  display: none;
  z-index: 2000;
  box-shadow: 0 4px 12px rgba(0,0,0,0.25);
`;

window.addEventListener("scroll", () => {
  scrollBtn.style.display = window.scrollY > 250 ? "block" : "none";
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});


showPage("home");
setActiveLink("home");
