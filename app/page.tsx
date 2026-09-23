"use client";

import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import {
  Users,
  FileText,
  CreditCard,
  Shield,
  BarChart3,
  ArrowRight,
  Activity,
  Zap,
  Globe,
  Clock,
  CheckCircle,
  Menu,
  X,
  Droplets,
} from "lucide-react";

/* ─────────────────── Animated Counter ─────────────────── */
function AnimatedCounter({ end, suffix = "" }: { end: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const duration = 2000;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * end));
            if (progress < 1) requestAnimationFrame(step);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end]);

  return (
    <span ref={ref}>
      {count.toLocaleString("id-ID")}
      {suffix}
    </span>
  );
}

/* ─────────────────── Fade-in on scroll ─────────────────── */
function FadeInSection({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        isVisible
          ? "opacity-100 translate-y-0 blur-none"
          : "opacity-0 translate-y-12 blur-[2px]"
      } ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

/* ═══════════════════ MAIN PAGE ═══════════════════ */
export default function LandingPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div suppressHydrationWarning className="min-h-screen bg-black text-neutral-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      {/* ─────────── NAVBAR ─────────── */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
          scrolled
            ? "bg-black/70 backdrop-blur-xl border-white/10 py-3"
            : "bg-transparent border-transparent py-5"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-10">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-medium tracking-tight text-white">
                  PDAM
                </span>
              </div>
            </div>

            {/* Desktop nav links */}
            <div className="hidden md:flex items-center space-x-1 border border-white/10 bg-white/5 rounded-full px-2 py-1 backdrop-blur-md">
              {[
                { label: "Fitur", href: "#features" },
                { label: "Statistik", href: "#stats" },
                { label: "Akses", href: "#roles" },
              ].map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="px-4 py-1.5 rounded-full text-sm font-medium text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            {/* Desktop CTA */}
            <div className="hidden md:flex items-center space-x-3">
              <Link
                href="/sign-in"
                className="text-sm font-medium text-neutral-300 hover:text-white transition-colors px-4"
              >
                Masuk
              </Link>
              <Link
                href="/sign-up"
                className="px-4 py-2 bg-white text-black rounded-full text-sm font-medium hover:bg-neutral-200 transition-colors"
              >
                Mulai Gratis
              </Link>
            </div>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2 rounded-md text-neutral-400 hover:text-white"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-xl border-b border-white/10 px-4 py-6 mt-0">
              <div className="space-y-4 text-center">
                <a href="#features" className="block text-neutral-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Fitur</a>
                <a href="#stats" className="block text-neutral-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Statistik</a>
                <a href="#roles" className="block text-neutral-300 hover:text-white text-lg" onClick={() => setMobileMenuOpen(false)}>Akses</a>
                <div className="w-full h-px bg-white/10 my-4" />
                <Link href="/sign-in" className="block text-neutral-300 hover:text-white text-lg">Masuk</Link>
                <Link href="/sign-up" className="block bg-white text-black py-3 rounded-xl text-lg font-medium">Mulai Gratis</Link>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* ─────────── HERO ─────────── */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-600/30 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeInSection delay={0}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-medium text-neutral-300 mb-8 backdrop-blur-md">
              <span className="flex h-2 w-2 rounded-full bg-blue-500 animate-pulse"></span>
              Sistem Manajemen Air Modern
            </div>
          </FadeInSection>
          
          <FadeInSection delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-medium tracking-tighter text-white mb-8 leading-[1.1]">
              Kelola Air Bersih <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-600">
                Lebih Cerdas.
              </span>
            </h1>
          </FadeInSection>
          
          <FadeInSection delay={200}>
            <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto mb-10 tracking-tight">
              Platform digital terpadu untuk pengelolaan PDAM. Dari pencatatan pelanggan, tagihan bulanan, hingga verifikasi pembayaran — semua dalam satu ekosistem presisi.
            </p>
          </FadeInSection>

          <FadeInSection delay={300}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20">
              <Link href="/sign-up" className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-medium transition-all flex items-center justify-center gap-2 text-lg">
                Mulai Sekarang <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/sign-in" className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/10 text-white rounded-full font-medium transition-all flex items-center justify-center gap-2 text-lg">
                Masuk ke Sistem
              </Link>
            </div>
          </FadeInSection>

          {/* Hero Image / Dashboard Mockup UI */}
          <FadeInSection delay={400} className="relative mx-auto max-w-5xl rounded-2xl md:rounded-[32px] border border-white/10 bg-white/5 p-2 md:p-4 backdrop-blur-sm">
            <div className="relative rounded-xl md:rounded-[24px] overflow-hidden border border-white/10 aspect-[16/9] lg:aspect-[21/9] bg-[#0a0a0a] flex flex-col shadow-2xl">
              {/* Header */}
              <div className="h-10 md:h-14 border-b border-white/5 flex items-center px-4 gap-4 bg-white/[0.02]">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                  <div className="w-3 h-3 rounded-full bg-neutral-800" />
                </div>
                <div className="h-4 w-32 md:w-64 bg-neutral-800/50 rounded-md" />
              </div>
              {/* Body */}
              <div className="flex-1 p-4 md:p-8 grid grid-cols-3 gap-4 md:gap-6 bg-gradient-to-br from-neutral-950 to-black">
                {/* Left Column (Charts) */}
                <div className="col-span-3 md:col-span-2 space-y-4 md:space-y-6">
                  <div className="h-32 md:h-48 rounded-xl border border-white/5 bg-white/[0.02] p-4 md:p-6 flex flex-col justify-between relative overflow-hidden">
                    <div className="flex justify-between items-center mb-4 relative z-10">
                      <div>
                        <div className="h-4 w-24 bg-neutral-800 rounded mb-2" />
                        <div className="h-8 w-32 bg-white/10 rounded" />
                      </div>
                      <div className="h-8 w-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                        <div className="w-4 h-4 text-blue-500"><BarChart3 size={16} /></div>
                      </div>
                    </div>
                    {/* Fake Bar Chart */}
                    <div className="flex items-end gap-2 md:gap-4 h-16 md:h-24 relative z-10">
                      {[40, 70, 45, 90, 65, 80, 100].map((h, i) => (
                        <div key={i} className="flex-1 bg-blue-500/10 rounded-t-md relative group">
                          <div 
                            className="absolute bottom-0 left-0 right-0 bg-blue-500 rounded-t-md transition-all duration-1000" 
                            style={{ height: `${h}%` }} 
                          />
                        </div>
                      ))}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-blue-500/10 to-transparent blur-2xl" />
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-6">
                    <div className="h-24 md:h-32 rounded-xl border border-white/5 bg-white/[0.02] p-4 md:p-6">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3 md:mb-4">
                        <Users size={14} className="text-neutral-400" />
                      </div>
                      <div className="h-3 w-16 bg-neutral-800 rounded mb-2" />
                      <div className="h-5 md:h-6 w-20 md:w-24 bg-neutral-700 rounded" />
                    </div>
                    <div className="h-24 md:h-32 rounded-xl border border-white/5 bg-white/[0.02] p-4 md:p-6">
                      <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center mb-3 md:mb-4">
                        <CreditCard size={14} className="text-neutral-400" />
                      </div>
                      <div className="h-3 w-16 bg-neutral-800 rounded mb-2" />
                      <div className="h-5 md:h-6 w-20 md:w-24 bg-neutral-700 rounded" />
                    </div>
                  </div>
                </div>

                {/* Right Column (List/Activity) - Hidden on very small screens */}
                <div className="hidden md:flex col-span-1 flex-col space-y-6">
                  <div className="flex-1 rounded-xl border border-white/5 bg-white/[0.02] p-6 flex flex-col gap-6">
                    <div className="h-4 w-24 bg-neutral-800 rounded" />
                    <div className="flex-1 space-y-6">
                      {[1, 2, 3, 4].map(i => (
                        <div key={i} className="flex items-center gap-4">
                          <div className="w-10 h-10 rounded-full bg-neutral-800/50 flex-shrink-0" />
                          <div className="flex-1 space-y-2">
                            <div className="h-3 w-full bg-neutral-800 rounded" />
                            <div className="h-2 w-2/3 bg-neutral-900 rounded" />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─────────── BENTO GRID FEATURES ─────────── */}
      <section id="features" className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6">
              Satu Platform.<br />Berbagai Solusi.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto tracking-tight">
              Dibangun untuk kecepatan, keamanan, dan kemudahan. Setiap fitur didesain dengan presisi untuk memenuhi kebutuhan manajemen PDAM modern.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
            {/* Bento 1: Large */}
            <FadeInSection delay={0} className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:bg-neutral-900/80 transition-colors group">
              <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                <Activity className="w-32 h-32 text-blue-500" />
              </div>
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
                <BarChart3 className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight">Dashboard Analitik Real-time</h3>
              <p className="text-neutral-400 max-w-md leading-relaxed">
                Pantau pendapatan, tren pemakaian air, dan kinerja administrasi melalui grafik interaktif yang selalu sinkron setiap detiknya.
              </p>
            </FadeInSection>

            {/* Bento 2: Small */}
            <FadeInSection delay={100} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:bg-neutral-900/80 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <Zap className="w-5 h-5 text-neutral-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">Penagihan Cepat</h3>
              <p className="text-neutral-400 leading-relaxed">
                Sistem pencatatan dan pembuatan tagihan bulanan yang berjalan otomatis tanpa hambatan manual.
              </p>
            </FadeInSection>

            {/* Bento 3: Small */}
            <FadeInSection delay={200} className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:bg-neutral-900/80 transition-colors group">
              <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 border border-white/10">
                <CreditCard className="w-5 h-5 text-neutral-300" />
              </div>
              <h3 className="text-xl font-medium text-white mb-3 tracking-tight">Pembayaran Digital</h3>
              <p className="text-neutral-400 leading-relaxed">
                Verifikasi bukti transfer langsung dari pelanggan dengan alur kerja yang mudah dan aman.
              </p>
            </FadeInSection>

            {/* Bento 4: Large */}
            <FadeInSection delay={300} className="md:col-span-2 relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 hover:bg-neutral-900/80 transition-colors group">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-12 h-12 bg-blue-500/10 rounded-full flex items-center justify-center mb-6 relative z-10 border border-blue-500/20">
                <Shield className="w-5 h-5 text-blue-400" />
              </div>
              <h3 className="text-2xl font-medium text-white mb-3 tracking-tight relative z-10">Keamanan Setara Bank</h3>
              <p className="text-neutral-400 max-w-md leading-relaxed relative z-10">
                Data pelanggan dan transaksi dilindungi dengan enkripsi tingkat tinggi. Hak akses antara Admin dan Pelanggan terisolasi secara ketat.
              </p>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─────────── STATS ─────────── */}
      <section id="stats" className="py-24 border-y border-white/5 bg-[#050505]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:divide-x divide-white/10">
            {[
              { value: 1200, suffix: "+", label: "PELANGGAN AKTIF" },
              { value: 99, suffix: "%", label: "UPTIME SISTEM" },
              { value: 50, suffix: "x", label: "LEBIH CEPAT" },
              { value: 24, suffix: "/7", label: "DUKUNGAN ONLINE" },
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="text-center px-4">
                  <div className="text-4xl md:text-5xl lg:text-6xl font-medium text-white mb-3 tracking-tighter">
                    <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-xs md:text-sm text-neutral-500 font-medium tracking-widest uppercase">
                    {stat.label}
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── ROLE CARDS ─────────── */}
      <section id="roles" className="py-32 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter text-white mb-6">
              Akses Sesuai Peran.
            </h2>
            <p className="text-neutral-400 text-lg max-w-2xl mx-auto tracking-tight">
              Dua portal terpisah dalam satu ekosistem. Dirancang khusus untuk memberikan pengalaman terbaik sesuai kebutuhan Anda.
            </p>
          </FadeInSection>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto">
            {/* Admin */}
            <FadeInSection delay={0}>
              <div className="rounded-[2.5rem] border border-white/10 bg-gradient-to-b from-neutral-900 to-black p-10 lg:p-14 hover:border-white/20 transition-all">
                <div className="w-14 h-14 bg-white text-black rounded-full flex items-center justify-center mb-8">
                  <Shield className="w-6 h-6" />
                </div>
                <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Portal Admin</h3>
                <p className="text-neutral-400 mb-10 text-lg leading-relaxed">
                  Kontrol penuh atas operasional PDAM. Kelola data, pantau analitik, dan verifikasi transaksi dari satu command center.
                </p>
                
                <ul className="space-y-4 mb-12">
                  {["Dashboard analitik komprehensif", "Manajemen data master", "Verifikasi tagihan & pembayaran"].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-neutral-300">
                      <div className="w-6 h-6 rounded-full bg-white/10 flex items-center justify-center flex-shrink-0">
                        <CheckCircle className="w-3.5 h-3.5 text-white" />
                      </div>
                      <span className="font-medium tracking-tight">{item}</span>
                    </li>
                  ))}
                </ul>

                <Link href="/sign-in" className="inline-flex items-center justify-center w-full gap-2 bg-white text-black py-4 rounded-xl font-medium hover:bg-neutral-200 transition-colors text-lg">
                  Masuk sebagai Admin
                </Link>
              </div>
            </FadeInSection>

            {/* Customer */}
            <FadeInSection delay={150}>
              <div className="rounded-[2.5rem] border border-blue-500/20 bg-gradient-to-b from-blue-950/40 to-black p-10 lg:p-14 relative overflow-hidden hover:border-blue-500/40 transition-all">
                <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 blur-[80px] rounded-full" />
                
                <div className="relative z-10">
                  <div className="w-14 h-14 bg-blue-600 text-white rounded-full flex items-center justify-center mb-8 shadow-lg shadow-blue-500/20">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-3xl font-medium text-white mb-4 tracking-tight">Portal Pelanggan</h3>
                  <p className="text-blue-100/60 mb-10 text-lg leading-relaxed">
                    Akses transparan untuk memantau penggunaan air, melihat rincian tagihan, dan melakukan pembayaran digital dengan mudah.
                  </p>
                  
                  <ul className="space-y-4 mb-12">
                    {["Cek tagihan real-time", "Upload bukti pembayaran instan", "Riwayat transaksi tersimpan aman"].map((item, i) => (
                      <li key={i} className="flex items-center gap-4 text-neutral-300">
                        <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                          <CheckCircle className="w-3.5 h-3.5 text-blue-400" />
                        </div>
                        <span className="font-medium tracking-tight text-blue-50">{item}</span>
                      </li>
                    ))}
                  </ul>

                  <Link href="/sign-in" className="inline-flex items-center justify-center w-full gap-2 bg-blue-600 text-white py-4 rounded-xl font-medium hover:bg-blue-700 transition-colors shadow-lg shadow-blue-900/20 text-lg">
                    Masuk sebagai Pelanggan
                  </Link>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* ─────────── CTA PROMPT ─────────── */}
      <section className="py-32 relative overflow-hidden border-t border-white/5">
        <div className="absolute inset-0 bg-blue-600/5" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="max-w-4xl mx-auto px-4 text-center relative z-10">
          <FadeInSection>
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-white mb-8 leading-[1.1]">
              Mulai Transformasi<br />Digital Sekarang.
            </h2>
            <p className="text-neutral-400 text-lg max-w-xl mx-auto mb-10">
              Jangan biarkan manajemen manual menghambat pelayanan Anda. Bergabung dan rasakan perbedaannya.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/sign-up" className="w-full sm:w-auto px-8 py-4 bg-white text-black hover:bg-neutral-200 rounded-full font-medium transition-all text-lg">
                Buat Akun Gratis
              </Link>
              <Link href="/sign-in" className="w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white hover:bg-white/5 rounded-full font-medium transition-all text-lg">
                Masuk Sistem
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* ─────────── FOOTER ─────────── */}
      <footer className="border-t border-white/10 bg-black pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <Droplets className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-medium tracking-tight text-white">
                  PDAM
                </span>
              </div>
              <p className="text-neutral-500 text-sm leading-relaxed max-w-sm">
                Sistem informasi manajemen PDAM generasi terbaru. Dibangun untuk kecepatan, keamanan, dan keandalan tingkat tinggi.
              </p>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-6 tracking-tight">Platform</h4>
              <ul className="space-y-4">
                <li><a href="#features" className="text-neutral-500 hover:text-white transition-colors text-sm">Fitur Unggulan</a></li>
                <li><a href="#stats" className="text-neutral-500 hover:text-white transition-colors text-sm">Statistik</a></li>
                <li><a href="#roles" className="text-neutral-500 hover:text-white transition-colors text-sm">Akses Portal</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-medium mb-6 tracking-tight">Perusahaan</h4>
              <ul className="space-y-4">
                <li><Link href="/sign-in" className="text-neutral-500 hover:text-white transition-colors text-sm">Masuk Sistem</Link></li>
                <li><Link href="/sign-up" className="text-neutral-500 hover:text-white transition-colors text-sm">Mulai Gratis</Link></li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-neutral-600 text-sm">
              &copy; {new Date().getFullYear()} PDAM System. Hak Cipta Dilindungi.
            </p>
            <div className="flex items-center gap-4">
              <span className="text-neutral-600 text-sm">Dirancang dengan presisi.</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}