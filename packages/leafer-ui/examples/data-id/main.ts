// Data: id with findOne('#id') and findId()
import { Ellipse, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { findDemo } from '../../shared/find-demo.ts';

const mount: Mount = (el, ctx) =>
  findDemo(el, ctx, {
    hint: 'Pick a query: each shape has its own id.',
    items: (S) => [
      new Rect({ id: 'block', width: S, height: S, fill: '#32cd79' }),
      new Rect({ id: 'menu', width: S, height: S, fill: '#32cd79' }),
      new Ellipse({ id: 'footer', width: S, height: S, fill: '#FEB027' }),
    ],
    labels: ["id: 'block'", "id: 'menu'", "id: 'footer'"],
    queries: (leafer) => ({
      "findOne('#block')": () => leafer.findOne('#block'),
      "findId('menu')": () => leafer.findId('menu'),
      "findOne('#footer')": () => leafer.findOne('#footer'),
      "findOne('#missing')": () => leafer.findOne('#missing'),
    }),
  }).dispose;

export default mount;
