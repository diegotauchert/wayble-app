"use client"

import { Box, Button, Container, Flex, Skeleton, Title, Text } from '@mantine/core';
import { useJobs } from '@/context/JobContext';
import { useFetchJob } from '@/hooks/useFetchJob';
import { useSession, signIn } from 'next-auth/react';
import { BreadCrumbs } from '@/components/widgets/Breadcrumbs';
import { useParams, useRouter } from 'next/navigation';
import { ChevronLeftIcon } from '@radix-ui/react-icons';

export const JobDetail = (): React.ReactElement => {
  const { id } = useParams();
  const router = useRouter();

  const { data: session } = useSession();
  const { appliedJobs, applyToJob } = useJobs();
  const { data: job, isLoading, error } = useFetchJob(Number(id));

  if (isLoading) return <Skeleton height={200} />;
  if (error) return <div>Error loading job details.</div>;
  if (!job) return <div>Job not found.</div>;

  const handleApply = () => {
    if (!session) {
      signIn();
    } else {
      applyToJob(Number(id));
    }
  };

  return (
    <Container p={0} fluid>
      <Flex
        justify="space-between"
        align="center"
        direction="row"
        mb={6}
      >
        <Flex
          justify="flex-start"
          align="center"
          direction="row"
          gap={10}
        >
          <Button
            type="button"
            variant="light"
            size="xs"
            onClick={() => router.back()}
            leftSection={<ChevronLeftIcon />}
          >
            back
          </Button>
          <Title order={3} mr={4} className="text-primary">Job Details</Title>
        </Flex>
        <BreadCrumbs crumb="Job Detail" />
      </Flex>

      {job?.id ? 
        <Box>
          <Text>{job.title}</Text>
          <Text>{job.about}</Text>
          <Text>{session ? job.address : `${job.city}, ${job.province}`}</Text>

          <Button onClick={handleApply} disabled={appliedJobs[Number(id)]}>
            {appliedJobs[Number(id)] ? 'Already Applied' : 'Apply Now'}
          </Button>
        </Box>
      : <Text>No Job Found</Text>}
    </Container>
  );
};