// Data: name matched by a find() function
import { Ellipse, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { findDemo } from '../../shared/find-demo.ts';

const mount: Mount = (el, ctx) =>
  findDemo(el, ctx, {
    hint: 'find(fn) calls fn on every element; return 1 to keep it, 0 to skip it.',
    items: (S) => [
      new Rect({ name: 'hello', width: S, height: S, fill: '#32cd79' }),
      new Rect({ width: S, height: S, fill: '#32cd79' }),
      new Ellipse({ name: 'hello', width: S, height: S, fill: '#32cd79' }),
      new Ellipse({ name: 'bye', width: S, height: S, fill: '#FEB027' }),
    ],
    labels: ["name: 'hello'", '', "name: 'hello'", "name: 'bye'"],
    queries: (leafer) => {
      const byName = (name: string) => () => leafer.find((item) => (item.name === name ? 1 : 0));
      return {
        "item.name === 'hello' ? 1 : 0": byName('hello'),
        "item.name === 'bye' ? 1 : 0": byName('bye'),
        "item.name === '' ? 1 : 0": byName(''),
      };
    },
  }).dispose;

export default mount;
