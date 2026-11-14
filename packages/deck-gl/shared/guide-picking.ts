// Screen position of a coordinate in a Deck's first viewport, for picking probes
import type { Deck } from '@deck.gl/core';

/** Pixel position of `lngLat` in the canvas, or null before the first viewport exists. */
export function screenOf(deck: Deck, lngLat: [number, number]): [number, number] | null {
  const viewport = deck.getViewports()[0];
  if (!viewport) return null;
  const [x, y] = viewport.project(lngLat);
  return x === undefined || y === undefined ? null : [x, y];
}

/** Coordinate under a canvas pixel in the first viewport, or null before it exists. */
export function lngLatAt(deck: Deck, x: number, y: number): [number, number] | null {
  const viewport = deck.getViewports()[0];
  if (!viewport) return null;
  const [lng, lat] = viewport.unproject([x, y]);
  return lng === undefined || lat === undefined ? null : [lng, lat];
}
