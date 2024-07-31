import Link from 'next/link';
import { Card, Text, Badge, Button, Group, Tooltip, Flex, Title } from '@mantine/core';
import { JobInterface } from '@/interfaces/JobInterface';
import { FaceIcon, ReaderIcon } from '@radix-ui/react-icons';
import { slugify } from '@/helpers/functions';
import { useLanguage } from '@/hooks/useLanguage'

type IJobProps = {
  job: JobInterface
}

export const Job = ({ job }: IJobProps) => {
  const { id, title, company, about } = job;
  const { FormattedLang, lang } = useLanguage();

  const jobDetailsHref: string = `/jobs/${id}/${slugify(title)}`;
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" wrap="nowrap" mt="md" mb="xs">
        <Tooltip label={`Position: ${title}`} withArrow>
          <Title order={4} fw={700} className="truncate">
            <Link href={jobDetailsHref}>{title}</Link>
          </Title>
        </Tooltip>

        <Tooltip label={`Company: ${company}`} withArrow>
          <Badge color="yellow">
            <Flex 
              gap={4} 
              justify="center"
              align="center"
            >
              <FaceIcon width={10} /> {company}
            </Flex>
          </Badge>
        </Tooltip>
      </Group>
      
      <Text size="sm" c="dimmed" className="line-clamp-3">
        <Link href={jobDetailsHref} className="hover:text-gray-700 transition duration-500">
          {about}
        </Link>
      </Text>
      
      <Tooltip label={lang('text.seeMore')} withArrow>
        <Button 
          component="a"
          color="blue" 
          fullWidth 
          mt="md" 
          radius="md"
          href={jobDetailsHref}
          leftSection={<ReaderIcon />}
          className="transition duration-500"
        >
          <FormattedLang id="text.seeMore" />
        </Button>
      </Tooltip>
    </Card>
  );
}