// Data: leafer, app, frame and the other read-only links an element has
import { App, Frame, Group, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { label } from '../../shared/basics.ts';
import { size } from '../../shared/shapes.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Everything below is read from the green rect, which sits in a Group inside a Frame in an App.', paper: 'transparent' });
  const app = stage.own(new App({ view: stage.view, ground: { fill: '#333' }, tree: {} }));
  const S = size(stage) * 0.5;
  const rect = new Rect({ x: 10, y: 10, width: S, height: S, fill: '#32cd79' });
  const frame = new Frame({ x: stage.width / 2 - S / 2 - 10, y: 50, width: S + 20, height: S + 20, fill: '#fff', children: [new Group({ children: [rect] })] });
  app.tree.add(frame);
  const show = label(stage, '', true);
  const fmt = (): string =>
    [
      `rect.leafer       ${rect.leafer?.tag}`,
      `rect.app          ${rect.app?.tag}`,
      `rect.frame        ${rect.frame?.tag}  (the Frame ${rect.frame === frame ? 'above' : '?'})`,
      `rect.zoomLayer    ${rect.zoomLayer?.tag}`,
      `rect.isLeafer     ${rect.isLeafer}   leafer.isLeafer ${rect.leafer?.isLeafer}`,
      `leaferIsCreated   ${rect.leaferIsCreated}`,
      `leaferIsReady     ${rect.leaferIsReady}`,
    ].join('\n');
  show(fmt());
  stage.every(300, () => show(fmt())); // leaferIsReady turns true after the first layout

  return stage.dispose;
};

export default mount;
