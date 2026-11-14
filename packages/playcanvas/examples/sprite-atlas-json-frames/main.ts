// Texture packing: a packed atlas whose named frames come from JSON frame data
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addSprite, createAtlas, createSprite, createSpriteScene, type Frame } from '../../shared/sprites.ts';

// Frame data in the "JSON hash" shape packers export: a name for each rectangle, in pixels from
// the top-left of the image. This example's own field names stand in for a packer's file.
const JSON_HASH = {
  size: { w: 256, h: 256 },
  frames: {
    star: { frame: { x: 0, y: 0, w: 112, h: 112 }, pivot: { x: 0.5, y: 0.5 } },
    heart: { frame: { x: 120, y: 0, w: 80, h: 72 }, pivot: { x: 0.5, y: 0.5 } },
    bar: { frame: { x: 0, y: 120, w: 160, h: 40 }, pivot: { x: 0.5, y: 0.5 } },
    gem: { frame: { x: 168, y: 120, w: 64, h: 96 }, pivot: { x: 0.5, y: 0.5 } },
    dot: { frame: { x: 0, y: 176, w: 48, h: 48 }, pivot: { x: 0.5, y: 0.5 } },
  },
};

function drawPacked(g: CanvasRenderingContext2D): void {
  g.fillStyle = '#f2c14e';
  g.beginPath();
  for (let k = 0; k < 10; k++) {
    const a = -Math.PI / 2 + (k * Math.PI) / 5;
    const r = k % 2 ? 24 : 54;
    g[k ? 'lineTo' : 'moveTo'](56 + Math.cos(a) * r, 56 + Math.sin(a) * r);
  }
  g.fill();
  g.fillStyle = '#f472b6';
  g.beginPath();
  g.moveTo(160, 68);
  g.bezierCurveTo(112, 40, 130, 6, 160, 26);
  g.bezierCurveTo(190, 6, 208, 40, 160, 68);
  g.fill();
  g.fillStyle = '#4ab3e8';
  g.fillRect(0, 120, 160, 40);
  g.fillStyle = '#2dd4bf';
  g.beginPath();
  g.moveTo(200, 120);
  g.lineTo(232, 150);
  g.lineTo(200, 216);
  g.lineTo(168, 150);
  g.fill();
  g.fillStyle = '#e8794a';
  g.beginPath();
  g.arc(24, 200, 24, 0, Math.PI * 2);
  g.fill();
}

const mount: Mount = async (el, ctx) => {
  const scene = await createSpriteScene(el, ctx, { orthoHeight: 2.2 });
  const { app } = scene;

  // Convert the packer's top-left rectangles to the atlas's bottom-left ones.
  const frames: Record<string, Frame> = {};
  for (const [name, f] of Object.entries(JSON_HASH.frames)) {
    frames[name] = {
      rect: new pc.Vec4(f.frame.x, JSON_HASH.size.h - f.frame.y - f.frame.h, f.frame.w, f.frame.h),
      pivot: new pc.Vec2(f.pivot.x, f.pivot.y),
      border: new pc.Vec4(0, 0, 0, 0),
    };
  }
  frames.sheet = { rect: new pc.Vec4(0, 0, 256, 256), pivot: new pc.Vec2(0.5, 0.5), border: new pc.Vec4(0, 0, 0, 0) };
  const atlas = createAtlas(scene.stage.device, 256, drawPacked, frames, 'packed');

  // One sprite per frame name; the whole sheet is a sixth frame, to show the packing.
  const names = Object.keys(JSON_HASH.frames);
  const sprites = names.map((name) => createSprite(scene.stage.device, atlas, [name], { pixelsPerUnit: 80 }));
  const sheet = createSprite(scene.stage.device, atlas, ['sheet'], { pixelsPerUnit: 128 });
  addSprite(app, 'sheet', { type: 'simple', sprite: sheet }, [-2.4, 0, 0]);
  const entities = sprites.map((sprite, i) => addSprite(app, names[i]!, { type: 'simple', sprite }, [0.4 + (i % 3) * 1.6, i < 3 ? 0.7 : -0.9, 0]));

  app.on('update', (dt: number) => {
    entities.forEach((e, i) => e.rotate(0, 0, (i % 2 ? -1 : 1) * 30 * dt));
  });

  if (!ctx.preview) {
    createPanel(el).readout(`frames: ${names.join(', ')} (each a named rectangle of one texture, one draw state for all)`);
  }

  return () => {
    sprites.forEach((s) => s.destroy());
    sheet.destroy();
    atlas.destroy();
    scene.dispose();
  };
};

export default mount;
