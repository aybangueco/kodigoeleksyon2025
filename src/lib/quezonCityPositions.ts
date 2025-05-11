
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  quezonCityHouseRepFirstCandidates,
  quezonCityHouseRepSecondCandidates,
  quezonCityHouseRepThirdCandidates,
  quezonCityHouseRepFourthCandidates,
  quezonCityHouseRepFifthCandidates,
  quezonCityHouseRepSixthCandidates,
  quezonCityMayorCandidates,
  quezonCityViceMayorCandidates,
  quezonCityCouncilorFirstCandidates,
  quezonCityCouncilorSecondCandidates,
  quezonCityCouncilorThirdCandidates,
  quezonCityCouncilorFourthCandidates,
  quezonCityCouncilorFifthCandidates,
  quezonCityCouncilorSixthCandidates
} from './candidateData/quezonCityCandidates';

// Quezon City positions
export const quezonCityPositions: Position[] = [
  {
    id: "house-rep-quezon-first",
    title: "Member, House of Representatives - Quezon City (First District)",
    description: "Representatives of Quezon City's First District in the House of Representatives.",
    maxSelections: 1,
    candidates: quezonCityHouseRepFirstCandidates
  },
  {
    id: "house-rep-quezon-second",
    title: "Member, House of Representatives - Quezon City (Second District)",
    description: "Representatives of Quezon City's Second District in the House of Representatives.",
    maxSelections: 1,
    candidates: quezonCityHouseRepSecondCandidates
  },
  {
    id: "house-rep-quezon-third",
    title: "Member, House of Representatives - Quezon City (Third District)",
    description: "Representatives of Quezon City's Third District in the House of Representatives.",
    maxSelections: 1,
    candidates: quezonCityHouseRepThirdCandidates
  },
  {
    id: "house-rep-quezon-fourth",
    title: "Member, House of Representatives - Quezon City (Fourth District)",
    description: "Representatives of Quezon City's Fourth District in the House of Representatives.",
    maxSelections: 1,
    candidates: quezonCityHouseRepFourthCandidates
  },
  {
    id: "house-rep-quezon-fifth",
    title: "Member, House of Representatives - Quezon City (Fifth District)",
    description: "Representatives of Quezon City's Fifth District in the House of Representatives.",
    maxSelections: 1,
    candidates: quezonCityHouseRepFifthCandidates
  },
  {
    id: "house-rep-quezon-sixth",
    title: "Member, House of Representatives - Quezon City (Sixth District)",
    description: "Representatives of Quezon City's Sixth District in the House of Representatives.",
    maxSelections: 1,
    candidates: quezonCityHouseRepSixthCandidates
  },
  {
    id: "mayor-quezon",
    title: "Mayor - City of Quezon",
    description: "The chief executive of the City of Quezon.",
    maxSelections: 1,
    candidates: quezonCityMayorCandidates
  },
  {
    id: "vice-mayor-quezon",
    title: "Vice-Mayor - City of Quezon",
    description: "The second-highest executive official in the City of Quezon.",
    maxSelections: 1,
    candidates: quezonCityViceMayorCandidates
  },
  {
    id: "councilor-quezon-first",
    title: "Councilor - City of Quezon (First District)",
    description: "Members of the city council for Quezon City's First District.",
    maxSelections: 6,
    candidates: quezonCityCouncilorFirstCandidates
  },
  {
    id: "councilor-quezon-second",
    title: "Councilor - City of Quezon (Second District)",
    description: "Members of the city council for Quezon City's Second District.",
    maxSelections: 6,
    candidates: quezonCityCouncilorSecondCandidates
  },
  {
    id: "councilor-quezon-third",
    title: "Councilor - City of Quezon (Third District)",
    description: "Members of the city council for Quezon City's Third District.",
    maxSelections: 6,
    candidates: quezonCityCouncilorThirdCandidates
  },
  {
    id: "councilor-quezon-fourth",
    title: "Councilor - City of Quezon (Fourth District)",
    description: "Members of the city council for Quezon City's Fourth District.",
    maxSelections: 6,
    candidates: quezonCityCouncilorFourthCandidates
  },
  {
    id: "councilor-quezon-fifth",
    title: "Councilor - City of Quezon (Fifth District)",
    description: "Members of the city council for Quezon City's Fifth District.",
    maxSelections: 6,
    candidates: quezonCityCouncilorFifthCandidates
  },
  {
    id: "councilor-quezon-sixth",
    title: "Councilor - City of Quezon (Sixth District)",
    description: "Members of the city council for Quezon City's Sixth District.",
    maxSelections: 6,
    candidates: quezonCityCouncilorSixthCandidates
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
