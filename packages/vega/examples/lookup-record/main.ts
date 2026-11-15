// Lookup of whole records: resolve two key fields per row against a table, then draw the links
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const towns = [
  { id: 'Aro', x: 14, y: 20 }, { id: 'Bel', x: 62, y: 12 }, { id: 'Cor', x: 88, y: 48 },
  { id: 'Dun', x: 40, y: 56 }, { id: 'Eld', x: 12, y: 80 }, { id: 'Fen', x: 70, y: 88 },
];
const make = (n: number): object[] => {
  const rand = rng(170 + n);
  return Array.from({ length: 6 }, () => {
    const a = Math.floor(rand() * towns.length);
    const b = (a + 1 + Math.floor(rand() * (towns.length - 1))) % towns.length;
    return { from: towns[a]!.id, to: towns[b]!.id };
  });
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 360,
    height: 220,
    padding: 5,
    data: [
      { name: 'towns', values: towns },
      {
        name: 'roads',
        values: make(0),
        // Without `values`, each match is the whole town object: road.a.x, road.b.y and so on.
        transform: [{ type: 'lookup', from: 'towns', key: 'id', fields: ['from', 'to'], as: ['a', 'b'] }],
      },
    ],
    scales: [
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'y', type: 'linear', domain: [0, 100], range: 'height' },
    ],
    marks: [
      {
        type: 'rule',
        from: { data: 'roads' },
        encode: {
          update: {
            x: { scale: 'x', field: 'a.x' },
            y: { scale: 'y', field: 'a.y' },
            x2: { scale: 'x', field: 'b.x' },
            y2: { scale: 'y', field: 'b.y' },
            stroke: { value: 'orange' },
            strokeWidth: { value: 2 },
            strokeOpacity: { value: 0.7 },
          },
        },
      },
      {
        type: 'symbol',
        from: { data: 'towns' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'y' },
            size: { value: 140 },
            fill: { value: 'steelblue' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'towns' },
        encode: {
          update: {
            x: { scale: 'x', field: 'x' },
            y: { scale: 'y', field: 'y', offset: -12 },
            text: { field: 'id' },
            align: { value: 'center' },
            fill: { value: '#ddd' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'roads', make, 1800);
  return () => stage.dispose();
};

export default mount;
