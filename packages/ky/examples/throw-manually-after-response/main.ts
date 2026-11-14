// throwHttpErrors false plus an afterResponse hook: throw for server errors, read the rest
import ky, { HTTPError } from 'ky';
import type { Mount } from '@/types.ts';
import { checklist, kyName, loop } from '../../shared/err-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const REPORTS = [
  { label: 'report 1', id: 1 },
  { label: 'report 2', id: 2 },
  { label: 'report 3', id: 3 },
];

const mount: Mount = (el, ctx) => {
  const { stage, server } = demo(el, ctx, {
    hint: 'Report 1 exists, report 2 does not (404, with a JSON explanation), report 3 hits a server fault (503).',
    server: { latency: 80, delay: 60 },
    routes: {
      '/reports/1': { json: { title: 'Q3 sales' } },
      '/reports/2': { status: 404, json: { error: 'No such report' } },
      '/reports/3': { status: 503, text: 'Overloaded' },
    },
  });
  // Nothing throws by itself (throwHttpErrors: false). The hook decides: 5xx throws an
  // HTTPError built by hand, everything else flows on and keeps its body readable.
  const api = ky.create({
    fetch: server.fetch,
    throwHttpErrors: false,
    retry: 0,
    hooks: {
      afterResponse: [
        ({ request, options, response }) => {
          if (response.status >= 500) throw new HTTPError(response, request, options);
        },
      ],
    },
  });
  const list = checklist(stage.row(), 'What the page does');
  const rows = REPORTS.map((r) => list.add(r.label, 'not asked yet'));

  loop(
    stage,
    async () => {
      rows.forEach((r) => r.set('not asked yet'));
      stage.say('Opening three reports…');
      for (const [i, report] of REPORTS.entries()) {
        rows[i]!.set('asking…', 'info');
        try {
          const res = await api.get(`https://reports.example/reports/${report.id}`);
          const body = (await res.json()) as { title?: string; error?: string };
          rows[i]!.set(res.ok ? `opens "${body.title}"` : `${res.status}: "${body.error}"`, res.ok ? 'ok' : 'warn');
        } catch (error) {
          if (stage.disposed) throw error;
          rows[i]!.set(`${kyName(error)}: thrown by the hook`, 'bad');
        }
      }
      stage.say('The 404 body was read normally; only the 503 threw.', 'ok');
    },
    { label: 'Open again', pause: 2000 },
  );
  return stage.dispose;
};

export default mount;
