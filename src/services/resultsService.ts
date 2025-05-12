import { ElectionResult, ResultType } from "@/types/electionResults";

const SENATOR_API_URL = "https://blob-prod-senator.abs-cbn.com/feed-0/senator-00399000-nation-location-1.json";
const PARTYLIST_API_URL = "https://blob-prod-party-list.abs-cbn.com/feed-0/party-list-01199000-nation-location-1.json";

export const fetchElectionResults = async (type: ResultType): Promise<ElectionResult> => {
  const apiUrl = type === 'senator' ? SENATOR_API_URL : PARTYLIST_API_URL;
  
  try {
    console.log(`Attempting to fetch ${type} results from API...`);
    const response = await fetch(apiUrl, {
      mode: 'cors',
      headers: {
        'Origin': 'https://halalanresults.abs-cbn.com'
      }
    });
    
    if (!response.ok) {
      console.log(`API response not OK: ${response.status}. Using mock data.`);
      throw new Error(`Failed to fetch ${type} results: ${response.status}`);
    }
    
    console.log(`Successfully fetched ${type} results from API`);
    return response.json();
  } catch (error) {
    console.log(`Error fetching ${type} results:`, error);
    console.log(`Falling back to mock ${type} data`);
    
    // If API call fails, use mock data
    return type === 'senator' ? mockSenatorResults : mockPartyListResults;
  }
};

export const fetchSenatorResults = (): Promise<ElectionResult> => {
  return fetchElectionResults('senator');
};

export const fetchPartyListResults = (): Promise<ElectionResult> => {
  return fetchElectionResults('partylist');
};

