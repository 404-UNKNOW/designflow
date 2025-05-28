import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>
      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-700 drop-shadow-lg text-center tracking-tight">
          DesignFlow Pro
        </h1>
        <p className="text-xl text-gray-700 mb-10 text-center max-w-2xl leading-relaxed">
          为自由职业网站设计师打造的一站式SaaS工具，集成{" "}
          <span className="font-semibold text-indigo-600">AI项目提案</span>、{" "}
          <span className="font-semibold text-green-600">客户管理</span>、{" "}
          <span className="font-semibold text-blue-600">自动发票</span>、{" "}
          <span className="font-semibold text-yellow-600">设计反馈收集</span> 等功能，助你高效、专业、轻松接单！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
          <Link href="/dashboard" className="flex-1">
            <button className="w-full px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition text-lg tracking-wide">
              进入仪表盘
            </button>
          </Link>
          <Link href="/tools/proposal-generator" className="flex-1">
            <button className="w-full px-6 py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition text-lg tracking-wide">
              AI提案生成器
            </button>
          </Link>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/tools/invoice-generator" className="flex-1">
            <button className="w-full px-6 py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 transition text-lg tracking-wide">
              发票生成器
            </button>
          </Link>
          <Link href="/tools/feedback-collector" className="flex-1">
            <button className="w-full px-6 py-3 bg-yellow-400 text-white rounded-xl font-bold shadow-lg hover:bg-yellow-500 transition text-lg tracking-wide">
              设计反馈收集
            </button>
          </Link>
        </div>
        <div className="mt-12 text-gray-400 text-xs text-center select-none">
          © {new Date().getFullYear()} DesignFlow Pro. All rights reserved.
          <br />
          <span className="text-gray-300">让设计师专注创意，繁琐交给AI！</span>
        </div>
      </div>
    </div>
  );
}
