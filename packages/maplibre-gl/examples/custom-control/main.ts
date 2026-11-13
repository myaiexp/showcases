// A custom IControl: a button bar that flies to each continent
import { Map } from 'maplibre-gl';
import type { IControl, ControlPosition } from 'maplibre-gl';
import type { Mount } from '@/types.ts';
import { mapContainer } from '../../shared/setup.ts';
import { worldStyle } from '../../shared/basemap.ts';

const continents: { name: string; center: [number, number]; zoom: number }[] = [
  { name: 'Europe', center: [15, 52], zoom: 3 },
  { name: 'Africa', center: [20, 3], zoom: 2.2 },
  { name: 'Asia', center: [90, 40], zoom: 2 },
  { name: 'Americas', center: [-80, 10], zoom: 1.6 },
  { name: 'Oceania', center: [140, -25], zoom: 2.4 },
];

/** An IControl: onAdd builds the element, onRemove tears it down. */
class ContinentControl implements IControl {
  private map: Map | undefined;
  private container: HTMLDivElement | undefined;

  onAdd(map: Map): HTMLElement {
    this.map = map;
    const container = document.createElement('div');
    // maplibregl-ctrl and maplibregl-ctrl-group give the default control styling.
    container.className = 'maplibregl-ctrl maplibregl-ctrl-group';
    for (const place of continents) {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = place.name;
      btn.style.width = 'auto';
      btn.style.padding = '0 10px';
      btn.style.display = 'block';
      btn.style.color = '#333';
      btn.addEventListener('click', this.onClick);
      btn.dataset['continent'] = place.name;
      container.append(btn);
    }
    this.container = container;
    return container;
  }

  onRemove(): void {
    this.container?.remove();
    this.container = undefined;
    this.map = undefined;
  }

  getDefaultPosition(): ControlPosition {
    return 'top-left';
  }

  private onClick = (e: Event): void => {
    const name = (e.currentTarget as HTMLElement).dataset['continent'];
    const place = continents.find((c) => c.name === name);
    if (place) this.map?.flyTo({ center: place.center, zoom: place.zoom, essential: true });
  };
}

const mount: Mount = (el, { preview }) => {
  const map = new Map({
    container: mapContainer(el, preview),
    style: worldStyle(),
    center: [15, 30],
    zoom: preview ? 0.8 : 1.2,
    interactive: !preview,
  });

  // No position given, so getDefaultPosition decides.
  const control = new ContinentControl();
  map.addControl(control);

  let timer = 0;
  if (preview) {
    // Fly to each continent in turn, as clicking the control's buttons would.
    let i = 0;
    timer = window.setInterval(() => {
      const place = continents[i++ % continents.length];
      if (place) map.flyTo({ center: place.center, zoom: place.zoom - 1, duration: 1800 });
    }, 2500);
  }

  return () => {
    clearInterval(timer);
    map.remove();
  };
};

export default mount;
