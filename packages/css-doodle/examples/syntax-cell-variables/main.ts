// Rings whose size and hue come from $(...), @i and the custom property --n
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @grid: 12x1 / 100% / #111;
    --n: 12;
    @place: center;
    @size: $%(100 - 6 * @i);
    border: 2px solid hsl($(360 / n * @i), 70%, 55%);
    border-radius: 50%;
`;
const v1 = `
    @grid: 12x1 / 100% / #111;
    --n: 36;
    @place: center;
    @size: $%(100 - 6 * @i);
    border: 2px solid hsl($(360 / n * @i), 70%, 55%);
    border-radius: 50%;
`;
const v2 = `
    @grid: 12x1 / 100% / #111;
    --n: 4;
    @place: center;
    @size: $%(100 - 6 * @i);
    border: 2px solid hsl($(360 / n * @i), 70%, 55%);
    border-radius: 50%;
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '--n: 12', code: v0 },
    { label: '--n: 36', code: v1 },
    { label: '--n: 4', code: v2 },
  ]);
  stage.say('n inside $() is the custom property --n');
  return () => stage.dispose();
};

export default mount;
