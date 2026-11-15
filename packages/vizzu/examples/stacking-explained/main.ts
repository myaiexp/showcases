// Vizzu example: the docs' own D, M, i data walking through dimension-only, measure and dimension, measure-only
import Vizzu from 'vizzu';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { darkStyle } from '../../shared/theme.ts';

// The docs' stacking_explanation/data.js: three records, a constant i, no explicit types.
const data = {
  series: [
    { name: 'D', values: ['A', 'B', 'C'] },
    { name: 'M', values: [6.1, 3.5, 1.4] },
    { name: 'i', values: [1, 1, 1] },
  ],
};

const mount: Mount = async (el, ctx) => {
  const stage = await createStage(el, ctx);
  const chart = stage.own(new Vizzu(stage.element, { style: darkStyle }));
  await chart.initializing;

  await chart.animate(
    {
      data,
      config: {
        title: 'Dimension only',
        channels: {
          x: {
            set: ['D', 'i'],
            range: { max: 3 },
            axis: true,
            labels: false,
            title: 'x: [ dimension ]',
            interlacing: false,
            markerGuides: true,
            ticks: false,
          },
          y: { set: null, axis: true, labels: false, title: null, interlacing: false },
          color: 'D',
          label: ['D'],
        },
        legend: null,
      },
    },
    { duration: 2, delay: 0 },
  );

  stage.story(chart, [
    {
      say: 'Measure and dimension: x is [D, M], widths follow M',
      run: (c) =>
        c.animate(
          {
            config: {
              title: 'Measure and dimension',
              channels: {
                x: {
                  set: ['D', 'M'],
                  range: { max: 12 },
                  axis: true,
                  labels: true,
                  title: 'x: [ measure, dimension ]',
                  interlacing: false,
                  markerGuides: true,
                  ticks: true,
                },
                y: { set: null, axis: true, labels: false, title: null, interlacing: false },
                color: 'D',
                label: ['D'],
              },
            },
          },
          { duration: 2, delay: 0 },
        ),
      hold: 2000,
    },
    {
      say: 'Measure only: one bar, stacked from the origin',
      run: (c) =>
        c.animate(
          {
            config: {
              title: 'Measure only',
              channels: {
                x: {
                  set: 'M',
                  range: { max: 7 },
                  axis: true,
                  labels: true,
                  title: 'x: [ measure ]',
                  interlacing: false,
                  markerGuides: true,
                  ticks: true,
                },
                y: { set: null, axis: true, labels: false, title: null, interlacing: false },
                color: 'D',
                label: ['D'],
              },
            },
          },
          { duration: 2, delay: 0 },
        ),
      hold: 2000,
    },
    {
      say: 'Dimension only again',
      run: (c) =>
        c.animate(
          {
            config: {
              title: 'Dimension only',
              channels: {
                x: {
                  set: ['D', 'i'],
                  range: { max: 3 },
                  axis: true,
                  labels: false,
                  title: 'x: [ dimension ]',
                  interlacing: false,
                  markerGuides: true,
                  ticks: false,
                },
                y: { set: null, axis: true, labels: false, title: null, interlacing: false },
                color: 'D',
                label: ['D'],
              },
              legend: null,
            },
          },
          { duration: 2, delay: 0 },
        ),
      hold: 2000,
    },
  ]);
  return () => stage.dispose();
};

export default mount;
