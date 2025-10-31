import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Query, getCategoryColor, getStatusColor, getPriorityColor } from "@/data/mockData";
import { Building2, Calendar, AlertCircle } from "lucide-react";
import { Link } from "react-router-dom";

interface QueryCardProps {
  query: Query;
}

const QueryCard = ({ query }: QueryCardProps) => {
  const isOverdue = new Date(query.dueDate) < new Date() && query.status !== 'resolved';
  
  return (
    <Link to={`/query/${query.id}`}>
      <Card className="group hover:shadow-xl transition-all duration-300 hover:border-primary/50 cursor-pointer hover:-translate-y-0.5 animate-fade-up">
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <Badge variant="outline" className="text-xs font-semibold">
                  {query.id}
                </Badge>
                <Badge className={`text-xs font-semibold ${getCategoryColor(query.category)}`}>
                  {query.category}
                </Badge>
              </div>
              <h3 className="font-bold text-lg text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                {query.subject}
              </h3>
              <p className="text-sm text-muted-foreground line-clamp-2">
                {query.description}
              </p>
            </div>
            
            <Badge className={`ml-4 font-semibold ${getStatusColor(query.status)} border shadow-sm`}>
              {query.status}
            </Badge>
          </div>

          <div className="flex items-center justify-between pt-3 border-t text-xs">
            <div className="flex items-center gap-3 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Building2 className="h-3 w-3" />
                {query.supplierName}
              </div>
              <div className="flex items-center gap-1">
                <Calendar className="h-3 w-3" />
                Due {new Date(query.dueDate).toLocaleDateString()}
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {isOverdue && (
                <div className="flex items-center gap-1 text-destructive">
                  <AlertCircle className="h-3 w-3" />
                  <span className="font-medium">Overdue</span>
                </div>
              )}
              <span className={`font-medium ${getPriorityColor(query.priority)}`}>
                {query.priority.toUpperCase()}
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default QueryCard;
