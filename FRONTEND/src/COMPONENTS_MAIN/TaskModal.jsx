import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const TaskModal = ({ open, onClose, task, employees, statuses, onSave }) => {
  const username = localStorage.getItem("username");
  const isAdmin = localStorage.getItem("admin") === "true";

  const [title, setTitle] = useState("");
  const [assignedUser, setAssignedUser] = useState(username);
  const [status, setStatus] = useState("TO_DO");

  useEffect(() => {
    setTitle(task?.title || "");
    setAssignedUser(task?.user || username);
    setStatus(task?.status || "TO_DO");
  }, [task]);

  const submit = (e) => {
    e.preventDefault();
    onSave({ title, user: assignedUser, status });
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Add Task"}</DialogTitle>
        </DialogHeader>

        <form className="grid gap-4 py-4" onSubmit={submit}>
          <div className="grid gap-1.5">
            <Label>Task Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          <div className="grid gap-1.5">
            <Label>Assign To</Label>
            <Select
              value={assignedUser}
              onValueChange={setAssignedUser}
              disabled={!isAdmin && !task}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {employees.map((emp) => (
                  <SelectItem key={emp} value={emp}>
                    {emp}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="grid gap-1.5">
            <Label>Status</Label>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {statuses.map((s) => (
                  <SelectItem key={s} value={s}>
                    {s}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button variant="outline" type="button" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TaskModal;
