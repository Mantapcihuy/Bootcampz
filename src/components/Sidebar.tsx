import React from 'react';
import {
  LayoutDashboard,
  ScatterChart,
  MapPin,
  TrendingUp,
  Sliders,
  ShieldCheck,
  BookOpen,
  TableProperties,
  Landmark,
  Layers,
  ChevronLeft,
  ChevronRight,
  Menu
} from 'lucide-react';
import { NavTab } from '../types';

interface SidebarProps {
  activeTab: NavTab;
  setActiveTab: (tab: NavTab) => void;
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
  totalRegions: number;
}

interface MenuItem {
  id: NavTab;
  number: string;
  label: string;
  shortLabel: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string;
}

const MENU_ITEMS: MenuItem[] = [
  { id: 'overview', number: '01', label: 'Overview', shortLabel: 'Overview', icon: LayoutDashboard },
  { id: 'quadrant', number: '02', label: 'Matriks Kuadran', shortLabel: 'Kuadran', icon: ScatterChart, badge: '59' },
  { id: 'profile', number: '03', label: 'Profil Wilayah', shortLabel: 'Profil', icon: MapPin },
  { id: 'regression', number: '04', label: 'Model Regresi', shortLabel: 'Regresi', icon: TrendingUp, badge: 'OLS' },
  { id: 'simulator', number: '05', label: 'Policy Simulator', shortLabel: 'Simulasi', icon: Sliders, badge: 'What-If' },
  { id: 'diagnostics', number: '06', label: 'Statistik & Validasi', shortLabel: 'Statistik', icon: ShieldCheck },
  { id: 'playbook', number: '07', label: 'Policy Playbook', shortLabel: 'Playbook', icon: BookOpen },
  { id: 'explorer', number: '08', label: 'Data Explorer', shortLabel: 'Data', icon: TableProperties, badge: 'CSV' },
];

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  setActiveTab,
  collapsed,
  setCollapsed,
  mobileOpen,
  setMobileOpen,
  totalRegions,
}) => {
  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-slate-900/60 z-40 lg:hidden backdrop-blur-xs"
          onClick={() => setMobileOpen(false)}
          aria-label="Tutup Menu Navigasi"
        />
      )}

      {/* Main Sidebar (Permanent Layout Grid on Desktop, Never Overlays Content) */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 lg:z-auto bg-slate-900 text-slate-200 border-r border-slate-800 transition-all duration-200 flex flex-col shrink-0 ${
          collapsed ? 'w-20' : 'w-64 xl:w-72'
        } ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Sidebar Brand Header */}
        <div className="h-18 px-4 flex items-center justify-between border-b border-slate-800/80 shrink-0">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-rose-600 via-rose-500 to-indigo-600 flex items-center justify-center text-white font-bold shadow-md shadow-rose-950/40 shrink-0 ring-1 ring-white/15">
              <Landmark className="w-5 h-5" />
            </div>
            {!collapsed && (
              <div className="min-w-0">
                <div className="text-sm font-bold text-white tracking-tight truncate flex items-center gap-1.5">
                  <span>QRIS Intelligence</span>
                </div>
                <span className="text-[10px] text-slate-400 block truncate uppercase tracking-wider font-semibold">
                  Regional Decision Support
                </span>
              </div>
            )}
          </div>

          {/* Collapse toggle on desktop */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="hidden lg:flex p-1.5 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
            title={collapsed ? 'Perluas Sidebar' : 'Perkecil Sidebar'}
            aria-label="Toggle Sidebar"
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Navigation List */}
        <div className="flex-1 py-4 px-3 space-y-1.5 overflow-y-auto">
          {!collapsed && (
            <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              Modul Analisis
            </div>
          )}

          {MENU_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setActiveTab(item.id);
                  setMobileOpen(false);
                }}
                title={collapsed ? item.label : undefined}
                className={`w-full group flex items-center gap-3 px-3.5 py-2.5 rounded-2xl text-left transition-all text-xs font-semibold relative ${
                  isActive
                    ? 'bg-rose-600 text-white shadow-md shadow-rose-950/50'
                    : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-100'
                } ${collapsed ? 'justify-center px-2' : ''}`}
              >
                <div className="flex items-center gap-2.5 shrink-0">
                  <Icon className={`w-4 h-4 transition-colors ${isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'}`} />
                  {!collapsed && (
                    <span className={`text-[10px] font-mono font-bold tracking-wider ${isActive ? 'text-rose-200' : 'text-slate-500'}`}>
                      {item.number}
                    </span>
                  )}
                </div>

                {!collapsed && (
                  <div className="flex-1 flex items-center justify-between min-w-0">
                    <span className="truncate tracking-tight">{item.label}</span>
                    {item.badge && (
                      <span
                        className={`text-[9px] font-mono px-2 py-0.5 rounded-full font-bold uppercase ${
                          isActive
                            ? 'bg-white/20 text-white'
                            : 'bg-slate-800 text-slate-400 border border-slate-700/60'
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Sidebar Footer Info */}
        {!collapsed ? (
          <div className="p-4 border-t border-slate-800/80 bg-slate-900/40 shrink-0">
            <div className="bg-slate-800/60 rounded-2xl p-3.5 border border-slate-700/50">
              <div className="flex items-center justify-between text-xs text-slate-300 font-semibold mb-1">
                <span>Model Ekonometrika</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-950/90 text-emerald-300 font-mono font-bold border border-emerald-800/70">
                  OLS Sig.
                </span>
              </div>
              <div className="text-[11px] text-slate-400 leading-snug">
                R² = 39.4% • F = 3.532<br />
                59 Wilayah (Jatim, Kepri, Kalbar)
              </div>
            </div>
          </div>
        ) : (
          <div className="p-3 border-t border-slate-800/80 flex justify-center shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 ring-4 ring-emerald-500/20" title="Model Siap" />
          </div>
        )}
      </aside>
    </>
  );
};
