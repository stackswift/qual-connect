export type QueryStatus = 'pending' | 'in-progress' | 'resolved' | 'urgent';
export type QueryCategory = 'allergen' | 'certificate' | 'ingredient' | 'compliance' | 'quality';

export interface Supplier {
  id: string;
  name: string;
  category: string;
  location: string;
  activeQueries: number;
  pendingQueries: number;
  resolvedQueries: number;
  lastContact: string;
}

export interface Query {
  id: string;
  supplierId: string;
  supplierName: string;
  subject: string;
  category: QueryCategory;
  status: QueryStatus;
  priority: 'low' | 'medium' | 'high';
  description: string;
  createdAt: string;
  updatedAt: string;
  dueDate: string;
  timeline: {
    id: string;
    action: string;
    timestamp: string;
    user: string;
    notes?: string;
  }[];
}

export const mockSuppliers: Supplier[] = [
  {
    id: 'SUP-001',
    name: 'Fresh Valley Farms',
    category: 'Produce',
    location: 'California, USA',
    activeQueries: 2,
    pendingQueries: 1,
    resolvedQueries: 8,
    lastContact: '2025-10-28'
  },
  {
    id: 'SUP-002',
    name: 'Dairy Excellence Ltd',
    category: 'Dairy Products',
    location: 'Wisconsin, USA',
    activeQueries: 1,
    pendingQueries: 1,
    resolvedQueries: 15,
    lastContact: '2025-10-29'
  },
  {
    id: 'SUP-003',
    name: 'Ocean Harvest Co.',
    category: 'Seafood',
    location: 'Maine, USA',
    activeQueries: 3,
    pendingQueries: 2,
    resolvedQueries: 12,
    lastContact: '2025-10-30'
  },
  {
    id: 'SUP-004',
    name: 'Golden Grains International',
    category: 'Grains & Cereals',
    location: 'Kansas, USA',
    activeQueries: 0,
    pendingQueries: 0,
    resolvedQueries: 23,
    lastContact: '2025-10-25'
  },
  {
    id: 'SUP-005',
    name: 'Premium Spice Trading',
    category: 'Spices & Seasonings',
    location: 'India',
    activeQueries: 1,
    pendingQueries: 1,
    resolvedQueries: 9,
    lastContact: '2025-10-31'
  },
  {
    id: 'SUP-006',
    name: 'EcoMeat Solutions',
    category: 'Meat Products',
    location: 'Texas, USA',
    activeQueries: 2,
    pendingQueries: 0,
    resolvedQueries: 18,
    lastContact: '2025-10-27'
  }
];

export const mockQueries: Query[] = [
  {
    id: 'QRY-001',
    supplierId: 'SUP-001',
    supplierName: 'Fresh Valley Farms',
    subject: 'Allergen Information for Organic Lettuce',
    category: 'allergen',
    status: 'pending',
    priority: 'high',
    description: 'Please provide detailed allergen information and cross-contamination protocols for your organic lettuce processing facility.',
    createdAt: '2025-10-28T10:30:00',
    updatedAt: '2025-10-28T10:30:00',
    dueDate: '2025-11-04',
    timeline: [
      {
        id: 'T1',
        action: 'Query Submitted',
        timestamp: '2025-10-28T10:30:00',
        user: 'Sarah Chen (QA Manager)'
      }
    ]
  },
  {
    id: 'QRY-002',
    supplierId: 'SUP-002',
    supplierName: 'Dairy Excellence Ltd',
    subject: 'HACCP Certificate Expiry',
    category: 'certificate',
    status: 'in-progress',
    priority: 'medium',
    description: 'Your HACCP certificate expires on Nov 15, 2025. Please provide renewal documentation.',
    createdAt: '2025-10-25T14:20:00',
    updatedAt: '2025-10-29T09:15:00',
    dueDate: '2025-11-05',
    timeline: [
      {
        id: 'T1',
        action: 'Query Submitted',
        timestamp: '2025-10-25T14:20:00',
        user: 'Sarah Chen (QA Manager)'
      },
      {
        id: 'T2',
        action: 'Supplier Acknowledged',
        timestamp: '2025-10-26T08:45:00',
        user: 'John Smith (Supplier)',
        notes: 'Certificate renewal is in process. Will share updated docs by Nov 3.'
      },
      {
        id: 'T3',
        action: 'Follow-up Requested',
        timestamp: '2025-10-29T09:15:00',
        user: 'Sarah Chen (QA Manager)',
        notes: 'Requested ETA confirmation for certificate.'
      }
    ]
  },
  {
    id: 'QRY-003',
    supplierId: 'SUP-003',
    supplierName: 'Ocean Harvest Co.',
    subject: 'Mercury Testing Results',
    category: 'quality',
    status: 'urgent',
    priority: 'high',
    description: 'Urgent: Please provide latest mercury testing results for tuna shipment #TN-2025-891.',
    createdAt: '2025-10-30T16:00:00',
    updatedAt: '2025-10-30T16:00:00',
    dueDate: '2025-11-01',
    timeline: [
      {
        id: 'T1',
        action: 'Query Submitted',
        timestamp: '2025-10-30T16:00:00',
        user: 'Michael Torres (QA Lead)'
      }
    ]
  },
  {
    id: 'QRY-004',
    supplierId: 'SUP-005',
    supplierName: 'Premium Spice Trading',
    subject: 'Ingredient Source Verification',
    category: 'ingredient',
    status: 'resolved',
    priority: 'low',
    description: 'Request verification of turmeric source region and organic certification.',
    createdAt: '2025-10-20T11:00:00',
    updatedAt: '2025-10-26T14:30:00',
    dueDate: '2025-10-28',
    timeline: [
      {
        id: 'T1',
        action: 'Query Submitted',
        timestamp: '2025-10-20T11:00:00',
        user: 'Sarah Chen (QA Manager)'
      },
      {
        id: 'T2',
        action: 'Supplier Responded',
        timestamp: '2025-10-22T09:20:00',
        user: 'Raj Patel (Supplier)',
        notes: 'Provided source documentation and organic certificates.'
      },
      {
        id: 'T3',
        action: 'Documents Verified',
        timestamp: '2025-10-24T15:45:00',
        user: 'Sarah Chen (QA Manager)',
        notes: 'All documents verified and approved.'
      },
      {
        id: 'T4',
        action: 'Query Closed',
        timestamp: '2025-10-26T14:30:00',
        user: 'Sarah Chen (QA Manager)'
      }
    ]
  }
];

export const getCategoryColor = (category: QueryCategory): string => {
  const colors: Record<QueryCategory, string> = {
    allergen: 'text-destructive bg-destructive/10',
    certificate: 'text-primary bg-primary/10',
    ingredient: 'text-accent bg-accent/10',
    compliance: 'text-warning bg-warning/10',
    quality: 'text-success bg-success/10'
  };
  return colors[category];
};

export const getStatusColor = (status: QueryStatus): string => {
  const colors: Record<QueryStatus, string> = {
    pending: 'text-warning bg-warning/10 border-warning/20',
    'in-progress': 'text-primary bg-primary/10 border-primary/20',
    resolved: 'text-success bg-success/10 border-success/20',
    urgent: 'text-destructive bg-destructive/10 border-destructive/20'
  };
  return colors[status];
};

export const getPriorityColor = (priority: 'low' | 'medium' | 'high'): string => {
  const colors = {
    low: 'text-muted-foreground',
    medium: 'text-warning',
    high: 'text-destructive'
  };
  return colors[priority];
};
