import Link from "next/link";

export default function ProjectsPage() {
  // TODO: 这里应从 supabase 拉取项目数据
  const projects: { id: string; title: string; status?: string; client?: string }[] = [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-indigo-700 drop-shadow">项目管理</h1>
        <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">新建项目</button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">项目名称</th>
              <th className="py-2">客户</th>
              <th className="py-2">状态</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">暂无项目</td>
              </tr>
            )}
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="py-2 font-semibold text-indigo-700">{project.title}</td>
                <td className="py-2">{project.client || "-"}</td>
                <td className="py-2">{project.status || "-"}</td>
                <td className="py-2">
                  <Link href={`/projects/${project.id}`} className="text-indigo-600 hover:underline mr-2">详情</Link>
                  <button className="text-red-500 hover:underline">删除</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
