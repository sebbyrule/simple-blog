'use client'

import React, { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'

const DarkModeToggle: React.FC = () => {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => setMounted(true), [])

  if (!mounted) return null

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-white"
    >
      {theme === 'dark' ? '🌞' : '🌙'}
    </button>
  )
}

export default DarkModeToggle