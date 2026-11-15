// compile returns an Err for a broken trio, and showError turns it into a message
import { compile, showError } from '@penrose/core';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

// Each trio breaks one program. The first is the docs' own example.
const broken = [
  {
    label: 'every program is nonsense',
    trio: {
      substance: 'howdy pardner',
      style: 'yeehaw',
      domain: "this diagram ain't big enough for the two of us",
      variation: 'super varied',
    },
  },
  {
    label: 'Substance uses an undeclared type',
    trio: { domain: 'type Set', substance: 'Point p', style: 'canvas {\n  width = 400\n  height = 300\n}', variation: 'v' },
  },
  {
    label: 'Substance calls an undeclared predicate',
    trio: { domain: 'type Set', substance: 'Set A, B\nSubset(A, B)', style: 'canvas {\n  width = 400\n  height = 300\n}', variation: 'v' },
  },
  {
    label: 'a shape property gets the wrong type',
    trio: {
      domain: 'type Set',
      substance: 'Set A',
      style: 'canvas {\n  width = 400\n  height = 300\n}\nforall Set x {\n  x.icon = Circle {\n    r : true\n  }\n}',
      variation: 'v',
    },
  },
];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const out = document.createElement('pre');
  out.className = 'pr-error-text';
  stage.paper.append(out);

  const show = async (i: number): Promise<void> => {
    const { label, trio } = broken[i % broken.length]!;
    const compiled = await compile(trio);
    if (stage.disposed) return;
    if (compiled.isErr()) {
      // spoiler alert: it is indeed Err
      out.textContent = showError(compiled.error);
      stage.say(`${label} → ${compiled.error.errorType}`, 'warn');
    } else {
      out.textContent = 'compiled without an error';
    }
  };

  let turn = 0;
  for (const [i, b] of broken.entries()) stage.button(b.label, () => void show((turn = i)));
  await show(0);
  if (stage.preview) stage.every(3000, () => void show(++turn));
  return () => stage.dispose();
};

export default mount;
