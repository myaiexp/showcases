// setFeatureState / removeFeatureState driving a feature-state hover highlight
import { Map } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer, readout } from '../../shared/setup.ts';
import { countries, palette, worldStyle } from '../../shared/basemap.ts';

const featured = ['Brazil', 'Russia', 'Australia', 'Canada', 'India', 'China', 'Egypt', 'Argentina', 'Kenya']
  .map((n) => countries.features.find((f) => f.properties?.name === n))
  .filter((f) => f?.id !== undefined);

const mount: Mount = (el, { preview }) => {
  const style = worldStyle();
  // The fill colour reads the "hover" key of each feature's state.
  const fill = style.layers.find((l) => l.id === 'countries-fill');
  if (fill && fill.type === 'fill') {
    fill.paint = {
      'fill-color': ['case', ['boolean', ['feature-state', 'hover'], false], palette.accent, palette.land],
    };
  }

  const map = new Map({
    container: mapContainer(el, preview),
    style,
    center: [15, 25],
    zoom: preview ? 0.9 : 1.4,
    interactive: !preview,
  });
  const info = preview ? null : readout(el, 'Hover a country.');

  let hovered: number | string | null = null;
  const setHover = (id: number | string | null): void => {
    if (hovered !== null) map.removeFeatureState({ source: 'countries', id: hovered }, 'hover');
    hovered = id;
    if (id !== null) map.setFeatureState({ source: 'countries', id }, { hover: true });
  };

  let timer = 0;
  if (preview) {
    let i = 0;
    map.once('load', () => {
      const next = (): void => setHover(featured[i++ % featured.length]!.id!);
      next();
      timer = window.setInterval(next, 1100);
    });
  } else {
    map.on('mousemove', 'countries-fill', (e) => {
      const f = e.features?.[0];
      if (!f || f.id === undefined) return;
      if (f.id !== hovered) setHover(f.id);
      if (info) info.textContent = `${String(f.properties.name)}: feature id ${String(f.id)}, state ${JSON.stringify(map.getFeatureState({ source: 'countries', id: f.id }))}`;
    });
    map.on('mouseleave', 'countries-fill', () => {
      setHover(null);
      if (info) info.textContent = 'Hover a country.';
    });
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
