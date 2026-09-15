/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import { Sidebar } from './components/Sidebar';
import { GlobalHeader } from './components/GlobalHeader';
import { OverviewView } from './components/OverviewView';
import { QuadrantScatterPlot } from './components/QuadrantScatterPlot';
import { RegionalProfileView } from './components/RegionalProfileView';
import { RegionalProfileDrawer } from './components/RegionalProfileDrawer';
import { RegressionView } from './components/RegressionView';
import { PolicySimulatorView } from './components/PolicySimulatorView';
import { ValidationView } from './components/ValidationView';
import { PolicyPlaybookView } from './components/PolicyPlaybookView';
import { DataExplorerView } from './components/DataExplorerView';
import { REGIONS_DATA } from './data/qrisData';
import { NavTab, QuadrantCategory, Province, RegionData } from './types';
import { Landmark, ShieldAlert, Heart } from 'lucide-react';

export default function App() {
  // Navigation State (8 Core Modules)
  const [activeTab, setActiveTab] = useState<NavTab>('overview');

  // Layout Responsive States
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Global Cross-Filter States
  const [selectedCategory, setSelectedCategory] = useState<QuadrantCategory | 'ALL'>('ALL');
  const [selectedProvince, setSelectedProvince] = useState<Province | 'ALL'>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRegionName, setSelectedRegionName] = useState<string | null>(null);

  // Regional Profile Drawer State (Right-side 380-420px, non-modal)
  const [drawerRegion, setDrawerRegion] = useState<RegionData | null>(null);

  // Compare region selection passed into Profile View
  const [compareRegionTarget, setCompareRegionTarget] = useState<string | null>(null);

  // Filtered dataset based on global toolbar
  const activeFilteredRegions = useMemo(() => {
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

  const regionNames = useMemo(() => REGIONS_DATA.map((r) => r.kabupatenKota), []);

  const handleResetFilters = () => {
    setSelectedCategory('ALL');
    setSelectedProvince('ALL');
    setSearchQuery('');
    setSelectedRegionName(null);
  };

  // Open Region Drawer
  const handleOpenRegionDrawer = (region: RegionData) => {
    setDrawerRegion(region);
    setSelectedRegionName(region.kabupatenKota);
  };

  const handleSelectRegionByName = (name: string) => {
    setSelectedRegionName(name);
    const found = REGIONS_DATA.find((r) => r.kabupatenKota === name);
    if (found) {
      setDrawerRegion(found);
    }
  };

  // Export current active filtered dataset
  const handleExportCsv = () => {
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

    const rows = activeFilteredRegions.map((r, idx) => [
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

    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `qris-intelligence-${activeFilteredRegions.length}-wilayah.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 flex flex-row font-sans transition-colors overflow-x-hidden">
      {/* 1. Permanent Left Sidebar (Never Overlays Main Content on Desktop) */}
      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        collapsed={sidebarCollapsed}
        setCollapsed={setSidebarCollapsed}
        mobileOpen={mobileMenuOpen}
        setMobileOpen={setMobileMenuOpen}
        totalRegions={REGIONS_DATA.length}
      />

      {/* 2. Main Content Wrapper */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Global Header with Live Filter Controls & Autocomplete */}
        <GlobalHeader
          selectedProvince={selectedProvince}
          setSelectedProvince={setSelectedProvince}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onResetFilters={handleResetFilters}
          onExportCsv={handleExportCsv}
          activeCount={activeFilteredRegions.length}
          totalCount={REGIONS_DATA.length}
          onToggleMobileMenu={() => setMobileMenuOpen(!mobileMenuOpen)}
          regionNames={regionNames}
          onSelectRegion={handleSelectRegionByName}
        />

        {/* Dynamic Page Views (8 Modules) */}
        <main className="flex-1 w-full max-w-7xl mx-auto px-5 sm:px-8 lg:px-10 py-8 space-y-8">
          {activeTab === 'overview' && (
            <OverviewView
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('quadrant');
              }}
              onSelectRegion={handleSelectRegionByName}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'quadrant' && (
            <QuadrantScatterPlot
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              selectedProvince={selectedProvince}
              setSelectedProvince={setSelectedProvince}
              selectedRegion={selectedRegionName}
              onSelectRegion={handleSelectRegionByName}
            />
          )}

          {activeTab === 'profile' && (
            <RegionalProfileView
              initialRegion={selectedRegionName}
              onOpenDrawer={handleOpenRegionDrawer}
              onNavigateTab={(tab) => setActiveTab(tab)}
            />
          )}

          {activeTab === 'regression' && (
            <RegressionView onNavigateTab={(tab) => setActiveTab(tab)} />
          )}

          {activeTab === 'simulator' && (
            <PolicySimulatorView />
          )}

          {activeTab === 'diagnostics' && (
            <ValidationView />
          )}

          {activeTab === 'playbook' && (
            <PolicyPlaybookView
              onSelectCategory={(cat) => {
                setSelectedCategory(cat);
                setActiveTab('quadrant');
              }}
              onSelectProvince={(prov) => {
                setSelectedProvince(prov);
                setActiveTab('quadrant');
              }}
              onSelectRegion={handleSelectRegionByName}
            />
          )}

          {activeTab === 'explorer' && (
            <DataExplorerView
              onSelectRegion={handleSelectRegionByName}
              onOpenDrawer={handleOpenRegionDrawer}
            />
          )}
        </main>

        {/* Institutional Footer */}
        <footer className="border-t border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8 bg-white/70 dark:bg-slate-900/70 text-xs text-slate-500 dark:text-slate-400 mt-auto">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-lg bg-rose-600 flex items-center justify-center text-white font-bold text-xs">
                <Landmark className="w-3.5 h-3.5" />
              </div>
              <span className="font-semibold text-slate-800 dark:text-slate-200">
                QRIS Regional Intelligence Platform
              </span>
              <span>— Analisis Ekonometrika OLS Multivariat (N = 59 Wilayah)</span>
            </div>

            <div className="flex items-center gap-4 text-[11px]">
              <span>R² = 39.4% • F = 3.532 (p = 0.0019)</span>
              <span>•</span>
              <span>Jawa Timur | Kalimantan Barat | Kep. Riau</span>
            </div>
          </div>
        </footer>
      </div>

      {/* 3. Right-Side Regional Profile Drawer (Width 380-420px, leaves main view visible) */}
      <RegionalProfileDrawer
        region={drawerRegion}
        onClose={() => setDrawerRegion(null)}
        onOpenCompare={(name) => {
          setSelectedRegionName(name);
          setActiveTab('profile');
        }}
        onNavigateTab={(tab) => setActiveTab(tab)}
      />
    </div>
  );
}
