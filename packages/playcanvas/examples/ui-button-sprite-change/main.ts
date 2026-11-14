// Button sprite transition: one atlas with a frame for each button state
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { createAtlas, createSprite, spriteAsset, type Frame } from '../../shared/sprites.ts';
import { addButton, addText, clickSteps, color, COL, createUi, timeline } from '../../shared/ui.ts';

const STATES = ['default', 'hover', 'pressed', 'inactive'];
const FILLS = ['#f2c14e', '#ffd978', '#c99a2c', '#7a7566'];

// Four 256 x 64 frames stacked in a 256 px atlas, one per button state.
function drawStates(g: CanvasRenderingContext2D): void {
  FILLS.forEach((fill, i) => {
    const y = i * 64;
    g.fillStyle = '#3b2f10';
    g.beginPath();
    g.roundRect(2, y + 2, 252, 60, 14);
    g.fill();
    g.fillStyle = fill;
    g.beginPath();
    g.roundRect(6, y + (i === 2 ? 10 : 6), 244, i === 2 ? 48 : 48, 12);
    g.fill();
    g.fillStyle = 'rgba(255,255,255,0.25)';
    g.fillRect(14, y + (i === 2 ? 14 : 10), 228, 6);
  });
}

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const frames: Record<string, Frame> = {};
  STATES.forEach((name, i) => {
    frames[name] = { rect: new pc.Vec4(0, 192 - i * 64, 256, 64), pivot: new pc.Vec2(0.5, 0.5), border: new pc.Vec4(0, 0, 0, 0) };
  });
  const atlas = createAtlas(ui.stage.device, 256, drawStates, frames, 'button-states');
  const sprite = createSprite(ui.stage.device, atlas, STATES, { pixelsPerUnit: 1 });
  const asset = spriteAsset(ui.app, sprite, 'button-states');

  // The element shows frame 0; the button swaps to frames 1 to 3 for the other states.
  const makeButton = (y: number, active: boolean): pc.Entity =>
    addButton(ui, ui.screen, active ? 'Start game' : 'Locked', {
      width: 256,
      height: 64,
      color: new pc.Color(1, 1, 1),
      spriteAsset: asset,
      spriteFrame: 0,
      button: {
        active,
        transitionMode: pc.BUTTON_TRANSITION_MODE_SPRITE_CHANGE,
        hoverSpriteAsset: asset,
        hoverSpriteFrame: 1,
        pressedSpriteAsset: asset,
        pressedSpriteFrame: 2,
        inactiveSpriteAsset: asset,
        inactiveSpriteFrame: 3,
      },
    }, [0, y]);
  const live = makeButton(50, true);
  makeButton(-60, false);
  addText(ui, ui.screen, 'frames: default, hover, pressed, inactive', { fontSize: 20, color: color(COL.dim) }, [0, -125]);

  if (ctx.preview) timeline(ui.app, 3.2, clickSteps(live, 0.3));
  else createPanel(el).readout('Hover and press the first button; the second has active = false.');

  return () => {
    sprite.destroy();
    atlas.destroy();
    ui.dispose();
  };
};

export default mount;
