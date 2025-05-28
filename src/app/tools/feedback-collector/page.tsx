"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";

export default function FeedbackCollector() {
  const [projectId, setProjectId] = useState("");
  const [feedbackLink, setFeedbackLink] = useState("");

  const handleGenerateLink = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user || !projectId) return;
    
    // 创建反馈记录
    const { data: feedback, error } = await supabase
      .from("feedback")
      .insert({
        project_id: projectId,
        content: "等待客户反馈...",
        status: "pending"
      })
      .select()
      .single();
    
    if (error || !feedback) return;
    
    // 生成唯一链接
    const link = `${window.location.origin}/feedback/${feedback.id}`;
    setFeedbackLink(link);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(feedbackLink);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">设计反馈收集器</h1>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">项目ID</label>
          <input
            type="text"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <button
          onClick={handleGenerateLink}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg"
        >
          生成反馈链接
        </button>
        
        {feedbackLink && (
          <div className="mt-6">
            <h2 className="text-lg font-medium mb-2">反馈链接</h2>
            <div className="flex">
              <input
                type="text"
                value={feedbackLink}
                readOnly
                className="flex-1 p-2 border rounded-l"
              />
              <button
                onClick={copyToClipboard}
                className="px-4 py-2 bg-gray-200 rounded-r"
              >
                复制
              </button>
            </div>
            <p className="mt-2 text-sm text-gray-500">
              将此链接发送给客户收集设计反馈
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
