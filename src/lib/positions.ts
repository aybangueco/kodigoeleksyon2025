
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
    title: "Senators",
    description: "Members of the Senate, the upper chamber of Congress.",
    maxSelections: 12,
    candidates: [
      { id: "s1", name: "Antonio Bautista", party: "Partido ng Mamamayan" },
      { id: "s2", name: "Carmen Dizon", party: "Bagong Pag-asa Party" },
      { id: "s3", name: "Roberto Santos", party: "People's Reform Party" },
      { id: "s4", name: "Lourdes Villanueva", party: "Democratic Alliance" },
      { id: "s5", name: "Manuel Aquino", party: "Maunlad na Pilipinas" },
      { id: "s6", name: "Josefina Reyes", party: "Independent" },
      { id: "s7", name: "Teodoro Garcia", party: "Partido ng Mamamayan" },
      { id: "s8", name: "Corazon Castro", party: "People's Reform Party" },
      { id: "s9", name: "Fernando Luna", party: "Bagong Pag-asa Party" },
      { id: "s10", name: "Isabella Torres", party: "Democratic Alliance" },
      { id: "s11", name: "Rodrigo Mendoza", party: "Maunlad na Pilipinas" },
      { id: "s12", name: "Margarita Cruz", party: "Independent" },
      { id: "s13", name: "Eduardo Ramos", party: "Partido ng Mamamayan" },
      { id: "s14", name: "Patricia Ocampo", party: "People's Reform Party" },
      { id: "s15", name: "Gabriel Tan", party: "Bagong Pag-asa Party" },
      { id: "s16", name: "Rosario Lim", party: "Democratic Alliance" },
      { id: "s17", name: "Alejandro Soriano", party: "Maunlad na Pilipinas" },
      { id: "s18", name: "Beatriz Gonzales", party: "Independent" },
      { id: "s19", name: "Rafael Dominguez", party: "Partido ng Mamamayan" },
      { id: "s20", name: "Teresa Lopez", party: "People's Reform Party" },
      { id: "s21", name: "Emilio Santos", party: "Bagong Pag-asa Party" },
      { id: "s22", name: "Dolores Abad", party: "Democratic Alliance" },
      { id: "s23", name: "Julio Rivera", party: "Maunlad na Pilipinas" },
      { id: "s24", name: "Carmela Yap", party: "Independent" },
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
