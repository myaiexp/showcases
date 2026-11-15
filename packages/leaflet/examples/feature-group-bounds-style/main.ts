// FeatureGroup.getBounds feeds fitBounds; setStyle restyles every path in the group at once
import { Circle, FeatureGroup, LayerGroup, LeafletMap, Marker, Polygon, Polyline, Rectangle } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { baseTiles, DENVER } from '../../shared/group-demo.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The outline is group.getBounds(): it follows what the group holds, nested group included.' });
  const map = stage.own(new LeafletMap(stage.box, { center: DENVER, zoom: 9, zoomControl: !stage.preview }));
  baseTiles('light').addTo(map);

  const nested = new LayerGroup([new Marker([39.95, -105.1])]);
  const group = new FeatureGroup([
    new Marker([39.61, -105.02]),
    new Polyline([[39.74, -104.99], [39.73, -104.8]], { weight: 6 }),
    new Polygon([[39.8, -105.3], [39.8, -105.15], [39.7, -105.2]]),
    new Circle([39.68, -105.0], { radius: 3000 }),
    nested,
  ]).addTo(map);
  group.setStyle({ color: '#2563eb' });
  const outline = new Rectangle(group.getBounds(), { color: '#f59e0b', weight: 1, fill: false, dashArray: '4', interactive: false }).addTo(map);

  const far = new Circle([39.2, -104.2], { radius: 5000 });
  const refresh = (what: string): void => {
    outline.setBounds(group.getBounds());
    stage.say(what);
  };
  stage.button('Fit the group', () => map.fitBounds(group.getBounds(), { padding: [20, 20] }));
  stage.button('setStyle red', () => (group.setStyle({ color: '#e11d48', weight: 4 }), stage.say('group.setStyle({color: red, weight: 4})')));
  stage.button('setStyle blue', () => (group.setStyle({ color: '#2563eb', weight: 3 }), stage.say('group.setStyle({color: blue, weight: 3})')));
  stage.button('Add a far circle', () => (group.addLayer(far), refresh('addLayer(far circle): the bounds grow')));
  stage.button('Remove it', () => (group.removeLayer(far), refresh('removeLayer(far circle): the bounds shrink back')));

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'fitBounds(group.getBounds())', run: () => map.fitBounds(group.getBounds(), { padding: [10, 10] }) },
        { say: 'group.setStyle({color: red, weight: 4})', run: () => group.setStyle({ color: '#e11d48', weight: 4 }) },
        { run: () => (group.addLayer(far), refresh('addLayer(far circle): the bounds grow')) },
        { run: () => map.fitBounds(group.getBounds(), { padding: [10, 10] }) },
        { run: () => (group.removeLayer(far), group.setStyle({ color: '#2563eb', weight: 3 }), refresh('removeLayer + setStyle(blue): back to start')) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
