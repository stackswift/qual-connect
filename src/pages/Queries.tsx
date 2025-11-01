import { useState } from "react";
import { useQueryContext } from "../App";
import Header from "@/components/Header";
import QueryCard from "@/components/QueryCard";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { QueryStatus } from "@/data/mockData";

const Queries = () => {
  const [activeTab, setActiveTab] = useState<string>("all");
  const { queries } = useQueryContext();

  const filterQueries = (status?: QueryStatus) => {
    if (!status) return queries;
    return queries.filter(query => query.status === status);
  };

  const getTabCount = (status?: QueryStatus) => {
    return filterQueries(status).length;
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            All Queries
          </h1>
          <p className="text-muted-foreground text-lg font-medium">
            View and manage all supplier queries
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6">
            <TabsTrigger value="all">
              All ({getTabCount()})
            </TabsTrigger>
            <TabsTrigger value="pending">
              Pending ({getTabCount('pending')})
            </TabsTrigger>
            <TabsTrigger value="in-progress">
              In Progress ({getTabCount('in-progress')})
            </TabsTrigger>
            <TabsTrigger value="urgent">
              Urgent ({getTabCount('urgent')})
            </TabsTrigger>
            <TabsTrigger value="resolved">
              Resolved ({getTabCount('resolved')})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="space-y-4">
            {queries.map(query => (
              <QueryCard key={query.id} query={query} />
            ))}
          </TabsContent>

          <TabsContent value="pending" className="space-y-4">
            {filterQueries('pending').map(query => (
              <QueryCard key={query.id} query={query} />
            ))}
          </TabsContent>

          <TabsContent value="in-progress" className="space-y-4">
            {filterQueries('in-progress').map(query => (
              <QueryCard key={query.id} query={query} />
            ))}
          </TabsContent>

          <TabsContent value="urgent" className="space-y-4">
            {filterQueries('urgent').map(query => (
              <QueryCard key={query.id} query={query} />
            ))}
          </TabsContent>

          <TabsContent value="resolved" className="space-y-4">
            {filterQueries('resolved').map(query => (
              <QueryCard key={query.id} query={query} />
            ))}
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Queries;
