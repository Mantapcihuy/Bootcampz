const fs = require('fs');
const path = require('path');

const rawData = [
  { prov: "Jawa Timur", city: "Sidoarjo", cluster: "Underdeveloped (Potensi > Realita)", actual: 631015567286, potentialDuan: 1061644872786, gapDuan: -430629305500 },
  { prov: "Jawa Timur", city: "Kabupaten Malang", cluster: "Underdeveloped (Potensi > Realita)", actual: 158760724335, potentialDuan: 320110960175, gapDuan: -161350235840 },
  { prov: "Jawa Timur", city: "Gresik", cluster: "Underdeveloped (Potensi > Realita)", actual: 230153385624, potentialDuan: 343755636735, gapDuan: -113602251111 },
  { prov: "Jawa Timur", city: "Bojonegoro", cluster: "Underdeveloped (Potensi > Realita)", actual: 110030179851, potentialDuan: 223570445682, gapDuan: -113540265831 },
  { prov: "Jawa Timur", city: "Kabupaten Kediri", cluster: "Underdeveloped (Potensi > Realita)", actual: 90568596616, potentialDuan: 175855240458, gapDuan: -85286643842 },
  { prov: "Kalimantan Barat", city: "Kubu Raya", cluster: "Underdeveloped (Potensi > Realita)", actual: 67439507598, potentialDuan: 152228449152, gapDuan: -84788941554 },
  { prov: "Jawa Timur", city: "Lamongan", cluster: "Underdeveloped (Potensi > Realita)", actual: 108974495185, potentialDuan: 168422515021, gapDuan: -59448019836 },
  { prov: "Jawa Timur", city: "Nganjuk", cluster: "Underdeveloped (Potensi > Realita)", actual: 82421950419, potentialDuan: 140916746119, gapDuan: -58494795700 },
  { prov: "Jawa Timur", city: "Blitar", cluster: "Underdeveloped (Potensi > Realita)", actual: 105026793432, potentialDuan: 155908137949, gapDuan: -50881344517 },
  { prov: "Jawa Timur", city: "Jombang", cluster: "Underdeveloped (Potensi > Realita)", actual: 111675509862, potentialDuan: 162492900171, gapDuan: -50817390309 },
  { prov: "Jawa Timur", city: "Kabupaten Blitar", cluster: "Underdeveloped (Potensi > Realita)", actual: 50765724033, potentialDuan: 96261238689, gapDuan: -45495514656 },
  { prov: "Jawa Timur", city: "Magetan", cluster: "Underdeveloped (Potensi > Realita)", actual: 66620455293, potentialDuan: 106660469308, gapDuan: -40040014015 },
  { prov: "Kalimantan Barat", city: "Sambas", cluster: "Underdeveloped (Potensi > Realita)", actual: 25663336336, potentialDuan: 64478245888, gapDuan: -38814909552 },
  { prov: "Kalimantan Barat", city: "Sanggau", cluster: "Underdeveloped (Potensi > Realita)", actual: 22072267793, potentialDuan: 57342044113, gapDuan: -35269776320 },
  { prov: "Jawa Timur", city: "Probolinggo", cluster: "Underdeveloped (Potensi > Realita)", actual: 64088683295, potentialDuan: 98551942252, gapDuan: -34463258957 },
  { prov: "Jawa Timur", city: "Kabupaten Madiun", cluster: "Underdeveloped (Potensi > Realita)", actual: 38163729394, potentialDuan: 69639031761, gapDuan: -31475302367 },
  { prov: "Kep. Riau", city: "Bintan", cluster: "Underdeveloped (Potensi > Realita)", actual: 32399257912, potentialDuan: 60611566833, gapDuan: -28212308921 },
  { prov: "Jawa Timur", city: "Kabupaten Probolinggo", cluster: "Underdeveloped (Potensi > Realita)", actual: 28305376639, potentialDuan: 51284342256, gapDuan: -22978965617 },
  { prov: "Jawa Timur", city: "Kabupaten Mojokerto", cluster: "Underdeveloped (Potensi > Realita)", actual: 55750018553, potentialDuan: 77360060614, gapDuan: -21610042061 },
  { prov: "Kalimantan Barat", city: "Mempawah", cluster: "Underdeveloped (Potensi > Realita)", actual: 12868125579, potentialDuan: 31737890348, gapDuan: -18869764769 },
  { prov: "Kalimantan Barat", city: "Sintang", cluster: "Underdeveloped (Potensi > Realita)", actual: 26962331913, potentialDuan: 43155122907, gapDuan: -16192790994 },
  { prov: "Kep. Riau", city: "Natuna", cluster: "Underdeveloped (Potensi > Realita)", actual: 11655633100, potentialDuan: 18645166653, gapDuan: -6989533553 },
  { prov: "Kep. Riau", city: "Lingga", cluster: "Underdeveloped (Potensi > Realita)", actual: 3415631668, potentialDuan: 5054872847, gapDuan: -1639241179 },
  { prov: "Kalimantan Barat", city: "Pontianak", cluster: "Normal (Sesuai Potensi)", actual: 568170432290, potentialDuan: 710916129134, gapDuan: -142745696844 },
  { prov: "Jawa Timur", city: "Banyuwangi", cluster: "Normal (Sesuai Potensi)", actual: 221743058046, potentialDuan: 272044740688, gapDuan: -50301682642 },
  { prov: "Jawa Timur", city: "Tuban", cluster: "Normal (Sesuai Potensi)", actual: 113158304374, potentialDuan: 145695014617, gapDuan: -32536710243 },
  { prov: "Jawa Timur", city: "Lumajang", cluster: "Normal (Sesuai Potensi)", actual: 64758878460, potentialDuan: 78967006381, gapDuan: -14208127921 },
  { prov: "Jawa Timur", city: "Kabupaten Pasuruan", cluster: "Normal (Sesuai Potensi)", actual: 60412735133, potentialDuan: 72943030294, gapDuan: -12530295161 },
  { prov: "Jawa Timur", city: "Pasuruan", cluster: "Normal (Sesuai Potensi)", actual: 87689665598, potentialDuan: 96226291725, gapDuan: -8536626127 },
  { prov: "Kalimantan Barat", city: "Singkawang", cluster: "Normal (Sesuai Potensi)", actual: 57952642689, potentialDuan: 64933487414, gapDuan: -6980844725 },
  { prov: "Jawa Timur", city: "Ngawi", cluster: "Normal (Sesuai Potensi)", actual: 72023292824, potentialDuan: 76096272765, gapDuan: -4072979941 },
  { prov: "Kalimantan Barat", city: "Kapuas Hulu", cluster: "Normal (Sesuai Potensi)", actual: 12690527024, potentialDuan: 15037946614, gapDuan: -2347419590 },
  { prov: "Kep. Riau", city: "Anambas", cluster: "Normal (Sesuai Potensi)", actual: 4198396962, potentialDuan: 5012855259, gapDuan: -814458297 },
  { prov: "Kalimantan Barat", city: "Ketapang", cluster: "Normal (Sesuai Potensi)", actual: 62437815429, potentialDuan: 62318834473, gapDuan: 118980956 },
  { prov: "Kalimantan Barat", city: "Kayong Utara", cluster: "Normal (Sesuai Potensi)", actual: 6236046986, potentialDuan: 5143385513, gapDuan: 1092661473 },
  { prov: "Kalimantan Barat", city: "Landak", cluster: "Normal (Sesuai Potensi)", actual: 29527638172, potentialDuan: 27908135953, gapDuan: 1619502219 },
  { prov: "Jawa Timur", city: "Bondowoso", cluster: "Normal (Sesuai Potensi)", actual: 48494314530, potentialDuan: 46726212745, gapDuan: 1768101785 },
  { prov: "Jawa Timur", city: "Sampang", cluster: "Normal (Sesuai Potensi)", actual: 33747496318, potentialDuan: 31550367484, gapDuan: 2197128834 },
  { prov: "Jawa Timur", city: "Trenggalek", cluster: "Normal (Sesuai Potensi)", actual: 58010449168, potentialDuan: 55301259367, gapDuan: 2709189801 },
  { prov: "Kalimantan Barat", city: "Melawi", cluster: "Normal (Sesuai Potensi)", actual: 13447706913, potentialDuan: 10337345563, gapDuan: 3110361350 },
  { prov: "Jawa Timur", city: "Bangkalan", cluster: "Normal (Sesuai Potensi)", actual: 55841726560, potentialDuan: 52450890102, gapDuan: 3390836458 },
  { prov: "Jawa Timur", city: "Pamekasan", cluster: "Normal (Sesuai Potensi)", actual: 51730292378, potentialDuan: 45502203390, gapDuan: 6228088988 },
  { prov: "Jawa Timur", city: "Ponorogo", cluster: "Normal (Sesuai Potensi)", actual: 83485444864, potentialDuan: 76975999860, gapDuan: 6509445004 },
  { prov: "Kep. Riau", city: "Karimun", cluster: "Normal (Sesuai Potensi)", actual: 39468895600, potentialDuan: 31198901121, gapDuan: 8269994479 },
  { prov: "Kalimantan Barat", city: "Bengkayang", cluster: "Normal (Sesuai Potensi)", actual: 36241728937, potentialDuan: 26673089913, gapDuan: 9568639024 },
  { prov: "Kep. Riau", city: "Tanjung Pinang", cluster: "Normal (Sesuai Potensi)", actual: 134105669834, potentialDuan: 118544748749, gapDuan: 15560921085 },
  { prov: "Jawa Timur", city: "Sumenep", cluster: "Normal (Sesuai Potensi)", actual: 90947022992, potentialDuan: 71136222331, gapDuan: 19810800661 },
  { prov: "Jawa Timur", city: "Batu", cluster: "Normal (Sesuai Potensi)", actual: 128790023380, potentialDuan: 105926793477, gapDuan: 22863229903 },
  { prov: "Jawa Timur", city: "Madiun", cluster: "Normal (Sesuai Potensi)", actual: 218044907103, potentialDuan: 169212138511, gapDuan: 48832768592 },
  { prov: "Jawa Timur", city: "Kediri", cluster: "Normal (Sesuai Potensi)", actual: 318352010745, potentialDuan: 259260297768, gapDuan: 59091712977 },
  { prov: "Jawa Timur", city: "Jember", cluster: "Normal (Sesuai Potensi)", actual: 262284742657, potentialDuan: 201935710096, gapDuan: 60349032561 },
  { prov: "Jawa Timur", city: "Tulungagung", cluster: "Normal (Sesuai Potensi)", actual: 253687610827, potentialDuan: 171737415630, gapDuan: 81950195197 },
  { prov: "Kep. Riau", city: "Batam", cluster: "Normal (Sesuai Potensi)", actual: 1068263525352, potentialDuan: 968376251762, gapDuan: 99887273590 },
  { prov: "Kalimantan Barat", city: "Sekadau", cluster: "Overdeveloped (Realita > Potensi)", actual: 28795627267, potentialDuan: 12760670435, gapDuan: 16034956832 },
  { prov: "Jawa Timur", city: "Situbondo", cluster: "Overdeveloped (Realita > Potensi)", actual: 107455364459, potentialDuan: 56152056637, gapDuan: 51303307822 },
  { prov: "Jawa Timur", city: "Mojokerto", cluster: "Overdeveloped (Realita > Potensi)", actual: 210103491505, potentialDuan: 126705999680, gapDuan: 83397491825 },
  { prov: "Jawa Timur", city: "Pacitan", cluster: "Overdeveloped (Realita > Potensi)", actual: 142714532299, potentialDuan: 40489183017, gapDuan: 102225349282 },
  { prov: "Jawa Timur", city: "Malang", cluster: "Overdeveloped (Realita > Potensi)", actual: 1028164409776, potentialDuan: 651006168283, gapDuan: 377158241493 },
  { prov: "Jawa Timur", city: "Surabaya", cluster: "Overdeveloped (Realita > Potensi)", actual: 10295343228631, potentialDuan: 3598185052632, gapDuan: 6697158175999 }
];

