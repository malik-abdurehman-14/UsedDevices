import Link from "next/link";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[80svh] items-center justify-center bg-ink px-6 text-center text-ivory">
      <div>
        <p className="font-display text-gold-gradient text-[8rem] leading-none">404</p>
        <h1 className="font-display mt-4 text-3xl">Page not found · ページが見つかりません</h1>
        <div className="mt-10 flex justify-center gap-3 text-sm font-semibold">
          <Link href="/en" className="rounded-full bg-gold px-6 py-3 text-ink">English</Link>
          <Link href="/ja" className="rounded-full border border-white/20 px-6 py-3">日本語</Link>
        </div>
      </div>
    </section>
  );
}
