import { JobInterface } from '@/interfaces/JobInterface';
import { Box, Grid, Skeleton } from '@mantine/core';
import { Job } from '@/components/widgets/Job';

type IJobListingProps = {
  jobs: JobInterface[]
  loading: boolean
}

export const JobListing = ({ jobs, loading }: IJobListingProps): React.ReactElement => {
  return (
    <Box>
      {loading ? (
        <Grid>
          {[...Array(5)].map((_, index) => (
            <Grid.Col key={index} span={4}>
              <Skeleton height={200} radius="md" />
            </Grid.Col>
          ))}
        </Grid>
      ) : (
        <Grid>
          {jobs.map((job: JobInterface) => (
            <Grid.Col key={job.id} span={4}>
              <Job job={job} />
            </Grid.Col>
          ))}
        </Grid>
      )}
    </Box>
  )
}