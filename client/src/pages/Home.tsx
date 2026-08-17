// Quiet Clinical Editorial — page composition: asymmetric spreads, warm ivory, mineral green, restrained motion.
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, CalendarDays, ChevronDown, ChevronRight, Clock3, Instagram, Menu, Play, Sparkles, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const images = {
  doctor: "https://images.unsplash.com/photo-1550831107-1553da8c8464?auto=format&fit=crop&w=1400&q=88",
  clinic: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=88",
  treatment: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1200&q=88",
  detail: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1200&q=88",
};

const expertise = [
  { no: "01", title: "Cosmetic dentistry", text: "Natural-looking refinements, designed to still feel like you.", image: images.treatment },
  { no: "02", title: "Restorative care", text: "Thoughtful treatment for function, comfort, and confidence.", image: images.clinic },
  { no: "03", title: "Smile design", text: "A considered plan shaped around your features and your life.", image: images.detail },
  { no: "04", title: "Preventive care", text: "Small, consistent steps that keep your smile in good hands.", image: images.treatment },
];

const steps = [
  ["01", "Conversation", "We listen first — to your concerns, your history, and what matters to you."],
  ["02", "Examination", "Digital diagnostics and a careful assessment make the next step clear."],
  ["03", "Treatment plan", "A calm, transparent plan built around your comfort and your goals."],
  ["04", "Care", "Precision treatment, delivered gently, with time for every question."],
];

