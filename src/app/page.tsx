import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Hero from '@/components/Hero'

const Carousel = dynamic(() => import('@/components/Carousel'), { ssr: false })

interface Article {
  slug: string
  title: string
  date: string
  excerpt: string
  image: string
}

interface HowTo {
  slug: string
  title: string
  description: string
  image: string
}

async function getRecentArticles(count: number): Promise<Article[]> {
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
      image: data.image || '/placeholder-project.jpg',
    }
  })

  return articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

async function getRecentHowTos(count: number): Promise<HowTo[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/howto'))
  
  const projects = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('src/content/howto', filename),
      'utf-8'
    )
    const { data } = matter(markdownWithMeta)
    
    return {
      slug,
      title: data.title,
      description: data.description,
      image: data.image || '/placeholder-project.jpg',
    }
  })

  return projects.slice(0, count)
}

export default async function Home() {
  const recentArticles = await getRecentArticles(3)
  const recentHowTos = await getRecentHowTos(3)

  return (
    <div>
      <Hero />
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <article key={article.slug} className="border rounded-lg overflow-hidden ">
              <Image src={article.image} alt={article.title} width={500} height={300} />
              <h3 className="text-xl font-semibold mb-2">
                <Link href={`/articles/${article.slug}`}>
                  {article.title}
                </Link>
              </h3>
              <p className="text-gray-500 mb-2">{article.date}</p>
              <p className="mb-2">{article.excerpt}</p>
            </article>
          ))}
        </div>
        <div className="mt-4 text-right">
          <Link href="/articles" className="text-blue-500 hover:underline">
            View all articles
          </Link>
        </div>
      </div>
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-4">Featured How-To</h2>
        <Carousel
          items={recentHowTos.map((howto) => (
            <div key={howto.slug} className="border rounded-lg overflow-hidden">
              <Image src={howto.image} alt={howto.title} width={500} height={300} />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/howto/${howto.slug}`}>
                    {howto.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{howto.description}</p>
              </div>
            </div>
          ))}
        />
        <div className="mt-4 text-right">
          <Link href="/howto" className="text-blue-500 hover:underline">
            View all how-to
          </Link>
        </div>
      </div>
    </div>
  )
}