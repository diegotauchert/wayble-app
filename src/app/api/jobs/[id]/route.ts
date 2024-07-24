const jobs = [
  { id: 1, title: 'Job 1', about: 'Lorem Ipsum', address: '123 Main St, City, Province, 12345', city: 'City', province: 'Province' },
  { id: 2, title: 'Job 2', about: 'Lorem Ipsum', address: '456 Main St, City, Province, 12345', city: 'City', province: 'Province' },
];

export function GET(req: Request) {
  const url = new URL(req.url);
  const id = Number(url.pathname.split('/').pop());
  const job = jobs.find((job) => job.id === id);
  return new Response(JSON.stringify(job), { status: 200 });
}
