
export interface CandidateResult {
  rank: string;
  locationInfo: string;
  candidateCode: string;
  candidateName: string;
  lastName: string;
  firstName: string;
  partyNameShort: string;
  partyName: string;
  voteCount: string;
}

export interface ElectionResultStats {
  count: number;
  total: number;
  percentage: number;
}

export interface ElectionResult {
  positionName: string;
  er: ElectionResultStats;
  voter: ElectionResultStats;
  isFeedZero: boolean;
  result: CandidateResult[];
  locationCode: number;
  locationName: string;
  contestLocationName: string;
}

export type ResultType = 'senator' | 'partylist';
