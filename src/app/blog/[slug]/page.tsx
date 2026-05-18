import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { blogPosts } from "@/data/site";
import { absoluteUrl } from "@/lib/utils";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) return {};
  return {
    title: `${post.title} | Mister FAPC`,
    description: post.excerpt,
    alternates: { canonical: absoluteUrl(`/blog/${slug}/`) }
  };
}

export default async function BlogArticlePage({ params }: Props) {
  const { slug } = await params;
  const post = blogPosts.find((p) => p.slug === slug);
  if (!post) notFound();

  return (
    <>
      <article>
        <Section>
          <Breadcrumbs
            items={[
              { label: "Блог", href: "/blog/" },
              { label: post.title, href: `/blog/${post.slug}/` }
            ]}
          />
          <p className="text-xs font-semibold uppercase tracking-wide text-accent">{post.rubric}</p>
          <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl">{post.title}</h1>
          <p className="mt-4 text-sm text-muted">
            {post.date} · {post.author}
          </p>
          <p className="mt-8 text-lg leading-8 text-muted">{post.excerpt}</p>

          <div className="mt-10 max-w-none space-y-4">
            <h2 className="text-2xl font-semibold">О чём статья</h2>
            <p className="mt-4 leading-8 text-muted">
              Материал готовится для практического применения на объектах: без воды, с акцентом на договор, регламент и
              документы. Полная версия текста будет добавлена при наполнении раздела.
            </p>
            <h3 className="mt-10 text-xl font-semibold">Оглавление</h3>
            <ul className="mt-4 list-inside list-disc text-muted">
              <li>Вводные термины и как они связаны с вашим объектом</li>
              <li>Чек-лист перед подписанием договора</li>
              <li>Типичные ошибки при выборе подрядчика</li>
            </ul>
            <h3 className="mt-10 text-xl font-semibold">Вывод</h3>
            <p className="mt-4 leading-8 text-muted">
              Если нужна помощь с расчётом или приложением SLA к договору — оставьте заявку, менеджер подключится в рабочее
              время.
            </p>
          </div>

          <div className="mt-12 flex flex-wrap gap-3">
            <ButtonLink href="/contacts/#lead-form">Обсудить объект</ButtonLink>
            <ButtonLink href="/uslugi/uborka-ofisov/" variant="secondary">
              Услуги клининга
            </ButtonLink>
          </div>
        </Section>

        <Section className="bg-surface">
          <SectionHeading title="Популярные статьи" />
          <ul className="grid gap-3 md:grid-cols-2">
            {blogPosts
              .filter((p) => p.slug !== post.slug)
              .map((p) => (
                <li key={p.slug}>
                  <a href={`/blog/${p.slug}/`} className="font-medium text-accent hover:underline">
                    {p.title}
                  </a>
                </li>
              ))}
          </ul>
        </Section>
      </article>
    </>
  );
}
