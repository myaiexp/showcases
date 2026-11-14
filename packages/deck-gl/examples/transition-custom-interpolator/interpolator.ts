// A TransitionInterpolator that moves longitude by the shorter half of the globe
import { TransitionInterpolator } from '@deck.gl/core';

type LngLatProps = Record<string, number>;

function lerp(from: number, to: number, t: number): number {
  return from + (to - from) * t;
}

/** Straight-line camera move on a Web Mercator map; `speed` is in degrees per second. */
export class SphericalLinearInterpolator extends TransitionInterpolator {
  speed: number;

  constructor({ speed = 100 } = {}) {
    // The docs allow one array for all three lists; the type wants the object form.
    const props = ['longitude', 'latitude'];
    super({ compare: props, extract: props, required: props });
    this.speed = speed;
  }

  // Lets the caller ask for transitionDuration: 'auto'.
  override getDuration(startViewState: LngLatProps, endViewState: LngLatProps): number {
    const deltaLat = Math.abs(startViewState.latitude! - endViewState.latitude!);
    let deltaLng = Math.abs(startViewState.longitude! - endViewState.longitude!);
    if (deltaLng > 180) deltaLng = 360 - deltaLng;
    return (Math.max(deltaLng, deltaLat) / this.speed) * 1000;
  }

  override initializeProps(startViewState: LngLatProps, endViewState: LngLatProps): { start: LngLatProps; end: LngLatProps } {
    const fromLng = startViewState.longitude!;
    let toLng = endViewState.longitude!;
    // Go the short way round: shift the target by 360 degrees if that is nearer.
    if (toLng > fromLng + 180) toLng -= 360;
    if (toLng < fromLng - 180) toLng += 360;
    return {
      start: { longitude: fromLng, latitude: startViewState.latitude! },
      end: { longitude: toLng, latitude: endViewState.latitude! },
    };
  }

  override interpolateProps(start: LngLatProps, end: LngLatProps, t: number): LngLatProps {
    const latitude = lerp(start.latitude!, end.latitude!, t);
    let longitude = lerp(start.longitude!, end.longitude!, t);
    // Put longitude back into [-180, 180].
    if (longitude > 180) longitude -= 360;
    if (longitude < -180) longitude += 360;
    return { longitude, latitude };
  }
}
