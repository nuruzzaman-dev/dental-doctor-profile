// Webflow-inspired clinic brand direction — bold sans-serif type, teal/navy fields, open image-led sections, no repeated card grids.
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowDownRight, ArrowRight, CalendarDays, Check, Clock3, Menu, Phone, Play, Plus, X } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const img = {
  hero: "https://images.unsplash.com/photo-1588776814546-daab30f310ce?auto=format&fit=crop&w=1600&q=88",
  doctor: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?auto=format&fit=crop&w=1200&q=88",
  clinic: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=1400&q=88",
  detail: "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=1000&q=88",
  smile: "https://images.unsplash.com/photo-1606811971618-4486d14f3f99?auto=format&fit=crop&w=1100&q=88",
};

const services = [
  ["01", "Preventive care", "Keep your smile healthy before a small concern becomes a bigger one."],
  ["02", "Smile design", "Subtle, natural refinements designed around your face and your life."],
  ["03", "Restorative dentistry", "Comfort, function, and confidence restored with a considered plan."],
  ["04", "Clear aligners", "A discreet path to a healthier, more confident smile."],
];

const faqs = [
  ["I feel nervous about dental treatment.", "That is more common than you think. We start with a conversation, explain each step, and never rush you into a decision."],
  ["Do I need a treatment plan before I book?", "No. Your first visit is a chance to understand what is happening and talk through the options clearly."],
  ["Will my result look natural?", "Natural-looking results are always the goal. We plan around your features, your bite, and the way you want to feel."],
];

