import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'

interface Project {
  slug: string
  title: string
  description: string
  technologies: string[]
  image: string
}

export async function generateStaticParams() {
    // This function is used for static generation at build time
    // It's empty here because we're generating a single page
    return []
  }

async function getProjects(): Promise<Project[]> {
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
      technologies: data.technologies || [],
      image: data.image || '/placeholder-project.jpg',
    }
  })

  return projects
}

export default async function ProjectsPage() {
  const projects = await getProjects()

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <div key={project.slug} className="border rounded-lg overflow-hidden">
            <img src={project.image} alt={project.title} className="w-full h-48 object-cover" />
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/projects/${project.slug}`} className="hover:underline">
                  {project.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span key={tech} className="bg-gray-200 text-gray-700 px-2 py-1 rounded text-sm">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}