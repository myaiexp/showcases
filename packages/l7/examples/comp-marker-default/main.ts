// Marker default pin and its color option, one pin per place
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addMarker, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { select } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

const COLORS = { blue: '#3f7fd5', red: '#ff6b6b', gold: '#ffd166', teal: '#4ecdc4' } as const;
type ColorName = keyof typeof COLORS;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  let markers: Marker[] = [];
  const paint = (name: ColorName): void => {
    for (const m of markers) m.remove();
    // color is read when the marker is built: it paints the default pin.
    markers = PLACES.map((p) => addMarker(stage, scene, new Marker({ color: COLORS[name] }).setLnglat({ lng: p.lng, lat: p.lat })));
    const out = stage.readout();
    if (out) out.textContent = `new Marker({ color: '${COLORS[name]}' }): the default pin, ${name}`;
  };
  const names = Object.keys(COLORS) as ColorName[];
  paint('blue');
  if (stage.bar) select(stage.bar, 'color', names, 'blue', paint);
  else stage.every(1200, (i) => paint(names[i % names.length] ?? 'blue'));

  return () => stage.dispose();
};

export default mount;
