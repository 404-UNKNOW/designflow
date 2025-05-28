import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
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
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">欢迎回来</h1>
      {/* <DashboardStats 
        projects={projectCount || 0}
        clients={clientCount || 0}
      />
      <RecentProjects projects={recentProjects || []} /> */}
      <div>项目数：{projectCount || 0}</div>
      <div>客户数：{clientCount || 0}</div>
      <div>最近项目：{JSON.stringify(recentProjects || [])}</div>
    </div>
  );
}
