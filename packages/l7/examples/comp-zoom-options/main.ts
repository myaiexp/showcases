// Zoom options: zoomInText, zoomOutText, the two titles and showZoom
import { Scene, Zoom } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addControl, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { select, toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const SETS = {
  default: { zoomInText: undefined, zoomOutText: undefined, zoomInTitle: undefined, zoomOutTitle: undefined },
  words: { zoomInText: 'Closer', zoomOutText: 'Farther', zoomInTitle: 'Zoom the map in', zoomOutTitle: 'Zoom the map out' },
  symbols: { zoomInText: '＋', zoomOutText: '－', zoomInTitle: 'In', zoomOutTitle: 'Out' },
} as const;
type SetName = keyof typeof SETS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const zoom = addControl(stage, scene, new Zoom({ position: 'topright', showZoom: true }));
  const out = stage.readout();
  const apply = (name: SetName, showZoom: boolean): void => {
    // An undefined value in setOptions falls back to that option's default.
    zoom.setOptions({ ...SETS[name], showZoom });
    if (out) out.textContent = `${name}: ${JSON.stringify(SETS[name])}, showZoom: ${showZoom}`;
  };
  let name: SetName = 'words';
  let showZoom = true;
  apply(name, showZoom);
  if (stage.bar) {
    select(stage.bar, 'texts and titles', Object.keys(SETS) as SetName[], name, (v) => apply((name = v), showZoom));
    toggle(stage.bar, 'showZoom', showZoom, (v) => apply(name, (showZoom = v)));
  } else {
    const names = Object.keys(SETS) as SetName[];
    stage.every(1400, (i) => apply(names[i % names.length] ?? 'default', i % 4 < 3));
  }

  return () => stage.dispose();
};

export default mount;
