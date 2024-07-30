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
}

interface Project {
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
    }
  })

  return articles
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, count)
}

async function getRecentProjects(count: number): Promise<Project[]> {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/projects'))
  
  const projects = files.map((filename) => {
    const slug = filename.replace('.mdx', '')
    const markdownWithMeta = fs.readFileSync(
      path.join('src/content/projects', filename),
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
  const recentProjects = await getRecentProjects(3)

  return (
    <div>
      <Hero />
      <div className="py-12">
        <h2 className="text-2xl font-bold mb-4">Recent Articles</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recentArticles.map((article) => (
            <article key={article.slug} className="border rounded-lg p-4">
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
        <h2 className="text-2xl font-bold mb-4">Featured Projects</h2>
        <Carousel
          items={recentProjects.map((project) => (
            <div key={project.slug} className="border rounded-lg overflow-hidden">
              <Image src={project.image} alt={project.title} width={500} height={300} />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">
                  <Link href={`/projects/${project.slug}`}>
                    {project.title}
                  </Link>
                </h3>
                <p className="text-gray-600">{project.description}</p>
              </div>
            </div>
          ))}
        />
        <div className="mt-4 text-right">
          <Link href="/projects" className="text-blue-500 hover:underline">
            View all projects
          </Link>
        </div>
      </div>
    </div>
  )
}