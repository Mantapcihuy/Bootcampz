export type QuadrantCategory = 
  | 'Maju & Sesuai Potensi'
  | 'Over Develop'
  | 'Potensi Belum Tergarap'
  | 'Under Develop';

export type KMeansCategory = 
  | 'Overdeveloped (Realita > Potensi)'
  | 'Normal (Sesuai Potensi)'
  | 'Underdeveloped (Potensi > Realita)';

export type Tahap5Category = 'OVER DEVELOP' | 'NORMAL' | 'UNDER DEVELOP';

export type Province = 'Jawa Timur' | 'Kep. Riau' | 'Kalimantan Barat';

export type PriorityLevel = 'Critical' | 'High' | 'Medium' | 'Low';

export interface RegionData {
  id: string;
  kabupatenKota: string;
  provinsi: Province;
  fundamentalZ: number;
  residualZ: number;
  kategori: QuadrantCategory;
  kategoriTahap5: Tahap5Category;
  clusterKMeans: KMeansCategory;
  gapZ: number;
  // Metric attributes
  actualQrisMiliar: number; // Nilai transaksi QRIS aktual (Miliar Rp)
  predictedQrisMiliar: number; // Nilai prediksi model OLS (Miliar Rp)
  potentialQrisDuanMiliar: number; // Nilai potensi QRIS dengan Duan's smearing estimator (Miliar Rp)
  gapQrisMiliar: number; // Selisih aktual - prediksi (Miliar Rp)
  gapQrisDuanMiliar: number; // Selisih aktual - potensi Duan (Miliar Rp)
  wisatawan: number; // Jumlah wisatawan (jiwa)
  giniRatio: number; // Rasio Gini (0-1)
  hdi: number; // Indeks Pembangunan Manusia (IPM)
  pendudukMiskin: number; // Jumlah penduduk miskin (jiwa)
  pengeluaranPerKapita: number; // Pengeluaran per kapita (Rp/tahun)
  umkm: number; // Jumlah UMKM (unit)
  upahMinimum: number; // Upah Minimum Kab/Kota (Rp/bulan)
  internetScore: number; // Indeks penetrasi internet
  pdrbMiliar: number; // PDRB (Miliar Rp)
  usiaProduktif: number; // Jumlah usia produktif 15-64 tahun (jiwa)
  rankResidual: number;
  rankFundamental: number;
  rankOverall: number;
  percentile: number;
  priority: PriorityLevel;
  catatan?: string;
  rekomendasi?: string[];
}

export type NavTab = 
  | 'overview'
  | 'quadrant'
  | 'profile'
  | 'regression'
  | 'simulator'
  | 'diagnostics'
  | 'playbook'
  | 'explorer';

export interface RegressionCoefficient {
  variable: string;
  variableLabel: string;
  coef: number;
  stdErr: number;
  tStat: number;
  pValue: number;
  ciLower: number;
  ciUpper: number;
  vif: number;
  interpretation: string;
  isSignificant: boolean;
}

export interface DescriptiveStat {
  variable: string;
  min: number;
  mean: number;
  max: number;
  std: number;
  skewness: number;
  unit: string;
  isTransformedLn: boolean;
  minLn?: number;
  meanLn?: number;
  maxLn?: number;
  stdLn?: number;
}

export interface ModelMetrics {
  dependentVar: string;
  rSquared: number;
  adjRSquared: number;
  fStat: number;
  probF: number;
  obsCount: number;
  dfResiduals: number;
  dfModel: number;
  logLikelihood: number;
  aic: number;
  bic: number;
  durbinWatson: number;
  jarqueBeraStat: number;
  jarqueBeraP: number;
  shapiroWilkStat: number;
  shapiroWilkP: number;
  breuschPaganStat: number;
  breuschPaganP: number;
  resetStat: number;
  resetP: number;
}

export interface KMeansMetrics {
  k: number;
  randomState: number;
  silhouetteScore: number;
  inertia: number;
  calinskiHarabasz: number;
  daviesBouldin: number;
  smearFactor: number;
  reducedFormula: string;
  significantPredictor: string;
}

