// Hello world: one connection between two shapes, with a label
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'x -> y: hello world', code: 'x -> y: hello world' },
      { label: 'The same, rendered in sketch mode', code: 'x -> y: hello world', options: { sketch: true } },
    ],
  });
  return () => stage.dispose();
};

export default mount;
