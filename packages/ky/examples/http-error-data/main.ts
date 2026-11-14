// error.data: Ky reads the body of an error answer for you, so the reason is at hand
import { isHTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import type { Reply } from '../../shared/server.ts';
import { outcome } from '../../shared/err-kit.ts';
import { formatValue } from '../../shared/panels.ts';
import { cycle, demo, notes } from '../../shared/req-kit.ts';

interface Case {
  label: string;
  reply: Reply;
}

const CASES: readonly Case[] = [
  {
    label: 'sign-up form (422, JSON)',
    reply: { status: 422, json: { message: 'Please fix two things', fields: { email: 'already has an account', password: 'needs 8+ characters' } } },
  },
  { label: 'maintenance (503, plain text)', reply: { status: 503, text: 'Down for maintenance until 14:00' } },
  { label: 'empty answer (404, no body)', reply: { status: 404 } },
  { label: 'broken JSON (500)', reply: { status: 500, text: '{"oops": ', headers: { 'content-type': 'application/json' } } },
];

/** What the page tells the visitor, built from error.data. */
function pageShows(data: unknown, status: number): string[] {
  if (typeof data === 'string') return [data];
  if (data && typeof data === 'object') {
    const d = data as { message?: string; fields?: Record<string, string> };
    return [d.message ?? 'Something is wrong', ...Object.entries(d.fields ?? {}).map(([k, v]) => `${k}: ${v}`)];
  }
  return [`Something went wrong (${status}). No details given.`];
}

const kindOf = (data: unknown): string => (data === undefined ? 'undefined' : typeof data === 'string' ? 'string (the text)' : 'object (parsed JSON)');
const short = (text: string, max: number): string => (text.length > max ? `${text.slice(0, max)}…` : text);

const mount: Mount = (el, ctx) => {
  let current = CASES[0]!;
  const { stage, api } = demo(el, ctx, {
    hint: 'Each error answer carries a body. Ky reads it before throwing and puts it on error.data.',
    server: { latency: 80, delay: 60 },
    routes: { '*': () => current.reply },
  });
  const row = stage.row();
  const result = stage.preview ? null : outcome(row);
  const data = notes(row, 'error.data');
  const page = notes(row, 'The page shows');

  cycle(
    stage,
    CASES,
    async (c) => {
      current = c;
      result?.pending();
      data.pending();
      page.pending();
      stage.say(`Asking the server: ${c.label}`);
      try {
        await api.get('https://shop.example/action', { retry: 0 });
      } catch (error) {
        if (stage.disposed) throw error;
        result?.error(error);
        if (!isHTTPError(error)) throw error;
        // Ky has already read the body: JSON is parsed, other text stays text, an empty or
        // unreadable body leaves undefined. (error.response.json() would fail: it is used up.)
        data.set(error.data === undefined ? [[kindOf(error.data), 'info']] : [[kindOf(error.data), 'info'], short(formatValue(error.data), stage.preview ? 44 : 400)]);
        page.set(pageShows(error.data, error.response.status));
        stage.say(error.data === undefined ? 'No body to read: error.data is undefined.' : 'The reason came along: read it on error.data.', error.data === undefined ? 'warn' : 'ok');
      }
    },
    { control: 'The server answers with', pause: 2000 },
  );
  return stage.dispose;
};

export default mount;
