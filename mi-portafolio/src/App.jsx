import { useState, useEffect, useRef } from "react";

const NAV_LINKS = ["Inicio", "Sobre mí", "Habilidades", "Proyectos", "Contacto"];

const SKILLS = {
  Frontend: ["React", "TypeScript", "JavaScript", "Vite", "HTML5", "CSS3"],
  Backend: ["Spring Boot", "Java", "Node.js", "REST APIs"],
  Database: ["PostgreSQL", "MongoDB", "MySQL"],
  Tools: ["Git", "GitHub", "Kali Linux", "VS Code", "Figma"],
  "En aprendizaje": ["Cybersecurity", "Docker", "AWS"],
};

const PROJECTS = [
  {
    title: "Hospital Management System",
    description:
      "Full-stack web application for managing hospital operations including patient records, appointments, and staff. Features role-based authentication and a clean layered architecture.",
    tech: ["React", "TypeScript", "Spring Boot", "PostgreSQL"],
    color: "#00f5c4",
    icon: "🏥",
    github: "https://github.com/irvingVlad/proyecto-Hospital",
    demo: null,
  },
  {
    title: "Event Management REST API",
    description:
      "RESTful API for creating and managing events built with Spring Boot. Includes full CRUD operations, input validation, structured error handling, and clean layered architecture.",
    tech: ["Spring Boot", "Java", "PostgreSQL", "REST API"],
    color: "#7c6bff",
    icon: "📅",
    github: "https://github.com/SalvadorVentura/UESPOO2025-API_eventos_asistentes_gt02_grupo7",
    demo: null,
  },
  {
    title: "Studio Ghibli Explorer",
    description:
      "React web app that consumes the Studio Ghibli API to display films, characters and locations with a clean, responsive interface and efficient HTTP requests via Axios.",
    tech: ["React", "Vite", "Axios", "CSS3"],
    color: "#ff6b9d",
    icon: "🎬",
    github: "https://github.com/irvingVlad/ghibli-explorer",
    demo: null,
  },
  {
    title: "Numerical Methods Suite",
    description:
      "JavaScript implementation of 6 core numerical methods: Horner, Müller, linear interpolation, Lagrange, and linear regression — with staged Git commit history.",
    tech: ["JavaScript", "Algorithms", "Numerical Analysis"],
    color: "#ffd93d",
    icon: "📐",
    github: "https://github.com/CDA135-2026/2docorto-irvingVlad",
    demo: null,
  },
];

