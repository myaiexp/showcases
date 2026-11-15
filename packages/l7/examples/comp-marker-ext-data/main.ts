// Marker extData: attach your own data with the option or setExtData, read it with getExtData
import { Marker, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addMarker, badge, EUROPE_CENTER, europeZoom, PLACES } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { worldLayers } from '../../shared/world.ts';

interface Ext {
  name: string;
  visits: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  // Each marker carries its row as extData; the label shows it.
  const label = (m: Marker): void => {
    const d = m.getExtData() as Ext;
    m.getElement().textContent = `${d.name}: ${d.visits}`;
  };
  const markers = PLACES.slice(2, 8).map((p) => {
    const m = addMarker(stage, scene, new Marker({ element: badge('', '#ffd166'), extData: { name: p.name, visits: 0 } satisfies Ext }).setLnglat({ lng: p.lng, lat: p.lat }));
    label(m);
    return m;
  });
  const bump = (m: Marker): void => {
    const d = m.getExtData() as Ext;
    // setExtData replaces the whole object.
    m.setExtData({ ...d, visits: d.visits + 1 });
    label(m);
  };
  const out = stage.readout();
  for (const m of markers) {
    m.getElement().addEventListener('click', () => {
      bump(m);
      if (out) out.textContent = `getExtData(): ${JSON.stringify(m.getExtData())}`;
    });
  }
  if (out) out.textContent = 'Click a label: its extData.visits goes up through setExtData(), and getExtData() reads it back.';
  if (stage.bar) button(stage.bar, 'setExtData on every marker', () => markers.forEach(bump));
  else stage.every(450, (i) => bump(markers[i % markers.length] as Marker));

  return () => stage.dispose();
};

export default mount;
