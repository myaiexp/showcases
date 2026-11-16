// App & engine config: a Leafer inside a shadow root
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, dragToAndFro, label, sizer } from '../../shared/basics.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Drag the square: it lives inside the shadow root.', paper: 'transparent' });
  const u = sizer(stage);

  const host = document.createElement('div');
  host.style.cssText = 'position:absolute;inset:0';
  stage.view.append(host);
  const root = host.attachShadow({ mode: 'open' });
  const view = document.createElement('div');
  view.style.cssText = 'position:absolute;inset:0';
  root.append(view);

  const leafer = stage.own(new Leafer({ view, shadowDOM: true, fill: '#333' }));
  leafer.add(Rect.one({ fill: GREEN, draggable: true }, u(80), u(60), u(100), u(100)));
  const say = label(stage, `canvases in the shadow root: ${root.querySelectorAll('canvas').length}\nin the host's light DOM: ${host.querySelectorAll('canvas').length}`, true);
  void say;

  if (stage.preview) dragToAndFro(stage, leafer, { x: u(130), y: u(110) }, { x: u(200), y: u(90) });

  return stage.dispose;
};

export default mount;