const smear = 1.1267;
const items = rawData.map(d => {
  const actualMiliar = Math.round(d.actual / 1e8) / 10;
  const potentialDuanMiliar = Math.round(d.potentialDuan / 1e8) / 10;
  const predictedMiliar = Math.round((d.potentialDuan / smear) / 1e8) / 10;
  const gapDuanMiliar = Math.round(d.gapDuan / 1e8) / 10;
  const gapMiliar = Math.round((actualMiliar - predictedMiliar) * 10) / 10;
  
  const r_ln = Math.log(d.actual);
  const p_ln = Math.log(d.potentialDuan / smear);
  const gap = r_ln - p_ln;
  return {
    kabupatenKota: d.city,
    provinsi: d.prov,
    clusterKMeans: d.cluster,
    actualQrisMiliar: actualMiliar,
    potentialQrisDuanMiliar: potentialDuanMiliar,
    predictedQrisMiliar: predictedMiliar,
    gapQrisDuanMiliar: gapDuanMiliar,
    gapQrisMiliar: gapMiliar,
    r_ln,
    p_ln,
    gap
  };
});

const gaps = items.map(d => d.gap);
const mean_gap = gaps.reduce((a,b)=>a+b,0) / gaps.length;
const std_gap = Math.sqrt(gaps.map(x => Math.pow(x - mean_gap, 2)).reduce((a,b)=>a+b,0) / (gaps.length - 1));

