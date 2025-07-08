"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserIcon } from "lucide-react";
import { apiRequest } from "@/lib/api";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const roles = ["Super Admin", "Content Manager", "Support Agent"];

interface Admin {
  _id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin?: string;
}

export default function AdminUsersSection() {
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [editingAdmin, setEditingAdmin] = useState<Admin | null>(null);
  const [form, setForm] = useState({ name: "", email: "", password: "", role: roles[0] });
  const [editForm, setEditForm] = useState({ role: "", status: "" });
  const [addLoading, setAddLoading] = useState(false);
  const [editLoading, setEditLoading] = useState(false);

  // Fetch admins
  useEffect(() => {
    async function fetchAdmins() {
      setLoading(true);
      try {
        const res = await apiRequest("/admin/admins?page=1&limit=20", { method: "GET" });
        console.log(res.data.admins)
        setAdmins(res.data?.admins || []);
      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false);
      }
    }
    fetchAdmins();
  }, []);

  // Add admin
  async function handleAddAdmin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setAddLoading(true);
    try {
      await apiRequest("/admin/register", { method: "POST", body: form });
      setShowAdd(false);
      setForm({ name: "", email: "", password: "", role: roles[0] });
      // Refresh admins
      const res = await apiRequest("/admin/admins?page=1&limit=20", { method: "GET" });
      setAdmins(res.data?.data?.admins || []);
    } finally {
      setAddLoading(false);
    }
  }

  // Open edit modal
  function handleEditAdmin(admin: Admin) {
    setEditingAdmin(admin);
    setEditForm({ role: admin.role, status: admin.status });
    setShowEdit(true);
  }

  // Save edit changes
  async function handleSaveEdit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!editingAdmin) return;
    
    setEditLoading(true);
    try {
      // Update role if changed
      if (editForm.role !== editingAdmin.role) {
        await apiRequest("/admin/change-role", { admin: editingAdmin._id, role: editForm.role });
      }
      
      // Update status if changed
      if (editForm.status !== editingAdmin.status) {
        await apiRequest("/admin/change-status", { admin: editingAdmin._id, status: editForm.status });
      }
      
      setShowEdit(false);
      setEditingAdmin(null);
      setEditForm({ role: "", status: "" });
      
      // Refresh admins
      const res = await apiRequest("/admin/admins?page=1&limit=20", { method: "GET" });
      setAdmins(res.data?.data?.admins || []);
    } finally {
      setEditLoading(false);
    }
  }

  // Change status
  async function handleChangeStatus(adminId: string, status: string) {
    await apiRequest("/admin/change-status", { admin: adminId, status });
    // Refresh admins
    const res = await apiRequest("/admin/admins?page=1&limit=20", { method: "GET" });
    setAdmins(res.data?.data?.admins || []);
  }

  // Change role
  async function handleChangeRole(adminId: string, role: string) {
    await apiRequest("/admin/change-role", { admin: adminId, role });
    // Refresh admins
    const res = await apiRequest("/admin/admins?page=1&limit=20", { method: "GET" });
    setAdmins(res.data?.data?.admins || []);
  }

  return (
    <div className="p-4">
      <div className="bg-white rounded-lg shadow p-6">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <UserIcon className="w-5 h-5" /> Admin Users
          </h2>
          <Dialog open={showAdd} onOpenChange={setShowAdd}>
            <DialogTrigger asChild>
              <Button onClick={() => setShowAdd(true)}>Add Admin</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogTitle>Add Admin</DialogTitle>
              <form onSubmit={handleAddAdmin} className="space-y-4">
                <Input
                  placeholder="Name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                />
                <Input
                  placeholder="Password"
                  type="password"
                  value={form.password}
                  onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
                  required
                />

                <Select
                  value={form.role}
                  onValueChange={value => setForm(f => ({ ...f, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Button type="submit" className="w-full" disabled={addLoading}>
                  {addLoading ? "Adding..." : "Add Admin"}
                </Button>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="border-b">
                <th className="py-2 px-4 text-left">Admin</th>
                <th className="py-2 px-4 text-left">Role</th>
                <th className="py-2 px-4 text-left">Status</th>
                <th className="py-2 px-4 text-left">Last Login</th>
                <th className="py-2 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">Loading...</td>
                </tr>
              ) : admins.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-8">No admins found.</td>
                </tr>
              ) : admins.map((admin: Admin) => (
                <tr key={admin._id} className="border-b hover:bg-gray-50">
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <UserIcon className="w-6 h-6 text-gray-400" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{admin.name}</div>
                      <div className="text-sm text-gray-500">{admin.email}</div>
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="capitalize text-sm text-gray-500">{admin.role}</div>
                  </td>
                  <td className="py-4 px-4">
                    <Badge
                      className={
                        admin.status === "active"
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-red-500"
                      }
                    >
                      {admin.status}
                    </Badge>
                  </td>
                  <td className="py-4 px-4">{admin.lastLogin || "—"}</td>
                  <td className="py-4 px-4 flex gap-2">
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleEditAdmin(admin)}
                    >
                      Edit
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Edit Admin Modal */}
      <Dialog open={showEdit} onOpenChange={setShowEdit}>
        <DialogContent>
          <DialogTitle>Edit Admin</DialogTitle>
          {editingAdmin && (
            <form onSubmit={handleSaveEdit} className="space-y-4">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <UserIcon className="w-6 h-6 text-gray-400" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">{editingAdmin.name}</div>
                  <div className="text-sm text-gray-500">{editingAdmin.email}</div>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Select
                  value={editForm.role}
                  onValueChange={value => setEditForm(f => ({ ...f, role: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                  <SelectContent>
                    {roles.map(role => (
                      <SelectItem key={role} value={role}>{role}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={editForm.status}
                  onValueChange={value => setEditForm(f => ({ ...f, status: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-2 pt-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => {
                    setShowEdit(false);
                    setEditingAdmin(null);
                    setEditForm({ role: "", status: "" });
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1" disabled={editLoading}>
                  {editLoading ? "Saving..." : "Save Changes"}
                </Button>
              </div>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}