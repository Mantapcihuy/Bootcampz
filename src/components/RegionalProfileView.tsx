import React, { useState, useMemo } from 'react';
import {
  MapPin,
  GitCompare,
  TrendingUp,
  Award,
  Compass,
  Users,
  Store,
  Wallet,
  Wifi,
  BarChart3,
  Sparkles,
  Plus,
  Trash2,
  Check,
  Search,
  Filter
} from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { RegionData, Province, QuadrantCategory } from '../types';

interface RegionalProfileViewProps {
  initialRegion?: string | null;
  onOpenDrawer: (region: RegionData) => void;
  onNavigateTab: (tab: any) => void;
}

export const RegionalProfileView: React.FC<RegionalProfileViewProps> = ({
  initialRegion,
  onOpenDrawer,
  onNavigateTab,
}) => {
  const [selectedRegionName, setSelectedRegionName] = useState<string>(
    initialRegion || 'Surabaya'
  );
  const [comparisonList, setComparisonList] = useState<string[]>([
    'Surabaya',
    'Malang',
    'Sidoarjo',
  ]);
  const [activeTab, setActiveTab] = useState<'profile' | 'compare'>('profile');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterProv, setFilterProv] = useState<Province | 'ALL'>('ALL');

  // Selected single region object
  const currentRegion = useMemo(() => {
    return (
      REGIONS_DATA.find((r) => r.kabupatenKota === selectedRegionName) ||
      REGIONS_DATA[0]
    );
  }, [selectedRegionName]);

  // Regions for comparison
  const comparedRegions = useMemo(() => {
    return comparisonList
      .map((name) => REGIONS_DATA.find((r) => r.kabupatenKota === name))
      .filter((r): r is RegionData => Boolean(r));
  }, [comparisonList]);

  // Filtered list for selection
  const filteredList = useMemo(() => {
    return REGIONS_DATA.filter((r) => {
      const matchSearch = r.kabupatenKota
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchProv = filterProv === 'ALL' || r.provinsi === filterProv;
      return matchSearch && matchProv;
    });
  }, [searchQuery, filterProv]);

  const handleToggleCompare = (name: string) => {
    if (comparisonList.includes(name)) {
      if (comparisonList.length > 1) {
        setComparisonList(comparisonList.filter((n) => n !== name));
      }
    } else {
      if (comparisonList.length < 3) {
        setComparisonList([...comparisonList, name]);
      } else {
        // Replace last item
        setComparisonList([comparisonList[0], comparisonList[1], name]);
      }
    }
  };

  const conf = QUADRANT_CONFIG[currentRegion.kategori];

  return (
    <div className="space-y-6">
      {/* Top Header & Sub-tab Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
        <div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
            Eksplorasi Profil & Komparasi Wilayah
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Analisis diagnostik mendalam per kabupaten/kota dan perbandingan langsung (head-to-head 2–3 wilayah)
          </p>
        </div>

        {/* View Mode Toggle */}
        <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 p-1 bg-slate-100 dark:bg-slate-900 self-start sm:self-auto">
          <button
            onClick={() => setActiveTab('profile')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'profile'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>Profil Tunggal</span>
          </button>
          <button
            onClick={() => setActiveTab('compare')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all flex items-center gap-1.5 ${
              activeTab === 'compare'
                ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
            }`}
          >
            <GitCompare className="w-3.5 h-3.5" />
            <span>Komparasi (2–3 Wilayah)</span>
          </button>
        </div>
      </div>

      {activeTab === 'profile' ? (
        /* SINGLE REGION PROFILE VIEW */
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column: Region Selector List */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-col h-[680px]">
            <div className="mb-3 space-y-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Cari wilayah..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-lg border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-rose-500"
                />
              </div>

              {/* Province filter pills */}
              <div className="flex gap-1 overflow-x-auto pb-1 text-[11px]">
                {(['ALL', 'Jawa Timur', 'Kalimantan Barat', 'Kep. Riau'] as const).map(
                  (prov) => (
                    <button
                      key={prov}
                      onClick={() => setFilterProv(prov)}
                      className={`px-2 py-0.5 rounded-md whitespace-nowrap transition-colors font-medium ${
                        filterProv === prov
                          ? 'bg-slate-900 text-white dark:bg-white dark:text-slate-900'
                          : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
                      }`}
                    >
                      {prov === 'ALL' ? 'Semua' : prov.replace('Kalimantan', 'Kal.').replace('Kepulauan', 'Kep.')}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto space-y-1.5 pr-1">
              {filteredList.map((r) => {
                const isSelected = r.kabupatenKota === selectedRegionName;
                const c = QUADRANT_CONFIG[r.kategori];
                return (
                  <div
                    key={r.kabupatenKota}
                    onClick={() => setSelectedRegionName(r.kabupatenKota)}
                    className={`p-2.5 rounded-xl cursor-pointer transition-all border text-xs flex items-center justify-between ${
                      isSelected
                        ? `${c.badgeBg} ${c.badgeBorder} ring-2 ring-rose-500/40 shadow-xs font-semibold`
                        : 'border-slate-200/60 dark:border-slate-700/60 bg-slate-50/70 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="text-slate-900 dark:text-white font-medium">
                        {r.kabupatenKota}
                      </div>
                      <div className="text-[10px] text-slate-400">{r.provinsi}</div>
                    </div>
                    <div className="text-right">
                      <span
                        className="text-[10px] px-1.5 py-0.5 rounded-full font-bold block mb-0.5"
                        style={{
                          backgroundColor: `${c.chartColor}20`,
                          color: c.chartColor,
                        }}
                      >
                        {r.kategori.split(' ')[0]}
                      </span>
                      <span className="font-mono text-[10px] text-slate-500">
                        Z: {r.residualZ >= 0 ? `+${r.residualZ.toFixed(2)}` : r.residualZ.toFixed(2)}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right 2 Columns: Full Detail Card for Selected Region */}
          <div className="lg:col-span-2 space-y-4">
            {/* Header Identity Card */}
            <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span
                      className={`text-xs font-bold px-3 py-1 rounded-full border ${conf.badgeBg} ${conf.badgeBorder}`}
                    >
                      {currentRegion.kategori}
                    </span>
                    <span
                      className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        currentRegion.clusterKMeans === 'Overdeveloped'
                          ? 'bg-cyan-100 text-cyan-800 dark:bg-cyan-950 dark:text-cyan-300'
                          : currentRegion.clusterKMeans === 'Underdeveloped'
                          ? 'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                          : 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                      }`}
                    >
                      Cluster: {currentRegion.clusterKMeans}
                    </span>
                    <span className="text-xs text-slate-500 font-medium">
                      Provinsi {currentRegion.provinsi}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                    {currentRegion.kabupatenKota}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => {
                      handleToggleCompare(currentRegion.kabupatenKota);
                      setActiveTab('compare');
                    }}
                    className="px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-700 text-xs font-semibold hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300 transition-colors flex items-center gap-1.5"
                  >
                    <GitCompare className="w-3.5 h-3.5 text-slate-400" />
                    <span>Tambahkan ke Komparasi</span>
                  </button>

                  <button
                    onClick={() => onOpenDrawer(currentRegion)}
                    className="px-3 py-1.5 rounded-xl bg-rose-600 hover:bg-rose-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1"
                  >
                    <span>Buka Drawer</span>
                  </button>
                </div>
              </div>

              {/* Ranks & Position Bar */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Peringkat Residual
                  </span>
                  <span className="text-lg font-bold font-mono text-indigo-600 dark:text-indigo-400">
                    #{currentRegion.rankResidual}{' '}
                    <span className="text-xs text-slate-400 font-normal">/ 59</span>
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Peringkat Fundamental
                  </span>
                  <span className="text-lg font-bold font-mono text-emerald-600 dark:text-emerald-400">
                    #{currentRegion.rankFundamental}{' '}
                    <span className="text-xs text-slate-400 font-normal">/ 59</span>
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Peringkat Gabungan
                  </span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    #{currentRegion.rankOverall}
                  </span>
                </div>

                <div className="text-center">
                  <span className="text-[10px] text-slate-400 uppercase font-bold block mb-0.5">
                    Persentil Nasional
                  </span>
                  <span className="text-lg font-bold font-mono text-rose-600 dark:text-rose-400">
                    {currentRegion.percentile}%
                  </span>
                </div>
              </div>

              {/* Diagnosis text */}
              <div className="mt-4 p-4 rounded-xl bg-slate-50 dark:bg-slate-900/50 border border-slate-200/80 dark:border-slate-700/80">
                <div className="flex items-center gap-1.5 text-xs font-bold text-slate-900 dark:text-white mb-1">
                  <Compass className="w-3.5 h-3.5 text-indigo-500" />
                  <span>Diagnosis Struktural Wilayah</span>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                  {conf.diagnosis}
                </p>
              </div>
            </div>

            {/* Financial vs Fundamental Metric Grids */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Financial Metrics */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Estimasi Transaksi QRIS (Tahunan)
                </h4>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Realisasi Aktual QRIS</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    Rp {currentRegion.actualQrisMiliar.toLocaleString('id-ID')} Miliar
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80">
                  <span className="text-[10px] text-slate-400 block">Prediksi Model OLS</span>
                  <span className="text-lg font-bold font-mono text-slate-900 dark:text-white">
                    Rp {currentRegion.predictedQrisMiliar.toLocaleString('id-ID')} Miliar
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
                  <span className="text-[10px] text-indigo-600 dark:text-indigo-400 font-semibold block">Potensi (Duan's Smearing)</span>
                  <span className="text-lg font-bold font-mono text-indigo-700 dark:text-indigo-300">
                    Rp {currentRegion.potentialQrisDuanMiliar.toLocaleString('id-ID')} Miliar
                  </span>
                </div>

                <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-slate-400 block">Selisih Gap</span>
                    <span
                      className={`text-base font-bold font-mono ${
                        currentRegion.gapQrisMiliar >= 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {currentRegion.gapQrisMiliar >= 0
                        ? `+Rp ${currentRegion.gapQrisMiliar.toLocaleString('id-ID')} M`
                        : `-Rp ${Math.abs(currentRegion.gapQrisMiliar).toLocaleString('id-ID')} M`}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block">Skor Z Residual</span>
                    <span className="text-base font-bold font-mono text-slate-800 dark:text-slate-200">
                      {currentRegion.residualZ >= 0
                        ? `+${currentRegion.residualZ.toFixed(3)}`
                        : currentRegion.residualZ.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Fundamental Metrics */}
              <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-2.5">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Variabel Pendorong Ekonomi
                </h4>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Users className="w-3.5 h-3.5 text-rose-500" />
                    <span>Total Wisatawan (Driver Utama)</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {currentRegion.wisatawan.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Store className="w-3.5 h-3.5 text-amber-500" />
                    <span>Jumlah Unit UMKM</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {currentRegion.umkm.toLocaleString('id-ID')}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Wallet className="w-3.5 h-3.5 text-emerald-500" />
                    <span>Pengeluaran per Kapita</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    Rp {(currentRegion.pengeluaranPerKapita / 1000000).toFixed(2)} jt
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <Wifi className="w-3.5 h-3.5 text-indigo-500" />
                    <span>Penetrasi Internet</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {currentRegion.internetScore}
                  </span>
                </div>

                <div className="flex items-center justify-between p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                  <span className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
                    <BarChart3 className="w-3.5 h-3.5 text-blue-500" />
                    <span>PDRB Daerah</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    Rp {(currentRegion.pdrbMiliar / 1000).toFixed(1)} Triliun
                  </span>
                </div>

                {/* Socio-Economic Grid */}
                <div className="grid grid-cols-2 gap-2 pt-1">
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">Gini Ratio</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {currentRegion.giniRatio.toFixed(3)}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">IPM / HDI</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {currentRegion.hdi.toFixed(2)}
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">Penduduk Miskin</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {currentRegion.pendudukMiskin.toLocaleString('id-ID')} org
                    </span>
                  </div>
                  <div className="p-2 rounded-lg bg-slate-50 dark:bg-slate-900 border border-slate-200/60 dark:border-slate-700/60 text-xs">
                    <span className="text-[10px] text-slate-400 block">Upah Minimum</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      Rp {(currentRegion.upahMinimum / 1000000).toFixed(2)} jt
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* 4 Action Recommendations */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-amber-500" />
                <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                  4 Rekomendasi Kebijakan Prioritas ({currentRegion.kabupatenKota})
                </h4>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {(currentRegion.rekomendasi || conf.rekomendasi).map((rek, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200/80 dark:border-slate-700/80 flex items-start gap-2.5"
                  >
                    <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span className="text-xs text-slate-700 dark:text-slate-300 leading-snug">
                      {rek}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* REGIONAL COMPARISON VIEW (COMPARE 2-3 REGIONS) */
        <div className="space-y-6">
          {/* Comparison Selector Chips */}
          <div className="bg-white dark:bg-slate-800 p-4 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-semibold text-slate-500">
                Wilayah Dibandingkan (Maksimal 3):
              </span>
              {comparisonList.map((name) => {
                const r = REGIONS_DATA.find((item) => item.kabupatenKota === name);
                const confItem = r ? QUADRANT_CONFIG[r.kategori] : null;
                return (
                  <span
                    key={name}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${
                      confItem ? `${confItem.badgeBg} ${confItem.badgeBorder}` : 'bg-slate-100'
                    }`}
                  >
                    <span>{name}</span>
                    {comparisonList.length > 1 && (
                      <button
                        onClick={() => handleToggleCompare(name)}
                        className="hover:text-rose-600 transition-colors"
                        title="Hapus dari komparasi"
                      >
                        ×
                      </button>
                    )}
                  </span>
                );
              })}
            </div>

            {/* Quick add dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-slate-400">Pilih Wilayah:</span>
              <select
                onChange={(e) => {
                  if (e.target.value) {
                    handleToggleCompare(e.target.value);
                  }
                }}
                defaultValue=""
                className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 text-xs text-slate-800 dark:text-slate-200 focus:outline-none"
              >
                <option value="" disabled>
                  + Tambah Daerah...
                </option>
                {REGIONS_DATA.map((r) => (
                  <option
                    key={r.kabupatenKota}
                    value={r.kabupatenKota}
                    disabled={comparisonList.includes(r.kabupatenKota)}
                  >
                    {r.kabupatenKota} ({r.provinsi})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Comparison Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {comparedRegions.map((region) => {
              const c = QUADRANT_CONFIG[region.kategori];
              return (
                <div
                  key={region.kabupatenKota}
                  className="bg-white dark:bg-slate-800 rounded-2xl p-5 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4"
                >
                  <div className="border-b border-slate-100 dark:border-slate-700 pb-3">
                    <div className="flex items-center justify-between mb-1">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${c.badgeBg} ${c.badgeBorder}`}
                      >
                        {region.kategori}
                      </span>
                      <span className="text-xs text-slate-400 font-medium">
                        {region.provinsi}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-slate-900 dark:text-white">
                      {region.kabupatenKota}
                    </h4>
                  </div>

                  {/* Key comparison metrics */}
                  <div className="space-y-2 text-xs">
                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Skor Fundamental (Z)</span>
                      <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                        {region.fundamentalZ >= 0 ? `+${region.fundamentalZ.toFixed(2)}` : region.fundamentalZ.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Skor Residual (Z)</span>
                      <span className="font-mono font-bold text-cyan-600 dark:text-cyan-400">
                        {region.residualZ >= 0 ? `+${region.residualZ.toFixed(2)}` : region.residualZ.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Realisasi QRIS</span>
                      <span className="font-mono font-bold text-slate-900 dark:text-white">
                        Rp {region.actualQrisMiliar.toLocaleString('id-ID')} M
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Prediksi Model</span>
                      <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                        Rp {region.predictedQrisMiliar.toLocaleString('id-ID')} M
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Selisih Gap</span>
                      <span
                        className={`font-mono font-bold ${
                          region.gapQrisMiliar >= 0 ? 'text-emerald-600' : 'text-rose-600'
                        }`}
                      >
                        {region.gapQrisMiliar >= 0 ? `+Rp ${region.gapQrisMiliar} M` : `-Rp ${Math.abs(region.gapQrisMiliar)} M`}
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Wisatawan</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {region.wisatawan.toLocaleString('id-ID')} org
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">UMKM</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {region.umkm.toLocaleString('id-ID')} unit
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">Penetrasi Internet</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        {region.internetScore} indeks
                      </span>
                    </div>

                    <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                      <span className="text-slate-500">PDRB Daerah</span>
                      <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                        Rp {(region.pdrbMiliar / 1000).toFixed(1)} T
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      setSelectedRegionName(region.kabupatenKota);
                      setActiveTab('profile');
                    }}
                    className="w-full py-2 rounded-xl bg-slate-100 dark:bg-slate-700 hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-800 dark:text-slate-200 hover:text-rose-600 text-xs font-semibold transition-colors"
                  >
                    Buka Profil Lengkap
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
