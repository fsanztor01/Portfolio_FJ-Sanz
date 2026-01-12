// Project Data
const projects = [
    {
        id: 1,
        title: "Racker",
        description: "Sistema avanzado de seguimiento para entrenamientos de fuerza. Permite gestionar repeticiones, pesos y progresiones con una interfaz nativa optimizada.",
        githubUrl: "https://github.com/fsanztor01/TrainTracker",
        liveUrl: "https://github.com/fsanztor01",
        images: [
            "images/racker_1.png",
            "images/racker_2.png"
        ],
        technologies: ["React Native", "TypeScript", "Zustand"]
    },
    {
        id: 2,
        title: "Trim Time",
        description: "Gestión inteligente de citas para barberías y salones. Automatiza la agenda de clientes y la organización de servicios profesionales.",
        githubUrl: "https://github.com/fsanztor01/TrimTime",
        liveUrl: "https://github.com/fsanztor01",
        images: [
            "https://images.unsplash.com/photo-1503951914875-452162b0f3f1?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1585747860715-2ba37e788b70?auto=format&fit=crop&q=80&w=800"
        ],
        technologies: ["JavaScript", "ES6 Modules", "CSS", "HTML"]
    },
    {
        id: 3,
        title: "Easy Tracker",
        description: "Evolución de TrainTracker enfocado en la simplicidad y el análisis de datos. Visualiza tu progreso con gráficas dinámicas y estadísticas detalladas. PWA para una experiencia fluida y eficiente especialmente para móviles",
        githubUrl: "https://github.com/fsanztor01",
        liveUrl: "https://github.com/fsanztor01",
        images: [
            "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800",
            "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800"
        ],
        technologies: ["JavaScript", "CSS", "HTML"]
    },
    {
        id: 4,
        title: "Mr.Lucky",
        description: "Plataforma interactiva con mecánicas de gamificación. Un laboratorio de experimentación UI/UX con animaciones fluidas y lógica compleja.",
        githubUrl: "https://github.com/fsanztor01/Mr.Lucky",
        liveUrl: "https://github.com/fsanztor01",
        images: [
            "images/lucky_1.png",
            "images/lucky_2.png",
            "https://images.unsplash.com/photo-1614850523296-d8c1af93d400?auto=format&fit=crop&q=80&w=800"
        ],
        technologies: ["JavaScript", "CSS", "HTML"]
    }
];

// Initialize DOM elements
document.addEventListener('DOMContentLoaded', () => {
    initNavbar();
    initTheme();
    renderProjects();
    initScrollReveal();
});

// Navbar scroll effect
function initNavbar() {
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// Theme management
function initTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    if (!themeToggle) return;
    const icon = themeToggle.querySelector('i');

    // Default to dark unless explicitly set to light
    const savedTheme = localStorage.getItem('theme') || 'dark';

    if (savedTheme === 'light') {
        document.body.classList.remove('dark-theme');
        document.body.classList.add('light-theme');
        icon?.classList.replace('fa-moon', 'fa-sun');
    } else {
        document.body.classList.add('dark-theme');
        document.body.classList.remove('light-theme');
        icon?.classList.replace('fa-sun', 'fa-moon');
    }

    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('dark-theme')) {
            document.body.classList.replace('dark-theme', 'light-theme');
            icon?.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('theme', 'light');
        } else {
            document.body.classList.replace('light-theme', 'dark-theme');
            icon?.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('theme', 'dark');
        }
    });
}

// Scroll Reveal Initialization
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                // Optional: stop observing once it's revealed
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    reveals.forEach(el => observer.observe(el));
}

// Render projects
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    projects.forEach((project, index) => {
        const card = document.createElement('div');
        card.className = `project-card reveal reveal-delay-${(index % 3) + 1}`;

        const tagsHtml = project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('');
        const imagesHtml = project.images.map((img, i) => `
            <div class="image-slide ${i === 0 ? 'active' : ''}" 
                 style="background-image: url('${img}');">
            </div>
        `).join('');

        card.innerHTML = `
            <div class="image-container">
                ${imagesHtml}
            </div>
            <div class="card-content">
                <h3 class="project-title">${project.title}</h3>
                <p class="project-description">${project.description}</p>
                <div class="tech-tags">
                    ${tagsHtml}
                </div>
                <div class="project-links">
                    <a href="${project.githubUrl}" target="_blank" class="project-link github-btn">
                        <i class="fab fa-github"></i> GitHub
                    </a>
                </div>
            </div>
        `;

        container.appendChild(card);
        initImageSlideshow(card);

        // Re-read reveal list if injecting dynamically
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) entry.target.classList.add('active');
            });
        }, { threshold: 0.1 });
        observer.observe(card);
    });
}

// Image slideshow logic
function initImageSlideshow(card) {
    const slides = card.querySelectorAll('.image-slide');
    if (slides.length <= 1) return;

    let currentIndex = 0;
    let interval;

    const startSlideshow = () => {
        interval = setInterval(() => {
            slides[currentIndex].classList.remove('active');
            currentIndex = (currentIndex + 1) % slides.length;
            slides[currentIndex].classList.add('active');
        }, 3000);
    };

    const stopSlideshow = () => {
        clearInterval(interval);
    };

    card.addEventListener('mouseenter', startSlideshow);
    card.addEventListener('mouseleave', stopSlideshow);
}


