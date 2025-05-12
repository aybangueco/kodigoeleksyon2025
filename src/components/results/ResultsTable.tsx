
import { ElectionResult } from "@/types/electionResults";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ResultsTableProps {
  data: ElectionResult;
  isLoading: boolean;
}

const ResultsTable = ({ data, isLoading }: ResultsTableProps) => {
  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Loading results...</CardTitle>
          <CardDescription>Please wait while we fetch the latest election data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-60 flex items-center justify-center">
            <div className="animate-pulse text-center">
              <div className="h-4 w-32 bg-muted rounded mx-auto"></div>
              <div className="mt-2 text-sm text-muted-foreground">Loading candidate data...</div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data || !data.result || data.result.length === 0) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>No results available</CardTitle>
          <CardDescription>Election data is not yet available for this position</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-40 flex items-center justify-center">
            <div className="text-center">
              <p className="text-muted-foreground">Check back later for updates</p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>{data.positionName} Results</CardTitle>
        <CardDescription>
          Election results for {data.contestLocationName}
          {data.isFeedZero && (
            <Badge variant="outline" className="ml-2 bg-yellow-50 text-yellow-700">
              Preliminary Data
            </Badge>
          )}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-14">Rank</TableHead>
                <TableHead>Candidate</TableHead>
                <TableHead>Party</TableHead>
                <TableHead className="text-right">Votes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.result.map((candidate) => (
                <TableRow key={candidate.candidateCode}>
                  <TableCell className="font-medium">{candidate.rank}</TableCell>
                  <TableCell>{candidate.candidateName}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{candidate.partyNameShort}</Badge>
                  </TableCell>
                  <TableCell className="text-right">{candidate.voteCount.toLocaleString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <div className="mt-4 flex justify-between text-sm text-muted-foreground">
          <div>
            <p>Election Returns: {data.er.count} of {data.er.total} ({data.er.percentage}%)</p>
          </div>
          <div>
            <p>Last updated: {new Date().toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ResultsTable;
