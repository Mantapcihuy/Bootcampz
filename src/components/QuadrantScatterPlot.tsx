import React, { useState, useMemo } from 'react';
import { Search, Filter, RotateCcw, Info, Check, Eye, MapPin } from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { QuadrantCategory, Province, RegionData } from '../types';

interface QuadrantScatterPlotProps {
  selectedCategory: QuadrantCategory | 'ALL';
  setSelectedCategory: (cat: QuadrantCategory | 'ALL') => void;
  selectedProvince: Province | 'ALL';
  setSelectedProvince: (prov: Province | 'ALL') => void;
  selectedRegion: string | null;
  onSelectRegion: (kabKota: string) => void;
}

export const QuadrantScatterPlot: React.FC<QuadrantScatterPlotProps> = ({
  selectedCategory,
  setSelectedCategory,
  selectedProvince,
  setSelectedProvince,
  selectedRegion,
  onSelectRegion,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState<RegionData | null>(null);
  const [labelMode, setLabelMode] = useState<'selected' | 'outliers' | 'all'>('outliers');

  // Filtered dataset
  const filteredData = useMemo(() => {
    return REGIONS_DATA.filter((r) => {
      const matchCat = selectedCategory === 'ALL' || r.kategori === selectedCategory;
      const matchProv = selectedProvince === 'ALL' || r.provinsi === selectedProvince;
      const matchSearch =
        searchQuery.trim() === '' ||
        r.kabupatenKota.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.provinsi.toLowerCase().includes(searchQuery.toLowerCase());
      return matchCat && matchProv && matchSearch;
    });
  }, [selectedCategory, selectedProvince, searchQuery]);

  // Coordinate scales for SVG canvas
  // X range: min ~ -2.5, max ~ +3.5
  // Y range: min ~ -2.5, max ~ +2.5
  const width = 800;
  const height = 560;
  const padding = { top: 40, right: 40, bottom: 60, left: 60 };

  const xMin = -2.6;
  const xMax = 3.6;
  const yMin = -2.6;
  const yMax = 2.6;

  const scaleX = (val: number) => {
    return padding.left + ((val - xMin) / (xMax - xMin)) * (width - padding.left - padding.right);
  };

  const scaleY = (val: number) => {
    // Invert Y because SVG coordinates increase downwards
    return height - padding.bottom - ((val - yMin) / (yMax - yMin)) * (height - padding.top - padding.bottom);
  };

  const zeroX = scaleX(0);
  const zeroY = scaleY(0);

  // Key Outliers for default label display
  const keyOutliers = useMemo(() => {
    return new Set([
      'Surabaya', 'Mojokerto', 'Batam', 'Malang', 'Pontianak',
      'Kayong Utara', 'Lingga', 'Anambas', 'Natuna', 'Bangkalan',
      'Mempawah', 'Batu', 'Tanjung Pinang', 'Sidoarjo', 'Kediri'
    ]);
  }, []);

  const shouldShowLabel = (r: RegionData) => {
    if (selectedRegion === r.kabupatenKota) return true;
    if (hoveredRegion?.kabupatenKota === r.kabupatenKota) return true;
    if (labelMode === 'all') return true;
    if (labelMode === 'outliers') return keyOutliers.has(r.kabupatenKota);
    return false;
  };

  return (
    <div id="quadrant-scatter-section" className="space-y-6">
      {/* Control Header & Filters */}
      <div className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800/80 shadow-xs space-y-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2 tracking-tight">
              <span>Matriks Kuadran Transaksi QRIS (Z-Score Fundamental vs Residual)</span>
              <span className="text-xs font-mono font-semibold px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                {filteredData.length} / {REGIONS_DATA.length} Wilayah
              </span>
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Sumbu X mengukur potensi kapasitas fundamental ekonomi, sumbu Y mengukur deviasi transaksi riil terhadap estimasi OLS.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              id="input-search-region"
              type="text"
              placeholder="Cari Kabupaten/Kota..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-2 text-xs rounded-full border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/80 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-rose-500 transition-all"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            )}
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          {/* Province Filters */}
          <div className="flex items-center gap-1.5 flex-wrap">
            <span className="text-slate-400 text-[11px] font-medium mr-1">Provinsi:</span>
            {(['ALL', 'Jawa Timur', 'Kalimantan Barat', 'Kep. Riau'] as const).map((prov) => (
              <button
                key={prov}
                id={`filter-prov-${prov.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedProvince(prov)}
                className={`px-3 py-1.5 rounded-full transition-all font-medium text-xs cursor-pointer ${
                  selectedProvince === prov
                    ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900 shadow-xs'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                {prov === 'ALL' ? 'Semua Provinsi (59)' : prov}
              </button>
            ))}
          </div>

          {/* Label Display Mode & Reset */}
          <div className="flex items-center gap-2.5">
            <span className="text-slate-400 text-[11px] font-medium">Label:</span>
            <div className="inline-flex rounded-full border border-slate-200 dark:border-slate-700 p-0.5 bg-slate-50 dark:bg-slate-800">
              <button
                onClick={() => setLabelMode('outliers')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  labelMode === 'outliers' ? 'bg-white dark:bg-slate-700 shadow-2xs text-slate-900 dark:text-white' : 'text-slate-500'
                }`}
              >
                Daerah Kunci
              </button>
              <button
                onClick={() => setLabelMode('all')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  labelMode === 'all' ? 'bg-white dark:bg-slate-700 shadow-2xs text-slate-900 dark:text-white' : 'text-slate-500'
                }`}
              >
                Semua
              </button>
              <button
                onClick={() => setLabelMode('selected')}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-all cursor-pointer ${
                  labelMode === 'selected' ? 'bg-white dark:bg-slate-700 shadow-2xs text-slate-900 dark:text-white' : 'text-slate-500'
                }`}
              >
                Pilihan Saja
              </button>
            </div>

            {(selectedCategory !== 'ALL' || selectedProvince !== 'ALL' || searchQuery || selectedRegion) && (
              <button
                id="btn-reset-filters"
                onClick={() => {
                  setSelectedCategory('ALL');
                  setSelectedProvince('ALL');
                  setSearchQuery('');
                  onSelectRegion('');
                }}
                className="inline-flex items-center gap-1 text-xs text-rose-600 dark:text-rose-400 hover:underline ml-1"
                title="Reset seluruh filter"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>
        </div>

        {/* Quadrant Category Toggles */}
        <div className="flex items-center gap-2 flex-wrap pt-1">
          <span className="text-slate-400 text-[11px] font-medium mr-1">Kuadran:</span>
          <button
            id="filter-quad-all"
            onClick={() => setSelectedCategory('ALL')}
            className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-rose-600 text-white shadow-xs'
                : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
            }`}
          >
            Semua Kuadran (59)
          </button>
          {(Object.keys(QUADRANT_CONFIG) as QuadrantCategory[]).map((cat) => {
            const conf = QUADRANT_CONFIG[cat];
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                id={`filter-quad-${cat.toLowerCase().replace(/[^a-z0-9]/g, '-')}`}
                onClick={() => setSelectedCategory(isSelected ? 'ALL' : cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all flex items-center gap-1.5 border cursor-pointer ${
                  isSelected
                    ? `${conf.badgeBg} ${conf.badgeBorder} ring-2 ring-rose-400/40 shadow-xs`
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700'
                }`}
              >
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: conf.chartColor }} />
                <span>{cat}</span>
                <span className="text-[10px] font-bold opacity-75 font-mono">({conf.count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Interactive SVG Scatter Chart Container */}
      <div className="bg-white dark:bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-200/80 dark:border-slate-800/80 shadow-xs relative overflow-hidden">
        {/* Responsive SVG */}
        <div className="w-full overflow-x-auto">
          <div className="min-w-[720px] max-w-4xl mx-auto relative">
            <svg
              id="qris-quadrant-svg"
              viewBox={`0 0 ${width} ${height}`}
              className="w-full h-auto select-none"
            >
              <defs>
                {/* Subtle quadrant background gradients */}
                <linearGradient id="grad-q1" x1="0" y1="1" x2="1" y2="0">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.10" />
                </linearGradient>
                <linearGradient id="grad-q2" x1="1" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#06b6d4" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.10" />
                </linearGradient>
                <linearGradient id="grad-q3" x1="1" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f43f5e" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#f43f5e" stopOpacity="0.09" />
                </linearGradient>
                <linearGradient id="grad-q4" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.03" />
                  <stop offset="100%" stopColor="#f59e0b" stopOpacity="0.09" />
                </linearGradient>

                {/* Point glow filter */}
                <filter id="point-glow" x="-50%" y="-50%" width="200%" height="200%">
                  <feDropShadow dx="0" dy="1" stdDeviation="2" floodOpacity="0.35" />
                </filter>
              </defs>

              {/* Quadrant 4 Zones Backgrounds */}
              {/* Q2 (Top-Left): Over Develop (X < 0, Y > 0) */}
              <rect
                x={padding.left}
                y={padding.top}
                width={zeroX - padding.left}
                height={zeroY - padding.top}
                fill="url(#grad-q2)"
              />
              {/* Q1 (Top-Right): Maju & Sesuai Potensi (X > 0, Y > 0) */}
              <rect
                x={zeroX}
                y={padding.top}
                width={width - padding.right - zeroX}
                height={zeroY - padding.top}
                fill="url(#grad-q1)"
              />
              {/* Q3 (Bottom-Left): Under Develop (X < 0, Y < 0) */}
              <rect
                x={padding.left}
                y={zeroY}
                width={zeroX - padding.left}
                height={height - padding.bottom - zeroY}
                fill="url(#grad-q3)"
              />
              {/* Q4 (Bottom-Right): Potensi Belum Tergarap (X > 0, Y < 0) */}
              <rect
                x={zeroX}
                y={zeroY}
                width={width - padding.right - zeroX}
                height={height - padding.bottom - zeroY}
                fill="url(#grad-q4)"
              />

              {/* Quadrant Watermark Labels */}
              <g className="font-semibold select-none pointer-events-none opacity-40 dark:opacity-30">
                {/* Q1 */}
                <text x={width - padding.right - 10} y={padding.top + 20} textAnchor="end" className="text-xs fill-emerald-700 dark:fill-emerald-400">
                  KUADRAN I: MAJU & SESUAI POTENSI (12)
                </text>
                <text x={width - padding.right - 10} y={padding.top + 34} textAnchor="end" className="text-[10px] fill-emerald-600 dark:fill-emerald-400">
                  Fundamental Tinggi, Adopsi &gt; Prediksi
                </text>

                {/* Q2 */}
                <text x={padding.left + 10} y={padding.top + 20} textAnchor="start" className="text-xs fill-cyan-700 dark:fill-cyan-400">
                  KUADRAN II: OVER DEVELOP (18)
                </text>
                <text x={padding.left + 10} y={padding.top + 34} textAnchor="start" className="text-[10px] fill-cyan-600 dark:fill-cyan-400">
                  Fundamental Terbatas, Adopsi Melompat
                </text>

                {/* Q3 */}
                <text x={padding.left + 10} y={height - padding.bottom - 24} textAnchor="start" className="text-xs fill-rose-700 dark:fill-rose-400">
                  KUADRAN III: UNDER DEVELOP (12)
                </text>
                <text x={padding.left + 10} y={height - padding.bottom - 10} textAnchor="start" className="text-[10px] fill-rose-600 dark:fill-rose-400">
                  Fundamental Rendah & Transaksi Tertinggal
                </text>

                {/* Q4 */}
                <text x={width - padding.right - 10} y={height - padding.bottom - 24} textAnchor="end" className="text-xs fill-amber-700 dark:fill-amber-400">
                  KUADRAN IV: POTENSI BELUM TERGARAP (17)
                </text>
                <text x={width - padding.right - 10} y={height - padding.bottom - 10} textAnchor="end" className="text-[10px] fill-amber-600 dark:fill-amber-400">
                  Fundamental Tinggi, Adopsi &lt; Prediksi
                </text>
              </g>

              {/* Grid Lines */}
              {[-2, -1, 1, 2, 3].map((val) => {
                const xPos = scaleX(val);
                return (
                  <g key={`x-grid-${val}`}>
                    <line
                      x1={xPos}
                      y1={padding.top}
                      x2={xPos}
                      y2={height - padding.bottom}
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <text
                      x={xPos}
                      y={height - padding.bottom + 16}
                      textAnchor="middle"
                      className="text-[10px] fill-slate-400 font-mono"
                    >
                      {val > 0 ? `+${val}` : val}
                    </text>
                  </g>
                );
              })}

              {[-2, -1, 1, 2].map((val) => {
                const yPos = scaleY(val);
                return (
                  <g key={`y-grid-${val}`}>
                    <line
                      x1={padding.left}
                      y1={yPos}
                      x2={width - padding.right}
                      y2={yPos}
                      stroke="currentColor"
                      strokeDasharray="3 3"
                      className="text-slate-200 dark:text-slate-800"
                    />
                    <text
                      x={padding.left - 8}
                      y={yPos + 3}
                      textAnchor="end"
                      className="text-[10px] fill-slate-400 font-mono"
                    >
                      {val > 0 ? `+${val}` : val}
                    </text>
                  </g>
                );
              })}

              {/* ZERO AXES (Crosshair lines at Z=0) */}
              <line
                x1={padding.left}
                y1={zeroY}
                x2={width - padding.right}
                y2={zeroY}
                stroke="#475569"
                strokeWidth="1.5"
              />
              <line
                x1={zeroX}
                y1={padding.top}
                x2={zeroX}
                y2={height - padding.bottom}
                stroke="#475569"
                strokeWidth="1.5"
              />
              <text x={zeroX - 8} y={zeroY - 6} className="text-[11px] font-bold fill-slate-600 dark:fill-slate-400">
                0
              </text>

              {/* Axis Titles */}
              <text
                x={width / 2}
                y={height - 18}
                textAnchor="middle"
                className="text-xs font-semibold fill-slate-700 dark:fill-slate-300 tracking-wide"
              >
                Potensi Fundamental (Z-Score Prediksi Model OLS) →
              </text>
              <text
                x={-height / 2 + 10}
                y={18}
                transform="rotate(-90)"
                textAnchor="middle"
                className="text-xs font-semibold fill-slate-700 dark:fill-slate-300 tracking-wide"
              >
                ← Deviasi Aktual vs Prediksi (Z-Score Residual)
              </text>

              {/* Data Points */}
              {filteredData.map((region) => {
                const cx = scaleX(region.fundamentalZ);
                const cy = scaleY(region.residualZ);
                const isSelected = selectedRegion === region.kabupatenKota;
                const isHovered = hoveredRegion?.kabupatenKota === region.kabupatenKota;
                const conf = QUADRANT_CONFIG[region.kategori];
                const showLabel = shouldShowLabel(region);

                return (
                  <g
                    key={region.kabupatenKota}
                    className="cursor-pointer transition-all duration-150"
                    onMouseEnter={() => setHoveredRegion(region)}
                    onMouseLeave={() => setHoveredRegion(null)}
                    onClick={() => onSelectRegion(region.kabupatenKota)}
                  >
                    {/* Ripple/Halo for selected or hovered */}
                    {(isSelected || isHovered) && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 14 : 10}
                        fill={conf.chartColor}
                        opacity="0.25"
                        className="animate-pulse"
                      />
                    )}

                    {/* Outer Ring for Selected */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r="9"
                        fill="none"
                        stroke="#f43f5e"
                        strokeWidth="2.5"
                      />
                    )}

                    {/* Main Dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 6 : isHovered ? 6 : 4.5}
                      fill={conf.chartColor}
                      stroke="#ffffff"
                      strokeWidth={isSelected ? 2 : 1.2}
                      filter="url(#point-glow)"
                    />

                    {/* Region Label */}
                    {showLabel && (
                      <g className="pointer-events-none">
                        {/* Background pill behind label for legibility */}
                        <rect
                          x={cx + 6}
                          y={cy - 14}
                          width={region.kabupatenKota.length * 6.2 + 8}
                          height={15}
                          rx={3}
                          fill="rgba(15, 23, 42, 0.75)"
                          className="dark:fill-slate-800/90"
                        />
                        <text
                          x={cx + 10}
                          y={cy - 3}
                          className="text-[10px] font-semibold fill-white drop-shadow-sm"
                        >
                          {region.kabupatenKota}
                        </text>
                      </g>
                    )}
                  </g>
                );
              })}
            </svg>

            {/* Hover Floating Tooltip Card */}
            {hoveredRegion && (
              <div
                className="absolute pointer-events-none z-30 bg-slate-900/95 text-white p-3.5 rounded-xl shadow-2xl border border-slate-700 text-xs backdrop-blur-sm w-72 transition-all"
                style={{
                  left: `${Math.min(Math.max(scaleX(hoveredRegion.fundamentalZ) - 140, 20), width - 300)}px`,
                  top: `${Math.max(scaleY(hoveredRegion.residualZ) - 150, 20)}px`,
                }}
              >
                <div className="flex items-center justify-between gap-2 mb-1.5 pb-1.5 border-b border-slate-800">
                  <div>
                    <span className="font-bold text-sm text-white block">{hoveredRegion.kabupatenKota}</span>
                    <span className="text-[10px] text-slate-400">{hoveredRegion.provinsi}</span>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                    style={{
                      backgroundColor: `${QUADRANT_CONFIG[hoveredRegion.kategori].chartColor}25`,
                      color: QUADRANT_CONFIG[hoveredRegion.kategori].chartColor,
                      border: `1px solid ${QUADRANT_CONFIG[hoveredRegion.kategori].chartColor}50`
                    }}
                  >
                    {hoveredRegion.kategori}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[11px] mb-2">
                  <div className="p-1.5 rounded-lg bg-slate-800/70">
                    <span className="text-slate-400 block text-[9px] uppercase font-semibold">Fundamental Score</span>
                    <span className="font-mono font-bold text-emerald-400">
                      {hoveredRegion.fundamentalZ >= 0 ? `+${hoveredRegion.fundamentalZ.toFixed(3)}` : hoveredRegion.fundamentalZ.toFixed(3)}
                    </span>
                    <span className="text-[9px] text-slate-500 block">Rank #{hoveredRegion.rankFundamental}</span>
                  </div>
                  <div className="p-1.5 rounded-lg bg-slate-800/70">
                    <span className="text-slate-400 block text-[9px] uppercase font-semibold">Residual (Deviasi)</span>
                    <span className="font-mono font-bold text-cyan-400">
                      {hoveredRegion.residualZ >= 0 ? `+${hoveredRegion.residualZ.toFixed(3)}` : hoveredRegion.residualZ.toFixed(3)}
                    </span>
                    <span className="text-[9px] text-slate-500 block">Rank #{hoveredRegion.rankResidual}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] pt-1.5 border-t border-slate-800/80">
                  <div>
                    <span className="text-slate-400 block">Prediksi QRIS:</span>
                    <span className="font-mono font-bold text-slate-200">
                      Rp {hoveredRegion.predictedQrisMiliar.toLocaleString('id-ID')} M
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 block">Realisasi QRIS:</span>
                    <span className="font-mono font-bold text-white">
                      Rp {hoveredRegion.actualQrisMiliar.toLocaleString('id-ID')} M
                    </span>
                  </div>
                </div>

                <div className="mt-2 text-[10px] text-rose-300 font-medium text-center bg-rose-950/40 py-1 rounded border border-rose-900/50">
                  Klik titik untuk membuka Detail Drawer
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Legend bar */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4 border-t border-slate-100 dark:border-slate-800 text-xs">
          {(Object.keys(QUADRANT_CONFIG) as QuadrantCategory[]).map((cat) => {
            const conf = QUADRANT_CONFIG[cat];
            return (
              <div key={cat} className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full" style={{ backgroundColor: conf.chartColor }} />
                <span className="font-medium text-slate-700 dark:text-slate-300">{cat}</span>
                <span className="text-[10px] text-slate-400">({conf.count})</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
