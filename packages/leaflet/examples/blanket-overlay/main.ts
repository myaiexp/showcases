// A BlanketOverlay subclass that draws a dot grid on one canvas, with padding and continuous options
import { BlanketOverlay, LeafletMap, type LeafletEvent, type Point } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { LAND_ATTRIBUTION, LocalTileLayer } from '../../shared/local-tiles.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'The orange tint is the canvas. Pan: with continuous off it is redrawn after the move, so the new edge shows the padding; with it on it is redrawn on every move.' });
  const log = stage.log('BlanketOverlay');
  const map = stage.own(new LeafletMap(stage.box, { center: [45, 10], zoom: 4, zoomControl: !stage.preview }));
  new LocalTileLayer('https://tiles.example/dark/{z}/{x}/{y}.png', { attribution: LAND_ATTRIBUTION }).addTo(map);

  let draws = 0;
  class DotGrid extends BlanketOverlay {
    _canvas?: HTMLCanvasElement;

    // Must create the element and store it as this._container.
    override _initContainer(): void {
      this._canvas = document.createElement('canvas');
      this._container = this._canvas;
    }

    // The base sizes the container (view size plus padding) in CSS pixels; the canvas bitmap follows.
    override _resizeContainer(): Point {
      const size = super._resizeContainer();
      if (this._canvas) {
        this._canvas.width = size.x;
        this._canvas.height = size.y;
      }
      return size;
    }

    // Runs when the map state settles: the bulk of the drawing goes here.
    override _onSettled(_ev?: LeafletEvent): void {
      const canvas = this._canvas;
      const g = canvas?.getContext('2d');
      if (!canvas || !g) return;
      draws++;
      g.clearRect(0, 0, canvas.width, canvas.height);
      g.fillStyle = 'rgb(245 138 61 / 0.14)';
      g.fillRect(0, 0, canvas.width, canvas.height);
      g.strokeStyle = '#f58a3d';
      g.lineWidth = 4;
      g.strokeRect(2, 2, canvas.width - 4, canvas.height - 4);
      g.fillStyle = '#f58a3d';
      const min = this._bounds.min;
      for (let lat = -80; lat <= 80; lat += 5) {
        for (let lng = -180; lng <= 180; lng += 5) {
          const p = this._map.latLngToLayerPoint([lat, lng]).subtract(min);
          if (p.x < 0 || p.y < 0 || p.x > canvas.width || p.y > canvas.height) continue;
          g.beginPath();
          g.arc(p.x, p.y, 2.5, 0, Math.PI * 2);
          g.fill();
        }
      }
      log(`draw ${draws}: canvas ${canvas.width} x ${canvas.height}, padding ${this.options.padding}, continuous ${this.options.continuous}`);
    }
  }

  let overlay = new DotGrid({ padding: 0.1, continuous: false }).addTo(map);
  const rebuild = (padding: number, continuous: boolean): void => {
    overlay.remove();
    draws = 0;
    overlay = new DotGrid({ padding, continuous }).addTo(map);
    stage.say(`padding ${padding}, continuous ${continuous}`);
  };
  let padding = 0.1;
  let continuous = false;
  stage.slider('padding', 0, 1, 0.1, 0.1, (v) => rebuild((padding = v), continuous));
  stage.toggle('continuous', false, (on) => rebuild(padding, (continuous = on)));
  stage.say('padding 0.1, continuous false');

  if (stage.preview) {
    stage.cycle(
      [
        { say: 'padding 0.1: pan, and the canvas edge shows', run: () => (rebuild(0.1, false), map.panBy([-150, 0])) },
        { run: () => map.panBy([150, 0]) },
        { say: 'padding 0.8: the canvas reaches far past the view', run: () => (rebuild(0.8, false), map.panBy([-150, 0])) },
        { run: () => map.panBy([150, 0]) },
      ],
      1900,
    );
  }
  return () => stage.dispose();
};

export default mount;
