// .arrayBuffer() gives the raw bytes of the answer, shown here as a hex dump
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';
import { drawHex, SAMPLES } from './hex.ts';
import './style.css';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The server sends a file. Read its bytes and look at how it begins.' });
  const server = createServer(stage, {
    'GET /files/:name': (req) => ({ body: SAMPLES[req.params['name']!]!.bytes, headers: { 'content-type': 'application/octet-stream' } }),
  });
  wire(stage, server, { rows: 0 });
  const dump = document.createElement('div');
  dump.className = 'hex-dump';
  dump.textContent = 'No bytes yet';
  stage.root.append(dump);

  const open = async (name: string): Promise<void> => {
    stage.say(`api.get("/files/${name}").arrayBuffer()`);
    await wretch(BASE)
      .fetchPolyfill(server.fetch)
      .get(`/files/${name}`)
      .arrayBuffer((buffer) => {
        if (stage.disposed) return;
        const sample = SAMPLES[name]!;
        // A view lets us read each byte of the buffer.
        drawHex(dump, new Uint8Array(buffer), sample.magic);
        dump.animate([{ opacity: 0.3 }, { opacity: 1 }], { duration: 300 });
        stage.say(`${buffer.byteLength} bytes. The highlighted ones say this is ${sample.kind}`, 'ok');
      })
      .catch(() => {});
  };

  runCases(stage, [
    { label: 'Picture file', run: () => open('png') },
    { label: 'Document file', run: () => open('pdf') },
  ], 2600);
  return () => stage.dispose();
};

export default mount;