// Mock data for senators
export const mockSenatorResults: ElectionResult = {
  positionName: "Senator",
  er: {
    count: 0,
    total: 0,
    percentage: 0
  },
  voter: {
    count: 0,
    total: 0,
    percentage: 0
  },
  isFeedZero: true,
  result: [
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ABALOS00BENHUR00PFP0",
      candidateName: "ABALOS, BENHUR",
      lastName: "ABALOS",
      firstName: "BENHUR",
      partyNameShort: "PFP",
      partyName: "PFP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ADONIS00JEROME00MKBYN0",
      candidateName: "ADONIS, JEROME",
      lastName: "ADONIS",
      firstName: "JEROME",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000AMAD00WILSON00IND0",
      candidateName: "AMAD, WILSON",
      lastName: "AMAD",
      firstName: "WILSON",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ANDAMO00NARS0ALYN00MKBYN0",
      candidateName: "ANDAMO, NARS ALYN",
      lastName: "ANDAMO",
      firstName: "NARS ALYN",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000AQUINO00BAM00KNP0",
      candidateName: "AQUINO, BAM",
      lastName: "AQUINO",
      firstName: "BAM",
      partyNameShort: "KNP",
      partyName: "KNP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ARAMBULO00RONNEL00MKBYN0",
      candidateName: "ARAMBULO, RONNEL",
      lastName: "ARAMBULO",
      firstName: "RONNEL",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ARELLANO00ERNESTO00KTPNAN0",
      candidateName: "ARELLANO, ERNESTO",
      lastName: "ARELLANO",
      firstName: "ERNESTO",
      partyNameShort: "KTPNAN",
      partyName: "KTPNAN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000BALLON00ROBERTO00IND0",
      candidateName: "BALLON, ROBERTO",
      lastName: "BALLON",
      firstName: "ROBERTO",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000BINAY00ABBY00NPC0",
      candidateName: "BINAY, ABBY",
      lastName: "BINAY",
      firstName: "ABBY",
      partyNameShort: "NPC",
      partyName: "NPC",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000BONDOC00JIMMY00PDPLBN0",
      candidateName: "BONDOC, JIMMY",
      lastName: "BONDOC",
      firstName: "JIMMY",
      partyNameShort: "PDPLBN",
      partyName: "PDPLBN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000BONG0REVILLA0RAMON00JR00LAKAS0",
      candidateName: "BONG REVILLA,RAMON, JR.",
      lastName: "BONG REVILLA",
      firstName: "RAMON, JR.",
      partyNameShort: "LAKAS",
      partyName: "LAKAS",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000BOSITA00COLONEL00IND0",
      candidateName: "BOSITA, COLONEL",
      lastName: "BOSITA",
      firstName: "COLONEL",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000BROSAS00ARLENE00MKBYN0",
      candidateName: "BROSAS, ARLENE",
      lastName: "BROSAS",
      firstName: "ARLENE",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000CABONEGRO00ROY00DPP0",
      candidateName: "CABONEGRO, ROY",
      lastName: "CABONEGRO",
      firstName: "ROY",
      partyNameShort: "DPP",
      partyName: "DPP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000CAPUYAN00ALLEN00PPP0",
      candidateName: "CAPUYAN, ALLEN",
      lastName: "CAPUYAN",
      firstName: "ALLEN",
      partyNameShort: "PPP",
      partyName: "PPP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000CASI0O00TEDDY00MKBYN0",
      candidateName: "CASIÑO, TEDDY",
      lastName: "CASIÑO",
      firstName: "TEDDY",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000CASTRO00TEACHER0FRANCE00MKBYN0",
      candidateName: "CASTRO, TEACHER FRANCE",
      lastName: "CASTRO",
      firstName: "TEACHER FRANCE",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000CAYETANO00PIA00NP0",
      candidateName: "CAYETANO, PIA",
      lastName: "CAYETANO",
      firstName: "PIA",
      partyNameShort: "NP",
      partyName: "NP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000D'ANGELO00DAVID00BUNYOG0",
      candidateName: "D'ANGELO, DAVID",
      lastName: "D'ANGELO",
      firstName: "DAVID",
      partyNameShort: "BUNYOG",
      partyName: "BUNYOG",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000DE0ALBAN0ATTORNEY0ANGELO00IND0",
      candidateName: "DE ALBAN,ATTORNEY ANGELO",
      lastName: "DE ALBAN",
      firstName: "ATTORNEY ANGELO",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000DE0GUZMAN00KA0LEODY00PLM0",
      candidateName: "DE GUZMAN, KA LEODY",
      lastName: "DE GUZMAN",
      firstName: "KA LEODY",
      partyNameShort: "PLM",
      partyName: "PLM",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000DELA0ROSA00BATO00PDPLBN0",
      candidateName: "DELA ROSA, BATO",
      lastName: "DELA ROSA",
      firstName: "BATO",
      partyNameShort: "PDPLBN",
      partyName: "PDPLBN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000DORINGO00NANAY0MIMI00MKBYN0",
      candidateName: "DORINGO, NANAY MIMI",
      lastName: "DORINGO",
      firstName: "NANAY MIMI",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ESCOBAL00ARNEL00PM0",
      candidateName: "ESCOBAL, ARNEL",
      lastName: "ESCOBAL",
      firstName: "ARNEL",
      partyNameShort: "PM",
      partyName: "PM",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ESPIRITU00LUKE00PLM0",
      candidateName: "ESPIRITU, LUKE",
      lastName: "ESPIRITU",
      firstName: "LUKE",
      partyNameShort: "PLM",
      partyName: "PLM",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000FLORANDA00MODY0PISTON00MKBYN0",
      candidateName: "FLORANDA, MODY PISTON",
      lastName: "FLORANDA",
      firstName: "MODY PISTON",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000GAMBOA00MARC0LOUIE00IND0",
      candidateName: "GAMBOA, MARC LOUIE",
      lastName: "GAMBOA",
      firstName: "MARC LOUIE",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000GO00BONG0GO00000PDPLBN0",
      candidateName: "GO, BONG GO",
      lastName: "GO",
      firstName: "BONG GO",
      partyNameShort: "PDPLBN",
      partyName: "PDPLBN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000GONZALES00NORBERTO00PDSP0",
      candidateName: "GONZALES, NORBERTO",
      lastName: "GONZALES",
      firstName: "NORBERTO",
      partyNameShort: "PDSP",
      partyName: "PDSP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000HINLO00JAYVEE00PDPLBN0",
      candidateName: "HINLO, JAYVEE",
      lastName: "HINLO",
      firstName: "JAYVEE",
      partyNameShort: "PDPLBN",
      partyName: "PDPLBN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000HONASAN00GRINGO00RP0",
      candidateName: "HONASAN, GRINGO",
      lastName: "HONASAN",
      firstName: "GRINGO",
      partyNameShort: "RP",
      partyName: "RP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000JOSE00RELLY0JR000KBL0",
      candidateName: "JOSE, RELLY JR.",
      lastName: "JOSE",
      firstName: "RELLY JR.",
      partyNameShort: "KBL",
      partyName: "KBL",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000LACSON00PING00IND0",
      candidateName: "LACSON, PING",
      lastName: "LACSON",
      firstName: "PING",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000LAMBINO000RAUL000PDPLBN0",
      candidateName: "LAMBINO, RAUL",
      lastName: "LAMBINO",
      firstName: "RAUL",
      partyNameShort: "PDPLBN",
      partyName: "PDPLBN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000LAPID00LITO00NPC0",
      candidateName: "LAPID, LITO",
      lastName: "LAPID",
      firstName: "LITO",
      partyNameShort: "NPC",
      partyName: "NPC",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000LEE00MANOY0WILBERT00AKSYON0",
      candidateName: "LEE, MANOY WILBERT",
      lastName: "LEE",
      firstName: "MANOY WILBERT",
      partyNameShort: "AKSYON",
      partyName: "AKSYON",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000LIDASAN00AMIRAH00MKBYN0",
      candidateName: "LIDASAN, AMIRAH",
      lastName: "LIDASAN",
      firstName: "AMIRAH",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MARCOLETA00RODANTE00IND0",
      candidateName: "MARCOLETA, RODANTE",
      lastName: "MARCOLETA",
      firstName: "RODANTE",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MARCOS00IMEE0R000NP0",
      candidateName: "MARCOS, IMEE R.",
      lastName: "MARCOS",
      firstName: "IMEE R.",
      partyNameShort: "NP",
      partyName: "NP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MARQUEZ00NORMAN00IND0",
      candidateName: "MARQUEZ, NORMAN",
      lastName: "MARQUEZ",
      firstName: "NORMAN",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MARTINEZ00ERIC00IND0",
      candidateName: "MARTINEZ, ERIC",
      lastName: "MARTINEZ",
      firstName: "ERIC",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MATA00DOC0MARITES00IND0",
      candidateName: "MATA, DOC MARITES",
      lastName: "MATA",
      firstName: "DOC MARITES",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MATULA000ATTY000SONNY00WPP0",
      candidateName: "MATULA, ATTY. SONNY",
      lastName: "MATULA",
      firstName: "ATTY.  SONNY",
      partyNameShort: "WPP",
      partyName: "WPP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MAZA00LIZA00MKBYN0",
      candidateName: "MAZA, LIZA",
      lastName: "MAZA",
      firstName: "LIZA",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MENDOZA00HEIDI00IND0",
      candidateName: "MENDOZA, HEIDI",
      lastName: "MENDOZA",
      firstName: "HEIDI",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MONTEMAYOR000JOEY000IND0",
      candidateName: "MONTEMAYOR, JOEY",
      lastName: "MONTEMAYOR",
      firstName: "JOEY",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000MUSTAPHA00SUBAIR00WPP0",
      candidateName: "MUSTAPHA, SUBAIR",
      lastName: "MUSTAPHA",
      firstName: "SUBAIR",
      partyNameShort: "WPP",
      partyName: "WPP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000OLIVAR00JOSE0JESSIE00IND0",
      candidateName: "OLIVAR, JOSE JESSIE",
      lastName: "OLIVAR",
      firstName: "JOSE JESSIE",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000ONG00DOC0WILLIE00AKSYON0",
      candidateName: "ONG, DOC WILLIE",
      lastName: "ONG",
      firstName: "DOC WILLIE",
      partyNameShort: "AKSYON",
      partyName: "AKSYON",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000PACQUIAO00MANNY0PACMAN00PFP0",
      candidateName: "PACQUIAO, MANNY PACMAN",
      lastName: "PACQUIAO",
      firstName: "MANNY PACMAN",
      partyNameShort: "PFP",
      partyName: "PFP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000PANGILINAN00KIKO00LP0",
      candidateName: "PANGILINAN, KIKO",
      lastName: "PANGILINAN",
      firstName: "KIKO",
      partyNameShort: "LP",
      partyName: "LP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000QUERUBIN000ARIEL0PORFIRIO00NP0",
      candidateName: "QUERUBIN, ARIEL PORFIRIO",
      lastName: "QUERUBIN",
      firstName: "ARIEL PORFIRIO",
      partyNameShort: "NP",
      partyName: "NP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000QUIBOLOY00APOLLO00IND0",
      candidateName: "QUIBOLOY, APOLLO",
      lastName: "QUIBOLOY",
      firstName: "APOLLO",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000RAMOS00DANILO00MKBYN0",
      candidateName: "RAMOS, DANILO",
      lastName: "RAMOS",
      firstName: "DANILO",
      partyNameShort: "MKBYN",
      partyName: "MKBYN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000REVILLAME00WILLIE0WIL00IND0",
      candidateName: "REVILLAME, WILLIE WIL",
      lastName: "REVILLAME",
      firstName: "WILLIE WIL",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000RODRIGUEZ00ATTY00VIC00IND0",
      candidateName: "RODRIGUEZ, ATTY. VIC",
      lastName: "RODRIGUEZ",
      firstName: "ATTY. VIC",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000SAHIDULLA00NUR0ANA00IND0",
      candidateName: "SAHIDULLA, NUR-ANA",
      lastName: "SAHIDULLA",
      firstName: "NUR-ANA",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000SALVADOR00PHILLIP0IPE00PDPLBN0",
      candidateName: "SALVADOR, PHILLIP IPE",
      lastName: "SALVADOR",
      firstName: "PHILLIP IPE",
      partyNameShort: "PDPLBN",
      partyName: "PDPLBN",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000SOTTO00TITO00NPC0",
      candidateName: "SOTTO, TITO",
      lastName: "SOTTO",
      firstName: "TITO",
      partyNameShort: "NPC",
      partyName: "NPC",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000TAPADO00MICHAEL0BONGBONG00PM0",
      candidateName: "TAPADO, MICHAEL BONGBONG",
      lastName: "TAPADO",
      firstName: "MICHAEL BONGBONG",
      partyNameShort: "PM",
      partyName: "PM",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000TOLENTINO00FRANCIS0TOL00PFP0",
      candidateName: "TOLENTINO, FRANCIS TOL",
      lastName: "TOLENTINO",
      firstName: "FRANCIS TOL",
      partyNameShort: "PFP",
      partyName: "PFP",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000TULFO00BEN0BITAG00IND0",
      candidateName: "TULFO, BEN BITAG",
      lastName: "TULFO",
      firstName: "BEN BITAG",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000TULFO00ERWIN00LAKAS0",
      candidateName: "TULFO, ERWIN",
      lastName: "TULFO",
      firstName: "ERWIN",
      partyNameShort: "LAKAS",
      partyName: "LAKAS",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000VALBUENA00MAR0MANIBELA00IND0",
      candidateName: "VALBUENA, MAR MANIBELA",
      lastName: "VALBUENA",
      firstName: "MAR MANIBELA",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000VERCELES00LEANDRO00IND0",
      candidateName: "VERCELES, LEANDRO",
      lastName: "VERCELES",
      firstName: "LEANDRO",
      partyNameShort: "IND",
      partyName: "IND",
      voteCount: "-"
    },
    {
      rank: "-",
      locationInfo: "",
      candidateCode: "00399000VILLAR00CAMILLE00NP0",
      candidateName: "VILLAR, CAMILLE",
      lastName: "VILLAR",
      firstName: "CAMILLE",
      partyNameShort: "NP",
      partyName: "NP",
      voteCount: "-"
    }
  ],
  locationCode: 1,
  locationName: "PHILIPPINES",
  contestLocationName: "PHILIPPINES"
};

