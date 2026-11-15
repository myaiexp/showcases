// Aggregate argmin and argmax ops return the whole data object that holds the extreme value
import type { Spec } from 'vega';
import type { Mount } from '@/types.ts';
import { rng } from '../../shared/cards.ts';
import { reshuffle } from '../../shared/basic-kit.ts';
import { createStage } from '../../shared/stage.ts';

const names = ['Ada', 'Bo', 'Cy', 'Di', 'Ed', 'Fay', 'Gus', 'Hal', 'Ivy', 'Jo', 'Kit', 'Lu'];
const teams = ['red', 'green', 'blue'];
const make = (n: number): object[] => {
  const rand = rng(40 + n);
  return names.map((name, i) => ({ name, team: teams[i % 3], points: Math.round(5 + rand() * 90) }));
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);

  const spec: Spec = {
    width: 320,
    height: 170,
    padding: 5,
    data: [
      { name: 'players', values: make(0) },
      {
        // argmin / argmax output the full player object, so its name is still reachable.
        name: 'extremes',
        source: 'players',
        transform: [
          { type: 'aggregate', groupby: ['team'], fields: ['points', 'points'], ops: ['argmin', 'argmax'], as: ['low', 'high'] },
        ],
      },
    ],
    scales: [
      { name: 'y', type: 'band', domain: teams, range: 'height', padding: 0.4 },
      { name: 'x', type: 'linear', domain: [0, 100], range: 'width' },
      { name: 'color', type: 'ordinal', domain: teams, range: ['tomato', 'seagreen', 'dodgerblue'] },
    ],
    axes: [
      { orient: 'left', scale: 'y' },
      { orient: 'bottom', scale: 'x', title: 'points' },
    ],
    marks: [
      {
        type: 'rule',
        from: { data: 'extremes' },
        encode: {
          update: {
            y: { scale: 'y', field: 'team', band: 0.5 },
            x: { scale: 'x', field: 'low.points' },
            x2: { scale: 'x', field: 'high.points' },
            stroke: { scale: 'color', field: 'team' },
            strokeWidth: { value: 4 },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'extremes' },
        encode: {
          update: {
            y: { scale: 'y', field: 'team', band: 0.5, offset: -12 },
            x: { scale: 'x', field: 'low.points' },
            text: { signal: "datum.low.name + ' ' + datum.low.points" },
            align: { value: 'right' },
            dx: { value: -4 },
            baseline: { value: 'middle' },
            fill: { value: '#ddd' },
          },
        },
      },
      {
        type: 'text',
        from: { data: 'extremes' },
        encode: {
          update: {
            y: { scale: 'y', field: 'team', band: 0.5, offset: -12 },
            x: { scale: 'x', field: 'high.points' },
            text: { signal: "datum.high.name + ' ' + datum.high.points" },
            dx: { value: 4 },
            baseline: { value: 'middle' },
            fill: { value: '#ddd' },
          },
        },
      },
    ],
  };

  const view = await stage.render(spec);
  reshuffle(stage, view, 'players', make);
  return () => stage.dispose();
};

export default mount;
