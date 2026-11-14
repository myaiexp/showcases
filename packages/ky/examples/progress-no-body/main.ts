// An answer with nothing to download never calls onDownloadProgress
import type { Mount } from '@/types.ts';
import { checklist, loop } from '../../shared/err-kit.ts';
import { size } from '../../shared/prog-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const BYTES = 90_000;

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'Three requests with the same progress handler. Only the one that downloads something ever calls it.',
    server: { latency: 80, delay: 60 },
    routes: {
      'GET /files/report.pdf': { bytes: new Uint8Array(BYTES), stream: { pieces: 6, every: 150 } },
      'HEAD /files/report.pdf': { headers: { 'content-length': String(BYTES) } },
      'DELETE /drafts/3': { status: 204 },
    },
  });
  const list = checklist(stage.row(), 'Times the progress handler ran');
  const calls = [
    { label: 'GET file (200)', go: (cb: (n: number, f: number) => void) => api.get('https://files.example/files/report.pdf', { onDownloadProgress: (p) => cb(p.transferredBytes, p.percent) }).arrayBuffer() },
    { label: 'DELETE (204)', go: (cb: (n: number, f: number) => void) => api.delete('https://files.example/drafts/3', { onDownloadProgress: (p) => cb(p.transferredBytes, p.percent) }) },
    { label: 'HEAD file', go: (cb: (n: number, f: number) => void) => api.head('https://files.example/files/report.pdf', { onDownloadProgress: (p) => cb(p.transferredBytes, p.percent) }) },
  ];
  const rows = calls.map((c) => list.add(c.label, 'not sent'));

  loop(
    stage,
    async () => {
      rows.forEach((r) => {
        r.set('not sent');
        r.fill(0);
      });
      for (const [i, c] of calls.entries()) {
        let events = 0;
        rows[i]!.set('sent…', 'info');
        stage.say(`${c.label}: waiting to hear from the progress handler…`);
        await c.go((bytes, fraction) => {
          events++;
          rows[i]!.set(`${events} calls · ${size(bytes)}`, 'ok');
          rows[i]!.fill(fraction);
        });
        if (events === 0) rows[i]!.set('0 calls: nothing to track', 'warn');
        stage.say(events ? `${c.label}: the handler ran ${events} times.` : `${c.label}: no body, so the handler never ran.`, events ? 'ok' : 'warn');
      }
      stage.say('No body, no progress events: hide the bar for these.', 'info');
    },
    { label: 'Send again', pause: 2200 },
  );
  return stage.dispose;
};

export default mount;
