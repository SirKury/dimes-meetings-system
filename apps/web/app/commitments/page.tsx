export default function CommitmentsPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Commitments</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Minute ID" name="minuteId" />
        <input className="rounded border p-2" placeholder="Responsible User ID" name="responsibleId" />
        <input className="rounded border p-2" type="date" name="dueDate" />
        <select className="rounded border p-2" name="status" defaultValue="PENDING">
          <option value="PENDING">PENDING</option>
          <option value="IN_PROGRESS">IN_PROGRESS</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="OVERDUE">OVERDUE</option>
        </select>
        <textarea className="rounded border p-2 md:col-span-2" placeholder="Description" name="description" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-2" type="submit">
          Save commitment
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">Description</th>
            <th className="p-3">Due date</th>
            <th className="p-3">Status</th>
            <th className="p-3">Responsible</th>
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
