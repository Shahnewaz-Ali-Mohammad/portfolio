"use client";

import { ArrowDownRight, ArrowUpRight, Github, Linkedin, Mail, Phone } from "lucide-react";
import { useEffect, useState } from "react";

type Project = { number: string; title: string; summary: string; stack: string[]; repo: string; images: string[]; kind: string };

const featured: Project[] = [
  { number: "01", title: "Compass Group", summary: "A responsive multi-page consultancy website connecting education, language, tourism, translation, and business services through a cohesive customer journey.", stack: ["JavaScript", "CSS", "Vite", "Responsive UI"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/compass-group-website", images: ["/projects/captures/compass-home.png", "/projects/captures/compass-map.png", "/projects/captures/compass-programs.png"], kind: "Client website" },
  { number: "02", title: "TasteBite", summary: "A complete restaurant ordering experience with menu discovery, persistent cart, validated checkout, order tracking, and an administration portal.", stack: ["React", "TypeScript", "Zustand", "Framer Motion"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/Restaurant-Order-and-Checkout", images: ["/projects/captures/tastebite-home.png", "/projects/captures/tastebite-menu-search.png", "/projects/captures/tastebite-menu-grid.png"], kind: "Product application" },
  { number: "03", title: "Wander", summary: "A tourism discovery experience featuring 32 destinations, advanced filtering, and an interactive map of Bangladesh's eight divisions.", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/wander", images: ["/projects/captures/wander-home.png", "/projects/captures/wander-destinations.png", "/projects/captures/wander-regions.png"], kind: "Tourism experience" },
  { number: "04", title: "Action Plan", summary: "A full-stack health information application with a guided questionnaire, personalized action plans, and interactive cancer-risk visualizations.", stack: ["Vue 3", "Django", "Chart.js", "MySQL"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/Action-Plan", images: ["/projects/captures/action-plan-home.png", "/projects/captures/action-plan-questionnaire.png", "/projects/captures/action-plan-graph.png"], kind: "Data visualization" },
  { number: "05", title: "Dynamic UI Builder", summary: "A visual interface builder for composing responsive layouts from reusable components, applying live styles, and exporting React and Tailwind code.", stack: ["Next.js", "TypeScript", "Tailwind CSS"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/dynamic-ui-builder", images: ["/projects/captures/ui-builder-canvas.png", "/projects/captures/ui-builder-editor.png", "/projects/captures/ui-builder-preview.png"], kind: "Interface tooling" },
  { number: "06", title: "Inventory Management Platform", summary: "An inventory application with natural-language querying, live analytics, workflow automation, and MCP integrations for connected business systems.", stack: [".NET", "SQL Server", "MCP", "Agentic AI"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/InventoryManagementAI", images: ["/projects/captures/inventory-ai-assistant.png", "/projects/captures/inventory-automations.png", "/projects/captures/inventory-products.png"], kind: "Intelligent operations" },
];

const skills = [
  { group: "Frontend", statement: "Responsive, accessible interfaces built as maintainable component systems.", items: ["Next.js", "React", "Vue", "TypeScript", "Tailwind CSS", "State management"], proof: ["Wander", "Dynamic UI Builder", "TasteBite"] },
  { group: "Backend & APIs", statement: "Reliable application logic, data models, and integrations for full-stack products.", items: ["ASP.NET Core", "Django", "PHP", "REST APIs", "SQL Server", "MySQL"], proof: ["Action Plan", "Inventory Management"] },
  { group: "AI Engineering", statement: "Intelligent workflows that connect models with tools, data, and business systems.", items: ["Agentic AI", "AI chatbots", "Workflow automation", "MCP servers", "Tool integration"], proof: ["Inventory Management + MCP"] },
  { group: "Product Quality", statement: "Production-minded delivery focused on performance, testing, and usability.", items: ["Reusable architecture", "Performance", "Automated testing", "Accessible UI", "Figma implementation"], proof: ["Across the portfolio"] },
];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

function ProjectVisual({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % project.images.length), 4000); return () => window.clearInterval(timer); }, [project.images.length]);
  useEffect(() => { project.images.forEach((src) => { const image = new Image(); image.src = src; }); }, [project.images]);
  return <div className="project-visual">
    <div className="project-image-deck">{project.images.map((image, index) => <img className={`project-carousel-image${index === active ? " active" : ""}`} src={assetPath(image)} alt={`${project.title} interface view ${index + 1} of ${project.images.length}`} aria-hidden={index !== active} key={image} />)}</div>
    <div className="visual-count"><span>0{active + 1}</span><i /> <span>0{project.images.length}</span></div>
    <div className="visual-dots" aria-label={`${project.title} screenshot ${active + 1} of ${project.images.length}`}>{project.images.map((image, index) => <button type="button" className={index === active ? "active" : ""} onClick={() => setActive(index)} aria-label={`Show ${project.title} screenshot ${index + 1}`} key={image}>{index + 1}</button>)}</div>
  </div>;
}

function useTypewriter(fullText: string, speed: number, startDelay = 0) {
  const [count, setCount] = useState(0);
  const [started, setStarted] = useState(false);
  const reduceMotion = typeof window !== "undefined" && window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  useEffect(() => {
    if (reduceMotion) { setCount(fullText.length); return; }
    const timer = window.setTimeout(() => setStarted(true), startDelay);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    if (reduceMotion || !started || count >= fullText.length) return;
    const timer = window.setTimeout(() => setCount((current) => current + 1), speed);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [started, count]);
  return { count, done: count >= fullText.length };
}

function TypedRole() {
  const text = "Full-stack web developer";
  const { count, done } = useTypewriter(text, 40, 200);
  return <p className="eyebrow">{text.slice(0, count)}{!done && <span className="typed-caret" aria-hidden="true" />}</p>;
}

function TypedHeadline() {
  const first = "Shahnewaz Ali ";
  const second = "Mohammad";
  const { count, done } = useTypewriter(first + second, 55, 1500);
  const firstDone = count >= first.length;
  const firstTyped = firstDone ? first : (first + second).slice(0, count);
  const secondTyped = firstDone ? (first + second).slice(first.length, count) : "";
  return <h1>{firstTyped}{!firstDone && <span className="typed-caret" aria-hidden="true" />}<span>{secondTyped}{firstDone && !done && <span className="typed-caret" aria-hidden="true" />}</span></h1>;
}

function HeroShowcase() {
  const projects = [
    { src: "/projects/captures/compass-home.png", label: "Compass Group", domain: "compassgroup.com" },
    { src: "/projects/captures/wander-home.png", label: "Wander", domain: "wander.com" },
    { src: "/projects/captures/tastebite-home.png", label: "TasteBite", domain: "tastebite.com" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 5200); return () => window.clearInterval(timer); }, [projects.length]);
  return <div className="hero-showcase" aria-label="Selected project previews">
    <div className="hero-browser-stack">
      {projects.map((project, index) => {
        const position = (index - active + projects.length) % projects.length;
        return <button className={`hero-browser-card stack-position-${position}`} type="button" onClick={() => setActive(index)} aria-label={`Show ${project.label} preview`} aria-current={position === 0} key={project.src}>
          <span className="browser-bar">
            <span className="browser-dots" aria-hidden="true"><i /><i /><i /></span>
            <span className="browser-address"><span className="browser-address-text">{project.domain}</span></span>
          </span>
          <span className="browser-image-deck"><img src={assetPath(project.src)} alt={`${project.label} project preview`} /></span>
        </button>;
      })}
    </div>
  </div>;
}

export default function Home() {
  useEffect(() => {
    const root = document.documentElement;
    const revealTargets = document.querySelectorAll<HTMLElement>(
      ".section-label, .career-entry, .education-entry, .professional-year, .project-copy, .project-visual, .capability-list article, .project-directory > a, .contact > *"
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("motion-ready");
    revealTargets.forEach((element, index) => {
      element.classList.add("reveal-item");
      element.style.setProperty("--reveal-order", String(index % 4));
    });

    if (reducedMotion) {
      revealTargets.forEach((element) => element.classList.add("is-visible"));
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.14, rootMargin: "0px 0px -7%" }
    );
    revealTargets.forEach((element) => observer.observe(element));

    const header = document.querySelector<HTMLElement>(".site-header");
    const gallery = document.querySelector<HTMLElement>(".hero-gallery");
    const onScroll = () => header?.classList.toggle("is-scrolled", window.scrollY > 28);
    const onPointerMove = (event: PointerEvent) => {
      if (!gallery || event.pointerType === "touch") return;
      const bounds = gallery.getBoundingClientRect();
      gallery.style.setProperty("--pointer-x", `${(event.clientX - bounds.left) / bounds.width - 0.5}`);
      gallery.style.setProperty("--pointer-y", `${(event.clientY - bounds.top) / bounds.height - 0.5}`);
    };
    const onPointerLeave = () => {
      gallery?.style.setProperty("--pointer-x", "0");
      gallery?.style.setProperty("--pointer-y", "0");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    gallery?.addEventListener("pointermove", onPointerMove);
    gallery?.addEventListener("pointerleave", onPointerLeave);

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      gallery?.removeEventListener("pointermove", onPointerMove);
      gallery?.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  return <main>
    <header className="site-header"><a className="brand" href="#top" aria-label="Home"><img className="brand-mark" src={assetPath("/logo-mark.svg")} alt="" width="38" height="38" /><strong>SHAHNEWAZ ALI MOHAMMAD</strong></a><nav aria-label="Primary navigation"><a href="#experience">Experience</a><a href="#work">Work</a><a href="#skills">Skills</a></nav></header>
    <section className="hero" id="top"><div className="hero-copy"><div className="eyebrow-row"><TypedRole /><p className="remote-status">Open for Remote Work</p></div><TypedHeadline /><p className="hero-role">I build thoughtful digital products from interface to infrastructure.</p><div className="contact-details hero-contact-details"><a href="mailto:mahishahnewaz@gmail.com" className="contact-detail"><Mail /> mahishahnewaz@gmail.com</a><a href="https://www.linkedin.com/in/-sh-/" target="_blank" rel="noreferrer" className="contact-detail"><Linkedin /> LinkedIn</a><a href="tel:+8801348060117" className="contact-detail"><Phone /> +880 1348-060117</a><a href="https://github.com/Shahnewaz-Ali-Mohammad" target="_blank" rel="noreferrer" className="contact-detail"><Github /> GitHub</a></div><p className="intro">Full-stack web developer building responsive, scalable applications with Next.js, React, TypeScript, JavaScript, Tailwind CSS, PHP, and REST APIs. Experienced in reusable component development, application state, performance, automated testing, and production-ready Figma implementation. Currently working with agentic AI, AI-powered chatbots, workflow automation, and Model Context Protocol servers that connect intelligent applications with external tools, data, and business systems.</p><div className="hero-actions"><a className="button primary" href="#work">View selected work <ArrowDownRight /></a><a className="button secondary" href="#contact">Let&apos;s talk <ArrowUpRight /></a></div><div className="tags" aria-label="Core expertise"><span>Full-stack</span><span>Responsive UI</span><span>React & Next.js</span><span>TypeScript</span><span>REST APIs</span><span>Agentic AI</span><span>MCP servers</span></div></div><HeroShowcase /></section>

    <section className="credentials" id="experience"><div className="section-label"><span>01</span><p>Experience & education</p></div><div className="experience-layout"><article className="experience-panel"><p className="eyebrow">Professional experience</p><h2>Experience</h2><div className="career-timeline">
      <div className="career-entry"><time>Jul 2026<br/>Present</time><span className="timeline-marker" /><div><h3>Software Engineer</h3><p className="career-role">Amber IT Ltd · Full-time</p><p className="career-location">Dhaka, Bangladesh · On-site</p><ul><li>Design and develop agentic AI solutions, including customer-service chatbots and voice agents.</li><li>Build AI-powered analytics with ASP.NET Core MVC, Semantic Kernel, OpenAI, and MCP.</li><li>Engineer .NET automation workflows connecting LLMs, enterprise APIs, SQL databases, and business systems.</li></ul></div></div>
      <div className="career-entry"><time>Jun 2026<br/>Present</time><span className="timeline-marker" /><div><h3>Full Stack Web Developer</h3><p className="career-role">Russian Center For Education · Full-time</p><p className="career-location">Dhaka, Bangladesh · Remote</p><ul><li>Develop full-stack applications with Next.js, TypeScript, Tailwind CSS, MySQL, and PHP.</li><li>Implement schemas, CRUD workflows, APIs, authentication, forms, and content-management features.</li><li>Improve performance, security, and maintainability through validation, testing, debugging, and optimized queries.</li></ul></div></div>
      <div className="career-entry"><time>Apr 2025<br/>Mar 2026</time><span className="timeline-marker" /><div><h3>Software Engineer</h3><p className="career-role">CipherCoreTech · Full-time</p><p className="career-location">Melbourne, Australia · On-site</p><ul><li>Built responsive React and TypeScript interfaces from business requirements and Figma designs.</li><li>Improved performance and maintainability with reusable architecture, Redux, lazy loading, and code splitting.</li><li>Supported delivery through unit testing, UAT, troubleshooting, and Agile collaboration.</li></ul></div></div>
    </div></article><article className="education-panel"><p className="eyebrow">Academic background</p><h2>Education</h2><div className="education-list">
      <div className="education-entry"><div className="school-mark"><img src={assetPath("/swinburne.png")} alt="Swinburne University of Technology logo" /></div><div><p className="degree-level">Master&apos;s degree</p><h3>Master of Information Technology <span>(Professional Computing)</span></h3><p className="school-name">Swinburne University of Technology</p><p className="school-location">Melbourne, Australia</p></div></div>
      <div className="education-entry"><div className="school-mark brac-mark"><img src={assetPath("/brac-university.svg")} alt="BRAC University logo" /></div><div><p className="degree-level">Bachelor&apos;s degree</p><h3>Bachelor of Computer Science</h3><p className="school-name">BRAC University</p><p className="school-location">Dhaka, Bangladesh</p></div></div>
    </div><div className="professional-year"><p className="eyebrow">Professional year</p><div className="education-entry"><div className="school-mark acs-mark"><img src={assetPath("/acs.jpg")} alt="Australian Computer Society logo" /></div><div><p className="degree-level">Professional qualification</p><h3>Professional Year</h3><p className="school-name">Australian Computer Society</p></div></div></div></article></div></section>

    <section className="work" id="work"><div className="section-label"><span>02</span><p>Selected work</p></div>{featured.map((project, index) => <article className={`project ${index % 2 ? "reverse" : ""}`} key={project.title}><div className="project-copy"><span className="project-number">{project.number}</span><p className="eyebrow">{project.kind}</p><h2>{project.title}</h2><p>{project.summary}</p><div className="stack">{project.stack.map(item => <span key={item}>{item}</span>)}</div><a href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight /></a></div><ProjectVisual project={project} /></article>)}</section>
    <section className="capabilities" id="skills"><div className="section-label light"><span>03</span><p>Skills</p></div><div className="capability-list">{skills.map((skill) => <article key={skill.group}><div className="skill-heading"><h3>{skill.group}</h3><p>{skill.statement}</p></div><div className="skill-details"><p className="skill-label">Core toolkit</p><ul>{skill.items.map((item) => <li key={item}>{item}</li>)}</ul></div><div className="skill-proof"><p className="skill-label">Selected work</p><p>{skill.proof.join(" · ")}</p></div></article>)}</div></section>
    <section className="contact" id="contact"><p className="eyebrow">Have a project in mind?</p><h2>Let&apos;s build something useful.</h2><div className="contact-details"><a href="mailto:mahishahnewaz@gmail.com" className="contact-detail"><Mail /> mahishahnewaz@gmail.com</a><a href="https://www.linkedin.com/in/-sh-/" target="_blank" rel="noreferrer" className="contact-detail"><Linkedin /> LinkedIn</a><a href="tel:+8801348060117" className="contact-detail"><Phone /> +880 1348-060117</a><a href="https://github.com/Shahnewaz-Ali-Mohammad" target="_blank" rel="noreferrer" className="contact-detail"><Github /> GitHub</a></div><div className="contact-socials"><a className="button contact-button" href="mailto:mahishahnewaz@gmail.com">Start a conversation <Mail /></a></div></section>
    <footer><div className="footer-line"><span>Full-Stack Development</span><i /><span>Agentic AI Development</span><span className="footer-highlight"><em aria-hidden="true" />Open for Remote Work</span></div><span className="footer-copy">© 2026 Shahnewaz Ali Mohammad</span></footer>
  </main>;
}
