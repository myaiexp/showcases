// What each built-in CRS declares: code, wrapping, bounds at zoom 0, scale(), and what it projects [0, 0] to
import { EarthCRS, EPSG3395, EPSG3857, EPSG4326, EPSG900913, LatLng, SimpleCRS } from 'leaflet';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';

const CRSS = { EPSG3857, EPSG900913, EPSG3395, EPSG4326, SimpleCRS };
type Name = keyof typeof CRSS;

const describe = (name: Name): string => {
  const crs = CRSS[name];
  const fmt = (v: unknown): string => (v === undefined ? 'undefined' : JSON.stringify(v));
  const bounds = crs.getProjectedBounds(0);
  const here = new LatLng(45, 90);
  const px = crs.latLngToPoint(here, 2);
  return [
    `${name}`,
    `  code            ${fmt(crs.code)}`,
    `  infinite        ${String(crs.infinite)}`,
    `  wrapLng         ${fmt(crs.wrapLng)}`,
    `  wrapLat         ${fmt(crs.wrapLat)}`,
    `  scale(0)        ${crs.scale(0)}`,
    `  scale(3)        ${crs.scale(3)}`,
    `  zoom(1024)      ${crs.zoom(1024)}`,
    `  bounds at zoom 0  ${bounds ? `${bounds.min.round().toString()} to ${bounds.max.round().toString()}` : 'null (infinite)'}`,
    `  project([45, 90])  ${crs.project(here).round().toString()}`,
    `  latLngToPoint at zoom 2  ${px.round().toString()}`,
    `  distance: ${crs.distance(new LatLng(0, 0), new LatLng(1, 1)).toFixed(2)} ${crs === SimpleCRS ? 'units' : 'm'} from [0, 0] to [1, 1]`,
  ].join('\n');
};

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Static properties and methods of the classes themselves: a CRS is never instantiated. EarthCRS is the shared base (R = 6371000, wrapLng, haversine distance); SimpleCRS has none of that.' });
  stage.box.style.cssText += ';background:#0b0f14;overflow:auto;padding:10px;box-sizing:border-box;display:flex;align-items:center';
  const pre = document.createElement('pre');
  pre.style.cssText = 'margin:0;color:#e5e7eb;font:12px/1.5 ui-monospace,monospace;white-space:pre';
  stage.box.append(pre);

  const names = Object.keys(CRSS) as Name[];
  const show = (name: Name): void => {
    pre.textContent = stage.preview ? describe(name).split('\n').slice(0, 9).join('\n') : describe(name);
    stage.say(`EarthCRS.R = ${EarthCRS.R}`);
  };
  show('EPSG3857');
  stage.select('CRS', names.map((v) => ({ value: v, label: v })), 'EPSG3857', show);

  if (stage.preview) {
    let i = 1;
    stage.every(2200, () => show(names[i++ % names.length] as Name));
  }
  return () => stage.dispose();
};

export default mount;
