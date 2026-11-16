// FabricImage from an SVG data URL is a raster picture; parsed objects stay vector
import { Canvas, FabricImage, loadSVGFromString, util, type FabricObject } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus } from '../../shared/code-panel.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

// Thin lines and small shapes: blur shows up fast when the picture is enlarged.
const SVG = `<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="44" fill="#fff7d6" stroke="#2b2a33" stroke-width="1"/>
  <path d="M50 8 V92 M8 50 H92 M20 20 L80 80 M80 20 L20 80" stroke="#3b7dd8" stroke-width="0.6" fill="none"/>
  <circle cx="50" cy="50" r="20" fill="none" stroke="#e94b3c" stroke-width="1.2"/>
  <rect x="42" y="42" width="16" height="16" fill="#2e9e5b"/>
</svg>`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['raster image', 'vector objects'],
    scene: [100, 100],
    hint: 'Both come from the same SVG text. Zoom in: the image is the browser\'s pixels scaled up, the parsed objects are redrawn sharp at every size.',
  });
  const [a, b] = stage.panes as [typeof stage.panes[0], typeof stage.panes[0]];
  const left = stage.own(new Canvas(a.el, { selection: false, skipTargetFind: true }), a);
  const right = stage.own(new Canvas(b.el, { selection: false, skipTargetFind: true }), b);
  const say = briefStatus(stage);

  const url = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(SVG)}`;
  const image = await FabricImage.fromURL(url, {}, { left: 50, top: 50 });
  const { objects, options } = await loadSVGFromString(SVG);
  if (stage.disposed) return stage.dispose;
  const vector = util.groupSVGElements(objects.filter((o): o is FabricObject => o !== null), options);
  vector.set({ left: 50, top: 50 });
  left.add(image);
  right.add(vector);

  const zoom = (z: number): void => {
    image.scale(z);
    vector.scale(z);
    left.requestRenderAll();
    right.requestRenderAll();
    say(`scale ${z.toFixed(1)}`);
  };
  zoom(1);
  if (stage.bar) slider(stage.bar, 'scale', 1, 8, 0.1, 1, zoom, (v) => v.toFixed(1));
  else stage.loop((_dt, t) => zoom(1 + (1 - Math.cos(t * 0.8)) * 2));

  return stage.dispose;
};

export default mount;
