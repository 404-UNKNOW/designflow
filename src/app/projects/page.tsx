import Link from "next/link";

export default function ProjectsPage() {
  // TODO: 这里应从 supabase 拉取项目数据
  const projects: { id: string; title: string; status: string }[] = [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">项目管理</h1>
        <button className="px-4 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">新建项目</button>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">项目名称</th>
              <th className="py-2">状态</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 && (
              <tr>
                <td colSpan={3} className="py-4 text-center text-gray-400">暂无项目</td>
              </tr>
            )}
            {projects.map((project) => (
              <tr key={project.id} className="border-b">
                <td className="py-2">{project.title}</td>
                <td className="py-2">{project.status}</td>
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
