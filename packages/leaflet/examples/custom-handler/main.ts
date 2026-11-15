// The tutorial's TiltHandler, driven by deviceorientation events this example sends itself
import { DomEvent, Handler, LeafletMap, Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

class TiltHandler extends Handler {
  override addHooks(): void {
    DomEvent.on(window, 'deviceorientation', this._tilt, this);
  }

  override removeHooks(): void {
    DomEvent.off(window, 'deviceorientation', this._tilt, this);
  }

  _tilt(ev: Event): void {
    const { gamma, beta } = ev as DeviceOrientationEvent;
    // A desktop browser can fire one event with null angles: Point(null) would throw.
    if (gamma == null || beta == null) return;
    // Gamma is horizontal pan (1 degree = 1 pixel), beta is vertical pan.
    this._map.panBy(new Point(gamma, beta));
  }
}

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    hint: 'No sensor is read here: the sliders send deviceorientation events to the window, which is what a tilting phone does (a real phone would drive the handler too). Turn the handler off and the same events do nothing.',
  });
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: 4, zoomControl: !stage.preview, dragging: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  // Stores an instance as map.tilt (it stays disabled until enable()).
  map.addHandler('tilt', TiltHandler);
  const tilt = (map as unknown as { tilt: TiltHandler }).tilt;
  tilt.enable();
  stage.onDispose(() => tilt.disable());

  let gamma = 0;
  let beta = 0;
  const send = (): void => {
    if (gamma === 0 && beta === 0) return;
    window.dispatchEvent(new DeviceOrientationEvent('deviceorientation', { alpha: 0, beta, gamma }));
  };
  stage.every(60, () => {
    send();
  });
  const say = (): void => stage.say(`tilt.enabled() = ${tilt.enabled()}; gamma ${gamma}°, beta ${beta}° (pans ${gamma}, ${beta} px per event)`);
  stage.slider('gamma (left/right)', -30, 30, 1, 0, (v) => ((gamma = v), say()));
  stage.slider('beta (up/down)', -30, 30, 1, 0, (v) => ((beta = v), say()));
  stage.toggle('tilt handler enabled', true, (on) => {
    if (on) tilt.enable();
    else tilt.disable();
    say();
  });
  say();

  if (stage.preview) {
    const script: [number, number, string][] = [
      [8, 0, 'tilt right: gamma 8'],
      [0, 8, 'tilt forward: beta 8'],
      [-8, -4, 'tilt back and left'],
    ];
    let i = 0;
    stage.cycle(
      [
        {
          run: () => {
            const [g, b, text] = script[i++ % script.length] as [number, number, string];
            gamma = g;
            beta = b;
            stage.say(`${text} (tilt.enabled() = ${tilt.enabled()})`);
          },
        },
      ],
      2200,
    );
  }
  return () => stage.dispose();
};

export default mount;
