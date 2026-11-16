// Data: className found with a dot selector
import { Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { findDemo } from '../../shared/find-demo.ts';

const mount: Mount = (el, ctx) =>
  findDemo(el, ctx, {
    hint: "className is one name per element, like HTML's class. Pick a query.",
    items: (S) => [
      new Rect({ className: 'menu', width: S, height: S, fill: '#32cd79' }),
      new Rect({ className: 'menu', width: S, height: S, fill: '#32cd79' }),
      new Rect({ width: S, height: S, fill: '#FEB027' }),
      new Rect({ className: 'footer', width: S, height: S, fill: '#4B8BFF' }),
    ],
    labels: ['menu', 'menu', '', 'footer'],
    queries: (leafer) => ({
      "find('.menu')": () => leafer.find('.menu'),
      "find('.footer')": () => leafer.find('.footer'),
      "findOne('.menu')": () => leafer.findOne('.menu'),
      "find('.header')": () => leafer.find('.header'),
    }),
  }).dispose;

export default mount;
