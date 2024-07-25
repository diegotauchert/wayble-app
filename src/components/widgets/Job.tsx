import Link from 'next/link';
import { Card, Text, Badge, Button, Group, Tooltip } from '@mantine/core';
import { JobInterface } from '@/interfaces/JobInterface';

type IJobProps = {
  job: JobInterface
}

export const Job = ({ job }: IJobProps) => {
  const { id, title, company, about } = job;
  const jobDetailsHref: string = `/jobs/${id}`;
  
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
            {company}
          </Badge>
        </Tooltip>
      </Group>
      
      <Text size="sm" c="dimmed" className="line-clamp-3">
        <Link href={jobDetailsHref} className="hover:text-black transition duration-500">
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
        >
          See Job Details
        </Button>
      </Tooltip>
    </Card>
  );
}