export default function MinutesPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Minutes</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6">
        <input className="rounded border p-2" placeholder="Meeting ID" name="meetingId" />
        <input className="rounded border p-2" placeholder="Objective" name="objective" />
        <textarea className="rounded border p-2" placeholder="Agenda" name="agenda" />
        <textarea className="rounded border p-2" placeholder="Development" name="development" />
        <textarea className="rounded border p-2" placeholder="Agreements" name="agreements" />
        <textarea className="rounded border p-2" placeholder="Observations" name="observations" />
        <select className="rounded border p-2" name="status" defaultValue="DRAFT">
          <option value="DRAFT">DRAFT</option>
          <option value="FINAL">FINAL</option>
        </select>
        <button className="rounded bg-slate-900 px-4 py-2 text-white" type="submit">
          Save minute
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">Meeting</th>
            <th className="p-3">Objective</th>
            <th className="p-3">Status</th>
            <th className="p-3">Updated at</th>
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
