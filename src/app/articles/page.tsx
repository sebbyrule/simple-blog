import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Search from '@/components/Search'

interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}
const ARTICLES_PER_PAGE = 5

export async function generateStaticParams() {
  // This function is used for static generation at build time
  // It's empty here because we're generating a single page
  return []
}

async function getArticles(page: number, searchTerm?: string): Promise<{ articles: Article[], totalPages: number }> {
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
      tags: data.tags || [],
    }
  })
  const filteredArticles = searchTerm
  ? articles.filter(article => 
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  : articles

const sortedArticles = filteredArticles.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
const totalPages = Math.ceil(sortedArticles.length / ARTICLES_PER_PAGE)
const paginatedArticles = sortedArticles.slice((page - 1) * ARTICLES_PER_PAGE, page * ARTICLES_PER_PAGE)

return { articles: paginatedArticles, totalPages }
}

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: { page?: string, search?: string }
}) {
  
  const page = parseInt(searchParams.page || '1')
  const startIndex = (page - 1) * ARTICLES_PER_PAGE
  const endIndex = startIndex + ARTICLES_PER_PAGE
  const {articles, totalPages} = await getArticles(page, searchParams.search)
  const paginatedArticles = articles.slice(startIndex, endIndex)
  

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-8">Articles</h1>
      <Search />
      <div className="space-y-8">
        {articles.map((article) => (
          <article key={article.slug} className="border-b pb-8">
            <h2 className="text-2xl font-semibold mb-2">
              <Link href={`/articles/${article.slug}`} className="hover:underline">
                {article.title}
              </Link>
            </h2>
            <p className="text-gray-500 mb-2">{article.date}</p>
            <p className="mb-2">{article.excerpt}</p>
            <div className="flex space-x-2">
              {article.tags.map((tag) => (
                <span key={tag} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {page > 1 && (
          <Link
            href={`/articles?page=${page - 1}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/articles?page=${page + 1}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}