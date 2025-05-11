import { partyListCandidates } from "./candidateData/partyList";
import {
  samalBataanCouncilorCandidates,
  samalBataanHouseRepCandidates,
  samalBataanMayorCandidates,
  samalBataanProvincialGovernorCandidates,
  samalBataanProvincialViceGovernorCandidates,
} from "./candidateData/samalBataanCandidates";
import { senatorCandidates } from "./candidateData/senators";
import { Position } from "./positions";

export const samalBataanPositions: Position[] = [
  {
    id: "house-rep-samal",
    title: "Member, House of Representatives - Bataan",
    description: "Representatives of Bataan in the House of Representatives.",
    maxSelections: 1,
    candidates: samalBataanHouseRepCandidates,
  },
  {
    id: "governor-rizal",
    title: "Provincial Governor - Bataan",
    description: "The chief executive of the province of Bataan.",
    maxSelections: 1,
    candidates: samalBataanProvincialGovernorCandidates,
  },
  {
    id: "vice-governor-samal",
    title: "Provincial Vice-Governor - Samal",
    description:
      "The second-highest executive official in the province of Samal.",
    maxSelections: 1,
    candidates: samalBataanProvincialViceGovernorCandidates,
  },
  {
    id: "mayor-samal",
    title: "Mayor - Municipality of Samal",
    description: "The chief executive of the Municipality of Samal, Bataan.",
    maxSelections: 1,
    candidates: samalBataanMayorCandidates,
  },
  {
    id: "vice-mayor-samal",
    title: "Vice Mayor - Municipality of Samal",
    description:
      "The second highest executive of the Municipality of Samal, Bataan.",
    maxSelections: 1,
    candidates: samalBataanMayorCandidates,
  },
  {
    id: "councilor-samal",
    title: "Member, Sangguniang Bayan - Samal",
    description: "Members of the municipal council of Samal, Bataan.",
    maxSelections: 8,
    candidates: samalBataanCouncilorCandidates,
  },
  {
    id: "senators",
    title: "Senator",
    description: "Members of the Senate, the upper chamber of Congress.",
    maxSelections: 12,
    candidates: senatorCandidates,
  },
  {
    id: "party-list",
    title: "Party List",
    description:
      "Representatives of marginalized and underrepresented sectors.",
    maxSelections: 1,
    candidates: partyListCandidates,
  },
];
