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
const heroEyebrowTextClass = "text-[clamp(12px,1vw,14px)] font-black leading-none uppercase tracking-[0.14em]";
const eyebrowClass = `eyebrow m-0 ${heroEyebrowTextClass} text-[#175c46]`;
const descriptionTextClass = "font-[var(--font-display)] text-[#12231d]";
const heroSentenceTextClass = "[--hero-copy-size:clamp(22px,1.85vw,29px)] text-[length:var(--hero-copy-size)] max-[600px]:[--hero-copy-size:20px]";
const pillClass = "inline-flex min-h-8 items-center justify-center rounded-full border border-[#ced6d0] bg-[#fbfbf8] px-3 py-1.5 text-xs font-extrabold text-[#0d2f25] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[#d8a62b]/70 hover:shadow-[0_8px_18px_rgba(13,47,37,.07)]";
const iconDiscClass = "grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#185442] to-[#0d2f25] text-white shadow-[0_8px_18px_rgba(13,47,37,.1)] [&_svg]:size-5 [&_svg]:stroke-white";
const primaryButtonClass = "button primary relative isolate inline-flex min-h-[66px] items-center justify-center gap-5 overflow-hidden rounded-[14px] border border-transparent bg-gradient-to-b from-[#185442] to-[#0d2f25] px-8 text-[15px] font-black !text-white shadow-[0_8px_18px_rgba(13,47,37,.055)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-80%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(13,47,37,.18)] hover:before:translate-x-[360%] active:translate-y-0 [&_svg]:!text-white [&_svg]:!stroke-white";
const secondaryButtonClass = "button secondary relative isolate inline-flex min-h-[66px] items-center justify-center gap-5 overflow-hidden rounded-[14px] border-2 border-[#0d2f25] bg-white/50 px-8 text-[15px] font-black text-[#0d2f25] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-80%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-[#f4d46d]/35 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-1 hover:border-[#d8a62b] hover:bg-white hover:shadow-[0_16px_34px_rgba(13,47,37,.1)] hover:before:translate-x-[360%] active:translate-y-0";
const browserCardClass = "group/browser isolate origin-right will-change-transform before:pointer-events-none before:absolute before:inset-0 before:z-[1] before:-translate-x-full before:bg-[linear-gradient(115deg,transparent_28%,rgba(255,255,255,.42)_48%,transparent_68%)] before:opacity-0 before:transition-all before:duration-700 before:ease-out hover:border-[#e8c765] hover:shadow-[0_30px_70px_rgba(13,47,37,.16),0_0_0_1px_rgba(232,199,101,.42)] hover:brightness-[1.025] hover:before:translate-x-full hover:before:opacity-100";
const heroProjectPulseClass = "relative mt-3 flex w-fit align-[.18em] max-[1281px]:mx-auto";
const heroProjectRingClass = "relative z-10 inline-flex rounded-[10px] bg-[#f0cf68] p-[3px]";
const heroInlineProjectClass = "relative z-10 inline-flex min-h-[28px] items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap rounded-[7px] bg-gradient-to-b from-[#c98a1f] to-[#a96b11] px-3 py-0.5 font-[var(--font-display)] text-[length:calc(var(--hero-copy-size)*.82)] font-bold leading-[1.3] !text-white shadow-[inset_0_1px_0_rgba(255,255,255,.45)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-75%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/80 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-px hover:from-[#d89b2e] hover:to-[#ae6d10] hover:shadow-[0_10px_24px_rgba(217,156,43,.3)] hover:before:translate-x-[350%] [&_svg]:size-[1em] [&_svg]:!stroke-white [&_svg]:stroke-[3]";
const navLinkClass = "relative isolate inline-flex min-h-12 items-center justify-center overflow-hidden rounded-[14px] px-6 leading-none transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-80%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/35 before:to-transparent before:transition-transform before:duration-700 after:pointer-events-none after:absolute after:inset-x-4 after:bottom-2 after:h-px after:scale-x-0 after:bg-[#d8a62b] after:transition-transform after:duration-300 hover:-translate-y-0.5 hover:bg-[#0d2f25]/5 hover:text-[#175c46] hover:shadow-[0_12px_26px_rgba(13,47,37,.08)] hover:before:translate-x-[340%] hover:after:scale-x-100";
const tertiaryButtonClass = "relative isolate inline-flex items-center gap-2 overflow-hidden rounded-[10px] border border-[#175c46]/20 bg-white/60 px-3.5 py-2.5 text-[13px] font-black text-[#0d2f25] shadow-[0_8px_20px_rgba(13,47,37,.04)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-80%] before:left-[-70%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-[#f2d46f]/55 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-0.5 hover:border-[#d8a62b]/70 hover:bg-white hover:shadow-[0_14px_30px_rgba(13,47,37,.1)] hover:before:translate-x-[340%]";
const heroStackPositionClasses = [
  "z-[4] border-[#0d2f25]/35 shadow-[0_22px_58px_rgba(13,47,37,.11)] [transform:translate(-58%,-24%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)] max-[1281px]:[transform:translate(-62%,-24%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
  "z-[3] [transform:translate(-52%,-36%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)] max-[1281px]:[transform:translate(-58%,-36%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
  "z-[2] [transform:translate(-46%,-48%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)] max-[1281px]:[transform:translate(-54%,-48%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
  "z-[1] [transform:translate(-40%,-60%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)] max-[1281px]:[transform:translate(-50%,-60%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
  "z-0 [transform:translate(-34%,-72%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)] max-[1281px]:[transform:translate(-46%,-72%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
];
const projectStackPositionClasses = [
  "z-[3] border-[#0d2f25]/35 shadow-[0_22px_58px_rgba(13,47,37,.11)] [transform:translate(-58%,-40%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
  "z-[2] [transform:translate(-50%,-50%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
  "z-[1] [transform:translate(-42%,-60%)_perspective(900px)_rotateY(-12deg)_rotateX(2deg)_rotateZ(-1.75deg)]",
];

