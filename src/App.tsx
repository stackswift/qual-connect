import React, { createContext, useContext, useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Suppliers from "./pages/Suppliers";
import Queries from "./pages/Queries";
import NewQuery from "./pages/NewQuery";
import QueryDetail from "./pages/QueryDetail";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const QueryContext = createContext(null);
export const useQueryContext = () => useContext(QueryContext);

const App = () => {
  const [queries, setQueries] = useState([]);
  // Load initial queries from mockQueries
  React.useEffect(() => {
    import("@/data/mockData").then((mod) => setQueries(mod.mockQueries));
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <QueryContext.Provider value={{ queries, setQueries }}>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Suppliers />} />
              <Route path="/queries" element={<Queries />} />
              <Route path="/query/new" element={<NewQuery />} />
              <Route path="/query/:id" element={<QueryDetail />} />
              <Route path="/queries/:id" element={<QueryDetail />} />
              <Route path="/new-query" element={<NewQuery />} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </QueryContext.Provider>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
