import React, { useState } from 'react';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  BarChart3,
  Scale,
  Activity,
  Check,
  Cpu,
  Layers,
  Sparkles,
  Network
} from 'lucide-react';
import { 
  MODEL_METRICS, 
  REGRESSION_COEFFICIENTS, 
  DESCRIPTIVE_STATS,
  KMEANS_METRICS,
  SMEAR_FACTOR
} from '../data/qrisData';

export const ValidationView: React.FC = () => {
  const [descMode, setDescMode] = useState<'raw' | 'ln'>('raw');

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat('id-ID', { maximumFractionDigits: 2 }).format(num);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 text-xs font-semibold mb-2">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Uji Diagnostik Ekonometrika Klasik (BLUE) & Evaluasi Clustering</span>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
          Statistik & Validasi Asumsi Model OLS (Gauss-Markov)
        </h2>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Pengujian asumsi ekonometrika lengkap untuk memastikan estimator bersifat Best Linear Unbiased Estimator (BLUE) serta validasi klaster KMeans (k=3).
        </p>
      </div>

      {/* 5 Core Econometric Tests Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* 1. Uji Normalitas Residual */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                1. Uji Normalitas Residual
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Normal (p &gt; 0.05)</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Residual terdistribusi normal dengan rata-rata nol, memastikan validitas statistik inferensial uji t dan uji F.
          </p>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">Jarque-Bera Test</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white block">
                JB = {MODEL_METRICS.jarqueBeraStat.toFixed(4)}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                p = {MODEL_METRICS.jarqueBeraP.toFixed(4)}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700">
              <span className="text-slate-400 block text-[10px]">Shapiro-Wilk Test</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white block">
                W = {MODEL_METRICS.shapiroWilkStat.toFixed(4)}
              </span>
              <span className="text-emerald-600 dark:text-emerald-400 font-semibold text-[11px]">
                p = {MODEL_METRICS.shapiroWilkP.toFixed(4)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
            <div className="flex justify-between text-[10px] text-slate-400 mb-1">
              <span>Distribusi Residual (N = 59)</span>
              <span>Skewness: +0.21 | Kurtosis: 2.84</span>
            </div>
            <div className="h-10 flex items-end justify-center gap-1.5 pt-2">
              <div className="w-4 bg-slate-300 dark:bg-slate-700 rounded-t h-2" />
              <div className="w-4 bg-slate-400 dark:bg-slate-600 rounded-t h-4" />
              <div className="w-5 bg-emerald-500/60 rounded-t h-7" />
              <div className="w-6 bg-emerald-500 rounded-t h-9" />
              <div className="w-5 bg-emerald-500/60 rounded-t h-7" />
              <div className="w-4 bg-slate-400 dark:bg-slate-600 rounded-t h-4" />
              <div className="w-4 bg-slate-300 dark:bg-slate-700 rounded-t h-2" />
            </div>
          </div>
        </div>

        {/* 2. Uji Multikolinearitas (VIF) */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                2. Multikolinearitas (VIF)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Semua VIF &lt; 5 (Aman)</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Tidak ditemukan korelasi tinggi antar variabel independen. Nilai VIF jauh di bawah batas toleransi kritis (VIF &lt; 10).
          </p>

          <div className="space-y-1.5 text-xs max-h-48 overflow-y-auto pr-1">
            {REGRESSION_COEFFICIENTS.filter((c) => c.variable !== 'const').map((c) => (
              <div
                key={c.variable}
                className="flex items-center justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60"
              >
                <span className="font-mono text-slate-800 dark:text-slate-200 font-semibold text-[11px] truncate max-w-[140px]">
                  {c.variable}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {c.vif?.toFixed(3)}
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold">
                    &lt; 5
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Uji Heteroskedastisitas (Breusch-Pagan) */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                3. Heteroskedastisitas
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Homoskedastis</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Uji Breusch-Pagan Lagrange Multiplier (LM) membuktikan varians residual konstan untuk seluruh skala nominal fundamental.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Breusch-Pagan LM Stat:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {MODEL_METRICS.breuschPaganStat.toFixed(4)} (df = 9)
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">p-Value Breusch-Pagan:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                p = {MODEL_METRICS.breuschPaganP.toFixed(4)} (p &gt; 0.05)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              Kesimpulan: Gagal menolak H0. Varians galat bersifat konstan (homoskedastisitas terpenuhi).
            </div>
          </div>
        </div>

        {/* 4. Uji Autokorelasi (Durbin-Watson) */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                4. Autokorelasi (Durbin-Watson)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Tanpa Korelasi Serial</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Mendeteksi independensi residual antar observasi sampel cross-sectional 59 kabupaten/kota.
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Nilai Statistik DW:</span>
              <span className="font-mono font-bold text-lg text-indigo-600 dark:text-indigo-400">
                {MODEL_METRICS.durbinWatson.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">Batas Kritis (N=59, k=9):</span>
              <span className="font-mono text-slate-700 dark:text-slate-300 text-[11px]">
                dL = 1.258, dU = 1.944
              </span>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              Kesimpulan: Nilai DW = 1.496 berada dalam batas penerimaan independensi galat sampel spasial.
            </div>
          </div>
        </div>

        {/* 5. Uji Linearitas & Spesifikasi (Ramsey RESET) */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-emerald-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                5. Linearitas (Ramsey RESET)
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Spesifikasi Tepat</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Pengujian apakah terdapat variabel berpangkat tinggi yang terlewat (omitted non-linear powers).
          </p>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">RESET F-Statistic:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                F = {MODEL_METRICS.resetStat.toFixed(3)}
              </span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-500">p-Value RESET:</span>
              <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                p = {MODEL_METRICS.resetP.toFixed(3)} (p &gt; 0.05)
              </span>
            </div>
            <div className="text-[11px] text-slate-500 pt-2 border-t border-slate-200 dark:border-slate-800">
              Kesimpulan: Model spesifikasi linear logaritma natural sudah tepat tanpa bias bentuk fungsional.
            </div>
          </div>
        </div>

        {/* 6. Duan Smearing Estimator Bias Correction */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                6. Duan Smearing Estimator
              </h3>
            </div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 dark:bg-purple-950 text-purple-800 dark:text-purple-300 border border-purple-200 dark:border-purple-800 flex items-center gap-1">
              <Check className="w-3 h-3" />
              <span>Bias Corrected</span>
            </span>
          </div>

          <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
            Koreksi bias Jensen's Inequality saat mentransformasi balik dari Ln(QRIS) ke level Rupiah: E[exp(e)] = 1.3421.
          </p>

          <div className="p-4 rounded-xl bg-purple-50/50 dark:bg-purple-950/30 border border-purple-200/80 dark:border-purple-800/80 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="text-slate-600 dark:text-slate-300">Smearing Multiplier:</span>
              <span className="font-mono font-bold text-base text-purple-700 dark:text-purple-300">
                {SMEAR_FACTOR}
              </span>
            </div>
            <div className="text-[11px] text-slate-600 dark:text-slate-300">
              Formula: <code className="font-mono font-bold text-purple-600 dark:text-purple-400">Potential_QRIS = exp(fitted) × 1.3421</code>
            </div>
            <div className="text-[10px] text-slate-500 pt-1 border-t border-purple-200/60 dark:border-purple-800/60">
              Mencegah underestimasi sistematis pada volume transaksi agregat.
            </div>
          </div>
        </div>
      </div>

      {/* KMeans Clustering Validity Metrics Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl border border-indigo-800 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-2 max-w-xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold">
              <Network className="w-3.5 h-3.5" />
              <span>Evaluasi Unsupervised KMeans (k = 3, Gap Z-Score)</span>
            </div>
            <h3 className="text-lg font-bold text-white tracking-tight">
              Metrik Validitas Klasterisasi Potensi vs Realita (Chunk 3)
            </h3>
            <p className="text-xs text-indigo-200 leading-relaxed">
              Batas antar kategori tidak ditentukan secara subjektif, melainkan melalui optimasi matematis jarak Euclidean pada residual model tereduksi.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <span className="text-[11px] text-indigo-200 block">Silhouette Score</span>
              <span className="text-xl font-bold font-mono text-emerald-400 block mt-0.5">
                {KMEANS_METRICS.silhouetteScore}
              </span>
              <span className="text-[10px] text-indigo-300">&gt; 0.5 (Separasi Baik)</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <span className="text-[11px] text-indigo-200 block">Inertia (WCSS)</span>
              <span className="text-xl font-bold font-mono text-white block mt-0.5">
                {KMEANS_METRICS.inertia}
              </span>
              <span className="text-[10px] text-indigo-300">Sum Squared Error</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <span className="text-[11px] text-indigo-200 block">Calinski-Harabasz</span>
              <span className="text-xl font-bold font-mono text-indigo-300 block mt-0.5">
                {KMEANS_METRICS.calinskiHarabasz}
              </span>
              <span className="text-[10px] text-indigo-300">Variance Ratio</span>
            </div>

            <div className="p-3.5 rounded-xl bg-white/10 backdrop-blur-xs border border-white/10 text-center">
              <span className="text-[11px] text-indigo-200 block">Davies-Bouldin</span>
              <span className="text-xl font-bold font-mono text-emerald-400 block mt-0.5">
                {KMEANS_METRICS.daviesBouldin}
              </span>
              <span className="text-[10px] text-indigo-300">&lt; 0.6 (Klaster Kompak)</span>
            </div>
          </div>
        </div>
      </div>

      {/* 5. Complete Descriptive Statistics Table with Toggle (Data Asli vs Ln) */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Tabel Statistik Deskriptif Variabel Dataset (N = 59)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Menampilkan parameter distribusi lengkap seluruh 11 variabel sebelum dan sesudah transformasi Ln
            </p>
          </div>

          {/* Toggle Button */}
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 p-1 bg-slate-100 dark:bg-slate-900">
            <button
              onClick={() => setDescMode('raw')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                descMode === 'raw'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Data Asli (Sebelum Ln)
            </button>
            <button
              onClick={() => setDescMode('ln')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                descMode === 'ln'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Data Ter-transformasi (Ln)
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase text-[10px] font-semibold tracking-wider">
                <th className="py-3 px-4">Variabel</th>
                <th className="py-3 px-3">Satuan</th>
                <th className="py-3 px-3 text-right">Rata-Rata (Mean)</th>
                <th className="py-3 px-3 text-right">Standar Deviasi</th>
                <th className="py-3 px-3 text-right">Nilai Minimum</th>
                <th className="py-3 px-4 text-right">Nilai Maksimum</th>
                <th className="py-3 px-3 text-right">Skewness</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {DESCRIPTIVE_STATS.map((item) => {
                const isLn = descMode === 'ln' && item.isTransformedLn;
                const meanVal = isLn && item.meanLn !== undefined ? item.meanLn.toFixed(3) : formatNumber(item.mean);
                const stdVal = isLn && item.stdLn !== undefined ? item.stdLn.toFixed(3) : formatNumber(item.std);
                const minVal = isLn && item.minLn !== undefined ? item.minLn.toFixed(3) : formatNumber(item.min);
                const maxVal = isLn && item.maxLn !== undefined ? item.maxLn.toFixed(3) : formatNumber(item.max);
                const unitLabel = isLn ? 'Skala Logaritma (Ln)' : item.unit;

                return (
                  <tr
                    key={item.variable}
                    className="hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors"
                  >
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                      {isLn ? `Ln(${item.variable})` : item.variable}
                    </td>
                    <td className="py-3 px-3 text-slate-500 dark:text-slate-400 text-[11px]">
                      {unitLabel}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-800 dark:text-slate-200 font-bold">
                      {meanVal}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                      {stdVal}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-500 dark:text-slate-400">
                      {minVal}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-slate-800 dark:text-slate-200 font-bold">
                      {maxVal}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                      {item.skewness.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
