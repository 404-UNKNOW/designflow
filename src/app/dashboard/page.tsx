"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function Dashboard() {
  const [stats, setStats] = useState({ projects: 0, clients: 0, invoices: 0 });
  const [recentProjects, setRecentProjects] = useState<
    { id: string; title: string; clients?: { name?: string } }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      setLoading(true);
      const user = (await supabase.auth.getUser()).data.user;
      if (!user) return;
      const [
        { count: projectCount },
        { count: clientCount },
        { count: invoiceCount },
        { data: projects },
      ] = await Promise.all([
        supabase
          .from("projects")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("clients")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("invoices")
          .select("*", { count: "exact", head: true })
          .eq("user_id", user.id),
        supabase
          .from("projects")
          .select("id, title, clients(name)")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(5),
      ]);
      setStats({
        projects: projectCount || 0,
        clients: clientCount || 0,
        invoices: invoiceCount || 0,
      });
      setRecentProjects(
        (projects || []).map((proj: { id: string; title: string; clients?: { name?: string }[] }) => ({
          id: proj.id,
          title: proj.title,
          clients: proj.clients && Array.isArray(proj.clients) ? proj.clients[0] : proj.clients,
        }))
      );
      setLoading(false);
    }
    fetchStats();
  }, []);

  return (
    <div className="p-2 sm:p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-indigo-700">
        欢迎回来！
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
        <div className="bg-gradient-to-br from-indigo-100 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-indigo-50 w-full">
          <div className="text-3xl sm:text-4xl font-extrabold text-indigo-600 mb-2">
            {stats.projects}
          </div>
          <div className="text-gray-600">项目数</div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-green-50 w-full">
          <div className="text-3xl sm:text-4xl font-extrabold text-green-600 mb-2">
            {stats.clients}
          </div>
          <div className="text-gray-600">客户数</div>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-lg p-6 flex flex-col items-center border border-blue-50 w-full">
          <div className="text-3xl sm:text-4xl font-extrabold text-blue-600 mb-2">
            {stats.invoices}
          </div>
          <div className="text-gray-600">发票数</div>
        </div>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-indigo-700">最近项目</h2>
        <ul className="divide-y divide-gray-100">
          {loading ? (
            <li className="py-4 text-gray-400">加载中...</li>
          ) : recentProjects.length === 0 ? (
            <li className="py-4 text-gray-400">暂无项目</li>
          ) : (
            recentProjects.map((proj) => (
              <li
                key={proj.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold text-indigo-700">
                    {proj.title}
                  </div>
                  <div className="text-sm text-gray-500">
                    {proj.clients?.name || "无客户"}
                  </div>
                </div>
                <Link
                  href={`/projects/${proj.id}`}
                  className="mt-2 sm:mt-0 text-indigo-500 hover:underline text-sm"
                >
                  查看详情
                </Link>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}