const STYLE = `
  @import url('https://fonts.googleapis.com/css2?family=Space+Mono:wght@400;700&family=Syne:wght@400;600;700;800&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --bg: #060810;
    --bg2: #0d1117;
    --bg3: #111827;
    --surface: #161d2e;
    --border: rgba(255,255,255,0.07);
    --text: #e2e8f0;
    --muted: #64748b;
    --accent: #00f5c4;
    --accent2: #7c6bff;
    --accent3: #ff6b9d;
    --font-display: 'Syne', sans-serif;
    --font-mono: 'Space Mono', monospace;
  }

  html { scroll-behavior: smooth; }

  body {
    background: var(--bg);
    color: var(--text);
    font-family: var(--font-display);
    overflow-x: hidden;
  }

  /* Grain overlay */
  body::before {
    content: '';
    position: fixed;
    inset: 0;
    background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
    pointer-events: none;
    z-index: 9999;
    opacity: 0.35;
  }

  /* NAV */
  .nav {
    position: fixed;
    top: 0; left: 0; right: 0;
    z-index: 100;
    padding: 0 2rem;
    height: 64px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    backdrop-filter: blur(12px);
    background: rgba(6,8,16,0.8);
    border-bottom: 1px solid var(--border);
    transition: all 0.3s;
  }
  .nav-logo {
    font-family: var(--font-mono);
    font-size: 1rem;
    font-weight: 700;
    color: var(--accent);
    letter-spacing: 0.05em;
  }
  .nav-logo span { color: var(--text); }
  .nav-links {
    display: flex;
    gap: 2rem;
    list-style: none;
  }
  .nav-links a {
    font-size: 0.82rem;
    font-weight: 600;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--muted);
    text-decoration: none;
    transition: color 0.2s;
    position: relative;
  }
  .nav-links a::after {
    content: '';
    position: absolute;
    bottom: -4px; left: 0;
    width: 0; height: 1px;
    background: var(--accent);
    transition: width 0.3s;
  }
  .nav-links a:hover { color: var(--accent); }
  .nav-links a:hover::after { width: 100%; }

  /* HERO */
  .hero {
    min-height: 100vh;
    display: flex;
    align-items: center;
    padding: 6rem 2rem 4rem;
    position: relative;
    overflow: hidden;
  }
  .hero-bg {
    position: absolute;
    inset: 0;
    background:
      radial-gradient(ellipse 60% 50% at 70% 50%, rgba(0,245,196,0.06) 0%, transparent 70%),
      radial-gradient(ellipse 40% 40% at 20% 80%, rgba(124,107,255,0.08) 0%, transparent 60%);
  }
  .hero-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px);
    background-size: 60px 60px;
    mask-image: radial-gradient(ellipse 80% 80% at 50% 50%, black 0%, transparent 100%);
  }
  .hero-content {
    max-width: 900px;
    margin: 0 auto;
    position: relative;
    z-index: 1;
  }
  .hero-tag {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--accent);
    border: 1px solid rgba(0,245,196,0.3);
    padding: 0.35rem 0.85rem;
    border-radius: 2px;
    margin-bottom: 2rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .hero-tag::before {
    content: '';
    width: 6px; height: 6px;
    background: var(--accent);
    border-radius: 50%;
    animation: pulse 2s infinite;
  }
  @keyframes pulse {
    0%, 100% { opacity: 1; transform: scale(1); }
    50% { opacity: 0.4; transform: scale(0.8); }
  }
  .hero-name {
    font-size: clamp(3rem, 8vw, 6rem);
    font-weight: 800;
    line-height: 0.95;
    margin-bottom: 1rem;
    letter-spacing: -0.03em;
  }
  .hero-name .line2 {
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .hero-desc {
    font-size: 1.1rem;
    color: var(--muted);
    max-width: 500px;
    line-height: 1.7;
    margin-bottom: 2.5rem;
    font-weight: 400;
  }
  .hero-desc strong { color: var(--text); font-weight: 600; }
  .hero-ctas {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.8rem;
    background: var(--accent);
    color: var(--bg);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: none;
    cursor: pointer;
    text-decoration: none;
    clip-path: polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px));
    transition: all 0.2s;
  }
  .btn-primary:hover { background: #00ddb0; transform: translateY(-2px); }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.8rem 1.8rem;
    background: transparent;
    color: var(--text);
    font-family: var(--font-mono);
    font-size: 0.8rem;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    border: 1px solid var(--border);
    cursor: pointer;
    text-decoration: none;
    transition: all 0.2s;
  }
  .btn-secondary:hover { border-color: var(--accent); color: var(--accent); }

  .hero-stats {
    display: flex;
    gap: 3rem;
    margin-top: 4rem;
    padding-top: 2rem;
    border-top: 1px solid var(--border);
  }
  .stat-value {
    font-size: 1.8rem;
    font-weight: 800;
    color: var(--accent);
    font-family: var(--font-mono);
  }
  .stat-label {
    font-size: 0.75rem;
    color: var(--muted);
    text-transform: uppercase;
    letter-spacing: 0.1em;
    margin-top: 0.2rem;
  }

  /* SECTIONS */
  .section {
    padding: 6rem 2rem;
    max-width: 1000px;
    margin: 0 auto;
  }
  .section-label {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    color: var(--accent);
    letter-spacing: 0.15em;
    text-transform: uppercase;
    margin-bottom: 0.5rem;
  }
  .section-title {
    font-size: clamp(1.8rem, 4vw, 2.8rem);
    font-weight: 800;
    letter-spacing: -0.02em;
    margin-bottom: 3rem;
    line-height: 1.1;
  }
  .section-title em {
    font-style: normal;
    background: linear-gradient(135deg, var(--accent) 0%, var(--accent2) 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  .divider {
    width: 100%;
    height: 1px;
    background: var(--border);
    margin: 0;
  }

  /* ABOUT */
  .about-grid {
    display: grid;
    grid-template-columns: 1.2fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  .about-text p {
    color: var(--muted);
    line-height: 1.8;
    margin-bottom: 1.2rem;
    font-size: 0.97rem;
  }
  .about-text p strong { color: var(--text); }
  .about-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
  }
  .about-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
  }
  .about-card-title {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--accent);
    letter-spacing: 0.1em;
    text-transform: uppercase;
    margin-bottom: 1rem;
  }
  .about-info-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0.6rem 0;
    border-bottom: 1px solid var(--border);
    font-size: 0.85rem;
  }
  .about-info-row:last-child { border-bottom: none; }
  .about-info-row span:first-child { color: var(--muted); }
  .about-info-row span:last-child { color: var(--text); font-weight: 600; }

  /* SKILLS */
  .skills-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.5rem;
  }
  .skill-category {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 1.5rem;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    transition: border-color 0.2s;
  }
  .skill-category:hover { border-color: rgba(0,245,196,0.3); }
  .skill-cat-name {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--accent);
    margin-bottom: 1rem;
  }
  .skill-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .skill-tag {
    font-family: var(--font-mono);
    font-size: 0.72rem;
    padding: 0.3rem 0.7rem;
    background: rgba(255,255,255,0.04);
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--text);
    letter-spacing: 0.05em;
    transition: all 0.2s;
  }
  .skill-tag:hover {
    background: rgba(0,245,196,0.1);
    border-color: rgba(0,245,196,0.4);
    color: var(--accent);
  }

  /* PROJECTS */
  .projects-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
    gap: 1.5rem;
  }
  .project-card {
    background: var(--surface);
    border: 1px solid var(--border);
    padding: 2rem;
    border-radius: 2px;
    position: relative;
    overflow: hidden;
    transition: all 0.3s;
    cursor: pointer;
  }
  .project-card:hover {
    transform: translateY(-4px);
    border-color: rgba(255,255,255,0.15);
    box-shadow: 0 20px 40px rgba(0,0,0,0.4);
  }
  .project-card::before {
    content: '';
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 2px;
    transition: opacity 0.3s;
    opacity: 0.6;
  }
  .project-card:hover::before { opacity: 1; }
  .project-header {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    margin-bottom: 1rem;
  }
  .project-icon {
    font-size: 2rem;
    line-height: 1;
  }
  .project-links {
    display: flex;
    gap: 0.5rem;
  }
  .project-link {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 32px; height: 32px;
    background: rgba(255,255,255,0.05);
    border: 1px solid var(--border);
    border-radius: 2px;
    color: var(--muted);
    text-decoration: none;
    font-size: 0.8rem;
    transition: all 0.2s;
  }
  .project-link:hover { color: var(--accent); border-color: var(--accent); }
  .project-title {
    font-size: 1.1rem;
    font-weight: 700;
    margin-bottom: 0.6rem;
    letter-spacing: -0.01em;
  }
  .project-desc {
    font-size: 0.87rem;
    color: var(--muted);
    line-height: 1.65;
    margin-bottom: 1.5rem;
  }
  .project-techs {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }
  .project-tech {
    font-family: var(--font-mono);
    font-size: 0.68rem;
    padding: 0.2rem 0.55rem;
    border-radius: 2px;
    border: 1px solid;
    letter-spacing: 0.05em;
  }

  /* CONTACT */
  .contact-inner {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 4rem;
    align-items: start;
  }
  .contact-text {
    font-size: 0.97rem;
    color: var(--muted);
    line-height: 1.8;
    margin-bottom: 2rem;
  }
  .contact-links {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
  }
  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
    background: var(--surface);
    border: 1px solid var(--border);
    text-decoration: none;
    color: var(--text);
    font-size: 0.9rem;
    transition: all 0.2s;
    border-radius: 2px;
  }
  .contact-item:hover {
    border-color: rgba(0,245,196,0.4);
    color: var(--accent);
    transform: translateX(4px);
  }
  .contact-item-icon {
    font-size: 1rem;
    width: 20px;
    text-align: center;
  }
  .contact-form {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .form-group {
    display: flex;
    flex-direction: column;
    gap: 0.4rem;
  }
  .form-label {
    font-family: var(--font-mono);
    font-size: 0.7rem;
    color: var(--muted);
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
  .form-input, .form-textarea {
    background: var(--surface);
    border: 1px solid var(--border);
    color: var(--text);
    font-family: var(--font-display);
    font-size: 0.9rem;
    padding: 0.75rem 1rem;
    border-radius: 2px;
    outline: none;
    transition: border-color 0.2s;
    resize: none;
  }
  .form-input:focus, .form-textarea:focus {
    border-color: rgba(0,245,196,0.5);
  }
  .form-textarea { min-height: 100px; }

  /* FOOTER */
  .footer {
    border-top: 1px solid var(--border);
    padding: 2rem;
    text-align: center;
  }
  .footer-text {
    font-family: var(--font-mono);
    font-size: 0.75rem;
    color: var(--muted);
    letter-spacing: 0.05em;
  }
  .footer-text span { color: var(--accent); }

  /* CURSOR DOT */
  .cursor-dot {
    position: fixed;
    width: 8px; height: 8px;
    background: var(--accent);
    border-radius: 50%;
    pointer-events: none;
    z-index: 9998;
    transition: transform 0.1s, opacity 0.2s;
    mix-blend-mode: difference;
  }

  /* SCROLL INDICATOR */
  .scroll-progress {
    position: fixed;
    top: 63px; left: 0;
    height: 2px;
    background: linear-gradient(90deg, var(--accent), var(--accent2));
    z-index: 101;
    transition: width 0.1s;
  }

  /* ANIMATIONS */
  .fade-in {
    opacity: 0;
    transform: translateY(20px);
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    .nav-links { display: none; }
    .about-grid, .contact-inner { grid-template-columns: 1fr; gap: 2rem; }
    .projects-grid { grid-template-columns: 1fr; }
    .hero-stats { gap: 1.5rem; }
  }
`;

