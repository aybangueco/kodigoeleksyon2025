
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
    id: "president",
    title: "President",
    description: "The head of state and chief executive of the Philippines.",
    maxSelections: 1,
    candidates: [
      { id: "p1", name: "Juan Dela Cruz", party: "Partido ng Mamamayan" },
      { id: "p2", name: "Maria Santos", party: "Bagong Pag-asa Party" },
      { id: "p3", name: "Ricardo Reyes", party: "People's Reform Party" },
      { id: "p4", name: "Ana Bonifacio", party: "Maunlad na Pilipinas" },
      { id: "p5", name: "Pedro Magtanggol", party: "Democratic Alliance" },
    ]
  },
  {
    id: "vice-president",
    title: "Vice President",
    description: "The second-highest executive official who can assume the presidency if needed.",
    maxSelections: 1,
    candidates: [
      { id: "vp1", name: "Elena Magsaysay", party: "Partido ng Mamamayan" },
      { id: "vp2", name: "Ramon Estrada", party: "Bagong Pag-asa Party" },
      { id: "vp3", name: "Victoria Laurel", party: "People's Reform Party" },
      { id: "vp4", name: "Jaime Quezon", party: "Maunlad na Pilipinas" },
      { id: "vp5", name: "Sofia Roxas", party: "Democratic Alliance" },
    ]
  },
  {
    id: "senators",
    title: "Senator",
    description: "Members of the Senate, the upper chamber of Congress.",
    maxSelections: 12,
    candidates: [
      { id: "s1", name: "Abalos, Benhur", party: "PPP" },
      { id: "s2", name: "Adonis, Jerome", party: "MKBYN" },
      { id: "s3", name: "Amad, Wilson", party: "IND" },
      { id: "s4", name: "Andamo, Nars Altyn", party: "MKBYN" },
      { id: "s5", name: "Aquino, Bam", party: "KNP" },
      { id: "s6", name: "Arambulo, Ronnel", party: "MKBYN" },
      { id: "s7", name: "Arellano, Ernesto", party: "KTPNAN" },
      { id: "s8", name: "Ballon, Roberto", party: "IND" },
      { id: "s9", name: "Binay, Abby", party: "NPC" },
      { id: "s10", name: "Bondoc, Jimmy", party: "PDPLBN" },
      { id: "s11", name: "Bong Revilla, Ramon", party: "BLAKAS" },
      { id: "s12", name: "Bosita, Colonel", party: "IND" },
      { id: "s13", name: "Brosas, Arlene", party: "MKBYN" },
      { id: "s14", name: "Cabonegro, Roy", party: "PPP" },
      { id: "s15", name: "Capuyan, Allen", party: "PPP" },
      { id: "s16", name: "Casiño, Teddy", party: "MKBYN" },
      { id: "s17", name: "Castro, Teacher France", party: "MKBYN" },
      { id: "s18", name: "Cayetano, Pia", party: "NP" },
      { id: "s19", name: "D'Angelo, David", party: "BUNYOG" },
      { id: "s20", name: "De Alba, Attorney", party: "IND" },
      { id: "s21", name: "De Guzman, Ka Leody", party: "PLM" },
      { id: "s22", name: "Dela Rosa, Bato", party: "PDP" },
      { id: "s23", name: "Doringo, Nanay Mimi", party: "IND" },
      { id: "s24", name: "Escobal, Arnel", party: "PM" },
      // Additional candidates from the image would be added here
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
      // Additional candidates from the image would be added here
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
