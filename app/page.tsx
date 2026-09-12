"use client";

import { ArrowDownRight, ArrowUpRight, BarChart3, Boxes, ClipboardCheck, Compass, Github, LayoutPanelTop, Mail, MapPinned, Menu, Phone, Scale, Utensils, X, type LucideIcon } from "lucide-react";
import { useEffect, useState } from "react";

type Project = { number: string; title: string; summary: string; stack: string[]; repo?: string; images: string[]; kind: string; icon: LucideIcon };

const projectId = (title: string) => title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const featured: Project[] = [
  { number: "01", title: "Business Intelligence System", summary: "A production-oriented BI platform where users ask general business questions in plain English and an AI data assistant returns structured, database-backed insights, charts, saved reports, and export-ready ecommerce analysis through a governed semantic layer.", stack: ["Next.js 16", "LangGraph", "MCP", "MySQL", "Recharts"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/business-intelligence-system", images: ["/projects/captures/business-intelligence-dashboard.png", "/projects/captures/business-intelligence-chat.png", "/projects/captures/business-intelligence-report.png"], kind: "AI-powered BI dashboard", icon: BarChart3 },
  { number: "02", title: "Legal Capital", summary: "A polished legal-services website for a professional chambers brand, pairing authoritative practice-area content, legal resources, current affairs, team profiles, client sections, and consultation paths inside a responsive, static-export-ready Next.js experience.", stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS", "Static Export"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/legal-capital-website", images: ["/projects/captures/legal-capital-home.png", "/projects/captures/legal-capital-practice-areas.png", "/projects/captures/legal-capital-current-affairs.png"], kind: "Professional services website", icon: Scale },
  { number: "03", title: "Compass Group", summary: "A responsive multi-page consultancy website connecting education, language, tourism, translation, and business services through a cohesive customer journey.", stack: ["JavaScript", "CSS", "Vite", "Responsive UI"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/compass-group-website", images: ["/projects/captures/compass-home.png", "/projects/captures/compass-map.png", "/projects/captures/compass-programs.png"], kind: "Client website", icon: Compass },
  { number: "04", title: "TasteBite", summary: "A complete restaurant ordering experience with menu discovery, persistent cart, validated checkout, order tracking, and an administration portal.", stack: ["React", "TypeScript", "Zustand", "Framer Motion"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/Restaurant-Order-and-Checkout", images: ["/projects/captures/tastebite-home.png", "/projects/captures/tastebite-menu-search.png", "/projects/captures/tastebite-menu-grid.png"], kind: "Product application", icon: Utensils },
  { number: "05", title: "Wander", summary: "A tourism discovery experience featuring 32 destinations, advanced filtering, and an interactive map of Bangladesh's eight divisions.", stack: ["Next.js", "React", "TypeScript", "Tailwind CSS"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/wander", images: ["/projects/captures/wander-home.png", "/projects/captures/wander-destinations.png", "/projects/captures/wander-regions.png"], kind: "Tourism experience", icon: MapPinned },
  { number: "06", title: "Action Plan", summary: "A full-stack health information application with a guided questionnaire, personalized action plans, and interactive cancer-risk visualizations.", stack: ["Vue 3", "Django", "Chart.js", "MySQL"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/Action-Plan", images: ["/projects/captures/action-plan-home.png", "/projects/captures/action-plan-questionnaire.png", "/projects/captures/action-plan-graph.png"], kind: "Data visualization", icon: ClipboardCheck },
  { number: "07", title: "Dynamic UI Builder", summary: "A visual interface builder for composing responsive layouts from reusable components, applying live styles, and exporting React and Tailwind code.", stack: ["Next.js", "TypeScript", "Tailwind CSS"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/dynamic-ui-builder", images: ["/projects/captures/ui-builder-canvas.png", "/projects/captures/ui-builder-editor.png", "/projects/captures/ui-builder-preview.png"], kind: "Interface tooling", icon: LayoutPanelTop },
  { number: "08", title: "Inventory Management Platform", summary: "An inventory application with natural-language querying, live analytics, workflow automation, and MCP integrations for connected business systems.", stack: [".NET", "SQL Server", "MCP", "Agentic AI"], repo: "https://github.com/Shahnewaz-Ali-Mohammad/InventoryManagementAI", images: ["/projects/captures/inventory-ai-assistant.png", "/projects/captures/inventory-automations.png", "/projects/captures/inventory-products.png"], kind: "Intelligent operations", icon: Boxes },
];

const skills = [
  { group: "Frontend", statement: "Responsive, accessible interfaces built as maintainable component systems.", items: ["Next.js", "React", "Vue", "TypeScript", "Tailwind CSS", "State management"], proof: ["Wander", "Dynamic UI Builder", "TasteBite"] },
  { group: "Backend & APIs", statement: "Reliable application logic, data models, and integrations for full-stack products.", items: ["ASP.NET Core", "Django", "PHP", "REST APIs", "SQL Server", "MySQL"], proof: ["Business Intelligence System", "Action Plan", "Inventory Management"] },
  { group: "AI Engineering", statement: "Intelligent workflows that connect models with tools, data, and business systems.", items: ["Agentic AI", "AI chatbots", "Workflow automation", "MCP servers", "Tool integration"], proof: ["Business Intelligence System", "Inventory Management + MCP"] },
  { group: "Product Quality", statement: "Production-minded delivery focused on performance, testing, and usability.", items: ["Reusable architecture", "Performance", "Automated testing", "Accessible UI", "Figma implementation"], proof: ["Across the portfolio"] },
];

const assetPath = (path: string) => `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`;

const pageX = "px-[clamp(24px,5vw,80px)]";
const eyebrowClass = "eyebrow m-0 text-[clamp(12px,1vw,14px)] font-black uppercase tracking-[0.14em] text-[#175c46]";
const pillClass = "inline-flex min-h-8 items-center justify-center rounded-full border border-[#ced6d0] bg-[#fbfbf8] px-3 py-1.5 text-xs font-extrabold text-[#0d2f25]";
const iconDiscClass = "grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#185442] to-[#0d2f25] text-white shadow-[0_8px_18px_rgba(13,47,37,.1)] [&_svg]:size-5 [&_svg]:stroke-white";
const primaryButtonClass = "button primary relative isolate inline-flex min-h-[66px] items-center justify-center gap-5 overflow-hidden rounded-[14px] border border-transparent bg-gradient-to-b from-[#185442] to-[#0d2f25] px-8 text-[15px] font-black !text-white shadow-[0_8px_18px_rgba(13,47,37,.055)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-80%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(13,47,37,.18)] hover:before:translate-x-[360%] active:translate-y-0 [&_svg]:!text-white [&_svg]:!stroke-white";
const secondaryButtonClass = "button secondary inline-flex min-h-[66px] items-center justify-center gap-5 rounded-[14px] border-2 border-[#0d2f25] bg-white/50 px-8 text-[15px] font-black text-[#0d2f25] transition-all duration-300 hover:-translate-y-1 hover:bg-white hover:shadow-[0_16px_34px_rgba(13,47,37,.1)] active:translate-y-0";

function ProjectVisual({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % project.images.length), 4000); return () => window.clearInterval(timer); }, [project.images.length]);
  useEffect(() => { project.images.forEach((src) => { const image = new Image(); image.src = src; }); }, [project.images]);
  return <div className="project-visual relative min-h-[460px] overflow-visible bg-transparent">
    <div className="project-image-deck relative h-full w-full overflow-visible">{project.images.map((image, index) => {
      const position = (index - active + project.images.length) % project.images.length;
      return <button className={`project-browser-card stack-position-${position} absolute left-1/2 top-1/2 flex flex-col overflow-hidden rounded-[10px] border border-[#cdd6d0] bg-white p-0 text-inherit shadow-[0_14px_30px_rgba(13,47,37,.1)] transition-[transform,box-shadow,border-color] duration-700`} type="button" onClick={() => setActive(index)} aria-label={`Show ${project.title} screenshot ${index + 1}`} aria-current={position === 0} key={image}>
        <span className="browser-bar flex h-[34px] shrink-0 items-center gap-3 border-b border-[#d8ded9] bg-[#f7f7f3] px-3 py-2">
          <span className="browser-dots flex shrink-0 gap-1.5" aria-hidden="true"><i /><i /><i /></span>
          <span className="browser-address block min-w-0 flex-1 overflow-hidden"><span className="browser-address-text block w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-[#dde3de] bg-white px-3 py-1 text-center text-[10px] font-black leading-none text-[#68736e]">{project.title.toLowerCase().replaceAll(" ", "-")}.app</span></span>
        </span>
        <span className="browser-image-deck grid min-h-0 flex-1 bg-[#e9edea] p-2.5"><img className="project-carousel-image h-full w-full object-contain" src={assetPath(image)} alt={`${project.title} interface view ${index + 1} of ${project.images.length}`} /></span>
      </button>;
    })}</div>
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
  return <p className={eyebrowClass}>{text.slice(0, count)}{!done && <span className="typed-caret" aria-hidden="true" />}</p>;
}

function TypedHeadline() {
  const first = "Shahnewaz Ali ";
  const second = "Mohammad";
  const { count, done } = useTypewriter(first + second, 55, 1500);
  const firstDone = count >= first.length;
  const firstTyped = firstDone ? first : (first + second).slice(0, count);
  const secondTyped = firstDone ? (first + second).slice(first.length, count) : "";
  return <h1 className="typed-headline my-6 font-[var(--font-display)] text-[clamp(48px,4.65vw,70px)] font-semibold leading-[.98] tracking-normal text-[#12231d] max-[900px]:text-[clamp(48px,8vw,66px)] max-[600px]:text-[42px]">
    <span className="typed-headline-line typed-headline-first block leading-[.96]">{firstTyped}{!firstDone && <span className="typed-caret" aria-hidden="true" />}</span>
    {firstDone && <span className="typed-headline-line typed-headline-second block leading-[.96] text-[#175c46]">{secondTyped}{!done && <span className="typed-caret" aria-hidden="true" />}</span>}
  </h1>;
}

function HeroShowcase() {
  const projects = [
    { src: "/projects/captures/business-intelligence-dashboard.png", label: "Business Intelligence System", domain: "businessIntelligenceSystem.com" },
    { src: "/projects/captures/compass-home.png", label: "Compass Group", domain: "compassgroup.com" },
    { src: "/projects/captures/legal-capital-home.png", label: "Legal Capital", domain: "legalcapital.com" },
    { src: "/projects/captures/wander-home.png", label: "Wander", domain: "wander.com" },
    { src: "/projects/captures/tastebite-home.png", label: "TasteBite", domain: "tastebite.com" },
  ];
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % projects.length), 5200); return () => window.clearInterval(timer); }, [projects.length]);
  return <div className="hero-showcase [grid-area:showcase] w-[min(100%,850px)] justify-self-end overflow-visible [perspective:1600px] max-[900px]:justify-self-center" aria-label="Selected project previews">
    <div className="hero-browser-stack relative mx-auto h-[clamp(460px,34vw,660px)] w-[min(100%,900px)] overflow-visible [transform-style:preserve-3d] max-[900px]:h-[clamp(470px,70vw,650px)] max-[600px]:h-[clamp(420px,88vw,520px)]">
      {projects.map((project, index) => {
        const position = (index - active + projects.length) % projects.length;
        return <button className={`hero-browser-card stack-position-${position} absolute left-1/2 top-1/2 flex flex-col overflow-hidden rounded-[10px] border border-[#cdd6d0] bg-white p-0 text-inherit shadow-[0_18px_46px_rgba(13,47,37,.08)] transition-[transform,box-shadow,border-color] duration-700`} type="button" onClick={() => setActive(index)} aria-label={`Show ${project.label} preview`} aria-current={position === 0} key={project.src}>
          <span className="browser-bar flex h-[34px] shrink-0 items-center gap-3 border-b border-[#d8ded9] bg-[#f7f7f3] px-3 py-2">
            <span className="browser-dots flex shrink-0 gap-1.5" aria-hidden="true"><i /><i /><i /></span>
            <span className="browser-address block min-w-0 flex-1 overflow-hidden"><span className="browser-address-text block w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-[#dde3de] bg-white px-3 py-1 text-center text-[10px] font-black leading-none text-[#68736e]">{project.domain}</span></span>
          </span>
          <span className="browser-image-deck grid min-h-0 flex-1 bg-[#e9edea] p-2.5"><img className="h-full w-full object-contain" src={assetPath(project.src)} alt={`${project.label} project preview`} /></span>
        </button>;
      })}
    </div>
  </div>;
}

function ProjectMarquee() {
  const marqueeProjects = [...featured, ...featured];
  return <div className="project-marquee bg-[#f6f5f0] px-[clamp(24px,5vw,80px)] pb-16" id="project-list" aria-label="Project quick links">
    <div className="project-marquee-viewport overflow-hidden py-7">
      <div className="project-marquee-track flex gap-4">
        {marqueeProjects.map((project, index) => <a className="project-marquee-card flex min-h-[128px] w-[290px] shrink-0 items-center gap-4 rounded-[8px] bg-white p-5 shadow-[0_5px_14px_rgba(13,47,37,.035)] transition-transform hover:-translate-y-1" href={`#${projectId(project.title)}`} key={`${project.title}-${index}`} aria-label={`Jump to ${project.title}`}>
          <span className="project-marquee-icon grid size-11 shrink-0 place-items-center rounded-[12px] bg-gradient-to-b from-[#185442] to-[#0d2f25] text-white" aria-hidden="true"><project.icon /></span>
          <span className="project-marquee-copy flex min-w-0 flex-col gap-3">
            <strong className="text-sm font-black leading-tight text-[#12231d]">{project.title}</strong>
            <span className="flex flex-wrap gap-1.5">{project.stack.slice(0, 3).map((item) => <i className="rounded-full bg-[#e9f1ed] px-2 py-1 text-[10px] font-black not-italic text-[#0d2f25]" key={item}>{item}</i>)}</span>
          </span>
        </a>)}
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("experience");

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleOutsidePointerDown = (event: PointerEvent) => {
      const target = event.target as Node | null;
      const header = document.querySelector<HTMLElement>(".site-header");

      if (target && header?.contains(target)) return;
      setMobileMenuOpen(false);
    };

    document.addEventListener("pointerdown", handleOutsidePointerDown);
    return () => document.removeEventListener("pointerdown", handleOutsidePointerDown);
  }, [mobileMenuOpen]);

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
    const gallery = document.querySelector<HTMLElement>(".hero-showcase");
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

    const sections = ["experience", "work", "skills"]
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const sectionObserver = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible?.target.id) setActiveSection(visible.target.id);
      },
      { threshold: [0.18, 0.32, 0.5], rootMargin: "-22% 0px -55%" }
    );
    sections.forEach((section) => sectionObserver.observe(section));

    return () => {
      observer.disconnect();
      sectionObserver.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      gallery?.removeEventListener("pointermove", onPointerMove);
      gallery?.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    closeMobileMenu();
  };

  return <main>
    <header className={`site-header ${pageX} sticky top-0 z-20 grid h-[82px] max-h-[82px] min-h-[82px] grid-cols-[minmax(260px,1fr)_auto_minmax(220px,1fr)] items-center border-b border-[#ced6d0] bg-[#f6f5f0]/95 backdrop-blur-[14px] max-[1280px]:grid-cols-[minmax(0,1fr)_auto] max-[720px]:h-[78px] max-[720px]:min-h-[78px] max-[720px]:px-[18px]${mobileMenuOpen ? " mobile-menu-open" : ""}`}>
      <a className="brand flex min-w-0 items-center gap-3 justify-self-start text-sm font-black tracking-[0.035em] text-[#12231d]" href="#top" aria-label="Home" onClick={closeMobileMenu}><img className="brand-mark block size-[38px] shrink-0" src={assetPath("/logo-mark.svg")} alt="" width="38" height="38" /><strong className="block whitespace-nowrap text-base leading-none max-[1280px]:max-w-[min(420px,52vw)] max-[1280px]:text-[15px] max-[720px]:max-w-[min(260px,42vw)] max-[720px]:whitespace-normal max-[720px]:text-[13px] max-[720px]:leading-[1.08]">SHAHNEWAZ ALI MOHAMMAD</strong></a>
      <nav className="desktop-nav flex items-center justify-self-center gap-[clamp(28px,3.5vw,58px)] text-[13px] font-extrabold max-[1280px]:hidden" aria-label="Primary navigation"><a className={`relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-[14px] px-6 leading-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f25]/5 hover:text-[#175c46] hover:shadow-[0_12px_26px_rgba(13,47,37,.08)] ${activeSection === "experience" ? "active" : ""}`} href="#experience" aria-current={activeSection === "experience" ? "page" : undefined} onClick={() => handleNavClick("experience")}>Experience</a><a className={`relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-[14px] px-6 leading-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f25]/5 hover:text-[#175c46] hover:shadow-[0_12px_26px_rgba(13,47,37,.08)] ${activeSection === "work" ? "active" : ""}`} href="#work" aria-current={activeSection === "work" ? "page" : undefined} onClick={() => handleNavClick("work")}>Work</a><a className={`relative inline-flex min-h-12 items-center justify-center overflow-hidden rounded-[14px] px-6 leading-none transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f25]/5 hover:text-[#175c46] hover:shadow-[0_12px_26px_rgba(13,47,37,.08)] ${activeSection === "skills" ? "active" : ""}`} href="#skills" aria-current={activeSection === "skills" ? "page" : undefined} onClick={() => handleNavClick("skills")}>Skills</a></nav>
      <div className="header-actions flex h-[82px] items-center justify-self-end gap-3.5 max-[720px]:h-[78px]">
        <a className="header-talk relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[14px] bg-gradient-to-b from-[#185442] to-[#0d2f25] px-6 text-[13px] font-black leading-none !text-white shadow-[0_16px_36px_rgba(13,47,37,.12)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-80%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(13,47,37,.18)] hover:before:translate-x-[360%] active:translate-y-0 max-[720px]:min-h-11 max-[720px]:px-4 max-[720px]:text-xs [&_svg]:!text-white [&_svg]:!stroke-white" href="#contact" onClick={closeMobileMenu}>Let&apos;s talk <ArrowUpRight className="size-5" /></a>
        <button className="mobile-menu-toggle hidden size-12 min-h-12 min-w-12 items-center justify-center rounded-[14px] border border-[#0d2f25]/15 bg-white/85 p-0 text-[#0d2f25] shadow-[0_10px_24px_rgba(13,47,37,.08)] max-[1280px]:inline-flex max-[720px]:size-11 max-[720px]:min-h-11 max-[720px]:min-w-11 [&_svg]:size-5" type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">{mobileMenuOpen ? <X /> : <Menu />}</button>
      </div>
      <nav className="mobile-nav absolute right-[clamp(18px,4vw,48px)] top-[calc(100%+12px)] z-[100] hidden w-[min(300px,calc(100vw-36px))] flex-col gap-2 rounded-[18px] border border-[#0d2f25]/15 bg-white/95 p-3 shadow-[0_22px_52px_rgba(13,47,37,.15)] backdrop-blur-[18px] max-[1280px]:flex" id="mobile-navigation" aria-label="Mobile navigation">
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "experience" ? "active" : ""}`} href="#experience" aria-current={activeSection === "experience" ? "page" : undefined} onClick={() => handleNavClick("experience")}>Experience</a>
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "work" ? "active" : ""}`} href="#work" aria-current={activeSection === "work" ? "page" : undefined} onClick={() => handleNavClick("work")}>Work</a>
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "skills" ? "active" : ""}`} href="#skills" aria-current={activeSection === "skills" ? "page" : undefined} onClick={() => handleNavClick("skills")}>Skills</a>
      </nav>
    </header>
    <section className={`hero ${pageX} grid min-h-0 grid-cols-[minmax(0,.96fr)_minmax(520px,1.04fr)] [grid-template-areas:'copy_showcase'_'full_full'] items-start gap-x-[clamp(56px,6vw,110px)] gap-y-[clamp(18px,2.4vw,34px)] overflow-hidden bg-[#f6f5f0] pt-[clamp(52px,5.2vw,82px)] pb-[clamp(54px,5vw,78px)] max-[900px]:grid-cols-1 max-[900px]:[grid-template-areas:'copy'_'showcase'_'full'] max-[900px]:pt-[65px] max-[600px]:pt-12`}>
      <div className="hero-copy [grid-area:copy] relative z-[2] max-w-[720px] min-w-0">
        <div className="eyebrow-row flex flex-wrap items-center gap-4"><TypedRole /><p className="remote-status m-0 inline-flex min-h-[28px] w-max items-center justify-center rounded-[10px] bg-gradient-to-b from-[#c98a1f] to-[#a96b11] px-2.5 text-[clamp(12px,1vw,14px)] font-black uppercase tracking-[0.14em] text-white shadow-[0_12px_30px_rgba(217,156,43,.22)]">Open for Remote Work</p></div>
        <TypedHeadline />
        <p className="hero-role max-w-[650px] font-[var(--font-display)] text-[clamp(22px,1.85vw,29px)] leading-[1.3] text-[#12231d] max-[600px]:text-xl">I build thoughtful digital products from interface to infrastructure. <a className="inline-project-link" href="#project-list">View projects <ArrowDownRight /></a></p>
        <div className="contact-details hero-contact-details my-5 grid grid-cols-2 justify-items-start gap-x-11 gap-y-3.5 max-[600px]:gap-x-5 max-[600px]:gap-y-3" aria-label="Contact links"><a href="mailto:mahishahnewaz@gmail.com" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px]"><span className={iconDiscClass}><Mail /></span> mahishahnewaz@gmail.com</a><a href="https://www.linkedin.com/in/-sh-/" target="_blank" rel="noreferrer" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px]"><span className="contact-icon linkedin-icon grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#185442] to-[#0d2f25] font-sans text-sm font-black leading-none text-white shadow-[0_8px_18px_rgba(13,47,37,.1)]" aria-hidden="true">in</span> LinkedIn</a><a href="tel:+8801348060117" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px]"><span className={iconDiscClass}><Phone /></span> +880 1348-060117</a><a href="https://github.com/Shahnewaz-Ali-Mohammad" target="_blank" rel="noreferrer" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px]"><span className={iconDiscClass}><Github /></span> GitHub</a></div>
        <div className="tags hero-stack-tags flex flex-wrap gap-2" aria-label="Core expertise">{["Full-stack", "Responsive UI", "React & Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Agentic AI", "MCP servers", "LangGraph", "MySQL", ".NET"].map((tag) => <span className={pillClass} key={tag}>{tag}</span>)}</div>
      </div>
      <HeroShowcase />
      <div className="hero-full [grid-area:full] w-full min-w-0 pt-[clamp(14px,2.2vw,42px)]">
        <p className="intro max-w-none text-justify text-[clamp(15px,1.1vw,18px)] leading-[1.78] text-[#12231d]/70">Full-stack web developer building responsive, scalable applications with Next.js, React, TypeScript, JavaScript, Tailwind CSS, PHP, and REST APIs. Experienced in reusable component development, application state, performance, automated testing, and production-ready Figma implementation. Currently working with agentic AI, AI-powered chatbots, workflow automation, and Model Context Protocol servers that connect intelligent applications with external tools, data, and business systems.</p>
        <div className="hero-actions mt-7 flex flex-wrap gap-3.5"><a className={primaryButtonClass} href="#work">View selected work <ArrowDownRight /></a><a className={secondaryButtonClass} href="#contact">Let&apos;s talk <ArrowUpRight /></a></div>
      </div>
    </section>
    <ProjectMarquee />

    <section className={`credentials ${pageX} bg-gradient-to-b from-white to-[#f8f8f4] py-[90px]`} id="experience"><div className="section-label mb-12 flex items-center gap-4"><span className="grid min-w-16 place-items-center bg-[#174f3e] px-4 py-3 font-[var(--font-display)] text-2xl text-white">01</span><p className="m-0 bg-[#0d2f25] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white">Experience & education</p><i className="h-px flex-1 bg-[#aebbb4]" /></div><div className="experience-layout grid w-full grid-cols-[minmax(0,1.05fr)_minmax(480px,.95fr)] gap-[clamp(48px,5vw,88px)] max-[1000px]:grid-cols-1"><article className="experience-panel min-w-0"><p className={eyebrowClass}>Professional experience</p><h2 className="my-8 font-[var(--font-display)] text-[clamp(34px,3.2vw,48px)] leading-tight">Experience</h2><div className="career-timeline relative">
      <div className="career-entry grid grid-cols-[88px_25px_1fr] gap-3 border-t border-[#175c46] py-6 pr-6 max-[900px]:grid-cols-[58px_25px_1fr]"><time className="pt-1 text-right text-[11px] font-black uppercase text-[#175c46]">Jul 2026<br/>Present</time><span className="timeline-marker mt-1 size-2.5 rounded-full bg-[#175c46]" /><div><h3 className="m-0 text-xl font-black">Software Engineer</h3><p className="career-role m-0 text-sm font-extrabold text-[#175c46]">Amber IT Ltd · Full-time</p><p className="career-location m-0 text-sm leading-normal text-[#59645f]">Dhaka, Bangladesh · On-site</p><ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.72] text-[#59645f]"><li>Design and develop agentic AI solutions, including customer-service chatbots and voice agents.</li><li>Build AI-powered analytics with ASP.NET Core MVC, Semantic Kernel, OpenAI, and MCP.</li><li>Engineer .NET automation workflows connecting LLMs, enterprise APIs, SQL databases, and business systems.</li></ul></div></div>
      <div className="career-entry grid grid-cols-[88px_25px_1fr] gap-3 border-t border-[#ced6d0] py-6 pr-6 max-[900px]:grid-cols-[58px_25px_1fr]"><time className="pt-1 text-right text-[11px] font-black uppercase text-[#175c46]">Jun 2026<br/>Present</time><span className="timeline-marker mt-1 size-2.5 rounded-full bg-[#175c46]" /><div><h3 className="m-0 text-xl font-black">Full Stack Web Developer</h3><p className="career-role m-0 text-sm font-extrabold text-[#175c46]">Russian Center For Education · Full-time</p><p className="career-location m-0 text-sm leading-normal text-[#59645f]">Dhaka, Bangladesh · Remote</p><ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.72] text-[#59645f]"><li>Develop full-stack applications with Next.js, TypeScript, Tailwind CSS, MySQL, and PHP.</li><li>Implement schemas, CRUD workflows, APIs, authentication, forms, and content-management features.</li><li>Improve performance, security, and maintainability through validation, testing, debugging, and optimized queries.</li></ul></div></div>
      <div className="career-entry grid grid-cols-[88px_25px_1fr] gap-3 border-t border-[#ced6d0] py-6 pr-6 max-[900px]:grid-cols-[58px_25px_1fr]"><time className="pt-1 text-right text-[11px] font-black uppercase text-[#175c46]">Apr 2025<br/>Mar 2026</time><span className="timeline-marker mt-1 size-2.5 rounded-full bg-[#175c46]" /><div><h3 className="m-0 text-xl font-black">Software Engineer</h3><p className="career-role m-0 text-sm font-extrabold text-[#175c46]">CipherCoreTech · Full-time</p><p className="career-location m-0 text-sm leading-normal text-[#59645f]">Melbourne, Australia · On-site</p><ul className="mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.72] text-[#59645f]"><li>Built responsive React and TypeScript interfaces from business requirements and Figma designs.</li><li>Improved performance and maintainability with reusable architecture, Redux, lazy loading, and code splitting.</li><li>Supported delivery through unit testing, UAT, troubleshooting, and Agile collaboration.</li></ul></div></div>
    </div></article><article className="education-panel min-w-0 border-l border-[#ced6d0] pl-[clamp(34px,4vw,64px)] max-[1000px]:border-l-0 max-[1000px]:border-t max-[1000px]:pl-0 max-[1000px]:pt-12"><p className={eyebrowClass}>Academic background</p><h2 className="my-8 font-[var(--font-display)] text-[clamp(34px,3.2vw,48px)] leading-tight">Education</h2><div className="education-list grid gap-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
      <div className="education-entry grid w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-6 rounded-2xl border border-[#ced6d0] bg-white p-5 shadow-[0_16px_36px_rgba(13,47,37,.06)] max-[1000px]:grid-cols-[86px_minmax(0,1fr)] max-[700px]:grid-cols-[78px_minmax(0,1fr)]"><div className="school-mark grid size-[104px] place-items-center overflow-hidden border border-[#d2d9d4] bg-[#0c0c0c] max-[1000px]:size-[86px] max-[700px]:size-[78px]"><img className="h-full w-full object-contain" src={assetPath("/swinburne.png")} alt="Swinburne University of Technology logo" /></div><div><p className="degree-level mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#175c46]">Master&apos;s degree</p><h3 className="mb-3 font-[var(--font-display)] text-[clamp(21px,1.8vw,28px)] leading-tight">Master of Information Technology <span className="mt-1 block font-sans text-[13px] font-semibold text-[#53605a]">(Professional Computing)</span></h3><p className="school-name m-0 text-sm font-black">Swinburne University of Technology</p><p className="school-location m-0 text-[13px] text-[#68736e]">Melbourne, Australia</p></div></div>
      <div className="education-entry grid w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-6 rounded-2xl border border-[#ced6d0] bg-white p-5 shadow-[0_16px_36px_rgba(13,47,37,.06)] max-[1000px]:grid-cols-[86px_minmax(0,1fr)] max-[700px]:grid-cols-[78px_minmax(0,1fr)]"><div className="school-mark brac-mark grid size-[104px] place-items-center overflow-hidden border border-[#d2d9d4] bg-white p-3 max-[1000px]:size-[86px] max-[700px]:size-[78px]"><img className="h-full w-full object-contain" src={assetPath("/brac-university.svg")} alt="BRAC University logo" /></div><div><p className="degree-level mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#175c46]">Bachelor&apos;s degree</p><h3 className="mb-3 font-[var(--font-display)] text-[clamp(21px,1.8vw,28px)] leading-tight">Bachelor of Computer Science</h3><p className="school-name m-0 text-sm font-black">BRAC University</p><p className="school-location m-0 text-[13px] text-[#68736e]">Dhaka, Bangladesh</p></div></div>
    </div><div className="professional-year mt-8 border-t border-[#ced6d0] pt-7"><p className={eyebrowClass}>Professional year</p><div className="education-entry mt-4 grid w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-6 rounded-2xl border border-[#ced6d0] bg-white p-5 shadow-[0_16px_36px_rgba(13,47,37,.06)] max-[1000px]:grid-cols-[86px_minmax(0,1fr)] max-[700px]:grid-cols-[78px_minmax(0,1fr)]"><div className="school-mark acs-mark grid size-[104px] place-items-center overflow-hidden border border-[#d2d9d4] bg-white p-2 max-[1000px]:size-[86px] max-[700px]:size-[78px]"><img className="h-full w-full object-contain" src={assetPath("/acs.jpg")} alt="Australian Computer Society logo" /></div><div><p className="degree-level mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#175c46]">Professional qualification</p><h3 className="mb-3 font-[var(--font-display)] text-[clamp(21px,1.8vw,28px)] leading-tight">Professional Year</h3><p className="school-name m-0 text-sm font-black">Australian Computer Society</p></div></div></div></article></div></section>

    <section className={`work ${pageX} py-[90px]`} id="work"><div className="section-label mb-12 flex items-center gap-4"><span className="grid min-w-16 place-items-center bg-[#174f3e] px-4 py-3 font-[var(--font-display)] text-2xl text-white">02</span><p className="m-0 bg-[#0d2f25] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white">Selected work</p><i className="h-px flex-1 bg-[#aebbb4]" /></div>{featured.map((project, index) => <article id={projectId(project.title)} className={`project ${index % 2 ? "reverse" : ""} grid min-h-[620px] grid-cols-[minmax(0,38%)_minmax(0,62%)] items-center border-t-2 border-[#aebbb4] py-14 max-[900px]:grid-cols-1 max-[900px]:gap-5 max-[900px]:py-9`} key={project.title}><div className="project-copy flex min-w-0 flex-col items-start justify-center py-0 pr-[clamp(28px,4vw,72px)] max-[900px]:pr-0"><span className="project-number mb-12 font-[var(--font-display)] text-3xl text-[#175c46]">{project.number}</span><p className={eyebrowClass}>{project.kind}</p><h2 className="my-5 font-[var(--font-display)] text-[clamp(36px,3.2vw,52px)] leading-tight">{project.title}</h2><p className="max-w-[620px] text-justify leading-[1.75] text-[#59645f]">{project.summary}</p><div className="stack my-6 flex flex-wrap gap-2">{project.stack.map(item => <span className={pillClass} key={item}>{item}</span>)}</div>{project.repo ? <a className="inline-flex items-center gap-2 rounded-full border border-[#175c46]/20 bg-white/50 px-3.5 py-2.5 text-[13px] font-black text-[#0d2f25] transition-colors hover:bg-[#175c46]/10" href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight /></a> : <span className="project-status rounded-full border border-[#175c46]/20 bg-white/50 px-3.5 py-2.5 text-[13px] font-black">Project in progress</span>}</div><ProjectVisual project={project} /></article>)}</section>
    <section className={`capabilities ${pageX} bg-[#0d2f25] py-[90px] text-white`} id="skills"><div className="section-label light mb-12 flex items-center gap-4"><span className="grid min-w-16 place-items-center bg-white px-4 py-3 font-[var(--font-display)] text-2xl text-[#0d2f25]">03</span><p className="m-0 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#0d2f25]">Skills</p><i className="h-px flex-1 bg-[#769087]" /></div><div className="capability-list">{skills.map((skill) => <article className="grid grid-cols-[minmax(180px,.75fr)_minmax(0,1.35fr)_minmax(220px,.9fr)] items-center gap-8 border-t border-[#466257] py-8 max-[900px]:grid-cols-1" key={skill.group}><div className="skill-heading"><h3 className="m-0 text-xl font-black">{skill.group}</h3><p className="mt-3 text-sm leading-relaxed text-[#d2ded9]">{skill.statement}</p></div><div className="skill-details flex flex-col gap-4"><p className="skill-label m-0 text-[11px] font-black uppercase tracking-[0.14em] text-[#9bd6bf]">Core toolkit</p><ul className="flex flex-wrap gap-3">{skill.items.map((item) => <li className="rounded-full border border-white/20 px-3.5 py-2 text-sm font-black text-[#eef6f2]" key={item}>{item}</li>)}</ul></div><div className="skill-proof"><p className="skill-label m-0 text-[11px] font-black uppercase tracking-[0.14em] text-[#9bd6bf]">Selected work</p><p className="mt-3 text-sm leading-relaxed text-[#d2ded9]">{skill.proof.join(" · ")}</p></div></article>)}</div></section>
    <section className={`contact ${pageX} bg-[#dbe9e2] py-[100px]`} id="contact"><p className={eyebrowClass}>Have a project in mind?</p><h2 className="my-6 max-w-[760px] font-[var(--font-display)] text-[clamp(34px,3.4vw,50px)] leading-tight">Let&apos;s build something useful.</h2><div className="contact-details my-8 grid grid-cols-2 justify-items-start gap-x-11 gap-y-3.5 max-[700px]:grid-cols-1"><a href="mailto:mahishahnewaz@gmail.com" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25]"><span className={iconDiscClass}><Mail /></span> mahishahnewaz@gmail.com</a><a href="https://www.linkedin.com/in/-sh-/" target="_blank" rel="noreferrer" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25]"><span className="contact-icon linkedin-icon grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#185442] to-[#0d2f25] font-sans text-sm font-black leading-none text-white shadow-[0_8px_18px_rgba(13,47,37,.1)]" aria-hidden="true">in</span> LinkedIn</a><a href="tel:+8801348060117" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25]"><span className={iconDiscClass}><Phone /></span> +880 1348-060117</a><a href="https://github.com/Shahnewaz-Ali-Mohammad" target="_blank" rel="noreferrer" className="contact-detail inline-flex w-max max-w-full items-center gap-2.5 text-[15px] font-extrabold text-[#0d2f25]"><span className={iconDiscClass}><Github /></span> GitHub</a></div><div className="contact-socials flex items-center gap-3.5"><a className={`${primaryButtonClass} contact-button min-w-[235px]`} href="mailto:mahishahnewaz@gmail.com">Start a conversation <Mail /></a></div></section>
    <footer className="flex min-h-32 flex-col items-center justify-center gap-5 bg-[#0d2f25] px-[clamp(24px,5vw,80px)] py-10 text-center text-[#b7c9c1]"><div className="footer-line flex flex-wrap items-center justify-center gap-5 text-[15px] font-extrabold tracking-[0.02em] text-[#e3ede8]"><span>Full-Stack Development</span><i className="size-1 rounded-full bg-[#eaf1ec]" /><span>Agentic AI Development</span><span className="footer-highlight inline-flex items-center gap-3 rounded-[14px] border border-[#e6b45a]/60 bg-[#e6b45a]/10 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#f0c674]"><em className="block size-1.5 rounded-full bg-[#f0c674]" aria-hidden="true" />Open for Remote Work</span></div><span className="footer-copy text-[11px] uppercase tracking-[0.1em] text-[#7d968c]">© 2026 Shahnewaz Ali Mohammad</span></footer>
  </main>;
}
