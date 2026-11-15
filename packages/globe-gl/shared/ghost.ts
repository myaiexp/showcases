// Card fake pointer for globe.gl: hover and click events sent to one globe only
import type { GlobeInstance } from 'globe.gl';
import { geoInterpolate } from 'd3-geo';

export interface Ghost {
  /** Moves the fake pointer over a place on the globe (lat, lng, altitude in globe radii). */
  at(lat: number, lng: number, altitude?: number): void;
  /**
   * Moves the fake pointer onto an arc, `t` of the way along it (0.5 by default). Arcs are
   * cubic Béziers whose control points sit above `altitude`, so their top is not at it.
   */
  arc(arc: ArcSpec, t?: number): void;
  /** Moves the fake pointer to container pixels. */
  px(x: number, y: number): void;
  /** Presses and releases where the pointer is (`button` 2 is a right-click). */
  click(button?: 0 | 2): void;
  /** Moves the pointer off the globe. */
  leave(): void;
}

/** An arc as the arcs layer sees it: ends, optional end altitudes and the peak altitude. */
export interface ArcSpec {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  altitude: number;
  startAlt?: number;
  endAlt?: number;
}

/**
 * A fake pointer over one globe. Events go to the globe's own `.scene-container` and do not
 * bubble: globe.gl reads hover and clicks there, while OrbitControls listens on the canvas,
 * so the fake pointer never drags the camera or reaches another card.
 */
export function createGhost(globe: GlobeInstance, container: HTMLElement): Ghost {
  let x = -10;
  let y = -10;
  const send = (type: string, button = 0): void => {
    const target = container.querySelector('.scene-container');
    if (!target) return;
    const r = target.getBoundingClientRect();
    target.dispatchEvent(
      new PointerEvent(type, { clientX: r.left + x, clientY: r.top + y, button, pointerType: 'mouse', bubbles: false }),
    );
  };
  return {
    at(lat, lng, altitude = 0) {
      const p = globe.getScreenCoords(lat, lng, altitude);
      x = p.x;
      y = p.y;
      send('pointermove');
    },
    arc(a, t = 0.5) {
      const { lat, lng, altitude } = globe.toGeoCoords(arcPoint(globe, a, t));
      this.at(lat, lng, altitude);
    },
    px(px, py) {
      x = px;
      y = py;
      send('pointermove');
    },
    click(button = 0) {
      send('pointerdown', button);
      send('pointerup', button);
    },
    leave() {
      x = -10;
      y = -10;
      send('pointermove');
    },
  };
}

/**
 * A point on an arc, built the way three-globe 2.45.6 builds the curve: a cubic Bézier from
 * start to end whose two control points sit a quarter and three quarters along the great
 * circle, raised past the peak altitude.
 */
function arcPoint(globe: GlobeInstance, a: ArcSpec, t: number): { x: number; y: number; z: number } {
  const startAlt = a.startAlt ?? 0;
  const endAlt = a.endAlt ?? 0;
  const along = geoInterpolate([a.startLng, a.startLat], [a.endLng, a.endLat]);
  const lift = (a0: number, a1: number): number => a1 + (a1 - a0) * (a0 < a1 ? 0.5 : 0.25);
  const [lng1, lat1] = along(0.25);
  const [lng2, lat2] = along(0.75);
  const pts = [
    globe.getCoords(a.startLat, a.startLng, startAlt),
    globe.getCoords(lat1, lng1, lift(startAlt, a.altitude)),
    globe.getCoords(lat2, lng2, lift(endAlt, a.altitude)),
    globe.getCoords(a.endLat, a.endLng, endAlt),
  ];
  const u = 1 - t;
  const w = [u * u * u, 3 * u * u * t, 3 * u * t * t, t * t * t];
  const sum = (k: 'x' | 'y' | 'z'): number => pts.reduce((acc, p, i) => acc + p[k] * w[i]!, 0);
  return { x: sum('x'), y: sum('y'), z: sum('z') };
}
