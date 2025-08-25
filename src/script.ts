import dotenv from 'dotenv';
dotenv.config();
// Navbar
let lastScrollTop: number = 0;
let ticking: boolean = false;
const navbar: HTMLElement | null = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
      if (navbar) {
        navbar.style.top = (scrollTop > lastScrollTop) ? "-80px" : "0";
      }
      lastScrollTop = scrollTop;
      ticking = false;
    });
    ticking = true;
  }
});

// WhatsApp number
const whatsappNumber: string = process.env.ADVIZEE_WHATSAPP_NO ?? "";

// Modal Elements
const modal: HTMLElement | null = document.getElementById("contactModal");   
const callModal: HTMLElement | null = document.getElementById("callModal");  

// Page Loader with Fade Transition
function showPage(page: string): void {
  const content: HTMLElement | null = document.getElementById("content");
  if (!content) return;

  // Add fade-out for smoother transition (assuming CSS supports .fade-out { opacity: 0; transition: opacity 0.15s; })
  content.classList.add("fade-out");
  content.classList.remove("fade-in");

  setTimeout(() => {
    content.classList.remove("fade-out");

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
        const bookCallBtn = document.getElementById("bookCallBtn") as HTMLAnchorElement | null;
        if (bookCallBtn) {
          bookCallBtn.addEventListener("click", (e: Event) => {
            e.preventDefault();
            if (callModal) {
              callModal.style.display = "flex";
            }
          });
        }
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
        if (modal) {
          modal.style.display = "flex"; 
        }
        return; // No content change for contact, early return to skip animation
    }

    // Re-run animations after content update
    animateOnScroll();
  }, 150); 
}

// Active Navbar Link
function setActiveLink(page: string): void {
  const links: NodeListOf<HTMLAnchorElement> = document.querySelectorAll("#nav-links a");
  links.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("data-page") === page) {
      link.classList.add("active");
    }
  });
}

// Navbar Link Events
const navLinksContainer: HTMLElement | null = document.getElementById("nav-links");
if (navLinksContainer) {
  navLinksContainer.addEventListener("click", (e: Event) => {
    if (e.target instanceof HTMLAnchorElement) {
      e.preventDefault();
      const page: string | null = e.target.getAttribute("data-page");
      if (page) {
        showPage(page);
        setActiveLink(page);
      }
    }
  });
}

// Close modals (both close button + outside click)
document.addEventListener("click", (e: Event) => {
  const target: EventTarget | null = e.target;
  if (target === modal || (target instanceof Element && target.classList.contains("close"))) {
    if (modal) {
      modal.style.display = "none";
    }
  }
  if (target === callModal || (target instanceof Element && target.classList.contains("call-close"))) {
    if (callModal) {
      callModal.style.display = "none";
    }
  }
});

// WhatsApp Contact Form
const contactForm: HTMLFormElement | null = document.getElementById("contactForm") as HTMLFormElement | null;
if (contactForm) {
  contactForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;

    const nameInput: HTMLInputElement | null = document.getElementById("name") as HTMLInputElement | null;
    const phoneInput: HTMLInputElement | null = document.getElementById("phone") as HTMLInputElement | null;
    const messageInput: HTMLTextAreaElement | null = document.getElementById("message") as HTMLTextAreaElement | null;

    if (!nameInput || !phoneInput || !messageInput) return;

    const name: string = encodeURIComponent(nameInput.value);
    const phone: string = encodeURIComponent(phoneInput.value);
    const message: string = encodeURIComponent(messageInput.value);

    const whatsappURL: string = `https://wa.me/${whatsappNumber}?text=Hello, my name is ${name}. My contact number is ${phone}. ${message}`;
    window.open(whatsappURL, "_blank");

    form.reset(); 
    if (modal) {
      modal.style.display = "none"; 
    }
  });
}

// Book a Call 
const callForm: HTMLFormElement | null = document.getElementById("callForm") as HTMLFormElement | null;
if (callForm) {
  callForm.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;

    const nameInput: HTMLInputElement | null = document.getElementById("callName") as HTMLInputElement | null;
    const phoneInput: HTMLInputElement | null = document.getElementById("callPhone") as HTMLInputElement | null;
    const dateInput: HTMLInputElement | null = document.getElementById("callDate") as HTMLInputElement | null;
    const timeInput: HTMLInputElement | null = document.getElementById("callTime") as HTMLInputElement | null;

    if (!nameInput || !phoneInput || !dateInput || !timeInput) return;

    const name: string = nameInput.value;
    const phone: string = phoneInput.value;
    const date: string = dateInput.value;
    const time: string = timeInput.value;

    alert(`✅ Thanks ${name}! Your call is scheduled on ${date} at ${time}. We'll contact you at ${phone}.`);

    form.reset(); 
    if (callModal) {
      callModal.style.display = "none"; 
    }
  });
}

// Scroll animations
function animateOnScroll(): void {
  const elements: NodeListOf<HTMLElement> = document.querySelectorAll(".fade-in");
  const observer: IntersectionObserver = new IntersectionObserver((entries: IntersectionObserverEntry[]) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
}

// Scroll-to-top button
const scrollBtn: HTMLButtonElement = document.createElement("button");
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

// Combined scroll listener for navbar and scroll button for better performance
window.addEventListener("scroll", () => {
  if (!ticking) {
    window.requestAnimationFrame(() => {
      let scrollTop: number = window.pageYOffset || document.documentElement.scrollTop;
      if (navbar) {
        navbar.style.top = (scrollTop > lastScrollTop) ? "-80px" : "0";
      }
      lastScrollTop = scrollTop <= 0 ? 0 : scrollTop; // Prevent negative values
      scrollBtn.style.display = scrollTop > 250 ? "block" : "none";
      ticking = false;
    });
    ticking = true;
  }
});

scrollBtn.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

showPage("home");
setActiveLink("home");