"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase/client";
import Link from "next/link";

export default function Home() {
  const [user, setUser] = useState<{ id: string; email: string } | null>(null);
  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user && data.user.id && data.user.email) {
        setUser({ id: data.user.id, email: data.user.email });
      } else {
        setUser(null);
      }
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-indigo-50 p-4 sm:p-6 relative overflow-hidden">
      {/* 背景装饰 */}
      <div className="absolute inset-0 pointer-events-none select-none">
        <div className="absolute -top-32 -left-32 w-60 h-60 sm:w-96 sm:h-96 bg-indigo-100 rounded-full blur-3xl opacity-60 animate-pulse" />
        <div className="absolute -bottom-32 -right-32 w-60 h-60 sm:w-96 sm:h-96 bg-yellow-100 rounded-full blur-3xl opacity-50 animate-pulse" />
      </div>
      <div className="z-10 w-full max-w-2xl flex flex-col items-center">
        <h1 className="text-3xl sm:text-5xl font-extrabold mb-4 text-indigo-700 drop-shadow-lg text-center tracking-tight">
          DesignFlow Pro
        </h1>
        <p className="text-base sm:text-xl text-gray-700 mb-10 text-center max-w-2xl leading-relaxed">
          为自由职业网站设计师打造的一站式SaaS工具，集成
          <span className="font-semibold text-indigo-600">AI项目提案</span>、
          <span className="font-semibold text-green-600">客户管理</span>、
          <span className="font-semibold text-blue-600">自动发票</span>、
          <span className="font-semibold text-yellow-600">设计反馈收集</span> 等功能，助你高效、专业、轻松接单！
        </p>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center mb-8">
          <Link href={user ? "/dashboard" : "/(auth)/login"} className="flex-1">
            <button className="w-full px-4 py-3 sm:px-6 sm:py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 transition text-base sm:text-lg tracking-wide">
              {user ? "进入仪表盘" : "登录/注册"}
            </button>
          </Link>
          <Link href="/tools/proposal-generator" className="flex-1">
            <button className="w-full px-4 py-3 sm:px-6 sm:py-3 bg-green-500 text-white rounded-xl font-bold shadow-lg hover:bg-green-600 transition text-base sm:text-lg tracking-wide">
              AI提案生成器
            </button>
          </Link>
        </div>
        {/* 新增：产品亮点/核心功能卡片 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-8">
          <div className="bg-white/80 rounded-xl shadow p-5 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🤖</span>
            <div className="font-bold text-indigo-700 mb-1">AI智能提案</div>
            <div className="text-gray-500 text-sm">一键生成专业项目方案，提升中标率</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-5 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">👥</span>
            <div className="font-bold text-green-700 mb-1">客户/项目管理</div>
            <div className="text-gray-500 text-sm">高效管理客户与项目，支持移动端操作</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-5 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">🧾</span>
            <div className="font-bold text-blue-700 mb-1">自动发票</div>
            <div className="text-gray-500 text-sm">一键生成、下载、发送发票，省时省心</div>
          </div>
          <div className="bg-white/80 rounded-xl shadow p-5 flex flex-col items-center text-center">
            <span className="text-3xl mb-2">💬</span>
            <div className="font-bold text-yellow-600 mb-1">设计反馈收集</div>
            <div className="text-gray-500 text-sm">便捷收集客户反馈，提升交付体验</div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
          <Link href="/tools/invoice-generator" className="flex-1">
            <button className="w-full px-4 py-3 sm:px-6 sm:py-3 bg-blue-500 text-white rounded-xl font-bold shadow-lg hover:bg-blue-600 transition text-base sm:text-lg tracking-wide">
              发票生成器
            </button>
          </Link>
          <Link href="/tools/feedback-collector" className="flex-1">
            <button className="w-full px-4 py-3 sm:px-6 sm:py-3 bg-yellow-400 text-white rounded-xl font-bold shadow-lg hover:bg-yellow-500 transition text-base sm:text-lg tracking-wide">
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
