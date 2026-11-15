// Boards: a second board under `layers`, rendered alone or as one SVG
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';
import { createStage } from '../../shared/stage.ts';

const source = `# Root board
x -> y
layers: {
  # Board named "numbers" that does not inherit anything from root
  numbers: {
    1 -> 2
  }
}`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  playground(stage, {
    options: { themeID: 200 },
    variants: [
      { label: 'The root board (rendered by default)', code: source },
      { label: "target: 'layers.numbers' renders that board", code: source, options: { target: 'layers.numbers' } },
      {
        label: "target: '*' with animateInterval: both boards in one animated SVG",
        code: source,
        options: { target: '*', animateInterval: 1200 },
      },
    ],
  });
  return () => stage.dispose();
};

export default mount;
