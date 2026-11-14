// A warn listener shows problems in a little editor, not the console
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import './style.css';

interface Warning {
  message: string;
  index?: number;
  pos?: [number, number];
}

// A doodle typed one line at a time, with two mistakes along the way.
const LINES = [
  '@grid: 6 / 100% _2px;',
  'background: @pick(#fb8500, #219ebc;',
  'background: @pick(#fb8500, #219ebc);',
  'rotate: @spin(45deg);',
  'rotate: @r(45deg);',
  'border-radius: 0 50%;',
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(LINES[0]!, { editor: false });

  const box = document.createElement('div');
  box.className = 'mini';
  const src = document.createElement('pre');
  const out = document.createElement('div');
  out.className = 'out';
  box.append(src, out);
  stage.root.append(box);

  // The warn event bubbles; preventDefault() keeps it out of the console.
  const seen: Warning[] = [];
  doodle.addEventListener('warn', (e) => {
    e.preventDefault();
    seen.push((e as CustomEvent<Warning>).detail);
  });
  doodle.addEventListener('beforeUpdate', () => (seen.length = 0));
  doodle.addEventListener('render', () => {
    out.textContent = seen.length ? seen.map((w) => `⚠ ${w.message}`).join('\n') : '✓ no warnings';
    out.dataset['bad'] = String(seen.length > 0);
  });

  // Keep the fixed lines, replace the broken ones with their fix.
  let step = 0;
  const lines: string[] = [];
  const type = (): void => {
    step = (step + 1) % LINES.length;
    if (step === 0) lines.length = 0;
    else if (/@pick\(#fb8500, #219ebc\)|@r\(45deg\)/.test(LINES[step]!)) lines.pop();
    if (step) lines.push(LINES[step]!);
    const code = [LINES[0]!, ...lines].join('\n');
    src.textContent = code;
    doodle.update(code);
  };
  src.textContent = LINES[0]!;
  stage.every(ctx.preview ? 1400 : 2000, type);
  return () => stage.dispose();
};

export default mount;
