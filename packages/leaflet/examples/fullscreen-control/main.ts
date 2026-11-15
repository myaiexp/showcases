// FullscreenControl: the button, enterfullscreen and exitfullscreen, and the pseudo and container options
import { FullscreenControl, LeafletMap } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

type Target = 'map' | 'scene';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Press the button at the top left, or Escape to leave. With container set to the scene, the log panel goes fullscreen with the map. pseudo fills the window with CSS instead of the Fullscreen API.', height: 380 });
  const log = stage.log('Fullscreen events');
  const map = stage.own(new LeafletMap(stage.box, { center: [60, 25], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);
  map.on('enterfullscreen', () => log('enterfullscreen'));
  map.on('exitfullscreen', () => log('exitfullscreen'));

  let control: FullscreenControl | undefined;
  stage.onDispose(() => control?.remove());
  const make = (target: Target, pseudo: boolean, text?: boolean): void => {
    control?.remove();
    control = new FullscreenControl({
      position: stage.preview ? 'topright' : 'topleft',
      pseudo,
      ...(target === 'scene' ? { container: stage.root } : {}),
      ...(text ? { enterText: 'Full', exitText: 'Back', enterTitle: 'Go big', exitTitle: 'Go back' } : {}),
    }).addTo(map);
    // The map's size changes when the target does: Leaflet picks that up through its resize observer.
    log(`new FullscreenControl(target ${target}, pseudo ${pseudo}); isFullscreen() ${String(control.isFullscreen())}`);
  };
  make('map', false);

  let target: Target = 'map';
  let pseudo = false;
  stage.select('container', [{ value: 'map', label: 'the map (default)' }, { value: 'scene', label: 'map and log panel' }], target, (v) => make((target = v), pseudo));
  stage.toggle('pseudo', false, (on) => make(target, (pseudo = on)));
  stage.button('toggle() from code', () => control?.toggle());

  if (stage.preview) {
    // A card cannot enter fullscreen: the Fullscreen API needs a user gesture and would take over the page.
    // It shows the control in its three looks and pans the map; the button stays idle.
    const looks: [boolean, string][] = [[false, 'default button'], [true, 'enterText and enterTitle set']];
    let i = 0;
    stage.every(2400, () => {
      const [text, label] = looks[i++ % looks.length] as [boolean, string];
      make('map', false, text);
      stage.say(`${label} (cards never enter fullscreen: open the example and press it)`);
    });
    stage.every(1800, () => map.panBy([i % 2 ? 40 : -40, 0]));
    stage.say('Fullscreen button, idle (cards never enter fullscreen: open the example and press it)');
  }
  return () => stage.dispose();
};

export default mount;
