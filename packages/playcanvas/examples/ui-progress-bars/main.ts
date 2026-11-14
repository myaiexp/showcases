// Progress bars: a fill anchored to a value, and a cropped textured fill
import * as pc from 'playcanvas';
import type { Mount } from '@/types.ts';
import { createPanel } from '../../shared/panel.ts';
import { addElement, addGroup, addText, color, COL, createUi, imageTexture } from '../../shared/ui.ts';

const TRACK = 392; // the track's width: 400 minus a border of 4 on each side

const mount: Mount = async (el, ctx) => {
  const ui = await createUi(el, ctx);
  const stripes = imageTexture(ui.stage.device, 64, 32, (g) => {
    g.fillStyle = '#4cc38a';
    g.fillRect(0, 0, 64, 32);
    g.fillStyle = '#2f9a68';
    for (let x = -32; x < 64; x += 32) {
      g.beginPath();
      g.moveTo(x, 32);
      g.lineTo(x + 16, 0);
      g.lineTo(x + 32, 0);
      g.lineTo(x + 16, 32);
      g.fill();
    }
  });

  // bar > track (a group inset by 4) > fill. The fill's right anchor is the value.
  const bar = (name: string, y: number): pc.Entity => {
    addText(ui, ui.screen, name, { fontSize: 20, color: color(COL.dim), anchor: [0.5, 0.5, 0.5, 0.5] }, [0, y + 32]);
    const b = addElement(ui.screen, `${name} bar`, { width: 400, height: 30, color: color(COL.panel) }, [0, y]);
    return addGroup(b, 'track', { anchor: [0, 0, 1, 1], margin: [4, 4, 4, 4] });
  };

  // 1. The anchor squashes whatever the fill shows.
  const track1 = bar('anchor: the fill squashes', 85);
  const fill1 = addElement(track1, 'fill', { anchor: [0, 0, 0.7, 1], margin: [0, 0, 0, 0], texture: stripes });

  // 2. Cropping: anchor to the left edge, then set width and rect together.
  const track2 = bar('width + rect: the fill is cropped', 0);
  const fill2 = addElement(track2, 'fill', { anchor: [0, 0.5, 0, 0.5], pivot: [0, 0.5], width: TRACK, height: 22, texture: stripes });

  // 3. A plain colour fill that turns from green to red as it empties.
  const track3 = bar('colour from the value', -85);
  const fill3 = addElement(track3, 'fill', { anchor: [0, 0, 1, 1], margin: [0, 0, 0, 0], color: color(COL.green) });

  const set = (value: number): void => {
    fill1.element!.anchor = new pc.Vec4(0, 0, value, 1);
    fill2.element!.width = value * TRACK;
    fill2.element!.rect = new pc.Vec4(0, 0, value, 1);
    fill3.element!.anchor = new pc.Vec4(0, 0, value, 1);
    fill3.element!.color = new pc.Color(1 - value * 0.7, 0.3 + value * 0.5, 0.25);
  };
  set(0.7);

  let auto = true;
  let t = 0;
  ui.app.on('update', (dt: number) => {
    if (!auto) return;
    t += dt;
    set(0.5 + 0.5 * Math.sin(t * 0.8));
  });

  if (!ctx.preview) {
    createPanel(el).slider('value', 0, 1, 0.01, 0.7, (v) => ((auto = false), set(v)));
  }

  return () => {
    stripes.destroy();
    ui.dispose();
  };
};

export default mount;