// Mock data for party list
export const mockPartyListResults: ElectionResult = {
  positionName: "Party List",
  er: {
    count: 105640,
    total: 106008,
    percentage: 99.65
  },
  voter: {
    count: 54125678,
    total: 65745526,
    percentage: 82.32
  },
  isFeedZero: false,
  result: [
    {
      rank: "1",
      locationInfo: "",
      candidateCode: "01199000ACT0TEACHERS00ATPRTLST0",
      candidateName: "ACT TEACHERS",
      lastName: "ACT TEACHERS",
      firstName: "",
      partyNameShort: "ATPRTLST",
      partyName: "ATPRTLST",
      voteCount: "2456789"
    },
    {
      rank: "2",
      locationInfo: "",
      candidateCode: "01199000AKO0BICOL00AKOBPR0",
      candidateName: "AKO BICOL",
      lastName: "AKO BICOL",
      firstName: "",
      partyNameShort: "AKOBPR",
      partyName: "AKOBPR",
      voteCount: "2345123"
    },
    {
      rank: "3",
      locationInfo: "",
      candidateCode: "01199000GABRIELA00GABRIELA0",
      candidateName: "GABRIELA",
      lastName: "GABRIELA",
      firstName: "",
      partyNameShort: "GABRIELA",
      partyName: "GABRIELA",
      voteCount: "2234561"
    },
    {
      rank: "4",
      locationInfo: "",
      candidateCode: "01199000SENIOR0CITIZENS00SENIORCITIZENS0",
      candidateName: "SENIOR CITIZENS",
      lastName: "SENIOR CITIZENS",
      firstName: "",
      partyNameShort: "SENIORCITIZENS",
      partyName: "SENIORCITIZENS",
      voteCount: "2198756"
    },
    {
      rank: "5",
      locationInfo: "",
      candidateCode: "01199000AGAP00AGAP0",
      candidateName: "AGAP",
      lastName: "AGAP",
      firstName: "",
      partyNameShort: "AGAP",
      partyName: "AGAP",
      voteCount: "1987654"
    },
    {
      rank: "6",
      locationInfo: "",
      candidateCode: "01199000CIBAC00CIBAC0",
      candidateName: "CIBAC",
      lastName: "CIBAC",
      firstName: "",
      partyNameShort: "CIBAC",
      partyName: "CIBAC",
      voteCount: "1876543"
    },
    {
      rank: "7",
      locationInfo: "",
      candidateCode: "01199000ANAKPAWIS00ANAKPAWIS0",
      candidateName: "ANAKPAWIS",
      lastName: "ANAKPAWIS",
      firstName: "",
      partyNameShort: "ANAKPAWIS",
      partyName: "ANAKPAWIS",
      voteCount: "1765432"
    }
  ],
  locationCode: 1,
  locationName: "PHILIPPINES",
  contestLocationName: "PHILIPPINES"
};
