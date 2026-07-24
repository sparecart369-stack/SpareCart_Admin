"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type FormState = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormState, string>>;

const navItems = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Features", href: "#features" },
  { label: "Mobile App", href: "#mobile-app" },
  { label: "Reviews", href: "#reviews" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const categories = [
  { name: "Cars", desc: "Engine and body parts" },
  { name: "Motorcycles", desc: "Performance and service parts" },
  { name: "Scooters", desc: "Daily commute essentials" },
  { name: "Trucks", desc: "Heavy-duty commercial units" },
  { name: "Buses", desc: "Fleet and transport spares" },
  { name: "Accessories", desc: "Premium add-ons and tools" },
];

const features = [
  { title: "Easy Part Discovery", description: "Discover the right spare parts with intelligent search, filters, and categories." },
  { title: "Buy & Sell", description: "List your own spare parts or browse trusted listings from nearby sellers." },
  { title: "Wide Variety", description: "Find new and used parts across multiple vehicle types and categories." },
  { title: "Seller Connection", description: "Connect with verified sellers and get the details you need before buying." },
  { title: "Simple Mobile Experience", description: "Everything is designed for a smooth, premium mobile-first journey." },
  { title: "Built for Automotive Communities", description: "Support for vehicle owners, mechanics, dealers, and fleet managers." },
];

const buyerSteps = [
  { step: "01", title: "Search", text: "Find the required part using categories, brand filters, and nearby availability." },
  { step: "02", title: "Explore", text: "Compare photos, prices, seller information, and condition before making a choice." },
  { step: "03", title: "Connect", text: "Start conversations with sellers and ask questions before you buy." },
  { step: "04", title: "Buy", text: "Complete your purchase and keep your vehicle moving with confidence." },
];

const sellerSteps = [
  { step: "01", title: "Create Your Listing", text: "Upload quality images, add details, and describe the condition clearly." },
  { step: "02", title: "Set Your Price", text: "Choose a price that reflects your part and the market demand." },
  { step: "03", title: "Reach Buyers", text: "Make your listing visible to buyers searching for the exact category." },
  { step: "04", title: "Sell", text: "Connect with interested buyers and complete your transaction smoothly." },
];

const stats = [
  { label: "Parts Listed", value: 10000, suffix: "+" },
  { label: "Users", value: 5000, suffix: "+" },
  { label: "Sellers", value: 1000, suffix: "+" },
  { label: "Categories", value: 50, suffix: "+" },
];

const appHighlights = [
  "Fast search and discovery",
  "Instant seller contact",
  "Clear product information",
  "Location-based browsing",
];

const testimonials = [
  { name: "Arjun P.", role: "Vehicle Owner", quote: "I found the exact brake parts I needed in minutes. The app felt clean, fast, and trustworthy." },
  { name: "Meera S.", role: "Mechanic", quote: "SpareCart helps me find the right parts for customers quickly without wasting time on calls." },
  { name: "Rafiq K.", role: "Spare Parts Seller", quote: "The listing experience is simple and I reached more buyers in a week than before." },
  { name: "Nikhil R.", role: "Car Enthusiast", quote: "The experience feels premium and modern. It is easy to browse parts and compare sellers." },
];

const faqItems = [
  { question: "What is SpareCart?", answer: "SpareCart is a mobile marketplace for buying and selling vehicle spare parts, built for users who want speed, trust, and convenience." },
  { question: "How can I buy spare parts?", answer: "Search by category, vehicle type, or brand, compare listings, and connect with the seller directly through the app." },
  { question: "Can I sell my spare parts?", answer: "Yes. You can create a listing, add photos, describe the condition, and share your offer with buyers." },
  { question: "Is SpareCart available on mobile?", answer: "Yes. SpareCart is designed primarily as a mobile-first experience for easy browsing and quick communication." },
  { question: "Can I sell used spare parts?", answer: "Yes. Used and refurbished parts can be listed if they are described clearly and accurately." },
  { question: "How do I contact a seller?", answer: "Use the in-app contact flow to reach out, ask questions, and coordinate the purchase." },
];

const contactCards = [
  { title: "Email", value: "support@sparecart.com", detail: "For support, partnerships, and general inquiries." },
  { title: "Phone", value: "+91 98765 43210", detail: "Monday to Saturday, 9:00 AM to 6:00 PM." },
  { title: "Location", value: "Kerala, India", detail: "Serving customers and sellers across regional markets." },
];

const socialLinks = [
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
  { label: "YouTube", href: "https://youtube.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
];

const mobileAppUrl = "https://play.google.com/store/apps/details?id=com.spare.kart";

function SectionTitle({ eyebrow, title, description }: { eyebrow: string; title: string; description: string }) {
  return (
    <div className="max-w-2xl space-y-3">
      <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">{eyebrow}</p>
      <h2 className="text-3xl font-black text-zinc-950 sm:text-4xl">{title}</h2>
      <p className="text-lg leading-8 text-zinc-600">{description}</p>
    </div>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    let frame = 0;
    const duration = 1000;
    const startTime = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.floor(progress * value));
      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [value]);

  return (
    <span>
      {display}
      {suffix}
    </span>
  );
}

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-4 shadow-sm">
      <button type="button" onClick={() => setOpen((value) => !value)} className="flex w-full items-center justify-between gap-4 text-left">
        <span className="text-base font-semibold text-zinc-950">{question}</span>
        <span className="text-2xl text-emerald-600">{open ? "−" : "+"}</span>
      </button>
      {open ? <p className="mt-3 text-sm leading-7 text-zinc-600">{answer}</p> : null}
    </div>
  );
}

