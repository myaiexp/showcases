// map.addControl, map.removeControl and control.remove: a control can leave and come back
import { LeafletMap, ScaleControl, ZoomControl } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'getContainer() is the control\'s element while it is on a map. After remove() it is detached; addTo() builds it again.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: 4, zoomControl: false }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const zoom = new ZoomControl();
  const scale = new ScaleControl({ position: 'bottomleft' });
  stage.onDispose(() => { zoom.remove(); scale.remove(); });

  const state = (note: string): void => {
    const attached = (c: ZoomControl | ScaleControl): string => (c.getContainer()?.isConnected ? 'on the map' : 'detached');
    stage.say(`${note}. zoom: ${attached(zoom)}, scale: ${attached(scale)}`);
  };
  zoom.addTo(map);
  state('zoom.addTo(map)');

  const ACTIONS: [string, () => void][] = [
    ['scale.addTo(map)', () => scale.addTo(map)],
    ['map.removeControl(zoom)', () => map.removeControl(zoom)],
    ['map.addControl(zoom)', () => map.addControl(zoom)],
    ['scale.remove()', () => scale.remove()],
    ['zoom.remove()', () => zoom.remove()],
    ['zoom.addTo(map)', () => zoom.addTo(map)],
  ];
  for (const [label, run] of ACTIONS) stage.button(label, () => { run(); state(label); });

  if (stage.preview) stage.cycle(ACTIONS.map(([label, run]) => ({ run: () => { run(); state(label); } })), 1500);
  return () => stage.dispose();
};

export default mount;
