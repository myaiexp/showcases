// .head() asks about a file and gets headers only, no download
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { kv } from '../../shared/screen.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const FILES: Record<string, { size: number; type: string; modified: string }> = {
  'report.pdf': { size: 2_480_000, type: 'application/pdf', modified: 'Tue, 03 Nov 2026 09:12:00 GMT' },
  'photo.jpg': { size: 5_130_000, type: 'image/jpeg', modified: 'Fri, 21 Aug 2026 16:40:00 GMT' },
  'notes.txt': { size: 1_840, type: 'text/plain', modified: 'Sat, 14 Nov 2026 07:05:00 GMT' },
};

const megabytes = (n: number): string => (n >= 1e6 ? `${(n / 1e6).toFixed(1)} MB` : `${(n / 1e3).toFixed(1)} kB`);

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ask about a file without downloading a byte of it.' });
  const server = createServer(stage, {
    'HEAD /files/:name': (req) => {
      const file = FILES[req.params['name']!];
      if (!file) return { status: 404 };
      return { headers: { 'content-length': String(file.size), 'content-type': file.type, 'last-modified': file.modified } };
    },
  });
  wire(stage, server, { rows: 0 });
  const facts = kv(stage.root, 'Learned from the headers alone');

  const api = wretch(BASE).fetchPolyfill(server.fetch);

  const inspect = async (name: string): Promise<void> => {
    stage.say(`.head("/files/${name}").res()`);
    const info = await api
      .head(`/files/${name}`)
      .res((r) => ({
        size: Number(r.headers.get('content-length')),
        type: r.headers.get('content-type') ?? '?',
        modified: r.headers.get('last-modified') ?? '?',
      }))
      .catch(() => null);
    if (stage.disposed || !info) return;
    facts.set([
      ['name', name],
      ['size', megabytes(info.size)],
      ['type', info.type],
      ['changed', info.modified.slice(5, 16)],
    ], 'Downloaded: 0 bytes');
    stage.say(`${name} is ${megabytes(info.size)}, and nothing was downloaded to find out`, 'ok');
  };

  runCases(
    stage,
    Object.keys(FILES).map((name) => ({ label: name, run: () => inspect(name) })),
    1600,
  );
  return () => stage.dispose();
};

export default mount;
