
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  taguigCityHouseRepFirstCandidates,
  taguigCityHouseRepSecondCandidates,
  taguigCityMayorCandidates,
  taguigCityViceMayorCandidates,
  taguigCityCouncilorFirstCandidates,
  taguigCityCouncilorSecondCandidates
} from './candidateData/taguigCityCandidates';

// Taguig City positions
export const taguigCityPositions: Position[] = [
  {
    id: "house-rep-taguig-first",
    title: "Member, House of Representatives - Taguig City (First District)",
    description: "Representatives of Taguig City's First District in the House of Representatives.",
    maxSelections: 1,
    candidates: taguigCityHouseRepFirstCandidates
  },
  {
    id: "house-rep-taguig-second",
    title: "Member, House of Representatives - Taguig City (Second District)",
    description: "Representatives of Taguig City's Second District in the House of Representatives.",
    maxSelections: 1,
    candidates: taguigCityHouseRepSecondCandidates
  },
  {
    id: "mayor-taguig",
    title: "Mayor - City of Taguig",
    description: "The chief executive of the City of Taguig.",
    maxSelections: 1,
    candidates: taguigCityMayorCandidates
  },
  {
    id: "vice-mayor-taguig",
    title: "Vice-Mayor - City of Taguig",
    description: "The second-highest executive official in the City of Taguig.",
    maxSelections: 1,
    candidates: taguigCityViceMayorCandidates
  },
  {
    id: "councilor-taguig-first",
    title: "Councilor - City of Taguig (First District)",
    description: "Members of the city council for Taguig City's First District.",
    maxSelections: 8,
    candidates: taguigCityCouncilorFirstCandidates
  },
  {
    id: "councilor-taguig-second",
    title: "Councilor - City of Taguig (Second District)",
    description: "Members of the city council for Taguig City's Second District.",
    maxSelections: 8,
    candidates: taguigCityCouncilorSecondCandidates
  },
  {
    id: "senators",
    title: "Senator",
    description: "Members of the Senate, the upper chamber of Congress.",
    maxSelections: 12,
    candidates: senatorCandidates
  },
  {
    id: "party-list",
    title: "Party List",
    description: "Representatives of marginalized and underrepresented sectors.",
    maxSelections: 1,
    candidates: partyListCandidates
  }
];
