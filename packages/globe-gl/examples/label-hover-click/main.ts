// Labels: labelLabel tooltip, onLabelHover highlight, onLabelClick, right click
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { readout } from '../../shared/controls.ts';
import { city } from '../../shared/places.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

interface Label {
  lat: number;
  lng: number;
  text: string;
  pop: number;
}

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Hover a label for its tooltip, click to fly there, right-click to drop it.' });
  const dark = await texture('dark');
  const S = stage.preview ? 2.4 : 1.5;
  const log = stage.bar && readout(stage.bar, 'Hover, click or right-click a label');

  let places: Label[] = ['London', 'Madrid', 'Berlin', 'Istanbul', 'Moscow', 'Helsinki', 'Cairo', 'Riyadh', 'Tehran'].map((n) => {
    const c = city(n);
    return { lat: c.lat, lng: c.lng, text: c.name, pop: c.pop };
  });
  let hovered: Label | null = null;

  const globe = stage.own(new Globe(stage.container))
    .globeImageUrl(dark)
    .labelsData(places)
    // Plain text, HTML string or an element all work for the tooltip.
    .labelLabel((d) => `<b>${(d as Label).text}</b><br>${(d as Label).pop} million people`)
    .labelSize((d) => ((d as Label) === hovered ? S * 1.5 : S))
    .labelColor((d) => ((d as Label) === hovered ? '#ff5d73' : '#e8e8e8'))
    .labelDotRadius(S / 4)
    .labelsTransitionDuration(250)
    .onLabelHover((label) => {
      hovered = label as Label | null;
      // Accessors are read again only when set, so set them again to repaint.
      globe.labelSize(globe.labelSize()).labelColor(globe.labelColor());
      if (log && hovered) log.textContent = `Hovering ${hovered.text}`;
    })
    .onLabelClick((label, _event, { lat, lng, altitude }) => {
      const l = label as Label;
      globe.pointOfView({ lat: l.lat, lng: l.lng, altitude: 0.5 }, 900);
      if (log) log.textContent = `Clicked ${l.text} at ${lat.toFixed(1)}, ${lng.toFixed(1)}, altitude ${altitude.toFixed(2)}`;
    })
    .onLabelRightClick((label) => {
      const l = label as Label;
      places = places.filter((p) => p !== l);
      hovered = null;
      globe.labelsData(places);
      if (log) log.textContent = `Removed ${l.text} (${places.length} labels left)`;
    });
  globe.pointOfView({ lat: 38, lng: 22, altitude: 1 });

  // Cards have no pointer: a fake one visits a label every two seconds.
  if (stage.preview) {
    const ghost = stage.ghost(globe);
    let i = 0;
    stage.every(1800, () => {
      const p = places[i++ % places.length]!;
      // The text sits below its dot: aim at the middle of the text.
      ghost.at(p.lat - S * 1.25, p.lng, 0.002);
    });
    stage.every(5400, () => ghost.leave());
  }

  return stage.dispose;
};

export default mount;
