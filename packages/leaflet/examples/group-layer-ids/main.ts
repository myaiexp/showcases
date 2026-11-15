// Every layer in a group has an internal id: getLayerId, getLayer, hasLayer and removeLayer take it
import { LayerGroup, LeafletMap, type Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, cityMarkers, DENVER } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Ids come from Leaflet\'s counter: unique per layer, not per group. Remove one by its number.' });
  const pre = stage.side('group.getLayerId(layer)');
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 10, zoomControl: !stage.preview }));
  baseTiles('light').addTo(map);

  const markers = cityMarkers();
  const group = new LayerGroup(markers).addTo(map);
  const ids = markers.map((m) => group.getLayerId(m));

  const show = (what: string): void => {
    const rows = ids.map((id) => {
      const m = group.getLayer(id) as Marker | undefined;
      return `${String(id).padStart(4)}  ${(m?.options.title ?? '(gone)').padEnd(10)} hasLayer(${id}): ${group.hasLayer(id)}`;
    });
    if (pre) pre.textContent = `${what}\n\n${rows.join('\n')}`;
    else stage.say(`${what} | ids ${ids.filter((id) => group.hasLayer(id)).join(', ') || 'none'} remain`);
  };
  let next = 0;
  const removeNext = (): void => {
    const id = ids[next++];
    if (id === undefined) return;
    group.removeLayer(id);
    show(`removeLayer(${id}): by id, not by layer`);
  };
  stage.button('Remove the next layer by id', removeNext);
  stage.button('Put them all back', () => {
    for (const m of markers) group.addLayer(m);
    next = 0;
    show('addLayer(each marker): same ids as before');
  });
  show('getLayerId(marker) for each marker');

  if (stage.preview) {
    stage.cycle(
      [
        { run: removeNext },
        { run: removeNext },
        {
          run: () => {
            for (const m of markers) group.addLayer(m);
            next = 0;
            show('addLayer(each marker): same ids as before');
          },
        },
      ],
      1800,
    );
  }
  return () => stage.dispose();
};

export default mount;
