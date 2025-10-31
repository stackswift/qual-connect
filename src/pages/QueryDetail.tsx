import { useParams, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { mockQueries, getCategoryColor, getStatusColor, getPriorityColor } from "@/data/mockData";
import { ArrowLeft, Building2, Calendar, User, AlertCircle, CheckCircle2, Clock, MessageSquare } from "lucide-react";

const QueryDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const query = mockQueries.find(q => q.id === id);

  if (!query) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <p className="text-muted-foreground">Query not found</p>
            <Button onClick={() => navigate('/queries')} className="mt-4">
              Back to Queries
            </Button>
          </div>
        </main>
      </div>
    );
  }

  const isOverdue = new Date(query.dueDate) < new Date() && query.status !== 'resolved';

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Button 
          variant="ghost" 
          className="mb-6 gap-2"
          onClick={() => navigate(-1)}
        >
          <ArrowLeft className="h-4 w-4" />
          Back
        </Button>

        <div className="space-y-6">
          {/* Header Card */}
          <Card className="shadow-xl animate-fade-up">
            <CardContent className="p-8">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-3">
                    <Badge variant="outline" className="text-sm">
                      {query.id}
                    </Badge>
                    <Badge className={`${getCategoryColor(query.category)}`}>
                      {query.category}
                    </Badge>
                    <Badge className={`${getStatusColor(query.status)} border`}>
                      {query.status}
                    </Badge>
                  </div>
                  <h1 className="text-2xl font-bold text-foreground mb-2">
                    {query.subject}
                  </h1>
                  <p className="text-muted-foreground">
                    {query.description}
                  </p>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Building2 className="h-4 w-4" />
                    Supplier
                  </div>
                  <p className="font-medium">{query.supplierName}</p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Calendar className="h-4 w-4" />
                    Due Date
                  </div>
                  <p className={`font-medium ${isOverdue ? 'text-destructive' : ''}`}>
                    {new Date(query.dueDate).toLocaleDateString()}
                    {isOverdue && (
                      <span className="ml-2 text-xs">(Overdue)</span>
                    )}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <AlertCircle className="h-4 w-4" />
                    Priority
                  </div>
                  <p className={`font-medium ${getPriorityColor(query.priority)}`}>
                    {query.priority.toUpperCase()}
                  </p>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    Created
                  </div>
                  <p className="font-medium">
                    {new Date(query.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Timeline Card */}
          <Card className="shadow-xl animate-fade-up" style={{ animationDelay: '0.1s' }}>
            <CardContent className="p-8">
              <h2 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MessageSquare className="h-6 w-6 text-primary" />
                Query Timeline
              </h2>
              
              <div className="space-y-4">
                {query.timeline.map((event, index) => {
                  const isLast = index === query.timeline.length - 1;
                  let icon;
                  let iconColor;
                  
                  if (event.action.includes('Closed') || event.action.includes('Resolved')) {
                    icon = <CheckCircle2 className="h-5 w-5" />;
                    iconColor = 'text-success bg-success/10';
                  } else if (event.action.includes('Submit')) {
                    icon = <MessageSquare className="h-5 w-5" />;
                    iconColor = 'text-primary bg-primary/10';
                  } else {
                    icon = <Clock className="h-5 w-5" />;
                    iconColor = 'text-warning bg-warning/10';
                  }

                  return (
                    <div key={event.id} className="flex gap-4">
                      <div className="flex flex-col items-center">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${iconColor}`}>
                          {icon}
                        </div>
                        {!isLast && (
                          <div className="w-0.5 flex-1 bg-border mt-2" style={{ minHeight: '40px' }} />
                        )}
                      </div>
                      
                      <div className="flex-1 pb-6">
                        <div className="flex items-start justify-between mb-1">
                          <h3 className="font-semibold text-foreground">{event.action}</h3>
                          <span className="text-sm text-muted-foreground">
                            {new Date(event.timestamp).toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                          <User className="h-3 w-3" />
                          {event.user}
                        </div>
                        {event.notes && (
                          <p className="text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg">
                            {event.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default QueryDetail;
