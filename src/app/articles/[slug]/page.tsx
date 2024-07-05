import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'

interface ArticlePageProps {
  params: {
    slug: string
  }
}

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

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { frontMatter, content } = await getArticleContent(params.slug)

  return (
    <article className="py-12">
      <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>
      <p className="text-gray-500 mb-8">{frontMatter.date}</p>
      <div className="prose lg:prose-xl">
        <MDXRemote source={content} />
      </div>
    </article>
  )
}