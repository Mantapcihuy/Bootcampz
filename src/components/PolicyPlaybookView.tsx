import React, { useState } from 'react';
import {
  BookOpen,
  Compass,
  AlertTriangle,
  CheckCircle2,
  TrendingUp,
  MapPin,
  Sparkles,
  Award,
  Layers,
  ShieldAlert,
  ChevronRight,
  BarChart3
} from 'lucide-react';
import { REGIONS_DATA, QUADRANT_CONFIG } from '../data/qrisData';
import { QuadrantCategory, PriorityLevel, Province } from '../types';

interface PolicyPlaybookViewProps {
  onSelectCategory?: (cat: QuadrantCategory) => void;
  onSelectProvince?: (prov: Province) => void;
  onSelectRegion?: (kabKota: string) => void;
}

export const PolicyPlaybookView: React.FC<PolicyPlaybookViewProps> = ({
  onSelectCategory,
  onSelectProvince,
  onSelectRegion,
}) => {
  const [activeTab, setActiveTab] = useState<'quadrants' | 'priority' | 'provinces'>('quadrants');

  // Provincial aggregations
  const provinces: Province[] = ['Jawa Timur', 'Kalimantan Barat', 'Kep. Riau'];

  const provinceStats = provinces.map((prov) => {
    const list = REGIONS_DATA.filter((r) => r.provinsi === prov);
    const totalActual = list.reduce((acc, r) => acc + r.actualQrisMiliar, 0);
    const totalPredicted = list.reduce((acc, r) => acc + r.predictedQrisMiliar, 0);
    const avgActual = totalActual / list.length;
    const avgFundamentalZ = list.reduce((acc, r) => acc + r.fundamentalZ, 0) / list.length;
    const avgResidualZ = list.reduce((acc, r) => acc + r.residualZ, 0) / list.length;

    // Counts per quadrant
    const q1 = list.filter((r) => r.kategori === 'Maju & Sesuai Potensi').length;
    const q2 = list.filter((r) => r.kategori === 'Over Develop').length;
    const q3 = list.filter((r) => r.kategori === 'Under Develop').length;
    const q4 = list.filter((r) => r.kategori === 'Potensi Belum Tergarap').length;

    return {
      prov,
      count: list.length,
      totalActual,
      avgActual,
      avgFundamentalZ,
      avgResidualZ,
      q1,
      q2,
      q3,
      q4,
      dominantQuadrant:
        prov === 'Jawa Timur'
          ? 'Over Develop & Maju'
          : prov === 'Kalimantan Barat'
          ? 'Potensi Belum Tergarap & Under'
          : 'Maju & Pariwisata',
    };
  });

  // Priority groupings
  const criticalList = REGIONS_DATA.filter((r) => r.priority === 'Critical');
  const highList = REGIONS_DATA.filter((r) => r.priority === 'High');
  const mediumList = REGIONS_DATA.filter((r) => r.priority === 'Medium');
  const lowList = REGIONS_DATA.filter((r) => r.priority === 'Low');

  return (
    <div className="space-y-6">
      {/* Playbook Header & Tabs */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              <span>Panduan Implementasi Kebijakan</span>
            </div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">
              Policy Playbook: Strategi & Matriks Prioritas Intervensi
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Pedoman alokasi program dan intervensi spesifik berdasarkan tipologi kuadran dan kapasitas regional
            </p>
          </div>

          {/* Sub Navigation */}
          <div className="inline-flex rounded-xl border border-slate-200 dark:border-slate-700 p-1 bg-slate-100 dark:bg-slate-900 self-start sm:self-auto text-xs font-semibold">
            <button
              onClick={() => setActiveTab('quadrants')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'quadrants'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Playbook Kuadran
            </button>
            <button
              onClick={() => setActiveTab('priority')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'priority'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Matriks Prioritas
            </button>
            <button
              onClick={() => setActiveTab('provinces')}
              className={`px-3 py-1.5 rounded-lg transition-all ${
                activeTab === 'provinces'
                  ? 'bg-white dark:bg-slate-800 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-500 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              Komparasi Provinsi
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'quadrants' && (
        /* 1. QUADRANT PLAYBOOK CARDS */
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Kuadran I */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-emerald-200 dark:border-emerald-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-emerald-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Kuadran I: Maju & Sesuai Potensi
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                12 Wilayah
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Karakteristik Wilayah:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Fundamental ekonomi kuat, destinasi wisata aktif, daya beli tinggi, dan adopsi QRIS melebihi rata-rata prediksi model OLS.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Tantangan Utama:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Saturasi pasar merchant besar, risiko cybersecurity, dan kebutuhan interoperabilitas antar-negara (cross-border).
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Strategi Intervensi:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                  <li>Integrasi QRIS Cross-Border di pusat perbelanjaan, transit wisatawan mancanegara, dan hotel berbintang.</li>
                  <li>Perluasan implementasi QRIS Tuntas (Tarik Tunai, Transfer, Setor) ke toko retail dan modern trade.</li>
                  <li>Digitalisasi penuh pajak daerah, retribusi parkir, dan layanan publik (Smart City).</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200">
                <strong className="block text-[11px] mb-0.5">Key Performance Indicator (KPI):</strong>
                Volume transaksi QRIS Cross-Border, adopsi QRIS Tuntas &gt; 35%, dan Zero Fraud Incident.
              </div>
            </div>
          </div>

          {/* Kuadran II */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-amber-200 dark:border-amber-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-amber-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Kuadran II: Over Develop
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                18 Wilayah
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Karakteristik Wilayah:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Fundamental ekonomi makro relatif terbatas, namun animo digital masyarakat tinggi sehingga transaksi melompat di atas estimasi.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Tantangan Utama:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Kerentanan penipuan barcode palsu, infrastruktur server jaringan yang rawan overload, dan kapasitas modal usaha UMKM.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Strategi Intervensi:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                  <li>Sosialisasi anti-fraud dan edukasi keamanan verifikasi nama merchant saat pembayaran.</li>
                  <li>Fasilitasi akses KUR Digital berbasis riwayat pembukuan dan perputaran kas di QRIS aktif.</li>
                  <li>Audit kapasitas bandwidth operator seluler pada titik-titik keramaian ekonomi.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200">
                <strong className="block text-[11px] mb-0.5">Key Performance Indicator (KPI):</strong>
                Rasio konversi merchant ke nasabah KUR perbankan, kepatuhan verifikasi QRIS, dan uptime jaringan 99.8%.
              </div>
            </div>
          </div>

          {/* Kuadran IV */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-blue-200 dark:border-blue-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Kuadran IV: Potensi Belum Tergarap (Target Utama)
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                17 Wilayah
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Karakteristik Wilayah:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Kapasitas ekonomi dan kunjungan wisatawan sangat tinggi, namun transaksi QRIS aktual masih di bawah potensi model OLS.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Tantangan Utama:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Dominasi kebiasaan transaksi tunai (cash-dependent culture), merchant enggan mendaftar, dan minimnya promosi lokal.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Strategi Intervensi:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                  <li>Mandatori onboarding QRIS di seluruh loket tiket wisata, parkir resmi pemda, dan sentra UMKM kuliner.</li>
                  <li>Kampanye cashback bersama bank mitra daerah dan insentif merchant MDR 0%.</li>
                  <li>Jemput bola registrasi NMID secara kolektif di pasar tradisional oleh tim perbankan.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-800 text-blue-900 dark:text-blue-200">
                <strong className="block text-[11px] mb-0.5">Key Performance Indicator (KPI):</strong>
                Penutupan gap transaksi sebesar +50% dalam 12 bulan, pertumbuhan merchant pariwisata terdaftar &gt; 40%.
              </div>
            </div>
          </div>

          {/* Kuadran III */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-rose-200 dark:border-rose-900 shadow-xs space-y-4">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500" />
                <h3 className="font-bold text-base text-slate-900 dark:text-white">
                  Kuadran III: Under Develop
                </h3>
              </div>
              <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                12 Wilayah
              </span>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Karakteristik Wilayah:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Fundamental ekonomi rendah, daerah terpencil/kepulauan/perbatasan, dan adopsi QRIS masih tahap awal.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Tantangan Utama:
                </span>
                <p className="text-slate-700 dark:text-slate-300">
                  Ketiadaan sinyal telekomunikasi (blank spot BTS 4G), rendahnya literasi digital, dan keterbatasan perbankan fisik.
                </p>
              </div>

              <div>
                <span className="font-bold text-slate-400 block uppercase text-[10px]">
                  Strategi Intervensi:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 dark:text-slate-300">
                  <li>Sinergi pembangunan menara BTS 4G bersama Kementerian Komdigi & BAKTI di desa perintis.</li>
                  <li>Pemberdayaan Agen Laku Pandai perbankan sebagai titik pusat transaksi dan edukasi masyarakat.</li>
                  <li>Penyaluran bantuan sosial non-tunai berbasis dompet digital atau rekening ponsel.</li>
                </ul>
              </div>

              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200">
                <strong className="block text-[11px] mb-0.5">Key Performance Indicator (KPI):</strong>
                Pengurangan blank spot BTS hingga 0% di pusat kecamatan, terbentuknya 100+ merchant perintis per kabupaten.
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'priority' && (
        /* 2. POLICY PRIORITY MATRIX (URGENCY VS POTENTIAL) */
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Critical Priority */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-blue-500 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-600 dark:text-blue-400">
                  Prioritas Kritis
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                  {criticalList.length} Wilayah
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Potensi Tinggi, Realisasi Rendah
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Memiliki modal ekonomi dan pariwisata kuat namun adopsi tertinggal. Potensi kenaikan volume terbesar jika diintervensi.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1 max-h-48 overflow-y-auto">
                {criticalList.map((r) => (
                  <div
                    key={r.kabupatenKota}
                    onClick={() => onSelectRegion?.(r.kabupatenKota)}
                    className="flex justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{r.kabupatenKota}</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">F: +{r.fundamentalZ.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* High Priority */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-rose-500 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-rose-600 dark:text-rose-400">
                  Prioritas Tinggi
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
                  {highList.length} Wilayah
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Inklusi & Infrastruktur Dasar
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Wilayah perintis dengan residu paling negatif dan kendala konektivitas sinyal BTS 4G.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1 max-h-48 overflow-y-auto">
                {highList.map((r) => (
                  <div
                    key={r.kabupatenKota}
                    onClick={() => onSelectRegion?.(r.kabupatenKota)}
                    className="flex justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{r.kabupatenKota}</span>
                    <span className="font-mono text-rose-600 dark:text-rose-400">R: {r.residualZ.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Medium Priority */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-amber-500 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-amber-600 dark:text-amber-400">
                  Prioritas Sedang
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300">
                  {mediumList.length} Wilayah
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Stabilitas & Edukasi Anti-Fraud
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Wilayah over develop yang memerlukan penguatan kapasitas modal, pembukuan digital, dan mitigasi kejahatan siber.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1 max-h-48 overflow-y-auto">
                {mediumList.slice(0, 8).map((r) => (
                  <div
                    key={r.kabupatenKota}
                    onClick={() => onSelectRegion?.(r.kabupatenKota)}
                    className="flex justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{r.kabupatenKota}</span>
                    <span className="font-mono text-amber-600 dark:text-amber-400">+{r.residualZ.toFixed(2)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Low Priority / Sustain */}
            <div className="bg-white dark:bg-slate-800 p-5 rounded-2xl border-2 border-emerald-500 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-600 dark:text-emerald-400">
                  Prioritas Pemeliharaan
                </span>
                <span className="px-2 py-0.5 rounded-full text-xs font-mono font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  {lowList.length} Wilayah
                </span>
              </div>
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Pengembangan Skala Lanjutan
              </h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-snug">
                Wilayah yang sudah mapan dalam adopsi transaksi QRIS. Fokus pada inovasi fitur lanjutan dan cross-border.
              </p>
              <div className="pt-2 border-t border-slate-100 dark:border-slate-700 space-y-1 max-h-48 overflow-y-auto">
                {lowList.slice(0, 8).map((r) => (
                  <div
                    key={r.kabupatenKota}
                    onClick={() => onSelectRegion?.(r.kabupatenKota)}
                    className="flex justify-between p-1.5 rounded hover:bg-slate-50 dark:hover:bg-slate-900 cursor-pointer text-xs"
                  >
                    <span className="font-medium text-slate-800 dark:text-slate-200">{r.kabupatenKota}</span>
                    <span className="font-mono text-emerald-600 dark:text-emerald-400">#{r.rankOverall}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'provinces' && (
        /* 3. PROVINCIAL COMPARISON & PROFILES */
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {provinceStats.map((p) => (
              <div
                key={p.prov}
                className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-xs space-y-4"
              >
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700 pb-3">
                  <div>
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                      {p.prov}
                    </h3>
                    <span className="text-xs text-slate-400 font-mono">
                      {p.count} Kabupaten/Kota
                    </span>
                  </div>
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300">
                    {p.dominantQuadrant}
                  </span>
                </div>

                {/* Metrics */}
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">Total Transaksi QRIS:</span>
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      Rp {p.totalActual.toLocaleString('id-ID')} Miliar
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">Rata-rata per Daerah:</span>
                    <span className="font-mono font-bold text-indigo-600 dark:text-indigo-400">
                      Rp {Math.round(p.avgActual).toLocaleString('id-ID')} Miliar
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">Rata-rata Fundamental Z:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {p.avgFundamentalZ >= 0 ? `+${p.avgFundamentalZ.toFixed(2)}` : p.avgFundamentalZ.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between p-2 rounded-lg bg-slate-50 dark:bg-slate-900">
                    <span className="text-slate-500">Rata-rata Residual Z:</span>
                    <span className="font-mono font-bold text-slate-800 dark:text-slate-200">
                      {p.avgResidualZ >= 0 ? `+${p.avgResidualZ.toFixed(2)}` : p.avgResidualZ.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Mini stacked quadrant proportion */}
                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Sebaran Kuadran ({p.count} wilayah)</span>
                  </div>
                  <div className="h-4 w-full rounded-full overflow-hidden flex bg-slate-100 dark:bg-slate-900">
                    <div style={{ width: `${(p.q1 / p.count) * 100}%` }} className="bg-emerald-500 h-full" title={`Q1: ${p.q1}`} />
                    <div style={{ width: `${(p.q2 / p.count) * 100}%` }} className="bg-amber-500 h-full" title={`Q2: ${p.q2}`} />
                    <div style={{ width: `${(p.q4 / p.count) * 100}%` }} className="bg-blue-500 h-full" title={`Q4: ${p.q4}`} />
                    <div style={{ width: `${(p.q3 / p.count) * 100}%` }} className="bg-rose-500 h-full" title={`Q3: ${p.q3}`} />
                  </div>
                  <div className="flex justify-between text-[9px] text-slate-400 mt-1">
                    <span className="text-emerald-600 font-bold">Q1: {p.q1}</span>
                    <span className="text-amber-600 font-bold">Q2: {p.q2}</span>
                    <span className="text-blue-600 font-bold">Q4: {p.q4}</span>
                    <span className="text-rose-600 font-bold">Q3: {p.q3}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
