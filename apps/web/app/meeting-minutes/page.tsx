'use client';

import { FormEvent, useState } from 'react';
import { apiRequest } from '../lib/api';

type MeetingMinute = {
  id: string;
  meetingId: string;
  objective: string;
  agenda: string;
  development: string;
  agreements: string;
  observations: string | null;
  status: 'DRAFT' | 'FINAL';
};

export default function MeetingMinutesPage(): JSX.Element {
  const [token, setToken] = useState('');
  const [meetingId, setMeetingId] = useState('');
  const [objective, setObjective] = useState('');
  const [agenda, setAgenda] = useState('');
  const [development, setDevelopment] = useState('');
  const [agreements, setAgreements] = useState('');
  const [observations, setObservations] = useState('');
  const [status, setStatus] = useState<MeetingMinute['status']>('DRAFT');
  const [minute, setMinute] = useState<MeetingMinute | null>(null);
  const [error, setError] = useState('');

  async function load(): Promise<void> {
    try {
      setError('');
      const data = await apiRequest<MeetingMinute | null>(`/meeting-minutes?meetingId=${meetingId}`, { token });
      setMinute(data);
    } catch (err) {
      setError((err as Error).message);
    }
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();
    try {
      setError('');
      await apiRequest<MeetingMinute>('/meeting-minutes', {
        method: 'POST',
        token,
        body: JSON.stringify({
          meetingId,
          objective,
          agenda,
          development,
          agreements,
          observations,
          status
        })
      });
      setObjective('');
      setAgenda('');
      setDevelopment('');
      setAgreements('');
      setObservations('');
      setStatus('DRAFT');
      await load();
    } catch (err) {
      setError((err as Error).message);
    }
  }

  return (
    <main className="mx-auto max-w-5xl p-6 space-y-6">
      <h1 className="text-2xl font-semibold">Meeting Minutes</h1>

      <input className="w-full rounded border p-2" value={token} onChange={(e) => setToken(e.target.value)} placeholder="JWT token" />
      <input className="w-full rounded border p-2" value={meetingId} onChange={(e) => setMeetingId(e.target.value)} placeholder="Meeting ID" required />

      <button className="rounded bg-slate-900 px-3 py-2 text-white" onClick={() => void load()}>
        Load meeting minute
      </button>

      <form className="grid gap-3 rounded border p-4" onSubmit={(event) => void onSubmit(event)}>
        <h2 className="font-semibold">Create minute</h2>
        <input className="rounded border p-2" value={objective} onChange={(e) => setObjective(e.target.value)} placeholder="Objective" required />
        <textarea className="rounded border p-2" value={agenda} onChange={(e) => setAgenda(e.target.value)} placeholder="Agenda" required />
        <textarea className="rounded border p-2" value={development} onChange={(e) => setDevelopment(e.target.value)} placeholder="Development" required />
        <textarea className="rounded border p-2" value={agreements} onChange={(e) => setAgreements(e.target.value)} placeholder="Agreements" required />
        <textarea className="rounded border p-2" value={observations} onChange={(e) => setObservations(e.target.value)} placeholder="Observations" />
        <select className="rounded border p-2" value={status} onChange={(e) => setStatus(e.target.value as MeetingMinute['status'])}>
          <option value="DRAFT">DRAFT</option>
          <option value="FINAL">FINAL</option>
        </select>
        <button className="rounded bg-blue-600 px-3 py-2 text-white" type="submit">
          Save
        </button>
      </form>

      {error ? <p className="text-sm text-red-600">{error}</p> : null}

      {minute ? (
        <article className="rounded border p-4 text-sm">
          <p className="font-semibold">Minute ID: {minute.id}</p>
          <p>Status: {minute.status}</p>
          <p>Objective: {minute.objective}</p>
          <p>Agenda: {minute.agenda}</p>
        </article>
      ) : null}
    </main>
  );
}
