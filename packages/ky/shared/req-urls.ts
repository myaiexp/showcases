// URL examples: a table of Ky calls and the address each one reached
import type { KyInstance } from 'ky';
import { button, textInput } from './controls.ts';
import { errorName, logView } from './panels.ts';
import { shortUrl, type Demo } from './req-kit.ts';

export interface LabRow {
  /** What the table shows for the call, such as "'users'". */
  label: string;
  /** The Ky call itself, made on the instance it is given. */
  send: (api: KyInstance) => Promise<unknown>;
  /** Plain-English line for the caption while this row is sent. */
  say?: string;
}

export interface LabColumn {
  title: string;
  rows: readonly LabRow[];
}

export interface LabOptions {
  /** Which paths exist on the server; others answer 404, shown in red. Default: all. */
  exists?: (url: URL) => boolean;
  /** Caption after a whole table was sent. */
  done: string;
  /** Full view: a box where the reader types their own input. */
  custom?: { label: string; initial: string; send: (api: KyInstance, input: string) => Promise<unknown> };
}

/** Sends every row and lists `call -> address the server got`. Cards replay it forever. */
export function urlLab(d: Demo, columns: readonly LabColumn[], opts: LabOptions): void {
  const { stage, server, api } = d;
  server.route('*', (req) => (opts.exists && !opts.exists(req.url) ? { status: 404, json: { error: 'Not found' } } : { json: { ok: true } }));
  const row = stage.row();
  const logs = columns.map((c) => logView(row, c.title, Math.max(...columns.map((x) => x.rows.length)) + 1));

  const sendOne = async (log: (typeof logs)[number], label: string, send: () => Promise<unknown>): Promise<void> => {
    const before = server.requests.length;
    let failure: unknown;
    try {
      await send();
    } catch (error) {
      if (stage.disposed) throw error;
      failure = error;
    }
    const got = server.requests[before];
    const final = got ? shortUrl(got.url) : 'nothing sent';
    // A call that reached exactly the address it was given: say so instead of repeating it.
    const where = got?.url.href === label.slice(1, -1) ? 'unchanged' : final;
    const miss = failure !== undefined ? ` ✕ ${errorName(failure) === 'HTTPError' ? '404' : errorName(failure)}` : '';
    log.add(`${label} → ${where}${miss}`, failure === undefined ? 'ok' : 'bad');
  };

  const sendAll = async (wait?: (ms: number) => Promise<void>): Promise<void> => {
    logs.forEach((l) => l.clear());
    const longest = Math.max(...columns.map((c) => c.rows.length));
    for (let i = 0; i < longest; i++) {
      for (const [k, col] of columns.entries()) {
        const r = col.rows[i];
        if (!r) continue;
        if (r.say) stage.say(r.say);
        await sendOne(logs[k]!, r.label, () => r.send(api));
      }
      await wait?.(500);
    }
    stage.say(opts.done, 'ok');
  };

  if (stage.preview) {
    stage.play(async (wait) => {
      await sendAll(wait);
      await wait(2200);
    });
    return;
  }
  button(stage.bar!, 'Send all', () => stage.task(() => sendAll()));
  if (opts.custom) {
    const { custom } = opts;
    let typed = custom.initial;
    textInput(stage.bar!, custom.label, typed, (v) => (typed = v), 22);
    button(stage.bar!, 'Send mine', () =>
      stage.task(() => sendOne(logs[0]!, `'${typed}'`, () => custom.send(api, typed))),
    );
  }
  stage.task(() => sendAll());
}
