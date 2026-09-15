import React, { useState } from 'react';
import {
  Landmark,
  TrendingUp,
  Award,
  Sparkles,
  ArrowRight,
  Compass,
  AlertCircle,
  CheckCircle2,
  Users,
  Building2,
  ExternalLink,
  ChevronRight,
  ShieldAlert,
  BarChart2,
  ArrowUpRight,
  Info,
  Layers,
  MapPin,
  Sliders,
  Target
} from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG, MODEL_METRICS } from '../data/qrisData';
import { QuadrantCategory, NavTab, RegionData } from '../types';

interface OverviewViewProps {
  onSelectCategory: (cat: QuadrantCategory) => void;
  onSelectRegion: (kabKota: string) => void;
  onNavigateTab: (tab: NavTab) => void;
}

export const OverviewView: React.FC<OverviewViewProps> = ({
  onSelectCategory,
  onSelectRegion,
  onNavigateTab,
}) => {
  const [activeStoryStep, setActiveStoryStep] = useState<number>(0);
  const [hoveredQuadrant, setHoveredQuadrant] = useState<string | null>(null);

  // Exact canonical values mandated by the specification
  const topResidualStatic = [
    { rank: 1, name: 'Surabaya', residualZ: 2.12, prov: 'Jawa Timur', pct: 100 },
    { rank: 2, name: 'Mojokerto', residualZ: 2.07, prov: 'Jawa Timur', pct: 97 },
    { rank: 3, name: 'Kediri', residualZ: 1.87, prov: 'Jawa Timur', pct: 88 },
    { rank: 4, name: 'Sidoarjo', residualZ: 1.23, prov: 'Jawa Timur', pct: 58 },
  ];

  const topUntappedStatic = [
    { rank: 1, name: 'Bangkalan', fundamentalZ: 1.15, prov: 'Jawa Timur', note: 'Kapasitas pariwisata & maritim' },
    { rank: 2, name: 'Kabupaten Kediri', fundamentalZ: 1.15, prov: 'Jawa Timur', note: 'Sentra UMKM & agribisnis' },
    { rank: 3, name: 'Kubu Raya', fundamentalZ: 1.08, prov: 'Kalimantan Barat', note: 'Hub logistik bandara Supadio' },
    { rank: 4, name: 'Jombang', fundamentalZ: 0.97, prov: 'Jawa Timur', note: 'Pusat perdagangan koridor tengah' },
  ];

  const analyticalSteps = [
    { num: '01', title: '59 Wilayah Dianalisis', desc: 'Jawa Timur, Kalbar, dan Kep. Riau' },
    { num: '02', title: 'Model OLS Multivariat', desc: 'R² = 39.4% • F = 3.532 (p = 0.0019)' },
    { num: '03', title: 'Prediksi Potensi QRIS', desc: 'Kapasitas fundamental dihitung' },
    { num: '04', title: 'Gap / Residual Terukur', desc: 'Deviasi aktual vs ekspektasi' },
    { num: '05', title: 'Tipologi 4 Kuadran', desc: 'Segmentasi kebijakan terarah' },
    { num: '06', title: 'Prioritas Kebijakan', desc: 'Akselerasi & mitigasi risiko' },
  ];

  return (
    <div className="space-y-8 pb-10">
      {/* ========================================================
          HERO EXECUTIVE BANNER & ANALYTICAL STORYTELLING PIPELINE
          ======================================================== */}
      <section className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs relative overflow-hidden">
        {/* Subtle decorative background glow in existing palette colors */}
        <div className="absolute -right-20 -top-20 w-80 h-80 rounded-full bg-rose-500/5 blur-3xl pointer-events-none" />
        <div className="absolute -left-20 -bottom-20 w-80 h-80 rounded-full bg-blue-500/5 blur-3xl pointer-events-none" />

        <div className="relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 pb-6 border-b border-slate-100 dark:border-slate-800/80">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 mb-2.5 border border-slate-200/60 dark:border-slate-700/60">
                <span className="w-2 h-2 rounded-full bg-rose-600 animate-pulse" />
                <span>Executive Decision Support Platform</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                QRIS Regional Intelligence Dashboard
              </h2>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
                Analisis Potensi Fundamental, Adopsi Transaksi, dan Prioritas Kebijakan Kabupaten/Kota berbasis estimasi ekonometrika multivariat.
              </p>
            </div>

            <div className="flex items-center gap-3 shrink-0">
              <button
                onClick={() => onNavigateTab('quadrant')}
                className="px-4 py-2.5 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold transition-all shadow-sm flex items-center gap-2 cursor-pointer hover:shadow-rose-950/20 active:scale-95"
              >
                <Compass className="w-4 h-4" />
                <span>Eksplorasi Matriks Kuadran</span>
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="px-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-200 text-xs font-bold transition-all border border-slate-200/70 dark:border-slate-700/70 flex items-center gap-2 cursor-pointer"
              >
                <Sliders className="w-4 h-4 text-rose-500" />
                <span>Policy Simulator</span>
              </button>
            </div>
          </div>

          {/* Analytical Story Pipeline Bar (Level 1 to Level 4) */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3 text-xs font-semibold text-slate-500 dark:text-slate-400">
              <span className="uppercase tracking-wider text-[11px] font-bold text-slate-400">
                Alur Inteligensi Analitik (Decision Engine)
              </span>
              <span className="hidden sm:inline-block font-mono text-[11px] text-slate-400">
                N = 59 Kabupaten/Kota
              </span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2.5">
              {analyticalSteps.map((step, idx) => (
                <div
                  key={step.num}
                  className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-700/60 transition-all hover:bg-white dark:hover:bg-slate-800"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                      STEP {step.num}
                    </span>
                    {idx < 5 && (
                      <ArrowRight className="w-3 h-3 text-slate-400 hidden lg:block opacity-60" />
                    )}
                  </div>
                  <div className="text-xs font-bold text-slate-800 dark:text-slate-200 tracking-tight leading-snug">
                    {step.title}
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5 truncate">
                    {step.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          LEVEL 1 — EXECUTIVE HIGH-LEVEL METRICS (4 Large Cards)
          ======================================================== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Metrik Eksekutif & Validasi Model
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Parameter utama estimasi ekonometrika Ordinary Least Squares (OLS)
            </p>
          </div>
          <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
            Signifikansi α = 0.05
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* KPI 1: Cakupan Wilayah */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-slate-300 dark:hover:border-slate-700 transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span className="tracking-tight">Cakupan Wilayah</span>
              <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-slate-600 dark:text-slate-300 group-hover:scale-105 transition-transform">
                <Building2 className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
              59 Wilayah
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="font-bold text-slate-700 dark:text-slate-300">3 Provinsi</span>
              <span className="text-slate-400">•</span>
              <span className="truncate">Jatim (38), Kalbar (14), Kepri (7)</span>
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-1 rounded-full bg-slate-300 dark:bg-slate-700" />
          </div>

          {/* KPI 2: Koefisien Determinasi (R²) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-indigo-300 dark:hover:border-indigo-800 transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span className="tracking-tight">Koefisien Determinasi (R²)</span>
              <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400 group-hover:scale-105 transition-transform">
                <TrendingUp className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 tracking-tight font-mono">
              39.4%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span>Adjusted R²:</span>
              <span className="font-bold font-mono text-slate-800 dark:text-slate-200">28.2%</span>
              <span className="text-slate-400">•</span>
              <span className="text-slate-500 text-[11px]">Goodness of Fit</span>
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-1 rounded-full bg-indigo-500" />
          </div>

          {/* KPI 3: Uji Signifikansi Simultan (F) */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-emerald-300 dark:hover:border-emerald-800 transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span className="tracking-tight">Uji Signifikansi Simultan</span>
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 flex items-center justify-center text-emerald-600 dark:text-emerald-400 group-hover:scale-105 transition-transform">
                <Award className="w-4 h-4" />
              </div>
            </div>
            <div className="text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight font-mono">
              F = 3.532
            </div>
            <div className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold mt-2 flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Signifikan Simultan (p = 0.0019)</span>
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-1 rounded-full bg-emerald-500" />
          </div>

          {/* KPI 4: Faktor Penentu Utama */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs hover:border-rose-300 dark:hover:border-rose-800 transition-all group relative overflow-hidden">
            <div className="flex items-center justify-between text-slate-400 text-xs font-semibold mb-2">
              <span className="tracking-tight">Faktor Penentu Utama</span>
              <div className="w-8 h-8 rounded-xl bg-rose-50 dark:bg-rose-950/60 flex items-center justify-center text-rose-600 dark:text-rose-400 group-hover:scale-105 transition-transform">
                <Users className="w-4 h-4" />
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-extrabold text-rose-600 dark:text-rose-400 tracking-tight truncate leading-tight">
              Total Wisatawan
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 mt-2 flex items-center gap-1.5">
              <span className="font-mono font-bold text-slate-700 dark:text-slate-300">β = +0.796</span>
              <span className="text-slate-400">•</span>
              <span className="text-emerald-600 dark:text-emerald-400 font-medium text-[11px]">(t = 4.00, p &lt; 0.001)</span>
            </div>
            <div className="absolute bottom-0 left-6 right-6 h-1 rounded-full bg-rose-500" />
          </div>
        </div>
      </section>

      {/* ========================================================
          LEVEL 2 — QUADRANT CLASSIFICATION (4 Large Elegant Cards)
          ======================================================== */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Klasifikasi Tipologi 4 Kuadran Regional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Segmentasi wilayah berdasarkan perbandingan potensi fundamental vs realisasi transaksi riil
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('quadrant')}
            className="text-xs font-semibold text-rose-600 dark:text-rose-400 hover:underline flex items-center gap-1"
          >
            <span>Buka Scatter Plot</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* QUADRAN I */}
          <div
            onClick={() => onSelectCategory('Maju & Sesuai Potensi')}
            onMouseEnter={() => setHoveredQuadrant('Q1')}
            onMouseLeave={() => setHoveredQuadrant(null)}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-emerald-200/90 dark:border-emerald-800/70 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-900/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  QUADRAN I
                </span>
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-emerald-100 dark:bg-emerald-900/60 text-emerald-800 dark:text-emerald-300">
                  12 Wilayah
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                Maju & Sesuai Potensi
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Fundamental tinggi, realisasi transaksi QRIS agresif di atas model.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Porsi: 20.3%</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Filter Kuadran</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* QUADRAN II */}
          <div
            onClick={() => onSelectCategory('Over Develop')}
            onMouseEnter={() => setHoveredQuadrant('Q2')}
            onMouseLeave={() => setHoveredQuadrant(null)}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-amber-200/90 dark:border-amber-800/70 hover:border-amber-500 hover:shadow-lg hover:shadow-amber-900/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-amber-50 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800">
                  QUADRAN II
                </span>
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300">
                  18 Wilayah
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors">
                Over Develop
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Adopsi transaksi melonjak tinggi di atas estimasi fundamental.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Porsi: 30.5%</span>
              <span className="font-semibold text-amber-600 dark:text-amber-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Filter Kuadran</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* QUADRAN IV */}
          <div
            onClick={() => onSelectCategory('Potensi Belum Tergarap')}
            onMouseEnter={() => setHoveredQuadrant('Q4')}
            onMouseLeave={() => setHoveredQuadrant(null)}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-blue-200/90 dark:border-blue-800/70 hover:border-blue-500 hover:shadow-lg hover:shadow-blue-900/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  QUADRAN IV
                </span>
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-800 dark:text-blue-300">
                  17 Wilayah
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                Potensi Belum Tergarap
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Fundamental kuat, namun transaksi belum mencapai potensi prediksi.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Porsi: 28.8%</span>
              <span className="font-semibold text-blue-600 dark:text-blue-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Filter Kuadran</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>

          {/* QUADRAN III */}
          <div
            onClick={() => onSelectCategory('Under Develop')}
            onMouseEnter={() => setHoveredQuadrant('Q3')}
            onMouseLeave={() => setHoveredQuadrant(null)}
            className="p-5 rounded-3xl bg-white dark:bg-slate-900 border-2 border-rose-200/90 dark:border-rose-800/70 hover:border-rose-500 hover:shadow-lg hover:shadow-rose-900/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-400 border border-rose-200 dark:border-rose-800">
                  QUADRAN III
                </span>
                <span className="text-xs font-bold font-mono px-2.5 py-1 rounded-full bg-rose-100 dark:bg-rose-900/60 text-rose-800 dark:text-rose-300">
                  12 Wilayah
                </span>
              </div>
              <h4 className="text-base font-bold text-slate-900 dark:text-white group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors">
                Under Develop
              </h4>
              <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 leading-relaxed">
                Kapasitas ekonomi rendah dan adopsi QRIS masih tertinggal.
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-medium text-[11px]">Porsi: 20.3%</span>
              <span className="font-semibold text-rose-600 dark:text-rose-400 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                <span>Filter Kuadran</span>
                <ChevronRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================
          REGIONAL DISTRIBUTION BAR (Proporsi Sebaran Kuadran Regional)
          ======================================================== */}
      <section className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white tracking-tight">
              Proporsi Sebaran Kuadran Regional
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Distribusi persentase 59 kabupaten/kota ke dalam 4 tipologi kebijakan
            </p>
          </div>
          <span className="text-xs font-mono font-bold text-slate-500 dark:text-slate-400">
            Total: 59 Wilayah (100%)
          </span>
        </div>

        {/* Executive-Level Segmented Progress Bar */}
        <div className="h-7 w-full rounded-2xl overflow-hidden flex bg-slate-100 dark:bg-slate-800 p-1 shadow-inner gap-1">
          {/* Over Develop: 30.5% */}
          <div
            style={{ width: '30.5%' }}
            onClick={() => onSelectCategory('Over Develop')}
            className="bg-amber-500 hover:bg-amber-600 h-full rounded-xl flex items-center justify-center text-[11px] font-bold text-white transition-all cursor-pointer shadow-xs"
            title="Over Develop: 18 wilayah (30.5%)"
          >
            30.5%
          </div>

          {/* Belum Tergarap: 28.8% */}
          <div
            style={{ width: '28.8%' }}
            onClick={() => onSelectCategory('Potensi Belum Tergarap')}
            className="bg-blue-500 hover:bg-blue-600 h-full rounded-xl flex items-center justify-center text-[11px] font-bold text-white transition-all cursor-pointer shadow-xs"
            title="Belum Tergarap: 17 wilayah (28.8%)"
          >
            28.8%
          </div>

          {/* Maju & Sesuai: 20.3% */}
          <div
            style={{ width: '20.3%' }}
            onClick={() => onSelectCategory('Maju & Sesuai Potensi')}
            className="bg-emerald-500 hover:bg-emerald-600 h-full rounded-xl flex items-center justify-center text-[11px] font-bold text-white transition-all cursor-pointer shadow-xs"
            title="Maju & Sesuai: 12 wilayah (20.3%)"
          >
            20.3%
          </div>

          {/* Under Develop: 20.3% */}
          <div
            style={{ width: '20.3%' }}
            onClick={() => onSelectCategory('Under Develop')}
            className="bg-rose-500 hover:bg-rose-600 h-full rounded-xl flex items-center justify-center text-[11px] font-bold text-white transition-all cursor-pointer shadow-xs"
            title="Under Develop: 12 wilayah (20.3%)"
          >
            20.3%
          </div>
        </div>

        {/* Legend pills */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4 pt-4 border-t border-slate-100 dark:border-slate-800/80 text-xs">
          <div
            onClick={() => onSelectCategory('Over Develop')}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/60 dark:border-amber-900/40 cursor-pointer hover:bg-amber-100/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Over Develop</span>
            </div>
            <span className="font-mono font-bold text-amber-700 dark:text-amber-400">18 (30.5%)</span>
          </div>

          <div
            onClick={() => onSelectCategory('Potensi Belum Tergarap')}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/60 dark:border-blue-900/40 cursor-pointer hover:bg-blue-100/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-blue-500 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Belum Tergarap</span>
            </div>
            <span className="font-mono font-bold text-blue-700 dark:text-blue-400">17 (28.8%)</span>
          </div>

          <div
            onClick={() => onSelectCategory('Maju & Sesuai Potensi')}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/60 dark:border-emerald-900/40 cursor-pointer hover:bg-emerald-100/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Maju & Sesuai</span>
            </div>
            <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">12 (20.3%)</span>
          </div>

          <div
            onClick={() => onSelectCategory('Under Develop')}
            className="flex items-center justify-between p-2.5 rounded-2xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 cursor-pointer hover:bg-rose-100/60 transition-colors"
          >
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-rose-500 shrink-0" />
              <span className="font-semibold text-slate-800 dark:text-slate-200">Under Develop</span>
            </div>
            <span className="font-mono font-bold text-rose-700 dark:text-rose-400">12 (20.3%)</span>
          </div>
        </div>
      </section>

      {/* ========================================================
          LEVEL 3 & 4 — REGIONAL RANKINGS & AUTOMATIC INSIGHTS
          ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT 7 COLS: TOP REALISASI QRIS & PRIORITAS BELUM TERGARAP */}
        <div className="lg:col-span-7 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* TOP REALISASI QRIS (RESIDUAL Z) */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-emerald-100 dark:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 flex items-center justify-center font-bold text-xs">
                      <TrendingUp className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      TOP REALISASI QRIS (RESIDUAL Z)
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold border border-emerald-200/80 dark:border-emerald-800/80">
                    Over-Performer
                  </span>
                </div>

                <div className="space-y-2.5">
                  {topResidualStatic.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => onSelectRegion(item.name)}
                      className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-emerald-50/60 dark:hover:bg-emerald-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-emerald-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-1.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono font-bold text-[10px]">
                            {item.rank}
                          </span>
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-extrabold text-emerald-600 dark:text-emerald-400 text-xs">
                          +{item.residualZ.toFixed(2)}
                        </span>
                      </div>
                      <div className="w-full bg-slate-200/70 dark:bg-slate-700/70 h-1.5 rounded-full overflow-hidden">
                        <div
                          style={{ width: `${item.pct}%` }}
                          className="bg-emerald-500 h-full rounded-full"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>Residual Z positif = melampaui estimasi OLS</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-semibold">Klik wilayah untuk profil</span>
              </div>
            </div>

            {/* PRIORITAS BELUM TERGARAP */}
            <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-xl bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs">
                      <Target className="w-4 h-4" />
                    </div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                      PRIORITAS BELUM TERGARAP
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-400 font-bold border border-blue-200/80 dark:border-blue-800/80">
                    Intervensi
                  </span>
                </div>

                <div className="space-y-2.5">
                  {topUntappedStatic.map((item) => (
                    <div
                      key={item.name}
                      onClick={() => onSelectRegion(item.name)}
                      className="p-3 rounded-2xl bg-slate-50/80 dark:bg-slate-800/50 hover:bg-blue-50/60 dark:hover:bg-blue-950/40 border border-slate-200/60 dark:border-slate-700/60 hover:border-blue-300 transition-all cursor-pointer group"
                    >
                      <div className="flex items-center justify-between mb-0.5">
                        <div className="flex items-center gap-2.5">
                          <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 flex items-center justify-center font-mono font-bold text-[10px]">
                            {item.rank}
                          </span>
                          <span className="font-bold text-xs text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            {item.name}
                          </span>
                        </div>
                        <span className="font-mono font-extrabold text-blue-600 dark:text-blue-400 text-xs">
                          F: +{item.fundamentalZ.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 pl-7 truncate">
                        {item.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center justify-between">
                <span>F tinggi = kapasitas ekonomi besar</span>
                <span className="text-blue-600 dark:text-blue-400 font-semibold">Target akselerasi onboarding</span>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT 5 COLS: TEMUAN & INSIGHT OTOMATIS (AI / Intelligence Findings Panel) */}
        <div className="lg:col-span-5 space-y-4">
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-xs">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-2xl bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400 flex items-center justify-center">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white tracking-tight">
                    Temuan &amp; Insight Otomatis
                  </h3>
                  <span className="text-[10px] text-slate-400 font-medium">
                    AI Econometric Intelligence Engine
                  </span>
                </div>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                3 Sinyal Utama
              </span>
            </div>

            <div className="space-y-3.5">
              {/* Insight 1: 17 Wilayah Belum Tergarap */}
              <div className="p-4 rounded-2xl bg-blue-50/70 dark:bg-blue-950/30 border border-blue-200/80 dark:border-blue-900/60 transition-all hover:border-blue-300">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-200/70 dark:bg-blue-900/80 text-blue-800 dark:text-blue-300">
                    PRIORITAS INTERVENSI
                  </span>
                  <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                    High Potential Gap
                  </span>
                </div>
                <h4 className="text-xs font-bold text-blue-950 dark:text-blue-100 tracking-tight uppercase mb-1">
                  17 WILAYAH BELUM TERGARAP
                </h4>
                <p className="text-xs text-blue-900/80 dark:text-blue-200/80 leading-relaxed">
                  Mempunyai fundamental ekonomi dan pariwisata tinggi (F ≥ 0), namun realisasi transaksi QRIS aktual masih di bawah ekspektasi model OLS.
                </p>
              </div>

              {/* Insight 2: Pariwisata Sebagai Pendorong Utama */}
              <div className="p-4 rounded-2xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200/80 dark:border-rose-900/60 transition-all hover:border-rose-300">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-rose-200/70 dark:bg-rose-900/80 text-rose-800 dark:text-rose-300">
                    FAKTOR DETERMINAN
                  </span>
                  <span className="text-[10px] font-mono font-bold text-rose-600 dark:text-rose-400">
                    p &lt; 0.001 ***
                  </span>
                </div>
                <h4 className="text-xs font-bold text-rose-950 dark:text-rose-100 tracking-tight uppercase mb-1">
                  PARIWISATA SEBAGAI PENDORONG UTAMA
                </h4>
                <p className="text-xs text-rose-900/80 dark:text-rose-200/80 leading-relaxed">
                  Total Wisatawan merupakan variabel paling signifikan (t = 3.996, p &lt; 0.001). Setiap kenaikan 1% wisatawan berasosiasi dengan +0.796% transaksi QRIS.
                </p>
              </div>

              {/* Insight 3: 18 Wilayah Over-Develop */}
              <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60 transition-all hover:border-amber-300">
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider px-2 py-0.5 rounded-full bg-amber-200/70 dark:bg-amber-900/80 text-amber-800 dark:text-amber-300">
                    MITIGASI RISIKO
                  </span>
                  <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                    Capacity Alert
                  </span>
                </div>
                <h4 className="text-xs font-bold text-amber-950 dark:text-amber-100 tracking-tight uppercase mb-1">
                  18 WILAYAH OVER-DEVELOP
                </h4>
                <p className="text-xs text-amber-900/80 dark:text-amber-200/80 leading-relaxed">
                  Adopsi transaksi melonjak tinggi di atas estimasi fundamental. Fokus intervensi: edukasi literasi keuangan dan mitigasi QRIS palsu.
                </p>
              </div>
            </div>
          </div>

          {/* Aggregate Policy CTA Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-900 to-indigo-950 text-white shadow-lg border border-slate-800">
            <div className="flex items-center gap-2 mb-2 text-rose-400 text-xs font-bold">
              <Landmark className="w-4 h-4" />
              <span>Rekomendasi Kebijakan Terpadu</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              Penyusunan target tahunan QRIS Bank Indonesia &amp; Pemerintah Daerah sebaiknya menggunakan pendekatan diferensiasi berbasis kuadran untuk mengoptimalkan wilayah potensial dan menjaga stabilitas ekosistem.
            </p>
            <div className="flex items-center gap-2.5">
              <button
                onClick={() => onNavigateTab('playbook')}
                className="flex-1 py-2.5 px-4 rounded-2xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm active:scale-95"
              >
                <span>Buka Policy Playbook</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onNavigateTab('simulator')}
                className="py-2.5 px-4 rounded-2xl bg-white/10 hover:bg-white/15 text-white text-xs font-bold transition-all border border-white/10 cursor-pointer"
              >
                <span>Simulasi What-If</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
