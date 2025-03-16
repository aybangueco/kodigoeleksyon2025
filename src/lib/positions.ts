export interface Candidate {
  id: string;
  name: string;
  party: string;
  image?: string; // Path to candidate image
}

export interface Position {
  id: string;
  title: string;
  description: string;
  maxSelections: number;
  candidates: Candidate[];
}

// Mock data for election positions and candidates
// In a real application, this would come from an API
export const positions: Position[] = [
  {
    id: "senators",
    title: "Senator",
    description: "Members of the Senate, the upper chamber of Congress.",
    maxSelections: 12,
    candidates: [
      { id: "s1", name: "ABALOS, BENHUR", party: "PFP" },
      { id: "s2", name: "ACERON, JOVILYN", party: "IND" },
      { id: "s3", name: "ACLAN, KUYA", party: "IND" },
      { id: "s4", name: "ACOPIADO, MERCEDITA", party: "IND" },
      { id: "s5", name: "ADONIS, JEROME", party: "MKBYN" },
      { id: "s6", name: "ADORABLE, ABEL", party: "IND" },
      { id: "s7", name: "ADVINCULA, DINGBICOL", party: "IND" },
      { id: "s8", name: "ADVINCULA, PETER JOEMEL", party: "IND" },
      { id: "s9", name: "AGAD, ROBERT", party: "IND" },
      { id: "s10", name: "AGUILAR, CEZ", party: "WPP" },
      { id: "s11", name: "ALCANTARA, ERIC", party: "IND" },
      { id: "s12", name: "AMAD, WILSON", party: "IND" },
      { id: "s13", name: "AMIR HUSSIN, SALIPADA", party: "PM" },
      { id: "s14", name: "ANCAJAS, NELSON", party: "IND" },
      { id: "s15", name: "ANDAMO, NARS ALYN", party: "MKBYN" },
      { id: "s16", name: "ANDRADA, KUYA MANNY", party: "IND" },
      { id: "s17", name: "ANDRINO, BOBIE", party: "IND" },
      { id: "s18", name: "APOLINARIO, JOEL", party: "PM" },
      { id: "s19", name: "AQUINO, BAM", party: "KNP" },
      { id: "s20", name: "AQUINO, PRIMO", party: "IND" },
      { id: "s21", name: "ARAMBULO, RONNEL", party: "MKBYN" },
      { id: "s22", name: "ARCEGA, GERALD", party: "PM" },
      { id: "s23", name: "ARELLANO, ERNESTO", party: "KTPNAN" },
      { id: "s24", name: "ARES, JERSON", party: "IND" },
    ]
  },
  {
    id: "house-rep",
    title: "Member, House of Representatives",
    description: "Representatives of legislative districts in the House of Representatives.",
    maxSelections: 1,
    candidates: [
      { id: "hr1", name: "Alama, Johram", party: "IND" },
      { id: "hr2", name: "Malapitan, Oca", party: "NP" },
      { id: "hr3", name: "Malonzo, Rey", party: "KNP" },
    ]
  },
  {
    id: "mayor",
    title: "Mayor",
    description: "The chief executive of a city or municipality.",
    maxSelections: 1,
    candidates: [
      { id: "m1", name: "Cañete, Richard", party: "IND" },
      { id: "m2", name: "Malapitan, Along", party: "NP" },
      { id: "m3", name: "Malunes, Ronnie", party: "IND" },
      { id: "m4", name: "Trillanes, Antonio IV", party: "AKSYON" },
      { id: "m5", name: "Villanueva, Danny", party: "IND" },
    ]
  },
  {
    id: "vice-mayor",
    title: "Vice-Mayor",
    description: "The second-highest executive official in a city or municipality.",
    maxSelections: 1,
    candidates: [
      { id: "vm1", name: "Lustre, Dante", party: "IND" },
      { id: "vm2", name: "Malonzo, PJ", party: "AKSYON" },
      { id: "vm3", name: "Teh, Karina", party: "NP" },
      { id: "vm4", name: "Timbol, Joseph", party: "IND" },
      { id: "vm5", name: "Tobias, Rolando", party: "IND" },
    ]
  },
  {
    id: "sanggunian",
    title: "Member, Sangguniang Panlungsod",
    description: "Members of the city or municipal council.",
    maxSelections: 6,
    candidates: [
      { id: "sp1", name: "Adalem, Topet", party: "NP" },
      { id: "sp2", name: "Bacolod, Leah", party: "NP" },
      { id: "sp3", name: "Barretto, Marjorie", party: "NP" },
      { id: "sp4", name: "Bunag, Mickey", party: "AKSYON" },
      { id: "sp5", name: "Caralde, Alex", party: "NP" },
      { id: "sp6", name: "De Leon, Tyrone Sr.", party: "IND" },
      { id: "sp7", name: "Domasgk, Roman Jr.", party: "IND" },
      { id: "sp8", name: "Faustino, Mining", party: "AKSYON" },
      { id: "sp9", name: "Hernandez, Vince", party: "NP" },
      { id: "sp10", name: "Leonardo, Angie", party: "AKSYON" },
      { id: "sp11", name: "Lipata, Buddy", party: "IND" },
      { id: "sp12", name: "Malupitan, Enteng", party: "NP" },
    ]
  },
  {
    id: "party-list",
    title: "Party List",
    description: "Representatives of marginalized and underrepresented sectors.",
    maxSelections: 1,
    candidates: [
      { id: "pl1", name: "Kabataan", party: "Youth Sector" },
      { id: "pl2", name: "Akbayan", party: "Social Democratic Party" },
      { id: "pl3", name: "Gabriela", party: "Women's Rights" },
      { id: "pl4", name: "ACT Teachers", party: "Education Sector" },
      { id: "pl5", name: "Bayan Muna", party: "People First" },
      { id: "pl6", name: "Magdalo", party: "Military Reform" },
      { id: "pl7", name: "Magsasaka", party: "Farmers' Rights" },
      { id: "pl8", name: "Senior Citizens", party: "Elderly Welfare" },
      { id: "pl9", name: "OFW Family", party: "Overseas Filipino Workers" },
      { id: "pl10", name: "Agri-Fisheries Alliance", party: "Agricultural Sector" },
    ]
  }
];
