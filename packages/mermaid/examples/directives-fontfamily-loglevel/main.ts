// %%{init}%% fontFamily and logLevel: the font follows the directive; the console panel shows which logLevel route reaches the logger
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid, renderInto } from '../../shared/setup.ts';

const FONTS = [
  'Trebuchet MS, Verdana, Arial, Sans-Serif',
  'monospace',
  'Georgia, serif',
  'Comic Sans MS, cursive',
];
// The docs' logLevel numbers: 1 debug, 2 info, 3 warn, 4 error, 5 only fatal errors (default).
const LEVELS = ['1', '2', '3', '4', '5'];
const NAMES: Record<string, string> = { '1': 'debug', '2': 'info', '3': 'warn', '4': 'error', '5': 'fatal only' };

// In "directive" mode logLevel rides in the init directive; in "initialize" mode it goes through
// mermaid.initialize() instead. The panel shows that only one of them reaches the logger.
const definition = (font: string, level: string): string => `%%{init: { "fontFamily": "${font}", "logLevel": ${level} } }%%
graph TD
A(Forest) --> B[/Another/]
A --> C[End]
  subgraph section
  B
  C
  end`;

type Method = 'debug' | 'info' | 'warn' | 'error' | 'log';
const METHODS: Method[] = ['debug', 'info', 'warn', 'error', 'log'];

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  let font = FONTS[0]!;
  let level = '1';
  let via = 'directive';
  let ticket = 0;
  let timer = 0;

  /** Runs one render with the console methods wrapped, then restores them and counts the calls. */
  const draw = async (report?: (t: string, e?: boolean) => void): Promise<void> => {
    const mine = ++ticket;
    const counts: Record<Method, number> = { debug: 0, info: 0, warn: 0, error: 0, log: 0 };
    const originals = new Map<Method, (...a: unknown[]) => void>();
    // Wrapping console is the only way a page can see Mermaid's log output; each original is
    // still called, and every wrapper is put back in the finally block below.
    for (const m of METHODS) {
      const orig = console[m].bind(console) as (...a: unknown[]) => void;
      originals.set(m, orig);
      console[m] = (...args: unknown[]): void => {
        counts[m]++;
        orig(...args);
      };
    }
    const staging = document.createElement('div');
    try {
      // The logger binds to console when the level is set, so the wrappers above are already
      // in place before initialize() or the directive runs.
      mermaid.initialize(via === 'initialize' ? { ...BASE_CONFIG, logLevel: Number(level) as 1 | 2 | 3 | 4 | 5 } : BASE_CONFIG);
      await renderInto(staging, definition(font, level), signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
    } catch (err) {
      if (mine === ticket && !signal.aborted) report?.(err instanceof Error ? err.message : String(err), true);
      return;
    } finally {
      for (const m of METHODS) console[m] = originals.get(m)! as typeof console.log;
    }
    report?.(
      `logLevel ${level} (${NAMES[level]}) set by ${via === 'directive' ? 'the init directive' : 'mermaid.initialize()'}, fontFamily "${font}" (always from the directive)\n` +
        `console calls during the render: ${METHODS.map((m) => `${m} ${counts[m]}`).join(', ')}\n` +
        (via === 'directive'
          ? 'The directive is parsed (the font changed) but the logger keeps the level from initialize(), so this stays quiet.'
          : 'Lower levels log more: level 1 writes debug lines, level 5 writes only fatal errors.'),
    );
  };

  if (preview) {
    // A card shows the font change only; log levels are invisible without a console.
    let i = 0;
    const next = (): void => {
      font = FONTS[i++ % FONTS.length]!;
      void draw();
    };
    next();
    timer = window.setInterval(next, 2500);
    return () => {
      ticket++;
      clearInterval(timer);
    };
  }

  const report = statusLine(el);
  const row = document.createElement('div');
  row.className = 'mm-row';
  const select = (label: string, options: string[], fmt: (o: string) => string, set: (v: string) => void, initial: string): void => {
    const l = document.createElement('label');
    l.textContent = `${label} `;
    const s = document.createElement('select');
    for (const o of options) s.append(new Option(fmt(o), o));
    s.value = initial;
    s.setAttribute('aria-label', label);
    s.addEventListener('change', () => {
      set(s.value);
      void draw(report);
    });
    l.append(s);
    row.append(l);
  };
  select('fontFamily', FONTS, (o) => o, (v) => (font = v), font);
  select('logLevel', LEVELS, (o) => `${o} (${NAMES[o]})`, (v) => (level = v), level);
  select('logLevel set through', ['directive', 'initialize'], (o) => o, (v) => (via = v), via);
  el.insertBefore(row, box);
  void draw(report);
  return () => {
    ticket++;
    // The directive set the logger's level for this page; put the default back.
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
