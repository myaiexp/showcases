// Frame pivots: one drawing with four pivots, each spinning about its own point
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, type Frame } from '../../shared/sprites.ts';

const PIVOTS: [string, number, number][] = [
  ['centre', 0.5, 0.5],
  ['bottom-left', 0, 0],
  ['bottom', 0.5, 0],
  ['top-right', 1, 1],
];

function drawBanner(g: CanvasRenderingContext2D): void {
  for (let i = 0; i < 4; i++) {
    const x = i * 64;
    g.fillStyle = '#4ab3e8';
    g.fillRect(x + 6, 6, 52, 52);
    g.fillStyle = '#14171f';
    g.fillRect(x + 12, 12, 40, 4);
    g.fillStyle = '#f2c14e';
    g.beginPath();
    g.moveTo(x + 32, 24);
    g.lineTo(x + 50, 52);
    g.lineTo(x + 14, 52);
    g.closePath();
    g.fill();
  }
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2 });
  const { app } = scene;

  // Four frames cut from the same strip of the texture, differing only in `pivot`.
  const frames: Record<string, Frame> = {};
  PIVOTS.forEach(([name, px, py], i) => {
    frames[name] = { rect: new pc.Vec4(i * 64, 192, 64, 64), pivot: new pc.Vec2(px, py), border: new pc.Vec4(0, 0, 0, 0) };
  });
  // The strip is drawn at the top of the 256 px canvas, which is y = 192 from the bottom.
  const atlas = createAtlas(scene.stage.device, 256, drawBanner, frames, 'pivots');
  const sprites = PIVOTS.map(([name]) => createSprite(scene.stage.device, atlas, [name], { pixelsPerUnit: 64 }));
  const entities = sprites.map((sprite, i) => {
    const e = addSprite(app, PIVOTS[i]![0], { type: 'simple', sprite }, [(i - 1.5) * 2.2, 0, 0]);
    e.setLocalScale(1.5, 1.5, 1);
    return e;
  });

  let speed = 60;
  const from = new pc.Vec3();
  const to = new pc.Vec3();
  app.on('update', (dt: number) => {
    // A cross at each entity's origin: the point a pivot pins to.
    entities.forEach((e) => {
      e.rotate(0, 0, speed * dt);
      const p = e.getPosition();
      app.drawLine(from.set(p.x - 0.15, p.y, 0), to.set(p.x + 0.15, p.y, 0), pc.Color.WHITE, false);
      app.drawLine(from.set(p.x, p.y - 0.15, 0), to.set(p.x, p.y + 0.15, 0), pc.Color.WHITE, false);
    });
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('rotation speed', -180, 180, 5, speed, (v) => (speed = v));
    panel.readout(`pivots: ${PIVOTS.map(([n, x, y]) => `${n} (${x}, ${y})`).join(', ')}`);
  }

  return () => {
    sprites.forEach((s) => s.destroy());
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