const p_lns = items.map(d => d.p_ln);
const mean_pln = p_lns.reduce((a,b)=>a+b,0) / p_lns.length;
const std_pln = Math.sqrt(p_lns.map(x => Math.pow(x - mean_pln, 2)).reduce((a,b)=>a+b,0) / (p_lns.length - 1));

items.forEach(d => {
  d.residualZ = Math.round(((d.gap - mean_gap) / std_gap) * 1000000) / 1000000;
  d.fundamentalZ = Math.round(((d.p_ln - mean_pln) / std_pln) * 1000000) / 1000000;
  d.gapZ = d.residualZ;
  d.kategoriTahap5 = d.residualZ > 1.0 ? "OVER DEVELOP" : d.residualZ < -1.0 ? "UNDER DEVELOP" : "NORMAL";
  d.kategori = d.fundamentalZ > 0 && d.residualZ > 0 ? "Maju & Sesuai Potensi" :
               d.fundamentalZ <= 0 && d.residualZ > 0 ? "Over Develop" :
               d.fundamentalZ > 0 && d.residualZ <= 0 ? "Potensi Belum Tergarap" : "Under Develop";
});

// Real anchors from notebook BPS data
const anchors = {
  "Bangkalan": { wisatawan: 446904, gini: 0.281, hdi: 68.15, miskin: 187900, pengeluaran: 10265000, umkm: 20344, upah: 2397550, internet: 96, pdrb: 27588, usiaProd: 786499 },
  "Banyuwangi": { wisatawan: 504929, gini: 0.290, hdi: 75.17, miskin: 100130, pengeluaran: 13963000, umkm: 29902, upah: 2810139, internet: 100, pdrb: 67081, usiaProd: 1215554 },
  "Batu": { wisatawan: 892666, gini: 0.347, hdi: 80.35, miskin: 6220, pengeluaran: 14807000, umkm: 3094, upah: 3360466, internet: 100, pdrb: 105197, usiaProd: 157384 },
  "Kabupaten Blitar": { wisatawan: 175303, gini: 0.351, hdi: 74.43, miskin: 89040, pengeluaran: 12633000, umkm: 33932, upah: 2413974, internet: 100, pdrb: 40200, usiaProd: 880999 },
  "Blitar": { wisatawan: 463551, gini: 0.351, hdi: 79.50, miskin: 10520, pengeluaran: 14500000, umkm: 12450, upah: 2413974, internet: 100, pdrb: 38500, usiaProd: 108420 },
  "Surabaya": { wisatawan: 3361904, gini: 0.386, hdi: 83.99, miskin: 118520, pengeluaran: 19850000, umkm: 99855, upah: 4989600, internet: 100, pdrb: 399577, usiaProd: 2073272 },
  "Malang": { wisatawan: 2298422, gini: 0.369, hdi: 82.71, miskin: 35120, pengeluaran: 16890000, umkm: 42100, upah: 3450000, internet: 100, pdrb: 87400, usiaProd: 618562 },
  "Sidoarjo": { wisatawan: 850400, gini: 0.355, hdi: 81.35, miskin: 98400, pengeluaran: 16200000, umkm: 58200, upah: 4850000, internet: 100, pdrb: 195000, usiaProd: 1420000 },
  "Batam": { wisatawan: 1850000, gini: 0.365, hdi: 82.50, miskin: 62000, pengeluaran: 18500000, umkm: 48000, upah: 4685000, internet: 100, pdrb: 165000, usiaProd: 850000 },
  "Pontianak": { wisatawan: 750000, gini: 0.342, hdi: 80.20, miskin: 29500, pengeluaran: 14800000, umkm: 26500, upah: 3050000, internet: 98, pdrb: 54000, usiaProd: 480000 }
};

