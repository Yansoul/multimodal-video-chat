import { GoogleGenerativeAI } from "@google/generative-ai";
import { type FileData } from "~/types";

export class VideoService {
  private genAI: GoogleGenerativeAI;

  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);
  }

  async analyzeVideo(fileData: FileData, prompt: string) {
    try {
      const model = this.genAI.getGenerativeModel({
        model: "gemini-2.0-flash-exp",
      });

      const fileBytes = await this.processFileData(fileData);
      console.log("准备调用 Gemini API:", {
        prompt,
        mimeType: fileData.mimetype
      });

      const result = await model.generateContent({
        contents: [{
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                mimeType: fileData.mimetype,
                data: Buffer.from(fileBytes).toString('base64')
              }
            }
          ]
        }]
      });

      console.log("Gemini API 返回结果:", result);
      const response = result.response;
      return response.text();
    } catch (error) {
      console.log("分析错误:", error);
      throw new Error("视频分析失败");
    }
  }

  private async processFileData(fileData: FileData): Promise<Uint8Array> {
    const buffer = Buffer.from(fileData.buffer, 'base64');
    return new Uint8Array(buffer);
  }
}
