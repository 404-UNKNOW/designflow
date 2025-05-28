import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
// import DashboardStats from "@/components/dashboard-stats";
// import RecentProjects from "@/components/recent-projects";

export default async function Dashboard() {
  const supabase = createServerComponentClient({ cookies });
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // 获取统计数据
  const { count: projectCount } = await supabase
    .from("projects")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { count: clientCount } = await supabase
    .from("clients")
    .select("*", { count: "exact", head: true })
    .eq("user_id", user.id);

  const { data: recentProjects } = await supabase
    .from("projects")
    .select("*, clients(name)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false })
    .limit(5);

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-3xl font-extrabold mb-8 text-indigo-700 drop-shadow">
        欢迎回来，{user?.email || "用户"}！
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
        <div className="bg-gradient-to-br from-indigo-100 to-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-indigo-50">
          <div className="text-4xl font-extrabold text-indigo-600 mb-2">
            {projectCount || 0}
          </div>
          <div className="text-gray-600">项目数</div>
        </div>
        <div className="bg-gradient-to-br from-green-100 to-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-green-50">
          <div className="text-4xl font-extrabold text-green-600 mb-2">
            {clientCount || 0}
          </div>
          <div className="text-gray-600">客户数</div>
        </div>
        <div className="bg-gradient-to-br from-blue-100 to-white rounded-2xl shadow-lg p-8 flex flex-col items-center border border-blue-50">
          <div className="text-4xl font-extrabold text-blue-600 mb-2">--</div>
          <div className="text-gray-600">发票数</div>
        </div>
      </div>
      <div className="flex gap-4 mb-10 justify-center">
        <Link href="/projects">
          <button className="px-5 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">
            项目管理
          </button>
        </Link>
        <Link href="/clients">
          <button className="px-5 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">
            客户管理
          </button>
        </Link>
        <Link href="/tools/proposal-generator">
          <button className="px-5 py-2 bg-purple-600 text-white rounded-lg font-semibold shadow hover:bg-purple-700 transition">
            AI提案生成
          </button>
        </Link>
      </div>
      <div className="bg-white rounded-2xl shadow-lg p-8 border border-gray-100">
        <h2 className="text-lg font-bold mb-4 text-indigo-700">最近项目</h2>
        <ul className="divide-y divide-gray-100">
          {(recentProjects || []).length === 0 && (
            <li className="py-4 text-gray-400">暂无项目</li>
          )}
          {(recentProjects || []).map(
            (proj: { id: string; title: string; clients?: { name?: string } }) => (
              <li
                key={proj.id}
                className="py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <div className="font-semibold text-indigo-700">{proj.title}</div>
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
            )
          )}
        </ul>
      </div>
    </div>
  );
}
