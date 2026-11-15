// Doodle.diagnostics lists the last render's warnings with their place
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { createStage, dedent } from '../../shared/stage.ts';

const SAMPLES = [
  `@grid: 5 / 100% _2px;
background: @colour(red, blue);
border: 2px solid #ff006e;`,
  `@grid: 5 / 100% _2px;
background: #3a86ff;
border-radius: @p(50%, 0;
rotate: 45deg;`,
  `@grid: 5 / 100% _2px;
background: #8338ec;
@keyframes {
  to { opacity: .2 }
}`,
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(SAMPLES[0]!);
  const pre = document.createElement('pre');
  pre.className = 'cd-readout';
  pre.style.cssText = 'margin: 0; flex-basis: 100%; text-align: center';
  stage.root.append(pre);

  // index is a character offset into the code; turn it into line:column.
  const where = (code: string, index?: number, pos?: [number, number]): string => {
    if (pos) return `${pos[1] + 1}:${pos[0] + 1}`;
    if (index === undefined) return '?';
    const lines = code.slice(0, index).split('\n');
    return `${lines.length}:${lines.at(-1)!.length + 1}`;
  };
  doodle.addEventListener('render', () => {
    const code = dedent(SAMPLES[i]!);
    const list = doodle.diagnostics;
    pre.textContent = list.length
      ? list.map((d) => `${where(code, d.index, d.pos)}  ${d.message}`).join('\n')
      : 'diagnostics: []';
  });

  const LABELS = ['unknown function', 'unclosed (', 'keyframes without a name'];
  let i = 0;
  const show = (j: number): void => {
    i = j;
    stage.setCode(doodle, SAMPLES[j]!);
  };
  if (stage.bar) LABELS.forEach((label, j) => button(stage.bar!, label, () => show(j)));
  else stage.every(2600, () => show((i + 1) % SAMPLES.length));
  stage.say('Nothing is fatal: problems show up on diagnostics');
  return () => stage.dispose();
};

export default mount;
