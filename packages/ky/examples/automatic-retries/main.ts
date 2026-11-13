// ky retries a simulated flaky server, logging each attempt via beforeRetry
import ky from 'ky';
import type { Mount } from '@/types.ts';
import { createLog, type Log } from './log.ts';
import './style.css';

/** Fetch stand-in that answers 503 twice, then 200. No network is touched. */
async function runFlaky(log: Log, signal: AbortSignal): Promise<void> {
  let attempt = 0;
  const flakyFetch = async (): Promise<Response> => {
    attempt++;
    if (attempt < 3) {
      log.add(`attempt ${attempt}: server responded 503`, 'warn');
      return new Response('Service Unavailable', { status: 503 });
    }
    log.add(`attempt ${attempt}: server responded 200`, 'ok');
    return Response.json({ recovered: true, onAttempt: attempt });
  };
  try {
    const data = await ky
      .get('https://example.invalid/data', {
        fetch: flakyFetch,
        signal,
        retry: { limit: 3, statusCodes: [503], delay: () => 350 },
        hooks: {
          beforeRetry: [({ retryCount }) => log.add(`   ky retry #${retryCount} after backoff...`, 'dim')],
        },
      })
      .json();
    log.add('resolved: ' + JSON.stringify(data), 'ok');
  } catch (err) {
    if (signal.aborted) return;
    log.add('gave up: ' + (err instanceof Error ? err.message : String(err)), 'warn');
  }
}

const mount: Mount = (el, { preview, signal }) => {
  const root = document.createElement('div');
  root.className = preview ? 'root preview' : 'root';
  el.append(root);
  const box = document.createElement('div');
  box.className = 'log';
  const log = createLog(box);

  if (preview) {
    // Canned transcript of what a run looks like; nothing executes.
    log.add('GET https://example.invalid/data', 'dim');
    log.add('attempt 1: server responded 503', 'warn');
    log.add('   ky retry #1 after backoff...', 'dim');
    log.add('attempt 2: server responded 503', 'warn');
    log.add('   ky retry #2 after backoff...', 'dim');
    log.add('attempt 3: server responded 200', 'ok');
    log.add('resolved: {"recovered":true,"onAttempt":3}', 'ok');
    root.append(box);
    return () => undefined;
  }

  const button = document.createElement('button');
  button.className = 'btn';
  button.textContent = 'Send flaky request';
  log.add('Idle.');
  root.append(button, box);
  button.addEventListener('click', async () => {
    log.clear();
    button.disabled = true;
    await runFlaky(log, signal);
    if (!signal.aborted) button.disabled = false;
  });
  return () => undefined;
};

export default mount;
