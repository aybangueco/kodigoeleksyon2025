
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { fetchSenatorResults } from "@/services/resultsService";
import ResultsTable from "@/components/results/ResultsTable";
import ResultsStats from "@/components/results/ResultsStats";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";

const NationalResults = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ["senatorResults"],
    queryFn: fetchSenatorResults,
  });

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Helmet>
        <title>National Election Results 2025 | Kodigo Eleksyon</title>
        <meta name="description" content="Live 2025 Philippine National Election results for Senators and Party List. Stay updated with real-time vote counting." />
      </Helmet>

      <main className="container mx-auto max-w-6xl px-6 mt-24 mb-8">
        <div className="mb-6">
          <h1 className="text-3xl font-bold tracking-tight">National Election Results 2025</h1>
          <p className="text-muted-foreground mt-2">
            Live results for Senate elections in the Philippines
          </p>
          
          <div className="flex gap-2 mt-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline">Home</Link> 
            <span className="text-sm text-muted-foreground">/</span> 
            <span className="text-sm">Election Results</span>
          </div>
        </div>

        {error ? (
          <Alert className="border-red-200 bg-red-50 mb-6">
            <AlertTriangle className="h-4 w-4 text-red-800" />
            <AlertDescription className="text-red-700">
              There was an error loading the election results. Please try again later.
            </AlertDescription>
          </Alert>
        ) : (
          <>
            <Alert className="border-blue-200 bg-blue-50 mb-6">
              <AlertTriangle className="h-4 w-4 text-blue-800" />
              <AlertDescription className="text-blue-700">
                These results are for demonstration purposes only. Official election results should be verified through COMELEC.
              </AlertDescription>
            </Alert>

            {data && <ResultsStats data={data} />}
            
            <div className="mt-6">
              <ResultsTable data={data!} isLoading={isLoading} />
            </div>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default NationalResults;