export default function HomePage() {
  const [activeSection, setActiveSection] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [progress, setProgress] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviewIndex, setReviewIndex] = useState(0);
  const [form, setForm] = useState<FormState>({ name: "", email: "", phone: "", subject: "", message: "" });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setLoading(false), 700);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const total = document.documentElement.scrollHeight - window.innerHeight;
      const nextProgress = total > 0 ? (window.scrollY / total) * 100 : 0;
      setProgress(Math.min(100, Math.max(0, nextProgress)));
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", "")).filter(Boolean);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.45 },
    );

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setReviewIndex((value) => (value + 1) % testimonials.length);
    }, 5000);
    return () => window.clearInterval(timer);
  }, []);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors: FormErrors = {};

    if (!form.name.trim()) nextErrors.name = "Please enter your name.";
    if (!form.email.trim()) nextErrors.email = "Please enter your email.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) nextErrors.email = "Please enter a valid email address.";
    if (!form.subject.trim()) nextErrors.subject = "Please add a subject.";
    if (!form.message.trim()) nextErrors.message = "Please share your message.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      setSubmitted(false);
      return;
    }

    setSubmitted(true);
    setForm({ name: "", email: "", phone: "", subject: "", message: "" });
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(16,185,129,0.15),_transparent_35%),linear-gradient(135deg,_#f7fbf9_0%,_#f5f7fb_100%)]">
        <div className="rounded-full border border-emerald-100 bg-white/80 px-6 py-4 shadow-lg backdrop-blur">
          <div className="flex items-center gap-3">
            <div className="h-3 w-3 animate-pulse rounded-full bg-emerald-500" />
            <span className="text-sm font-semibold text-zinc-700">Loading SpareCart...</span>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.18),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#eef2ff_45%,_#f8fafc_100%)] text-zinc-900">
      <div className="fixed left-0 top-0 z-50 h-1 rounded-r-full bg-emerald-500 transition-all" style={{ width: `${progress}%` }} />

      <button
        type="button"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className={`fixed bottom-6 right-6 z-40 rounded-full bg-zinc-950 p-3 text-white shadow-lg transition-all ${progress > 12 ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"}`}
        aria-label="Back to top"
      >
        ↑
      </button>

      <header className={`sticky top-0 z-40 transition-all ${scrolled ? "border-b border-white/60 bg-white/80 shadow-[0_8px_30px_-20px_rgba(15,23,42,0.35)] backdrop-blur-xl" : "bg-transparent"}`}>
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
          <Link href="#home" className="text-xl font-black tracking-tight text-zinc-950" onClick={() => setMobileMenuOpen(false)}>
            SpareCart
          </Link>
          <div className="hidden items-center gap-6 lg:flex">
            {navItems.map((item) => (
              <a key={item.href} href={item.href} className={`text-sm font-semibold transition ${activeSection === item.href.replace("#", "") ? "text-emerald-600" : "text-zinc-600 hover:text-zinc-950"}`}>
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/admin" className="rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-semibold text-emerald-700 transition hover:bg-emerald-100">
              Admin
            </Link>
            <a href={mobileAppUrl} target="_blank" rel="noopener noreferrer" className="hidden rounded-full bg-emerald-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-emerald-700 sm:inline-flex">
              Download App
            </a>
            <button type="button" className="rounded-full border border-zinc-200 bg-white p-2 lg:hidden" onClick={() => setMobileMenuOpen((value) => !value)} aria-label="Toggle menu">
              <span className="block h-0.5 w-5 bg-zinc-900" />
            </button>
          </div>
        </nav>
        {mobileMenuOpen ? (
          <div className="border-t border-zinc-200 bg-white/95 px-4 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {navItems.map((item) => (
                <a key={item.href} href={item.href} className="text-sm font-semibold text-zinc-700" onClick={() => setMobileMenuOpen(false)}>
                  {item.label}
                </a>
              ))}
              <Link href="/admin" className="rounded-full bg-emerald-600 px-4 py-2 text-center text-sm font-semibold text-white" onClick={() => setMobileMenuOpen(false)}>
                Go to Admin Dashboard
              </Link>
            </div>
          </div>
        ) : null}
      </header>

      <section id="home" className="mx-auto max-w-7xl px-4 pb-10 pt-4 sm:px-6 lg:px-8 lg:pb-16 lg:pt-8">
        <div className="overflow-hidden rounded-[36px] border border-white/70 bg-white/80 shadow-[0_30px_70px_-30px_rgba(15,23,42,0.28)] backdrop-blur-xl">
          <div className="grid gap-8 bg-[radial-gradient(circle_at_top_left,_rgba(16,185,129,0.16),_transparent_35%),radial-gradient(circle_at_top_right,_rgba(14,165,233,0.16),_transparent_35%),linear-gradient(135deg,_rgba(255,255,255,0.95),_rgba(240,249,255,0.9)_55%,_rgba(247,244,255,0.95))] p-8 sm:p-10 lg:grid-cols-[1.05fr_0.95fr] lg:p-14">
            <div className="space-y-6">
              <div className="inline-flex rounded-full border border-emerald-200/80 bg-gradient-to-r from-emerald-500/15 via-white to-sky-500/15 px-3 py-1 text-sm font-semibold text-emerald-700">
                SpareCart • Mobile marketplace for spare parts
              </div>
              <h1 className="max-w-2xl text-4xl font-black leading-tight text-zinc-950 sm:text-5xl lg:text-6xl">
                Your Spare Parts. Your Marketplace. Your Drive.
              </h1>
              <p className="max-w-2xl text-lg leading-8 text-zinc-600">
                Buy and sell vehicle spare parts easily with a modern mobile experience designed for buyers, sellers, mechanics, and automotive businesses.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href={mobileAppUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-gradient-to-r from-emerald-500 via-emerald-600 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-emerald-500/20 transition hover:brightness-110">
                  Download the App
                </a>
                <a href="#how-it-works" className="rounded-2xl border border-zinc-200 bg-white/80 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-white">
                  Explore How It Works
                </a>
              </div>
              <div className="flex flex-wrap gap-3 pt-2 text-sm font-semibold text-zinc-600">
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-2">Easy to Buy</span>
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-2">Easy to Sell</span>
                <span className="rounded-full border border-zinc-200 bg-white px-3 py-2">Trusted Marketplace</span>
              </div>
            </div>

            <div className="relative rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900 p-6 text-white shadow-2xl">
              <div className="absolute -left-3 top-7 h-24 w-24 rounded-full bg-emerald-500/20 blur-3xl" />
              <div className="absolute bottom-6 right-5 h-28 w-28 rounded-full bg-amber-400/20 blur-3xl" />
              <div className="relative rounded-[24px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Live marketplace</p>
                    <p className="mt-2 text-2xl font-black">New listing today</p>
                  </div>
                  <div className="rounded-full bg-emerald-500/20 px-3 py-1 text-sm font-semibold text-emerald-300">Verified</div>
                </div>
                <div className="mt-6 rounded-[20px] bg-white p-4 text-zinc-900">
                  <div className="flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-100 text-xl">⚙️</div>
                    <div>
                      <p className="font-black">Genuine Engine Filter</p>
                      <p className="text-sm text-zinc-600">₹2,500 • Available near you</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-zinc-300">Fast discovery</p>
                    <p className="mt-1 text-lg font-black">10k+ listings</p>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/10 p-4">
                    <p className="text-sm text-zinc-300">Seller trust</p>
                    <p className="mt-1 text-lg font-black">1k+ sellers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-8 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <SectionTitle eyebrow="About Us" title="We are making vehicle spare parts easier to find." description="SpareCart brings buyers and sellers together through a simple mobile marketplace designed to make spare-parts discovery faster, easier, and more reliable." />
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl bg-emerald-50 p-5">
                <h3 className="text-lg font-black text-zinc-950">Mission</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">To make vehicle spare-parts buying and selling simple, accessible, and dependable for everyone.</p>
              </div>
              <div className="rounded-2xl bg-amber-50 p-5">
                <h3 className="text-lg font-black text-zinc-950">Vision</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">To become a trusted digital marketplace for vehicle spare parts across regions and communities.</p>
              </div>
            </div>
          </div>
          <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-[24px] border border-zinc-200 bg-white p-5 shadow-sm">
                  <p className="text-3xl font-black text-zinc-950"><AnimatedCounter value={stat.value} suffix={stat.suffix} /></p>
                  <p className="mt-2 text-sm font-semibold text-zinc-600">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="features" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <SectionTitle eyebrow="Why Choose SpareCart" title="A premium marketplace experience for every automotive need." description="From part discovery to seller connection and business growth, SpareCart is built to support a modern automotive ecosystem." />
        <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.title} className="rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-100 text-xl">✦</div>
              <h3 className="mt-4 text-xl font-black text-zinc-950">{feature.title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <SectionTitle eyebrow="How It Works" title="Simple flows for buyers and sellers alike." description="Whether you need a part fast or want to list one you already have, SpareCart keeps the process clear and smooth." />
        <div className="mt-8 grid gap-6 lg:grid-cols-2">
          <div className="rounded-[28px] border border-white/70 bg-white/80 p-6 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <h3 className="text-2xl font-black text-zinc-950">For Buyers</h3>
            <div className="mt-6 space-y-4">
              {buyerSteps.map((step) => (
                <div key={step.step} className="flex gap-4 rounded-2xl bg-zinc-50 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-100 font-black text-emerald-700">{step.step}</div>
                  <div>
                    <p className="font-black text-zinc-950">{step.title}</p>
                    <p className="mt-1 text-sm leading-7 text-zinc-600">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900 p-6 text-white shadow-sm">
            <h3 className="text-2xl font-black">For Sellers</h3>
            <div className="mt-6 space-y-4">
              {sellerSteps.map((step) => (
                <div key={step.step} className="flex gap-4 rounded-2xl border border-white/10 bg-white/10 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 font-black text-emerald-300">{step.step}</div>
                  <div>
                    <p className="font-black">{step.title}</p>
                    <p className="mt-1 text-sm leading-7 text-zinc-300">{step.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="mobile-app" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <SectionTitle eyebrow="Mobile App" title="Everything you need, right in your pocket." description="Use SpareCart to find, buy, and sell spare parts from anywhere with a polished mobile-first experience." />
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={mobileAppUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Download on Google Play</a>
                <a href={mobileAppUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">Download on App Store</a>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                {appHighlights.map((item) => (
                  <span key={item} className="rounded-full border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-semibold text-zinc-700">{item}</span>
                ))}
              </div>
            </div>
            <div className="rounded-[28px] border border-white/10 bg-gradient-to-br from-zinc-950 via-zinc-900 to-slate-900 p-6 text-white shadow-xl">
              <div className="mx-auto flex max-w-sm flex-col gap-3 rounded-[32px] border border-white/10 bg-white/10 p-4 shadow-2xl">
                <div className="rounded-[24px] bg-white p-4 text-zinc-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-semibold text-zinc-500">Home</p>
                      <p className="font-black">SpareCart</p>
                    </div>
                    <div className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-700">Live</div>
                  </div>
                  <div className="mt-4 space-y-2">
                    <div className="h-3 rounded-full bg-zinc-100" />
                    <div className="h-3 w-3/4 rounded-full bg-zinc-100" />
                    <div className="h-3 w-1/2 rounded-full bg-zinc-100" />
                  </div>
                  <div className="mt-4 grid grid-cols-2 gap-2">
                    <div className="rounded-2xl bg-emerald-50 p-3">
                      <p className="text-xs font-semibold text-emerald-700">New listing</p>
                      <p className="mt-1 font-black">₹2,500</p>
                    </div>
                    <div className="rounded-2xl bg-amber-50 p-3">
                      <p className="text-xs font-semibold text-amber-700">Verified seller</p>
                      <p className="mt-1 font-black">4.9★</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <SectionTitle eyebrow="Vehicle Categories" title="Find parts for your vehicle in seconds." description="Browse vehicle categories and get to the right listing faster with a premium, structured experience." />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div key={category.name} className="group overflow-hidden rounded-[24px] border border-white/70 bg-white/80 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl transition hover:-translate-y-1 hover:shadow-lg">
              <div className="h-28 bg-gradient-to-br from-emerald-100 to-amber-100" />
              <div className="p-6">
                <h3 className="text-xl font-black text-zinc-950">{category.name}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{category.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {[
            { title: "Vehicle Owners", description: "Find the right spare parts without wasting time." },
            { title: "Spare Parts Sellers", description: "Reach more buyers and grow your business online." },
            { title: "Mechanics", description: "Quickly discover parts for customer vehicles." },
            { title: "Automotive Businesses", description: "Expand your digital presence and reach new customers." },
          ].map((benefit) => (
            <div key={benefit.title} className="rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
              <h3 className="text-xl font-black text-zinc-950">{benefit.title}</h3>
              <p className="mt-2 text-sm leading-7 text-zinc-600">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="reviews" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <SectionTitle eyebrow="Customer Reviews" title="What our community says about SpareCart." description="Real feedback from users who value speed, trust, and a better way to find vehicle parts." />
        <div className="mt-8 rounded-[32px] border border-white/70 bg-white/80 p-6 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl sm:p-8">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-black text-zinc-950">{testimonials[reviewIndex].name}</p>
              <p className="text-sm text-zinc-500">{testimonials[reviewIndex].role}</p>
            </div>
            <div className="flex gap-2">
              <button type="button" onClick={() => setReviewIndex((value) => (value - 1 + testimonials.length) % testimonials.length)} className="rounded-full border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700">←</button>
              <button type="button" onClick={() => setReviewIndex((value) => (value + 1) % testimonials.length)} className="rounded-full border border-zinc-200 px-3 py-2 text-sm font-semibold text-zinc-700">→</button>
            </div>
          </div>
          <div className="mt-6 rounded-[24px] bg-zinc-50 p-6">
            <p className="text-xl leading-9 text-zinc-700">“{testimonials[reviewIndex].quote}”</p>
            <div className="mt-4 flex gap-1 text-amber-500">★★★★★</div>
          </div>
          <div className="mt-4 flex justify-center gap-2">
            {testimonials.map((_, index) => (
              <button key={index} onClick={() => setReviewIndex(index)} className={`h-2.5 rounded-full transition ${reviewIndex === index ? "w-8 bg-emerald-600" : "w-2.5 bg-zinc-300"}`} aria-label={`Show review ${index + 1}`} />
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <SectionTitle eyebrow="App Features" title="Built for clarity, speed, and trust." description="Every part of the experience is designed to help users browse, compare, and connect with confidence." />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Smart Search", description: "Find the right part by keyword, category, or vehicle type." },
              { title: "Product Listings", description: "Showcase images, price, condition, and seller details clearly." },
              { title: "Location-Based Discovery", description: "Discover parts available nearby with simple location filters." },
              { title: "Buyer-Seller Communication", description: "Let users talk directly about product questions and pricing." },
              { title: "Notifications", description: "Stay informed about updates, replies, and new listings." },
              { title: "Secure Accounts", description: "Create a profile and manage your listings with ease." },
            ].map((item) => (
              <div key={item.title} className="rounded-[24px] border border-zinc-200 bg-zinc-50 p-5">
                <h3 className="text-lg font-black text-zinc-950">{item.title}</h3>
                <p className="mt-2 text-sm leading-7 text-zinc-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="rounded-[32px] border border-white/70 bg-gradient-to-br from-emerald-500/10 via-white to-sky-500/10 p-8 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
          <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr] lg:items-center">
            <div>
              <SectionTitle eyebrow="Trust & Safety" title="A marketplace experience designed to build confidence." description="SpareCart focuses on clear listings, user profiles, transparent pricing, and simple communication so the marketplace feels trustworthy and useful." />
            </div>
            <div className="rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
              <ul className="space-y-3 text-sm leading-7 text-zinc-600">
                <li>• Seller profiles and product details help reduce uncertainty.</li>
                <li>• Clear pricing and availability make comparison easier.</li>
                <li>• Community feedback supports better buying and selling decisions.</li>
                <li>• Reporting and support options create a safer marketplace environment.</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <SectionTitle eyebrow="FAQ" title="Everything you might want to know about SpareCart." description="A simple set of answers for buyers, sellers, and businesses exploring the platform." />
        <div className="mt-8 grid gap-4">
          {faqItems.map((item) => (
            <FaqItem key={item.question} question={item.question} answer={item.answer} />
          ))}
        </div>
      </section>

      <section id="contact" className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_0.95fr]">
          <div className="rounded-[32px] border border-zinc-200 bg-zinc-950 p-8 text-white shadow-[0_25px_70px_-30px_rgba(15,23,42,0.4)]">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-400">Download & Contact</p>
            <h2 className="mt-3 text-3xl font-black">Ready to find your next spare part?</h2>
            <p className="mt-3 text-lg leading-8 text-zinc-300">
              Join the SpareCart community and make buying and selling vehicle spare parts easier and more efficient.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mobileAppUrl} target="_blank" rel="noopener noreferrer" className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">Download the App</a>
              <a href="#about" className="rounded-2xl border border-white/10 px-5 py-3 text-sm font-semibold text-zinc-200 transition hover:bg-white/10">Learn More</a>
            </div>
          </div>

          <div className="rounded-[32px] border border-white/70 bg-white/80 p-8 shadow-[0_14px_40px_-24px_rgba(15,23,42,0.25)] backdrop-blur-xl">
            <h3 className="text-2xl font-black text-zinc-950">Get in touch</h3>
            <p className="mt-2 text-sm leading-7 text-zinc-600">Have a question, suggestion, or partnership opportunity? We would love to hear from you.</p>
            <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Full Name</label>
                  <input value={form.name} onChange={(e) => setForm((value) => ({ ...value, name: e.target.value }))} className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Your name" />
                  {errors.name ? <p className="mt-2 text-sm text-rose-600">{errors.name}</p> : null}
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Email Address</label>
                  <input type="email" value={form.email} onChange={(e) => setForm((value) => ({ ...value, email: e.target.value }))} className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="you@example.com" />
                  {errors.email ? <p className="mt-2 text-sm text-rose-600">{errors.email}</p> : null}
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Phone Number</label>
                  <input value={form.phone} onChange={(e) => setForm((value) => ({ ...value, phone: e.target.value }))} className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Your phone" />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-semibold text-zinc-700">Subject</label>
                  <input value={form.subject} onChange={(e) => setForm((value) => ({ ...value, subject: e.target.value }))} className="w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="How can we help?" />
                  {errors.subject ? <p className="mt-2 text-sm text-rose-600">{errors.subject}</p> : null}
                </div>
              </div>
              <div>
                <label className="mb-2 block text-sm font-semibold text-zinc-700">Message</label>
                <textarea value={form.message} onChange={(e) => setForm((value) => ({ ...value, message: e.target.value }))} className="min-h-32 w-full rounded-2xl border border-zinc-200 px-4 py-3 outline-none focus:border-emerald-500" placeholder="Tell us more about your idea or inquiry." />
                {errors.message ? <p className="mt-2 text-sm text-rose-600">{errors.message}</p> : null}
              </div>
              <button type="submit" className="rounded-2xl bg-emerald-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700">
                Send Message
              </button>
              {submitted ? <p className="text-sm font-semibold text-emerald-600">Thanks! Your message has been received. We will contact you shortly.</p> : null}
            </form>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid gap-4 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="rounded-[28px] border border-zinc-200 bg-white p-8 shadow-sm">
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-600">Contact Details</p>
            <div className="mt-6 space-y-4">
              {contactCards.map((card) => (
                <div key={card.title} className="rounded-2xl bg-zinc-50 p-4">
                  <p className="text-sm font-semibold text-zinc-950">{card.title}</p>
                  <p className="mt-1 font-black text-zinc-900">{card.value}</p>
                  <p className="mt-1 text-sm leading-7 text-zinc-600">{card.detail}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-[28px] border border-zinc-200 bg-gradient-to-br from-emerald-50 to-white p-8 shadow-sm">
            <h3 className="text-2xl font-black text-zinc-950">Follow SpareCart</h3>
            <p className="mt-3 text-lg leading-8 text-zinc-600">Stay updated with product launches, community stories, and marketplace tips.</p>
            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="rounded-full border border-zinc-200 bg-white px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-50">
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-zinc-200/70 bg-white/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-10 sm:px-6 lg:flex-row lg:items-start lg:justify-between lg:px-8">
          <div className="max-w-md">
            <p className="text-xl font-black text-zinc-950">SpareCart</p>
            <p className="mt-3 text-sm leading-7 text-zinc-600">Your marketplace for vehicle spare parts, designed to be fast, reliable, and easy to use.</p>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Explore</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600">
                {navItems.slice(0, 5).map((item) => (
                  <a key={item.href} href={item.href} className="hover:text-zinc-950">{item.label}</a>
                ))}
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Legal</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600">
                <a href="#contact" className="hover:text-zinc-950">Privacy Policy</a>
                <a href="#contact" className="hover:text-zinc-950">Terms & Conditions</a>
                <a href="#contact" className="hover:text-zinc-950">Refund Policy</a>
              </div>
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-zinc-500">Contact</p>
              <div className="mt-3 flex flex-col gap-2 text-sm text-zinc-600">
                <a href="mailto:support@sparecart.com" className="hover:text-zinc-950">support@sparecart.com</a>
                <a href="tel:+919876543210" className="hover:text-zinc-950">+91 98765 43210</a>
                <span>Kerala, India</span>
              </div>
            </div>
          </div>
        </div>
        <div className="border-t border-zinc-200 px-4 py-4 text-center text-sm text-zinc-500 sm:px-6 lg:px-8">
          © 2026 SpareCart. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
