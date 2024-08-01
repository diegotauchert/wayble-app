import { AppWrapper } from '@/components/layout/AppWrapper';
import { JobAddNew } from '@/components/pages/JobAddNew';

export default function AdminPage() {
  return (
    <AppWrapper>
      <JobAddNew />
    </AppWrapper>
  );
}