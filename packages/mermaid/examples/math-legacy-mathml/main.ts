// legacyMathML / forceLegacyMathML switches (site-level, via initialize) with a count of MathML vs KaTeX HTML output
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { BASE_CONFIG, mermaid, renderInto } from '../../shared/setup.ts';
// legacyMathML falls back to CSS rendering only where MathML is unsupported; forceLegacyMathML
// uses KaTeX's stylesheet always. Either way KaTeX's CSS must come from the page, not Mermaid
// (math.md, Legacy Support), so it is imported from the katex package as a string and
// injected as a <style> only while this example is mounted.
import KATEX_CSS from 'katex/dist/katex.min.css?inline';

const DIAGRAM = String.raw`graph LR
    A["$$x^2$$"] -->|"$$\sqrt{x+3}$$"| B("$$\frac{1}{2}$$")
    A -->|"$$\overbrace{a+b+c}^{\text{note}}$$"| C("$$\pi r^2$$")
    B --> D("$$x = \begin{cases} a &\text{if } b \\ c &\text{if } d \end{cases}$$")
    C --> E("$$x(t)=c_1\begin{bmatrix}-\cos{t}+\sin{t}\\ 2\cos{t} \end{bmatrix}e^{2t}$$")`;

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const state = { legacy: false, force: false };
  let ticket = 0;
  let timer = 0;

  const style = document.createElement('style');
  style.textContent = KATEX_CSS;
  document.head.append(style);

  const draw = async (report?: (t: string, e?: boolean) => void): Promise<void> => {
    const mine = ++ticket;
    // These two keys are site-level, so they go through initialize on top of BASE_CONFIG.
    mermaid.initialize({ ...BASE_CONFIG, legacyMathML: state.legacy, forceLegacyMathML: state.force });
    const staging = document.createElement('div');
    try {
      await renderInto(staging, DIAGRAM, signal, box);
      if (mine !== ticket || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      const mathml = box.querySelectorAll('math').length;
      const html = box.querySelectorAll('.katex-html').length;
      report?.(
        `legacyMathML: ${state.legacy}, forceLegacyMathML: ${state.force}\n` +
          `<math> elements: ${mathml}   .katex-html (CSS rendering) elements: ${html}`,
      );
    } catch (err) {
      if (mine === ticket && !signal.aborted) report?.(err instanceof Error ? err.message : String(err), true);
    }
  };

  if (preview) {
    // A card flips both flags itself, since it has no controls.
    let i = 0;
    const steps = [
      { legacy: false, force: false },
      { legacy: true, force: false },
      { legacy: true, force: true },
    ];
    const next = (): void => {
      Object.assign(state, steps[i++ % steps.length]);
      void draw();
    };
    next();
    timer = window.setInterval(next, 3000);
  } else {
    const report = statusLine(el);
    const row = document.createElement('div');
    row.className = 'mm-row';
    for (const key of ['legacy', 'force'] as const) {
      const label = document.createElement('label');
      const box2 = document.createElement('input');
      box2.type = 'checkbox';
      box2.addEventListener('change', () => {
        state[key] = box2.checked;
        void draw(report);
      });
      label.append(box2, key === 'legacy' ? ' legacyMathML' : ' forceLegacyMathML');
      row.append(label);
    }
    el.insertBefore(row, box);
    void draw(report);
  }
  return () => {
    ticket++;
    clearInterval(timer);
    style.remove();
    mermaid.initialize(BASE_CONFIG);
  };
};

export default mount;
