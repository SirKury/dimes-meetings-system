'use client';

import { FormEvent, useState } from 'react';
import { apiRequest } from '../lib/api';

type Meeting = {
  id: string;
  title: string;
  description: string | null;
  scheduledAt: string;
  status: 'SCHEDULED' | 'COMPLETED' | 'CANCELED';
  establishmentId: string;
};

export default function MeetingsPage(): JSX.Element {
  const [token, setToken] = useState('');
  const [items, setItems] = useState<Meeting[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [scheduledAt, setScheduledAt] = useState('');
  const [status, setStatus] = useState<Meeting['status']>('SCHEDULED');
  const [error, setError] = useState('');

  async function load(): Promise<void> {
    try {
      setError('');
      const data = await apiRequest<Meeting[]>('/meetings', { token });
      setItems(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      await apiRequest<Meeting>('/meetings', {
        method: 'POST',
        token,
        body: JSON.stringify({ title, description, scheduledAt, status })
      });
      setTitle('');
      setDescription('');
      setScheduledAt('');
      setStatus('SCHEDULED');
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Meetings</h1>
      <p className="text-sm text-slate-600">Create and list meetings from the API.</p>

      <label className="block text-sm font-medium">JWT Token</label>
      <input
        className="w-full rounded border p-2"
        value={token}
        onChange={(event) => setToken(event.target.value)}
        placeholder="Paste access token"
      />

      <div className="flex gap-3">
        <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={() => void load()}>
          Load meetings
        </button>
      </div>

      <form className="grid gap-3 rounded border p-4" onSubmit={(event) => void onSubmit(event)}>
        <h2 className="font-semibold">Create meeting</h2>
        <input
          className="rounded border p-2"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
          placeholder="Title"
          required
        />
        <textarea
          className="rounded border p-2"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          placeholder="Description"
        />
        <input
          className="rounded border p-2"
          type="datetime-local"
          value={scheduledAt}
          onChange={(event) => setScheduledAt(event.target.value)}
          required
        />
        <select className="rounded border p-2" value={status} onChange={(event) => setStatus(event.target.value as Meeting['status'])}>
          <option value="SCHEDULED">SCHEDULED</option>
          <option value="COMPLETED">COMPLETED</option>
          <option value="CANCELED">CANCELED</option>
        </select>
        <button className="rounded bg-blue-600 px-3 py-2 text-white" type="submit">
          Save
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item.id} className="rounded border p-3 text-sm">
            <p className="font-medium">{item.title}</p>
            <p>Status: {item.status}</p>
            <p>Scheduled: {new Date(item.scheduledAt).toLocaleString()}</p>
          </li>
        ))}
      </ul>
    </main>
  );
}
