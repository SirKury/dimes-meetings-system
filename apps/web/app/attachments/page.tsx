export default function AttachmentsPage(): JSX.Element {
  return (
    <main className="mx-auto max-w-6xl space-y-8 px-6 py-10">
      <h1 className="text-2xl font-semibold">Attachments</h1>

      <form className="grid gap-4 rounded-lg border bg-white p-6 md:grid-cols-2">
        <input className="rounded border p-2" placeholder="File name" name="fileName" />
        <input className="rounded border p-2" placeholder="File path" name="filePath" />
        <input className="rounded border p-2" placeholder="MIME type" name="mimeType" />
        <input className="rounded border p-2" type="number" placeholder="Size (bytes)" name="sizeBytes" />
        <input className="rounded border p-2" placeholder="Meeting ID" name="meetingId" />
        <input className="rounded border p-2" placeholder="Minute ID" name="minuteId" />
        <input className="rounded border p-2 md:col-span-2" placeholder="Commitment ID" name="commitmentId" />
        <button className="rounded bg-slate-900 px-4 py-2 text-white md:col-span-2" type="submit">
          Register attachment
        </button>
      </form>

      <table className="w-full border-collapse overflow-hidden rounded-lg bg-white text-sm">
        <thead>
          <tr className="bg-slate-100 text-left">
            <th className="p-3">File</th>
            <th className="p-3">MIME</th>
            <th className="p-3">Size</th>
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
