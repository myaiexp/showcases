// @pigment() mixes blue and yellow into green, where color-mix() gives grey
import '@css-doodle/addons/pigment';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const v0 = `
    @use: pigment;
    @grid: 7 / 100% / #f5f5f0;
    @size: 86%;
    border-radius: 50%;
    background: @pigment(
      #002185 $((@x - 1) / 6 * 100)%,
      #fcd200 $((@y - 1) / 6 * 100)%,
      #d7192e
    );
`;
const v1 = `
    @grid: 7 / 100% / #f5f5f0;
    @size: 86%;
    border-radius: 50%;
    background: color-mix(in srgb,
      #002185 $((@x - 1) / 6 * 100)%,
      #fcd200
    );
`;

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(v0);
  stage.variants(doodle, [
    { label: '@pigment()', code: v0 },
    { label: 'color-mix()', code: v1 },
  ], 2400);
  stage.say('Blue grows to the right, yellow to the bottom');
  return () => stage.dispose();
};

export default mount;
