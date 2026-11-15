// Marker popup methods: setPopup, openPopup, closePopup, togglePopup and getPopup
import { Marker, Popup, Scene } from '@antv/l7';
import { Map } from '@antv/l7-maps';
import type { Mount } from '@/types.ts';
import { addMarker, badge, EUROPE_CENTER, europeZoom } from '../../shared/comp-demo.ts';
import { button } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
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

  // As in the docs: a Popup attached with setPopup; clicking the marker toggles it.
  const popup = new Popup({ anchor: 'left', closeOnClick: false, closeButton: false }).setText('Berlin, 3.8 million');
  const marker = addMarker(stage, scene, new Marker({ element: badge('Berlin', '#ffd166') }).setLnglat({ lng: 13.4, lat: 52.52 }).setPopup(popup));
  const out = stage.readout();
  const say = (call: string): void => {
    if (out) out.textContent = `${call}\ngetPopup() is the same popup: ${marker.getPopup() === popup}, isOpen(): ${popup.isOpen()}`;
  };
  say('setPopup(popup): click the marker to toggle it');
  const act = (label: string, fn: () => void): void => {
    fn();
    say(label);
  };
  if (stage.bar) {
    button(stage.bar, 'openPopup()', () => act('openPopup()', () => marker.openPopup()));
    button(stage.bar, 'closePopup()', () => act('closePopup()', () => marker.closePopup()));
    button(stage.bar, 'togglePopup()', () => act('togglePopup()', () => marker.togglePopup()));
  } else stage.every(1100, () => marker.togglePopup());

  return () => stage.dispose();
};

export default mount;
