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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
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
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
