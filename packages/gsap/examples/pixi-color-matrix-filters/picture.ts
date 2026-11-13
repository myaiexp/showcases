// A small landscape drawn with Pixi Graphics, centred on its own origin, used as the filter target
import type * as PixiNS from 'pixi.js';

export function makePicture(PIXI: typeof PixiNS): PixiNS.Container {
  const box = new PIXI.Container();
  const g = new PIXI.Graphics();
  g.roundRect(-50, -40, 100, 80, 8).fill(0x4aa8ff); // sky
  g.circle(24, -16, 11).fill(0xffd60a); // sun
  g.poly([-50, 40, -50, 8, -22, -8, 4, 14, 30, 2, 50, 12, 50, 40]).fill(0x34c759); // hills
  g.rect(-34, 14, 24, 18).fill(0xff453a); // house wall
  g.poly([-38, 14, -22, 2, -6, 14]).fill(0x8e5b2a); // roof
  box.addChild(g);
  return box;
}
