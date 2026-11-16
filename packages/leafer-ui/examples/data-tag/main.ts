// Data: tag finds elements by their class name
import { Ellipse, Rect, Star } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { findDemo } from '../../shared/find-demo.ts';

const mount: Mount = (el, ctx) =>
  findDemo(el, ctx, {
    hint: 'tag is the class name, read-only. Pick a query.',
    items: (S) => [
      new Rect({ width: S, height: S, fill: '#32cd79' }),
      new Rect({ width: S, height: S, fill: '#32cd79' }),
      new Ellipse({ width: S, height: S, fill: '#32cd79' }),
      new Star({ width: S, height: S, fill: '#FEB027' }),
    ],
    labels: ['Rect', 'Rect', 'Ellipse', 'Star'],
    queries: (leafer) => ({
      "find('Rect')": () => leafer.find('Rect'),
      "find('Ellipse')": () => leafer.find('Ellipse'),
      "find('Star')": () => leafer.find('Star'),
      "find('Polygon')": () => leafer.find('Polygon'),
    }),
    note: (hits) => hits.map((h) => h.tag).join(', '),
  }).dispose;

export default mount;
