// Icon anchors: iconAnchor, popupAnchor and tooltipAnchor measured
import { DivIcon, Icon, LeafletMap, Marker, type PointTuple } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { images } from '../../shared/data.ts';
import './style.css';

interface Anchors {
  icon: PointTuple;
  popup: PointTuple;
  tooltip: PointTuple;
}
const TIP: Anchors = { icon: [22, 94], popup: [-3, -76], tooltip: [16, -70] };
const MIDDLE: Anchors = { icon: [19, 47], popup: [0, -47], tooltip: [25, 0] };
const CORNER: Anchors = { icon: [0, 0], popup: [30, 20], tooltip: [45, 45] };

const mount: Mount = async (el, ctx) => {
  const leaf = await images.leafGreen();
  const stage = createStage(el, ctx, {
    hint: 'The red dot is the marker position. iconAnchor says which pixel of the image sits on it; popupAnchor and tooltipAnchor are offsets from that pixel.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [51.504, -0.0825], zoom: 13, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const at: [number, number] = [51.5, -0.09];
  const a: Anchors = { icon: [...TIP.icon], popup: [...TIP.popup], tooltip: [...TIP.tooltip] };

  // The marker position, drawn as a small red DivIcon that ignores the pointer and the keyboard.
  new Marker(at, {
    icon: new DivIcon({ className: 'anchor-dot', iconSize: [8, 8] }),
    interactive: false,
    keyboard: false,
    zIndexOffset: 1000,
  }).addTo(map);

  const marker = new Marker(at, { alt: 'Leaf' }).addTo(map);
  marker.bindPopup('popupAnchor').bindTooltip('tooltipAnchor', { permanent: true, direction: 'right' });

  // Icon options are read when the icon is created, so a change means a new Icon and setIcon().
  const apply = (): void => {
    marker.setIcon(
      new Icon({
        iconUrl: leaf,
        iconSize: [38, 95],
        iconAnchor: a.icon,
        popupAnchor: a.popup,
        tooltipAnchor: a.tooltip,
      }),
    );
    marker.closePopup().openPopup();
    marker.closeTooltip().openTooltip();
  };
  apply();

  const slide = (label: string, key: keyof Anchors, axis: 0 | 1, min: number, max: number): void => {
    stage.slider(label, min, max, 1, a[key][axis], (v) => {
      a[key][axis] = v;
      apply();
    });
  };
  slide('iconAnchor x', 'icon', 0, 0, 38);
  slide('iconAnchor y', 'icon', 1, 0, 95);
  slide('popupAnchor x', 'popup', 0, -60, 60);
  slide('popupAnchor y', 'popup', 1, -120, 20);
  slide('tooltipAnchor x', 'tooltip', 0, -20, 80);
  slide('tooltipAnchor y', 'tooltip', 1, -100, 60);

  if (stage.preview) {
    const presets: [string, Anchors][] = [
      ['iconAnchor [22, 94]: the leaf tip is on the position', TIP],
      ['iconAnchor [19, 47]: the middle of the leaf', MIDDLE],
      ['iconAnchor [0, 0]: the top-left corner', CORNER],
    ];
    stage.cycle(
      presets.map(([say, p]) => ({
        say,
        run: () => {
          a.icon = [...p.icon];
          a.popup = [...p.popup];
          a.tooltip = [...p.tooltip];
          apply();
        },
      })),
      2400,
    );
  }
  return () => stage.dispose();
};

export default mount;