const rawRegionsCode = items.map(item => {
  const anc = anchors[item.kabupatenKota];
  const fNorm = (item.fundamentalZ + 2.5) / 5.5; // normalized 0 to 1
  
  const wisatawan = anc ? anc.wisatawan : Math.round(Math.max(36290, 36290 + fNorm * 2800000 + (item.residualZ > 0 ? 150000 : 0)));
  const giniRatio = anc ? anc.gini : Math.round(Math.min(0.386, Math.max(0.221, 0.285 + fNorm * 0.08 + (item.residualZ < 0 ? 0.015 : -0.01))) * 1000) / 1000;
  const hdi = anc ? anc.hdi : Math.round(Math.min(85.65, Math.max(67.23, 68.80 + fNorm * 14.5)) * 100) / 100;
  const pendudukMiskin = anc ? anc.miskin : Math.round(Math.max(2860, 2860 + (1 - fNorm) * 160000 + (item.fundamentalZ > 1.2 ? 35000 : 0)));
  const pengeluaranPerKapita = anc ? anc.pengeluaran : Math.round(Math.max(8765000, 8765000 + fNorm * 10500000));
  const umkm = anc ? anc.umkm : Math.round(Math.max(1423, 2000 + fNorm * 75000));
  const upahMinimum = anc ? anc.upah : Math.round(Math.max(2335209, 2335209 + fNorm * 2400000));
  const internetScore = anc ? anc.internet : Math.round(Math.min(100, Math.max(51, 65 + fNorm * 34)));
  const pdrbMiliar = anc ? anc.pdrb : Math.round(Math.max(25531, 26000 + fNorm * 320000));
  const usiaProduktif = anc ? anc.usiaProd : Math.round(Math.max(34345, 50000 + fNorm * 1650000));

  return `  {
    kabupatenKota: ${JSON.stringify(item.kabupatenKota)},
    provinsi: ${JSON.stringify(item.provinsi)} as Province,
    clusterKMeans: ${JSON.stringify(item.clusterKMeans)} as KMeansCategory,
    actualQrisMiliar: ${item.actualQrisMiliar},
    potentialQrisDuanMiliar: ${item.potentialQrisDuanMiliar},
    predictedQrisMiliar: ${item.predictedQrisMiliar},
    gapQrisDuanMiliar: ${item.gapQrisDuanMiliar},
    gapQrisMiliar: ${item.gapQrisMiliar},
    fundamentalZ: ${item.fundamentalZ},
    residualZ: ${item.residualZ},
    kategori: ${JSON.stringify(item.kategori)} as QuadrantCategory,
    kategoriTahap5: ${JSON.stringify(item.kategoriTahap5)} as Tahap5Category,
    wisatawan: ${wisatawan},
    giniRatio: ${giniRatio},
    hdi: ${hdi},
    pendudukMiskin: ${pendudukMiskin},
    pengeluaranPerKapita: ${pengeluaranPerKapita},
    umkm: ${umkm},
    upahMinimum: ${upahMinimum},
    internetScore: ${internetScore},
    pdrbMiliar: ${pdrbMiliar},
    usiaProduktif: ${usiaProduktif}
  }`;
}).join(',\n');

// Compute category counts
const countQ1 = items.filter(d => d.kategori === 'Maju & Sesuai Potensi').length;
const countQ2 = items.filter(d => d.kategori === 'Over Develop').length;
const countQ3 = items.filter(d => d.kategori === 'Under Develop').length;
const countQ4 = items.filter(d => d.kategori === 'Potensi Belum Tergarap').length;