export default function Portfolio() {
  const [scrollY, setScrollY] = useState(0);
  const [cursor, setCursor] = useState({ x: -100, y: -100 });
  const sectionRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleMove = (e) => setCursor({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    document.querySelectorAll(".fade-in").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const totalHeight = typeof document !== "undefined"
    ? document.body.scrollHeight - window.innerHeight
    : 1;
  const scrollProgress = Math.min((scrollY / totalHeight) * 100, 100);

  return (
    <>
      <style>{STYLE}</style>

      {/* Cursor */}
      <div className="cursor-dot" style={{ left: cursor.x - 4, top: cursor.y - 4 }} />

      {/* Scroll progress */}
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />

      {/* NAV */}
      <nav className="nav">
        <div className="nav-logo">&lt;<span>IrvingVlad</span>/&gt;</div>
        <ul className="nav-links">
          {NAV_LINKS.map((link) => (
            <li key={link}>
              <a href={`#${link.toLowerCase().replace(" ", "-").replace("é", "e").replace("í", "i")}`}>
                {link}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {/* HERO */}
      <section className="hero" id="inicio">
        <div className="hero-bg" />
        <div className="hero-grid" />
        <div className="hero-content">
          <div className="hero-tag">Disponible para oportunidades</div>
          <h1 className="hero-name">
            <div>Irving Vladimir</div>
            <div className="line2">Software Engineer</div>
          </h1>
          <p className="hero-desc">
            Estudiante de <strong>Ingeniería en Desarrollo de Software</strong> en la UES.
            Construyo aplicaciones web full stack con <strong>React, TypeScript y Spring Boot</strong>.
            Apasionado por la <strong>ciberseguridad</strong> y el desarrollo de sistemas escalables.
          </p>
          <div className="hero-ctas">
            <a href="#proyectos" className="btn-primary">Ver proyectos →</a>
            <a href="#contacto" className="btn-secondary">Contáctame</a>
          </div>
          <div className="hero-stats">
            {[
              { v: "4+", l: "Proyectos" },
              { v: "2+", l: "Años codificando" },
              { v: "5+", l: "Tecnologías" },
            ].map(({ v, l }) => (
              <div key={l}>
                <div className="stat-value">{v}</div>
                <div className="stat-label">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* ABOUT */}
      <section className="section" id="sobre-mi">
        <div className="fade-in">
          <div className="section-label">// 01. about</div>
          <h2 className="section-title">Sobre <em>mí</em></h2>
        </div>
        <div className="about-grid fade-in">
          <div className="about-text">
            <p>
              Soy <strong>Irving Vladimir Pérez Javier</strong>, estudiante de Ingeniería en Desarrollo de Software en la
              Universidad de El Salvador (carnet PJ23001). Me apasiona construir soluciones
              digitales que resuelvan problemas reales con código limpio y arquitecturas bien
              pensadas.
            </p>
            <p>
              Mi stack principal es <strong>React + TypeScript</strong> en el frontend y{" "}
              <strong>Spring Boot + Java</strong> en el backend, con bases de datos relacionales
              como PostgreSQL. También tengo experiencia con metodologías de desarrollo de
              software como <strong>Waterfall y Unified Process</strong>.
            </p>
            <p>
              Fuera del desarrollo, exploro el mundo de la{" "}
              <strong>ciberseguridad ofensiva</strong> en mi home lab con Kali Linux, y disfruto
              construir herramientas personales con IA como mi asistente estilo Jarvis.
            </p>
          </div>
          <div className="about-card">
            <div className="about-card-title">// Info</div>
            {[
              ["Universidad", "UES"],
              ["Carrera", "Ing. Desarrollo de Software"],
              ["Carnet", "PJ23001"],
              ["Ubicación", "El Salvador"],
              ["Estado", "Buscando oportunidades"],
              ["Inglés", "Nivel intermedio"],
            ].map(([k, v]) => (
              <div className="about-info-row" key={k}>
                <span>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* SKILLS */}
      <section className="section" id="habilidades">
        <div className="fade-in">
          <div className="section-label">// 02. skills</div>
          <h2 className="section-title">Mis <em>habilidades</em></h2>
        </div>
        <div className="skills-grid">
          {Object.entries(SKILLS).map(([cat, skills], i) => (
            <div className="skill-category fade-in" key={cat} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className="skill-cat-name">{cat}</div>
              <div className="skill-tags">
                {skills.map((s) => (
                  <span className="skill-tag" key={s}>{s}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* PROJECTS */}
      <section className="section" id="proyectos">
        <div className="fade-in">
          <div className="section-label">// 03. projects</div>
          <h2 className="section-title">Mis <em>proyectos</em></h2>
        </div>
        <div className="projects-grid">
          {PROJECTS.map((p, i) => (
            <div
              className="project-card fade-in"
              key={p.title}
              style={{
                transitionDelay: `${i * 0.1}s`,
              }}
            >
              <style>{`.project-card:nth-child(${i + 1})::before { background: linear-gradient(90deg, ${p.color}, transparent); }`}</style>
              <div className="project-header">
                <div className="project-icon">{p.icon}</div>
                <div className="project-links">
                  <a href={p.github} className="project-link" title="Ver en GitHub" target="_blank" rel="noreferrer">GH</a>
                  {p.demo && <a href={p.demo} className="project-link" title="Ver demo" target="_blank" rel="noreferrer">↗</a>}
                </div>
              </div>
              <div className="project-title">{p.title}</div>
              <div className="project-desc">{p.description}</div>
              <div className="project-techs">
                {p.tech.map((t) => (
                  <span
                    className="project-tech"
                    key={t}
                    style={{ color: p.color, borderColor: `${p.color}40`, background: `${p.color}10` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="divider" />

      {/* CONTACT */}
      <section className="section" id="contacto">
        <div className="fade-in">
          <div className="section-label">// 04. contact</div>
          <h2 className="section-title">Hablemos <em>pronto</em></h2>
        </div>
        <div className="contact-inner fade-in">
          <div>
            <p className="contact-text">
              Estoy buscando oportunidades como desarrollador junior o practicante. Si tienes
              un proyecto interesante o quieres conectar, escríbeme.
            </p>
            <div className="contact-links">
              {[
                { icon: "✉", label: "pjavier2604@gmail.com", href: "mailto:pjavier2604@gmail.com" },
                { icon: "⌥", label: "github.com/irvingVlad", href: "https://github.com/irvingVlad" },
                { icon: "in", label: "linkedin.com/in/irving-vladimir", href: "https://www.linkedin.com/in/irving-vladimir-perez-javier-593a3972" },
              ].map(({ icon, label, href }) => (
                <a className="contact-item" href={href} key={label}>
                  <span className="contact-item-icon">{icon}</span>
                  <span>{label}</span>
                </a>
              ))}
            </div>
          </div>
          <div className="contact-form">
            <div className="form-group">
              <label className="form-label">Tu nombre</label>
              <input className="form-input" type="text" placeholder="John Doe" />
            </div>
            <div className="form-group">
              <label className="form-label">Tu email</label>
              <input className="form-input" type="email" placeholder="john@email.com" />
            </div>
            <div className="form-group">
              <label className="form-label">Mensaje</label>
              <textarea className="form-textarea" placeholder="Hola Irving, me interesa..." />
            </div>
            <button className="btn-primary" style={{ width: "fit-content" }}>
              Enviar mensaje →
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <p className="footer-text">
          Diseñado & construido por <span>Irving Vladimir Pérez Javier</span> · {new Date().getFullYear()} ·{" "}
          <span>UES — Ingeniería en Desarrollo de Software</span>
        </p>
      </footer>
    </>
  );
}
