import React, { useState, useMemo } from 'react';
import { Search, ArrowUpDown, ArrowUp, ArrowDown, Download, Eye, MapPin } from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { RegionData, QuadrantCategory, Province } from '../types';

interface RegionTableProps {
  onSelectRegion: (name: string) => void;
  onExportCsv: () => void;
}

type SortField = 'kabupatenKota' | 'provinsi' | 'fundamentalZ' | 'residualZ' | 'kategori';
type SortDirection = 'asc' | 'desc';

export const RegionTable: React.FC<RegionTableProps> = ({ onSelectRegion, onExportCsv }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<QuadrantCategory | 'ALL'>('ALL');
  const [selectedProvince, setSelectedProvince] = useState<Province | 'ALL'>('ALL');
  const [sortField, setSortField] = useState<SortField>('residualZ');
  const [sortDir, setSortDir] = useState<SortDirection>('desc');
  const [pageSize, setPageSize] = useState<number>(20);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir(field === 'residualZ' || field === 'fundamentalZ' ? 'desc' : 'asc');
    }
  };

  const filteredAndSortedData = useMemo(() => {
    let result = REGIONS_DATA.filter((r) => {
      const matchCat = selectedCategory === 'ALL' || r.kategori === selectedCategory;
      const matchProv = selectedProvince === 'ALL' || r.provinsi === selectedProvince;
      const matchSearch =
        search.trim() === '' ||
        r.kabupatenKota.toLowerCase().includes(search.toLowerCase()) ||
        r.provinsi.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchProv && matchSearch;
    });

    result.sort((a, b) => {
      let comparison = 0;
      if (sortField === 'fundamentalZ' || sortField === 'residualZ') {
        comparison = a[sortField] - b[sortField];
      } else {
        comparison = a[sortField].localeCompare(b[sortField]);
      }
      return sortDir === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [selectedCategory, selectedProvince, search, sortField, sortDir]);

  // Pagination
  const totalPages = pageSize === -1 ? 1 : Math.ceil(filteredAndSortedData.length / pageSize);
  const paginatedData = useMemo(() => {
    if (pageSize === -1) return filteredAndSortedData;
    const start = (currentPage - 1) * pageSize;
    return filteredAndSortedData.slice(start, start + pageSize);
  }, [filteredAndSortedData, currentPage, pageSize]);

  return (
    <div id="region-table-section" className="space-y-4">
      {/* Table Filters & Header */}
      <div className="bg-white dark:bg-slate-800 p-4 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900 dark:text-white">
              Daftar Lengkap Klasifikasi 59 Kabupaten / Kota
            </h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Hasil kalkulasi skor fundamental Z dan deviasi residual Z berdasarkan data transaksi QRIS.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              id="btn-export-table-csv"
              onClick={onExportCsv}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 transition-all shadow-xs"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Ekspor CSV</span>
            </button>
          </div>
        </div>

        {/* Filter Controls Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 pt-2 border-t border-slate-100 dark:border-slate-700/60 text-xs">
          {/* Search */}
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari daerah..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
            />
          </div>

          {/* Category Filter */}
          <select
            value={selectedCategory}
            onChange={(e) => {
              setSelectedCategory(e.target.value as any);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="ALL">Semua Kategori Kuadran (59)</option>
            {(Object.keys(QUADRANT_CONFIG) as QuadrantCategory[]).map((cat) => (
              <option key={cat} value={cat}>
                {cat} ({QUADRANT_CONFIG[cat].count})
              </option>
            ))}
          </select>

          {/* Province Filter */}
          <select
            value={selectedProvince}
            onChange={(e) => {
              setSelectedProvince(e.target.value as any);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs focus:outline-none focus:ring-2 focus:ring-rose-500"
          >
            <option value="ALL">Semua Provinsi (59)</option>
            <option value="Jawa Timur">Jawa Timur (38)</option>
            <option value="Kalimantan Barat">Kalimantan Barat (14)</option>
            <option value="Kep. Riau">Kep. Riau (7)</option>
          </select>

          {/* Page Size Select */}
          <div className="flex items-center justify-end gap-2">
            <span className="text-slate-400 text-[11px]">Tampilkan:</span>
            <select
              value={pageSize}
              onChange={(e) => {
                setPageSize(Number(e.target.value));
                setCurrentPage(1);
              }}
              className="px-2.5 py-1.5 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs"
            >
              <option value={15}>15 baris</option>
              <option value={20}>20 baris</option>
              <option value={30}>30 baris</option>
              <option value={-1}>Semua (59)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead className="bg-slate-50 dark:bg-slate-900 text-slate-600 dark:text-slate-300 font-semibold uppercase tracking-wider text-[11px] border-b border-slate-200 dark:border-slate-700">
              <tr>
                <th className="py-3 px-4 w-12 text-center">#</th>
                <th
                  onClick={() => handleSort('kabupatenKota')}
                  className="py-3 px-4 cursor-pointer hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Kabupaten / Kota</span>
                    {sortField === 'kabupatenKota' && (
                      sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('provinsi')}
                  className="py-3 px-3 cursor-pointer hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Provinsi</span>
                    {sortField === 'provinsi' && (
                      sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('fundamentalZ')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Fundamental Z</span>
                    {sortField === 'fundamentalZ' && (
                      sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('residualZ')}
                  className="py-3 px-3 text-right cursor-pointer hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center justify-end gap-1.5">
                    <span>Residual Z</span>
                    {sortField === 'residualZ' && (
                      sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th
                  onClick={() => handleSort('kategori')}
                  className="py-3 px-4 cursor-pointer hover:text-rose-600 transition-colors"
                >
                  <div className="flex items-center gap-1.5">
                    <span>Kategori Kuadran</span>
                    {sortField === 'kategori' && (
                      sortDir === 'asc' ? <ArrowUp className="w-3 h-3" /> : <ArrowDown className="w-3 h-3" />
                    )}
                  </div>
                </th>
                <th className="py-3 px-4 text-center">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60">
              {paginatedData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-slate-400">
                    Tidak ada wilayah yang cocok dengan kriteria pencarian/filter.
                  </td>
                </tr>
              ) : (
                paginatedData.map((row, idx) => {
                  const conf = QUADRANT_CONFIG[row.kategori];
                  const absoluteIndex = pageSize === -1 ? idx + 1 : (currentPage - 1) * pageSize + idx + 1;

                  return (
                    <tr
                      key={row.kabupatenKota}
                      onClick={() => onSelectRegion(row.kabupatenKota)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-750 cursor-pointer transition-colors"
                    >
                      <td className="py-3 px-4 text-center font-mono text-slate-400 text-[11px]">
                        {absoluteIndex}
                      </td>
                      <td className="py-3 px-4 font-bold text-slate-900 dark:text-white">
                        {row.kabupatenKota}
                      </td>
                      <td className="py-3 px-3 text-slate-600 dark:text-slate-300">
                        {row.provinsi}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-medium text-slate-800 dark:text-slate-200">
                        {row.fundamentalZ >= 0 ? `+${row.fundamentalZ.toFixed(3)}` : row.fundamentalZ.toFixed(3)}
                      </td>
                      <td className="py-3 px-3 text-right font-mono font-bold">
                        <span className={row.residualZ >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-rose-600 dark:text-rose-400'}>
                          {row.residualZ >= 0 ? `+${row.residualZ.toFixed(3)}` : row.residualZ.toFixed(3)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`inline-flex items-center gap-1.5 text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${conf.badgeBg} ${conf.badgeBorder}`}>
                          <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: conf.chartColor }} />
                          <span>{row.kategori}</span>
                        </span>
                      </td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onSelectRegion(row.kabupatenKota);
                          }}
                          className="p-1.5 rounded-lg bg-slate-100 dark:bg-slate-700 hover:bg-rose-100 dark:hover:bg-rose-950/80 text-slate-600 dark:text-slate-300 hover:text-rose-600 transition-colors"
                          title="Buka detail profil & rekomendasi"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Footer */}
        {pageSize !== -1 && totalPages > 1 && (
          <div className="p-4 border-t border-slate-200 dark:border-slate-700 flex items-center justify-between text-xs text-slate-500">
            <span>
              Menampilkan {Math.min((currentPage - 1) * pageSize + 1, filteredAndSortedData.length)} - {Math.min(currentPage * pageSize, filteredAndSortedData.length)} dari {filteredAndSortedData.length} daerah
            </span>

            <div className="flex items-center gap-1">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                className="px-2.5 py-1 rounded border border-slate-300 dark:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Sebelumnya
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button
                  key={num}
                  onClick={() => setCurrentPage(num)}
                  className={`w-7 h-7 rounded text-xs font-semibold ${
                    currentPage === num
                      ? 'bg-rose-600 text-white'
                      : 'border border-slate-200 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {num}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                className="px-2.5 py-1 rounded border border-slate-300 dark:border-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Selanjutnya
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
