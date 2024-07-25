"use client"

import { ReactElement } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button, Box, Tooltip, Flex } from '@mantine/core'
import { BellIcon, LockClosedIcon, SunIcon, GearIcon } from '@radix-ui/react-icons'

export const Header = (): ReactElement => (
  <header className="md:flex text-center items-center justify-between pt-5 pb-4 w-full">
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
    <Box>
      <Flex
        gap="xs"
        justify="center"
        align="center"
        direction="row"
      >
        <Button
          type="button"
          variant="transparent"
          size="xs"
          p={0}
          radius="xl"
          className="w-8 h-8 p-0"
          onClick={() => alert("Dark mode not implemented yet.")}
        >
          <SunIcon />
        </Button>

        <Button
          type="button"
          variant="transparent"
          size="xs"
          p={0}
          radius="xl"
          className="w-8 h-8 p-0"
          onClick={() => alert("Notifications not implemented yet.")}
        >
          <BellIcon />
        </Button>
        
        <Button
          type="button"
          variant="transparent"
          size="xs"
          p={0}
          radius="xl"
          className="w-8 h-8 p-0"
          onClick={() => alert("Configuration not implemented yet.")}
        >
          <GearIcon />
        </Button>
        
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
      </Flex>
    </Box>
  </header>
);