function ProjectVisual({ project }: { project: Project }) {
  const [active, setActive] = useState(0);
  useEffect(() => { const timer = window.setInterval(() => setActive((current) => (current + 1) % project.images.length), 4000); return () => window.clearInterval(timer); }, [project.images.length]);
  useEffect(() => { project.images.forEach((src) => { const image = new Image(); image.src = src; }); }, [project.images]);
  return <div className="project-visual relative min-h-[460px] overflow-visible bg-transparent">
    <div className="project-image-deck relative h-full w-full overflow-visible">{project.images.map((image, index) => {
      const position = (index - active + project.images.length) % project.images.length;
      return <button className={`project-browser-card ${projectStackPositionClasses[position]} ${browserCardClass} absolute left-1/2 top-1/2 flex h-auto w-[min(78%,780px)] flex-col overflow-hidden rounded-[10px] border border-[#cdd6d0] bg-white p-0 text-inherit shadow-[0_14px_30px_rgba(13,47,37,.1)] transition-[transform,filter,box-shadow,border-color] duration-700 ease-out max-[600px]:w-[86%]`} type="button" onClick={() => setActive(index)} aria-label={`Show ${project.title} screenshot ${index + 1}`} aria-current={position === 0} key={image}>
        <span className="browser-bar flex h-[34px] shrink-0 items-center gap-3 border-b border-[#d8ded9] bg-[#f7f7f3] px-3 py-2">
          <span className="browser-dots flex shrink-0 gap-1.5" aria-hidden="true"><i /><i /><i /></span>
          <span className="browser-address block min-w-0 flex-1 overflow-hidden"><span className="browser-address-text block w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-[#dde3de] bg-white px-3 py-1 text-center text-[10px] font-black leading-none text-[#68736e]">{project.title.toLowerCase().replaceAll(" ", "-")}.app</span></span>
        </span>
        <span className="browser-image-deck block overflow-hidden bg-[#e9edea] p-2.5"><img className="project-carousel-image block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover/browser:scale-[1.015]" src={assetPath(image)} alt={`${project.title} interface view ${index + 1} of ${project.images.length}`} /></span>
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
  return <h1 className="typed-headline my-6 font-[var(--font-display)] text-[clamp(48px,4.65vw,70px)] font-semibold leading-[.98] tracking-normal text-[#12231d] max-[1281px]:text-center max-[900px]:text-[clamp(48px,8vw,66px)] max-[600px]:text-[42px]">
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
  return <div className="hero-showcase [grid-area:showcase] mt-0 mb-0 w-[min(100%,980px)] justify-self-end overflow-visible [perspective:1600px] transition-[filter] duration-500 hover:brightness-[1.02] max-[1281px]:mt-[clamp(56px,6.5vw,76px)] max-[1281px]:mb-[clamp(68px,7vw,90px)] max-[1281px]:justify-self-center max-[600px]:mt-10 max-[600px]:mb-14" aria-label="Selected project previews">
    <div className="hero-browser-stack relative mx-auto h-[clamp(390px,29vw,520px)] w-[min(100%,980px)] overflow-visible [transform-style:preserve-3d] max-[1281px]:h-[clamp(390px,58vw,580px)] max-[600px]:h-[clamp(330px,82vw,450px)]">
      {projects.map((project, index) => {
        const position = (index - active + projects.length) % projects.length;
        return <button className={`hero-browser-card ${heroStackPositionClasses[position]} ${browserCardClass} absolute left-1/2 top-1/2 flex h-auto w-[min(80%,820px)] flex-col overflow-hidden rounded-[10px] border border-[#cdd6d0] bg-white p-0 text-inherit shadow-[0_18px_46px_rgba(13,47,37,.08)] transition-[transform,filter,box-shadow,border-color] duration-700 ease-out max-[1281px]:w-[min(82%,720px)] max-[600px]:w-[86%]`} type="button" onClick={() => setActive(index)} aria-label={`Show ${project.label} preview`} aria-current={position === 0} key={project.src}>
          <span className="browser-bar flex h-[34px] shrink-0 items-center gap-3 border-b border-[#d8ded9] bg-[#f7f7f3] px-3 py-2">
            <span className="browser-dots flex shrink-0 gap-1.5" aria-hidden="true"><i /><i /><i /></span>
            <span className="browser-address block min-w-0 flex-1 overflow-hidden"><span className="browser-address-text block w-full overflow-hidden text-ellipsis whitespace-nowrap rounded-full border border-[#dde3de] bg-white px-3 py-1 text-center text-[10px] font-black leading-none text-[#68736e]">{project.domain}</span></span>
          </span>
          <span className="browser-image-deck block overflow-hidden bg-[#e9edea] p-2.5"><img className="block h-auto w-full object-contain transition-transform duration-700 ease-out group-hover/browser:scale-[1.015]" src={assetPath(project.src)} alt={`${project.label} project preview`} /></span>
        </button>;
      })}
    </div>
  </div>;
}

function ProjectMarquee() {
  const marqueeProjects = [...featured, ...featured];
  return <div className="project-marquee bg-[#f6f5f0] px-[clamp(24px,5vw,80px)] pb-16" id="project-list" aria-label="Project quick links">
    <div className="project-marquee-viewport overflow-hidden py-7 max-[760px]:h-[356px] max-[420px]:h-[332px]">
      <div className="project-marquee-track flex gap-4 max-[760px]:grid max-[760px]:w-full max-[760px]:grid-cols-1">
        {marqueeProjects.map((project, index) => <a className="project-marquee-card group/marquee flex min-h-[128px] w-[290px] shrink-0 items-center gap-4 rounded-[8px] border border-transparent bg-white p-5 shadow-[0_5px_14px_rgba(13,47,37,.035)] transition-all duration-300 hover:-translate-y-1 hover:border-[#e4c45d]/60 hover:shadow-[0_18px_34px_rgba(13,47,37,.1)] max-[760px]:w-full max-[760px]:min-h-[104px]" href={`#${projectId(project.title)}`} key={`${project.title}-${index}`} aria-label={`Jump to ${project.title}`}>
          <span className="project-marquee-icon grid size-11 shrink-0 place-items-center rounded-[12px] bg-gradient-to-b from-[#185442] to-[#0d2f25] text-white transition-transform duration-300 group-hover/marquee:scale-105 group-hover/marquee:-rotate-2" aria-hidden="true"><project.icon /></span>
          <span className="project-marquee-copy flex min-w-0 flex-col gap-3">
            <strong className="break-normal text-sm font-black leading-tight text-[#12231d] [hyphens:none] [overflow-wrap:normal]">{project.title}</strong>
            <span className="flex flex-wrap gap-1.5">{project.stack.slice(0, 3).map((item) => <i className="rounded-full bg-[#e9f1ed] px-2 py-1 text-[10px] font-black not-italic text-[#0d2f25]" key={item}>{item}</i>)}</span>
          </span>
        </a>)}
      </div>
    </div>
  </div>;
}

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    if (typeof window === "undefined") return;
    if ("scrollRestoration" in window.history) window.history.scrollRestoration = "manual";

    const saved = sessionStorage.getItem("scrollY");
    const savedY = saved ? parseInt(saved, 10) : NaN;
    const hasSavedPosition = !Number.isNaN(savedY);

    if (hasSavedPosition && window.location.hash) {
      const url = window.location.pathname + window.location.search;
      window.history.replaceState(null, "", url);
    }

    const restoreScroll = () => {
      if (!hasSavedPosition) return;
      window.scrollTo(0, savedY);
    };

    restoreScroll();
    const timers = [0, 50, 120, 250, 400, 700, 1100].map((delay) => window.setTimeout(restoreScroll, delay));
    window.addEventListener("load", restoreScroll);

    const onScroll = () => sessionStorage.setItem("scrollY", String(window.scrollY));
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      timers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("load", restoreScroll);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

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
      ".hero-copy, .hero-showcase, .hero-full, .project-marquee-viewport, .section-label, .experience-panel > .eyebrow, .experience-panel > h2, .education-panel > .eyebrow, .education-panel > h2, .career-entry, .education-entry, .professional-year, .project-copy, .project-visual, .capability-list article, .contact > *, .footer-line"
    );
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    root.classList.add("motion-ready");
    revealTargets.forEach((element, index) => {
      element.classList.add("opacity-0", "translate-y-6", "blur-[2px]", "transition-all", "duration-700", "ease-out", "will-change-transform");
      element.style.setProperty("--reveal-order", String(index % 4));
      element.style.transitionDelay = `${(index % 4) * 70}ms`;
    });

    if (reducedMotion) {
      revealTargets.forEach((element) => {
        element.classList.remove("opacity-0", "translate-y-6", "blur-[2px]");
        element.classList.add("opacity-100", "translate-y-0", "blur-0");
      });
      return () => root.classList.remove("motion-ready");
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove("opacity-0", "translate-y-6", "blur-[2px]");
          entry.target.classList.add("opacity-100", "translate-y-0", "blur-0");
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

    return () => {
      observer.disconnect();
      root.classList.remove("motion-ready");
      window.removeEventListener("scroll", onScroll);
      gallery?.removeEventListener("pointermove", onPointerMove);
      gallery?.removeEventListener("pointerleave", onPointerLeave);
    };
  }, []);

  useEffect(() => {
    const sectionIds = ["top", "experience", "work", "skills"];
    const sections = sectionIds
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const onSectionScroll = () => {
      const headerEl = document.querySelector<HTMLElement>(".site-header");
      const probeY = (headerEl?.getBoundingClientRect().bottom ?? 0) + 40;
      let current: string | null = null;
      for (const section of sections) {
        const rect = section.getBoundingClientRect();
        if (rect.top <= probeY && rect.bottom > probeY) {
          current = section.id;
          break;
        }
      }
      if (!current) {
        if (sections.length && window.scrollY + probeY >= sections[sections.length - 1].offsetTop) {
          current = sections[sections.length - 1].id;
        } else if (sections.length && window.scrollY + probeY < sections[0].offsetTop) {
          current = null;
        }
      }
      if (current) setActiveSection(current);
    };
    onSectionScroll();
    const recheckTimers = [50, 200, 500, 1000].map((delay) => window.setTimeout(onSectionScroll, delay));
    window.addEventListener("scroll", onSectionScroll, { passive: true });
    window.addEventListener("resize", onSectionScroll);
    window.addEventListener("hashchange", onSectionScroll);

    return () => {
      recheckTimers.forEach((timer) => window.clearTimeout(timer));
      window.removeEventListener("scroll", onSectionScroll);
      window.removeEventListener("resize", onSectionScroll);
      window.removeEventListener("hashchange", onSectionScroll);
    };
  }, []);

  const closeMobileMenu = () => setMobileMenuOpen(false);
  const handleNavClick = (section: string) => {
    setActiveSection(section);
    closeMobileMenu();
  };

  return <main className="overflow-x-clip">
    <header className={`site-header ${pageX} sticky top-0 z-20 grid h-[82px] max-h-[82px] min-h-[82px] grid-cols-[minmax(260px,1fr)_auto_minmax(220px,1fr)] items-center border-b border-[#ced6d0] bg-[#f6f5f0]/95 backdrop-blur-[14px] max-[1281px]:grid-cols-[minmax(0,1fr)_auto] max-[720px]:h-[78px] max-[720px]:min-h-[78px] max-[720px]:px-[18px]${mobileMenuOpen ? " mobile-menu-open" : ""}`}>
      <a className="brand flex min-w-0 items-center gap-3 justify-self-start text-sm font-black tracking-[0.035em] text-[#12231d]" href="#top" aria-label="Home" onClick={() => handleNavClick("top")}><img className="brand-mark block size-[38px] shrink-0" src={assetPath("/logo-mark.svg")} alt="" width="38" height="38" /><strong className="block whitespace-nowrap text-base leading-none max-[1281px]:max-w-[min(420px,52vw)] max-[1281px]:text-[15px] max-[720px]:max-w-[min(260px,42vw)] max-[720px]:whitespace-normal max-[720px]:text-[13px] max-[720px]:leading-[1.08] max-[370px]:hidden">SHAHNEWAZ ALI MOHAMMAD</strong></a>
      <nav className="desktop-nav flex items-center justify-self-center gap-[clamp(28px,3.5vw,58px)] text-[13px] font-extrabold max-[1281px]:hidden" aria-label="Primary navigation"><a className={`${navLinkClass} ${activeSection === "top" ? "active" : ""}`} href="#top" aria-current={activeSection === "top" ? "page" : undefined} onClick={() => handleNavClick("top")}>Intro</a><a className={`${navLinkClass} ${activeSection === "experience" ? "active" : ""}`} href="#experience" aria-current={activeSection === "experience" ? "page" : undefined} onClick={() => handleNavClick("experience")}>Experience</a><a className={`${navLinkClass} ${activeSection === "work" ? "active" : ""}`} href="#work" aria-current={activeSection === "work" ? "page" : undefined} onClick={() => handleNavClick("work")}>Work</a><a className={`${navLinkClass} ${activeSection === "skills" ? "active" : ""}`} href="#skills" aria-current={activeSection === "skills" ? "page" : undefined} onClick={() => handleNavClick("skills")}>Skills</a></nav>
      <div className="header-actions flex h-[82px] items-center justify-self-end gap-3.5 max-[720px]:h-[78px]">
        <a className="header-talk relative isolate inline-flex min-h-12 items-center justify-center gap-3 overflow-hidden rounded-[14px] bg-gradient-to-b from-[#185442] to-[#0d2f25] px-6 text-[13px] font-black leading-none !text-white shadow-[0_16px_36px_rgba(13,47,37,.12)] transition-all duration-300 before:pointer-events-none before:absolute before:inset-y-[-70%] before:left-[-80%] before:w-1/2 before:rotate-12 before:bg-gradient-to-r before:from-transparent before:via-white/45 before:to-transparent before:transition-transform before:duration-700 hover:-translate-y-1 hover:shadow-[0_22px_48px_rgba(13,47,37,.18)] hover:before:translate-x-[360%] active:translate-y-0 max-[720px]:min-h-11 max-[720px]:px-4 max-[720px]:text-xs [&_svg]:!text-white [&_svg]:!stroke-white" href="#contact" onClick={closeMobileMenu}>Let&apos;s talk <ArrowUpRight className="size-5" /></a>
        <button className="mobile-menu-toggle hidden size-12 min-h-12 min-w-12 items-center justify-center rounded-[14px] border border-[#0d2f25]/15 bg-white/85 p-0 text-[#0d2f25] shadow-[0_10px_24px_rgba(13,47,37,.08)] max-[1281px]:inline-flex max-[720px]:size-11 max-[720px]:min-h-11 max-[720px]:min-w-11 [&_svg]:size-5" type="button" onClick={() => setMobileMenuOpen((open) => !open)} aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"} aria-expanded={mobileMenuOpen} aria-controls="mobile-navigation">{mobileMenuOpen ? <X /> : <Menu />}</button>
      </div>
      <nav className="mobile-nav absolute right-[clamp(18px,4vw,48px)] top-[calc(100%+12px)] z-[100] hidden w-[min(300px,calc(100vw-36px))] flex-col gap-2 rounded-[18px] border border-[#0d2f25]/15 bg-white/95 p-3 shadow-[0_22px_52px_rgba(13,47,37,.15)] backdrop-blur-[18px] max-[1281px]:flex" id="mobile-navigation" aria-label="Mobile navigation">
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "top" ? "active" : ""}`} href="#top" aria-current={activeSection === "top" ? "page" : undefined} onClick={() => handleNavClick("top")}>Intro</a>
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "experience" ? "active" : ""}`} href="#experience" aria-current={activeSection === "experience" ? "page" : undefined} onClick={() => handleNavClick("experience")}>Experience</a>
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "work" ? "active" : ""}`} href="#work" aria-current={activeSection === "work" ? "page" : undefined} onClick={() => handleNavClick("work")}>Work</a>
        <a className={`flex min-h-[54px] items-center justify-center rounded-[14px] px-5 text-center text-base font-black leading-none text-[#12231d] ${activeSection === "skills" ? "active" : ""}`} href="#skills" aria-current={activeSection === "skills" ? "page" : undefined} onClick={() => handleNavClick("skills")}>Skills</a>
      </nav>
    </header>
    <section id="top" className={`hero group/hero ${pageX} grid min-h-0 grid-cols-[minmax(0,.96fr)_minmax(520px,1.04fr)] [grid-template-areas:'copy_showcase'_'full_full'] items-start gap-x-[clamp(56px,6vw,110px)] gap-y-[clamp(14px,1.8vw,28px)] overflow-visible bg-[#f6f5f0] pt-[clamp(28px,3vw,48px)] pb-[clamp(42px,4vw,64px)] transition-colors duration-500 hover:bg-[#f8f7f2] max-[1281px]:grid-cols-1 max-[1281px]:[grid-template-areas:'copy'_'showcase'_'full'] max-[1281px]:gap-y-0 max-[1281px]:pt-10 max-[600px]:pt-8`}>
      <div className="hero-copy [grid-area:copy] relative z-[2] w-full max-w-[720px] min-w-0 transition-transform duration-500 group-hover/hero:translate-x-1 max-[1281px]:max-w-none">
        <div className="eyebrow-row flex flex-wrap items-center gap-4 max-[1281px]:justify-center"><TypedRole /><p className={`remote-status m-0 inline-flex min-h-[28px] w-max items-center justify-center rounded-[10px] bg-gradient-to-b from-[#c98a1f] to-[#a96b11] px-2.5 text-white shadow-[0_12px_30px_rgba(217,156,43,.22)] ${heroEyebrowTextClass}`}>Open for Remote Work</p></div>
        <TypedHeadline />
        <p className={`hero-role max-w-[650px] max-[1281px]:max-w-none max-[1281px]:mx-auto max-[1281px]:text-center font-[var(--font-display)] ${heroSentenceTextClass} leading-[1.3] text-[#12231d]`}>I build thoughtful digital products from interface to infrastructure. <span className={heroProjectPulseClass}><span className={heroProjectRingClass}><span className="hero-project-pulse-ring" aria-hidden="true" /><svg className="pointer-events-none absolute inset-0 z-20 size-full overflow-visible" viewBox="0 0 100 40" preserveAspectRatio="none" aria-hidden="true"><path className="hero-project-orbit-path" d="M10,2 L90,2 A8,8 0 0 1 98,10 L98,30 A8,8 0 0 1 90,38 L10,38 A8,8 0 0 1 2,30 L2,10 A8,8 0 0 1 10,2 Z" /></svg><a className={heroInlineProjectClass} href="#project-list">View projects <ArrowDownRight /></a></span></span></p>
        <div className="contact-details hero-contact-details my-5 grid grid-cols-[max-content_max-content] justify-items-start gap-x-11 gap-y-3 min-[700px]:gap-y-3.5 max-[1281px]:mx-auto max-[1281px]:w-fit max-[420px]:gap-x-4 max-[360px]:gap-x-2"><a href="mailto:mahishahnewaz@gmail.com" className="contact-detail inline-flex min-w-0 max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px] max-[420px]:text-[11px] max-[360px]:text-[10px]"><span className={iconDiscClass}><Mail /></span> mahishahnewaz@gmail.com</a><a href="https://www.linkedin.com/in/-sh-/" target="_blank" rel="noreferrer" className="contact-detail inline-flex min-w-0 max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px] max-[420px]:text-[11px] max-[360px]:text-[10px]"><span className="contact-icon linkedin-icon grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#185442] to-[#0d2f25] font-sans text-sm font-black leading-none text-white shadow-[0_8px_18px_rgba(13,47,37,.1)]" aria-hidden="true">in</span> LinkedIn</a><a href="tel:+8801348060117" className="contact-detail inline-flex min-w-0 max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px] max-[420px]:text-[11px] max-[360px]:text-[10px]"><span className={iconDiscClass}><Phone /></span> +880 1348-060117</a><a href="https://github.com/Shahnewaz-Ali-Mohammad" target="_blank" rel="noreferrer" className="contact-detail inline-flex min-w-0 max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform hover:-translate-y-px max-[600px]:text-[13px] max-[420px]:text-[11px] max-[360px]:text-[10px]"><span className={iconDiscClass}><Github /></span> GitHub</a>
        </div>
        <div className="tags hero-stack-tags flex flex-wrap gap-2 max-[1281px]:justify-center" aria-label="Core expertise">{["Full-stack", "Responsive UI", "React & Next.js", "TypeScript", "Tailwind CSS", "REST APIs", "Agentic AI", "MCP servers", "LangGraph", "MySQL", ".NET"].map((tag) => <span className={pillClass} key={tag}>{tag}</span>)}</div>
      </div>
      <HeroShowcase />
      <div className="hero-full [grid-area:full] w-full min-w-0 pt-[clamp(14px,2.2vw,42px)] min-[1800px]:pt-20">
        <p className={`intro max-w-none break-normal text-justify text-[clamp(15px,1.1vw,18px)] leading-[1.78] [hyphens:none] [overflow-wrap:normal] [text-align-last:left] [text-justify:inter-word] ${descriptionTextClass}`}>Full-stack web developer building responsive, scalable applications with Next.js, React, TypeScript, JavaScript, Tailwind CSS, PHP, and REST APIs. Experienced in reusable component development, application state, performance, automated testing, and production-ready Figma implementation. Currently working with agentic AI, AI-powered chatbots, workflow automation, and Model Context Protocol servers that connect intelligent applications with external tools, data, and business systems.</p>
        <div className="hero-actions mt-7 flex flex-wrap gap-3.5"><a className={primaryButtonClass} href="#work">View selected work <ArrowDownRight /></a><a className={secondaryButtonClass} href="#contact">Let&apos;s talk <ArrowUpRight /></a></div>
      </div>
    </section>
    <ProjectMarquee />

    <section className={`credentials group/credentials ${pageX} bg-gradient-to-b from-white to-[#f8f8f4] py-[90px] transition-colors duration-500 hover:from-[#fdfdfb] hover:to-[#f4f6f2]`} id="experience"><div className="section-label mb-12 flex items-center gap-4 transition-transform duration-500 group-hover/credentials:translate-x-1"><span className="grid min-w-16 place-items-center bg-[#174f3e] px-4 py-3 font-[var(--font-display)] text-2xl text-white">01</span><p className="m-0 bg-[#0d2f25] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white">Experience & education</p><i className="h-[3px] flex-1 bg-[#aebbb4]" /></div><div className="experience-layout grid w-full grid-cols-[minmax(0,1.05fr)_minmax(480px,.95fr)] gap-[clamp(48px,5vw,88px)] max-[1000px]:grid-cols-1"><article className="experience-panel min-w-0"><p className={eyebrowClass}>Professional experience</p><h2 className="my-8 font-[var(--font-display)] text-[clamp(34px,3.2vw,48px)] leading-tight">Experience</h2><div className="career-timeline relative">
      <div className="career-entry grid transition-[transform,background-color] duration-300 hover:translate-x-1 hover:bg-white/70 grid-cols-[88px_25px_1fr] gap-3 border-t border-[#175c46] py-6 pr-6 max-[900px]:grid-cols-[58px_25px_1fr]"><time className="pt-1 text-right text-[11px] font-black uppercase text-[#175c46]">Jul 2026<br/>Present</time><span className="timeline-marker mt-1 size-2.5 rounded-full bg-[#175c46]" /><div><h3 className="m-0 text-xl font-black">Software Engineer</h3><p className="career-role m-0 text-sm font-extrabold text-[#175c46]">Amber IT Ltd · Full-time</p><p className={`career-location m-0 text-sm leading-normal ${descriptionTextClass}`}>Dhaka, Bangladesh · On-site</p><ul className={`mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.72] ${descriptionTextClass}`}><li>Design and develop agentic AI solutions, including customer-service chatbots and voice agents.</li><li>Build AI-powered analytics with ASP.NET Core MVC, Semantic Kernel, OpenAI, and MCP.</li><li>Engineer .NET automation workflows connecting LLMs, enterprise APIs, SQL databases, and business systems.</li></ul></div></div>
      <div className="career-entry grid transition-[transform,background-color] duration-300 hover:translate-x-1 hover:bg-white/70 grid-cols-[88px_25px_1fr] gap-3 border-t border-[#ced6d0] py-6 pr-6 max-[900px]:grid-cols-[58px_25px_1fr]"><time className="pt-1 text-right text-[11px] font-black uppercase text-[#175c46]">Jun 2026<br/>Present</time><span className="timeline-marker mt-1 size-2.5 rounded-full bg-[#175c46]" /><div><h3 className="m-0 text-xl font-black">Full Stack Web Developer</h3><p className="career-role m-0 text-sm font-extrabold text-[#175c46]">Russian Center For Education · Full-time</p><p className={`career-location m-0 text-sm leading-normal ${descriptionTextClass}`}>Dhaka, Bangladesh · Remote</p><ul className={`mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.72] ${descriptionTextClass}`}><li>Develop full-stack applications with Next.js, TypeScript, Tailwind CSS, MySQL, and PHP.</li><li>Implement schemas, CRUD workflows, APIs, authentication, forms, and content-management features.</li><li>Improve performance, security, and maintainability through validation, testing, debugging, and optimized queries.</li></ul></div></div>
      <div className="career-entry grid transition-[transform,background-color] duration-300 hover:translate-x-1 hover:bg-white/70 grid-cols-[88px_25px_1fr] gap-3 border-t border-[#ced6d0] py-6 pr-6 max-[900px]:grid-cols-[58px_25px_1fr]"><time className="pt-1 text-right text-[11px] font-black uppercase text-[#175c46]">Apr 2025<br/>Mar 2026</time><span className="timeline-marker mt-1 size-2.5 rounded-full bg-[#175c46]" /><div><h3 className="m-0 text-xl font-black">Software Engineer</h3><p className="career-role m-0 text-sm font-extrabold text-[#175c46]">CipherCoreTech · Full-time</p><p className={`career-location m-0 text-sm leading-normal ${descriptionTextClass}`}>Melbourne, Australia · On-site</p><ul className={`mt-4 list-disc space-y-1.5 pl-5 text-[15px] leading-[1.72] ${descriptionTextClass}`}><li>Built responsive React and TypeScript interfaces from business requirements and Figma designs.</li><li>Improved performance and maintainability with reusable architecture, Redux, lazy loading, and code splitting.</li><li>Supported delivery through unit testing, UAT, troubleshooting, and Agile collaboration.</li></ul></div></div>
    </div></article><article className="education-panel min-w-0 border-l border-[#ced6d0] pl-[clamp(34px,4vw,64px)] max-[1000px]:border-l-0 max-[1000px]:border-t max-[1000px]:pl-0 max-[1000px]:pt-12"><p className={eyebrowClass}>Academic background</p><h2 className="my-8 font-[var(--font-display)] text-[clamp(34px,3.2vw,48px)] leading-tight">Education</h2><div className="education-list grid gap-4 max-[1000px]:grid-cols-2 max-[700px]:grid-cols-1">
      <div className="education-entry group/education grid w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-6 rounded-2xl border border-[#ced6d0] bg-white p-5 shadow-[0_16px_36px_rgba(13,47,37,.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#d8a62b]/55 hover:shadow-[0_22px_46px_rgba(13,47,37,.11)] max-[1000px]:grid-cols-[86px_minmax(0,1fr)] max-[700px]:grid-cols-[78px_minmax(0,1fr)]"><div className="school-mark grid size-[104px] place-items-center overflow-hidden border border-[#d2d9d4] bg-[#0c0c0c] max-[1000px]:size-[86px] max-[700px]:size-[78px]"><img className="h-full w-full object-contain transition-transform duration-500 group-hover/education:scale-105" src={assetPath("/swinburne.png")} alt="Swinburne University of Technology logo" /></div><div><p className="degree-level mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#175c46]">Master&apos;s degree</p><h3 className="mb-3 font-[var(--font-display)] text-[clamp(21px,1.8vw,28px)] leading-tight">Master of Information Technology <span className={`mt-1 block text-[13px] font-semibold ${descriptionTextClass}`}>(Professional Computing)</span></h3><p className="school-name m-0 text-sm font-black">Swinburne University of Technology</p><p className={`school-location m-0 text-[13px] ${descriptionTextClass}`}>Melbourne, Australia</p></div></div>
      <div className="education-entry group/education grid w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-6 rounded-2xl border border-[#ced6d0] bg-white p-5 shadow-[0_16px_36px_rgba(13,47,37,.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#d8a62b]/55 hover:shadow-[0_22px_46px_rgba(13,47,37,.11)] max-[1000px]:grid-cols-[86px_minmax(0,1fr)] max-[700px]:grid-cols-[78px_minmax(0,1fr)]"><div className="school-mark brac-mark grid size-[104px] place-items-center overflow-hidden border border-[#d2d9d4] bg-white p-3 max-[1000px]:size-[86px] max-[700px]:size-[78px]"><img className="h-full w-full object-contain transition-transform duration-500 group-hover/education:scale-105" src={assetPath("/brac-university.svg")} alt="BRAC University logo" /></div><div><p className="degree-level mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#175c46]">Bachelor&apos;s degree</p><h3 className="mb-3 font-[var(--font-display)] text-[clamp(21px,1.8vw,28px)] leading-tight">Bachelor of Computer Science</h3><p className="school-name m-0 text-sm font-black">BRAC University</p><p className={`school-location m-0 text-[13px] ${descriptionTextClass}`}>Dhaka, Bangladesh</p></div></div>
    </div><div className="professional-year mt-8 border-t border-[#ced6d0] pt-7"><p className={eyebrowClass}>Professional year</p><div className="education-entry group/education mt-4 grid w-full grid-cols-[104px_minmax(0,1fr)] items-center gap-6 rounded-2xl border border-[#ced6d0] bg-white p-5 shadow-[0_16px_36px_rgba(13,47,37,.06)] transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-[#d8a62b]/55 hover:shadow-[0_22px_46px_rgba(13,47,37,.11)] max-[1000px]:grid-cols-[86px_minmax(0,1fr)] max-[700px]:grid-cols-[78px_minmax(0,1fr)]"><div className="school-mark acs-mark grid size-[104px] place-items-center overflow-hidden border border-[#d2d9d4] bg-white p-2 max-[1000px]:size-[86px] max-[700px]:size-[78px]"><img className="h-full w-full object-contain transition-transform duration-500 group-hover/education:scale-105" src={assetPath("/acs.jpg")} alt="Australian Computer Society logo" /></div><div><p className="degree-level mb-2 text-[11px] font-black uppercase tracking-[0.14em] text-[#175c46]">Professional qualification</p><h3 className="mb-3 font-[var(--font-display)] text-[clamp(21px,1.8vw,28px)] leading-tight">Professional Year</h3><p className="school-name m-0 text-sm font-black">Australian Computer Society</p></div></div></div></article></div></section>

    <section className={`work group/work ${pageX} bg-[#f6f5f0] py-[90px] transition-colors duration-500 hover:bg-[#faf9f5]`} id="work"><div className="section-label mb-12 flex items-center gap-4 transition-transform duration-500 group-hover/work:translate-x-1"><span className="grid min-w-16 place-items-center bg-[#174f3e] px-4 py-3 font-[var(--font-display)] text-2xl text-white">02</span><p className="m-0 bg-[#0d2f25] px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-white">Selected work</p><i className="h-[3px] flex-1 bg-[#9fb0a8]" /></div>{featured.map((project, index) => <article id={projectId(project.title)} className={`project group/project ${index % 2 ? "reverse" : ""} grid min-h-[620px] grid-cols-[minmax(0,38%)_minmax(0,62%)] items-center ${index === 0 ? "" : "border-t-2 border-[#aebbb4]"} py-14 max-[900px]:grid-cols-1 max-[900px]:gap-5 max-[900px]:py-9`} key={project.title}><div className="project-copy flex min-w-0 flex-col transition-transform duration-500 group-hover/project:translate-x-1 items-start justify-center py-0 pr-[clamp(28px,4vw,72px)] max-[900px]:pr-0"><p className={eyebrowClass}>{project.kind}</p><h2 className="my-5 font-[var(--font-display)] text-[clamp(36px,3.2vw,52px)] leading-tight">{project.title}</h2><p className={`max-w-[620px] break-normal text-justify leading-[1.75] [hyphens:none] [overflow-wrap:normal] [text-align-last:left] ${descriptionTextClass}`}>{project.summary}</p><div className="stack my-6 flex flex-wrap gap-2">{project.stack.map(item => <span className={pillClass} key={item}>{item}</span>)}</div>{project.repo ? <a className={tertiaryButtonClass} href={project.repo} target="_blank" rel="noreferrer">View repository <ArrowUpRight /></a> : <span className="project-status rounded-full border border-[#175c46]/20 bg-white/50 px-3.5 py-2.5 text-[13px] font-black">Project in progress</span>}</div><ProjectVisual project={project} /></article>)}</section>
    <section className={`capabilities group/skills ${pageX} bg-[#0d2f25] py-[90px] text-white`} id="skills"><div className="section-label light mb-12 flex items-center gap-4 transition-transform duration-500 group-hover/skills:translate-x-1"><span className="grid min-w-16 place-items-center bg-white px-4 py-3 font-[var(--font-display)] text-2xl text-[#0d2f25]">03</span><p className="m-0 bg-white px-6 py-3 text-sm font-black uppercase tracking-[0.1em] text-[#0d2f25]">Skills</p><i className="h-[3px] flex-1 bg-[#769087]" /></div><div className="capability-list">{skills.map((skill) => <article className="group/skill -mx-[clamp(24px,5vw,80px)] grid grid-cols-[minmax(180px,.75fr)_minmax(0,1.35fr)_minmax(220px,.9fr)] items-center gap-8 border-t border-[#466257] px-[clamp(24px,5vw,80px)] py-8 first:border-t-0 transition-colors duration-300 hover:bg-white/[.035] max-[900px]:grid-cols-1" key={skill.group}><div className="skill-heading"><h3 className="m-0 text-xl font-black">{skill.group}</h3><p className="mt-3 text-sm leading-relaxed text-[#d2ded9]">{skill.statement}</p></div><div className="skill-details flex flex-col gap-4"><p className="skill-label m-0 text-[11px] font-black uppercase tracking-[0.14em] text-[#9bd6bf]">Core toolkit</p><ul className="flex flex-wrap gap-3">{skill.items.map((item) => <li className="rounded-full border border-white/20 px-3.5 py-2 text-sm font-black text-[#eef6f2] transition-colors duration-300 hover:border-[#e4c45d]/70 hover:bg-white/10" key={item}>{item}</li>)}</ul></div><div className="skill-proof"><p className="skill-label m-0 text-[11px] font-black uppercase tracking-[0.14em] text-[#9bd6bf]">Selected work</p><p className="mt-3 text-sm leading-relaxed text-[#d2ded9]">{skill.proof.join(" · ")}</p></div></article>)}</div></section>
    <section className={`contact group/contact ${pageX} bg-[#dbe9e2] py-[100px] transition-colors duration-500 hover:bg-[#d5e6dd]`} id="contact"><p className={eyebrowClass}>Have a project in mind?</p><h2 className="my-6 max-w-[760px] transition-transform duration-500 group-hover/contact:translate-x-1 font-[var(--font-display)] text-[clamp(34px,3.4vw,50px)] leading-tight">Let&apos;s build something useful.</h2><div className="contact-details my-8 grid grid-cols-2 justify-items-start gap-x-11 gap-y-3.5 max-[700px]:grid-cols-1"><a href="mailto:mahishahnewaz@gmail.com" className="contact-detail inline-flex max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform duration-300 hover:-translate-y-0.5"><span className={iconDiscClass}><Mail /></span> mahishahnewaz@gmail.com</a><a href="https://www.linkedin.com/in/-sh-/" target="_blank" rel="noreferrer" className="contact-detail inline-flex max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform duration-300 hover:-translate-y-0.5"><span className="contact-icon linkedin-icon grid size-9 shrink-0 place-items-center rounded-full bg-gradient-to-b from-[#185442] to-[#0d2f25] font-sans text-sm font-black leading-none text-white shadow-[0_8px_18px_rgba(13,47,37,.1)]" aria-hidden="true">in</span> LinkedIn</a><a href="tel:+8801348060117" className="contact-detail inline-flex max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform duration-300 hover:-translate-y-0.5"><span className={iconDiscClass}><Phone /></span> +880 1348-060117</a><a href="https://github.com/Shahnewaz-Ali-Mohammad" target="_blank" rel="noreferrer" className="contact-detail inline-flex max-w-full items-center gap-2.5 whitespace-nowrap text-[15px] font-extrabold text-[#0d2f25] transition-transform duration-300 hover:-translate-y-0.5"><span className={iconDiscClass}><Github /></span> GitHub</a></div><div className="contact-socials flex items-center gap-3.5"><a className={`${primaryButtonClass} contact-button min-w-[235px]`} href="mailto:mahishahnewaz@gmail.com">Start a conversation <Mail /></a></div></section>
    <footer className="group/footer flex min-h-32 flex-col items-center justify-center gap-5 bg-[#0d2f25] transition-colors duration-500 hover:bg-[#0a281f] px-[clamp(24px,5vw,80px)] py-10 text-center text-[#b7c9c1]"><div className="footer-line flex flex-wrap items-center justify-center gap-5 text-[15px] font-extrabold tracking-[0.02em] text-[#e3ede8]"><span>Full-Stack Development</span><i className="size-1 rounded-full bg-[#eaf1ec]" /><span>Agentic AI Development</span><span className="footer-highlight inline-flex transition-[transform,box-shadow] duration-500 group-hover/footer:-translate-y-0.5 group-hover/footer:shadow-[0_12px_30px_rgba(230,180,90,.12)] items-center gap-3 rounded-[14px] border border-[#e6b45a]/60 bg-[#e6b45a]/10 px-5 py-2.5 text-[11px] font-black uppercase tracking-[0.18em] text-[#f0c674]"><em className="block size-1.5 rounded-full bg-[#f0c674]" aria-hidden="true" />Open for Remote Work</span></div><span className="footer-copy text-[11px] uppercase tracking-[0.1em] text-[#7d968c]">© 2026 Shahnewaz Ali Mohammad</span></footer>
  </main>;
}
