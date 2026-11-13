// tooltip triggerOn click, alwaysShowContent, enterable and appendTo, inside a box that clips overflow
import type { EChartsOption } from 'echarts';
import type { Mount } from '@/types.ts';
import { button, controlBar, createChart, every, select } from '../../shared/chart.ts';
import { points } from '../../shared/interaction-data.ts';

interface Look { triggerOn: string; pinned: boolean; enterable: boolean; appendTo: 'inside the chart box' | 'document.body' }

const data = points(30, 5).map((p, i) => ({ name: 'Point ' + (i + 1), value: [p[0]!, p[1]!] }));

function build(look: Look, onPick: (name: string) => void, preview: boolean): EChartsOption {
  return {
    tooltip: {
      trigger: 'item',
      // triggerOn: 'mousemove' | 'click' | 'mousemove|click' | 'none' (then showTip/hideTip drive it).
      triggerOn: preview ? 'none' : (look.triggerOn as 'click'),
      // alwaysShowContent: keep the box up instead of hiding it after hideDelay.
      alwaysShowContent: look.pinned || preview,
      // enterable: the mouse may move into the box, so buttons inside it can be pressed.
      enterable: look.enterable,
      // appendTo (5.5): a function gets the chart container and returns the node to append to.
      appendTo: look.appendTo === 'document.body' ? () => document.body : undefined,
      formatter: (p) => {
        const { name, value } = p as unknown as { name: string; value: number[] };
        const box = document.createElement('div');
        box.textContent = name + ' (' + value.map((v) => v.toFixed(0)).join(', ') + ')';
        if (look.enterable) {
          const b = document.createElement('button');
          b.type = 'button';
          b.textContent = 'Pick';
          b.style.marginLeft = '8px';
          b.addEventListener('click', () => onPick(name));
          box.append(b);
        }
        return box;
      },
    },
    grid: { top: 10, left: 36, right: 10, bottom: 24 },
    xAxis: { type: 'value', min: 0, max: 100 },
    yAxis: { type: 'value', min: 0, max: 100 },
    series: [{ type: 'scatter', symbolSize: 12, data }],
  };
}

const mount: Mount = (el, ctx) => {
  const bar = ctx.preview ? null : controlBar(el);
  // A clipped box: an ancestor with overflow hidden is what cuts a tooltip that sticks out.
  const box = document.createElement('div');
  box.style.overflow = 'hidden';
  box.style.border = '1px dashed #888';
  box.style.width = '100%';
  el.append(box);
  const status = document.createElement('div');
  status.style.cssText = 'font-size:13px;padding:6px 0;min-height:1.4em';
  if (bar) el.append(status);

  const { chart, dispose } = createChart(el, ctx, { parent: box, height: 260 });
  const look: Look = { triggerOn: 'click', pinned: true, enterable: true, appendTo: 'inside the chart box' };
  const show = (): void => {
    chart.setOption(build(look, (name) => { status.textContent = 'Picked from the tooltip: ' + name; }, ctx.preview), true);
  };
  show();

  let stop = (): void => {};
  if (bar) {
    select(bar, 'triggerOn', ['click', 'mousemove', 'mousemove|click'], (v) => {
      look.triggerOn = v;
      chart.dispatchAction({ type: 'hideTip' });
      show();
    });
    select(bar, 'appendTo', ['inside the chart box', 'document.body'], (v) => {
      look.appendTo = v as Look['appendTo'];
      show();
    });
    const pin = button(bar, 'alwaysShowContent: on', () => {
      look.pinned = !look.pinned;
      pin.textContent = 'alwaysShowContent: ' + (look.pinned ? 'on' : 'off');
      show();
    });
    const ent = button(bar, 'enterable: on', () => {
      look.enterable = !look.enterable;
      ent.textContent = 'enterable: ' + (look.enterable ? 'on' : 'off');
      show();
    });
    status.textContent = 'Click a point near an edge; with the default appendTo its tooltip is clipped by the dashed box.';
  } else {
    let i = 0;
    stop = every(1500, () => {
      i++;
      chart.dispatchAction({ type: 'showTip', seriesIndex: 0, dataIndex: (i * 7) % data.length });
    });
  }

  return () => {
    stop();
    dispose();
    box.remove();
    status.remove();
  };
};

export default mount;
