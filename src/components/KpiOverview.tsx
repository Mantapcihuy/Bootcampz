import React from 'react';
import { TrendingUp, Users, Compass, CheckCircle2, AlertCircle, ArrowUpRight, Award, HelpCircle } from 'lucide-react';
import { MODEL_METRICS, REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { QuadrantCategory } from '../types';

interface KpiOverviewProps {
  onSelectCategory: (cat: QuadrantCategory) => void;
  onSelectRegion: (kabKota: string) => void;
  onNavigateTab: (tab: 'quadrant' | 'regression' | 'diagnostics' | 'table' | 'policy') => void;
}

export const KpiOverview: React.FC<KpiOverviewProps> = ({ onSelectCategory, onSelectRegion, onNavigateTab }) => {
  // Counts by province
  const provCounts = REGIONS_DATA.reduce((acc, curr) => {
    acc[curr.provinsi] = (acc[curr.provinsi] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Top regions
  const topResidual = [...REGIONS_DATA].sort((a, b) => b.residualZ - a.residualZ).slice(0, 3);
  const topFundamental = [...REGIONS_DATA].sort((a, b) => b.fundamentalZ - a.fundamentalZ).slice(0, 3);

  return (
    <div id="kpi-overview-section" className="space-y-6">
      {/* Welcome Banner & Summary */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 md:p-8 shadow-lg relative overflow-hidden">
        <div className="absolute right-0 top-0 bottom-0 w-1/3 bg-gradient-to-l from-rose-500/10 to-transparent pointer-events-none" />
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-500/20 border border-rose-400/30 text-rose-300 text-xs font-semibold mb-3">
            <TrendingUp className="w-3.5 h-3.5" />
            <span>Digital Payment Econometric Model • Bank Indonesia Benchmark</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold tracking-tight mb-2">
            Pemetaan Kuadran & Daya Saing Transaksi QRIS Wilayah
          </h2>
          <p className="text-slate-300 text-sm md:text-base leading-relaxed mb-6">
            Hasil estimasi ekonometrika Ordinary Least Squares (OLS) terhadap 59 Kabupaten/Kota di 3 Provinsi strategis (Jawa Timur, Kepulauan Riau, dan Kalimantan Barat). Mengelompokkan daerah ke dalam 4 kuadran analitis berbasis potensi fundamental ekonomi vs deviasi aktual residual.
          </p>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <button
              id="btn-explore-quadrant"
              onClick={() => onNavigateTab('quadrant')}
              className="px-4 py-2.5 bg-rose-600 hover:bg-rose-500 text-white font-medium rounded-lg shadow-md transition-all flex items-center gap-2"
            >
              <Compass className="w-4 h-4" />
              <span>Buka Matriks Kuadran</span>
            </button>
            <button
              id="btn-explore-regression"
              onClick={() => onNavigateTab('regression')}
              className="px-4 py-2.5 bg-slate-700/80 hover:bg-slate-700 text-slate-100 font-medium rounded-lg border border-slate-600 transition-all flex items-center gap-2"
            >
              <TrendingUp className="w-4 h-4" />
              <span>Lihat Hasil Regresi & Simulasi</span>
            </button>
            <button
              id="btn-explore-policy"
              onClick={() => onNavigateTab('policy')}
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-medium rounded-lg border border-slate-700 transition-all"
            >
              <span>Rekomendasi Kebijakan</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Card 1: Sample Wilayah */}
        <div id="kpi-card-sample" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Total Observasi Wilayah</span>
            <span className="p-2 rounded-lg bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">59</span>
            <span className="text-xs font-semibold text-slate-500">Kabupaten / Kota</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex justify-between">
              <span>Jawa Timur:</span>
              <span className="font-semibold">{provCounts['Jawa Timur'] || 38} Kab/Kota</span>
            </div>
            <div className="flex justify-between">
              <span>Kalimantan Barat:</span>
              <span className="font-semibold">{provCounts['Kalimantan Barat'] || 14} Kab/Kota</span>
            </div>
            <div className="flex justify-between">
              <span>Kep. Riau:</span>
              <span className="font-semibold">{provCounts['Kep. Riau'] || 7} Kab/Kota</span>
            </div>
          </div>
        </div>

        {/* Card 2: R-Squared */}
        <div id="kpi-card-rsquared" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Goodness-of-Fit (R²)</span>
            <span className="p-2 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-slate-900 dark:text-white">{(MODEL_METRICS.rSquared * 100).toFixed(1)}%</span>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">Adj R² {(MODEL_METRICS.adjRSquared * 100).toFixed(1)}%</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex justify-between">
              <span>Uji F Simultan:</span>
              <span className="font-semibold text-emerald-600">{MODEL_METRICS.fStat.toFixed(3)} (p &lt; 0.001)</span>
            </div>
            <div className="flex justify-between">
              <span>Status Model:</span>
              <span className="font-semibold text-slate-800 dark:text-slate-100">Valid & Signifikan (1%)</span>
            </div>
            <div className="flex justify-between">
              <span>Durbin-Watson:</span>
              <span className="font-semibold">{MODEL_METRICS.durbinWatson}</span>
            </div>
          </div>
        </div>

        {/* Card 3: Key Driver */}
        <div id="kpi-card-driver" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Determinan Utama Signifikan</span>
            <span className="p-2 rounded-lg bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400">
              <Award className="w-4 h-4" />
            </span>
          </div>
          <div className="mb-2">
            <span className="text-base font-bold text-slate-900 dark:text-white block leading-tight">Usia Produktif &amp; Wisatawan</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-2xl font-extrabold text-rose-600 dark:text-rose-400">+0.798</span>
              <span className="text-xs font-bold text-emerald-600">t = 5.01 (p &lt; 0.001)</span>
            </div>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <p className="line-clamp-2">
              Kenaikan 1% penduduk usia produktif dan wisatawan mendorong pertumbuhan transaksi QRIS secara signifikan.
            </p>
          </div>
        </div>

        {/* Card 4: Asumsi Klasik */}
        <div id="kpi-card-diagnostic" className="bg-white dark:bg-slate-800 p-5 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm hover:border-slate-300 transition-all">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Uji Asumsi Ekonometrika</span>
            <span className="p-2 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
              <CheckCircle2 className="w-4 h-4" />
            </span>
          </div>
          <div className="flex items-baseline gap-2 mb-2">
            <span className="text-3xl font-extrabold text-emerald-600 dark:text-emerald-400">LOLOS</span>
            <span className="text-xs font-semibold text-slate-500">Semua Uji Asumsi</span>
          </div>
          <div className="text-xs text-slate-600 dark:text-slate-300 space-y-1 pt-2 border-t border-slate-100 dark:border-slate-700/50">
            <div className="flex justify-between">
              <span>Normalitas (JB / SW):</span>
              <span className="font-semibold text-emerald-600">p = {MODEL_METRICS.jarqueBeraP} (Normal)</span>
            </div>
            <div className="flex justify-between">
              <span>Autokorelasi (DW):</span>
              <span className="font-semibold text-emerald-600">DW = {MODEL_METRICS.durbinWatson} (Bebas)</span>
            </div>
            <div className="flex justify-between">
              <span>Homoskedastisitas (BP):</span>
              <span className="font-semibold text-emerald-600">p = {MODEL_METRICS.breuschPaganP} (Lolos)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 4 Quadrants Summary Interactive Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Klasifikasi 4 Kuadran Wilayah Transaksi QRIS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Klik salah satu kuadran untuk memfilter dan menginspeksi daftar Kabupaten/Kota terkait.
            </p>
          </div>
          <button
            onClick={() => onNavigateTab('quadrant')}
            className="text-xs font-medium text-rose-600 dark:text-rose-400 hover:underline inline-flex items-center gap-1"
          >
            <span>Buka Scatter Plot Interaktif</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {(Object.keys(QUADRANT_CONFIG) as QuadrantCategory[]).map((catKey) => {
            const conf = QUADRANT_CONFIG[catKey];
            const regionsInCat = REGIONS_DATA.filter((r) => r.kategori === catKey);

            return (
              <div
                key={catKey}
                id={`quad-summary-card-${catKey.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => {
                  onSelectCategory(catKey);
                  onNavigateTab('quadrant');
                }}
                className="group cursor-pointer bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700 hover:shadow-md hover:border-slate-400 dark:hover:border-slate-600 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full border ${conf.badgeBg} ${conf.badgeBorder}`}>
                      {conf.quadrantCode.split(' ')[0]} {conf.quadrantCode.split(' ')[1]}
                    </span>
                    <span className="text-lg font-bold text-slate-900 dark:text-white">
                      {conf.count} <span className="text-xs font-normal text-slate-500">wilayah</span>
                    </span>
                  </div>

                  <h4 className="font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-rose-600 dark:group-hover:text-rose-400 transition-colors mb-1.5">
                    {conf.name}
                  </h4>

                  <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-2 mb-3">
                    {conf.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 dark:border-slate-700/50">
                  <span className="text-[11px] font-medium text-slate-400 block mb-1.5">Contoh Daerah:</span>
                  <div className="flex flex-wrap gap-1">
                    {regionsInCat.slice(0, 3).map((r) => (
                      <span
                        key={r.kabupatenKota}
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectRegion(r.kabupatenKota);
                        }}
                        className="text-[11px] px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-700/60 hover:bg-rose-100 dark:hover:bg-rose-950/80 text-slate-700 dark:text-slate-200 transition-colors"
                      >
                        {r.kabupatenKota}
                      </span>
                    ))}
                    {regionsInCat.length > 3 && (
                      <span className="text-[10px] text-slate-400 self-center">
                        +{regionsInCat.length - 3} lagi
                      </span>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Highlights & Contextual Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Top Performer Highlights */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <Award className="w-4 h-4 text-emerald-600" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Top 3 Fundamental Tertinggi</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Daerah dengan kapasitas makro ekonomi, pariwisata, dan daya beli tertinggi.
          </p>
          <div className="space-y-2.5">
            {topFundamental.map((r, idx) => (
              <div
                key={r.kabupatenKota}
                onClick={() => onSelectRegion(r.kabupatenKota)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100 block">{r.kabupatenKota}</span>
                    <span className="text-[10px] text-slate-400">{r.provinsi}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">+{r.fundamentalZ.toFixed(2)} σ</span>
                  <span className="block text-[10px] text-slate-400">Z-Score Prediksi</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Residual (Over Performers) */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-5 border border-slate-200 dark:border-slate-700">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp className="w-4 h-4 text-cyan-600" />
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Top 3 Deviasi Positif (Residual Tertinggi)</h4>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mb-3">
            Daerah dengan realisasi transaksi QRIS melompat paling jauh di atas prediksi model.
          </p>
          <div className="space-y-2.5">
            {topResidual.map((r, idx) => (
              <div
                key={r.kabupatenKota}
                onClick={() => onSelectRegion(r.kabupatenKota)}
                className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-700/40 hover:bg-slate-100 dark:hover:bg-slate-700 cursor-pointer transition-colors text-xs"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-5 h-5 rounded-full bg-slate-200 dark:bg-slate-600 flex items-center justify-center font-bold text-[10px]">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-100 block">{r.kabupatenKota}</span>
                    <span className="text-[10px] text-slate-400">{r.provinsi}</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">+{r.residualZ.toFixed(2)} σ</span>
                  <span className="block text-[10px] text-slate-400">Z-Score Residual</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Metodologi & Petunjuk Interpretasi */}
        <div className="bg-slate-50 dark:bg-slate-800/60 rounded-xl p-5 border border-slate-200 dark:border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2 text-slate-700 dark:text-slate-200">
              <HelpCircle className="w-4 h-4 text-indigo-500" />
              <h4 className="font-bold text-sm">Metodologi & Cara Membaca</h4>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-3">
              Variabel target <strong>Nominal Transaksi QRIS</strong> ditransformasikan ke bentuk logaritma natural (<strong>Ln</strong>) karena skewness awal tinggi (7.22) untuk menjamin estimasi OLS tidak bias (Best Linear Unbiased Estimator).
            </p>
            <ul className="text-xs text-slate-600 dark:text-slate-300 space-y-1.5 list-disc pl-4 mb-4">
              <li><strong>Sumbu X (Fundamental Z):</strong> Potensi kapasitas daerah yang diestimasi model dari 9 variabel penjelas.</li>
              <li><strong>Sumbu Y (Residual Z):</strong> Selisih transaksi riil dibandingkan prediksi model (kelebihan/kekurangan adopsi).</li>
            </ul>
          </div>

          <button
            onClick={() => onNavigateTab('diagnostics')}
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline inline-flex items-center gap-1 self-start"
          >
            <span>Pelajari Uji Diagnostik Ekonometrika</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
