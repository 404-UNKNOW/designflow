"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

interface Project {
  id: string;
  title: string;
  status?: string;
  client?: string;
}

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      const { data, error } = await supabase.from("projects").select("id, title, status");
      if (!error && data) setProjects(data);
      setLoading(false);
    };
    fetchProjects();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-2 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-700 drop-shadow">项目管理</h1>
        <button className="px-4 py-2 sm:px-5 sm:py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition w-full sm:w-auto">新建项目</button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-2 sm:p-8 border border-gray-100 overflow-x-auto">
        <table className="w-full text-left min-w-[500px]">
          <thead>
            <tr className="border-b">
              <th className="py-2">项目名称</th>
              <th className="py-2">状态</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={3} className="py-6 text-center text-gray-400">加载中...</td></tr>
            ) : projects.length === 0 ? (
              <tr><td colSpan={3} className="py-6 text-center text-gray-400">暂无项目</td></tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} className="border-b">
                  <td className="py-2 font-semibold text-indigo-700">{project.title}</td>
                  <td className="py-2">{project.status || "-"}</td>
                  <td className="py-2">
                    <Link href={`/projects/${project.id}`} className="text-indigo-600 hover:underline mr-2">详情</Link>
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
