// Data: proxyData keeps reactive data and the element in step
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { installProxyData, subscribe } from './proxy.ts';
import { label } from '../../shared/basics.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Write to proxyData.width and the rect changes; set rect.width and the proxy follows. The docs hook this up to Vue; here a plain Proxy does.' });
  installProxyData(stage); // the docs' proxyData.ts override, with a Proxy in place of shallowReactive
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.3;
  const rect = new Rect({ ...mid(stage, S, S), x: 20, fill: '#32cd79' });
  leafer.add(rect);
  const proxyData = rect.proxyData!;
  const show = label(stage, '', true);
  const readout = (via: string): void => show(`${via}\nproxyData.width ${proxyData.width}   rect.width ${rect.width}`);
  subscribe(rect, () => readout('(the proxy heard a change)'));
  readout('start');
  const steps = [
    (): void => void (proxyData.width = S * 2), // write the proxy: the element changes
    (): void => void (rect.width = S * 3), // write the element: the proxy follows
    (): void => void (proxyData.width = S),
  ];
  const labels = ['proxyData.width = 2S', 'rect.width = 3S', 'proxyData.width = S'];
  let i = 0;
  const next = (): void => {
    steps[i]!();
    i = (i + 1) % steps.length;
  };
  if (stage.bar) labels.forEach((l, k) => button(stage.bar!, l, steps[k]!));
  else stage.every(1400, next);
  stage.onDispose(() => rect.clearProxyData?.());

  return stage.dispose;
};

export default mount;
