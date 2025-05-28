import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GOOGLE_API_KEY!);

export const generateProposal = async (clientDetails: string, projectDetails: string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });
  
  const prompt = `作为专业网站设计师，根据以下客户和项目详情，生成一份详细的项目提案：
  
  客户信息：
  ${clientDetails}
  
  项目详情：
  ${projectDetails}
  
  请包括：
  1. 项目概述
  2. 设计方法
  3. 时间线
  4. 定价结构
  5. 交付成果
  6. 条款和条件`;
  
  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
};
