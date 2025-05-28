"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function InvoiceGenerator() {
  const [projectId, setProjectId] = useState("");
  const [amount, setAmount] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [items, setItems] = useState([{ description: "", amount: "" }]);
  const [notes, setNotes] = useState("");
  const router = useRouter();

  const handleAddItem = () => {
    setItems([...items, { description: "", amount: "" }]);
  };

  const handleItemChange = (index: number, field: string, value: string) => {
    const newItems = [...items];
    newItems[index] = { ...newItems[index], [field]: value };
    setItems(newItems);
  };

  const handleRemoveItem = (index: number) => {
    const newItems = items.filter((_, i) => i !== index);
    setItems(newItems);
  };

  const handleGenerateInvoice = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;
    
    const totalAmount = items.reduce((sum, item) => sum + parseFloat(item.amount || "0"), 0);
    
    const { error } = await supabase
      .from("invoices")
      .insert({
        project_id: projectId,
        amount: totalAmount,
        due_date: dueDate,
        items: items,
        notes: notes,
        status: "unpaid"
      });
    
    if (!error) {
      router.push("/invoices");
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">发票生成器</h1>
      
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
        
        <div>
          <label className="block text-sm font-medium mb-1">截止日期</label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="w-full p-2 border rounded"
          />
        </div>
        
        <div>
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-medium">项目明细</h2>
            <button
              onClick={handleAddItem}
              className="px-3 py-1 bg-blue-500 text-white rounded"
            >
              添加项目
            </button>
          </div>
          
          {items.map((item, index) => (
            <div key={index} className="grid grid-cols-5 gap-3 mb-3">
              <div className="col-span-3">
                <input
                  type="text"
                  placeholder="描述"
                  value={item.description}
                  onChange={(e) => handleItemChange(index, "description", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-1">
                <input
                  type="number"
                  placeholder="金额"
                  value={item.amount}
                  onChange={(e) => handleItemChange(index, "amount", e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              <div className="col-span-1">
                <button
                  onClick={() => handleRemoveItem(index)}
                  className="w-full p-2 bg-red-500 text-white rounded"
                >
                  删除
                </button>
              </div>
            </div>
          ))}
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-1">备注</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full p-2 border rounded"
            rows={3}
          />
        </div>
        
        <div className="flex justify-end">
          <button
            onClick={handleGenerateInvoice}
            className="px-6 py-2 bg-green-600 text-white rounded-lg"
          >
            生成发票
          </button>
        </div>
      </div>
    </div>
  );
}
