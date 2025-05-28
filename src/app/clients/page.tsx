import Link from "next/link";

export default function ClientsPage() {
  // TODO: 这里应从 supabase 拉取客户数据
  const clients: { id: string; name: string; email: string; company?: string }[] = [];

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-extrabold text-green-700 drop-shadow">客户管理</h1>
        <button className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">新建客户</button>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b">
              <th className="py-2">姓名</th>
              <th className="py-2">邮箱</th>
              <th className="py-2">公司</th>
              <th className="py-2">操作</th>
            </tr>
          </thead>
          <tbody>
            {clients.length === 0 && (
              <tr>
                <td colSpan={4} className="py-6 text-center text-gray-400">暂无客户</td>
              </tr>
            )}
            {clients.map((client) => (
              <tr key={client.id} className="border-b">
                <td className="py-2 font-semibold text-green-700">{client.name}</td>
                <td className="py-2">{client.email}</td>
                <td className="py-2">{client.company || "-"}</td>
                <td className="py-2">
                  <Link href={`/clients/${client.id}`} className="text-indigo-600 hover:underline mr-2">详情</Link>
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
