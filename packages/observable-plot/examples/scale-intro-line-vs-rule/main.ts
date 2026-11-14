// The gistemp series as a line on y, or a rule coloured through the color scale
import * as Plot from '@observablehq/plot';
import type { Mount } from '@/types.ts';
import { select } from '../../shared/controls.ts';
import { csv } from '../../shared/data.ts';
import { mountPlot } from '../../shared/plot.ts';

type Channel = 'y (line)' | 'stroke (rule)';
const channels: Channel[] = ['y (line)', 'stroke (rule)'];

const mount: Mount = async (el, ctx) => {
  const gistemp = await csv('gistemp.csv');
  return mountPlot(el, ctx, {
    initial: { channel: channels[0] as Channel },
    render: ({ channel }, { width, height }) =>
      channel === 'y (line)'
        ? Plot.lineY(gistemp, { x: 'Date', y: 'Anomaly' }).plot({ width, height })
        : Plot.ruleX(gistemp, { x: 'Date', stroke: 'Anomaly' }).plot({ width, height }),
    step: (_s, i) => ({ channel: channels[i % 2] }),
    controls: (bar, live) => select(bar, 'channel ', channels, live.state.channel, (channel) => live.set({ channel })),
  });
};

export default mount;
