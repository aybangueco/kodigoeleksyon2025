
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
  caintaRizalHouseRepCandidates,
  caintaRizalProvincialGovernorCandidates,
  caintaRizalProvincialViceGovernorCandidates,
  caintaRizalBoardMemberCandidates,
  caintaRizalMayorCandidates,
  caintaRizalViceMayorCandidates,
  caintaRizalCouncilorCandidates
} from './candidateData/caintaRizalCandidates';

// Cainta, Rizal positions
export const caintaRizalPositions: Position[] = [
  {
    id: "house-rep-cainta",
    title: "Member, House of Representatives - Rizal",
    description: "Representatives of Rizal in the House of Representatives.",
    maxSelections: 1,
    candidates: caintaRizalHouseRepCandidates
  },
  {
    id: "governor-rizal",
    title: "Provincial Governor - Rizal",
    description: "The chief executive of the province of Rizal.",
    maxSelections: 1,
    candidates: caintaRizalProvincialGovernorCandidates
  },
  {
    id: "vice-governor-rizal",
    title: "Provincial Vice-Governor - Rizal",
    description: "The second-highest executive official in the province of Rizal.",
    maxSelections: 1,
    candidates: caintaRizalProvincialViceGovernorCandidates
  },
  {
    id: "board-member-rizal",
    title: "Member, Sangguniang Panlalawigan - Rizal",
    description: "Members of the provincial legislature of Rizal.",
    maxSelections: 4,
    candidates: caintaRizalBoardMemberCandidates
  },
  {
    id: "mayor-cainta",
    title: "Mayor - Municipality of Cainta",
    description: "The chief executive of the Municipality of Cainta, Rizal.",
    maxSelections: 1,
    candidates: caintaRizalMayorCandidates
  },
  {
    id: "vice-mayor-cainta",
    title: "Vice-Mayor - Municipality of Cainta",
    description: "The second-highest executive official in the Municipality of Cainta, Rizal.",
    maxSelections: 1,
    candidates: caintaRizalViceMayorCandidates
  },
  {
    id: "councilor-cainta",
    title: "Member, Sangguniang Bayan - Cainta",
    description: "Members of the municipal council of Cainta, Rizal.",
    maxSelections: 8,
    candidates: caintaRizalCouncilorCandidates
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
