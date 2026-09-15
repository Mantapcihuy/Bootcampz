import React from 'react';
import { Sparkles, CheckCircle2, ShieldCheck, BarChart3, AlertTriangle, FileText, ArrowRight } from 'lucide-react';
import { MODEL_METRICS, DESCRIPTIVE_STATS, REGRESSION_COEFFICIENTS } from '../data/qrisData';

export const DiagnosticTests: React.FC = () => {
  return (
    <div id="diagnostic-tests-section" className="space-y-6">
      {/* Overview Banner */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex items-center gap-2 mb-2 text-indigo-600 dark:text-indigo-400">
          <ShieldCheck className="w-5 h-5" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Uji Asumsi Klasik Ekonometrika & Validitas Model
          </h3>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400 max-w-3xl leading-relaxed">
          Sebelum model OLS digunakan untuk mengklasifikasikan kuadran daerah, seluruh persyaratan asumsi klasik Gauss-Markov telah diuji untuk memastikan penaksir bersifat <strong>BLUE (Best Linear Unbiased Estimator)</strong>.
        </p>

        {/* 4 Assumption Test Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
          {/* 1. Normalitas */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">1. Normalitas Residual</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                Residual berdistribusi normal (simetris tanpa outlier ekstrem).
              </p>
            </div>
            <div className="space-y-1 text-xs border-t border-emerald-200/60 dark:border-emerald-800/60 pt-2 font-mono">
              <div className="flex justify-between">
                <span>Jarque-Bera:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">p = {MODEL_METRICS.jarqueBeraP}</span>
              </div>
              <div className="flex justify-between">
                <span>Shapiro-Wilk:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">p = {MODEL_METRICS.shapiroWilkP}</span>
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 pt-1">
                ✓ p &gt; 0.05 → Residual Terbukti Normal
              </div>
            </div>
          </div>

          {/* 2. Multikolinearitas */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">2. Multikolinearitas (VIF)</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                Tidak ada korelasi sempurna antar variabel independen.
              </p>
            </div>
            <div className="space-y-1 text-xs border-t border-emerald-200/60 dark:border-emerald-800/60 pt-2 font-mono">
              <div className="flex justify-between">
                <span>VIF Maksimal:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">4.137</span>
              </div>
              <div className="flex justify-between">
                <span>Batas Toleransi:</span>
                <span className="text-slate-500">VIF &lt; 10</span>
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 pt-1">
                ✓ Bebas Multikolinearitas Serius
              </div>
            </div>
          </div>

          {/* 3. Heteroskedastisitas */}
          <div className="p-4 rounded-xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-emerald-800 dark:text-emerald-300 uppercase">3. Homoskedastisitas</span>
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                Varian residual konstan untuk seluruh nilai estimasi (Breusch-Pagan).
              </p>
            </div>
            <div className="space-y-1 text-xs border-t border-emerald-200/60 dark:border-emerald-800/60 pt-2 font-mono">
              <div className="flex justify-between">
                <span>LM Statistic:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">{MODEL_METRICS.breuschPaganStat}</span>
              </div>
              <div className="flex justify-between">
                <span>p-Value BP:</span>
                <span className="font-bold text-emerald-700 dark:text-emerald-300">p = {MODEL_METRICS.breuschPaganP}</span>
              </div>
              <div className="text-[10px] text-emerald-600 dark:text-emerald-400 pt-1">
                ✓ p &gt; 0.05 → Homoskedastis
              </div>
            </div>
          </div>

          {/* 4. Autokorelasi & Spesifikasi */}
          <div className="p-4 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold text-indigo-800 dark:text-indigo-300 uppercase">4. Durbin-Watson</span>
                <CheckCircle2 className="w-4 h-4 text-indigo-600" />
              </div>
              <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">
                Statistik autokorelasi pada sampel cross-sectional antar wilayah.
              </p>
            </div>
            <div className="space-y-1 text-xs border-t border-indigo-200/60 dark:border-indigo-800/60 pt-2 font-mono">
              <div className="flex justify-between">
                <span>DW Statistic:</span>
                <span className="font-bold text-indigo-700 dark:text-indigo-300">{MODEL_METRICS.durbinWatson}</span>
              </div>
              <div className="flex justify-between">
                <span>Benchmark:</span>
                <span className="text-slate-500">~1.5 - 2.5</span>
              </div>
              <div className="text-[10px] text-indigo-600 dark:text-indigo-400 pt-1">
                ✓ Nilai wajar untuk data spasial
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Multicollinearity VIF Detail Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Rincian Nilai Variance Inflation Factor (VIF) Tiap Variabel
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pengujian independensi multivariat: VIF &lt; 5 menunjukkan tidak ada tumpang tindih informasi antar prediktor.
            </p>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-200">
            Lolos Uji VIF
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 p-5">
          {REGRESSION_COEFFICIENTS.map((item) => (
            <div
              key={item.variable}
              className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between"
            >
              <div>
                <span className="font-semibold text-xs text-slate-800 dark:text-slate-200 block">
                  {item.variableLabel}
                </span>
                <span className="font-mono text-[10px] text-slate-400">{item.variable}</span>
              </div>
              <div className="text-right">
                <span className={`text-base font-mono font-bold ${item.vif < 5 ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-500'}`}>
                  {item.vif.toFixed(3)}
                </span>
                <span className="block text-[10px] text-slate-400">VIF</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Descriptive Statistics & Skewness Analysis */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Statistik Deskriptif & Alasan Transformasi Logaritma Natural (Ln)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Data asli menunjukkan pencilan (skewness) ekstrem pada nominal transaksi QRIS (7.22), wisatawan (2.48), dan PDRB (3.32) yang berhasil dinormalkan dengan transformasi Ln.
            </p>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Nama Variabel Asli</th>
                <th className="py-3 px-3">Satuan</th>
                <th className="py-3 px-3 text-right">Minimum</th>
                <th className="py-3 px-3 text-right">Rata-Rata (Mean)</th>
                <th className="py-3 px-3 text-right">Maksimum</th>
                <th className="py-3 px-3 text-right">Std Deviasi</th>
                <th className="py-3 px-3 text-right">Kemencengan (Skewness)</th>
                <th className="py-3 px-4 text-center">Transformasi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {DESCRIPTIVE_STATS.map((d) => (
                <tr key={d.variable} className="hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors">
                  <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">
                    {d.variable}
                  </td>
                  <td className="py-3 px-3 text-slate-500 text-xs">
                    {d.unit}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {d.min > 10000 ? d.min.toLocaleString('id-ID') : d.min}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-medium text-slate-900 dark:text-slate-100">
                    {d.mean > 10000 ? d.mean.toLocaleString('id-ID', { maximumFractionDigits: 1 }) : d.mean}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-700 dark:text-slate-300">
                    {d.max > 10000 ? d.max.toLocaleString('id-ID') : d.max}
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                    {d.std > 10000 ? d.std.toLocaleString('id-ID', { maximumFractionDigits: 1 }) : d.std}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className={`px-2 py-0.5 rounded font-bold ${
                      d.skewness > 2
                        ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300'
                        : 'text-slate-700 dark:text-slate-300'
                    }`}>
                      {d.skewness.toFixed(2)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center">
                    {d.isTransformedLn ? (
                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
                        Di-Ln-kan
                      </span>
                    ) : (
                      <span className="text-[10px] text-slate-400">
                        Nilai Asli
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
