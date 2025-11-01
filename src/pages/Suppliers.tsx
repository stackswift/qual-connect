import { useState } from "react";
import Header from "@/components/Header";
import SupplierCard from "@/components/SupplierCard";
import { Input } from "@/components/ui/input";
import { mockSuppliers } from "@/data/mockData";
import { Search } from "lucide-react";

const Suppliers = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredSuppliers = mockSuppliers.filter(supplier =>
    supplier.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
    supplier.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8" aria-label="Supplier List">
        <div className="mb-8 animate-fade-up">
          <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent" style={{ letterSpacing: '0.5px', textAlign: 'center' }} aria-label="Supplier Management Heading">
            Supplier Management
          </h1>
          <p className="text-muted-foreground text-lg font-medium" style={{ textAlign: 'center' }} aria-label="Supplier Management Description">
            Track and manage queries with your food suppliers
          </p>
        </div>

        <div className="mb-8 animate-fade-up">
          <div className="relative max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" aria-label="Search Icon" />
            <Input
              placeholder="Search suppliers by name, category, or location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-base shadow-sm focus:shadow-md transition-shadow duration-300"
              aria-label="Supplier Search Input"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredSuppliers.map((supplier) => (
            <SupplierCard
              key={supplier.id}
              id={supplier.id}
              name={supplier.name}
              status={supplier.activeQueries > 0 ? "active" : supplier.pendingQueries > 0 ? "pending" : "blocked"}
              lastQuery={supplier.lastContact}
            />
          ))}
        </div>

        {filteredSuppliers.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No suppliers found matching your search.</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Suppliers;
