import React from 'react';
import {
  X,
  MapPin,
  TrendingUp,
  Award,
  Compass,
  ArrowRight,
  Sparkles,
  Users,
  Store,
  Wallet,
  Wifi,
  BarChart3,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { RegionData } from '../types';
import { QUADRANT_CONFIG } from '../data/qrisData';

interface RegionalProfileDrawerProps {
  region: RegionData | null;
  onClose: () => void;
  onOpenCompare?: (regionName: string) => void;
  onNavigateTab?: (tab: any) => void;
}

export const RegionalProfileDrawer: React.FC<RegionalProfileDrawerProps> = ({
  region,
  onClose,
  onOpenCompare,
  onNavigateTab,
}) => {
  if (!region) return null;

  const conf = QUADRANT_CONFIG[region.kategori];

  return (
    <div className="fixed inset-y-0 right-0 z-50 w-full sm:w-[420px] bg-white dark:bg-slate-900 shadow-2xl border-l border-slate-200 dark:border-slate-800 flex flex-col transition-all transform duration-300">
      {/* Drawer Top Header */}
      <div className="p-5 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/70 dark:bg-slate-900/80">
        <div>
          <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${conf.badgeBg} ${conf.badgeBorder}`}
            >
              {region.kategori}
            </span>
            <span
              className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                region.clusterKMeans === 'Overdeveloped'
                  ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                  : region.clusterKMeans === 'Underdeveloped'
                  ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                  : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
              }`}
            >
              K-Means: {region.clusterKMeans}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium ml-1">
              {region.provinsi}
            </span>
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white leading-tight">
            {region.kabupatenKota}
          </h3>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-200/60 dark:hover:bg-slate-800 transition-colors"
          aria-label="Tutup Panel"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Drawer Scrollable Body */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5 text-xs text-slate-700 dark:text-slate-300">
        {/* Position & Ranks Card */}
        <div className="bg-slate-50 dark:bg-slate-800/80 rounded-xl p-4 border border-slate-200 dark:border-slate-700/80">
          <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2.5 flex items-center gap-1.5">
            <Award className="w-3.5 h-3.5 text-rose-500" />
            <span>Peringkat & Posisi Sampel (N=59)</span>
          </div>

          <div className="grid grid-cols-4 gap-2 text-center">
            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Residual</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                #{region.rankResidual}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Fundamental</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                #{region.rankFundamental}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Gabungan</span>
              <span className="font-mono font-bold text-sm text-slate-900 dark:text-white">
                #{region.rankOverall}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/70 dark:border-slate-700/60">
              <span className="text-[10px] text-slate-400 block mb-0.5">Persentil</span>
              <span className="font-mono font-bold text-sm text-rose-600 dark:text-rose-400">
                {region.percentile}%
              </span>
            </div>
          </div>
        </div>

        {/* Diagnosis Card */}
        <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800">
          <div className="flex items-center gap-2 mb-1.5 text-slate-900 dark:text-white font-bold text-xs">
            <Compass className="w-4 h-4 text-indigo-500" />
            <span>Diagnosis Posisi Kuadran</span>
          </div>
          <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-[11px]">
            {conf.diagnosis}
          </p>
        </div>

        {/* Core QRIS Financial Metrics */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Metrik Transaksi QRIS (Estimasi Model)
          </h4>
          <div className="grid grid-cols-2 gap-2">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Realisasi Aktual QRIS</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                Rp {region.actualQrisMiliar.toLocaleString('id-ID')} M
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Potensi (Duan's Smearing)</span>
              <span className="text-sm font-bold font-mono text-indigo-600 dark:text-indigo-400">
                Rp {region.potentialQrisDuanMiliar.toLocaleString('id-ID')} M
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Deviasi Gap OLS</span>
              <span
                className={`text-sm font-bold font-mono ${
                  region.gapQrisMiliar >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}
              >
                {region.gapQrisMiliar >= 0 ? `+Rp ${region.gapQrisMiliar.toLocaleString('id-ID')} M` : `-Rp ${Math.abs(region.gapQrisMiliar).toLocaleString('id-ID')} M`}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
              <span className="text-[10px] text-slate-400 block">Skor Z Residual</span>
              <span className="text-sm font-bold font-mono text-slate-900 dark:text-white">
                {region.residualZ >= 0 ? `+${region.residualZ.toFixed(3)}` : region.residualZ.toFixed(3)}
              </span>
            </div>
          </div>
        </div>

        {/* Fundamental Economic Drivers */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
            Indikator Fundamental Wilayah
          </h4>
          <div className="space-y-1.5">
            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Users className="w-3.5 h-3.5 text-slate-400" />
                <span>Total Wisatawan (Driver Utama)</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {region.wisatawan.toLocaleString('id-ID')} org
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Store className="w-3.5 h-3.5 text-slate-400" />
                <span>Jumlah Usaha UMKM</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {region.umkm.toLocaleString('id-ID')} unit
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Wallet className="w-3.5 h-3.5 text-slate-400" />
                <span>Pengeluaran per Kapita</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                Rp {(region.pengeluaranPerKapita / 1000000).toFixed(2)} jt/th
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <Wifi className="w-3.5 h-3.5 text-slate-400" />
                <span>Penetrasi Internet</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {region.internetScore} indeks
              </span>
            </div>

            <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800 border border-slate-200/60 dark:border-slate-700/60">
              <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                <BarChart3 className="w-3.5 h-3.5 text-slate-400" />
                <span>PDRB Daerah</span>
              </span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                Rp {(region.pdrbMiliar / 1000).toFixed(1)} Triliun
              </span>
            </div>

            {/* Socio-Economic Context */}
            <div className="grid grid-cols-2 gap-1.5 pt-1">
              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Gini Ratio</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
                  {region.giniRatio.toFixed(3)}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">IPM / HDI</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
                  {region.hdi.toFixed(2)}
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Penduduk Miskin</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
                  {region.pendudukMiskin.toLocaleString('id-ID')} org
                </span>
              </div>

              <div className="p-2 rounded-lg bg-white dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60">
                <span className="text-[10px] text-slate-400 block">Upah Minimum</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-xs">
                  Rp {(region.upahMinimum / 1000000).toFixed(2)} jt
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* 4 Specific Actionable Recommendations */}
        <div>
          <h4 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>4 Rekomendasi Kebijakan Spesifik</span>
          </h4>
          <div className="space-y-2">
            {(region.rekomendasi || conf.rekomendasi).map((rek, idx) => (
              <div
                key={idx}
                className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/60 border border-slate-200/70 dark:border-slate-700/70 flex items-start gap-2.5"
              >
                <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-bold text-[10px] shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="text-[11px] text-slate-700 dark:text-slate-300 leading-snug">
                  {rek}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drawer Action Footer */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90 flex items-center justify-between gap-2">
        {onOpenCompare && (
          <button
            onClick={() => {
              onOpenCompare(region.kabupatenKota);
              onClose();
            }}
            className="flex-1 py-2 px-3 rounded-lg border border-slate-300 dark:border-slate-700 hover:bg-slate-200/60 dark:hover:bg-slate-800 font-medium text-xs text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Bandingkan Daerah</span>
          </button>
        )}

        {onNavigateTab && (
          <button
            onClick={() => {
              onNavigateTab('simulator');
              onClose();
            }}
            className="flex-1 py-2 px-3 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-medium text-xs shadow-xs transition-colors flex items-center justify-center gap-1.5"
          >
            <span>Buka di Simulator</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        )}
      </div>
    </div>
  );
};
