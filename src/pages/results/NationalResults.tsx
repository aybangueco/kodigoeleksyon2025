
import { useQuery } from "@tanstack/react-query";
import { Helmet } from "react-helmet-async";
import { fetchSenatorResults, fetchPartyListResults } from "@/services/resultsService";
import ResultsTable from "@/components/results/ResultsTable";
import ResultsStats from "@/components/results/ResultsStats";
import Footer from "@/components/Footer";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, Loader2, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResultType } from "@/types/electionResults";

const NationalResults = () => {
  const [selectedTab, setSelectedTab] = useState<ResultType>("senator");

  const senatorQuery = useQuery({
    queryKey: ["senatorResults"],
    queryFn: fetchSenatorResults,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
  });

  const partyListQuery = useQuery({
    queryKey: ["partyListResults"],
    queryFn: fetchPartyListResults,
    refetchInterval: 30000, // Refetch every 30 seconds
    retry: 3,
    enabled: selectedTab === "partylist", // Only fetch when this tab is selected
  });

  const getActiveQuery = () => {
    return selectedTab === "senator" ? senatorQuery : partyListQuery;
  };

  const { data, isLoading, error } = getActiveQuery();
  const usingMockData = error || !data?.er?.percentage;

  const handleTabChange = (value: string) => {
    setSelectedTab(value as ResultType);
  };

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
            Live results for national elections in the Philippines
          </p>
          
          <div className="flex gap-2 mt-4">
            <Link to="/" className="text-sm text-blue-600 hover:underline">Home</Link> 
            <span className="text-sm text-muted-foreground">/</span> 
            <span className="text-sm">Election Results</span>
          </div>
        </div>

        <Alert className="border-blue-200 bg-blue-50 mb-6">
          <AlertTriangle className="h-4 w-4 text-blue-800" />
          <AlertDescription className="text-blue-700">
            These results are for demonstration purposes. Official election results should be verified through COMELEC.
          </AlertDescription>
        </Alert>

        {usingMockData && (
          <Alert className="border-amber-200 bg-amber-50 mb-6">
            <Info className="h-4 w-4 text-amber-800" />
            <AlertTitle className="text-amber-800">Using Demonstration Data</AlertTitle>
            <AlertDescription className="text-amber-700">
              Due to API access restrictions, we're currently displaying simulated election data. 
              For official live results, please visit the <a href="https://halalanresults.abs-cbn.com" className="font-medium underline" target="_blank" rel="noopener noreferrer">ABS-CBN Election Results</a> website.
            </AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="senator" value={selectedTab} onValueChange={handleTabChange} className="mb-6">
          <TabsList className="grid grid-cols-2 w-full max-w-md">
            <TabsTrigger value="senator">Senator</TabsTrigger>
            <TabsTrigger value="partylist">Party List</TabsTrigger>
          </TabsList>
          
          <TabsContent value="senator" className="pt-4">
            <h2 className="text-xl font-medium mb-4">Senatorial Race Results</h2>
            {renderContent(senatorQuery.data, senatorQuery.isLoading, senatorQuery.error)}
          </TabsContent>
          
          <TabsContent value="partylist" className="pt-4">
            <h2 className="text-xl font-medium mb-4">Party List Results</h2>
            {renderContent(partyListQuery.data, partyListQuery.isLoading, partyListQuery.error)}
          </TabsContent>
        </Tabs>
      </main>

      <Footer />
    </div>
  );

  function renderContent(data: any, isLoading: boolean, error: Error | null) {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center py-12">
          <Loader2 className="h-12 w-12 animate-spin text-primary mb-4" />
          <p className="text-muted-foreground">Loading latest election results...</p>
        </div>
      );
    }
    
    if (error) {
      return (
        <Alert className="border-red-200 bg-red-50 mb-6">
          <AlertTriangle className="h-4 w-4 text-red-800" />
          <AlertDescription className="text-red-700">
            There was an error loading the election results. Using demonstration data instead.
          </AlertDescription>
        </Alert>
      );
    }
    
    return (
      <>
        {data && <ResultsStats data={data} />}
        
        <div className="mt-6">
          <ResultsTable data={data!} isLoading={false} />
        </div>
      </>
    );
  }
};

export default NationalResults;
