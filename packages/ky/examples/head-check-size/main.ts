// ky.head asks about a file (its size, its type) without downloading the file
import type { Mount } from '@/types.ts';
import { attempt, cycle, demo } from '../../shared/req-kit.ts';
import { requestView, resultView } from '../../shared/panels.ts';

const SIZE = 240_000;
const kb = (n: number): string => `${Math.round(n / 1000)} KB`;

const CHECKS = [
  { label: 'ky.head: just ask', method: 'head' },
  { label: 'ky.get: download it to find out', method: 'get' },
] as const;

const mount: Mount = (el, ctx) => {
  const { stage, server, api } = demo(el, ctx, {
    hint: 'Same file, two ways to learn how big it is. Compare the time.',
    routes: {
      // A real server answers HEAD with the headers it would send for GET, and no body.
      'HEAD /files/report.pdf': { headers: { 'content-length': String(SIZE), 'content-type': 'application/pdf' } },
      'GET /files/report.pdf': { bytes: new Uint8Array(SIZE), headers: { 'content-type': 'application/pdf' }, stream: { pieces: 5, every: 200 } },
    },
  });
  const row = stage.row();
  const seen = requestView(row, 'Server received', { headers: [] });
  const result = resultView(row, 'Your code got');
  server.on((e) => e.kind === 'arrive' && seen.show(e.req));

  cycle(stage, CHECKS, async (c) => {
    const started = performance.now();
    stage.say(`${c.label}('…/report.pdf')`);
    const url = 'https://files.example/files/report.pdf';
    const out = await attempt(
      stage,
      result,
      async () => {
        if (c.method === 'head') {
          // HEAD has no body: the size is in the headers of the response.
          const r = await api.head(url);
          return { 'content-length': r.headers.get('content-length'), 'content-type': r.headers.get('content-type') };
        }
        return { downloaded: (await api.get(url).blob()).size };
      },
      (v) => v,
    );
    const ms = Math.round(performance.now() - started);
    if (out.ok) {
      stage.say(c.method === 'head' ? `Size known (${kb(SIZE)}) in ${ms} ms, nothing downloaded.` : `Got the file (${kb(SIZE)}) in ${ms} ms, just to learn its size.`, 'ok');
    }
  }, { control: 'Learn the size with', pause: 2200 });
  return stage.dispose;
};

export default mount;
