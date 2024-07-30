import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Search from '@/components/Search'
import Image from 'next/image'

interface Project {
  slug: string
  title: string
  description: string
  date: string
  technologies: string[]
  image: string
}

const PROJECTS_PER_PAGE = 5

export async function generateStaticParams() {
    // This function is used for static generation at build time
    // It's empty here because we're generating a single page
    return []
  }

async function getProjects(page: number, searchTerm?: string): Promise<{ projects: Project[], totalPages: number }> {
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
      date: data.date,
      technologies: data.technologies || [],
      image: data.image || '/placeholder-project.jpg',
    }
  })
  const filteredProjects = searchTerm
  ? projects.filter(project => 
      project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.technologies.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  : projects

  const sortedProjects = filteredProjects.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const totalPages = Math.ceil(sortedProjects.length / PROJECTS_PER_PAGE)
  const paginatedProjects = sortedProjects.slice((page - 1) * PROJECTS_PER_PAGE, page * PROJECTS_PER_PAGE)
  return { projects: paginatedProjects, totalPages }
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: { page?: string, search?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const startIndex = (page - 1) * PROJECTS_PER_PAGE
  const endIndex = startIndex + PROJECTS_PER_PAGE
  const {projects, totalPages} = await getProjects(page, searchParams.search)
  const paginatedProjects = projects.slice(startIndex, endIndex)

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-8">Projects</h1>
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <article key={project.slug} className="border rounded-lg overflow-hidden">
            <Image src={project.image} alt={project.title} width={500} height={300} />
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
              </article>
        ))}
      </div>
      <div className="mt-8 flex justify-between">
        {page > 1 && (
          <Link
            href={`/projects?page=${page - 1}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/projects?page=${page + 1}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}