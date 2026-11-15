// Out of inotify watches, the dev server says so in the terminal and the browser overlay
import { mkdtempSync, mkdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import path from 'node:path';
import { createServer, createLogger, type Plugin } from 'vite';
import { afterEach, expect, it, vi } from 'vitest';
import { packageWatcher } from './package-watcher.ts';

vi.mock('node:fs', async (importOriginal) => {
  const fs = await importOriginal<typeof import('node:fs')>();
  const watch = (dir: string, listener: () => void) => {
    if (dir.includes(`${path.sep}full`)) {
      throw Object.assign(new Error(`ENOSPC: System limit for number of file watchers reached`), { code: 'ENOSPC' });
    }
    return fs.watch(dir, listener);
  };
  return { ...fs, watch };
});

let root: string;
afterEach(() => rmSync(root, { recursive: true, force: true }));

it('reports the unwatched folders once, in the log and as an error overlay', async () => {
  root = mkdtempSync(path.join(tmpdir(), 'showcases-limit-'));
  for (const ex of ['full-a', 'full-b', 'fine']) {
    mkdirSync(path.join(root, 'packages/p/examples', ex), { recursive: true });
    writeFileSync(path.join(root, 'packages/p/examples', ex, 'main.ts'), '');
  }
  const errors: string[] = [];
  const logger = createLogger('silent');
  logger.error = (msg) => void errors.push(msg);
  const sent: unknown[] = [];
  const spyWs: Plugin = {
    name: 'spy-ws',
    configureServer(server) {
      server.ws.send = ((payload: unknown) => void sent.push(payload)) as typeof server.ws.send;
    },
  };
  const server = await createServer({
    configFile: false,
    root,
    customLogger: logger,
    server: { watch: {} },
    optimizeDeps: { noDiscovery: true, include: [] },
    plugins: [spyWs, packageWatcher()],
  });
  await new Promise((r) => setTimeout(r, 50));
  await server.close();

  expect(errors).toHaveLength(1);
  expect(errors[0]).toContain('File watch limit reached');
  expect(errors[0]).toContain('(2 folders under packages/ unwatched)');
  expect(sent).toEqual([{ type: 'error', err: { message: expect.stringContaining('NOT reloaded'), stack: '' } }]);
});
