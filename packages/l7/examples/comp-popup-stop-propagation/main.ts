// Popup stopPropagation: whether pointer events on the bubble also reach the map
import { Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addPopup, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { toggle } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { valuePanel } from '../../shared/scene-board.ts';
import { worldLayers } from '../../shared/world.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const scene = new Scene({
    id: stage.container,
    logoVisible: false,
    map: new Map({ center: EUROPE_CENTER, zoom: europeZoom(ctx.preview) }),
  });
  await stage.ready(scene);
  for (const l of worldLayers()) scene.addLayer(l);

  const popup = addPopup(
    stage,
    scene,
    new Popup({ lngLat: { lng: 10, lat: ctx.preview ? 45 : 50 }, title: 'Click me', html: 'Do I reach the map?', closeButton: false, closeOnClick: false, stopPropagation: true, maxWidth: ctx.preview ? '140px' : '180px' }),
  );
  const show = valuePanel(stage.container, 'bl');
  let clicks = 0;
  let stop = true;
  const paint = (): void => show({ stopPropagation: String(stop), 'map clicks': String(clicks) });
  paint();
  // The map's click event, counted: a click on the bubble bubbles up to it only when stopPropagation is false.
  const onClick = (): void => {
    clicks += 1;
    paint();
  };
  scene.on('click', onClick);
  stage.own(() => scene.off('click', onClick));
  const apply = (v: boolean): void => {
    stop = v;
    popup.setOptions({ stopPropagation: v });
    paint();
  };
  if (stage.bar) toggle(stage.bar, 'stopPropagation', true, apply);
  else {
    // Cards: click the bubble itself, as a user would, and flip the option each lap.
    stage.ghost(scene); // installed for its guard against clicks bubbling into the card link
    stage.every(900, (i) => {
      if (i % 8 === 0) apply(!stop);
      stage.container.querySelector('.l7-popup-content')?.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
  }

  return () => stage.dispose();
};

export default mount;
