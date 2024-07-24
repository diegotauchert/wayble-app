"use client";

import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession, signIn } from 'next-auth/react';
import { useJobs } from '@/context/JobContext';

interface Job {
  id: number;
  title: string;
  about: string;
  address: string;
  city: string;
  province: string;
}

export default function JobDetails() {
  // const router = useRouter();
  // const { id } = router.query;
  const id = 1
  const { data: session } = useSession();
  const { appliedJobs, applyToJob } = useJobs();
  const [job, setJob] = useState<Job | null>(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/jobs/${id}`).then((response) => {
        setJob(response.data);
      });
    }
  }, [id]);

  if (!job) {
    return <div>Loading...</div>;
  }

  const handleApply = () => {
    if (!session) {
      signIn();
    } else {
      applyToJob(Number(id));
    }
  };

  return (
    <div>
      <h1>{job.title}</h1>
      <p>{job.about}</p>
      <p>
        {session ? job.address : `${job.city}, ${job.province}`}
      </p>
      <button onClick={handleApply} disabled={appliedJobs[Number(id)]}>
        {appliedJobs[Number(id)] ? 'Already Applied' : 'Apply Now'}
      </button>
    </div>
  );
}
