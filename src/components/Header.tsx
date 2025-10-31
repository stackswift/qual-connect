import { FileQuestion, Plus } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Header = () => {
  const location = useLocation();

  return (
    <header style={{ borderBottom: '1px solid #eee', background: '#fafafa', boxShadow: '0 1px 4px #eee' }}>
      <div style={{ display: 'flex', height: 56, alignItems: 'center', justifyContent: 'space-between', padding: '0 24px' }}>
        {/* No logo, name, or branding */}
        <nav style={{ display: 'flex', gap: 32 }}>
          <Link to="/" style={{ fontSize: 16, fontWeight: 'bold', textDecoration: 'none', color: '#222' }}>Suppliers</Link>
          <Link to="/queries" style={{ fontSize: 16, fontWeight: 'bold', textDecoration: 'none', color: '#222' }}>All Queries</Link>
        </nav>
        <Link to="/query/new">
          <button style={{ fontWeight: 'bold', fontSize: 16, padding: '8px 16px', border: '1px solid #aaa', borderRadius: 4, background: '#eaeaea' }}>New Query</button>
        </Link>
      </div>
    </header>
  );
};

export default Header;
