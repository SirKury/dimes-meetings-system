'use client';

import { FormEvent, useState } from 'react';
import { apiRequest } from '../lib/api';

type Attendance = {
  id: string;
  meetingId: string;
  participantId: string;
  status: 'ATTENDED' | 'ABSENT' | 'EXCUSED';
  notes: string | null;
};

export default function AttendancesPage(): JSX.Element {
  const [token, setToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [participantId, setParticipantId] = useState('');
  const [status, setStatus] = useState<Attendance['status']>('ATTENDED');
  const [notes, setNotes] = useState('');
  const [items, setItems] = useState<Attendance[]>([]);
  const [error, setError] = useState('');

  async function load(): Promise<void> {
    try {
      setError('');
      const data = await apiRequest<Attendance[]>(`/attendances?meetingId=${meetingId}`, { token });
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      await apiRequest<Attendance>('/attendances', {
        method: 'POST',
        token,
        body: JSON.stringify({ meetingId, participantId, status, notes })
      });
      setParticipantId('');
      setStatus('ATTENDED');
      setNotes('');
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Attendances</h1>
      <input className="w-full rounded border p-2" value={token} onChange={(e) => setToken(e.target.value)} placeholder="JWT token" />
      <input className="w-full rounded border p-2" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} placeholder="Meeting ID" required />

      <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={() => void load()}>
        Load attendances
      </button>

      <form className="grid gap-3 rounded border p-4" onSubmit={(event) => void onSubmit(event)}>
        <h2 className="font-semibold">Register attendance</h2>
        <input className="rounded border p-2" value={participantId} onChange={(e) => setParticipantId(e.target.value)} placeholder="Participant ID" required />
        <select className="rounded border p-2" value={status} onChange={(e) => setStatus(e.target.value as Attendance['status'])}>
          <option value="ATTENDED">ATTENDED</option>
          <option value="ABSENT">ABSENT</option>
          <option value="EXCUSED">EXCUSED</option>
        </select>
        <textarea className="rounded border p-2" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
        <button className="rounded bg-blue-600 px-3 py-2 text-white" type="submit">
          Save
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded border p-3 text-sm">
            <p className="font-medium">Participant: {item.participantId}</p>
            <p>Status: {item.status}</p>
            <p>{item.notes ?? 'No notes'}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
