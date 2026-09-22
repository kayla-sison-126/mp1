import "../css/main.scss";

// EXPERIENCE SECTION //////////////////////////////////////////

// text for each card:
const experiences = [
  {
    title: "AbbVie - Software Engineering Intern",
    date: "May 2026 - August 2026",
    bullets: [
      "Engineered custom React diagramming component for enterprise design system using Claude Code & Figma MCP, bridging design-to-code translation and enabling teams to dynamically & collaboratively render text-based diagrams",
      "Leveraged AI workflows to upgrade, test, and ship 7 core design system components, including dropdown filtering, dynamic color modes, and new component properties, directly impacting web and mobile interfaces used by 57,000+ employees",
      "Conducted a technical discovery evaluation for Storybook MCP integration using Claude Code, authoring a structured evaluation plan to assess documentation query accuracy & latency for an internal AI developer platform",
      "Synthesized user feedback on Dovetail from 5+ interviews into design system updates and technical communications",
      "Spearheaded an internal communication series to drive adoption of overlooked system features across development teams",
    ],
  },
  {
    title: "Dulce Tentaciones - Web Developer",
    date: "June 2025 - July 2025",
    bullets: [
      "Co-founded & engineered custom website from scratch for a local bakery using React, JavaScript, and HTML/CSS",
      "Connected Sanity headless Content Management System via its JavaScript client library, implementing dynamic content fetching for real-time menu updates, empowering non-technical owners to update menu items seamlessly",
      "Integrated Brevo RESTful API for mailing list database management & automated, custom-styled marketing emails",
    ],
  },
  {
    title: "OSF HealthCare - Product Design Intern",
    date: "May 2024",
    bullets: [
      "Engineered 7 high-fidelity Figma prototypes and data visualizations for a clinic feedback application, defining client-side survey interaction models and engaging data collection methods to gather patient feedback",
      "Mapped multi-user journey flows, defining conditional UI states and feature requirements to guide application architecture",
    ],
  },
];

let currentExperienceIndex = 0;
let isCarouselAnimating = false;

// build the carousel shell once: arrows + an empty card container
// arrows never get re-rendered, so their listeners are only attached once
function initExperienceCarousel() {
  const root = document.getElementById("experience-root");
  if (!root) return;

  root.innerHTML = `
    <div class="carousel-wrapper">
      <button class="arrow-btn" id="exp-prev-btn" aria-label="Previous experience">&larr;</button>
      <div class="experience-card" id="experience-card"></div>
      <button class="arrow-btn" id="exp-next-btn" aria-label="Next experience">&rarr;</button>
    </div>
  `;

  renderExperienceCardContent(experiences[currentExperienceIndex]);

  document.getElementById("exp-prev-btn").addEventListener("click", () => {
    goToExperience(-1);
  });

  document.getElementById("exp-next-btn").addEventListener("click", () => {
    goToExperience(1);
  });
}

// fills card with experience's content
function renderExperienceCardContent(exp) {
  const card = document.getElementById("experience-card");
  if (!card) return;

  card.innerHTML = `
    <h3>${exp.title}</h3>
    <p class="date">${exp.date}</p>
    <ul>
      ${exp.bullets.map((bullet) => `<li>${bullet}</li>`).join("")}
    </ul>
  `;
}

// slides current card out, swaps its content once it's off-screen,
// then slides the new content in from the opposite side (CSS3 keyframe animations)
function goToExperience(direction) {
  if (isCarouselAnimating) return; // ignore clicks mid-animation
  isCarouselAnimating = true;

  const card = document.getElementById("experience-card");
  const outClass = direction === 1 ? "slide-out-left" : "slide-out-right";
  const inClass = direction === 1 ? "slide-in-right" : "slide-in-left";

  card.classList.add(outClass);

  card.addEventListener("animationend", function handleSlideOut() {
    card.removeEventListener("animationend", handleSlideOut);
    card.classList.remove(outClass);

    // wraps around if gone thru all cards
    currentExperienceIndex =
      direction === 1
        ? currentExperienceIndex === experiences.length - 1
          ? 0
          : currentExperienceIndex + 1
        : currentExperienceIndex === 0
        ? experiences.length - 1
        : currentExperienceIndex - 1;

    renderExperienceCardContent(experiences[currentExperienceIndex]);
    card.classList.add(inClass);

    card.addEventListener("animationend", function handleSlideIn() {
      card.removeEventListener("animationend", handleSlideIn);
      card.classList.remove(inClass);
      isCarouselAnimating = false;
    });
  });
}

