// isKeyHeldDown, isKeyDown and isKeyUp on Space, matched to the docs' state dictionary
import { Keys, PrimitiveMesh } from '@galacean/engine';
import type { Mount } from '@/types.ts';
import { lit, PALETTE, phong, solid, tick } from '../../shared/core-kit.ts';
import { overlayLayer } from '../../shared/core-ui.ts';
import { createStage } from '../../shared/stage.ts';

const ROWS: [boolean, boolean, boolean, string][] = [
  [true, false, false, 'held since an earlier frame'],
  [true, true, false, 'pressed this frame, not released'],
  [true, true, true, 'released and pressed again this frame'],
  [false, true, true, 'pressed and released this frame'],
  [false, false, true, 'released this frame'],
  [false, false, false, 'no interaction'],
];

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx, { hint: 'Click the canvas, then press and release Space. Cards replay a scripted sequence of presses.' });
  const { engine, root } = stage;
  lit(stage, [0, 1.5, 6.5], [0, 0.6, 0]);
  const table = document.createElement('div');
  table.style.cssText = `position:absolute;left:6px;top:6px;pointer-events:none;font:${stage.preview ? 10 : 12}px/1.5 ui-monospace,monospace;color:#cfd6e4;background:rgba(8,10,16,.62);border-radius:6px;padding:4px 6px`;
  overlayLayer(stage).append(table);
  stage.own(() => table.remove());
  const rows = ROWS.map(([h, d, u, text]) => {
    const row = document.createElement('div');
    row.style.cssText = 'padding:0 4px;border-radius:3px;white-space:pre';
    row.textContent = `${h ? 'held' : '    '} ${d ? 'down' : '    '} ${u ? 'up' : '  '}  ${stage.preview ? '' : text}`;
    table.append(row);
    return row;
  });
  const cube = solid(root, PrimitiveMesh.createCuboid(engine, 1.4, 1.4, 1.4), phong(engine, PALETTE.amber), [1.6, 0, 0]);
  let wasHeld = false;
  let y = 0;
  let vy = 0;
  tick(root, (dt, t) => {
    let held: boolean;
    let down: boolean;
    let up: boolean;
    if (stage.preview) {
      // Space held for 0.7 s every 2.4 s, with one quick tap in the middle.
      const k = t % 2.4;
      held = (k > 0.4 && k < 1.1) || (k > 1.7 && k < 1.78);
      down = held && !wasHeld;
      up = !held && wasHeld;
      wasHeld = held;
    } else {
      const { inputManager } = engine;
      held = inputManager.isKeyHeldDown(Keys.Space);
      down = inputManager.isKeyDown(Keys.Space);
      up = inputManager.isKeyUp(Keys.Space);
    }
    ROWS.forEach(([h, d, u], i) => {
      const match = h === held && d === down && u === up;
      rows[i]!.style.background = match ? 'rgba(80,150,255,.8)' : 'transparent';
    });
    if (down) vy = 5;
    vy -= 14 * dt;
    y = Math.max(0, y + vy * dt);
    if (y === 0) vy = 0;
    cube.transform.setPosition(1.6, y, 0);
    cube.transform.rotate(0, held ? 4 : 0.5, 0);
  });
  return stage.dispose;
};

export default mount;
