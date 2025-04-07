
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  pasigCityHouseRepCandidates,
  pasigCityMayorCandidates,
  pasigCityViceMayorCandidates,
  pasigCityCouncilorFirstCandidates,
  pasigCityCouncilorSecondCandidates
} from './candidateData/pasigCityCandidates';

// Pasig City positions
export const pasigCityPositions: Position[] = [
  {
    id: "house-rep-pasig",
    title: "Member, House of Representatives - Pasig City (National Capital Region - Second District)",
    description: "Representative of Pasig City in the House of Representatives.",
    maxSelections: 1,
    candidates: pasigCityHouseRepCandidates
  },
  {
    id: "mayor-pasig",
    title: "Mayor - City of Pasig",
    description: "The chief executive of the City of Pasig.",
    maxSelections: 1,
    candidates: pasigCityMayorCandidates
  },
  {
    id: "vice-mayor-pasig",
    title: "Vice-Mayor - City of Pasig",
    description: "The second-highest executive official in the City of Pasig.",
    maxSelections: 1,
    candidates: pasigCityViceMayorCandidates
  },
  {
    id: "councilor-pasig-first",
    title: "Councilor - City of Pasig (First District)",
    description: "Members of the city council for Pasig City's First District.",
    maxSelections: 8,
    candidates: pasigCityCouncilorFirstCandidates
  },
  {
    id: "councilor-pasig-second",
    title: "Councilor - City of Pasig (Second District)",
    description: "Members of the city council for Pasig City's Second District.",
    maxSelections: 8,
    candidates: pasigCityCouncilorSecondCandidates
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
