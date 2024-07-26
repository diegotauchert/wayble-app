'use client';

import { useState } from 'react';
import { Box, Button, Container, Flex, Skeleton, Title, Text, Badge, Grid } from '@mantine/core';
import { useJobs } from '@/context/JobContext';
import { useFetchJob } from '@/hooks/useFetchJob';
import { useSession } from 'next-auth/react';
import { BreadCrumbs } from '@/components/widgets/Breadcrumbs';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeftIcon, FaceIcon, CheckIcon, PlusIcon, SewingPinFilledIcon } from '@radix-ui/react-icons';
import { useDisclosure } from '@mantine/hooks';
import { Dialog } from '@/components/base/Dialog';
import { LoginForm } from '@/components/widgets/LoginForm';
import { Modal } from '@mantine/core';

const LoadingSkeleton = () => {
  return (
    <Grid mt={10} gutter="xl">
      <Grid.Col span={{ base: 12, md: 8 }}>
        <Skeleton height={400} data-testid="loading-skeleton" />
      </Grid.Col>
      <Grid.Col span={{ base: 12, md: 4 }}>
        <Skeleton height={400} />
      </Grid.Col>
    </Grid>
  )
}

export const JobDetail = (): React.ReactElement => {
  const { id } = useParams();
  const router = useRouter();
  const [opened, { open, close }] = useDisclosure(false);
  const [successModalOpen, setSuccessModalOpen] = useState(false);

  const { data: session } = useSession();
  const { appliedJobs, applyToJob } = useJobs();
  const { data: job, isLoading, error } = useFetchJob(Number(id));

  if (isLoading) return <LoadingSkeleton />;
  if (error) return <div>Error loading job details.</div>;
  if (!job) return <div>Job not found.</div>;

  const handleApply = () => {
    if (!session) {
      open()
    } else {
      applyToJob(Number(id));
      setSuccessModalOpen(true)
    }
  };

  const isApplied: boolean = appliedJobs?.some(job => job.id === Number(id) && job.applied);

  return (
    <Container p={0} fluid>
      <Flex justify="space-between" align="center" direction={{ base: 'column', sm: 'row' }} mb={10}>
        <Flex justify="flex-start" align="center" direction="row" gap={10}>
          <Button type="button" variant="light" size="xs" onClick={() => router.back()} leftSection={<ChevronLeftIcon />}>
            back
          </Button>
          <Title order={3} mr={4} className="text-primary">
            Job Details
          </Title>
        </Flex>
        <BreadCrumbs crumb="Job Detail" />
      </Flex>

      {job?.id ? (
        <Grid mt={10} gutter="xl">
          <Grid.Col span={{ base: 12, md: 8 }}>
            <Box className="grow">
              <Flex justify="space-between" align="center" direction={{ base: 'column', sm: 'row' }}>
                <Title order={2} className="mb-3 md:mb-0">{job.title}</Title>
                <Badge color="yellow">
                  <Flex gap={4} justify="center" align="center">
                    <FaceIcon width={10} /> {job.company}
                  </Flex>
                </Badge>
              </Flex>
              <Text size="sm" mt={10} className="text-gray-600 dark:text-slate-200 text-pretty">
                {job.about}
              </Text>
              <Text fw={700} size="sm" mt={10} className="text-gray-800 dark:text-slate-200">
                <SewingPinFilledIcon className="inline" />
                {session ? job.address : `${job.city}, ${job.province}`}
              </Text>
            </Box>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 4 }}>
            <Box className="grow bg-gray-100 p-4">
              <Flex direction="column" align="center" justify="center" className="h-full w-full min-h-96">
                {!isApplied && 
                  <Text size="xs" mb={10} className="text-center text-gray-400 leading-4">
                    Are you interested in this job? Apply now and get a chance to work with <strong>{job.company}</strong>.
                  </Text>
                }
                <Button 
                  type="button"
                  onClick={handleApply} 
                  disabled={isApplied}
                >
                  {isApplied ? <><CheckIcon className="inline" /> Already Applied</> : <><PlusIcon className="inline" /> Apply Now</>}
                </Button>
              </Flex>
            </Box>
          </Grid.Col>
        </Grid>
      ) : (
        <Text>No Job Found</Text>
      )}
      
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

      <Modal
        opened={successModalOpen}
        onClose={() => setSuccessModalOpen(false)}
        title=""
        centered
      >
        <CheckIcon className="rounded-full mx-auto bg-primary text-white" width={60} height={60} />
        <Text className="text-lg text-primary text-center font-semibold my-5">
          You’ve applied to <strong>{job.company}</strong> to work as a <strong>{job.title}</strong>.
        </Text>
      </Modal>
    </Container>
  );
};
