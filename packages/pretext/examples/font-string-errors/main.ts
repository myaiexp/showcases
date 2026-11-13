// Tries prepare() with font strings and letterSpacing values and reports which throw a RangeError
import '@fontsource-variable/inter';
import { prepare } from '@chenglou/pretext';
import type { Mount } from '@/types.ts';
import './style.css';

interface Outcome {
  ok: boolean;
  text: string;
}

// The one place Pretext is called: either a handle comes back, or a RangeError says what was wrong.
function attempt(font: string, letterSpacing?: number): Outcome {
  try {
    prepare('Hello, world', font, letterSpacing === undefined ? undefined : { letterSpacing });
    return { ok: true, text: 'prepared' };
  } catch (e) {
    return { ok: false, text: e instanceof Error ? `${e.name}: ${e.message}` : String(e) };
  }
}

const FONT_CASES = [
  '',
  '16px',
  'Arial 16px',
  'var(--font)',
  'bold',
  '16px Arial',
  '16px "Inter Variable"',
  '600 18px "Inter Variable", sans-serif',
  '1rem "Inter Variable"',
];
const SPACING_CASES = [NaN, Infinity, -Infinity, 0, 1.5];
const VALID = '16px "Inter Variable"';

const mount: Mount = async (el, { preview, signal }) => {
  await document.fonts.load(VALID, 'Hello, world');
  if (signal.aborted) return () => {};
  const root = document.createElement('div');
  root.className = 'root';

  const cases: { label: string; run: () => Outcome }[] = [
    ...FONT_CASES.map(f => ({ label: `font: ${JSON.stringify(f)}`, run: () => attempt(f) })),
    ...SPACING_CASES.map(s => ({ label: `letterSpacing: ${s}`, run: () => attempt(VALID, s) })),
  ];

  if (preview) {
    const big = document.createElement('div');
    big.className = 'big';
    const code = document.createElement('code');
    const badge = document.createElement('span');
    const msg = document.createElement('span');
    msg.className = 'msg';
    big.append(code, badge, msg);
    root.append(big);
    el.append(root);
    let i = 0;
    const show = (): void => {
      const c = cases[i++ % cases.length];
      if (!c) return;
      const r = c.run();
      code.textContent = c.label;
      badge.className = `badge ${r.ok ? 'ok' : 'throws'}`;
      badge.textContent = r.ok ? 'prepared' : 'throws RangeError';
      msg.textContent = r.ok ? '' : r.text.slice(0, 80);
    };
    show();
    const timer = window.setInterval(show, 1300);
    return () => clearInterval(timer);
  }

  const table = document.createElement('div');
  table.className = 'table';
  for (const h of ['Argument', 'Result', 'What Pretext said']) {
    const s = document.createElement('span');
    s.className = 'head';
    s.textContent = h;
    table.append(s);
  }
  const addRow = (label: string, r: Outcome): void => {
    const a = document.createElement('code');
    a.textContent = label;
    const b = document.createElement('span');
    b.className = `badge ${r.ok ? 'ok' : 'throws'}`;
    b.textContent = r.ok ? 'ok' : 'throws';
    const m = document.createElement('span');
    m.className = 'msg';
    m.textContent = r.text;
    table.append(a, b, m);
  };
  for (const c of cases) addRow(c.label, c.run());

  // Try your own string.
  const controls = document.createElement('div');
  controls.className = 'controls';
  const input = document.createElement('input');
  input.value = '16px';
  const own = document.createElement('div');
  own.className = 'table';
  controls.append(input);
  const tryOwn = (): void => {
    own.replaceChildren();
    const a = document.createElement('code');
    a.textContent = JSON.stringify(input.value);
    const r = attempt(input.value);
    const b = document.createElement('span');
    b.className = `badge ${r.ok ? 'ok' : 'throws'}`;
    b.textContent = r.ok ? 'ok' : 'throws';
    const m = document.createElement('span');
    m.className = 'msg';
    m.textContent = r.text;
    own.append(a, b, m);
  };
  input.addEventListener('input', tryOwn);
  tryOwn();

  // What getComputedStyle(...).font gives when font-variant-numeric is set.
  const plain = document.createElement('span');
  plain.className = 'sample';
  plain.textContent = 'Plain 0123';
  const tab = document.createElement('span');
  tab.className = 'sample tab';
  tab.textContent = 'Tabular 0123';
  const probe = document.createElement('p');
  probe.className = 'probe';
  root.append(table, controls, own, plain, tab, probe);
  el.append(root);
  const fontOf = (e: HTMLElement): string => getComputedStyle(e).font;
  const describe = (name: string, e: HTMLElement): string => {
    const f = fontOf(e);
    return `${name}: getComputedStyle(el).font = ${JSON.stringify(f)} → prepare() ${attempt(f).text}`;
  };
  probe.textContent = [
    describe('without font-variant-numeric', plain),
    describe('with font-variant-numeric: tabular-nums', tab),
    'An empty computed font is a string Canvas can\'t parse. Build the font string yourself from size, weight and family; Pretext does not read font-variant-numeric either way.',
  ].join('\n');

  return () => input.removeEventListener('input', tryOwn);
};

export default mount;
