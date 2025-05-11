
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  pasayCityHouseRepCandidates,
  pasayCityMayorCandidates,
  pasayCityViceMayorCandidates,
  pasayCityCouncilorFirstCandidates,
  pasayCityCouncilorSecondCandidates
} from './candidateData/pasayCityCandidates';

// Pasay City positions
export const pasayCityPositions: Position[] = [
  {
    id: "house-rep-pasay",
    title: "Member, House of Representatives - Pasay City",
    description: "Representatives of Pasay City in the House of Representatives.",
    maxSelections: 1,
    candidates: pasayCityHouseRepCandidates
  },
  {
    id: "mayor-pasay",
    title: "Mayor - City of Pasay",
    description: "The chief executive of the City of Pasay.",
    maxSelections: 1,
    candidates: pasayCityMayorCandidates
  },
  {
    id: "vice-mayor-pasay",
    title: "Vice-Mayor - City of Pasay",
    description: "The second-highest executive official in the City of Pasay.",
    maxSelections: 1,
    candidates: pasayCityViceMayorCandidates
  },
  {
    id: "councilor-pasay-first",
    title: "Councilor - City of Pasay (First District)",
    description: "Members of the city council for Pasay City's First District.",
    maxSelections: 6,
    candidates: pasayCityCouncilorFirstCandidates
  },
  {
    id: "councilor-pasay-second",
    title: "Councilor - City of Pasay (Second District)",
    description: "Members of the city council for Pasay City's Second District.",
    maxSelections: 6,
    candidates: pasayCityCouncilorSecondCandidates
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
