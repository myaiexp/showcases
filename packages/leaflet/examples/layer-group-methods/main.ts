// LayerGroup's addLayer, removeLayer, hasLayer, getLayers, eachLayer and clearLayers
import { LayerGroup, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The group is on the map the whole time; each button calls one of its methods.' });
  const pre = stage.side('group.getLayers()');
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, zoomControl: !stage.preview }));
  baseTiles('light').addTo(map);

  const markers = cityMarkers();
  const byName = (n: string): Marker => markers.find((m) => m.options.title === n) as Marker;
  const group = new LayerGroup([byName('Littleton'), byName('Denver')]).addTo(map);

  const show = (what: string): void => {
    const names = group.getLayers().map((m) => (m as Marker).options.title);
    if (pre) pre.textContent = `${what}\n\nlayers (${names.length}): ${names.join(', ') || 'none'}`;
    else stage.say(`${what} | ${names.length} layer${names.length === 1 ? '' : 's'}: ${names.join(', ') || 'none'}`);
  };
  const steps: { label: string; run: () => void }[] = [
    { label: 'addLayer(Aurora)', run: () => void group.addLayer(byName('Aurora')) },
    { label: 'addLayer(Golden)', run: () => void group.addLayer(byName('Golden')) },
    { label: 'removeLayer(Denver)', run: () => void group.removeLayer(byName('Denver')) },
    { label: 'eachLayer: open tooltip', run: () => void group.eachLayer((m) => (m as Marker).bindTooltip((m as Marker).options.title ?? '', { permanent: true })) },
    { label: 'clearLayers()', run: () => void group.clearLayers() },
  ];
  for (const s of steps) {
    stage.button(s.label, () => {
      s.run();
      show(s.label);
    });
  }
  stage.button('hasLayer(Denver)?', () => show(`hasLayer(Denver) is ${group.hasLayer(byName('Denver'))}`));
  show('start: Littleton and Denver');

  if (stage.preview) {
    stage.cycle(
      [
        ...steps.map((s) => ({ run: () => (s.run(), show(s.label)) })),
        { run: () => (group.addLayer(byName('Denver')).addLayer(byName('Littleton')), show('addLayer(Denver), addLayer(Littleton)')) },
        { run: () => (group.clearLayers(), show('clearLayers()')), hold: 600 },
        {
          run: () => {
            for (const m of markers) m.unbindTooltip();
            group.addLayer(byName('Littleton')).addLayer(byName('Denver'));
            show('start again');
          },
        },
      ],
      1700,
    );
  }
  return () => stage.dispose();
};

export default mount;
