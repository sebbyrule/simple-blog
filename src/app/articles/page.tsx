import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
}

export async function generateStaticParams() {
  // This function is used for static generation at build time
  // It's empty here because we're generating a single page
  return []
}

async function getArticles(): Promise<Article[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/articles'))
  
  const articles = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('src/content/articles', filename),
      'utf-8'
    )
    const { data } = matter(markdownWithMeta)
    
    return {
      slug,
      title: data.title,
      date: data.date,
      excerpt: data.excerpt,
    }
  })

  return articles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export default async function ArticlesPage() {
  const articles = await getArticles()

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.slug} className="border-b pb-8">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/articles/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-500 mb-2">{article.date}</p>
            <p>{article.excerpt}</p>
          </article>
        ))}
      </div>
    </div>
  )
}