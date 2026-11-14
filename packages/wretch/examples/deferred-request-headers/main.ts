// .defer() computes headers per send; .headers() freezes them at build time
import wretch from 'wretch';
import type { Mount } from '@/types.ts';
import { runScript } from '../../shared/cases.ts';
import { button, select } from '../../shared/controls.ts';
import { BASE, createServer } from '../../shared/server.ts';
import { createStage } from '../../shared/stage.ts';
import { twin } from '../../shared/twin.ts';


const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Both clients send the same call. Change the language between sends and compare.' });
  const server = createServer(stage, { '/frozen': () => ({ json: { ok: true } }), '/deferred': () => ({ json: { ok: true } }) }, { latency: 120 });
  // Cards are short: fewer headers and shorter titles.
  const pair = stage.preview
    ? twin(stage, '.headers()', '.defer()', ['accept-language', 'x-request-id'])
    : twin(stage, 'Fixed with .headers()', 'Computed with .defer()', ['accept-language', 'x-request-id', 'x-timestamp']);

  let currentLocale = 'en-US';
  let requestCounter = 0;
  const stamp = (): Record<string, string> => ({
    'Accept-Language': currentLocale,
    'X-Request-ID': `req-${++requestCounter}`,
    'X-Timestamp': new Date().toISOString().slice(11, 19),
  });

  // Read once, here: these values stay what they were when the client was built.
  const frozen = wretch(BASE).fetchPolyfill(server.fetch).headers(stamp());
  // Read again before every request.
  const deferred = wretch(BASE)
    .fetchPolyfill(server.fetch)
    .defer((req) => req.headers(stamp()));

  const last = (path: string) => server.requests.filter((r) => r.path === path).at(-1) ?? null;

  const sendBoth = async (): Promise<void> => {
    await Promise.all([frozen.get('/frozen').res(), deferred.get('/deferred').res()]).catch(() => {});
    if (stage.disposed) return;
    pair.show(last('/frozen'), last('/deferred'));
    const moved = last('/frozen')?.headers.get('accept-language') !== currentLocale;
    stage.say(moved ? `The language is ${currentLocale} now, but the fixed client still says what it said when built` : 'Same language so far. Change it and send again', moved ? 'warn' : 'info');
  };

  if (stage.bar) {
    select(stage.bar, 'Language', [['en-US', 'en-US'], ['fr-FR', 'fr-FR'], ['fi-FI', 'fi-FI']] as const, (v) => (currentLocale = v));
    button(stage.bar, 'Send both', () => void sendBoth());
    void sendBoth();
  } else {
    runScript(stage, async (wait) => {
      currentLocale = 'en-US';
      await sendBoth();
      await wait(1500);
      currentLocale = 'fr-FR';
      await sendBoth();
      await wait(1800);
    });
  }
  return () => stage.dispose();
};

export default mount;
