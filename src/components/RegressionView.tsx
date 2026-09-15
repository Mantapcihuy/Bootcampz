import React, { useState } from 'react';
import {
  TrendingUp,
  Award,
  AlertTriangle,
  CheckCircle2,
  Info,
  HelpCircle,
  BarChart3,
  ShieldCheck,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { MODEL_METRICS, REGRESSION_COEFFICIENTS } from '../data/qrisData';
import { RegressionCoefficient } from '../types';

interface RegressionViewProps {
  onNavigateTab?: (tab: any) => void;
}

export const RegressionView: React.FC<RegressionViewProps> = ({ onNavigateTab }) => {
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      {/* 1. Header & Model Fit Cards */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold mb-2">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>Spesifikasi Model OLS Multivariat</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Estimasi Ekonometrika: Faktor Penentu Transaksi QRIS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Spesifikasi Lengkap (Full Model): <code className="font-mono text-slate-800 dark:text-slate-200 bg-slate-100 dark:bg-slate-900 px-2 py-0.5 rounded text-[11px]">Ln(QRIS) = β₀ + β₁Ln(Wisatawan) + β₂Gini + β₃Ln(Miskin) + β₄Ln(Pengeluaran) + β₅Ln(UMKM) + β₆Ln(Upah) + β₇Internet + β₈Ln(PDRB) + β₉Ln(Usia_Produktif) + e</code>
            </p>
          </div>

          <div className="flex items-center gap-3">
            {onNavigateTab && (
              <button
                onClick={() => onNavigateTab('simulator')}
                className="px-4 py-2 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <span>Uji di Policy Simulator</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Core 4 Fit Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>R-Squared (R²)</span>
              <span className="text-[10px] font-mono">Goodness of Fit</span>
            </div>
            <div className="text-2xl font-bold font-mono text-indigo-600 dark:text-indigo-400">
              {(MODEL_METRICS.rSquared * 100).toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Variasi dijelaskan oleh model
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Adjusted R²</span>
              <span className="text-[10px] font-mono">Terkoreksi df</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {(MODEL_METRICS.adjRSquared * 100).toFixed(1)}%
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Koreksi jumlah variabel
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>F-Statistic</span>
              <span className="text-[10px] font-mono">Uji Simultan</span>
            </div>
            <div className="text-2xl font-bold font-mono text-emerald-600 dark:text-emerald-400">
              {MODEL_METRICS.fStat.toFixed(3)}
            </div>
            <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1 flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>p = 0.0019 (Signifikan)</span>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
            <div className="flex items-center justify-between text-xs text-slate-400 mb-1">
              <span>Jumlah Sampel (N)</span>
              <span className="text-[10px] font-mono">Observasi</span>
            </div>
            <div className="text-2xl font-bold font-mono text-slate-900 dark:text-white">
              {MODEL_METRICS.obsCount}
            </div>
            <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Kab/Kota (3 Provinsi)
            </div>
          </div>
        </div>

        {/* Secondary Diagnostics Row */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Df Model / Residuals:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
              {MODEL_METRICS.dfModel} / {MODEL_METRICS.dfResiduals}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Log-Likelihood:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
              {MODEL_METRICS.logLikelihood}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Akaike Inf. Crit. (AIC):</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
              {MODEL_METRICS.aic}
            </span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Durbin-Watson:</span>
            <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
              {MODEL_METRICS.durbinWatson} (Tanpa Autokorelasi)
            </span>
          </div>
        </div>
      </div>

      {/* 2. Full Regression Coefficients Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-2">
          <div>
            <h3 className="font-bold text-slate-900 dark:text-white text-base">
              Tabel Estimasi Parameter OLS & Uji Parsial (t-test)
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi koefisien regresi, standard error, nilai t, p-value, 95% Confidence Interval, dan Variance Inflation Factor (VIF)
            </p>
          </div>
          <span className="text-[11px] text-slate-400">
            *** p &lt; 0.01 | ** p &lt; 0.05 | * p &lt; 0.10
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500 dark:text-slate-400 uppercase text-[10px] font-semibold tracking-wider">
                <th className="py-3 px-4">Variabel Independen</th>
                <th className="py-3 px-3 text-right">Koefisien (β)</th>
                <th className="py-3 px-3 text-right">Std. Error</th>
                <th className="py-3 px-3 text-right">t-Statistik</th>
                <th className="py-3 px-3 text-right">p-Value</th>
                <th className="py-3 px-3 text-center">95% Conf. Interval</th>
                <th className="py-3 px-3 text-center">Signifikansi</th>
                <th className="py-3 px-4 text-center">VIF</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {REGRESSION_COEFFICIENTS.map((item) => {
                const isSig = item.pValue < 0.05;
                const isKey = item.variable === 'Ln_Total_Wisatawan';

                return (
                  <tr
                    key={item.variable}
                    className={`hover:bg-slate-50/80 dark:hover:bg-slate-900/50 transition-colors ${
                      isKey ? 'bg-rose-50/40 dark:bg-rose-950/20' : ''
                    }`}
                  >
                    <td className="py-3.5 px-4 font-medium">
                      <div className="flex items-center gap-1.5">
                        <span className="font-mono text-slate-900 dark:text-white font-bold">
                          {item.variable}
                        </span>
                        {isKey && (
                          <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 dark:bg-rose-900 dark:text-rose-300 text-[10px] font-bold">
                            Driver Utama
                          </span>
                        )}
                      </div>
                      <div className="text-[11px] text-slate-400">{item.variableLabel}</div>
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-bold text-slate-900 dark:text-white text-sm">
                      {item.coef >= 0 ? `+${item.coef.toFixed(4)}` : item.coef.toFixed(4)}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono text-slate-500 dark:text-slate-400">
                      {item.stdErr.toFixed(4)}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                      {item.tStat >= 0 ? `+${item.tStat.toFixed(3)}` : item.tStat.toFixed(3)}
                    </td>

                    <td className="py-3.5 px-3 text-right font-mono">
                      <span
                        className={`font-bold ${
                          item.pValue < 0.01
                            ? 'text-emerald-600 dark:text-emerald-400'
                            : item.pValue < 0.05
                            ? 'text-teal-600 dark:text-teal-400'
                            : 'text-slate-400'
                        }`}
                      >
                        {item.pValue === 0.0001 ? '< 0.001***' : item.pValue.toFixed(4)}
                      </span>
                    </td>

                    <td className="py-3.5 px-3 text-center font-mono text-[11px] text-slate-500 dark:text-slate-400">
                      [{item.ciLower.toFixed(3)}, {item.ciUpper.toFixed(3)}]
                    </td>

                    <td className="py-3.5 px-3 text-center">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold inline-block ${
                          item.pValue < 0.01
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : item.pValue < 0.05
                            ? 'bg-teal-100 text-teal-800 dark:bg-teal-950 dark:text-teal-300'
                            : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                        }`}
                      >
                        {item.pValue < 0.01
                          ? 'Sig. p < 0.01'
                          : item.pValue < 0.05
                          ? 'Sig. p < 0.05'
                          : 'Tidak Sig.'}
                      </span>
                    </td>

                    <td className="py-3.5 px-4 text-center">
                      {item.vif ? (
                        <span
                          className={`font-mono text-[11px] px-2 py-0.5 rounded font-semibold ${
                            item.vif < 5
                              ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800'
                              : 'bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-400 border border-amber-200 dark:border-amber-800'
                          }`}
                        >
                          {item.vif.toFixed(2)} {item.vif < 5 ? '(Aman)' : '(Perhatian)'}
                        </span>
                      ) : (
                        <span className="text-slate-400 font-mono">-</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* 3. Key Driver Effect Size Chart & Econometrics Interpretation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Effect Size Visualizer */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                Besaran Efek Variabel (Elastisitas Koefisien β)
              </h3>
              <p className="text-[11px] text-slate-500">
                Spesifikasi log-log: 1% perubahan variabel independen diasosiasikan dengan β% perubahan transaksi QRIS
              </p>
            </div>
            <BarChart3 className="w-4 h-4 text-slate-400" />
          </div>

          <div className="space-y-3 pt-2">
            {REGRESSION_COEFFICIENTS.filter((c) => c.variable !== 'Konstanta').map((item) => {
              const pctWidth = Math.min(Math.abs(item.coef) * 100, 100);
              const isPrimary = item.variable === 'Ln_Total_Wisatawan';

              return (
                <div key={item.variable} className="space-y-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className={`font-semibold ${isPrimary ? 'text-rose-600 dark:text-rose-400 font-bold' : 'text-slate-700 dark:text-slate-300'}`}>
                      {item.variable}
                    </span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      β = +{item.coef.toFixed(4)}
                    </span>
                  </div>

                  <div className="h-3 w-full bg-slate-100 dark:bg-slate-900 rounded-full overflow-hidden p-0.5">
                    <div
                      style={{ width: `${pctWidth}%` }}
                      className={`h-full rounded-full transition-all duration-500 ${
                        isPrimary
                          ? 'bg-rose-500'
                          : item.pValue < 0.05
                          ? 'bg-indigo-500'
                          : 'bg-slate-400 dark:bg-slate-600'
                      }`}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span>{item.variableLabel}</span>
                    <span>t = {item.tStat.toFixed(2)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Econometrics Notes & Causality Warning */}
        <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm">
            <Info className="w-4 h-4" />
            <span>Interpretasi Ekonometrika & Catatan Ilmiah</span>
          </div>

          <div className="space-y-3 text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
            <p>
              <strong>1. Elastisitas Log-Log:</strong> Model menggunakan transformasi logaritma natural pada seluruh variabel rasio kontinu. Koefisien β dapat diinterpretasikan langsung sebagai elastisitas: setiap kenaikan 1% pada <em>Total Wisatawan</em> berkorelasi dengan kenaikan rata-rata transaksi QRIS sebesar <strong>0.796%</strong> (ceteris paribus).
            </p>

            <p>
              <strong>2. Kausalitas vs Hubungan Sampel:</strong> Sesuai prinsip ekonometrika ketat, hasil estimasi OLS cross-sectional ini mendokumentasikan <strong>asosiasi empiris</strong> dalam sampel 59 kabupaten/kota, dan tidak otomatis membuktikan kausalitas deterministik tunggal tanpa uji eksogenitas lanjutan atau panel time-series.
            </p>

            <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200 text-[11px]">
              <div className="flex items-center gap-1.5 font-bold mb-0.5">
                <AlertTriangle className="w-3.5 h-3.5 text-amber-600 shrink-0" />
                <span>Implikasi bagi Pengambil Kebijakan:</span>
              </div>
              Peningkatan infrastruktur pariwisata daerah (destinasi, akomodasi, tiket digital) merupakan katalis paling efektif untuk mempercepat adopsi pembayaran non-tunai QRIS dibanding intervensi agregat lainnya.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
