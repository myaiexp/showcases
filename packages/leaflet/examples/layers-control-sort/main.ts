// sortLayers orders the control's entries by name; sortFunction chooses how
import { CircleMarker, LayerGroup, LayersControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, DENVER } from '../../shared/group-demo.ts';

type Mode = 'added' | 'alpha' | 'length';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Five overlays, added to the control in the order Zoo, Airport, Museum, Bridge, Park.' });
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, layers: [baseTiles('light')], zoomControl: !stage.preview }));

  const names = ['Zoo', 'Airport', 'Museum', 'Bridge', 'Park'];
  const colours = ['#e11d48', '#2563eb', '#16a34a', '#f59e0b', '#9333ea'];
  const overlays: Record<string, LayerGroup> = {};
  names.forEach((name, i) => {
    overlays[name] = new LayerGroup([new CircleMarker([39.6 + i * 0.05, -105.2 + i * 0.1], { radius: 10, color: colours[i] ?? '#fff' })]).addTo(map);
  });

  let control: LayersControl | null = null;
  stage.own({ remove: () => control?.remove() });
  const build = (mode: Mode): void => {
    control?.remove();
    control = new LayersControl(undefined, overlays, {
      collapsed: false,
      sortLayers: mode !== 'added',
      // The default sortFunction is alphabetical; this one compares name lengths instead.
      ...(mode === 'length' ? { sortFunction: (_a, _b, nameA: string, nameB: string) => nameA.length - nameB.length || nameA.localeCompare(nameB) } : {}),
    }).addTo(map);
    stage.say(
      { added: 'sortLayers: false (default): the order they were added', alpha: 'sortLayers: true: alphabetical by name', length: 'sortLayers: true, a sortFunction comparing name length' }[mode],
    );
  };
  stage.select<Mode>(
    'sorting',
    [
      { value: 'added', label: 'sortLayers: false' },
      { value: 'alpha', label: 'sortLayers: true' },
      { value: 'length', label: 'custom sortFunction' },
    ],
    'added',
    build,
  );
  build('added');

  if (stage.preview) {
    const modes: Mode[] = ['added', 'alpha', 'length'];
    let i = 0;
    stage.every(2400, () => build(modes[++i % modes.length] ?? 'added'));
  }
  return () => stage.dispose();
};

export default mount;
