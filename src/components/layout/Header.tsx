"use client";

import React, { ReactElement } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button, Box, Tooltip, Flex, Popover, Text, Title, List, Divider } from '@mantine/core';
import { BellIcon, LockClosedIcon, SunIcon, GearIcon, ExclamationTriangleIcon, ExitIcon, CheckIcon, PersonIcon } from '@radix-ui/react-icons';
import { Dialog } from '@/components/base/Dialog';
import { LoginForm } from '@/components/widgets/LoginForm';
import { useDisclosure } from '@mantine/hooks';
import { useSession, signOut } from 'next-auth/react';
import { useJobs } from '@/context/JobContext';
import { slugify } from '@/helpers/functions';

export const Header = (): ReactElement => {
  const [opened, { open, close }] = useDisclosure(false);
  const { data: session, status } = useSession();

  const { jobs, appliedJobs } = useJobs();

  const handleSignOut = async () => {
    await signOut();
  }
  
  return (
    <>
      <header className="flex text-center items-center justify-between pt-5 pb-4 w-full">
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
            <Box>
              <Popover width={200} offset={1} trapFocus position="bottom" withArrow shadow="md">
                <Popover.Target>
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
                </Popover.Target>
                <Popover.Dropdown>
                  {appliedJobs?.length > 0 ? 
                    <Box>
                      <Title order={6} mb={16}><BellIcon className="inline" /> Applied Jobs</Title>
                      <List>
                        {appliedJobs.map((appliedJob) => {
                          const job = jobs?.find(({ id }) => id === appliedJob.id);
                          const jobDetailsHref: string = job ? `/jobs/${job?.id}/${slugify(job?.job_name)}` : '/';

                          return job && (
                            <React.Fragment key={job.id}>
                              <List.Item>
                                <Flex
                                  gap="xs"
                                  justify="flex-start"
                                  align="center"
                                  direction="row"
                                >
                                  <CheckIcon className="inline mr-1" width={11} /> 
                                  <Text size="xs" className="text-gray-700">
                                    <Link href={jobDetailsHref}>
                                      <Text size="sm" fw={700}>{job.company_name}</Text> 
                                    </Link>

                                    <Link href={jobDetailsHref}>
                                      {job.job_name}
                                    </Link>
                                  </Text>
                                </Flex>
                              </List.Item>
                              <Divider my="md" className="last:hidden" />
                            </React.Fragment>
                          )
                        })}
                      </List>
                    </Box>
                  :
                    <Text size="xs" py={14} className="text-center text-gray-600">
                      <ExclamationTriangleIcon className="inline mr-1" width={11} /> No notifications to show
                    </Text>
                  }
                </Popover.Dropdown>
              </Popover>
            </Box>

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
              onClick={() => alert("Configuration not implemented yet.")}
            >
              <GearIcon />
            </Button>
            {status !== "loading" &&
              <>
                {session ?
                  <>
                  <Box className="text-right">
                    <Flex align="center" gap="2" className="text-xs font-light text-gray-800">
                      <PersonIcon width={13} />{session.user.email}
                    </Flex>
                    <Text className="text-xs font-light text-gray-600">{session.user.role}</Text>
                  </Box>
                  <Button
                    type="button"
                    variant="primary"
                    justify="center"
                    bg="red"
                    size="sm"
                    leftSection={<ExitIcon width={14} />}
                    onClick={handleSignOut}
                  >
                    logout
                  </Button>
                  </>
                :
                  <Button
                    type="button"
                    variant="primary"
                    justify="center"
                    size="sm"
                    leftSection={<LockClosedIcon width={14} />}
                    onClick={open}
                  >
                    login
                  </Button>
                }
              </>
            }
          </Flex>
        </Box>
      </header>
      
      {!session && 
        <Dialog 
          openModal={open} 
          closeModal={close} 
          isOpen={opened} 
          title="Login Authentication"
        >
          <LoginForm />
        </Dialog>
      }
    </>
  );
};
