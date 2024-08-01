"use client"

import { Title, Container, Flex } from '@mantine/core';
import { BreadCrumbs } from '@/components/widgets/Breadcrumbs';
import { useLanguage } from '@/hooks/useLanguage';
import { JobForm } from '@/components/widgets/JobForm';

export const JobAddNew = (): React.ReactElement => {
  const { FormattedLang, lang } = useLanguage();
  
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
          <Title order={3} mr={4} className="text-primary whitespace-nowrap">
            <FormattedLang id="title.addJob" />
          </Title>
        </Flex>
        <BreadCrumbs crumb={lang('breadcrumb.new')} />
      </Flex>
      
      <JobForm />
    </Container>
  );
}