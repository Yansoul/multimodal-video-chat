"use client";

import { useState } from "react";
import { api } from "~/trpc/react";

export const VideoUploader = () => {
  const [prompt, setPrompt] = useState("");
  const [result, setResult] = useState("");

  const analyzeMutation = api.video.analyze.useMutation({
    onSuccess: (data) => {
      console.log("收到分析结果:", data); // 检查是否收到数据
      setResult(data);
    },
    onError: (error) => {
      console.log("分析错误:", error); // 检查是否有错误
      setResult("分析失败: " + error.message);
    },
  });

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    console.log("开始上传文件:", file.name); // 检查文件上传
    const reader = new FileReader();
    reader.onload = (e) => {
      const base64 = (e.target?.result as string).split(",")[1];
      console.log("文件读取完成，准备发送请求"); // 检查文件读取

      analyzeMutation.mutate({
        file: {
          buffer: base64!,
          mimetype: file.type,
          originalname: file.name,
          size: file.size,
        },
        prompt: prompt || "请描述这个视频的内容",
      });
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <input
        type="text"
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="输入提示词"
        className="rounded border p-2 text-black"
      />
      <input
        type="file"
        accept="video/*"
        onChange={handleFileUpload}
        className="rounded border p-2"
      />
      {analyzeMutation.isPending && <div>分析中...</div>}
      {result && (
        <div className="mt-4 rounded bg-white/10 p-4">
          <h3 className="mb-2 text-xl font-bold">分析结果:</h3>
          <div className="whitespace-pre-wrap">{result}</div>
        </div>
      )}
    </div>
  );
};
