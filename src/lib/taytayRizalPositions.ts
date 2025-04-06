
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  taytayRizalHouseRepCandidates,
  taytayRizalProvincialGovernorCandidates,
  taytayRizalProvincialViceGovernorCandidates,
  taytayRizalBoardMemberCandidates,
  taytayRizalMayorCandidates,
  taytayRizalViceMayorCandidates,
  taytayRizalCouncilorCandidates
} from './candidateData/taytayRizalCandidates';

// Taytay, Rizal positions
export const taytayRizalPositions: Position[] = [
  {
    id: "house-rep-taytay",
    title: "Member, House of Representatives - Rizal",
    description: "Representatives of Rizal in the House of Representatives.",
    maxSelections: 1,
    candidates: taytayRizalHouseRepCandidates
  },
  {
    id: "governor-rizal",
    title: "Provincial Governor - Rizal",
    description: "The chief executive of the province of Rizal.",
    maxSelections: 1,
    candidates: taytayRizalProvincialGovernorCandidates
  },
  {
    id: "vice-governor-rizal",
    title: "Provincial Vice-Governor - Rizal",
    description: "The second-highest executive official in the province of Rizal.",
    maxSelections: 1,
    candidates: taytayRizalProvincialViceGovernorCandidates
  },
  {
    id: "board-member-rizal",
    title: "Member, Sangguniang Panlalawigan - Rizal",
    description: "Members of the provincial legislature of Rizal.",
    maxSelections: 4,
    candidates: taytayRizalBoardMemberCandidates
  },
  {
    id: "mayor-taytay",
    title: "Mayor - Municipality of Taytay",
    description: "The chief executive of the Municipality of Taytay, Rizal.",
    maxSelections: 1,
    candidates: taytayRizalMayorCandidates
  },
  {
    id: "vice-mayor-taytay",
    title: "Vice-Mayor - Municipality of Taytay",
    description: "The second-highest executive official in the Municipality of Taytay, Rizal.",
    maxSelections: 1,
    candidates: taytayRizalViceMayorCandidates
  },
  {
    id: "councilor-taytay",
    title: "Member, Sangguniang Bayan - Taytay",
    description: "Members of the municipal council of Taytay, Rizal.",
    maxSelections: 8,
    candidates: taytayRizalCouncilorCandidates
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
