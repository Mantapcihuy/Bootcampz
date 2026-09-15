import React, { useState } from 'react';
import { Landmark, Compass, CheckCircle2, ArrowRight, ShieldAlert, Sparkles, Building2, Smartphone } from 'lucide-react';
import { QUADRANT_CONFIG, REGIONS_DATA } from '../data/qrisData';
import { QuadrantCategory } from '../types';

interface PolicyRecommendationsProps {
  onSelectRegion: (name: string) => void;
}

export const PolicyRecommendations: React.FC<PolicyRecommendationsProps> = ({ onSelectRegion }) => {
  const [activeQuad, setActiveQuad] = useState<QuadrantCategory>('Maju & Sesuai Potensi');

  const conf = QUADRANT_CONFIG[activeQuad];
  const regionsInQuad = REGIONS_DATA.filter((r) => r.kategori === activeQuad);

  return (
    <div id="policy-recommendations-section" className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 text-xs font-semibold mb-2">
          <Landmark className="w-3.5 h-3.5" />
          <span>Policy Playbook Bank Indonesia & Pemda</span>
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white">
          Matriks Rekomendasi Kebijakan Berbasis Kuadran Wilayah
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-3xl leading-relaxed">
          Setiap kuadran memiliki karakteristik struktural dan tingkat adopsi digital yang berbeda. Intervensi kebijakan dirancang secara spesifik (targeted intervention) agar alokasi anggaran dan program digitalisasi tepat sasaran.
        </p>

        {/* Quadrant Selector Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 mt-5">
          {(Object.keys(QUADRANT_CONFIG) as QuadrantCategory[]).map((cat) => {
            const c = QUADRANT_CONFIG[cat];
            const isSelected = activeQuad === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveQuad(cat)}
                className={`p-3.5 rounded-xl text-left border transition-all ${
                  isSelected
                    ? `${c.badgeBg} ${c.badgeBorder} ring-2 ring-rose-500/50 shadow-sm`
                    : 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold tracking-wider opacity-75">
                    {c.quadrantCode.split(' ')[0]} {c.quadrantCode.split(' ')[1]}
                  </span>
                  <span className="text-xs font-bold font-mono">
                    {c.count} wilayah
                  </span>
                </div>
                <div className="font-bold text-sm">
                  {cat}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Selected Quadrant Deep Dive */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Strategic Roadmap */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${conf.badgeBg} ${conf.badgeBorder}`}>
                {conf.quadrantCode} • {activeQuad}
              </span>
            </div>

            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              Diagnosis Struktural Wilayah
            </h4>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-6">
              {conf.diagnosis}
            </p>

            <h4 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider mb-3">
              Pilar Aksi Kebijakan Prioritas:
            </h4>

            <div className="space-y-3">
              {conf.rekomendasi.map((rek, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700/80 flex items-start gap-3"
                >
                  <span className="w-6 h-6 rounded-full bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <div>
                    <span className="text-xs font-semibold text-slate-900 dark:text-white block mb-0.5">
                      {rek}
                    </span>
                    <span className="text-[11px] text-slate-500 dark:text-slate-400">
                      Kolaborasi instansi: Kantor Perwakilan Bank Indonesia (KPw BI), Bank Pembangunan Daerah (BPD), Dinas Pariwisata, dan Asosiasi Pengusaha.
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Regions in this quadrant */}
        <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-200 dark:border-slate-700 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-bold text-sm text-slate-900 dark:text-white">
                Daftar Daerah Tergolong ({regionsInQuad.length})
              </h4>
              <span className="text-[11px] text-slate-400">Klik untuk melihat</span>
            </div>

            <div className="max-h-96 overflow-y-auto space-y-2 pr-1">
              {regionsInQuad.map((r) => (
                <div
                  key={r.kabupatenKota}
                  onClick={() => onSelectRegion(r.kabupatenKota)}
                  className="p-2.5 rounded-lg bg-slate-50 dark:bg-slate-900/60 hover:bg-rose-50 dark:hover:bg-rose-950/40 border border-slate-200 dark:border-slate-700/60 cursor-pointer transition-colors flex items-center justify-between text-xs"
                >
                  <div>
                    <span className="font-semibold text-slate-800 dark:text-slate-200 block">
                      {r.kabupatenKota}
                    </span>
                    <span className="text-[10px] text-slate-400">{r.provinsi}</span>
                  </div>
                  <div className="text-right">
                    <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                      Z_res: {r.residualZ >= 0 ? `+${r.residualZ.toFixed(2)}` : r.residualZ.toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="pt-4 mt-4 border-t border-slate-100 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
            Penyusunan target QRIS tahunan disarankan menyesuaikan kategori kuadran ini guna menghindari target yang under-estimate atau over-stretch.
          </div>
        </div>
      </div>
    </div>
  );
};
