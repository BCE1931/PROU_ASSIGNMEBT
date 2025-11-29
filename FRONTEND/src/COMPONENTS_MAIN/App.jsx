import React from "react";
import TaskManagerApp from "./TaskManagerApp";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Signup from "./Signup";
import Card1 from "./Card1";
import { Navigate } from "react-router-dom";
import { ThemeProvider } from "@/components/theme-provider";

const App = () => {
  const PublicRoute = ({ element }) => {
    return localStorage.getItem("username") ? (
      <Navigate to="/home" replace />
    ) : (
      element
    );
  };

  const ProtectedRoute = ({ element }) => {
    return localStorage.getItem("username") ? (
      element
    ) : (
      <Navigate to="/" replace />
    );
  };
  return (
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <BrowserRouter>
        <Routes>
          <Route
            path="/signup"
            element={<PublicRoute element={<Signup />} />}
          />
          <Route path="/" element={<PublicRoute element={<Card1 />} />} />
          <Route
            path="/home"
            element={<ProtectedRoute element={<TaskManagerApp />} />}
          />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

// import React, { useState, useMemo, useEffect } from "react";

// // UI Components (shadcn)
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogFooter,
//   DialogDescription,
// } from "@/components/ui/dialog";
// import {
//   Select,
//   SelectTrigger,
//   SelectContent,
//   SelectItem,
//   SelectValue,
//   SelectGroup,
//   SelectLabel,
// } from "@/components/ui/select";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label"; // Added Label for form fields
// import { Progress } from "@/components/ui/progress"; // Added Progress bar for Completion Rate

// // --- Initial Data ---
// const initialEmployees = [
//   { id: 1, name: "Alice" },
//   { id: 2, name: "Bob" },
//   { id: 3, name: "Charlie" },
// ];

// const initialTasks = [
//   {
//     id: 101,
//     employeeId: 1,
//     title: "Design Landing Page",
//     status: "In Progress",
//   },
//   { id: 102, employeeId: 2, title: "Set up Database", status: "Completed" },
//   { id: 103, employeeId: 1, title: "Write Blog Post", status: "To Do" },
//   { id: 104, employeeId: 3, title: "Review Code", status: "In Progress" },
//   { id: 105, employeeId: 2, title: "Deploy Staging", status: "To Do" },
// ];

// const taskStatuses = ["To Do", "In Progress", "Completed"];

// // =============================
// // MAIN COMPONENT
// // =============================
// function TaskManagerApp() {
//   const [tasks, setTasks] = useState(initialTasks);
//   const [filterStatus, setFilterStatus] = useState("All");
//   const [filterEmployeeId, setFilterEmployeeId] = useState("All");
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [currentTask, setCurrentTask] = useState(null);

//   const openModal = (task = null) => {
//     setCurrentTask(task);
//     setIsModalOpen(true);
//   };

//   const closeModal = () => {
//     setCurrentTask(null);
//     setIsModalOpen(false);
//   };

//   const handleSaveTask = (taskData) => {
//     if (currentTask) {
//       setTasks(
//         tasks.map((t) => (t.id === currentTask.id ? { ...t, ...taskData } : t))
//       );
//     } else {
//       // Find the max ID and increment, or start at 1 if no tasks exist
//       const newId =
//         tasks.length > 0 ? Math.max(...tasks.map((t) => t.id)) + 1 : 1;
//       setTasks([...tasks, { ...taskData, id: newId }]);
//     }
//     closeModal();
//   };

//   const filteredTasks = useMemo(() => {
//     return tasks.filter((task) => {
//       const sMatch = filterStatus === "All" || task.status === filterStatus;
//       const eMatch =
//         filterEmployeeId === "All" ||
//         task.employeeId === Number(filterEmployeeId);
//       return sMatch && eMatch;
//     });
//   }, [tasks, filterStatus, filterEmployeeId]);

//   const dashboardSummary = useMemo(() => {
//     const total = tasks.length;
//     const completed = tasks.filter((t) => t.status === "Completed").length;
//     const completionRate =
//       total > 0 ? Math.round((completed / total) * 100) : 0;
//     return { total, completed, completionRate };
//   }, [tasks]);

//   return (
//     <div className="p-6 md:p-10 space-y-8 min-h-screen bg-background text-foreground">
//       <h1 className="text-4xl font-extrabold tracking-tight">
//         ⭐ Task Manager Dashboard
//       </h1>

//       {/* Dashboard Summary */}
//       <DashboardSummary summary={dashboardSummary} />

//       {/* Controls and Filters */}
//       <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 border-b pb-4 border-border/50">
//         <Button
//           onClick={() => openModal(null)}
//           className="bg-primary hover:bg-primary/90 text-primary-foreground transition-all duration-200"
//         >
//           ➕ Add New Task
//         </Button>

//         <div className="flex items-center gap-3">
//           <Select onValueChange={setFilterStatus} defaultValue="All">
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Filter by Status" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Status</SelectLabel>
//                 <SelectItem value="All">All Statuses</SelectItem>
//                 {taskStatuses.map((s) => (
//                   <SelectItem key={s} value={s}>
//                     {s}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>

//           <Select onValueChange={setFilterEmployeeId} defaultValue="All">
//             <SelectTrigger className="w-[180px]">
//               <SelectValue placeholder="Filter by Employee" />
//             </SelectTrigger>
//             <SelectContent>
//               <SelectGroup>
//                 <SelectLabel>Employee</SelectLabel>
//                 <SelectItem value="All">All Employees</SelectItem>
//                 {initialEmployees.map((emp) => (
//                   <SelectItem key={emp.id} value={emp.id.toString()}>
//                     {emp.name}
//                   </SelectItem>
//                 ))}
//               </SelectGroup>
//             </SelectContent>
//           </Select>
//         </div>
//       </div>

//       {/* Tasks List */}
//       <h2 className="text-2xl font-semibold flex items-center gap-2">
//         📝 All Tasks{" "}
//         <span className="text-muted-foreground font-normal">
//           ({filteredTasks.length})
//         </span>
//       </h2>
//       <TaskList
//         tasks={filteredTasks}
//         employees={initialEmployees}
//         openModal={openModal}
//       />

//       {/* Modal */}
//       <TaskModal
//         open={isModalOpen}
//         onClose={closeModal}
//         task={currentTask}
//         employees={initialEmployees}
//         statuses={taskStatuses}
//         onSave={handleSaveTask}
//       />
//     </div>
//   );
// }

// // =============================
// // COMPONENT: DASHBOARD (Styling Improved)
// // =============================
// const DashboardSummary = ({ summary }) => {
//   // Determine the color of the completion rate progress bar
//   const progressColor =
//     summary.completionRate >= 80
//       ? "bg-green-500"
//       : summary.completionRate >= 50
//       ? "bg-yellow-500"
//       : "bg-red-500";

//   return (
//     <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//       <Card className="border shadow-lg p-3">
//         <CardContent className="space-y-2">
//           <h3 className="text-sm font-medium text-muted-foreground">
//             Total Tasks
//           </h3>
//           <p className="text-4xl font-extrabold text-primary">
//             {summary.total}
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="border shadow-lg p-3">
//         <CardContent className="space-y-2">
//           <h3 className="text-sm font-medium text-muted-foreground">
//             Completed
//           </h3>
//           <p className="text-4xl font-extrabold text-green-500">
//             {summary.completed}
//           </p>
//         </CardContent>
//       </Card>

//       <Card className="border shadow-lg p-3">
//         <CardContent className="space-y-4">
//           <h3 className="text-sm font-medium text-muted-foreground">
//             Completion Rate
//           </h3>
//           <div className="flex items-center space-x-3">
//             <p className="text-4xl font-extrabold text-foreground">
//               {summary.completionRate}%
//             </p>
//             <Progress
//               value={summary.completionRate}
//               className={`h-2 flex-grow [&>*]:${progressColor}`}
//             />
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// };

// // =============================
// // COMPONENT: TASK LIST (Styling Improved)
// // =============================
// // =============================
// // COMPONENT: TASK LIST (Styling Improved for Readability)
// // =============================
// // =============================
// // COMPONENT: TASK LIST (Updated with Multi-Column Grid Layout)
// // =============================
// const TaskList = ({ tasks, employees, openModal }) => {
//   const getName = (id) => employees.find((e) => e.id === id)?.name || "Unknown";

//   const getStatusBadgeStyles = (status) => {
//     switch (status) {
//       case "Completed":
//         return "bg-emerald-600/10 text-emerald-400 border border-emerald-500/30";
//       case "In Progress":
//         return "bg-sky-600/10 text-sky-400 border border-sky-500/30";
//       case "To Do":
//       default:
//         return "bg-amber-600/10 text-amber-400 border border-amber-500/30";
//     }
//   };

//   if (tasks.length === 0)
//     return (
//       <p className="text-center py-10 text-lg text-muted-foreground border rounded-lg">
//         🎉 No tasks match the current filters.
//       </p>
//     );

//   return (
//     <div className="space-y-4">
//       {tasks.map((task) => (
//         <Card
//           key={task.id}
//           className="p-4 sm:p-5 flex items-center justify-between
//                      border border-border hover:shadow-lg transition-all duration-200"
//         >
//           {/* Main Content Container (Title, Employee, Status) */}
//           {/* This grid defines the core horizontal layout on larger screens */}
//           <div className="grid w-full gap-3 sm:gap-6 sm:grid-cols-[2fr_1fr_1fr] items-center">
//             {/* COLUMN 1: Task Title (Takes 2 fractions of space) */}
//             <div className="flex flex-col">
//               <span className="text-sm font-light text-muted-foreground hidden sm:block">
//                 TASK
//               </span>
//               <h3 className="font-bold text-lg sm:text-xl text-foreground truncate">
//                 {task.title}
//               </h3>
//             </div>

//             {/* COLUMN 2: Assigned Employee (Takes 1 fraction of space) */}
//             <div className="flex flex-col">
//               <span className="text-sm font-light text-muted-foreground">
//                 ASSIGNED TO
//               </span>
//               <p className="font-semibold text-base text-foreground/90">
//                 {getName(task.employeeId)}
//               </p>
//             </div>

//             {/* COLUMN 3: Status and Edit Button (Flex container for horizontal alignment) */}
//             <div className="flex items-center justify-between sm:justify-end gap-4">
//               {/* Status Badge */}
//               <span
//                 className={`
//                       px-3 py-1 text-xs font-bold uppercase rounded-full tracking-wider
//                       ${getStatusBadgeStyles(task.status)}
//                     `}
//               >
//                 {task.status}
//               </span>

//               {/* Edit Button */}
//               <Button
//                 variant="outline" // Changed back to outline for better contrast with the badge
//                 size="sm"
//                 className="text-sm px-3 py-1.5"
//                 onClick={() => openModal(task)}
//               >
//                 ✏️ Edit
//               </Button>
//             </div>
//           </div>
//         </Card>
//       ))}
//     </div>
//   );
// };
// // =============================
// // COMPONENT: MODAL (Styling Improved)
// // =============================
// const TaskModal = ({ open, onClose, task, employees, statuses, onSave }) => {
//   const [title, setTitle] = useState(task?.title || "");
//   const [employeeId, setEmployeeId] = useState(
//     task?.employeeId.toString() || employees[0].id.toString()
//   );
//   const [status, setStatus] = useState(task?.status || statuses[0]);

//   // Sync internal state with prop changes (when task changes from Add to Edit or vice versa)
//   useEffect(() => {
//     setTitle(task?.title || "");
//     setEmployeeId(task?.employeeId.toString() || employees[0].id.toString());
//     setStatus(task?.status || statuses[0]);
//   }, [task, employees, statuses]);

//   const submit = (e) => {
//     e.preventDefault();
//     onSave({ title, employeeId: Number(employeeId), status });
//   };

//   return (
//     <Dialog open={open} onOpenChange={onClose}>
//       <DialogContent className="sm:max-w-[425px]">
//         <DialogHeader>
//           <DialogTitle>{task ? "Edit Task" : "Add New Task"}</DialogTitle>
//           <DialogDescription>
//             {task
//               ? "Update the details for this task."
//               : "Enter the details for a new task."}
//           </DialogDescription>
//         </DialogHeader>

//         <form className="grid gap-4 py-4" onSubmit={submit}>
//           <div className="grid items-center gap-1.5">
//             <Label htmlFor="title">Task Title</Label>
//             <Input
//               id="title"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               required
//             />
//           </div>

//           <div className="grid items-center gap-1.5">
//             <Label htmlFor="employee">Assign to</Label>
//             <Select value={employeeId} onValueChange={setEmployeeId} required>
//               <SelectTrigger id="employee">
//                 <SelectValue placeholder="Select an employee" />
//               </SelectTrigger>
//               <SelectContent>
//                 {employees.map((emp) => (
//                   <SelectItem key={emp.id} value={emp.id.toString()}>
//                     {emp.name}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <div className="grid items-center gap-1.5">
//             <Label htmlFor="status">Status</Label>
//             <Select value={status} onValueChange={setStatus} required>
//               <SelectTrigger id="status">
//                 <SelectValue placeholder="Select a status" />
//               </SelectTrigger>
//               <SelectContent>
//                 {statuses.map((s) => (
//                   <SelectItem key={s} value={s}>
//                     {s}
//                   </SelectItem>
//                 ))}
//               </SelectContent>
//             </Select>
//           </div>

//           <DialogFooter className="pt-4">
//             <Button variant="outline" type="button" onClick={onClose}>
//               Cancel
//             </Button>
//             <Button type="submit">Save Changes</Button>
//           </DialogFooter>
//         </form>
//       </DialogContent>
//     </Dialog>
//   );
// };

// export default TaskManagerApp;
