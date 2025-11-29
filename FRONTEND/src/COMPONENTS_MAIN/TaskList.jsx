import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

const TaskList = ({ tasks, openModal, deleteTask }) => {
  const isAdmin = localStorage.getItem("admin") === "true";

  const getStatusBadgeStyles = (status) => {
    switch (status) {
      case "COMPLETED":
        return "bg-emerald-600/10 text-emerald-400";
      case "IN_PROGRESS":
        return "bg-blue-600/10 text-blue-400";
      default:
        return "bg-amber-600/10 text-amber-400";
    }
  };

  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <Card key={task.id} className="p-4 border">
          <div className="grid grid-cols-[2fr_1fr_1fr] items-center gap-4">
            <div>
              <p className="text-xs text-muted-foreground">TASK</p>
              <h3 className="font-bold">{task.title}</h3>
            </div>

            <div>
              <p className="text-xs text-muted-foreground">ASSIGNED TO</p>
              <p className="font-semibold">{task.user}</p>
            </div>

            <div className="flex justify-end items-center gap-2">
              <span
                className={`px-3 py-1 rounded-full text-xs ${getStatusBadgeStyles(
                  task.status
                )}`}
              >
                {task.status.replace("_", " ")}
              </span>

              {isAdmin && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => openModal(task)}
                  >
                    Edit
                  </Button>

                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};

export default TaskList;
