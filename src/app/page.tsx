// src/app/page.tsx
import { VideoUploader } from "~/app/_components/VideoUploader";
import { Providers } from "~/app/_components/Providers";

export default function Home() {
  return (
    <Providers>
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            视频分析测试
          </h1>
          <VideoUploader />
        </div>
      </main>
    </Providers>
  );
}