export default function Home() {
  const root = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.timeline({ defaults: { ease: "power4.out" } })
        .from(".brand-nav", { y: -20, opacity: 0, duration: .65 })
        .from(".hero-tag, .hero-title, .hero-text, .hero-actions", { y: 38, opacity: 0, duration: .75, stagger: .08 }, "-=.3")
        .from(".hero-image", { clipPath: "inset(0 0 100% 0)", duration: 1.1 }, "-=.9");
      gsap.utils.toArray<HTMLElement>(".fade-up").forEach((el) => gsap.from(el, { y: 55, opacity: 0, duration: .85, ease: "power3.out", scrollTrigger: { trigger: el, start: "top 83%", once: true } }));
      gsap.utils.toArray<HTMLElement>(".line-fill").forEach((el) => gsap.fromTo(el, { scaleX: 0, transformOrigin: "left" }, { scaleX: 1, duration: 1, ease: "power3.inOut", scrollTrigger: { trigger: el, start: "top 85%", once: true } }));
      gsap.to(".hero-image img", { yPercent: 10, ease: "none", scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true } });
    }, root);
    return () => ctx.revert();
  }, []);
  const go = (id: string) => { setMenuOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); };
  return <div ref={root} className="clinic-site">
    <header className="brand-nav"><a className="logo" href="#top"><span className="logo-symbol">+</span><span><b>MORGAN</b><small>DENTAL STUDIO</small></span></a><nav className={menuOpen ? "nav-menu nav-menu-open" : "nav-menu"}><button onClick={() => go("doctor")}>About</button><button onClick={() => go("services")}>Services</button><button onClick={() => go("approach")}>Approach</button><button onClick={() => go("visit")}>Contact</button></nav><a className="nav-call" href="tel:+8801712345678"><Phone size={15} /> <span>+880 1712 345 678</span></a><button className="menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label="Open menu">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button></header>
    <main id="top">
      <section className="hero"><div className="hero-copy"><p className="hero-tag">Private dental care / Dhanmondi, Dhaka</p><h1>Feel good<br /><span>about your</span><br />smile.</h1><p className="hero-text">Modern dentistry with a softer approach. Personal care, clear answers, and results that look like you.</p><div className="hero-actions"><button className="primary-button" onClick={() => go("visit")}>Book an appointment <ArrowDownRight size={17} /></button><button className="play-button" onClick={() => go("approach")}><span><Play size={13} fill="currentColor" /></span> See how we care</button></div></div><div className="hero-image"><img src={img.hero} alt="Dentist caring for a patient" /><div className="hero-image-label"><span>01</span><span>Care that feels personal</span></div></div><div className="hero-corner">Scroll to explore <ArrowDownRight size={14} /></div></section>

      <section className="contact-band"><div><Phone size={20} /><span><small>Call the studio</small><strong>+880 1712 345 678</strong></span></div><div><Clock3 size={20} /><span><small>Opening hours</small><strong>Sun–Thu / 9:00–19:00</strong></span></div><div><CalendarDays size={20} /><span><small>First visit</small><strong>Easy to book, never rushed</strong></span></div></section>

      <section id="doctor" className="doctor-section section"><div className="doctor-image"><img src={img.doctor} alt="Dr. Elena Morgan" /><span>Dr. Elena Morgan / BDS, MSc</span></div><div className="doctor-copy fade-up"><p className="kicker">Meet your dentist</p><h2>Good dentistry<br /><em>starts with listening.</em></h2><p>I’m Dr. Elena Morgan. I created this studio for people who want excellent dental care without the cold, hurried feeling that can come with it.</p><p>Every appointment begins with time: time to understand what you need, time to explain your choices, and time to make a plan that feels right.</p><div className="doctor-sign"><span>Elena Morgan</span><small>Cosmetic & restorative dentistry</small></div><div className="credential-row"><div><b>12+</b><span>years clinical experience</span></div><div><b>3.5k</b><span>patients cared for</span></div><div><b>01</b><span>doctor-led plan</span></div></div></div></section>

      <section id="services" className="services-section section"><div className="services-heading fade-up"><div><p className="kicker">What we do</p><h2>Care for every<br /><em>kind of smile.</em></h2></div><p>From a routine check-up to a complete smile transformation, we keep the process clear, calm, and personal.</p></div><div className="service-list">{services.map(([no, title, text]) => <button className="service-row fade-up" key={no}><span className="service-no">{no}</span><span className="service-title">{title}</span><span className="service-description">{text}</span><ArrowRight className="service-arrow" size={21} /></button>)}</div><div className="line-fill service-line" /></section>

      <section id="approach" className="approach-feature"><div className="approach-photo"><img src={img.clinic} alt="Inside Morgan Dental Studio" /><div className="image-play"><Play size={16} fill="currentColor" /></div></div><div className="approach-copy"><p className="kicker">The Morgan approach</p><h2>Less pressure.<br /><em>More confidence.</em></h2><div className="approach-points"><div><span>01</span><p><b>We explain</b> — no jargon, no guesswork, no hidden steps.</p></div><div><span>02</span><p><b>We personalise</b> — your treatment should fit your life, not the other way around.</p></div><div><span>03</span><p><b>We stay with you</b> — from first conversation to long-term care.</p></div></div><button className="text-button" onClick={() => go("visit")}>Start with a conversation <ArrowRight size={16} /></button></div></section>

      <section className="smile-section section"><div className="smile-heading fade-up"><p className="kicker">What patients ask us</p><h2>It’s okay to have<br /><em>questions.</em></h2></div><div className="faq-area"><div className="faq-list">{faqs.map(([q, a], i) => <div className={openFaq === i ? "faq faq-open" : "faq"} key={q}><button onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{q}</span>{openFaq === i ? <X size={17} /> : <Plus size={18} />}</button>{openFaq === i && <p>{a}</p>}</div>)}</div><div className="smile-photo"><img src={img.smile} alt="Natural smile detail" /><span>Natural results / considered care</span></div></div></section>

      <section id="visit" className="visit-hero"><div className="visit-copy"><p className="kicker">Your next step</p><h2>Let’s make time<br /><em>for your smile.</em></h2><p>Tell us a little about what you are looking for. We’ll get back to you within one working day.</p><button className="light-button" onClick={() => go("booking")}>Book your first visit <ArrowRight size={17} /></button></div><div className="visit-info"><div><small>Studio</small><strong>House 18, Road 27<br />Dhanmondi, Dhaka</strong></div><div><small>Hours</small><strong>Sun–Thu / 9:00–19:00<br />Friday–Saturday / Closed</strong></div><div><small>Contact</small><strong>+880 1712 345 678<br />hello@morgandental.studio</strong></div></div></section>

      <section id="booking" className="booking-section section"><div><p className="kicker">Request a consultation</p><h2>Start with<br /><em>hello.</em></h2></div><form onSubmit={(e) => e.preventDefault()}><label>Your name<input placeholder="e.g. Ayesha Rahman" /></label><label>Phone or email<input placeholder="How should we reach you?" /></label><label>What can we help with?<select defaultValue=""><option value="" disabled>Select an area</option><option>General consultation</option><option>Cosmetic dentistry</option><option>Restorative care</option></select></label><button className="primary-button" type="submit">Send request <ArrowRight size={17} /></button></form></section>
    </main>
    <footer className="site-footer"><div className="logo"><span className="logo-symbol">+</span><span><b>MORGAN</b><small>DENTAL STUDIO</small></span></div><span>Thoughtful care / Natural results / Dhaka</span><span>© 2026 Morgan Dental Studio</span></footer><a className="mobile-cta" href="#booking">Book an appointment <ArrowRight size={16} /></a>
  </div>;
}
