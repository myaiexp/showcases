// Send one request through wretch against a fake fetch returning a chosen status
import wretch from 'wretch';
import type { Log } from './log.ts';

export const STATUSES = [
  [200, '200 OK'],
  [400, '400 Bad Request'],
  [401, '401 Unauthorized'],
  [403, '403 Forbidden'],
  [404, '404 Not Found'],
  [500, '500 Internal Server Error'],
] as const;

/** Fake fetch answering with whatever status is requested. No network is touched. */
function makeFetch(status: number) {
  return async (): Promise<Response> => {
    const body = status === 200 ? { id: 1, title: 'It worked!' } : { error: 'simulated ' + status };
    return Response.json(body, { status });
  };
}

export async function send(status: number, log: Log, signal: AbortSignal): Promise<void> {
  log.clear();
  log.add(`requesting... server will respond ${status}`, 'dim');
  await wretch('https://demo.test/resource')
    .fetchPolyfill(makeFetch(status))
    .options({ signal })
    .get()
    .badRequest(() => log.add('400: .badRequest() handler fired', 'warn'))
    .unauthorized(() => log.add('401: .unauthorized() handler fired', 'warn'))
    .forbidden(() => log.add('403: .forbidden() handler fired', 'warn'))
    .notFound(() => log.add('404: .notFound() handler fired', 'warn'))
    .internalError(() => log.add('500: .internalError() handler fired', 'warn'))
    .json((data) => log.add('200: .json() resolver: ' + JSON.stringify(data), 'ok'))
    .catch((err: unknown) => {
      if (signal.aborted) return;
      log.add('unhandled: ' + (err instanceof Error ? err.message : String(err)), 'warn');
    });
}
