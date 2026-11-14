// Image fit modes: stretch, contain and cover for a 2:1 texture
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, COL, createUi, imageTexture } from '../../shared/ui.ts';

function drawLandscape(g: CanvasRenderingContext2D): void {
  const sky = g.createLinearGradient(0, 0, 0, 128);
  sky.addColorStop(0, '#2a3a7a');
  sky.addColorStop(1, '#f2a65a');
  g.fillStyle = sky;
  g.fillRect(0, 0, 256, 128);
  g.fillStyle = '#ffe28a';
  g.beginPath();
  g.arc(128, 78, 26, 0, Math.PI * 2);
  g.fill();
  g.fillStyle = '#1d2a3f';
  g.beginPath();
  g.moveTo(0, 128);
  g.lineTo(0, 92);
  g.lineTo(60, 60);
  g.lineTo(110, 98);
  g.lineTo(170, 52);
  g.lineTo(256, 100);
  g.lineTo(256, 128);
  g.fill();
  g.strokeStyle = '#ffffff';
  g.lineWidth = 4;
  g.strokeRect(2, 2, 252, 124);
}

const MODES = [
  ['Stretch', pc.FITMODE_STRETCH, false],
  ['Contain', pc.FITMODE_CONTAIN, false],
  ['Cover', pc.FITMODE_COVER, false],
  ['Cover + mask', pc.FITMODE_COVER, true],
] as const;

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const texture = imageTexture(ui.stage.device, 256, 128, drawLandscape);

  // Each cell is a holder of the same size as its image; the last holder is a mask that crops the overflow.
  const cells = MODES.map(([label, mode, masked], i) => {
    const x = (i - 1.5) * 150;
    const holder = masked
      ? addElement(ui.screen, label, { width: 130, height: 130, mask: true }, [x, 10])
      : addGroup(ui.screen, label, { width: 130, height: 130 }, [x, 10]);
    addElement(holder, 'backdrop', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.panel) });
    addElement(holder, 'image', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], texture, fitMode: mode });
    addText(ui, ui.screen, label, { fontSize: 20, color: color(COL.dim) }, [x, -75]);
    return holder;
  });

  // The holders change shape, so the texture's own 2:1 shape is kept or lost in each mode.
  const state = { w: 130, h: 130, auto: true };
  const apply = (): void => {
    for (const holder of cells) {
      holder.element!.width = state.w;
      holder.element!.height = state.h;
    }
  };
  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (state.auto) {
      t += dt;
      state.w = 100 + 40 * Math.sin(t * 0.9);
      state.h = 100 - 40 * Math.sin(t * 0.9);
    }
    apply();
  });

  if (!ctx.preview) {
    const panel = createPanel(el);
    panel.slider('width', 50, 140, 1, 130, (v) => ((state.auto = false), (state.w = v)));
    panel.slider('height', 50, 140, 1, 130, (v) => ((state.auto = false), (state.h = v)));
    panel.button('Animate', () => (state.auto = true));
    panel.readout(`fitMode: ${MODES.map((m) => m[1]).join(', ')}`);
  }

  return () => {
    texture.destroy();
    ui.dispose();
  };
};

export default mount;
