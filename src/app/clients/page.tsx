"use client";

import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

interface Client {
  id: string;
  name: string;
  email: string;
  company?: string;
}

export default function ClientsPage() {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [form, setForm] = useState<{ name: string; email: string; company?: string }>({
    name: "",
    email: "",
    company: "",
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    const fetchClients = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("clients").select("id, name, email, company");
      if (!error && data) setClients(data);
      setLoading(false);
    };
    fetchClients();
  }, []);

  const handleOpenModal = () => {
    setForm({ name: "", email: "", company: "" });
    setFormError(null);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    if (!form.name || !form.email) {
      setFormError("姓名和邮箱为必填项");
      setFormLoading(false);
      return;
    }
    const { error } = await supabase.from("clients").insert([{ name: form.name, email: form.email, company: form.company }]);
    if (error) {
      setFormError("添加失败，请重试");
    } else {
      setModalOpen(false);
      // 刷新客户列表
      const { data } = await supabase.from("clients").select("id, name, email, company");
      if (data) setClients(data);
    }
    setFormLoading(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-green-700 drop-shadow">客户管理</h1>
        <Button onClick={handleOpenModal} className="w-full sm:w-auto">
          新建客户
        </Button>
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal} title="新建客户">
        <form onSubmit={handleFormSubmit} className="flex flex-col gap-4">
          <input
            name="name"
            type="text"
            placeholder="姓名*"
            value={form.name}
            onChange={handleFormChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="邮箱*"
            value={form.email}
            onChange={handleFormChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
            required
          />
          <input
            name="company"
            type="text"
            placeholder="公司（可选）"
            value={form.company}
            onChange={handleFormChange}
            className="border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-200"
          />
          {formError && <div className="text-red-500 text-sm">{formError}</div>}
          <Button type="submit" disabled={formLoading} className="w-full">
            {formLoading ? "提交中..." : "提交"}
          </Button>
        </form>
      </Modal>
      <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8 border border-gray-100 overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr className="border-b">
              <th className="py-2">姓名</th>
              <th className="py-2">邮箱</th>
              <th className="py-2">公司</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  加载中...
                </td>
              </tr>
            ) : clients.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">
                  暂无客户
                </td>
              </tr>
            ) : (
              clients.map((client) => (
                <tr key={client.id} className="border-b">
                  <td className="py-2 font-semibold text-green-700">{client.name}</td>
                  <td className="py-2">{client.email}</td>
                  <td className="py-2">{client.company || "-"}</td>
                  <td className="py-2">
                    <Link href={`/clients/${client.id}`} className="text-indigo-600 hover:underline mr-2">
                      详情
                    </Link>
                    <button className="text-red-500 hover:underline">删除</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
