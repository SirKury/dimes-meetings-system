import Link from 'next/link';

const modules = [
  { href: '/dashboard', label: 'Dashboard' },
  { href: '/meetings', label: 'Meetings' },
  { href: '/participants', label: 'Participants' },
  { href: '/attendance', label: 'Attendance' },
  { href: '/minutes', label: 'Minutes' },
  { href: '/commitments', label: 'Commitments' },
  { href: '/attachments', label: 'Attachments' },
  { href: '/audit-logs', label: 'Audit Logs' }
];

export default function HomePage(): JSX.Element {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16">
      <h1 className="text-3xl font-semibold">DIMES Meetings System</h1>
      <p className="mt-3 text-slate-700">
        Fase 3 habilitada: compromisos, dashboard, archivos adjuntos y trazabilidad de auditoría.
      </p>

      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {modules.map((module) => (
          <Link
            key={module.href}
            href={module.href}
            className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-400"
          >
            <h2 className="text-lg font-medium">{module.label}</h2>
            <p className="mt-1 text-sm text-slate-600">Abrir módulo</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
