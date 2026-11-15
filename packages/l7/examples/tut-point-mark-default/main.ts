// new Marker({ color, anchor, offsets }): the built-in pin and where it sits
import { Scene, PointLayer, Marker } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { lattice } from '../../shared/point-data.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: [10, 46], zoom: ctx.preview ? 3.6 : 4.4 }),
  });
  await stage.ready(scene);

  const spots = lattice(3, 1, 4, [10, 46]);
  const marks = new PointLayer().source(spots, { parser: { type: 'json', x: 'lng', y: 'lat' } }).shape('simple').size(5).color('#ffffff');
  scene.addLayer(marks);
  const options = [
    { color: 'blue', anchor: 'bottom' },
    { color: '#ff6b6b', anchor: 'center' },
    { color: '#4ecdc4', anchor: 'top', offsets: [0, 6] },
  ] as const;
  const markers = spots.map((s, i) => {
    // anchor is an enum in L7's types; the docs pass plain strings.
    const marker = new Marker({ ...options[i % options.length] } as ConstructorParameters<typeof Marker>[0]).setLnglat({ lng: s.lng, lat: s.lat });
    scene.addMarker(marker);
    return marker;
  });

  if (stage.bar) toggle(stage.bar, 'visible', true, (on) => markers.forEach((m) => (on ? m.show() : m.hide())));
  else stage.every(1200, (i) => markers.forEach((m) => (i % 2 ? m.hide() : m.show())));

  return () => stage.dispose();
};

export default mount;
