
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  makatiCityHouseRepFirstCandidates,
  makatiCityHouseRepSecondCandidates,
  makatiCityMayorCandidates,
  makatiCityViceMayorCandidates,
  makatiCityCouncilorFirstCandidates,
  makatiCityCouncilorSecondCandidates
} from './candidateData/makatiCityCandidates';

// Makati City positions
export const makatiCityPositions: Position[] = [
  {
    id: "house-rep-makati-first",
    title: "Member, House of Representatives - Makati City (First District)",
    description: "Representatives of Makati City's First District in the House of Representatives.",
    maxSelections: 1,
    candidates: makatiCityHouseRepFirstCandidates
  },
  {
    id: "house-rep-makati-second",
    title: "Member, House of Representatives - Makati City (Second District)",
    description: "Representatives of Makati City's Second District in the House of Representatives.",
    maxSelections: 1,
    candidates: makatiCityHouseRepSecondCandidates
  },
  {
    id: "mayor-makati",
    title: "Mayor - City of Makati",
    description: "The chief executive of the City of Makati.",
    maxSelections: 1,
    candidates: makatiCityMayorCandidates
  },
  {
    id: "vice-mayor-makati",
    title: "Vice-Mayor - City of Makati",
    description: "The second-highest executive official in the City of Makati.",
    maxSelections: 1,
    candidates: makatiCityViceMayorCandidates
  },
  {
    id: "councilor-makati-first",
    title: "Councilor - City of Makati (First District)",
    description: "Members of the city council for Makati City's First District.",
    maxSelections: 8,
    candidates: makatiCityCouncilorFirstCandidates
  },
  {
    id: "councilor-makati-second",
    title: "Councilor - City of Makati (Second District)",
    description: "Members of the city council for Makati City's Second District.",
    maxSelections: 8,
    candidates: makatiCityCouncilorSecondCandidates
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
