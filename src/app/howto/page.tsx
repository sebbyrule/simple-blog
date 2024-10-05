import React from 'react'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import Link from 'next/link'
import Search from '@/components/Search'
import Image from 'next/image'

interface HowTo {
  slug: string
  title: string
  description: string
  date: string
  technologies: string[]
  image: string
}

const HOWTOS_PER_PAGE = 5

export async function generateStaticParams() {
    // This function is used for static generation at build time
    // It's empty here because we're generating a single page
    return []
  }

async function getHowTos(page: number, searchTerm?: string): Promise<{ howTos: HowTo[], totalPages: number }> {
  const files = fs.readdirSync(path.join(process.cwd(), 'src/content/howto'))
  
  const howtos = files.map((filename) => {
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
      date: data.date,
      technologies: data.technologies || [],
      image: data.image || '/placeholder-project.jpg',
    }
  })
  const filteredHowTos = searchTerm
  ? howtos.filter(howto => 
      howto.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      howto.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      howto.technologies.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
    )
  : howtos

  const sortedHowTos = filteredHowTos.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  const totalPages = Math.ceil(sortedHowTos.length / HOWTOS_PER_PAGE)
  const paginatedHowTos = sortedHowTos.slice((page - 1) * HOWTOS_PER_PAGE, page * HOWTOS_PER_PAGE)
  return { howTos: paginatedHowTos, totalPages }
}

export default async function HowTosPage({
  searchParams,
}: {
  searchParams: { page?: string, search?: string }
}) {
  const page = parseInt(searchParams.page || '1')
  const startIndex = (page - 1) * HOWTOS_PER_PAGE
  const endIndex = startIndex + HOWTOS_PER_PAGE
  const {howTos, totalPages} = await getHowTos(page, searchParams.search)
  const paginatedHowTos = howTos.slice(startIndex, endIndex)

  return (
    <div className="py-12">
      <h1 className="text-3xl font-bold mb-8">HowTos</h1>
      <Search />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {howTos.map((howto) => (
          <article key={howto.slug} className="border rounded-lg overflow-hidden">
            <Image src={howto.image} alt={howto.title} width={500} height={300} />
              <h2 className="text-xl font-semibold mb-2">
                <Link href={`/howto/${howto.slug}`} className="hover:underline">
                  {howto.title}
                </Link>
              </h2>
              <p className="text-gray-600 mb-4">{howto.description}</p>
              <div className="flex flex-wrap gap-2">
                {howto.technologies.map((tech) => (
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
            href={`/howto?page=${page - 1}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Previous
          </Link>
        )}
        {page < totalPages && (
          <Link
            href={`/howto?page=${page + 1}`}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded text-sm"
          >
            Next
          </Link>
        )}
      </div>
    </div>
  )
}