function MagneticButton({ children, dark = false }: { children: React.ReactNode; dark?: boolean }) {
  return <button className={`magnetic-button ${dark ? "magnetic-button--dark" : ""}`}><span>{children}</span><ArrowUpRight size={15} strokeWidth={1.6} /></button>;
}

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduce) return;
      const intro = gsap.timeline({ defaults: { ease: "power4.out" } });
      intro.from(".nav-shell", { y: -24, opacity: 0, duration: 0.8 })
        .from(".hero-kicker, .hero-title-line, .hero-copy, .hero-actions", { y: 34, opacity: 0, duration: 0.9, stagger: 0.08 }, "-=0.35")
        .from(".hero-portrait", { scale: 1.08, clipPath: "inset(0 0 100% 0)", duration: 1.4 }, "-=1.05")
        .from(".hero-rail, .hero-stats", { opacity: 0, x: 18, duration: 0.7, stagger: 0.12 }, "-=0.65");

      gsap.utils.toArray<HTMLElement>(".reveal").forEach((el) => {
        gsap.from(el, { y: 60, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 82%", once: true } });
      });
      gsap.utils.toArray<HTMLElement>(".image-reveal").forEach((el) => {
        gsap.fromTo(el, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 1.25, ease: "power4.inOut", scrollTrigger: { trigger: el, start: "top 78%", once: true } });
      });
      gsap.to(".smile-photo", { yPercent: -9, ease: "none", scrollTrigger: { trigger: ".results-section", start: "top bottom", end: "bottom top", scrub: true } });
      gsap.to(".contour-line", { strokeDashoffset: 0, ease: "none", scrollTrigger: { trigger: ".approach-section", start: "top 70%", end: "bottom 45%", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);

  const scrollTo = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };

  return (
    <div ref={root} className="site-shell">
      <header className="nav-shell">
        <a className="brand" href="#top" aria-label="Dr. Elena Morgan home"><span className="brand-mark">◌</span><span><strong>Dr. Elena Morgan</strong><small>Cosmetic & restorative dentistry</small></span></a>
        <nav className={menuOpen ? "nav-links nav-links--open" : "nav-links"}>
          {["about", "expertise", "approach", "results", "visit"].map((item) => <button key={item} onClick={() => scrollTo(item)}>{item}</button>)}
        </nav>
        <button className="nav-cta" onClick={() => scrollTo("visit")}>Book a consultation <ArrowUpRight size={14} /></button>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
      </header>

      <main id="top">
        <section className="hero-section section-pad">
          <div className="hero-rail"><span>Private practice / Dhaka</span><span className="rail-line" /><span>Scroll to explore</span></div>
          <div className="hero-copy-wrap">
            <p className="eyebrow hero-kicker">Advanced dentistry, intentional care</p>
            <h1 className="hero-title"><span className="hero-title-line">The care behind</span><span className="hero-title-line">a <em>confident</em> smile.</span></h1>
            <p className="hero-copy">Thoughtful cosmetic and restorative dentistry for people who want results that feel natural, personal, and entirely their own.</p>
            <div className="hero-actions"><button className="magnetic-button magnetic-button--dark" onClick={() => scrollTo("visit")}><span>Plan your first visit</span><ArrowUpRight size={15} /></button><button className="text-link" onClick={() => scrollTo("about")}>Meet Dr. Morgan <ChevronRight size={16} /></button></div>
          </div>
          <div className="hero-visual"><div className="hero-portrait image-reveal"><img src={images.doctor} alt="Dr. Elena Morgan in her dental practice" /><div className="portrait-caption"><span>Elena Morgan</span><span>BDS, MSc / 12+ years</span></div></div><div className="hero-note"><Sparkles size={16} /><span>Natural results.<br />Carefully considered.</span></div></div>
          <div className="hero-stats"><div><strong>12+</strong><span>years in practice</span></div><div><strong>3,500</strong><span>smiles cared for</span></div><div><strong>01</strong><span>patient-first promise</span></div></div>
        </section>

        <section id="about" className="about-section section-pad">
          <div className="section-index"><span>01</span><span>About the doctor</span></div>
          <div className="about-images"><div className="about-main image-reveal"><img src={images.clinic} alt="Calm, private dental clinic interior" /></div><div className="about-detail image-reveal"><img src={images.detail} alt="Dental details in the clinic" /></div><div className="hand-note">care, with<br /><em>intention</em></div><div className="contour-stamp contour-stamp--about">◌</div></div>
          <div className="about-copy reveal"><p className="eyebrow">A quieter kind of dentistry</p><h2>Precision is important.<br /><em>So is how you feel.</em></h2><p>I believe every smile has a story. My role is to listen closely, explain clearly, and make the path to better oral health feel calm from the very first conversation.</p><div className="principles"><div><strong>01</strong><span>Listen first</span></div><div><strong>02</strong><span>Design with care</span></div><div><strong>03</strong><span>Keep it natural</span></div></div><button className="text-link">Read my approach <ChevronRight size={16} /></button></div>
        </section>

        <section id="expertise" className="expertise-section section-pad">
          <div className="expertise-intro reveal"><p className="eyebrow">Areas of expertise</p><h2>Specialized care,<br /><em>personalized for you.</em></h2><p>From subtle refinements to restorative care, each treatment begins with the same question: what would make a meaningful difference for you?</p><button className="outline-link">Explore treatments <ArrowUpRight size={14} /></button></div>
          <div className="expertise-list">{expertise.map((item, index) => <article className={`expertise-card reveal expertise-card--${index + 1}`} key={item.no}><div className="expertise-card-image"><img src={item.image} alt="" /><span className="card-folio">{item.no} / 04</span></div><div className="expertise-card-meta"><h3>{item.title}</h3><p>{item.text}</p><span className="learn-more">Read the approach <ArrowUpRight size={14} /></span></div></article>)}</div><div className="expertise-mark">◌<span>carefully considered</span></div>
        </section>

        <section id="results" className="results-section section-pad"><div className="results-copy reveal"><p className="eyebrow">A quiet case study</p><h2>Small changes.<br /><em>A real difference.</em></h2><p>Beautiful dentistry is not about looking “done”. It is about the quiet confidence that comes from feeling comfortable in your own smile.</p><div className="case-note"><span>Patient question</span><strong>“How can I look like myself,<br />only more rested?”</strong></div><button className="light-link">View case studies <ArrowUpRight size={14} /></button></div><div className="results-image image-reveal"><span className="results-folio">Case 01 / Natural smile design</span><img className="smile-photo" src={images.treatment} alt="Natural smile detail" /><div className="before-after"><span>Before</span><span className="ba-handle">↔</span><span>After</span></div><div className="results-stamp">◌<span>considered<br />care</span></div></div></section>

        <section id="approach" className="approach-section section-pad"><div className="approach-heading reveal"><div><p className="eyebrow">Your journey</p><h2>A considered experience,<br /><em>from hello to smile.</em></h2></div><svg className="contour" viewBox="0 0 260 120" aria-hidden="true"><path className="contour-line" d="M3 65 C 45 15, 90 15, 130 65 S 215 115, 257 55" /></svg></div><div className="steps">{steps.map(([no, title, text]) => <div className="step reveal" key={no}><span className="step-no">{no}</span><div className="step-icon"><CalendarDays size={17} strokeWidth={1.2} /></div><h3>{title}</h3><p>{text}</p></div>)}</div></section>

        <section id="visit" className="visit-section section-pad"><div className="visit-image"><img src={images.clinic} alt="A welcoming consultation space" /><div className="visit-overlay"><span>Ready when you are</span><strong>Let's make space<br />for your smile.</strong></div><div className="contour-stamp contour-stamp--visit">◌</div></div><div className="visit-panel"><p className="eyebrow">Plan your first visit</p><h2>A little time<br /><em>well spent.</em></h2><p>Tell us a little about what you are looking for. Our team will be in touch to find a time that works for you.</p><form onSubmit={(e) => e.preventDefault()}><label><span>Your name</span><input placeholder="e.g. Ayesha Rahman" /></label><label><span>Best way to reach you</span><input placeholder="Phone or email" /></label><label><span>What can we help with?</span><select defaultValue=""><option value="" disabled>Select an area</option><option>Cosmetic dentistry</option><option>Restorative care</option><option>General consultation</option></select></label><button className="magnetic-button magnetic-button--dark" type="submit"><span>Request a consultation</span><ArrowUpRight size={15} /></button></form><div className="visit-meta"><span><Clock3 size={15} /> Sun–Thu / 9:00–19:00</span><span><Instagram size={15} /> @elenamorgan.dentist</span></div></div></section>
      </main>
      <footer className="footer"><div className="brand"><span className="brand-mark">◌</span><span><strong>Dr. Elena Morgan</strong><small>Cosmetic & restorative dentistry</small></span></div><p>Thoughtful care. Natural results.<br />Dhaka, Bangladesh.</p><span className="footer-end">© 2026 / All rights reserved</span></footer>
    </div>
  );
}
