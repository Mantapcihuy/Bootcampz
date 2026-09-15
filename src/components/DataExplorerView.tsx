import React, { useState, useMemo } from 'react';
import {
  Search,
  Download,
  Filter,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Eye,
  ChevronLeft,
  ChevronRight,
  MapPin,
  RotateCcw
} from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { RegionData, Province, QuadrantCategory } from '../types';

interface DataExplorerViewProps {
  onSelectRegion: (kabKota: string) => void;
  onOpenDrawer: (region: RegionData) => void;
}

type SortField =
  | 'kabupatenKota'
  | 'provinsi'
  | 'kategori'
  | 'fundamentalZ'
  | 'residualZ'
  | 'actualQrisMiliar'
  | 'predictedQrisMiliar'
  | 'gapQrisMiliar'
  | 'wisatawan'
  | 'umkm'
  | 'pengeluaranPerKapita'
  | 'internetScore'
  | 'pdrbMiliar'
  | 'priority';

export const DataExplorerView: React.FC<DataExplorerViewProps> = ({
  onSelectRegion,
  onOpenDrawer,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProvince, setSelectedProvince] = useState<Province | 'ALL'>('ALL');
  const [selectedCategory, setSelectedCategory] = useState<QuadrantCategory | 'ALL'>('ALL');
  const [sortField, setSortField] = useState<SortField>('fundamentalZ');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [pageSize, setPageSize] = useState<number>(15);
  const [currentPage, setCurrentPage] = useState<number>(1);

  // Column Visibility Toggles
  const [showColumns, setShowColumns] = useState({
    fundamentalZ: true,
    residualZ: true,
    actualQris: true,
    predictedQris: true,
    gap: true,
    wisatawan: true,
    umkm: true,
    pengeluaran: true,
    internet: false,
    pdrb: false,
    priority: true,
  });

  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  // Filtering
  const filteredData = useMemo(() => {
    return REGIONS_DATA.filter((r) => {
      const matchSearch =
        searchQuery.trim() === '' ||
        r.kabupatenKota.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.provinsi.toLowerCase().includes(searchQuery.toLowerCase());
      const matchProv = selectedProvince === 'ALL' || r.provinsi === selectedProvince;
      const matchCat = selectedCategory === 'ALL' || r.kategori === selectedCategory;
      return matchSearch && matchProv && matchCat;
    });
  }, [searchQuery, selectedProvince, selectedCategory]);

  // Sorting
  const sortedData = useMemo(() => {
    return [...filteredData].sort((a, b) => {
      let valA: any = a[sortField];
      let valB: any = b[sortField];

      if (typeof valA === 'string') {
        return sortOrder === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }
      return sortOrder === 'asc' ? valA - valB : valB - valA;
    });
  }, [filteredData, sortField, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  // CSV Export functions
  const downloadCsv = (dataToExport: RegionData[], filename: string) => {
    const headers = [
      'No',
      'Kabupaten/Kota',
      'Provinsi',
      'Kuadran',
      'Fundamental_Z',
      'Residual_Z',
      'Actual_QRIS_Miliar',
      'Predicted_QRIS_Miliar',
      'Gap_Miliar',
      'Total_Wisatawan',
      'Jumlah_UMKM',
      'Pengeluaran_per_Kapita_Rp',
      'Skor_Internet',
      'PDRB_Miliar',
      'Prioritas',
    ];

    const rows = dataToExport.map((r, idx) => [
      idx + 1,
      `"${r.kabupatenKota}"`,
      `"${r.provinsi}"`,
      `"${r.kategori}"`,
      r.fundamentalZ.toFixed(3),
      r.residualZ.toFixed(3),
      r.actualQrisMiliar,
      r.predictedQrisMiliar,
      r.gapQrisMiliar,
      r.wisatawan,
      r.umkm,
      r.pengeluaranPerKapita,
      r.internetScore,
      r.pdrbMiliar,
      `"${r.priority}"`,
    ]);

    const csvContent = [headers.join(','), ...rows.map((row) => row.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', filename);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-4">
      {/* Header & Controls */}
      <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Data Explorer: Basis Data Ekonometrika QRIS
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Menampilkan {filteredData.length} dari 59 wilayah kabupaten/kota
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            {/* Column Visibility Menu */}
            <div className="relative">
              <button
                onClick={() => setShowColumnDropdown(!showColumnDropdown)}
                className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5"
              >
                <Eye className="w-3.5 h-3.5 text-slate-400" />
                <span>Atur Kolom</span>
              </button>

              {showColumnDropdown && (
                <div className="absolute right-0 mt-1 w-56 bg-white dark:bg-slate-800 rounded-xl shadow-xl border border-slate-200 dark:border-slate-700 p-3 z-30 space-y-1 text-xs">
                  <div className="text-[10px] uppercase font-bold text-slate-400 mb-1">
                    Tampilkan Kolom
                  </div>
                  {Object.entries(showColumns).map(([key, val]) => (
                    <label key={key} className="flex items-center gap-2 cursor-pointer py-0.5">
                      <input
                        type="checkbox"
                        checked={val}
                        onChange={() =>
                          setShowColumns({
                            ...showColumns,
                            [key as keyof typeof showColumns]: !val,
                          })
                        }
                        className="rounded accent-rose-600"
                      />
                      <span className="capitalize text-slate-700 dark:text-slate-300">
                        {key.replace(/([A-Z])/g, ' $1')}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Export Current View */}
            <button
              onClick={() =>
                downloadCsv(sortedData, `qris-data-filtered-${filteredData.length}.csv`)
              }
              className="px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-xs font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 flex items-center gap-1.5"
            >
              <Download className="w-3.5 h-3.5 text-slate-400" />
              <span>Ekspor Tampilan ({filteredData.length})</span>
            </button>

            {/* Export Full Dataset */}
            <button
              onClick={() => downloadCsv(REGIONS_DATA, 'qris-dataset-lengkap-59-wilayah.csv')}
              className="px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor Lengkap (N=59)</span>
            </button>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari wilayah..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-8 pr-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none"
            />
          </div>

          {/* Province select */}
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value as Province | 'ALL');
              setCurrentPage(1);
            }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Semua Provinsi (3)</option>
            <option value="Jawa Timur">Jawa Timur (38)</option>
            <option value="Kalimantan Barat">Kalimantan Barat (14)</option>
            <option value="Kep. Riau">Kepulauan Riau (7)</option>
          </select>

          {/* Quadrant select */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as QuadrantCategory | 'ALL');
              setCurrentPage(1);
            }}
            className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1.5 text-slate-800 dark:text-slate-200 focus:outline-none"
          >
            <option value="ALL">Semua Kuadran (4)</option>
            <option value="Maju & Sesuai Potensi">I — Maju & Sesuai</option>
            <option value="Over Develop">II — Over Develop</option>
            <option value="Under Develop">III — Under Develop</option>
            <option value="Potensi Belum Tergarap">IV — Potensi Belum Tergarap</option>
          </select>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-50 dark:bg-slate-900 border-b border-slate-200 dark:border-slate-700 text-slate-500 uppercase text-[10px] font-semibold tracking-wider select-none">
                <th className="py-3 px-3 w-10 text-center">No</th>
                <th
                  onClick={() => handleSort('kabupatenKota')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  <div className="flex items-center gap-1">
                    <span>Kabupaten/Kota</span>
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th
                  onClick={() => handleSort('provinsi')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  Provinsi
                </th>
                <th
                  onClick={() => handleSort('kategori')}
                  className="py-3 px-3 cursor-pointer hover:text-slate-900 dark:hover:text-white"
                >
                  Kuadran
                </th>

                {showColumns.fundamentalZ && (
                  <th
                    onClick={() => handleSort('fundamentalZ')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Fundamental (Z)
                  </th>
                )}

                {showColumns.residualZ && (
                  <th
                    onClick={() => handleSort('residualZ')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Residual (Z)
                  </th>
                )}

                {showColumns.actualQris && (
                  <th
                    onClick={() => handleSort('actualQrisMiliar')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Realisasi QRIS
                  </th>
                )}

                {showColumns.predictedQris && (
                  <th
                    onClick={() => handleSort('predictedQrisMiliar')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Prediksi OLS
                  </th>
                )}

                {showColumns.gap && (
                  <th
                    onClick={() => handleSort('gapQrisMiliar')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Gap
                  </th>
                )}

                {showColumns.wisatawan && (
                  <th
                    onClick={() => handleSort('wisatawan')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Wisatawan
                  </th>
                )}

                {showColumns.umkm && (
                  <th
                    onClick={() => handleSort('umkm')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    UMKM
                  </th>
                )}

                {showColumns.pengeluaran && (
                  <th
                    onClick={() => handleSort('pengeluaranPerKapita')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Pengeluaran
                  </th>
                )}

                {showColumns.internet && (
                  <th
                    onClick={() => handleSort('internetScore')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Internet
                  </th>
                )}

                {showColumns.pdrb && (
                  <th
                    onClick={() => handleSort('pdrbMiliar')}
                    className="py-3 px-3 text-right cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    PDRB
                  </th>
                )}

                {showColumns.priority && (
                  <th
                    onClick={() => handleSort('priority')}
                    className="py-3 px-3 text-center cursor-pointer hover:text-slate-900 dark:hover:text-white"
                  >
                    Prioritas
                  </th>
                )}

                <th className="py-3 px-3 text-center w-16">Aksi</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {paginatedData.map((region, idx) => {
                const conf = QUADRANT_CONFIG[region.kategori];
                const rowNumber = (currentPage - 1) * pageSize + idx + 1;

                return (
                  <tr
                    key={region.kabupatenKota}
                    className="hover:bg-slate-50/90 dark:hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="py-2.5 px-3 text-center font-mono text-slate-400 text-[11px]">
                      {rowNumber}
                    </td>

                    <td className="py-2.5 px-3 font-semibold text-slate-900 dark:text-white whitespace-nowrap">
                      {region.kabupatenKota}
                    </td>

                    <td className="py-2.5 px-3 text-slate-500 whitespace-nowrap text-[11px]">
                      {region.provinsi}
                    </td>

                    <td className="py-2.5 px-3 whitespace-nowrap">
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                        style={{
                          backgroundColor: `${conf.chartColor}20`,
                          color: conf.chartColor,
                        }}
                      >
                        {region.kategori}
                      </span>
                    </td>

                    {showColumns.fundamentalZ && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-800 dark:text-slate-200">
                        {region.fundamentalZ >= 0 ? `+${region.fundamentalZ.toFixed(2)}` : region.fundamentalZ.toFixed(2)}
                      </td>
                    )}

                    {showColumns.residualZ && (
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-800 dark:text-slate-200">
                        {region.residualZ >= 0 ? `+${region.residualZ.toFixed(2)}` : region.residualZ.toFixed(2)}
                      </td>
                    )}

                    {showColumns.actualQris && (
                      <td className="py-2.5 px-3 text-right font-mono font-bold text-slate-900 dark:text-white">
                        Rp {region.actualQrisMiliar.toLocaleString('id-ID')} M
                      </td>
                    )}

                    {showColumns.predictedQris && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                        Rp {region.predictedQrisMiliar.toLocaleString('id-ID')} M
                      </td>
                    )}

                    {showColumns.gap && (
                      <td
                        className={`py-2.5 px-3 text-right font-mono font-bold ${
                          region.gapQrisMiliar >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {region.gapQrisMiliar >= 0 ? `+${region.gapQrisMiliar}` : region.gapQrisMiliar} M
                      </td>
                    )}

                    {showColumns.wisatawan && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                        {region.wisatawan.toLocaleString('id-ID')}
                      </td>
                    )}

                    {showColumns.umkm && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                        {region.umkm.toLocaleString('id-ID')}
                      </td>
                    )}

                    {showColumns.pengeluaran && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                        Rp {(region.pengeluaranPerKapita / 1000000).toFixed(1)} jt
                      </td>
                    )}

                    {showColumns.internet && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                        {region.internetScore}
                      </td>
                    )}

                    {showColumns.pdrb && (
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600 dark:text-slate-400">
                        Rp {(region.pdrbMiliar / 1000).toFixed(1)} T
                      </td>
                    )}

                    {showColumns.priority && (
                      <td className="py-2.5 px-3 text-center whitespace-nowrap">
                        <span
                          className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                            region.priority === 'Critical'
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                              : region.priority === 'High'
                              ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                              : region.priority === 'Medium'
                              ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                              : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          }`}
                        >
                          {region.priority}
                        </span>
                      </td>
                    )}

                    <td className="py-2.5 px-3 text-center">
                      <button
                        onClick={() => onOpenDrawer(region)}
                        className="px-2 py-1 rounded bg-slate-100 dark:bg-slate-700 hover:bg-rose-50 text-slate-700 dark:text-slate-300 hover:text-rose-600 text-[11px] font-semibold transition-colors"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-500">Tampilkan per halaman:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded px-2 py-1"
            >
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={25}>25</option>
              <option value={59}>Semua (59)</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-500">
              Halaman {currentPage} dari {totalPages || 1}
            </span>
            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
                className="p-1 rounded border border-slate-200 dark:border-slate-700 disabled:opacity-40"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                disabled={currentPage === totalPages || totalPages === 0}
                onClick={() => setCurrentPage(currentPage + 1)}
                className="p-1 rounded border border-slate-200 dark:border-slate-700 disabled:opacity-40"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
