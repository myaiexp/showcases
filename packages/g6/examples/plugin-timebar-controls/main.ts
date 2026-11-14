// timebar playback methods on buttons, with the callbacks logged
import { Graph, Timebar } from '@antv/g6';
import type { Mount } from '@/types.ts';
import { button, readout, toggle } from '../../shared/controls.ts';
import { mountGraph } from '../../shared/graph.ts';
import { timeData, timebarSeries } from '../../shared/plugin-data.ts';

const mount: Mount = (el, ctx) =>
  mountGraph(el, ctx, async (stage) => {
    const out = stage.bar ? readout(el) : null;
    const log = (msg: string): void => {
      if (out) out.textContent = msg;
    };
    const graph = stage.keep(
      new Graph({
        container: stage.container,
        theme: 'dark',
        data: timeData(),
        node: { style: { size: stage.preview ? 10 : 22, fill: '#7e3feb' } },
        edge: { style: { stroke: '#8b9baf' } },
        layout: { type: 'grid', cols: 5 },
        autoFit: 'view',
        padding: [10, 10, stage.preview ? 56 : 110, 10],
        plugins: [
          {
            type: 'timebar',
            key: 'timebar',
            data: timebarSeries(),
            timebarType: 'time',
            width: stage.preview ? 250 : 450,
            height: stage.preview ? 44 : 100,
            onPlay: () => log('onPlay'),
            onPause: () => log('onPause'),
            onForward: () => log('onForward'),
            onBackward: () => log('onBackward'),
            onReset: () => log('onReset'),
            onSpeedChange: (speed: number) => log(`onSpeedChange(${speed})`),
            onChange: (values: number | [number, number]) => log(`onChange(${JSON.stringify(values)})`),
          },
        ],
      }),
    );
    await graph.render();

    const tb = graph.getPluginInstance<Timebar>('timebar');
    if (stage.bar) {
      button(stage.bar, 'play', () => tb.play());
      button(stage.bar, 'pause', () => tb.pause());
      button(stage.bar, 'backward', () => tb.backward());
      button(stage.bar, 'forward', () => tb.forward());
      button(stage.bar, 'reset', () => tb.reset());
      toggle(stage.bar, 'loop', false, (loop) => graph.updatePlugin({ key: 'timebar', loop }));
    } else {
      const calls = [() => tb.forward(), () => tb.forward(), () => tb.backward(), () => tb.reset()];
      stage.every(1000, (i) => calls[i % calls.length]!());
    }
  });

export default mount;
