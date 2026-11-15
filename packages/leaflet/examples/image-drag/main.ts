// DomUtil.disableImageDrag cancels dragstart on the whole window until enableImageDrag
import { DomUtil, LeafletMap, Marker } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Switch the toggle, then press "Send dragstart" (a real image drag, started on the marker icon, is cancelled the same way).' });
  const log = stage.log('dragstart');
  const map = stage.own(new LeafletMap(stage.box, { center: [35, 10], zoom: 3, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  const marker = new Marker([35, 10]).addTo(map);

  let disabled = false;
  const set = (on: boolean): void => {
    if (on === disabled) return;
    disabled = on;
    if (on) DomUtil.disableImageDrag();
    else DomUtil.enableImageDrag();
  };
  // Leave the page the way it was found, even if the toggle is on at the end.
  stage.onDispose(() => set(false));

  const send = (): void => {
    const icon = marker.getElement();
    if (!icon) return;
    const e = new DragEvent('dragstart', { bubbles: true, cancelable: true });
    icon.dispatchEvent(e);
    const line = `dragstart on the icon: ${e.defaultPrevented ? 'cancelled by disableImageDrag' : 'not cancelled, the browser would start dragging the image'}`;
    log(line);
    stage.say(line, e.defaultPrevented ? 'ok' : 'info');
  };
  stage.toggle('disableImageDrag()', false, set);
  stage.button('Send dragstart', send);

  if (stage.preview) {
    stage.cycle(
      [
        { run: () => (set(false), send()) },
        { run: () => (set(true), send()) },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
