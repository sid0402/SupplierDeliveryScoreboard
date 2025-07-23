import Link from 'next/link';
export default function Page() {
  return (
    <main>
      <h1>Hello Next.js!</h1>
      <Link href="/dashboard">Go to Dashboard</Link>
    </main>
  );
}