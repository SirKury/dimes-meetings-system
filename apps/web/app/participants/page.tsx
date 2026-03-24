'use client';

import { FormEvent, useState } from 'react';
import { apiRequest } from '../lib/api';

type Participant = {
  id: string;
  meetingId: string;
  fullName: string;
  email: string | null;
  position: string | null;
  isExternal: boolean;
};

export default function ParticipantsPage(): JSX.Element {
  const [token, setToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [position, setPosition] = useState('');
  const [isExternal, setIsExternal] = useState(false);
  const [items, setItems] = useState<Participant[]>([]);
  const [error, setError] = useState('');

  async function load(): Promise<void> {
    try {
      setError('');
      const data = await apiRequest<Participant[]>(`/participants?meetingId=${meetingId}`, { token });
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      await apiRequest<Participant>('/participants', {
        method: 'POST',
        token,
        body: JSON.stringify({ meetingId, fullName, email, position, isExternal })
      });
      setFullName('');
      setEmail('');
      setPosition('');
      setIsExternal(false);
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Participants</h1>
      <label className="block text-sm font-medium">JWT Token</label>
      <input className="w-full rounded border p-2" value={token} onChange={(e) => setToken(e.target.value)} />

      <label className="block text-sm font-medium">Meeting ID</label>
      <input
        className="w-full rounded border p-2"
        value={meetingId}
        onChange={(e) => setMeetingId(e.target.value)}
        required
      />

      <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={() => void load()}>
        Load participants
      </button>

      <form className="grid gap-3 rounded border p-4" onSubmit={(event) => void onSubmit(event)}>
        <h2 className="font-semibold">Create participant</h2>
        <input className="rounded border p-2" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full name" required />
        <input className="rounded border p-2" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
        <input className="rounded border p-2" value={position} onChange={(e) => setPosition(e.target.value)} placeholder="Position" />
        <label className="flex items-center gap-2 text-sm">
          <input type="checkbox" checked={isExternal} onChange={(e) => setIsExternal(e.target.checked)} />
          External participant
        </label>
        <button className="rounded bg-blue-600 px-3 py-2 text-white" type="submit">
          Save
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded border p-3 text-sm">
            <p className="font-medium">{item.fullName}</p>
            <p>{item.email ?? 'No email'}</p>
            <p>{item.position ?? 'No position'}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
