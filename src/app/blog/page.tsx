import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { Card, Section, SectionHeading } from "@/components/ui";
import { blogPosts } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Блог о клининге для бизнеса",
  description: "Статьи для АХО и закупок: SLA, тендеры, документы и организация уборки на объектах.",
  alternates: { canonical: absoluteUrl("/blog/") }
};

export default function BlogIndexPage() {
  const rubrics = Array.from(new Set(blogPosts.map((p) => p.rubric)));

  return (
    <>
      <Section>
        <Breadcrumbs items={[{ label: "Блог", href: "/blog/" }]} />
        <SectionHeading title="Блог" text="Экспертные материалы для руководителей объектов, АХО и закупок." />
        <div className="mb-10 flex flex-wrap gap-2">
          {rubrics.map((r) => (
            <span key={r} className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-semibold text-muted">
              {r}
            </span>
          ))}
        </div>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}/`} className="group block h-full">
              <Card className="flex h-full flex-col transition group-hover:border-accent/40">
                <p className="text-xs font-semibold uppercase tracking-wide text-accent">{post.rubric}</p>
                <h2 className="mt-3 text-xl font-semibold leading-snug">{post.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-6 text-muted">{post.excerpt}</p>
                <p className="mt-4 text-xs text-muted">
                  {post.date} · {post.author}
                </p>
              </Card>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
