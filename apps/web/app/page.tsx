const features = [
  'Autenticación y gestión de acceso por roles',
  'Gestión de usuarios y establecimientos destacados',
  'Base de datos PostgreSQL con Prisma y seeds iniciales',
  'API modular con NestJS y validaciones globales'
];

const nextSteps = [
  'Ejecutar migraciones y seeds de Prisma',
  'Levantar apps en modo desarrollo',
  'Verificar endpoint API /api y página principal web'
];

export default function HomePage(): JSX.Element {
  return (
    <main className="mx-auto min-h-screen max-w-5xl px-6 py-12">
      <section className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
        <p className="text-sm font-medium uppercase tracking-wide text-blue-600">DIMES Meetings System</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900">Fase 4 · Hardening y refinamiento</h1>
        <p className="mt-4 max-w-3xl text-slate-700">
          Plataforma institucional para reuniones, minutas y compromisos con arquitectura monorepo, frontend
          Next.js y backend NestJS.
        </p>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-2">
        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Estado actual</h2>
          <ul className="mt-4 space-y-2 text-sm text-slate-700">
            {features.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-600">✓</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-slate-900">Checklist local</h2>
          <ol className="mt-4 list-decimal space-y-2 pl-5 text-sm text-slate-700">
            {nextSteps.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </article>
      </section>
    </main>
  );
}
