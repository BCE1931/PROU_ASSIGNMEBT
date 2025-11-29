import React, { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import DashboardSummary from "./DashboardSummary";
import TaskList from "./TaskList";
import TaskModal from "./TaskModal";
import AdminPanel from "./AdminPanel";

import BASE_URL from "../UTILS/config.js";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

function TaskManagerApp() {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");
  const isAdmin = localStorage.getItem("admin") === "true";

  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [activePage, setActivePage] = useState("tasks");

  const [filterStatus, setFilterStatus] = useState("All");
  const [filterUser, setFilterUser] = useState("All");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  const refreshtoken = async () => {
    try {
      const resp = await fetch(`${BASE_URL}/token/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshtoken: refreshToken }),
      });

      if (resp.status === 200) {
        const data = await resp.json();
        localStorage.setItem("token", data.token);
        localStorage.setItem("refreshtoken", data.refreshtoken);
        toast.success("Session refreshed");
        return true;
      }
    } catch {
      toast.error("Unable to refresh session.");
    }
    return false;
  };

  const loadUsers = async () => {
    const resp = await fetch(`${BASE_URL}/api/v1/users/allusers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (resp.status === 401) {
      const ok = await refreshtoken();
      if (ok) return loadUsers();
      return navigate("/");
    }

    const data = await resp.json();
    setEmployees(data);
  };

  const loadTasks = async () => {
    const resp = await fetch(`${BASE_URL}/api/v1/work/totaltasks`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (resp.status === 401) {
      const ok = await refreshtoken();
      if (ok) return loadTasks();
      return navigate("/");
    }

    const data = await resp.json();

    const unique = Array.from(new Map(data.map((t) => [t.id, t])).values());
    setTasks(unique);
  };

  useEffect(() => {
    loadUsers();
    loadTasks();
  }, []);

  const handleSaveTask = async (taskData) => {
    if (currentTask) {
      const resp = await fetch(
        `${BASE_URL}/api/v1/task/updatetask/${currentTask.id}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );

      if (resp.status === 401) {
        const ok = await refreshtoken();
        if (ok) return handleSaveTask(taskData);
        return navigate("/");
      }
    } else {
      const resp = await fetch(`${BASE_URL}/api/v1/task/addtask`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(taskData),
      });

      if (resp.status === 401) {
        const ok = await refreshtoken();
        if (ok) return handleSaveTask(taskData);
        return navigate("/");
      }
    }

    setIsModalOpen(false);
    await loadTasks();
  };

  const deleteTask = async (id) => {
    const resp = await fetch(`${BASE_URL}/api/v1/task/deletetask/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${token}` },
    });

    if (resp.status === 401) {
      const ok = await refreshtoken();
      if (ok) return deleteTask(id);
      return navigate("/");
    }

    toast.success("Task deleted");
    await loadTasks();
  };

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const matchStatus =
        filterStatus === "All" || task.status === filterStatus;
      const matchUser = filterUser === "All" || task.user === filterUser;
      return matchStatus && matchUser;
    });
  }, [tasks, filterStatus, filterUser]);

  const dashboardSummary = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.status === "COMPLETED").length;
    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;
    return { total, completed, completionRate };
  }, [tasks]);

  return (
    <div className="p-6 md:p-10 space-y-8">
      <h1 className="text-4xl font-extrabold">⭐ Task Manager Dashboard</h1>

      {/* PAGE SWITCH */}
      <div className="flex gap-4 border-b pb-3">
        <Button
          onClick={() => setActivePage("tasks")}
          variant={activePage === "tasks" ? "default" : "outline"}
        >
          📝 Tasks
        </Button>

        {isAdmin && (
          <Button
            onClick={() => setActivePage("admin")}
            variant={activePage === "admin" ? "default" : "outline"}
          >
            👑 Admin Panel
          </Button>
        )}
      </div>

      {/* TASK PAGE */}
      {activePage === "tasks" && (
        <>
          <DashboardSummary summary={dashboardSummary} />

          <div className="flex flex-wrap gap-4">
            {isAdmin && (
              <Button
                onClick={() => {
                  setCurrentTask(null);
                  setIsModalOpen(true);
                }}
              >
                ➕ Add Task
              </Button>
            )}

            <Select onValueChange={setFilterStatus} defaultValue="All">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All</SelectItem>
                <SelectItem value="TO_DO">To Do</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
              </SelectContent>
            </Select>

            <Select onValueChange={setFilterUser} defaultValue="All">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter User" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All">All Users</SelectItem>
                {employees.map((u) => (
                  <SelectItem key={u} value={u}>
                    {u}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <TaskList
            tasks={filteredTasks}
            openModal={(task) => {
              setCurrentTask(task);
              setIsModalOpen(true);
            }}
            deleteTask={deleteTask}
          />

          <TaskModal
            open={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            task={currentTask}
            employees={employees}
            statuses={["TO_DO", "IN_PROGRESS", "COMPLETED"]}
            onSave={handleSaveTask}
          />
        </>
      )}

      {/* ADMIN PANEL */}
      {activePage === "admin" && <AdminPanel />}
    </div>
  );
}

export default TaskManagerApp;
