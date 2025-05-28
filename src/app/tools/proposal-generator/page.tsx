"use client";

import { useState } from "react";
import { generateProposal } from "@/lib/gemini";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function ProposalGenerator() {
  const [clientDetails, setClientDetails] = useState("");
  const [projectDetails, setProjectDetails] = useState("");
  const [generatedProposal, setGeneratedProposal] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const router = useRouter();

  const handleGenerate = async () => {
    if (!clientDetails || !projectDetails) return;
    
    setIsGenerating(true);
    try {
      const proposal = await generateProposal(clientDetails, projectDetails);
      setGeneratedProposal(proposal);
    } catch (error) {
      console.error(error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = async () => {
    if (!generatedProposal) return;
    
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    // 先创建项目
    const { data: project, error: projectError } = await supabase
      .from("projects")
      .insert({
        user_id: user.id,
        title: projectDetails.split("\n")[0] || "新项目",
        description: projectDetails,
        status: "draft"
      })
      .select()
      .single();
    
    if (projectError || !project) return;
    
    // 保存提案
    const { error } = await supabase
      .from("proposals")
      .insert({
        project_id: project.id,
        content: generatedProposal,
        status: "draft"
      });
    
    if (!error) {
      router.push(`/projects/${project.id}`);
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">提案生成器</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <div className="space-y-4">
          <h2 className="text-lg font-medium">客户信息</h2>
          <textarea
            value={clientDetails}
            onChange={(e) => setClientDetails(e.target.value)}
            placeholder="客户名称、公司、行业、联系方式等..."
            className="w-full h-64 p-3 border rounded-lg"
          />
        </div>
        
        <div className="space-y-4">
          <h2 className="text-lg font-medium">项目详情</h2>
          <textarea
            value={projectDetails}
            onChange={(e) => setProjectDetails(e.target.value)}
            placeholder="项目目标、需求、预算范围、时间要求等..."
            className="w-full h-64 p-3 border rounded-lg"
          />
        </div>
      </div>
      
      <div className="flex justify-center mb-6">
        <button
          onClick={handleGenerate}
          disabled={isGenerating}
          className="px-6 py-2 bg-indigo-600 text-white rounded-lg disabled:opacity-50"
        >
          {isGenerating ? "生成中..." : "生成提案"}
        </button>
      </div>
      
      {generatedProposal && (
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-lg font-medium">生成的提案</h2>
            <button
              onClick={handleSave}
              className="px-4 py-1 bg-green-600 text-white rounded-lg"
            >
              保存提案
            </button>
          </div>
          <div className="p-4 border rounded-lg bg-gray-50 whitespace-pre-wrap">
            {generatedProposal}
          </div>
        </div>
      )}
    </div>
  );
}