// PROJECTS SECTION //////////////////////////////////////////
const projects = [
  {
    id: 1,
    title: "Goat Together!",
    tech: "[React Native/Expo, TypeScript, Supabase]",
    shortDesc:
      "A habit tracker app that uses your friends to keep you accountable! Submit pictures of your completed goals for your friend to verify.",
    longDesc:
      "Goat Together uses Supabase real-time storage to send verification photos between users. Built during a hackathon to solve goal abandonment.",
    link: "https://github.com/kayla-sison-126/cs-girlies-hackathon",
    videoUrl: "assets/goattogether.mp4",
  },
  {
    id: 2,
    title: "Dataset Cleaner & SQL Tool",
    tech: "[R, R Shiny, SQL, HTML, CSS, Tidyverse]",
    shortDesc:
      "An interactive web app for data cleaning and live SQL querying on structured datasets!",
    longDesc:
      "Allows users to upload messy CSVs, perform pipeline transformations, and test raw SQL queries with instant visualization feedback.",
    link: "https://github.com/kayla-sison-126/dataset-cleaner",
  },
  {
    id: 3,
    title: "CS Resource Forum",
    tech: "[Python/Flask, AWS EC2, JS, HTML/CSS, Bootstrap]",
    shortDesc:
      "An API + front-end web app that serves as a bastion of helpful CS resources for students!",
    longDesc:
      "Hosted on AWS EC2, featuring user authentication, resource tagging, and upvoting mechanics.",
    link: "https://github.com/kayla-sison-126/CS-Resource-Forum",
  },
  {
    id: 4,
    title: "Clinic Feedback Application",
    tech: "[Figma, Canva]",
    shortDesc:
      "An application prototype for OSF HealthCare's clinics, featuring engaging survey methods and intuitive data visualizations!",
    longDesc:
      "Designed 7 key user flows tested with clinical staff to improve patient survey completion rates by 40%.",
    link: "#",
  },
  {
    id: 5,
    title: "Official WiCS Website",
    tech: "[Figma]",
    shortDesc:
      "A website prototype for Women in Computer Science, featuring custom React components and UI/UX appealing to both members & sponsors!",
    longDesc:
      "High-fidelity Figma design created for UIUC WiCS to showcase events, corporate sponsors, and committee registration.",
    link: "https://wics-uic.github.io/WiCS-Website/",
  },
  {
    id: 6,
    title: "Local Bakery Website",
    tech: "[React, JavaScript, HTML, CSS]",
    shortDesc:
      "A fullstack web application for a local Chicago bakery, utilizing Sanity CMS library for seamless menu updates and Brevo API for easy mailing list management!",
    longDesc:
      "Built custom React menu components hooked up to Sanity headless CMS with automated promotional email delivery via Brevo REST API.",
    link: "#",
  },
];

function renderProjects() {
  const root = document.getElementById("projects-root");
  if (!root) return;

  const grid = document.createElement("div");
  grid.className = "projects-grid";

  projects.forEach((project) => {
    const card = document.createElement("div");
    card.className = "project-card";
    card.innerHTML = `
      <h3>${project.title}</h3>
      <p class="tech-stack">${project.tech}</p>
      <p class="short-desc">${project.shortDesc}</p>
    `;
    // click opens modal for this project
    card.addEventListener("click", () => openProjectModal(project));
    grid.appendChild(card);
  });

  root.innerHTML = "";
  root.appendChild(grid);
}

function openProjectModal(project) {
  // make sure there's never more than one modal in the DOM
  closeProjectModal();

  const overlay = document.createElement("div");
  overlay.className = "modal-overlay";
  overlay.id = "project-modal-overlay";

  const videoHTML = project.videoUrl
    ? `<div class="video-wrapper">
         <video controls>
           <source src="${project.videoUrl}" type="video/mp4" />
           Your browser does not support the video tag.
         </video>
       </div>`
    : "";

  const linkHTML =
    project.link !== "#"
      ? `<a href="${project.link}" target="_blank" rel="noreferrer" class="project-link">View Project &rarr;</a>`
      : "";

  overlay.innerHTML = `
    <div class="modal-content">
      <button class="close-btn" aria-label="Close">&times;</button>
      <h3>${project.title}</h3>
      <p class="tech-stack">${project.tech}</p>
      ${videoHTML}
      <p class="long-desc">${project.longDesc}</p>
      ${linkHTML}
    </div>
  `;

  // click outside the modal content closes it
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeProjectModal();
  });

  overlay
    .querySelector(".close-btn")
    .addEventListener("click", closeProjectModal);

  document.addEventListener("keydown", handleModalEscape);

  document.body.appendChild(overlay);
}

function closeProjectModal() {
  const existing = document.getElementById("project-modal-overlay");
  if (existing) existing.remove();
  document.removeEventListener("keydown", handleModalEscape);
}

function handleModalEscape(e) {
  if (e.key === "Escape") closeProjectModal();
}

// SCROLLING LOGIC ////////////////////////////////////////////////////

document.addEventListener("DOMContentLoaded", () => {
  initExperienceCarousel();
  renderProjects();

  const navbar = document.querySelector(".navbar");
  const navLinks = document.querySelectorAll(".navbar-right a");
  const sections = [
    document.getElementById("about-section"),
    document.getElementById("skills-section"),
    document.getElementById("experience-section"),
    document.getElementById("projects-section"),
    document.getElementById("connect-section"),
  ];

  function handleScroll() {
    const scrollY = window.scrollY;
    const navHeight = navbar ? navbar.offsetHeight : 0;

    // NAVBAR RESIZING
    if (scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // NAVBAR INDICATOR
    let currentActiveId = "";

    // EDGE CASE: if user reached bottom of page
    const isAtBottom =
      window.innerHeight + window.scrollY >=
      document.documentElement.scrollHeight - 15;

    if (isAtBottom) {
      currentActiveId = "connect-section";
    } else {
      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop - navHeight - 60;
          if (scrollY >= sectionTop) {
            currentActiveId = section.id;
          }
        }
      });
    }

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentActiveId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", handleScroll);
  handleScroll();
});
