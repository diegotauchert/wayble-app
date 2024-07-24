"use client"

import { useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { useJobs } from '@/context/JobContext';

export default function Home() {
  const { jobs, setJobs } = useJobs();

  useEffect(() => {
    axios.get('/api/jobs').then((response) => {
      setJobs(response.data);
    });
  }, [setJobs]);

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map((job) => (
        <div key={job.id}>
          <Link href={`/jobs/${job.id}`}>
            {job.title}
          </Link>
        </div>
      ))}
    </div>
  );
}