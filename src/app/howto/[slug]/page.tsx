import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { MDXRemote } from 'next-mdx-remote/rsc'
import MDXComponents from '@/components/mdx'

interface HowToPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/howto'))
  
  const paths = files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }))

  return paths
}

async function getHowToContent(slug: string) {
  const markdownWithMeta = fs.readFileSync(
    path.join('src/content/howto', `${slug}.mdx`),
    'utf-8'
  )

  const { data: frontMatter, content } = matter(markdownWithMeta)
  
  return {
    frontMatter,
    slug,
    content,
  }
}

export default async function HowToPage({ params }: HowToPageProps) {
  const { frontMatter, content } = await getHowToContent(params.slug)

  return (
    <article className="py-12">
      <h1 className="text-4xl font-bold mb-4">{frontMatter.title}</h1>
      <p className="text-gray-500 mb-8">{frontMatter.date}</p>
      <div className="prose lg:prose-xl max-w-none">
        <MDXRemote source={content} components={MDXComponents} />
      </div>
    </article>
  )
}