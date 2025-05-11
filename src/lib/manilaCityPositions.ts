import { Position } from './positions';
import { senatorCandidates } from './candidateData/senators';
import { partyListCandidates } from './candidateData/partyList';
import {
    manilaCityHouseRepFirstCandidates,
    manilaCityHouseRepSecondCandidates,
    manilaCityHouseRepThirdCandidates,
    manilaCityHouseRepFourthCandidates,
    manilaCityHouseRepFifthCandidates,
    manilaCityHouseRepSixthCandidates,
    manilaCityMayorCandidates,
    manilaCityViceMayorCandidates,
    manilaCityCouncilorFirstCandidates,
    manilaCityCouncilorSecondCandidates,
    manilaCityCouncilorThirdCandidates,
    manilaCityCouncilorFourthCandidates,
    manilaCityCouncilorFifthCandidates,
    manilaCityCouncilorSixthCandidates
} from './candidateData/manilaCityCandidates';

// Manila City positions
export const manilaCityPositions: Position[] = [
    {
        id: "house-rep-manila-first",
        title: "Member, House of Representatives - Manila (First District)",
        description: "Representatives of Manila's First District in the House of Representatives.",
        maxSelections: 1,
        candidates: manilaCityHouseRepFirstCandidates
    },
    {
        id: "house-rep-manila-second",
        title: "Member, House of Representatives - Manila (Second District)",
        description: "Representatives of Manila's Second District in the House of Representatives.",
        maxSelections: 1,
        candidates: manilaCityHouseRepSecondCandidates
    },
    {
        id: "house-rep-manila-third",
        title: "Member, House of Representatives - Manila (Third District)",
        description: "Representatives of Manila's Third District in the House of Representatives.",
        maxSelections: 1,
        candidates: manilaCityHouseRepThirdCandidates
    },
    {
        id: "house-rep-manila-fourth",
        title: "Member, House of Representatives - Manila (Fourth District)",
        description: "Representatives of Manila's Fourth District in the House of Representatives.",
        maxSelections: 1,
        candidates: manilaCityHouseRepFourthCandidates
    },
    {
        id: "house-rep-manila-fifth",
        title: "Member, House of Representatives - Manila (Fifth District)",
        description: "Representatives of Manila's Fifth District in the House of Representatives.",
        maxSelections: 1,
        candidates: manilaCityHouseRepFifthCandidates
    },
    {
        id: "house-rep-manila-sixth",
        title: "Member, House of Representatives - Manila (Sixth District)",
        description: "Representatives of Manila's Sixth District in the House of Representatives.",
        maxSelections: 1,
        candidates: manilaCityHouseRepSixthCandidates
    },
    {
        id: "mayor-manila",
        title: "Mayor - City of Manila",
        description: "The chief executive of the City of Manila.",
        maxSelections: 1,
        candidates: manilaCityMayorCandidates
    },
    {
        id: "vice-mayor-manila",
        title: "Vice-Mayor - City of Manila",
        description: "The second-highest executive official in the City of Manila.",
        maxSelections: 1,
        candidates: manilaCityViceMayorCandidates
    },
    {
        id: "councilor-manila-first",
        title: "Councilor - City of Manila (First District)",
        description: "Members of the city council for Manila's First District.",
        maxSelections: 6,
        candidates: manilaCityCouncilorFirstCandidates
    },
    {
        id: "councilor-manila-second",
        title: "Councilor - City of Manila (Second District)",
        description: "Members of the city council for Manila's Second District.",
        maxSelections: 6,
        candidates: manilaCityCouncilorSecondCandidates
    },
    {
        id: "councilor-manila-third",
        title: "Councilor - City of Manila (Third District)",
        description: "Members of the city council for Manila's Third District.",
        maxSelections: 6,
        candidates: manilaCityCouncilorThirdCandidates
    },
    {
        id: "councilor-manila-fourth",
        title: "Councilor - City of Manila (Fourth District)",
        description: "Members of the city council for Manila's Fourth District.",
        maxSelections: 6,
        candidates: manilaCityCouncilorFourthCandidates
    },
    {
        id: "councilor-manila-fifth",
        title: "Councilor - City of Manila (Fifth District)",
        description: "Members of the city council for Manila's Fifth District.",
        maxSelections: 6,
        candidates: manilaCityCouncilorFifthCandidates
    },
    {
        id: "councilor-manila-sixth",
        title: "Councilor - City of Manila (Sixth District)",
        description: "Members of the city council for Manila's Sixth District.",
        maxSelections: 6,
        candidates: manilaCityCouncilorSixthCandidates
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