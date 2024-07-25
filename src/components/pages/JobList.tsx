"use client"

import { Title, Container, Loader, Text, Flex } from '@mantine/core';
import { JobListing } from '@/components/widgets/JobListing';
import { useJobs } from '@/context/JobContext';
import { Ping } from '@/components/base/Ping';

export const JobList = (): React.ReactElement => {
  const { jobs, isLoading, error } = useJobs();
  
  if (error) return <Text c="red" fw={500}>Error loading jobs: {error instanceof Error ? error.message : 'Unknown error'}</Text>;

  return (
    <Container p={0} fluid>
      <Flex
        justify="flex-start"
        align="center"
        direction="row"
        gap={5}
      >
        <Ping />
        <Title order={3} mb={6} className="text-primary">Available Job Listings</Title>
      </Flex>
      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader />
        </div>
      ) : (
        <JobListing jobs={jobs || []} />
      )}
    </Container>
  );
}