import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import BASE_URL from "../UTILS/config";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

const AdminPanel = () => {
  const [users, setUsers] = useState([]);

  const token = localStorage.getItem("token");
  const refreshToken = localStorage.getItem("refreshtoken");

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
        return true;
      }
    } catch {
      toast.error("Unable to refresh session");
    }
    return false;
  };

  const loadUsers = async () => {
    const resp = await fetch(`${BASE_URL}/oauth/users/allusers`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (resp.status === 401) {
      const ok = await refreshtoken();
      if (ok) return loadUsers();
      return;
    }

    const data = await resp.json();
    setUsers(data);
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    const resp = await fetch(`${BASE_URL}/oauth/users/delete/${id}`, {
      method: "DELETE",
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    });

    if (resp.status === 401) {
      const ok = await refreshtoken();
      if (ok) return deleteUser(id);
      return;
    }

    toast.success("User deleted successfully");
    loadUsers();
  };

  const convertAdminValue = (value) => {
    if (value === true) return "True";
    if (value === false) return "False";
    if (value === "0x01" || value === 1) return "True";
    if (value === "0x00" || value === 0) return "False";
    return value;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">👑 Admin Panel</h2>

      <Card className="p-6 border">
        <h3 className="text-xl font-semibold mb-4">All Users</h3>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead>
              <tr className="border-b">
                <th className="p-3">Username</th>
                <th className="p-3">Email</th>
                <th className="p-3">Date</th>
                <th className="p-3">Times</th>
                <th className="p-3">Admin</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u) => (
                <tr
                  key={u.id}
                  className="border-b hover:bg-muted/30 transition"
                >
                  <td className="p-3">{u.username}</td>
                  <td className="p-3">{u.email}</td>
                  <td className="p-3">{u.date}</td>
                  <td className="p-3">{u.times}</td>
                  <td className="p-3">
                    {convertAdminValue(u.admin) === "True"
                      ? "✔️ True"
                      : "❌ False"}
                  </td>

                  <td className="p-3">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteUser(u.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
};

export default AdminPanel;
