import Link from 'next/link';
import { Card, Text, Badge, Button, Group, Tooltip, Flex } from '@mantine/core';
import { JobInterface } from '@/interfaces/JobInterface';
import { FaceIcon, ReaderIcon } from '@radix-ui/react-icons';
import { slugify } from '@/helpers/functions';

type IJobProps = {
  job: JobInterface
}

export const Job = ({ job }: IJobProps) => {
  const { id, title, company, about } = job;
  const jobDetailsHref: string = `/jobs/${id}/${slugify(title)}`;
  
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Group justify="space-between" wrap="nowrap" mt="md" mb="xs">
        <Tooltip label={`Position: ${title}`} withArrow>
          <Text fw={500} className="truncate">
            <Link href={jobDetailsHref}>{title}</Link>
          </Text>
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
      
      <Tooltip label="See Job Details" withArrow>
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
          See Job Details
        </Button>
      </Tooltip>
    </Card>
  );
}