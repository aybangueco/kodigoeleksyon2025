
import { ElectionResult } from "@/types/electionResults";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface ResultsStatsProps {
  data: ElectionResult | null;
}

const ResultsStats = ({ data }: ResultsStatsProps) => {
  if (!data) return null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium">Election Returns</CardTitle>
            <CardDescription>Processed returns</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.er.count.toLocaleString()} / {data.er.total.toLocaleString()}
          </div>
          <Progress value={data.er.percentage} className="mt-2" />
          <p className="mt-1 text-xs text-muted-foreground">{data.er.percentage}% complete</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <div>
            <CardTitle className="text-sm font-medium">Voter Turnout</CardTitle>
            <CardDescription>Counted votes</CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            {data.voter.count.toLocaleString()} / {data.voter.total.toLocaleString()}
          </div>
          <Progress value={data.voter.percentage} className="mt-2" />
          <p className="mt-1 text-xs text-muted-foreground">{data.voter.percentage}% of registered voters</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ResultsStats;
