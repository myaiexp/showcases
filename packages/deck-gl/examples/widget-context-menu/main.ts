// ContextMenuWidget: a right-click menu whose items depend on the object under it
import { Deck } from '@deck.gl/core';
import type { MapViewState, PickingInfo } from '@deck.gl/core';
import { ScatterplotLayer } from '@deck.gl/layers';
import { ContextMenuWidget } from '@deck.gl/widgets';
import '@deck.gl/widgets/stylesheet.css';
import type { Mount } from '@/types.ts';
import { CITIES, type City } from '../../shared/data.ts';
import { readout } from '../../shared/controls.ts';
import { animate, createStage } from '../../shared/stage.ts';
import { ICONS } from '../../shared/widgets-scene.ts';
import { landLayer } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const view: MapViewState = { longitude: 10, latitude: 35, zoom: ctx.preview ? 1.4 : 2.4 };
  const log = ctx.preview ? null : readout(el, 'Right-click a city, or the empty map, for different menus.');
  const marked = new Set<string>();

  const layers = () => [
    landLayer(),
    new ScatterplotLayer<City>({
      id: 'cities',
      data: CITIES,
      pickable: true,
      getPosition: (d) => d.coordinates,
      getRadius: (d) => Math.sqrt(d.population) * 40_000,
      getFillColor: (d) => (marked.has(d.name) ? [120, 220, 255] : [255, 140, 60]),
      updateTriggers: { getFillColor: [...marked].join() },
      radiusMinPixels: 4,
    }),
  ];

  const deck: Deck = new Deck({
    device: stage.device,
    initialViewState: view,
    controller: !ctx.preview,
    layers: layers(),
    widgets: [
      new ContextMenuWidget({
        id: 'menu',
        // Called on right-click with what is under the pointer; null shows no menu at all.
        getMenuItems: (picked: PickingInfo<City>) =>
          picked.object
            ? [
                { label: picked.object.name }, // no value: a heading, not interactive
                { label: marked.has(picked.object.name) ? 'Unmark' : 'Mark', value: 'mark', icon: ICONS.pin },
                { label: 'Show population', value: 'population', icon: ICONS.layers },
                { label: 'Log to the page', value: 'log', onSelect: () => { if (log) log.textContent = `item onSelect: ${picked.object?.name}`; } },
              ]
            : [{ label: 'Nothing here', value: 'none' }],
        onMenuItemSelected: (value, picked: PickingInfo<City> | null) => {
          const name = picked?.object?.name;
          if (name && value === 'mark') {
            if (marked.has(name)) marked.delete(name);
            else marked.add(name);
            deck.setProps({ layers: layers() });
          }
          if (log) log.textContent = `onMenuItemSelected: ${value}${name ? ` for ${name}` : ''}${value === 'population' && picked?.object ? ` (${picked.object.population} million)` : ''}`;
        },
        placement: 'bottom-start',
        arrow: false,
      }),
    ],
  });

  // A card cannot right-click: send the canvas the contextmenu event a right-click makes.
  let stop = (): void => {};
  if (ctx.preview) {
    const names = ['Paris', 'Berlin', 'London']; // near the top, so the menu fits the card
    let last = -1;
    stop = animate((t) => {
      const i = Math.floor(t / 2.2) % names.length;
      if (i === last) return;
      const viewport = deck.getViewports()[0];
      const c = CITIES.find((x) => x.name === names[i]);
      if (!viewport || !c) return;
      const [x, y] = viewport.project(c.coordinates);
      const rect = stage.canvas.getBoundingClientRect();
      last = i;
      stage.canvas.dispatchEvent(new MouseEvent('contextmenu', { bubbles: true, cancelable: true, clientX: rect.left + x!, clientY: rect.top + y! }));
    });
  }
  return () => {
    stop();
    stage.release(deck);
  };
};

export default mount;
