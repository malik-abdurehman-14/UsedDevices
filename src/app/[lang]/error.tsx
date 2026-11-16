"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

export default function Error({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { lang } = useParams<{ lang: string }>();
  const ja = lang === "ja";
  return (
    <section className="grain relative flex min-h-[80svh] items-center justify-center bg-ink px-6 text-center text-ivory">
      <div>
        <p className="font-display text-gold-gradient text-7xl">{ja ? "エラー" : "Error"}</p>
        <h1 className="font-display mt-6 text-3xl">{ja ? "申し訳ありません。問題が発生しました。" : "Sorry — something went wrong."}</h1>
        <div className="mt-10 flex justify-center gap-3 text-sm font-semibold">
          <button onClick={reset} className="rounded-full bg-gold px-6 py-3 text-ink">
            {ja ? "再読み込み" : "Try again"}
          </button>
          <Link href={`/${ja ? "ja" : "en"}`} className="rounded-full border border-white/20 px-6 py-3">
            {ja ? "ホームへ" : "Home"}
          </Link>
        </div>
      </div>
    </section>
  );
}
