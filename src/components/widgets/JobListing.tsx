import { JobInterface } from '@/interfaces/JobInterface';
import { Box, Grid } from '@mantine/core';
import { Job } from '@/components/widgets/Job';

type IJobListingProps = {
  jobs: JobInterface[]
}

export const JobListing = ({ jobs }: IJobListingProps): React.ReactElement => {
  return (
    <Box>
      <Grid>
        {jobs.map((job: JobInterface) => (
          <Grid.Col key={job.id} span={4}>
            <Job job={job} />
          </Grid.Col>
        ))}
      </Grid>
    </Box>
  )
}