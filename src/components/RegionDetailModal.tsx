import React from 'react';
import { X, MapPin, Award, Compass, TrendingUp, AlertTriangle, CheckCircle2, ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { RegionData } from '../types';

interface RegionDetailModalProps {
  regionName: string | null;
  onClose: () => void;
  onSelectRegion: (name: string) => void;
}

export const RegionDetailModal: React.FC<RegionDetailModalProps> = ({ regionName, onClose, onSelectRegion }) => {
  if (!regionName) return null;

  const currentIndex = REGIONS_DATA.findIndex((r) => r.kabupatenKota === regionName);
  const region: RegionData | undefined = REGIONS_DATA[currentIndex];

  if (!region) return null;

  const conf = QUADRANT_CONFIG[region.kategori];

  const prevRegion = currentIndex > 0 ? REGIONS_DATA[currentIndex - 1] : null;
  const nextRegion = currentIndex < REGIONS_DATA.length - 1 ? REGIONS_DATA[currentIndex + 1] : null;

  return (
    <div id="region-detail-overlay" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div
        id="region-detail-modal"
        className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 overflow-hidden flex flex-col max-h-[90vh] animate-in fade-in zoom-in-95 duration-200"
      >
        {/* Header with Color Accent */}
        <div className="p-5 border-b border-slate-100 dark:border-slate-800 flex items-start justify-between bg-slate-50/70 dark:bg-slate-800/50">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <MapPin className="w-4 h-4 text-rose-600" />
              <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                {region.provinsi}
              </span>
            </div>
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              {region.kabupatenKota}
            </h3>
            <div className="mt-2 flex items-center gap-2">
              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${conf.badgeBg} ${conf.badgeBorder}`}>
                {region.kategori}
              </span>
              <span className="text-xs text-slate-400">
                {conf.quadrantCode}
              </span>
            </div>
          </div>

          <button
            id="btn-close-region-modal"
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-5 space-y-5 overflow-y-auto flex-1">
          {/* Key Z-Scores Cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                Potensi Fundamental (X)
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-mono font-bold text-slate-900 dark:text-white">
                  {region.fundamentalZ >= 0 ? `+${region.fundamentalZ.toFixed(3)}` : region.fundamentalZ.toFixed(3)}
                </span>
                <span className="text-xs font-semibold text-slate-400">σ</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Peringkat <strong>#{region.rankFundamental}</strong> dari 59 wilayah
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
              <span className="text-xs text-slate-500 dark:text-slate-400 block mb-1">
                Deviasi Residual (Y)
              </span>
              <div className="flex items-baseline gap-1.5">
                <span className={`text-2xl font-mono font-bold ${
                  region.residualZ >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'
                }`}>
                  {region.residualZ >= 0 ? `+${region.residualZ.toFixed(3)}` : region.residualZ.toFixed(3)}
                </span>
                <span className="text-xs font-semibold text-slate-400">σ</span>
              </div>
              <div className="mt-2 text-[11px] text-slate-500">
                Peringkat <strong>#{region.rankResidual}</strong> dari 59 wilayah
              </div>
            </div>
          </div>

          {/* Diagnostic Assessment */}
          <div className="p-4 rounded-xl border border-slate-200 dark:border-slate-700/80 bg-white dark:bg-slate-800/40">
            <div className="flex items-center gap-2 text-sm font-bold text-slate-900 dark:text-slate-100 mb-1.5">
              <Compass className="w-4 h-4 text-rose-600" />
              <span>Diagnosis Posisi Kuadran</span>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              {conf.diagnosis}
            </p>
            <div className="mt-2 text-xs text-slate-500 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-slate-700/60">
              {region.residualZ >= 0 ? (
                <span className="text-emerald-600 dark:text-emerald-400 font-medium">
                  ✓ Transaksi aktual berada di <strong>atas</strong> nilai proyeksi model berdasarkan indikator makro.
                </span>
              ) : (
                <span className="text-amber-600 dark:text-amber-400 font-medium">
                  ⚠ Transaksi aktual berada di <strong>bawah</strong> nilai proyeksi potensi model.
                </span>
              )}
            </div>
          </div>

          {/* Actionable Policy Recommendations for this Quadrant */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Rekomendasi Kebijakan (BI & Pemda)
              </span>
            </div>
            <ul className="space-y-2">
              {conf.rekomendasi.map((item, idx) => (
                <li
                  key={idx}
                  className="text-xs p-2.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-100 dark:border-slate-700 text-slate-700 dark:text-slate-300 flex items-start gap-2"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Footer with Prev / Next Navigation */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/30 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2">
            {prevRegion && (
              <button
                onClick={() => onSelectRegion(prevRegion.kabupatenKota)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" />
                <span>{prevRegion.kabupatenKota}</span>
              </button>
            )}
            {nextRegion && (
              <button
                onClick={() => onSelectRegion(nextRegion.kabupatenKota)}
                className="px-2.5 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 flex items-center gap-1"
              >
                <span>{nextRegion.kabupatenKota}</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <button
            onClick={onClose}
            className="px-4 py-1.5 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium"
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
