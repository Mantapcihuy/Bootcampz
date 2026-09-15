import React, { useState } from 'react';
import { Landmark, TrendingUp, Sliders, Info, CheckCircle2, AlertCircle, HelpCircle, ArrowRight } from 'lucide-react';
import { MODEL_METRICS, REGRESSION_COEFFICIENTS } from '../data/qrisData';
import { RegressionCoefficient } from '../types';

export const RegressionAnalysis: React.FC = () => {
  // Scenario Simulator state
  const [touristGrowth, setTouristGrowth] = useState<number>(20); // %
  const [umkmGrowth, setUmkmGrowth] = useState<number>(15); // %
  const [spendingGrowth, setSpendingGrowth] = useState<number>(5); // %
  const [pdrbGrowth, setPdrbGrowth] = useState<number>(5); // %

  // Calculate predicted impact on Ln_Nominal_Transaksi_QRIS
  // Since log-log variables have elasticity: %ΔY ≈ β * %ΔX
  const touristBeta = REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_Total_Wisatawan')?.coef || 0.7957;
  const umkmBeta = REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_Jumlah_UMKM')?.coef || 0.3370;
  const spendingBeta = REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_Pengeluaran_per_kapita')?.coef || 0.9165;
  const pdrbBeta = REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_PDRB')?.coef || 0.2528;

  const predictedQrisGrowth =
    touristBeta * touristGrowth +
    umkmBeta * umkmGrowth +
    spendingBeta * spendingGrowth +
    pdrbBeta * pdrbGrowth;

  return (
    <div id="regression-analysis-section" className="space-y-6">
      {/* Overview Card */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold mb-2">
              <Landmark className="w-3.5 h-3.5" />
              <span>Ordinary Least Squares (OLS) Multivariat</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Hasil Estimasi Model Regresi Nominal Transaksi QRIS
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Variabel Dependen: <strong className="font-mono text-slate-700 dark:text-slate-300">{MODEL_METRICS.dependentVar}</strong> (Logaritma Natural Transaksi QRIS Tahunan)
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-400 block text-[10px]">R-Squared</span>
              <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400">
                {(MODEL_METRICS.rSquared * 100).toFixed(1)}%
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-400 block text-[10px]">F-Statistic</span>
              <span className="text-xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {MODEL_METRICS.fStat.toFixed(3)}
              </span>
            </div>
            <div className="bg-slate-50 dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 text-center">
              <span className="text-slate-400 block text-[10px]">Prob (F-stat)</span>
              <span className="text-xl font-extrabold text-rose-600 dark:text-rose-400">
                0.0019***
              </span>
            </div>
          </div>
        </div>

        {/* Model Metrics Stat Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px]">Jumlah Observasi (N)</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{MODEL_METRICS.obsCount} Kab/Kota</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Adjusted R-Squared</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{(MODEL_METRICS.adjRSquared * 100).toFixed(1)}%</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Df Model / Residuals</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200">{MODEL_METRICS.dfModel} / {MODEL_METRICS.dfResiduals}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Log-Likelihood</span>
            <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">{MODEL_METRICS.logLikelihood}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Akaike Inf. Crit. (AIC)</span>
            <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">{MODEL_METRICS.aic}</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px]">Durbin-Watson</span>
            <span className="font-semibold font-mono text-slate-800 dark:text-slate-200">{MODEL_METRICS.durbinWatson}</span>
          </div>
        </div>
      </div>

      {/* Regression Coefficients Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <div>
            <h4 className="font-bold text-slate-900 dark:text-white text-base">
              Tabel Koefisien Regresi OLS & Uji Parsial (t-test)
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Evaluasi pengaruh masing-masing indikator terhadap nominal transaksi QRIS daerah.
            </p>
          </div>
          <span className="text-xs text-slate-400">
            *** Signifikan pada p &lt; 0.001
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4">Variabel Bebas</th>
                <th className="py-3 px-3 text-right">Koefisien (β)</th>
                <th className="py-3 px-3 text-right">Std. Error</th>
                <th className="py-3 px-3 text-right">t-Statistik</th>
                <th className="py-3 px-3 text-right">p-Value</th>
                <th className="py-3 px-4 text-center">95% Conf. Interval</th>
                <th className="py-3 px-3 text-right">VIF</th>
                <th className="py-3 px-4">Interpretasi Kebijakan</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {REGRESSION_COEFFICIENTS.map((c) => (
                <tr
                  key={c.variable}
                  className={`hover:bg-slate-50 dark:hover:bg-slate-750 transition-colors ${
                    c.isSignificant ? 'bg-rose-50/40 dark:bg-rose-950/20' : ''
                  }`}
                >
                  <td className="py-3 px-4">
                    <div className="font-semibold text-slate-900 dark:text-white">
                      {c.variableLabel}
                    </div>
                    <span className="font-mono text-[10px] text-slate-400">{c.variable}</span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-bold">
                    <span className={c.coef > 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                      {c.coef > 0 ? `+${c.coef.toFixed(4)}` : c.coef.toFixed(4)}
                    </span>
                  </td>
                  <td className="py-3 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                    {c.stdErr.toFixed(3)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-slate-800 dark:text-slate-200">
                    {c.tStat.toFixed(3)}
                  </td>
                  <td className="py-3 px-3 text-right font-mono">
                    <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                      c.pValue < 0.01
                        ? 'bg-rose-100 text-rose-800 dark:bg-rose-950/80 dark:text-rose-300'
                        : 'text-slate-600 dark:text-slate-400'
                    }`}>
                      {c.pValue.toFixed(3)} {c.isSignificant ? '***' : ''}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center font-mono text-[11px] text-slate-500 dark:text-slate-400">
                    [{c.ciLower.toFixed(3)}, {c.ciUpper.toFixed(3)}]
                  </td>
                  <td className="py-3 px-3 text-right font-mono font-semibold text-slate-700 dark:text-slate-300">
                    {c.vif.toFixed(2)}
                  </td>
                  <td className="py-3 px-4 text-slate-600 dark:text-slate-300 text-xs leading-relaxed max-w-xs">
                    {c.interpretation}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Interactive What-If Scenario Policy Simulator */}
      <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white rounded-2xl p-6 border border-slate-700 shadow-lg">
        <div className="flex items-center gap-2 mb-2 text-rose-400">
          <Sliders className="w-5 h-5" />
          <h4 className="font-bold text-lg text-white">
            Simulator Kebijakan & Elastisitas Transaksi QRIS
          </h4>
        </div>
        <p className="text-xs text-slate-300 max-w-2xl mb-6">
          Gunakan slider interaktif di bawah ini untuk mensimulasikan dampak perubahan target pariwisata, perluasan UMKM, dan pertumbuhan ekonomi daerah terhadap proyeksi kenaikan transaksi QRIS berbasis koefisien elastisitas OLS.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Sliders Column */}
          <div className="lg:col-span-2 space-y-4">
            {/* Slider 1: Wisatawan */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-200">Kenaikan Arus Wisatawan (Wisman/Wisnus):</span>
                <span className="font-mono text-emerald-400 font-bold">+{touristGrowth}% (β = +0.796)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={touristGrowth}
                onChange={(e) => setTouristGrowth(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-rose-500"
              />
              <span className="text-[10px] text-slate-400">Mendorong transaksi di sektor perhotelan, kuliner, dan cinderamata.</span>
            </div>

            {/* Slider 2: UMKM */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-200">Pertumbuhan Merchant UMKM Ber-QRIS:</span>
                <span className="font-mono text-cyan-400 font-bold">+{umkmGrowth}% (β = +0.337)</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                step="5"
                value={umkmGrowth}
                onChange={(e) => setUmkmGrowth(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-cyan-500"
              />
              <span className="text-[10px] text-slate-400">Ekspansi akseptasi pembayaran pada pasar tradisional dan sentra mikro.</span>
            </div>

            {/* Slider 3: Pengeluaran Per Kapita */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-200">Kenaikan Pengeluaran Per Kapita (Daya Beli):</span>
                <span className="font-mono text-amber-400 font-bold">+{spendingGrowth}% (β = +0.916)</span>
              </div>
              <input
                type="range"
                min="0"
                max="50"
                step="2"
                value={spendingGrowth}
                onChange={(e) => setSpendingGrowth(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-500"
              />
              <span className="text-[10px] text-slate-400">Pertumbuhan konsumsi riil rumah tangga.</span>
            </div>

            {/* Slider 4: PDRB */}
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-slate-200">Pertumbuhan PDRB Daerah:</span>
                <span className="font-mono text-indigo-400 font-bold">+{pdrbGrowth}% (β = +0.253)</span>
              </div>
              <input
                type="range"
                min="0"
                max="20"
                step="1"
                value={pdrbGrowth}
                onChange={(e) => setPdrbGrowth(Number(e.target.value))}
                className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-500"
              />
              <span className="text-[10px] text-slate-400">Peningkatan kapasitas skala ekonomi agregat.</span>
            </div>
          </div>

          {/* Result Card Column */}
          <div className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 flex flex-col justify-between">
            <div>
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 block mb-1">
                Estimasi Kenaikan Transaksi QRIS
              </span>
              <div className="flex items-baseline gap-2 my-2">
                <span className="text-4xl font-extrabold text-emerald-400">
                  +{predictedQrisGrowth.toFixed(1)}%
                </span>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Kombinasi skenario kebijakan di samping diproyeksikan mampu meningkatkan total volume transaksi nominal QRIS daerah sebesar <strong>{predictedQrisGrowth.toFixed(1)}%</strong>.
              </p>
            </div>

            <div className="pt-4 border-t border-slate-700/80 space-y-1.5 text-xs text-slate-400">
              <div className="flex justify-between">
                <span>Kontribusi Wisatawan:</span>
                <span className="font-mono text-white">+{(touristBeta * touristGrowth).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Kontribusi UMKM:</span>
                <span className="font-mono text-white">+{(umkmBeta * umkmGrowth).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Kontribusi Konsumsi Riil:</span>
                <span className="font-mono text-white">+{(spendingBeta * spendingGrowth).toFixed(1)}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
