import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const DashboardSummary = ({ summary }) => {
  const progressColor =
    summary.completionRate >= 80
      ? "bg-green-500"
      : summary.completionRate >= 50
      ? "bg-yellow-500"
      : "bg-red-500";

  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="p-4">
        <CardContent>
          <h3 className="text-sm text-muted-foreground">Total Tasks</h3>
          <p className="text-4xl font-bold">{summary.total}</p>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent>
          <h3 className="text-sm text-muted-foreground">Completed</h3>
          <p className="text-4xl font-bold text-green-500">
            {summary.completed}
          </p>
        </CardContent>
      </Card>

      <Card className="p-4">
        <CardContent className="space-y-4">
          <h3 className="text-sm text-muted-foreground">Completion Rate</h3>
          <div className="flex items-center gap-4">
            <p className="text-4xl font-bold">{summary.completionRate}%</p>
            <Progress
              value={summary.completionRate}
              className={`h-2 flex-grow [&>*]:${progressColor}`}
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardSummary;
