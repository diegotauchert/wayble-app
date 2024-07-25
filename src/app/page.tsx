import { AppWrapper } from '@/components/layout/AppWrapper';
import { JobList } from '@/components/pages/JobList';

export default function Home() {
  return (
    <AppWrapper>
      <JobList />
    </AppWrapper>
  );
}