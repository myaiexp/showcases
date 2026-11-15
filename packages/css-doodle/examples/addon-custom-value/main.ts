// CSSDoodle.use(name, { value }) adds a value function for every doodle
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

interface ValueApi {
  i: number;
  x: number;
  y: number;
  X: number;
  Y: number;
  random(a?: number, b?: number): number;
}
type DoodleClass = { use(name: string, def: { value(args: string[], api: ValueApi): string }): void };

// Registered once, page-wide: a name already taken is kept, so mounting again is harmless.
customElements.whenDefined('css-doodle').then(() => {
  const CSSDoodle = customElements.get('css-doodle') as unknown as DoodleClass;
  // @showcase-stripes(color): every other cell gets the colour.
  CSSDoodle.use('showcase-stripes', {
    value: ([color = 'black'], { i }) => (i % 2 ? color : 'transparent'),
  });
  // @showcase-ramp(from, to): a hue between two angles by column, using the cell api.
  CSSDoodle.use('showcase-ramp', {
    value: ([from = '0', to = '360'], { x, X, random }) => {
      const h = Number(from) + ((Number(to) - Number(from)) * (x - 1)) / Math.max(1, X - 1);
      return `hsl(${h.toFixed(1)} 70% ${(45 + random(25)).toFixed(1)}%)`;
    },
  });
});

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const doodle = stage.doodle(`
    @grid: 9 / 100% / #111 _2px;
    background: @showcase-ramp(180, 330);
    @nth(odd) {
      border-radius: 50%;
      background: @showcase-stripes(#fff);
    }
  `);
  stage.reroll(doodle, 2000);
  stage.say('@showcase-ramp and @showcase-stripes come from CSSDoodle.use()');
  return () => stage.dispose();
};

export default mount;
