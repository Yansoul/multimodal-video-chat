// src/server/api/routers/video.ts
import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { VideoService } from "../services/videoService";

export const videoRouter = createTRPCRouter({
  analyze: publicProcedure
    .input(
      z.object({
        file: z.object({
          buffer: z.string(),
          mimetype: z.string(),
          originalname: z.string(),
          size: z.number(),
        }),
        prompt: z.string(),
      }),
    )
    .mutation(async ({ input }) => {
      const videoService = new VideoService();
      return await videoService.analyzeVideo(input.file, input.prompt);
    }),
});
