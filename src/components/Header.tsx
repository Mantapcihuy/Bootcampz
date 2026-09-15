import React from 'react';
import { Landmark, Activity, Layers, Download, Sparkles } from 'lucide-react';
import { MODEL_METRICS, REGIONS_DATA } from '../data/qrisData';

interface HeaderProps {
  activeTab: 'overview' | 'quadrant' | 'regression' | 'diagnostics' | 'table' | 'policy';
  setActiveTab: (tab: 'overview' | 'quadrant' | 'regression' | 'diagnostics' | 'table' | 'policy') => void;
  onExportCsv: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onExportCsv }) => {
  return (
    <header id="main-header" className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 sticky top-0 z-30 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-3.5 gap-3">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 via-rose-600 to-indigo-700 flex items-center justify-center text-white shadow-md shadow-rose-500/20 font-bold text-lg tracking-wider">
              QR
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
                  QRIS Regional Analytics
                </h1>
                <span className="text-[11px] font-semibold uppercase px-2 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950/60 dark:text-rose-300 border border-rose-200 dark:border-rose-800">
                  OLS 59 Kab/Kota
                </span>
              </div>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Analisis Regresi Multivariat & Kuadran Potensi Transaksi QRIS (Jatim, Kepri, Kalbar)
              </p>
            </div>
          </div>

          {/* Key Metrics Quick Badges & Actions */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
            <div className="hidden lg:flex items-center gap-3 px-3 py-1.5 rounded-lg bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-600 dark:text-slate-300">
              <div>
                <span className="text-slate-400 block text-[10px]">Wilayah</span>
                <span className="font-semibold text-slate-800 dark:text-slate-100">{REGIONS_DATA.length} Kab/Kota</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[10px]">Daya Penjelas</span>
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">R² {(MODEL_METRICS.rSquared * 100).toFixed(1)}%</span>
              </div>
              <div className="h-6 w-px bg-slate-200 dark:bg-slate-700" />
              <div>
                <span className="text-slate-400 block text-[10px]">F-Stat (p-val)</span>
                <span className="font-semibold text-indigo-600 dark:text-indigo-400">{MODEL_METRICS.fStat.toFixed(3)} (0.0019)</span>
              </div>
            </div>

            <button
              id="btn-export-csv-header"
              onClick={onExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 shadow-sm transition-all"
              title="Unduh data hasil klasifikasi kuadran ke CSV"
            >
              <Download className="w-3.5 h-3.5 text-slate-500" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex space-x-1 sm:space-x-2 overflow-x-auto no-scrollbar pt-1 border-t border-slate-100 dark:border-slate-800 text-xs sm:text-sm">
          {[
            { id: 'overview', label: 'Ringkasan Eksekutif', icon: Activity },
            { id: 'quadrant', label: 'Matriks Kuadran Wilayah', icon: Layers },
            { id: 'regression', label: 'Hasil Regresi OLS & Simulasi', icon: Landmark },
            { id: 'diagnostics', label: 'Uji Asumsi Klasik', icon: Sparkles },
            { id: 'table', label: 'Tabel 59 Daerah', icon: Layers },
            { id: 'policy', label: 'Rekomendasi Kebijakan', icon: Landmark },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                id={`tab-btn-${tab.id}`}
                onClick={() => setActiveTab(tab.id as any)}
                className={`inline-flex items-center gap-1.5 px-3 py-2 font-medium border-b-2 whitespace-nowrap transition-all ${
                  isActive
                    ? 'border-rose-600 text-rose-600 dark:text-rose-400 dark:border-rose-400 bg-rose-50/50 dark:bg-rose-950/20'
                    : 'border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200 hover:border-slate-300'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};
