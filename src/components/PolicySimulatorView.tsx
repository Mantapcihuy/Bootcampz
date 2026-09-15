import React, { useState, useMemo } from 'react';
import {
  Sliders,
  TrendingUp,
  RotateCcw,
  Sparkles,
  AlertCircle,
  HelpCircle,
  Building2,
  Users,
  Store,
  Wallet,
  BarChart2,
  ArrowRight,
  Info
} from 'lucide-react';
import { REGIONS_DATA, REGRESSION_COEFFICIENTS, MODEL_METRICS } from '../data/qrisData';
import { RegionData } from '../types';

export const PolicySimulatorView: React.FC = () => {
  // Target Scope: 'ALL' or specific region name
  const [selectedRegionName, setSelectedRegionName] = useState<string>('ALL');

  // Growth sliders in percentage (%)
  const [touristGrowth, setTouristGrowth] = useState<number>(20);
  const [umkmGrowth, setUmkmGrowth] = useState<number>(15);
  const [spendingGrowth, setSpendingGrowth] = useState<number>(5);
  const [pdrbGrowth, setPdrbGrowth] = useState<number>(5);

  // Beta coefficients from model
  const touristBeta =
    REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_Total_Wisatawan')?.coef || 0.7957;
  const umkmBeta =
    REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_Jumlah_UMKM')?.coef || 0.337;
  const spendingBeta =
    REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_Pengeluaran_per_kapita')?.coef || 0.9165;
  const pdrbBeta =
    REGRESSION_COEFFICIENTS.find((c) => c.variable === 'Ln_PDRB')?.coef || 0.2528;

  // Selected region or aggregate base values
  const targetRegion = useMemo(() => {
    if (selectedRegionName === 'ALL') return null;
    return REGIONS_DATA.find((r) => r.kabupatenKota === selectedRegionName) || null;
  }, [selectedRegionName]);

  // Base QRIS Volume in Miliar
  const baseQrisMiliar = useMemo(() => {
    if (targetRegion) {
      return targetRegion.actualQrisMiliar;
    }
    // Sum of all 59 regions
    return REGIONS_DATA.reduce((acc, curr) => acc + curr.actualQrisMiliar, 0);
  }, [targetRegion]);

  // Partial Elasticity Contributions (% growth in QRIS from each driver)
  // In log-log model: %ΔY = β * %ΔX
  const touristContribPct = touristBeta * touristGrowth;
  const umkmContribPct = umkmBeta * umkmGrowth;
  const spendingContribPct = spendingBeta * spendingGrowth;
  const pdrbContribPct = pdrbBeta * pdrbGrowth;

  const totalGrowthPct =
    touristContribPct + umkmContribPct + spendingContribPct + pdrbContribPct;

  // Additional Nominal QRIS in Miliar
  const additionalQrisMiliar = (baseQrisMiliar * totalGrowthPct) / 100;
  const projectedTotalQrisMiliar = baseQrisMiliar + additionalQrisMiliar;

  // Contributions in Miliar
  const touristContribMiliar = (baseQrisMiliar * touristContribPct) / 100;
  const umkmContribMiliar = (baseQrisMiliar * umkmContribPct) / 100;
  const spendingContribMiliar = (baseQrisMiliar * spendingContribPct) / 100;
  const pdrbContribMiliar = (baseQrisMiliar * pdrbContribPct) / 100;

  // Preset Handlers
  const handleApplyPreset = (preset: 'conservative' | 'moderate' | 'aggressive' | 'reset') => {
    if (preset === 'conservative') {
      setTouristGrowth(5);
      setUmkmGrowth(5);
      setSpendingGrowth(2);
      setPdrbGrowth(3);
    } else if (preset === 'moderate') {
      setTouristGrowth(20);
      setUmkmGrowth(15);
      setSpendingGrowth(5);
      setPdrbGrowth(5);
    } else if (preset === 'aggressive') {
      setTouristGrowth(50);
      setUmkmGrowth(35);
      setSpendingGrowth(10);
      setPdrbGrowth(8);
    } else if (preset === 'reset') {
      setTouristGrowth(0);
      setUmkmGrowth(0);
      setSpendingGrowth(0);
      setPdrbGrowth(0);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header & Target Selector */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold mb-2">
              <Sliders className="w-3.5 h-3.5" />
              <span>Simulasi What-If Ekonometrika</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Policy Simulator: Proyeksi Pertumbuhan Transaksi QRIS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Uji dampak target pertumbuhan pariwisata, UMKM, dan pendapatan terhadap akselerasi transaksi QRIS riil
            </p>
          </div>

          {/* Scope Selector */}
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700 text-xs">
            <Building2 className="w-4 h-4 text-slate-400" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">Cakupan Wilayah:</span>
            <select
              value={selectedRegionName}
              onChange={(e) => setSelectedRegionName(e.target.value)}
              className="bg-white dark:bg-slate-800 font-bold text-slate-900 dark:text-white border border-slate-300 dark:border-slate-600 rounded-lg px-2.5 py-1 focus:outline-none"
            >
              <option value="ALL">Seluruh 59 Wilayah (Agregat)</option>
              {REGIONS_DATA.map((r) => (
                <option key={r.kabupatenKota} value={r.kabupatenKota}>
                  {r.kabupatenKota} ({r.provinsi})
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Preset Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-3 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 font-medium mr-1">Skenario Siap Pakai:</span>
            <button
              onClick={() => handleApplyPreset('conservative')}
              className="px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-200 font-medium transition-colors"
            >
              Konservatif (+5%)
            </button>
            <button
              onClick={() => handleApplyPreset('moderate')}
              className="px-2.5 py-1 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 font-semibold border border-indigo-200 dark:border-indigo-800 transition-colors"
            >
              Moderat (Standar)
            </button>
            <button
              onClick={() => handleApplyPreset('aggressive')}
              className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950 text-rose-700 dark:text-rose-300 font-semibold border border-rose-200 dark:border-rose-800 transition-colors"
            >
              Akselerasi Agresif
            </button>
          </div>

          <button
            onClick={() => handleApplyPreset('reset')}
            className="flex items-center gap-1 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 transition-colors"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset 0%</span>
          </button>
        </div>
      </div>

      {/* Simulator Inputs & Dynamic Outputs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left 7 Columns: Growth Control Sliders */}
        <div className="lg:col-span-7 bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider flex items-center gap-2">
            <span>Parameter Target Intervensi Kebijakan</span>
            <span className="text-[11px] font-normal text-slate-400 normal-case">
              (Geser slider untuk simulasi)
            </span>
          </h3>

          {/* Slider 1: Wisatawan (Driver Utama) */}
          <div className="space-y-2 p-3.5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200/80 dark:border-rose-900/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Users className="w-4 h-4 text-rose-600 dark:text-rose-400" />
                <span>Pertumbuhan Total Wisatawan</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-200 font-mono">
                  β = +0.796 (Driver Utama)
                </span>
              </span>
              <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                {touristGrowth >= 0 ? `+${touristGrowth}%` : `${touristGrowth}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="100"
              step="5"
              value={touristGrowth}
              onChange={(e) => setTouristGrowth(Number(e.target.value))}
              className="w-full accent-rose-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-20% (Kontraksi)</span>
              <span>0% (Baseline)</span>
              <span>+50% (Ekspansi)</span>
              <span>+100% (Duplikasi)</span>
            </div>
          </div>

          {/* Slider 2: UMKM */}
          <div className="space-y-2 p-3.5 rounded-xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Store className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                <span>Pertumbuhan Usaha UMKM Merchant</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-200 font-mono">
                  β = +0.337
                </span>
              </span>
              <span className="font-mono font-bold text-sm text-amber-600 dark:text-amber-400">
                {umkmGrowth >= 0 ? `+${umkmGrowth}%` : `${umkmGrowth}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="100"
              step="5"
              value={umkmGrowth}
              onChange={(e) => setUmkmGrowth(Number(e.target.value))}
              className="w-full accent-amber-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-20%</span>
              <span>0%</span>
              <span>+50%</span>
              <span>+100%</span>
            </div>
          </div>

          {/* Slider 3: Pengeluaran per Kapita */}
          <div className="space-y-2 p-3.5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200/80 dark:border-emerald-900/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Wallet className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Pertumbuhan Pengeluaran per Kapita (Daya Beli)</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-200 font-mono">
                  β = +0.916
                </span>
              </span>
              <span className="font-mono font-bold text-sm text-emerald-600 dark:text-emerald-400">
                {spendingGrowth >= 0 ? `+${spendingGrowth}%` : `${spendingGrowth}%`}
              </span>
            </div>
            <input
              type="range"
              min="-20"
              max="50"
              step="1"
              value={spendingGrowth}
              onChange={(e) => setSpendingGrowth(Number(e.target.value))}
              className="w-full accent-emerald-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-20%</span>
              <span>0%</span>
              <span>+25%</span>
              <span>+50%</span>
            </div>
          </div>

          {/* Slider 4: PDRB */}
          <div className="space-y-2 p-3.5 rounded-xl bg-blue-50/50 dark:bg-blue-950/20 border border-blue-200/80 dark:border-blue-900/60">
            <div className="flex items-center justify-between text-xs">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <BarChart2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>Pertumbuhan PDRB Daerah</span>
                <span className="text-[10px] px-1.5 py-0.2 rounded bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 font-mono">
                  β = +0.253
                </span>
              </span>
              <span className="font-mono font-bold text-sm text-blue-600 dark:text-blue-400">
                {pdrbGrowth >= 0 ? `+${pdrbGrowth}%` : `${pdrbGrowth}%`}
              </span>
            </div>
            <input
              type="range"
              min="-10"
              max="30"
              step="1"
              value={pdrbGrowth}
              onChange={(e) => setPdrbGrowth(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer h-2 bg-slate-200 dark:bg-slate-700 rounded-lg"
            />
            <div className="flex justify-between text-[10px] text-slate-400">
              <span>-10%</span>
              <span>0%</span>
              <span>+15%</span>
              <span>+30%</span>
            </div>
          </div>
        </div>

        {/* Right 5 Columns: Projection Results & Breakdown Waterfall */}
        <div className="lg:col-span-5 space-y-4">
          {/* Main Projection Summary Card */}
          <div className="bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 text-white p-6 rounded-2xl shadow-lg space-y-4">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs text-indigo-300 font-semibold uppercase tracking-wider">
                Hasil Proyeksi Dampak Kebijakan
              </span>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-white/10 text-white">
                {selectedRegionName === 'ALL' ? 'Agregat 59 Wilayah' : selectedRegionName}
              </span>
            </div>

            <div>
              <span className="text-xs text-slate-400 block mb-1">
                Estimasi Pertumbuhan Transaksi QRIS:
              </span>
              <div className="text-4xl font-extrabold font-mono text-emerald-400 tracking-tight">
                {totalGrowthPct >= 0 ? `+${totalGrowthPct.toFixed(2)}%` : `${totalGrowthPct.toFixed(2)}%`}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="p-3 rounded-xl bg-white/5 border border-white/10">
                <span className="text-[10px] text-slate-400 block mb-0.5">Basis Awal QRIS</span>
                <span className="font-mono font-bold text-sm text-slate-200">
                  Rp {baseQrisMiliar.toLocaleString('id-ID')} M
                </span>
              </div>

              <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30">
                <span className="text-[10px] text-emerald-300 block mb-0.5">Potensi Tambahan</span>
                <span className="font-mono font-bold text-sm text-emerald-400">
                  {additionalQrisMiliar >= 0
                    ? `+Rp ${Math.round(additionalQrisMiliar).toLocaleString('id-ID')} M`
                    : `-Rp ${Math.abs(Math.round(additionalQrisMiliar)).toLocaleString('id-ID')} M`}
                </span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-white/10 flex items-center justify-between text-xs">
              <span className="text-slate-300 font-medium">Total Estimasi Baru:</span>
              <span className="font-mono font-bold text-white text-base">
                Rp {Math.round(projectedTotalQrisMiliar).toLocaleString('id-ID')} Miliar
              </span>
            </div>
          </div>

          {/* Breakdown by Contribution Waterfall */}
          <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Dekomposisi Kontribusi per Variabel
            </h4>

            <div className="space-y-2.5 text-xs">
              {/* Wisatawan */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1 font-semibold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-500" />
                    <span>Sektor Pariwisata ({touristGrowth >= 0 ? `+${touristGrowth}%` : `${touristGrowth}%`})</span>
                  </span>
                  <span className="font-mono font-bold text-rose-600 dark:text-rose-400">
                    +{touristContribPct.toFixed(2)}% (+Rp {Math.round(touristContribMiliar).toLocaleString('id-ID')} M)
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Elastisitas 0.796 × Pertumbuhan {touristGrowth}%
                </div>
              </div>

              {/* UMKM */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1 font-semibold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-amber-500" />
                    <span>Ekspansi UMKM ({umkmGrowth >= 0 ? `+${umkmGrowth}%` : `${umkmGrowth}%`})</span>
                  </span>
                  <span className="font-mono font-bold text-amber-600 dark:text-amber-400">
                    +{umkmContribPct.toFixed(2)}% (+Rp {Math.round(umkmContribMiliar).toLocaleString('id-ID')} M)
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Elastisitas 0.337 × Pertumbuhan {umkmGrowth}%
                </div>
              </div>

              {/* Pengeluaran */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1 font-semibold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span>Daya Beli Pengeluaran ({spendingGrowth >= 0 ? `+${spendingGrowth}%` : `${spendingGrowth}%`})</span>
                  </span>
                  <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                    +{spendingContribPct.toFixed(2)}% (+Rp {Math.round(spendingContribMiliar).toLocaleString('id-ID')} M)
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Elastisitas 0.916 × Pertumbuhan {spendingGrowth}%
                </div>
              </div>

              {/* PDRB */}
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center justify-between mb-1 font-semibold">
                  <span className="text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-blue-500" />
                    <span>PDRB Daerah ({pdrbGrowth >= 0 ? `+${pdrbGrowth}%` : `${pdrbGrowth}%`})</span>
                  </span>
                  <span className="font-mono font-bold text-blue-600 dark:text-blue-400">
                    +{pdrbContribPct.toFixed(2)}% (+Rp {Math.round(pdrbContribMiliar).toLocaleString('id-ID')} M)
                  </span>
                </div>
                <div className="text-[10px] text-slate-400">
                  Elastisitas 0.253 × Pertumbuhan {pdrbGrowth}%
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Econometrics Disclaimer */}
      <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-3">
        <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <div>
          <strong className="text-slate-800 dark:text-slate-200 block mb-0.5">
            Disclaimer Ilmiah & Asumsi Model:
          </strong>
          Simulasi ini berbasis koefisien elastisitas model OLS multivariate (R² = 39.4%) dan mengasumsikan prinsip <em>ceteris paribus</em> (faktor lain di luar model bernilai konstan). Hasil simulasi bersifat indikatif untuk proyeksi perencanaan target dan rekomendasi kebijakan Bank Indonesia / Pemerintah Daerah.
        </div>
      </div>
    </div>
  );
};
