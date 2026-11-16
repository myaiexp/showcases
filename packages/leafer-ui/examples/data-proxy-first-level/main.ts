// Data: proxyData is reactive at the first level only
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { installProxyData } from './proxy.ts';
import { label } from '../../shared/basics.ts';
import { size, mid } from '../../shared/shapes.ts';
import { button } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Changing a value inside an object does nothing; replacing the whole object works. (Same rule as the element: rect.shadow.x = 1 does not redraw.)' });
  installProxyData(stage);
  const leafer = stage.own(new Leafer({ view: stage.view }));
  const S = size(stage) * 0.4;
  const rect = new Rect({ ...mid(stage, S, S), fill: '#32cd79', shadow: { x: 4, y: 4, blur: 6, color: '#0006' } });
  leafer.add(rect);
  const proxyData = rect.proxyData as { shadow: { x: number; y: number; blur: number; color: string } };
  const show = label(stage, '', true);
  let x = 4;
  const nested = (): void => {
    x = x >= 24 ? 4 : x + 10;
    proxyData.shadow.x = x; // invalid: the object is the same, nothing is notified
    show(`proxyData.shadow.x = ${x}   (invalid, no redraw)`);
  };
  const whole = (): void => {
    x = x >= 24 ? 4 : x + 10;
    proxyData.shadow = { ...proxyData.shadow, x }; // valid: a new object
    show(`proxyData.shadow = { ...proxyData.shadow, x: ${x} }   (valid)`);
  };
  show('press a button');
  if (stage.bar) {
    button(stage.bar, 'proxyData.shadow.x += 10', nested);
    button(stage.bar, 'replace the shadow object', whole);
  } else {
    let k = 0;
    stage.every(1300, () => (k++ % 2 ? whole() : nested()));
  }
  stage.onDispose(() => rect.clearProxyData?.());

  return stage.dispose;
};

export default mount;
