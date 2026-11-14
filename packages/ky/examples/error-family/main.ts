// Every error Ky throws shares one check, isKyError, except the schema one
import ky, { isKyError } from 'ky';
import { z } from 'zod';
import type { Mount } from '@/types.ts';
import { checklist, kyName, loop } from '../../shared/err-kit.ts';
import { demo } from '../../shared/req-kit.ts';

const mount: Mount = (el, ctx) => {
  const { stage, api } = demo(el, ctx, {
    hint: 'Each row makes one thing go wrong on purpose, then asks isKyError() about what was thrown.',
    server: { latency: 70, delay: 50 },
    routes: {
      '/ok': { json: { ok: true } },
      '/slow': { json: {}, delay: 1500 },
      '/down': { drop: true },
      '/big': { bytes: new Uint8Array(6000), stream: { pieces: 3, every: 80 } },
      '/user': { json: { name: 42 } },
    },
  });
  // Each trigger makes exactly one thing go wrong. retry: 0 so the first failure is the one thrown.
  const triggers: { name: string; go: () => Promise<unknown> }[] = [
    { name: 'HTTPError', go: () => api.get('https://api.example/missing', { retry: 0 }) },
    { name: 'TimeoutError', go: () => api.get('https://api.example/slow', { retry: 0, timeout: 300 }) },
    { name: 'NetworkError', go: () => api.get('https://api.example/down', { retry: 0 }) },
    { name: 'ResponseSizeError', go: () => api.get('https://api.example/big', { retry: 0, maxResponseSize: 1000 }).arrayBuffer() },
    // A hook that always asks for another try, with no tries left, ends in ForceRetryError.
    { name: 'ForceRetryError', go: () => api.get('https://api.example/ok', { retry: 0, hooks: { afterResponse: [() => ky.retry()] } }) },
    // The answer is fine; the data inside does not fit the schema.
    { name: 'SchemaValidationError', go: () => api.get('https://api.example/user', { retry: 0 }).json(z.object({ name: z.string() })) },
  ];
  const list = checklist(stage.row(), 'What was thrown');
  const rows = triggers.map((t) => list.add(t.name, 'not triggered'));

  loop(
    stage,
    async () => {
      rows.forEach((r) => r.set('not triggered'));
      for (const [i, t] of triggers.entries()) {
        rows[i]!.set('going wrong…', 'info');
        stage.say(`Making ${t.name} happen…`);
        try {
          await t.go();
          rows[i]!.set('nothing was thrown?', 'warn');
        } catch (error) {
          if (stage.disposed) throw error;
          const ky_ = isKyError(error);
          rows[i]!.set(`${kyName(error) === t.name ? '' : `${kyName(error)}: `}isKyError: ${ky_}`, ky_ ? 'ok' : 'warn');
          stage.say(ky_ ? `${t.name}: isKyError says yes.` : `${t.name}: not a Ky error, isKyError says no.`, ky_ ? 'ok' : 'warn');
        }
      }
      stage.say('Five Ky errors share one check; schema errors are yours.', 'info');
    },
    { label: 'Trigger them again', pause: 2200 },
  );
  return stage.dispose;
};

export default mount;
