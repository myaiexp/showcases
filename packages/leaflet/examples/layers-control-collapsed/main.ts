// A layers control's collapsed, collapseDelay, position and title options, plus expand() and collapse()
import { LayerGroup, LayersControl, LeafletMap, type ControlPosition } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER, parkMarkers } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover the icon to open the control. With a collapseDelay it stays open that long after the pointer leaves.' });
  const cities = new LayerGroup(cityMarkers());
  const parks = new LayerGroup(parkMarkers());
  const light = baseTiles('light');
  const terrain = baseTiles('terrain');
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [light, cities], zoomControl: false }));

  const settings = { collapsed: true, collapseDelay: 0, position: 'topright' as ControlPosition };
  let control: LayersControl | null = null;
  stage.own({ remove: () => control?.remove() });
  const build = (): void => {
    control?.remove();
    // These options are read when the control is built, so a change makes a new control.
    control = new LayersControl({ Streets: light, Terrain: terrain }, { Cities: cities, Parks: parks }, { ...settings, title: 'Pick layers' }).addTo(map);
    stage.say(`new LayersControl(…, {collapsed: ${settings.collapsed}, collapseDelay: ${settings.collapseDelay}, position: '${settings.position}'})`);
  };
  stage.toggle('collapsed', true, (on) => ((settings.collapsed = on), build()));
  stage.slider('collapseDelay (ms)', 0, 3000, 250, 0, (v) => ((settings.collapseDelay = v), build()));
  stage.select<ControlPosition>(
    'position',
    [
      { value: 'topright', label: 'topright' },
      { value: 'topleft', label: 'topleft' },
      { value: 'bottomright', label: 'bottomright' },
      { value: 'bottomleft', label: 'bottomleft' },
    ],
    'topright',
    (v) => ((settings.position = v), build()),
  );
  stage.button('expand()', () => control?.expand());
  stage.button('collapse()', () => control?.collapse());
  build();

  if (stage.preview) {
    const positions: ControlPosition[] = ['topright', 'topleft', 'bottomleft', 'bottomright'];
    let i = 0;
    stage.cycle(
      [
        { say: 'collapsed: only the icon shows', run: () => (build(), control?.collapse()), hold: 1500 },
        { say: 'control.expand()', run: () => control?.expand(), hold: 1900 },
        { say: 'control.collapse()', run: () => control?.collapse(), hold: 900 },
        { run: () => ((settings.position = positions[++i % positions.length] ?? 'topright'), build()), hold: 0 },
      ],
      100,
    );
  }
  return () => stage.dispose();
};

export default mount;
