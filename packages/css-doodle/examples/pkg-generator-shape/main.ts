// shape() turns @shape code into a polygon() or shape() string for clip-path
import { shape } from 'css-doodle/generator';
import type { Mount } from '@/types.ts';
import { codeBlock, framed } from '../../shared/frame.ts';
import { createStage } from '../../shared/stage.ts';

// Presets with a parameter, rounded corners, and commands: the docs' three calls, and more.
const CALLS: [string, () => string][] = [
  ["shape('clover 4')", () => shape('clover 4')],
  ["shape('star', 6)", () => shape('star', '6')],
  ["shape('square; round: .5')", () => shape('square; round: .5')],
  ["shape('points: 300; r: cos(5t)')", () => shape('points: 300; r: cos(5t)')],
  ["shape('hexagon')", () => shape('hexagon')],
  ['shape() (no code)', () => shape()],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx);
  const tile = document.createElement('div');
  const s = ctx.preview ? 120 : 280;
  tile.style.cssText = `width: ${s}px; height: ${s}px; background: linear-gradient(135deg, #ff006e, #3a86ff); transition: clip-path .5s`;
  const frame = framed(stage.root, tile, CALLS[0]![0]);
  const pre = codeBlock(stage.root, ctx.preview, 180);

  let i = 0;
  const show = (n: number): void => {
    i = n % CALLS.length;
    const [label, call] = CALLS[i]!;
    const value = call();
    tile.style.clipPath = value; // the string is a ready clip-path value
    frame.querySelector('figcaption')!.textContent = label;
    pre.textContent = value.length > 400 ? `${value.slice(0, 400)}…` : value;
  };
  show(0);
  stage.every(2200, () => show(i + 1));
  stage.say('The same code as @shape; @r and other @ functions do not run here');
  return () => stage.dispose();
};

export default mount;
