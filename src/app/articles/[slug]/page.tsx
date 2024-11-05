import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/mdx'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

// This function is used for static generation at build time
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/articles'))
  
  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))

  return paths
}

async function getArticleContent(slug: string) {
  const markdownWithMeta = fs.readFileSync(
    path.join('src/content/articles', `${slug}.mdx`),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)
  
  return {
    frontMatter,
    slug,
    content,
  }
}

// This function is used for server-side rendering
export default async function ArticlePage({ params }: ArticlePageProps) {
  const { frontMatter, content } = await getArticleContent(params.slug)

  return (
    <article className="py-12 container mx-auto px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>
        <p className="text-gray-500 dark:text-gray-400">{frontMatter.date}</p>
      </header>
      <div className="prose dark:prose-invert prose-lg md:prose-xl max-w-none">
        <MDXRemote source={content} components={MDXComponents} />
      </div>
    </article>
  )
}