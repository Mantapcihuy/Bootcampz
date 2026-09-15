import React from 'react';
import {
  Search,
  RotateCcw,
  Download,
  Calendar,
  Clock,
  Menu,
  X,
  MapPin,
  Layers,
  Sparkles,
  ChevronDown
} from 'lucide-react';
import { Province, QuadrantCategory } from '../types';

interface GlobalHeaderProps {
  selectedProvince: Province | 'ALL';
  setSelectedProvince: (prov: Province | 'ALL') => void;
  selectedCategory: QuadrantCategory | 'ALL';
  setSelectedCategory: (cat: QuadrantCategory | 'ALL') => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  onResetFilters: () => void;
  onExportCsv: () => void;
  activeCount: number;
  totalCount: number;
  onToggleMobileMenu: () => void;
  regionNames: string[];
  onSelectRegion: (name: string) => void;
}

export const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  selectedProvince,
  setSelectedProvince,
  selectedCategory,
  setSelectedCategory,
  searchQuery,
  setSearchQuery,
  onResetFilters,
  onExportCsv,
  activeCount,
  totalCount,
  onToggleMobileMenu,
  regionNames,
  onSelectRegion,
}) => {
  const [showSuggestions, setShowSuggestions] = React.useState(false);

  const filteredSuggestions = searchQuery.trim()
    ? regionNames
        .filter((name) => name.toLowerCase().includes(searchQuery.toLowerCase()))
        .slice(0, 6)
    : [];

  const isFiltered =
    selectedProvince !== 'ALL' ||
    selectedCategory !== 'ALL' ||
    searchQuery.trim().length > 0;

  return (
    <header className="sticky top-0 z-30 bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border-b border-slate-200/80 dark:border-slate-800/80 transition-all">
      {/* Top Banner Row — Spacious Executive Header */}
      <div className="px-5 sm:px-8 py-3.5 flex items-center justify-between gap-4">
        {/* Title and Hamburger */}
        <div className="flex items-center gap-3.5 min-w-0">
          <button
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Buka Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight truncate">
                QRIS Regional Intelligence Dashboard
              </h1>
              <span className="hidden md:inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wide uppercase bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200/80 dark:border-rose-800/80">
                <Sparkles className="w-3 h-3 text-rose-500" />
                <span>Decision Support System</span>
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 hidden sm:block truncate mt-0.5">
              Analisis Potensi Fundamental, Adopsi Transaksi, dan Prioritas Kebijakan Kabupaten/Kota
            </p>
          </div>
        </div>

        {/* Status Meta Badges */}
        <div className="hidden xl:flex items-center gap-2.5 text-xs text-slate-500 dark:text-slate-400">
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">Sampel: 59 Wilayah</span>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-100/80 dark:bg-slate-800/80 border border-slate-200/70 dark:border-slate-700/70">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">Model: OLS Multivariat</span>
          </div>
        </div>
      </div>

      {/* Global Filter Toolbar — Refined Pill Form Controls */}
      <div className="px-5 sm:px-8 py-2.5 bg-slate-50/70 dark:bg-slate-900/50 border-t border-slate-200/60 dark:border-slate-800/60 flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Left: Filter Controls */}
        <div className="flex flex-wrap items-center gap-2.5 flex-1 min-w-[280px]">
          {/* Province Filter Pill */}
          <div className="relative flex items-center bg-white dark:bg-slate-800/90 pl-3 pr-2.5 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <MapPin className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <span className="text-slate-400 font-medium mr-1.5">Provinsi:</span>
            <select
              value={selectedProvince}
              onChange={(e) => setSelectedProvince(e.target.value as Province | 'ALL')}
              className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer pr-4 appearance-none"
            >
              <option value="ALL">Semua Provinsi (3)</option>
              <option value="Jawa Timur">Jawa Timur (38)</option>
              <option value="Kalimantan Barat">Kalimantan Barat (14)</option>
              <option value="Kep. Riau">Kepulauan Riau (7)</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Quadrant Filter Pill */}
          <div className="relative flex items-center bg-white dark:bg-slate-800/90 pl-3 pr-2.5 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
            <Layers className="w-3.5 h-3.5 text-slate-400 mr-1.5 shrink-0" />
            <span className="text-slate-400 font-medium mr-1.5">Kuadran:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as QuadrantCategory | 'ALL')}
              className="bg-transparent text-slate-800 dark:text-slate-200 font-semibold focus:outline-none cursor-pointer pr-4 max-w-[170px] truncate appearance-none"
            >
              <option value="ALL">Semua Kuadran (4)</option>
              <option value="Maju & Sesuai Potensi">I — Maju & Sesuai (12)</option>
              <option value="Over Develop">II — Over Develop (18)</option>
              <option value="Under Develop">III — Under Develop (12)</option>
              <option value="Potensi Belum Tergarap">IV — Potensi Belum Tergarap (17)</option>
            </select>
            <ChevronDown className="w-3 h-3 text-slate-400 absolute right-2.5 pointer-events-none" />
          </div>

          {/* Region Search Input Pill with Autocomplete */}
          <div className="relative flex-1 min-w-[200px] max-w-xs">
            <div className="flex items-center gap-2 bg-white dark:bg-slate-800/90 px-3 py-1.5 rounded-full border border-slate-200/80 dark:border-slate-700/80 shadow-2xs hover:border-slate-300 dark:hover:border-slate-600 transition-colors">
              <Search className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <input
                type="text"
                placeholder="Cari Kab/Kota..."
                value={searchQuery}
                onFocus={() => setShowSuggestions(true)}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent w-full text-slate-800 dark:text-slate-200 focus:outline-none placeholder:text-slate-400 text-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-0.5"
                  title="Hapus pencarian"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Autocomplete Dropdown */}
            {showSuggestions && filteredSuggestions.length > 0 && (
              <div
                className="absolute left-0 right-0 top-full mt-1.5 bg-white dark:bg-slate-800 rounded-2xl shadow-xl border border-slate-200/80 dark:border-slate-700/80 py-1.5 z-50 overflow-hidden"
                onMouseLeave={() => setShowSuggestions(false)}
              >
                {filteredSuggestions.map((name) => (
                  <button
                    key={name}
                    onClick={() => {
                      setSearchQuery(name);
                      onSelectRegion(name);
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3.5 py-1.5 text-xs text-slate-700 dark:text-slate-200 hover:bg-rose-50 dark:hover:bg-rose-950/40 hover:text-rose-600 transition-colors flex items-center justify-between"
                  >
                    <span>{name}</span>
                    <span className="text-[10px] text-slate-400">Pilih</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Reset Filter Button */}
          {isFiltered && (
            <button
              onClick={onResetFilters}
              className="flex items-center gap-1.5 text-slate-500 hover:text-rose-600 dark:hover:text-rose-400 px-3 py-1.5 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors text-xs font-medium"
              title="Reset semua filter aktif"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filter</span>
            </button>
          )}
        </div>

        {/* Right: Active Count & Export CSV Button */}
        <div className="flex items-center gap-2.5 shrink-0">
          <div className="px-3 py-1 rounded-full bg-slate-200/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-mono font-bold text-[11px] border border-slate-300/60 dark:border-slate-700/60">
            {activeCount} / {totalCount} Wilayah Aktif
          </div>

          <button
            onClick={onExportCsv}
            className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-600 hover:bg-rose-700 text-white font-semibold shadow-sm transition-all hover:shadow-rose-900/20 active:scale-95 cursor-pointer"
            title="Ekspor data sesuai filter aktif"
          >
            <Download className="w-3.5 h-3.5" />
            <span className="hidden sm:inline text-xs">Ekspor CSV</span>
          </button>
        </div>
      </div>
    </header>
  );
};

