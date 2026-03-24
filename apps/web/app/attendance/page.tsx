export default function AttendancePage(): JSX.Element {
  return (
    <main className="mx-auto max-w-5xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Attendance</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="Meeting ID" name="meetingId" />
        <input className="rounded border p-2" placeholder="Participant ID" name="participantId" />
        <select className="rounded border p-2 md:col-span-2" name="status" defaultValue="ATTENDED">
          <option value="ATTENDED">ATTENDED</option>
          <option value="ABSENT">ABSENT</option>
          <option value="EXCUSED">EXCUSED</option>
        </select>
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-2" type="submit">
          Register attendance
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">Participant</th>
            <th className="p-3">Status</th>
            <th className="p-3">Registered by</th>
            <th className="p-3">Created at</th>
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
