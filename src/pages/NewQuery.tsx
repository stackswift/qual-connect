import React from "react";
import { useNavigate } from "react-router-dom";
import { mockSuppliers } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";
import { useQueryContext } from "../App";

const NewQuery = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { queries, setQueries } = useQueryContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const supplier = (form.supplier as HTMLSelectElement).value;
    const subject = (form.subject as HTMLInputElement).value.trim();
    const category = (form.category as HTMLSelectElement).value;
    const priority = (form.priority as HTMLSelectElement).value;
    const description = (form.description as HTMLTextAreaElement).value.trim();
    const dueDate = (form.dueDate as HTMLInputElement).value;

    if (!supplier || !subject || !category || !priority || !description || !dueDate) {
      toast({ title: "Please fill all the details", description: "All fields are required.", variant: "destructive" });
      return;
    }

    // Find supplier name
    const supplierObj = mockSuppliers.find(s => s.id === supplier);
    const supplierName = supplierObj ? supplierObj.name : supplier;

    // Create new query object
    const newQuery = {
      id: `QRY-${Date.now()}`,
      supplierId: supplier,
      supplierName,
      subject,
      category,
      status: "pending",
      priority,
      description,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      dueDate,
      timeline: [
        {
          id: `T-${Date.now()}`,
          action: "Query Submitted",
          timestamp: new Date().toISOString(),
          user: "Current User"
        }
      ]
    };
    setQueries([newQuery, ...queries]);
    toast({ title: "Query Submitted", description: "Your query has been sent successfully." });
    setTimeout(() => navigate("/queries"), 1200);
  };

  const [attachedFile, setAttachedFile] = React.useState<File | null>(null);
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div style={{ background: '#f7f8fa', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      {/* Back button on the left */}
      <div style={{ width: '100%', maxWidth: 480, display: 'flex', justifyContent: 'flex-start', margin: '0 auto' }}>
        <button onClick={() => navigate(-1)} style={{ margin: '0 0 24px 0', padding: '10px 20px', border: 'none', borderRadius: 6, background: '#e0e0e0', fontWeight: 'bold', fontSize: 15, boxShadow: '0 1px 4px #e0e0e0', cursor: 'pointer', transition: 'background 0.2s' }}>← Back</button>
      </div>
      {/* Header centered */}
      <div style={{ padding: '20px 0 28px 0', borderBottom: '1px solid #eee', marginBottom: 32, textAlign: 'center', width: '100%' }}>
        <div style={{ fontSize: 28, fontWeight: 'bold', letterSpacing: '0.5px', color: '#222' }}>Raise New Query</div>
      </div>
      <div style={{ maxWidth: 480, width: '100%', background: '#fff', borderRadius: 16, boxShadow: '0 4px 24px #e0e0e0', padding: '36px 32px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <form onSubmit={handleSubmit} style={{ width: '100%' }}>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="supplier" style={{ display: 'block', marginBottom: 7, fontWeight: 600, fontSize: 15, color: '#333' }}>To: Supplier</label>
            <select id="supplier" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, background: '#f9fafb', color: '#222' }}>
              <option value="">Select supplier</option>
              {mockSuppliers.map(supplier => (
                <option key={supplier.id} value={supplier.id}>{supplier.id}</option>
              ))}
            </select>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="subject" style={{ display: 'block', marginBottom: 7, fontWeight: 600, fontSize: 15, color: '#333' }}>Subject</label>
            <input id="subject" type="text" placeholder="Enter subject" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, background: '#f9fafb', color: '#222' }} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="category" style={{ display: 'block', marginBottom: 7, fontWeight: 600, fontSize: 15, color: '#333' }}>Category</label>
            <select id="category" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, background: '#f9fafb', color: '#222' }}>
              <option value="">Select category</option>
              <option value="allergen">Allergen</option>
              <option value="certificate">Certificate</option>
              <option value="ingredient">Ingredient</option>
              <option value="compliance">Compliance</option>
              <option value="quality">Quality</option>
            </select>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="priority" style={{ display: 'block', marginBottom: 7, fontWeight: 600, fontSize: 15, color: '#333' }}>Priority</label>
            <select id="priority" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, background: '#f9fafb', color: '#222' }}>
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="description" style={{ display: 'block', marginBottom: 7, fontWeight: 600, fontSize: 15, color: '#333' }}>Query</label>
            <textarea id="description" placeholder="Enter your query details" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: 8, minHeight: 80, fontSize: 15, background: '#f9fafb', color: '#222' }} />
          </div>
          <div style={{ marginBottom: 22 }}>
            <label htmlFor="dueDate" style={{ display: 'block', marginBottom: 7, fontWeight: 600, fontSize: 15, color: '#333' }}>Due Date</label>
            <input id="dueDate" type="date" style={{ width: '100%', padding: '12px', border: '1px solid #d1d5db', borderRadius: 8, fontSize: 15, background: '#f9fafb', color: '#222' }} />
          </div>
          <div style={{ marginBottom: 22, textAlign: 'left' }}>
            <input
              type="file"
              ref={fileInputRef}
              style={{ display: 'none' }}
              onChange={e => {
                if (e.target.files && e.target.files[0]) {
                  setAttachedFile(e.target.files[0]);
                }
              }}
            />
            <button
              type="button"
              style={{ padding: '10px 18px', border: '1px solid #bbb', borderRadius: 8, background: '#f3f4f6', fontWeight: 500, fontSize: 15, color: '#333', cursor: 'pointer', transition: 'background 0.2s' }}
              onClick={() => fileInputRef.current?.click()}
            >
              {attachedFile ? `Attached: ${attachedFile.name}` : "Attach File"}
            </button>
          </div>
          <div>
            <button type="submit" style={{ width: '100%', fontWeight: 'bold', fontSize: 17, padding: '14px 0', border: 'none', borderRadius: 8, background: '#2563eb', color: '#fff', letterSpacing: '0.5px', boxShadow: '0 2px 8px #e0e0e0', cursor: 'pointer', transition: 'background 0.2s' }}>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewQuery;
