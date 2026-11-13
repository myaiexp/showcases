// Git history appended one statement at a time on a timer; the full view adds play/pause, step and restart
import type { Mount } from '@/types.ts';
import { diagramBox, statusLine } from '../../shared/playground.ts';
import { renderInto } from '../../shared/setup.ts';

// The statements, in order. A cherry-pick needs an existing commit id on another branch,
// so the ids are set by hand; merge draws the double-circle merge commit.
const STATEMENTS = [
  'commit id: "init"',
  'commit id: "ci"',
  'branch feature',
  'commit id: "form"',
  'checkout main',
  'commit id: "hotfix"',
  'checkout feature',
  'commit id: "validate"',
  'cherry-pick id: "hotfix"',
  'commit id: "polish"',
  'checkout main',
  'merge feature id: "merge" tag: "v1.0.0"',
  'commit id: "next"',
];

// The full history, as a literal: every prefix of it is also a valid diagram.
export const FULL = `gitGraph
  commit id: "init"
  commit id: "ci"
  branch feature
  commit id: "form"
  checkout main
  commit id: "hotfix"
  checkout feature
  commit id: "validate"
  cherry-pick id: "hotfix"
  commit id: "polish"
  checkout main
  merge feature id: "merge" tag: "v1.0.0"
  commit id: "next"`;

const mount: Mount = (el, { preview, signal }) => {
  const box = diagramBox(el, preview);
  const report = statusLine(el);
  let shown = preview ? 5 : 1;
  let timer = 0;
  let busy = false;
  let stopped = false;
  let playing = true;

  const draw = async (): Promise<void> => {
    busy = true;
    const staging = document.createElement('div');
    const code = `gitGraph\n  ${STATEMENTS.slice(0, shown).join('\n  ')}`;
    try {
      await renderInto(staging, code, signal);
      if (stopped || signal.aborted) return;
      box.replaceChildren(...staging.childNodes);
      report(`Statement ${shown} of ${STATEMENTS.length}: ${STATEMENTS[shown - 1]}`);
    } catch (err) {
      if (!stopped && !signal.aborted) report(err instanceof Error ? err.message : String(err), true);
    } finally {
      busy = false;
    }
  };

  const advance = (): void => {
    if (busy) return;
    shown = shown >= STATEMENTS.length ? 1 : shown + 1;
    void draw();
  };

  if (!preview) {
    const row = document.createElement('div');
    row.className = 'mm-row';
    const make = (text: string, onClick: () => void): HTMLButtonElement => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'mm-tab';
      b.textContent = text;
      b.addEventListener('click', onClick);
      row.append(b);
      return b;
    };
    const toggle = make('Pause', () => {
      playing = !playing;
      toggle.textContent = playing ? 'Pause' : 'Play';
    });
    make('Step', advance);
    make('Restart', () => {
      shown = 1;
      void draw();
    });
    el.insertBefore(row, box);
  }

  void draw();
  timer = window.setInterval(() => {
    if (playing) advance();
  }, preview ? 1200 : 1500);

  return () => {
    stopped = true;
    clearInterval(timer);
  };
};

export default mount;
