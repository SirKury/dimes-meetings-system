const cards = [
  'Meetings by status',
  'Commitments by status',
  'Minutes by status',
  'Total attendance records',
  'Total attachments'
];

export default function DashboardPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <section key={card} className="rounded-lg border bg-white p-5">
            <h2 className="text-sm font-medium text-slate-600">{card}</h2>
            <p className="mt-3 text-3xl font-semibold">0</p>
          </section>
        ))}
      </div>
    </main>
  );
}
