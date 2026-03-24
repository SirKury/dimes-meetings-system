import Link from 'next/link';

const modules = [
  { href: '/meetings', label: 'Meetings' },
  { href: '/participants', label: 'Participants' },
  { href: '/attendances', label: 'Attendances' },
  { href: '/meeting-minutes', label: 'Meeting Minutes' }
];

export default function HomePage(): JSX.Element {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">DIMES Meetings System</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Phase 2 Frontend Modules</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Frontend pages with forms connected to the NestJS API for meetings, participants, attendance,
          and meeting minutes.
        </p>
      </section>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-xl border border-slate-200 bg-white p-6 text-slate-900 shadow-sm hover:border-blue-400"
          >
            <h2 className="text-lg font-semibold">{module.label}</h2>
            <p className="mt-2 text-sm text-slate-600">Open module page</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
