export default function MeetingsPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Meetings</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Title" name="title" />
        <input className="rounded border p-2" placeholder="Establishment ID" name="establishmentId" />
        <input className="rounded border p-2" type="datetime-local" name="scheduledAt" />
        <select className="rounded border p-2" name="status" defaultValue="SCHEDULED">
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
        <textarea className="rounded border p-2 md:col-span-2" name="description" placeholder="Description" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-2" type="submit">
          Save meeting
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">Title</th>
            <th className="p-3">Date</th>
            <th className="p-3">Status</th>
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
