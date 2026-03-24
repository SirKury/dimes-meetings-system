export default function ParticipantsPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Participants</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Full name" name="fullName" />
        <input className="rounded border p-2" type="email" placeholder="Email" name="email" />
        <input className="rounded border p-2" placeholder="Establishment ID" name="establishmentId" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" name="isInternal" defaultChecked /> Internal participant
        </label>
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-2" type="submit">
          Save participant
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Internal</th>
            <th className="p-3">Establishment</th>
          </tr>
        </thead>
        <tbody>
          <tr className="border-t">
            <td className="p-3 text-slate-500" colSpan={4}>
              No records yet
            </td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
