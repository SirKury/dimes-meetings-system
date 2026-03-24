export default function AuditLogsPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Audit Logs</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6 md:grid-cols-3">
        <input className="rounded border p-2" placeholder="Action" name="action" />
        <input className="rounded border p-2" placeholder="Entity" name="entity" />
        <input className="rounded border p-2" placeholder="Establishment ID" name="establishmentId" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-3" type="submit">
          Filter logs
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">Date</th>
            <th className="p-3">Action</th>
            <th className="p-3">Entity</th>
            <th className="p-3">Actor</th>
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
