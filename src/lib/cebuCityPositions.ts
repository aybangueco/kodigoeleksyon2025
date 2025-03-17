
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  cebuCityHouseRepNorthCandidates,
  cebuCityHouseRepSouthCandidates,
  cebuCityMayorCandidates,
  cebuCityViceMayorCandidates,
  cebuCityCouncilorNorthCandidates,
  cebuCityCouncilorSouthCandidates
} from './candidateData/cebuCityCandidates';

// Cebu City positions
export const cebuCityPositions: Position[] = [
  {
    id: "house-rep-cebu-north",
    title: "Member, House of Representatives - Cebu City (North District)",
    description: "Representatives of Cebu City's North District in the House of Representatives.",
    maxSelections: 1,
    candidates: cebuCityHouseRepNorthCandidates
  },
  {
    id: "house-rep-cebu-south",
    title: "Member, House of Representatives - Cebu City (South District)",
    description: "Representatives of Cebu City's South District in the House of Representatives.",
    maxSelections: 1,
    candidates: cebuCityHouseRepSouthCandidates
  },
  {
    id: "mayor-cebu",
    title: "Mayor - City of Cebu",
    description: "The chief executive of the City of Cebu.",
    maxSelections: 1,
    candidates: cebuCityMayorCandidates
  },
  {
    id: "vice-mayor-cebu",
    title: "Vice-Mayor - City of Cebu",
    description: "The second-highest executive official in the City of Cebu.",
    maxSelections: 1,
    candidates: cebuCityViceMayorCandidates
  },
  {
    id: "councilor-cebu-north",
    title: "Councilor - City of Cebu (North District)",
    description: "Members of the city council for Cebu City's North District.",
    maxSelections: 8,
    candidates: cebuCityCouncilorNorthCandidates
  },
  {
    id: "councilor-cebu-south",
    title: "Councilor - City of Cebu (South District)",
    description: "Members of the city council for Cebu City's South District.",
    maxSelections: 8,
    candidates: cebuCityCouncilorSouthCandidates
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
