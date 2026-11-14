// stringifyJson: send dates the way the server wants them
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { requestView } from '../../shared/panels.ts';
import { runner, scene } from '../../shared/inst-kit.ts';

// How the server wants a date: each rule turns the ISO text into something else.
const FORMATS = [
  ['seconds', 'seconds since 1970', (iso: string) => Math.floor(Date.parse(iso) / 1000)],
  ['millis', 'milliseconds since 1970', (iso: string) => Date.parse(iso)],
  ['day', 'just the calendar day', (iso: string) => iso.slice(0, 10)],
] as const;

const mount: Mount = (el, ctx) => {
  let format: (typeof FORMATS)[number] = FORMATS[0];
  const { stage, server, api } = scene(el, ctx, {
    hint: 'A to-do app sends two dates. This server wants them as numbers, not as long text.',
    routes: { '/tasks/*': { status: 201, json: { saved: true } } },
  });
  const row = stage.row();
  const plain = requestView(row, 'Server got: default', { headers: [] });
  const custom = requestView(row, 'Server got: stringifyJson', { headers: [] });
  server.on((e) => e.kind === 'arrive' && (e.req.url.pathname.endsWith('plain') ? plain : custom).show(e.req));
  if (stage.bar) select(stage.bar, 'Send dates as:', FORMATS.map((f) => [f, f[1]] as const), (f) => (format = f));

  const task = { title: 'Pay rent', due_at: '2026-12-24T18:00:00Z', created_at: '2026-11-14T09:30:00Z' };

  runner(stage, async () => {
    stage.say('Saving the same task twice: once as it is, once through stringifyJson.');
    await api.post('https://todo.example/tasks/plain', { json: task });
    // The Ky option: your own JSON.stringify, with a replacer that rewrites every *_at value.
    await api.post('https://todo.example/tasks/custom', {
      json: task,
      stringifyJson: (data) => JSON.stringify(data, (key, value: unknown) => (key.endsWith('_at') ? format[2](String(value)) : value)),
    });
    stage.say('Same task, but the dates now arrive in the form the server asked for.', 'ok');
  });
  return stage.dispose;
};

export default mount;
