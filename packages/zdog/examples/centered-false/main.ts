// Centered false: app icons laid out on a grid from the top-left corner
import Zdog from 'zdog';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { checkbox, readout } from '../../shared/controls.ts';

const TAU = Zdog.TAU;
type Glyph = (addTo: Zdog.Anchor, s: number) => void;

const dot = (addTo: Zdog.Anchor, x: number, y: number, stroke: number, color = '#fff'): Zdog.Shape =>
  new Zdog.Shape({ addTo, translate: { x, y, z: 6 }, stroke, color });
const line = (addTo: Zdog.Anchor, path: { x: number; y: number }[], stroke: number): Zdog.Shape =>
  new Zdog.Shape({ addTo, path, closed: false, translate: { z: 6 }, stroke, color: '#fff' });

// each glyph is drawn in a tile of size s, centred on the tile's anchor
const GLYPHS: [string, Glyph][] = [
  ['#E62', (a, s) => { // sun
    dot(a, 0, 0, s * 0.22, '#ED0');
    for (let i = 0; i < 8; i++) {
      const v = new Zdog.Vector({ y: -s * 0.27 }).rotate({ z: (i * TAU) / 8 });
      dot(a, v.x, v.y, s * 0.06, '#ED0');
    }
  }],
  ['#2b6cb0', (a, s) => { // clock
    new Zdog.Ellipse({ addTo: a, diameter: s * 0.5, translate: { z: 6 }, stroke: 4, color: '#fff' });
    line(a, [{ x: 0, y: 0 }, { x: 0, y: -s * 0.17 }], 4);
    line(a, [{ x: 0, y: 0 }, { x: s * 0.12, y: s * 0.05 }], 4);
  }],
  ['#C25', (a, s) => { // camera
    new Zdog.RoundedRect({ addTo: a, width: s * 0.5, height: s * 0.36, cornerRadius: 6, translate: { z: 6 }, stroke: 4, color: '#fff' });
    new Zdog.Ellipse({ addTo: a, diameter: s * 0.2, translate: { z: 6 }, stroke: 4, color: '#fff' });
  }],
  ['#2a8a4a', (a, s) => { // music note
    line(a, [{ x: s * 0.08, y: s * 0.14 }, { x: s * 0.08, y: -s * 0.2 }, { x: s * 0.22, y: -s * 0.14 }], 5);
    dot(a, -s * 0.02, s * 0.15, s * 0.16);
  }],
  ['#a35ac9', (a, s) => { // mail
    new Zdog.Rect({ addTo: a, width: s * 0.5, height: s * 0.36, translate: { z: 6 }, stroke: 4, color: '#fff' });
    line(a, [{ x: -s * 0.25, y: -s * 0.18 }, { x: 0, y: 0 }, { x: s * 0.25, y: -s * 0.18 }], 4);
  }],
  ['#EA0', (a, s) => { // chat bubble
    new Zdog.Ellipse({ addTo: a, width: s * 0.5, height: s * 0.38, translate: { z: 6 }, stroke: 4, color: '#fff', fill: true });
    line(a, [{ x: -s * 0.1, y: s * 0.16 }, { x: -s * 0.18, y: s * 0.27 }], 5);
  }],
];

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Tick centered to move the origin to the middle: the grid slides off the top-left quadrant.' });
  // zoom stays 1 so that one unit is one pixel; the origin starts at the top-left corner
  const illo = new Zdog.Illustration({ element: stage.element, zoom: 1, centered: false });

  const cols = 3;
  const rows = Math.ceil(GLYPHS.length / cols);
  const cell = Math.min(stage.width / cols, stage.height / rows);
  const left = (stage.width - cell * cols) / 2;
  const top = (stage.height - cell * rows) / 2;
  const tiles = GLYPHS.map(([color, glyph], i) => {
    const tile = new Zdog.Anchor({
      addTo: illo,
      translate: { x: left + (i % cols) * cell + cell / 2, y: top + Math.floor(i / cols) * cell + cell / 2 },
    });
    const s = cell * 0.78;
    new Zdog.RoundedRect({ addTo: tile, width: s, height: s, cornerRadius: s * 0.22, stroke: 6, fill: true, color });
    glyph(tile, s);
    return tile;
  });
  // a gold marker on the origin
  new Zdog.Shape({ addTo: illo, stroke: 14, color: '#ED0' });

  const note = stage.bar ? readout(stage.bar) : null;
  const setCentered = (v: boolean): void => {
    illo.centered = v;
    if (note) note.textContent = v ? 'centered: true, (0, 0) is the middle' : 'centered: false, (0, 0) is the top-left corner';
  };
  setCentered(false);
  if (stage.bar) checkbox(stage.bar, 'centered', false, setCentered);
  else stage.every(2400, () => setCentered(!illo.centered));

  stage.loop((_, t) => {
    tiles.forEach((tile, i) => {
      tile.rotate.y = Math.sin(t * 1.4 + i * 0.7) * 0.5;
      tile.rotate.x = Math.cos(t * 1.1 + i) * 0.25;
    });
    illo.updateRenderGraph();
  });
  return stage.dispose;
};

export default mount;
