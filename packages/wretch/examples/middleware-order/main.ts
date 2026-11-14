// .middlewares([a, b, c]): a sees the request first and the answer last
import wretch, { type ConfiguredMiddleware } from 'wretch';
import type { Mount } from '@/types.ts';
import { runCases } from '../../shared/cases.ts';
import { chips } from '../../shared/chips.ts';
import { logTo } from '../../shared/mwscene.ts';
import { pane } from '../../shared/pane.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { wire } from '../../shared/wire.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Same three middlewares, listed in two different orders.' });
  const server = createServer(stage, { '*': () => ({ text: 'from the server' }) });
  wire(stage, server, { rows: 0 });
  const lit = chips(stage.root, ['log', 'delay', 'short-circuit'], 'Middlewares that ran');
  const steps = pane(stage.root, 'Steps');
  const note = logTo(stage, steps);
  const pause = stage.preview ? 250 : 600;
  let step = 0;
  const mark = (name: string, what: string): void => {
    lit.fire(name, 'ok', undefined, true);
    note(`${++step}. ${name}: ${what}`, name === 'short-circuit' ? 'warn' : 'info');
  };

  const logMiddleware: ConfiguredMiddleware = (next) => async (url, opts) => {
    mark('log', 'sees the request go in');
    const response = await next(url, opts);
    mark('log', 'sees the answer come back');
    return response;
  };
  const delayMiddleware: ConfiguredMiddleware = (next) => async (url, opts) => {
    mark('delay', `holds it for ${pause} ms`);
    await new Promise((resolve) => setTimeout(resolve, pause));
    const response = await next(url, opts);
    mark('delay', 'lets the answer pass');
    return response;
  };
  // No next(): the chain ends here, and the request never leaves.
  const shortCircuitMiddleware: ConfiguredMiddleware = () => (url) => {
    mark('short-circuit', 'answers by itself');
    return Promise.resolve(new Response(url));
  };

  const ask = async (order: ConfiguredMiddleware[], names: string): Promise<void> => {
    lit.reset();
    steps.clear();
    step = 0;
    stage.say(`.middlewares([${names}])`);
    const api = wretch(BASE).fetchPolyfill(server.fetch).middlewares(order);
    await api.get('/posts/1').text().catch(() => {});
    if (stage.disposed) return;
    stage.say(
      step === 5
        ? 'In at the first, out at the first: log, delay and short-circuit all ran, then the answer travelled back the same way'
        : 'The short-circuit was first, so it answered before log and delay ever saw the request',
      step === 5 ? 'ok' : 'warn',
    );
  };

  runCases(stage, [
    { label: 'log, delay, short-circuit', run: () => ask([logMiddleware, delayMiddleware, shortCircuitMiddleware], 'log, delay, shortCircuit') },
    { label: 'short-circuit, log, delay', run: () => ask([shortCircuitMiddleware, logMiddleware, delayMiddleware], 'shortCircuit, log, delay') },
  ], 2200);
  return () => stage.dispose();
};

export default mount;
