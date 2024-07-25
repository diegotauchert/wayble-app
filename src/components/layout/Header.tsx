"use client"

import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Box, Tooltip } from '@mantine/core'
import { LockClosedIcon } from '@radix-ui/react-icons'

export const Header = (): ReactElement => (
  <header className="md:flex text-center items-center justify-between pt-5 pb-4 w-full">
    <Box></Box>
    <Box>
      <Link href="/">
        <Tooltip label="Go to Home" withArrow>
          <Image 
            src="/logo.png" 
            alt="Wayble Logo"
            width={200} 
            height={200} 
          />
        </Tooltip>
      </Link>
    </Box>
    <Box className="mr-4">
      <Button
        type="button"
        variant="primary"
        justify="center"
        size="sm"
        leftSection={<LockClosedIcon width={14} />}
        onClick={(event) => event.preventDefault()}
      >
        login
      </Button>
    </Box>
  </header>
);