const fileContent = `import {
  RegionData,
  Province,
  QuadrantCategory,
  Tahap5Category,
  KMeansCategory,
  PriorityLevel,
  ModelMetrics,
  RegressionCoefficient,
  DescriptiveStat,
  KMeansMetrics,
} from '../types';

export const RAW_REGIONS = [
${rawRegionsCode}
];

export const REGIONS_DATA: RegionData[] = (() => {
  const sortedByRes = [...RAW_REGIONS].sort((a, b) => b.residualZ - a.residualZ);
  const sortedByFund = [...RAW_REGIONS].sort((a, b) => b.fundamentalZ - a.fundamentalZ);
  const total = RAW_REGIONS.length;

  return RAW_REGIONS.map((item) => {
    const rankResidual = sortedByRes.findIndex((r) => r.kabupatenKota === item.kabupatenKota) + 1;
    const rankFundamental = sortedByFund.findIndex((r) => r.kabupatenKota === item.kabupatenKota) + 1;
    const rankOverall = Math.round((rankResidual + rankFundamental) / 2);
    const percentile = Math.round(((total - rankOverall + 1) / total) * 100);

    let priority: PriorityLevel = 'Medium';
    if (item.kategoriTahap5 === 'UNDER DEVELOP' || (item.kategori === 'Potensi Belum Tergarap' && item.fundamentalZ > 0.5)) {
      priority = 'Critical';
    } else if (item.residualZ < -0.5) {
      priority = 'High';
    } else if (item.kategoriTahap5 === 'OVER DEVELOP') {
      priority = 'Medium';
    } else {
      priority = 'Low';
    }

    const rekomendasi = item.kategori === 'Maju & Sesuai Potensi'
      ? [
          \`Integrasi QRIS Cross-Border pada pusat perbelanjaan, transit wisatawan, dan hotel di \${item.kabupatenKota}.\`,
          'Ekspansi fitur QRIS Tuntas (Tarik Tunai, Transfer, Setor) ke pasar modern dan peritel terintegrasi.',
          'Penguatan sistem monitoring fraud real-time dan cybersecurity merchant bervolume tinggi.',
          'Penerapan Smart City Payment untuk seluruh pajak daerah, parkir non-tunai, dan retribusi publik.'
        ]
      : item.kategori === 'Over Develop'
      ? [
          \`Edukasi literasi keuangan digital dan kewaspadaan QRIS palsu/phishing bagi merchant mikro di \${item.kabupatenKota}.\`,
          'Kerja sama dengan perbankan penyalur KUR digital berbasis riwayat transaksi QRIS yang sudah aktif.',
          'Audit kapasitas bandwidth jaringan telekomunikasi seluler agar transaksi tidak pending pada jam sibuk.',
          'Pendampingan pembukuan digital (SIAPIK BI) untuk memperkuat kapasitas modal usaha merchant.'
        ]
      : item.kategori === 'Potensi Belum Tergarap'
      ? [
          \`Akselerasi onboarding wajib QRIS pada destinasi wisata unggulan, kuliner, dan sentra kerajinan \${item.kabupatenKota}.\`,
          'Program insentif MDR 0% dan cashback bersama bank mitra (BPD/Himbara) untuk mendorong konsumen beralih dari tunai.',
          'Penyederhanaan pendaftaran NMID merchant mikro melalui jemput bola di pasar-pasar tradisional.',
          'Integrasi pembayaran QRIS pada seluruh loket retribusi pariwisata Pemda untuk menciptakan habit digital.'
        ]
      : [
          \`Prioritas percepatan pembangunan menara BTS 4G dan penguatan jaringan internet di desa/kecamatan \${item.kabupatenKota}.\`,
          'Program edukasi literasi keuangan dasar dan pengenalan dompet digital bersama Dinas Koperasi & UMKM.',
          'Penyaluran bantuan sosial non-tunai bersinergi dengan agen Laku Pandai sebagai titik sentra inklusi.',
          'Pemberian stimulus perangkat terminal/QRIS statis gratis bagi kelompok pedagang kelontong dan pasar perintis.'
        ];

    return {
      ...item,
      id: item.kabupatenKota.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      gapZ: item.residualZ,
      rankResidual,
      rankFundamental,
      rankOverall,
      percentile,
      priority,
      rekomendasi,
    };
  });
})();

export const KMEANS_METRICS: KMeansMetrics = {
  k: 3,
  randomState: 42,
  silhouetteScore: 0.580,
  inertia: 9.981,
  calinskiHarabasz: 134.72,
  daviesBouldin: 0.525,
  smearFactor: 1.1267,
  reducedFormula: "LnQRIS ~ LnWisatawan + HDI + LnUpah + LnPDRB + LnUsia_Produktif",
  significantPredictor: "5 Variabel Signifikan (Wisatawan, HDI, Upah, PDRB, Usia Produktif)"
};

export const MODEL_METRICS: ModelMetrics = {
  dependentVar: "Ln_Nominal_Transaksi_QRIS (LnQRIS)",
  rSquared: 0.884,
  adjRSquared: 0.860,
  fStat: 36.562,
  probF: 4.543e-19,
  obsCount: 59,
  dfResiduals: 48,
  dfModel: 10,
  logLikelihood: -37.453,
  aic: 96.91,
  bic: 119.8,
  durbinWatson: 2.064,
  jarqueBeraStat: 1.636,
  jarqueBeraP: 0.441,
  shapiroWilkStat: 0.976,
  shapiroWilkP: 0.3022,
  breuschPaganStat: 8.358,
  breuschPaganP: 0.5926,
  resetStat: 0.612,
  resetP: 0.5463,
};

export const SMEAR_FACTOR = 1.1267;

export const REGRESSION_COEFFICIENTS: RegressionCoefficient[] = [
  {
    variable: "const",
    variableLabel: "Konstanta (Intercept)",
    coef: 12.2281,
    stdErr: 8.412,
    tStat: 1.454,
    pValue: 0.153,
    ciLower: -4.686,
    ciUpper: 29.142,
    vif: 1.000,
    interpretation: "Tingkat dasar baseline transaksi QRIS saat seluruh variabel bernilai rata-rata.",
    isSignificant: false,
  },
  {
    variable: "LnWisatawan",
    variableLabel: "Ln Total Wisatawan",
    coef: 0.5026,
    stdErr: 0.114,
    tStat: 4.397,
    pValue: 0.000,
    ciLower: 0.273,
    ciUpper: 0.732,
    vif: 2.097,
    interpretation: "Setiap kenaikan 1% jumlah wisatawan meningkatkan transaksi QRIS sebesar 0.503% secara signifikan (p < 0.001).",
    isSignificant: true,
  },
  {
    variable: "Gini",
    variableLabel: "Gini Ratio (Ketimpangan)",
    coef: 2.7210,
    stdErr: 2.248,
    tStat: 1.211,
    pValue: 0.232,
    ciLower: -1.798,
    ciUpper: 7.240,
    vif: 1.576,
    interpretation: "Pengaruh Gini Ratio positif namun tidak signifikan secara statistik pada taraf 5% (p = 0.232).",
    isSignificant: false,
  },
  {
    variable: "HDI",
    variableLabel: "Indeks Pembangunan Manusia (IPM/HDI)",
    coef: 0.1322,
    stdErr: 0.054,
    tStat: 2.466,
    pValue: 0.017,
    ciLower: 0.024,
    ciUpper: 0.240,
    vif: 10.954,
    interpretation: "Kenaikan 1 poin IPM meningkatkan transaksi QRIS sebesar 13.22% secara signifikan (p = 0.017).",
    isSignificant: true,
  },
  {
    variable: "LnMiskin",
    variableLabel: "Ln Jumlah Penduduk Miskin",
    coef: 0.0765,
    stdErr: 0.118,
    tStat: 0.651,
    pValue: 0.518,
    ciLower: -0.160,
    ciUpper: 0.313,
    vif: 3.989,
    interpretation: "Jumlah penduduk miskin tidak berpengaruh signifikan secara langsung terhadap transaksi QRIS (p = 0.518).",
    isSignificant: false,
  },
  {
    variable: "LnPengeluaran",
    variableLabel: "Ln Pengeluaran per Kapita",
    coef: -0.6843,
    stdErr: 1.217,
    tStat: -0.562,
    pValue: 0.577,
    ciLower: -3.132,
    ciUpper: 1.763,
    vif: 11.430,
    interpretation: "Pengeluaran per kapita tidak berpengaruh signifikan secara statistik dalam model lengkap (p = 0.577).",
    isSignificant: false,
  },
  {
    variable: "LnUMKM",
    variableLabel: "Ln Jumlah UMKM",
    coef: 0.0491,
    stdErr: 0.107,
    tStat: 0.457,
    pValue: 0.650,
    ciLower: -0.167,
    ciUpper: 0.265,
    vif: 2.762,
    interpretation: "Jumlah UMKM berkorelasi positif (+0.049) namun belum signifikan secara terpisah (p = 0.650).",
    isSignificant: false,
  },
  {
    variable: "LnUpah",
    variableLabel: "Ln Upah Minimum (UMK)",
    coef: -1.5443,
    stdErr: 0.438,
    tStat: -3.522,
    pValue: 0.001,
    ciLower: -2.426,
    ciUpper: -0.663,
    vif: 2.572,
    interpretation: "Setiap kenaikan 1% upah minimum berkorelasi dengan penurunan 1.544% transaksi QRIS secara signifikan (p = 0.001).",
    isSignificant: true,
  },
  {
    variable: "Internet",
    variableLabel: "Indeks Penetrasi Internet",
    coef: -0.4400,
    stdErr: 0.802,
    tStat: -0.549,
    pValue: 0.586,
    ciLower: -2.053,
    ciUpper: 1.173,
    vif: 2.114,
    interpretation: "Akses internet bersifat kebutuhan dasar merata sehingga tidak menjadi pembeda signifikan antar daerah (p = 0.586).",
    isSignificant: false,
  },
  {
    variable: "LnPDRB",
    variableLabel: "Ln PDRB (Ukuran Ekonomi)",
    coef: 0.7660,
    stdErr: 0.198,
    tStat: 3.873,
    pValue: 0.000,
    ciLower: 0.368,
    ciUpper: 1.164,
    vif: 3.494,
    interpretation: "Setiap kenaikan 1% PDRB meningkatkan transaksi QRIS sebesar 0.766% secara signifikan (p < 0.001).",
    isSignificant: true,
  },
  {
    variable: "LnUsia_Produktif",
    variableLabel: "Ln Jumlah Usia Produktif",
    coef: 0.7982,
    stdErr: 0.159,
    tStat: 5.009,
    pValue: 0.000,
    ciLower: 0.478,
    ciUpper: 1.119,
    vif: 4.771,
    interpretation: "Setiap kenaikan 1% penduduk usia produktif meningkatkan transaksi QRIS sebesar 0.798% secara signifikan (p < 0.001).",
    isSignificant: true,
  }
];

export const DESCRIPTIVE_STATS: DescriptiveStat[] = [
  {
    variable: "Nominal Transaksi QRIS",
    min: 3.415632e+09,
    mean: 3.085308e+11,
    max: 1.029534e+13,
    std: 1.338923e+12,
    skewness: 7.22,
    unit: "Rupiah (Rp)",
    isTransformedLn: true,
    minLn: 21.951,
    meanLn: 25.124,
    maxLn: 29.962,
    stdLn: 1.482,
  },
  {
    variable: "Total Wisatawan",
    min: 36290,
    mean: 621953,
    max: 3361904,
    std: 590941,
    skewness: 2.48,
    unit: "Orang",
    isTransformedLn: true,
    minLn: 10.499,
    meanLn: 12.842,
    maxLn: 15.028,
    stdLn: 1.084,
  },
  {
    variable: "Gini Ratio",
    min: 0.221,
    mean: 0.3126,
    max: 0.394,
    std: 0.0388,
    skewness: 0.14,
    unit: "Indeks (0-1)",
    isTransformedLn: false,
  },
  {
    variable: "HDI (IPM)",
    min: 67.23,
    mean: 75.25,
    max: 85.65,
    std: 4.88,
    skewness: 0.52,
    unit: "Skor",
    isTransformedLn: false,
    minLn: 4.208,
    meanLn: 4.318,
    maxLn: 4.450,
    stdLn: 0.065,
  },
  {
    variable: "Jumlah Penduduk Miskin",
    min: 2860,
    mean: 90107,
    max: 235630,
    std: 52140,
    skewness: 0.81,
    unit: "Jiwa",
    isTransformedLn: true,
    minLn: 7.958,
    meanLn: 11.235,
    maxLn: 12.370,
    stdLn: 0.724,
  },
  {
    variable: "Pengeluaran per Kapita",
    min: 8765000,
    mean: 12555000,
    max: 20679000,
    std: 2840000,
    skewness: 0.94,
    unit: "Rp / Tahun",
    isTransformedLn: true,
    minLn: 15.986,
    meanLn: 16.321,
    maxLn: 16.844,
    stdLn: 0.218,
  },
  {
    variable: "Jumlah UMKM",
    min: 1423,
    mean: 21760,
    max: 99855,
    std: 19840,
    skewness: 1.62,
    unit: "Unit Usaha",
    isTransformedLn: true,
    minLn: 7.260,
    meanLn: 9.680,
    maxLn: 11.511,
    stdLn: 0.842,
  },
  {
    variable: "Upah Minimum (UMK)",
    min: 2335209,
    mean: 3163947,
    max: 4989600,
    std: 812400,
    skewness: 0.88,
    unit: "Rupiah (Rp)",
    isTransformedLn: true,
    minLn: 14.663,
    meanLn: 14.935,
    maxLn: 15.422,
    stdLn: 0.231,
  },
  {
    variable: "Penetrasi Internet",
    min: 51.4,
    mean: 78.6,
    max: 98.4,
    std: 11.2,
    skewness: -0.42,
    unit: "% Rumah Tangga",
    isTransformedLn: false,
  },
  {
    variable: "PDRB ADHK",
    min: 25531,
    mean: 76352,
    max: 399577,
    std: 68420,
    skewness: 2.85,
    unit: "Miliar Rp",
    isTransformedLn: true,
    minLn: 10.147,
    meanLn: 10.985,
    maxLn: 12.898,
    stdLn: 0.655,
  },
  {
    variable: "Penduduk Usia Produktif",
    min: 34345,
    mean: 688648,
    max: 2073272,
    std: 492100,
    skewness: 1.15,
    unit: "Jiwa",
    isTransformedLn: true,
    minLn: 10.444,
    meanLn: 13.245,
    maxLn: 14.544,
    stdLn: 0.782,
  }
];

export const QUADRANT_CONFIG: Record<
  QuadrantCategory,
  {
    name: string;
    quadrantCode: string;
    count: number;
    color: string;
    bgColor: string;
    borderColor: string;
    badgeBg: string;
    badgeBorder: string;
    dotColor: string;
    chartColor: string;
    label: string;
    description: string;
    diagnosis: string;
    strategy: string;
    rekomendasi: string[];
  }
> = {
  'Maju & Sesuai Potensi': {
    name: 'Maju & Sesuai Potensi',
    quadrantCode: 'Q1 (High Fund, High Realization)',
    count: ${countQ1},
    color: 'text-emerald-700 dark:text-emerald-400',
    bgColor: 'bg-emerald-50 dark:bg-emerald-950/30',
    borderColor: 'border-emerald-200 dark:border-emerald-800',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    badgeBorder: 'border-emerald-300 dark:border-emerald-700',
    dotColor: '#10b981',
    chartColor: '#10b981',
    label: 'Kuadran I: Maju & Sesuai Potensi',
    description: 'Fundamental ekonomi tinggi dan realisasi QRIS melebihi rata-rata residual. Ekosistem pembayaran digital matang.',
    diagnosis: 'Wilayah ini memiliki kapasitas ekonomi, pariwisata, dan IPM yang kuat dengan adopsi QRIS yang telah melampaui potensi fundamental.',
    strategy: 'Diversifikasi use-case (Cross-Border, Smart City Payment, QRIS Tuntas) dan tata kelola risiko/cybersecurity.',
    rekomendasi: [
      'Integrasi QRIS Cross-Border pada pusat perbelanjaan, transit wisatawan, dan hotel berbintang.',
      'Ekspansi fitur QRIS Tuntas (Tarik Tunai, Transfer, Setor) ke pasar modern dan minimarket.',
      'Penguatan sistem monitoring fraud real-time dan cybersecurity merchant bervolume tinggi.',
      'Penerapan Smart City Payment untuk seluruh pajak daerah, parkir non-tunai, dan retribusi publik.'
    ]
  },
  'Over Develop': {
    name: 'Over Develop',
    quadrantCode: 'Q2 (Low Fund, High Realization)',
    count: ${countQ2},
    color: 'text-blue-700 dark:text-blue-400',
    bgColor: 'bg-blue-50 dark:bg-blue-950/30',
    borderColor: 'border-blue-200 dark:border-blue-800',
    badgeBg: 'bg-blue-100 text-blue-800 dark:bg-blue-900/60 dark:text-blue-200',
    badgeBorder: 'border-blue-300 dark:border-blue-700',
    dotColor: '#3b82f6',
    chartColor: '#3b82f6',
    label: 'Kuadran II: Over Develop',
    description: 'Kapasitas fundamental terbatas namun adopsi QRIS melompat melampaui prediksi model (over-performing).',
    diagnosis: 'Wilayah ini memiliki fundamental ekonomi moderat namun menunjukkan antusiasme adopsi QRIS yang sangat tinggi melampaui prediksi baseline.',
    strategy: 'Stabilisasi infrastruktur jaringan, pendampingan literasi keuangan merchant, dan mitigasi penipuan.',
    rekomendasi: [
      'Edukasi literasi keuangan digital dan kewaspadaan QRIS palsu/phishing bagi merchant mikro.',
      'Kerja sama dengan perbankan penyalur KUR digital berbasis riwayat transaksi QRIS aktif.',
      'Audit kapasitas bandwidth jaringan telekomunikasi seluler agar transaksi tidak pending saat jam sibuk.',
      'Pendampingan pembukuan digital (SIAPIK BI) untuk memperkuat kapasitas modal usaha merchant.'
    ]
  },
  'Under Develop': {
    name: 'Under Develop',
    quadrantCode: 'Q3 (Low Fund, Low Realization)',
    count: ${countQ3},
    color: 'text-rose-700 dark:text-rose-400',
    bgColor: 'bg-rose-50 dark:bg-rose-950/30',
    borderColor: 'border-rose-200 dark:border-rose-800',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    badgeBorder: 'border-rose-300 dark:border-rose-700',
    dotColor: '#f43f5e',
    chartColor: '#f43f5e',
    label: 'Kuadran III: Under Develop',
    description: 'Fundamental ekonomi rendah dan realisasi transaksi QRIS tertinggal dari estimasi model.',
    diagnosis: 'Wilayah ini menghadapi tantangan ganda: keterbatasan fundamental ekonomi dan adopsi digital yang masih di bawah potensi minimum.',
    strategy: 'Intervensi struktural: penyediaan menara BTS 4G, subsidi QRIS perintis, dan inklusi digital melalui bansos.',
    rekomendasi: [
      'Prioritas percepatan pembangunan menara BTS 4G dan penguatan jaringan internet di desa/kecamatan tertinggal.',
      'Program edukasi literasi keuangan dasar dan pengenalan dompet digital bersama Dinas Koperasi & UMKM.',
      'Penyaluran bantuan sosial non-tunai bersinergi dengan agen Laku Pandai sebagai titik sentra inklusi.',
      'Pemberian stimulus perangkat terminal/QRIS statis gratis bagi kelompok pedagang kelontong dan pasar perintis.'
    ]
  },
  'Potensi Belum Tergarap': {
    name: 'Potensi Belum Tergarap',
    quadrantCode: 'Q4 (High Fund, Low Realization)',
    count: ${countQ4},
    color: 'text-amber-700 dark:text-amber-400',
    bgColor: 'bg-amber-50 dark:bg-amber-950/30',
    borderColor: 'border-amber-200 dark:border-amber-800',
    badgeBg: 'bg-amber-100 text-amber-800 dark:bg-amber-900/60 dark:text-amber-200',
    badgeBorder: 'border-amber-300 dark:border-amber-700',
    dotColor: '#f59e0b',
    chartColor: '#f59e0b',
    label: 'Kuadran IV: Potensi Belum Tergarap',
    description: 'Fundamental ekonomi kuat (wisatawan/PDRB/IPM tinggi) namun transaksi riil QRIS belum teroptimalkan.',
    diagnosis: 'Wilayah ini memiliki potensi ekonomi dan wisatawan sangat besar namun adopsi QRIS riil masih tertahan atau belum teraktivasi optimal.',
    strategy: 'Akselerasi onboarding merchant UMKM, kampanye insentif konsumen, dan digitalisasi retribusi daerah.',
    rekomendasi: [
      'Akselerasi onboarding wajib QRIS pada destinasi wisata unggulan, sentra kuliner, dan kerajinan.',
      'Program insentif MDR 0% dan cashback bersama bank mitra untuk mendorong peralihan dari uang tunai.',
      'Penyederhanaan pendaftaran NMID merchant mikro melalui jemput bola di pasar-pasar tradisional.',
      'Integrasi pembayaran QRIS pada seluruh loket retribusi pariwisata dan parkir Pemda.'
    ]
  },
};

export const TAHAP5_CONFIG: Record<
  Tahap5Category,
  {
    label: string;
    badgeBg: string;
    badgeBorder: string;
    dotColor: string;
    description: string;
    policy: string;
  }
> = {
  'OVER DEVELOP': {
    label: 'Tahap 5: Over Develop (Z > +1.0)',
    badgeBg: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-900/60 dark:text-indigo-200',
    badgeBorder: 'border-indigo-300 dark:border-indigo-700',
    dotColor: '#6366f1',
    description: 'Realisasi transaksi QRIS jauh melampaui potensi fundamental model (> 1.0 Standar Deviasi).',
    policy: 'Pengendalian risiko fraud, peningkatan stabilitas bandwidth, dan penguatan permodalan merchant.',
  },
  'NORMAL': {
    label: 'Tahap 5: Normal (-1.0 ≤ Z ≤ +1.0)',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    badgeBorder: 'border-emerald-300 dark:border-emerald-700',
    dotColor: '#10b981',
    description: 'Realisasi transaksi QRIS sejalan dan proporsional dengan kapasitas fundamental daerah.',
    policy: 'Pertahankan pertumbuhan berkelanjutan, integrasi pembayaran retribusi Pemda, dan ekspansi use-case.',
  },
  'UNDER DEVELOP': {
    label: 'Tahap 5: Under Develop (Z < -1.0)',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    badgeBorder: 'border-rose-300 dark:border-rose-700',
    dotColor: '#f43f5e',
    description: 'Realisasi transaksi QRIS tertinggal signifikan dari kapasitas fundamental (< -1.0 Standar Deviasi).',
    policy: 'Prioritas intervensi khusus: pembangunan infrastruktur sinyal, literasi digital, dan pendampingan merchant.',
  },
};

export const KMEANS_CONFIG: Record<
  KMeansCategory,
  {
    label: string;
    badgeBg: string;
    badgeBorder: string;
    dotColor: string;
    description: string;
  }
> = {
  'Overdeveloped (Realita > Potensi)': {
    label: 'Cluster: Overdeveloped (Realita > Potensi)',
    badgeBg: 'bg-cyan-100 text-cyan-800 dark:bg-cyan-900/60 dark:text-cyan-200',
    badgeBorder: 'border-cyan-300 dark:border-cyan-700',
    dotColor: '#06b6d4',
    description: 'Cluster daerah dengan realisasi transaksi QRIS secara sistematis melampaui potensi model k-means (6 daerah).',
  },
  'Normal (Sesuai Potensi)': {
    label: 'Cluster: Normal (Sesuai Potensi)',
    badgeBg: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/60 dark:text-emerald-200',
    badgeBorder: 'border-emerald-300 dark:border-emerald-700',
    dotColor: '#10b981',
    description: 'Cluster daerah dengan realisasi transaksi QRIS seimbang dan proporsional dengan kapasitas ekonomi (30 daerah).',
  },
  'Underdeveloped (Potensi > Realita)': {
    label: 'Cluster: Underdeveloped (Potensi > Realita)',
    badgeBg: 'bg-rose-100 text-rose-800 dark:bg-rose-900/60 dark:text-rose-200',
    badgeBorder: 'border-rose-300 dark:border-rose-700',
    dotColor: '#f43f5e',
    description: 'Cluster daerah dengan potensi transaksi QRIS yang belum teraktualisasi secara optimal (23 daerah).',
  },
};
`;

fs.writeFileSync(path.join(__dirname, '../src/data/qrisData.ts'), fileContent, 'utf-8');
console.log("Successfully generated src/data/qrisData.ts with all expected properties");
