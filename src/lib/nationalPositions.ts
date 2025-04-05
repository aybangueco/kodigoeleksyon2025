
import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';

// National positions data - only senators and party list
export const nationalPositions: Position[] = [
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
