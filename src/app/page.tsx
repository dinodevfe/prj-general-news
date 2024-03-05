'use client'
import React, { FC, useEffect, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { Box, Container, Stack } from '@mui/material'

const Home: FC = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [currentActive, setCurrentActive] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const blocks = document.querySelectorAll('.partial-item')
      let current = currentActive
      let found = false

      blocks.forEach((block, index) => {
        const blockTop = block.getBoundingClientRect().top
        const blockBottom = block.getBoundingClientRect().bottom
        if (blockTop >= 0 && blockTop < window.innerHeight) {
          current = index
          found = true
        }
      })

      // for (let index = 0; index < blocks.length; index++) {
      //   const block = blocks[index]
      //   const blockTop = block.getBoundingClientRect().top
      //   if (blockTop >= 0 && blockTop < window.innerHeight) {
      //     current = index
      //     found = true
      //     break
      //   }
      // }

      if (!found) {
        for (let i = 0; i < blocks.length; i++) {
          const blockTop = blocks[i].getBoundingClientRect().top
          if (blockTop >= 0 && blockTop < window.innerHeight) {
            current = i
            break
          }
        }
      }

      if (currentActive != current) {
        const params = new URLSearchParams(searchParams)
        params.set('block', current + '')
        const newParams = params.toString()
        router.push(`${pathname}?${newParams}`, { scroll: false })
        setCurrentActive(current)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <Container>
      <Stack sx={{ gap: '50px', py: '56px' }}>
        <Box className='partial-item' sx={{ width: '100%', height: '120vh', backgroundColor: 'red' }}>
          Block 0
        </Box>
        <Box className='partial-item' sx={{ width: '100%', height: '120vh', backgroundColor: 'green' }}>
          Block 1
        </Box>
        <Box className='partial-item' sx={{ width: '100%', height: '120vh', backgroundColor: 'blue' }}>
          Block 2
        </Box>
        <Box className='partial-item' sx={{ width: '100%', height: '120vh', backgroundColor: 'blueviolet' }}>
          Block 3
        </Box>
      </Stack>
    </Container>
  )
}

export default Home
