// Map handlers: enable(), disable() and enabled() on map.dragging, doubleClickZoom and the rest
import { LeafletMap, type Handler } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';
import { ghost } from '../../shared/ghost.ts';
import { gestures } from '../../shared/gestures.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each map option has a handler on the map with the same name. Switch them off and the gesture stops working.' });
  const map = stage.own(new LeafletMap(stage.box, { center: [48.857, 2.352], zoom: 5, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  const handlers: [string, Handler][] = [
    ['dragging', map.dragging],
    ['doubleClickZoom', map.doubleClickZoom],
    ['scrollWheelZoom', map.scrollWheelZoom],
    ['boxZoom', map.boxZoom],
    ['keyboard', map.keyboard],
    ['tapHold', map.tapHold],
    ['pinchZoom', map.pinchZoom],
  ];
  const showState = stage.side('enabled()');
  const refresh = (): void => {
    if (showState) showState.textContent = handlers.map(([name, h]) => `${name.padEnd(16)}${h.enabled() ? 'on' : 'off'}`).join('\n');
  };
  refresh();

  for (const [name, handler] of handlers) {
    stage.toggle(name, handler.enabled(), (on) => {
      if (on) handler.enable();
      else handler.disable();
      stage.say(`map.${name}.${on ? 'enable' : 'disable'}() -> enabled() is ${handler.enabled()}`);
      refresh();
    });
  }

  if (stage.preview) {
    const g = ghost(map);
    stage.onDispose(() => g.remove());
    const gesture = gestures(stage, map, g);
    const spot: [number, number] = [50, 8];
    stage.cycle(
      [
        { say: 'doubleClickZoom.enabled(): true. Double click.', run: () => gesture.dblclick(spot), hold: 2200 },
        {
          say: 'doubleClickZoom.disable(), then double click: nothing',
          run: () => {
            map.doubleClickZoom.disable();
            gesture.dblclick(spot);
          },
          hold: 2200,
        },
        {
          say: 'doubleClickZoom.enable(), then Shift + double click zooms out',
          run: () => {
            map.doubleClickZoom.enable();
            gesture.dblclick(spot, true);
          },
          hold: 2200,
        },
        { say: 'doubleClickZoom is on again, view reset', run: () => map.setView([48.857, 2.352], 5), hold: 1200 },
      ],
      300,
    );
  }
  return () => stage.dispose();
};

export default mount;
