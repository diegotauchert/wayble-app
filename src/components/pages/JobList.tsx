"use client"

import { Title, Container, Loader, Text, Flex, Box, Notification } from '@mantine/core';
import { JobListing } from '@/components/widgets/JobListing';
import { useJobs } from '@/context/JobContext';
import { Ping } from '@/components/base/Ping';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { BreadCrumbs } from '@/components/widgets/Breadcrumbs';
import { FetchStatusEnum } from '@/enum/FetchStatusEnum';
import { useLanguage } from '@/hooks/useLanguage';

export const JobList = (): React.ReactElement => {
  const { jobs, isLoading, error, fetchStatus, setFetchStatus } = useJobs();
  const { FormattedLang, lang } = useLanguage();
  const isFetchDelayed: boolean = fetchStatus === FetchStatusEnum.delayed;
  
  if (error) return <Text c="red" fw={500}>Error loading jobs: {error instanceof Error ? error.message : 'Unknown error'}</Text>;

  return (
    <Container p={0} fluid>
      <Flex
        justify="space-between"
        align="center"
        direction={{ base: 'column', sm: 'row' }}
        mb={6}
      >
        <Flex
          justify="flex-start"
          align="center"
          direction="row"
          gap={5}
        >
          <Ping />
          <Title order={3} mr={4} className="text-primary whitespace-nowrap">
            <FormattedLang id="title.jobsListing" />
          </Title>
          {isLoading && <Loader size="16" />}
        </Flex>
        <BreadCrumbs crumb={lang('breadcrumb.listing')} />
      </Flex>

      <Box>
        {isFetchDelayed && 
        <>
          <Notification 
            title="Application slower than normal" 
            icon={<ExclamationTriangleIcon />} 
            className="mb-6"
            color="red"
            onClose={() => setFetchStatus(FetchStatusEnum.acknowledged)}
          >
            I apologize for our application being slower than normal. Please wait a few moments while we fetch the job listings.
          </Notification>
        </>
        }
      </Box>
      
      <JobListing jobs={jobs || []} loading={isLoading} />
    </Container>
  );
}