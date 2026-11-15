// css-doodle/meta lists the functions, selectors, properties and operators by name
import { calcOperators, functions, mathFunctions, properties, selectors } from 'css-doodle/meta';
import type { Mount } from '@/types.ts';
import { button } from '../../shared/controls.ts';
import { codeBlock } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

const LISTS: [string, () => string][] = [
  [`functions.names (${functions.names.length})`, () => functions.names.map((n) => `@${n}`).join('  ')],
  ['functions.alias', () => Object.entries(functions.alias).map(([a, t]) => `@${a} → @${t}`).join('\n')],
  ['functions.variants', () => Object.entries(functions.variants).map(([f, v]) => `@${f}: .${v.join(' .')}`).join('\n')],
  [`mathFunctions (${mathFunctions.length})`, () => mathFunctions.join('  ')],
  ['selectors', () => selectors.names.map((n) => `@${n}`).join('  ')],
  ['properties', () => properties.names.map((n) => `@${n}`).join('  ')],
  ['calcOperators', () => Object.entries(calcOperators).sort((a, b) => b[1] - a[1]).map(([op, p]) => `${p}  ${op}`).join('\n')],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const pre = codeBlock(stage.root, ctx.preview, 360);
  pre.style.maxWidth = ctx.preview ? '240px' : '640px';
  const show = (i: number): void => {
    const [label, text] = LISTS[i]!;
    stage.say(label);
    pre.textContent = text();
  };
  show(0);
  if (stage.bar) LISTS.forEach(([label], i) => button(stage.bar!, label.replace(/ \(.*/, ''), () => show(i)));
  else {
    let i = 0;
    stage.every(2200, () => show((i = (i + 1) % LISTS.length)));
  }
  return () => stage.dispose();
};

export default mount;
