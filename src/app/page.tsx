import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 to-white p-6">
      <h1 className="text-4xl font-bold mb-4 text-indigo-700">DesignFlow Pro</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        为自由职业网站设计师打造的一站式SaaS工具，集成项目提案生成、客户管理、自动发票、设计反馈收集等功能，助你高效、专业、轻松接单！
      </p>
      <div className="flex flex-col sm:flex-row gap-4">
        <Link href="/dashboard">
          <button className="px-6 py-2 bg-indigo-600 text-white rounded-lg font-semibold shadow hover:bg-indigo-700 transition">
            进入仪表盘
          </button>
        </Link>
        <Link href="/tools/proposal-generator">
          <button className="px-6 py-2 bg-green-600 text-white rounded-lg font-semibold shadow hover:bg-green-700 transition">
            AI提案生成器
          </button>
        </Link>
        <Link href="/tools/invoice-generator">
          <button className="px-6 py-2 bg-blue-600 text-white rounded-lg font-semibold shadow hover:bg-blue-700 transition">
            发票生成器
          </button>
        </Link>
        <Link href="/tools/feedback-collector">
          <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg font-semibold shadow hover:bg-yellow-600 transition">
            设计反馈收集
          </button>
        </Link>
      </div>
      <div className="mt-12 text-gray-400 text-xs">
        © {new Date().getFullYear()} DesignFlow Pro. All rights reserved.
      </div>
    </div>
  );
}
