// securityLevel switcher: one flowchart re-rendered under each level, with measured label, click and sandbox results
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid, renderInto } from '../../shared/setup.ts';

type Level = 'strict' | 'antiscript' | 'loose' | 'sandbox';
const LEVELS: readonly Level[] = ['strict', 'antiscript', 'loose', 'sandbox'];

// A node label with HTML tags and a click callback. strict encodes tags and disables click;
// antiscript and loose allow both; sandbox draws everything inside an iframe.
const DIAGRAM = `flowchart LR
    A["Plain <b>bold</b> and <i>italic</i> label"] --> B[Clickable step]
    click B secDemoClick "Calls a page function"`;

// Card version: no click line (a card has no pointer), and an animated edge so it looks alive.
const CARD = `flowchart LR
    A["Plain <b>bold</b> and <i>italic</i> label"] e1@--> B[Clickable step]
    e1@{ animate: true }`;

type Win = Window & { secDemoClick?: (id: string) => void };

// What usage.md says each level does. The measured lines printed under the diagram are what
// this build actually did, which is the part worth comparing against.
const SUMMARY: Record<Level, string> = {
  strict: 'docs: the default, HTML tags encoded, click disabled',
  antiscript: 'docs: HTML allowed with script removed, click enabled',
  loose: 'docs: HTML allowed, click enabled',
  sandbox: 'docs: all rendering in a sandboxed iframe',
};

const mount: Mount = async (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const win = window as Win;
  let clicks = 0;
  let ticket = 0;

  // Fonts that load through CSS must be ready before measuring, or labels end up out of bounds
  // (usage.md, Labels out of bounds), so the first render waits for them.
  const fontsReady = document.fonts?.ready ?? Promise.resolve();

  const draw = async (level: Level, report?: (t: string, e?: boolean) => void): Promise<void> => {
    const mine = ++ticket;
    // securityLevel is a site-level setting, so it goes through initialize, on top of BASE_CONFIG.
    if (!preview) mermaid.initialize({ ...BASE_CONFIG, securityLevel: level });
    clicks = 0;
    try {
      await fontsReady;
      // Rendered straight into the visible box: bindFunctions (the click wiring) looks the
      // nodes up in the document, so a detached staging element would lose the handlers.
      await renderInto(box, preview ? CARD : DIAGRAM, signal, box);
      if (mine !== ticket || signal.aborted) return;
      if (!report) return;
      // Measured from the DOM that came out, not assumed from the docs.
      const iframe = box.querySelector('iframe');
      const label = box.querySelector('svg .node')?.textContent ?? '';
      const hasBold = !!box.querySelector('svg .node b, svg .node strong');
      const nodeB = [...box.querySelectorAll('svg .node')].find((n) => (n.textContent ?? '').includes('Clickable'));
      nodeB?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
      report(
        `securityLevel: ${level} (${SUMMARY[level]})\n` +
          (iframe
            ? 'Output is an <iframe sandbox>: the SVG lives in its srcdoc, so the page cannot reach into it.'
            : `<b> turned into real bold: ${hasBold ? 'yes' : 'no'}   label text: "${label.trim()}"\n` +
              `click callback ran on a scripted click: ${clicks > 0 ? 'yes' : 'no'}`),
      );
    } catch (err) {
      if (mine === ticket && !signal.aborted) report?.(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    // A card must not touch the site config other cards render with, so it stays at the default level.
    void draw('strict');
    return () => {
      ticket++;
    };
  }

  win.secDemoClick = (): void => {
    clicks++;
  };
  const report = statusLine(el);
  const row = document.createElement('div');
  row.className = 'mm-tabs';
  const buttons = LEVELS.map((level) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'mm-tab';
    b.textContent = level;
    b.addEventListener('click', () => {
      for (const o of buttons) o.classList.toggle('active', o === b);
      void draw(level, report);
    });
    row.append(b);
    return b;
  });
  el.insertBefore(row, box);
  buttons[0]!.click();
  return () => {
    ticket++;
    delete win.secDemoClick;
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
