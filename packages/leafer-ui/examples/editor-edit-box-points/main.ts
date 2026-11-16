// EditBox: resizePoints, rotatePoints and resizeLines are three sets of handles
import { App } from 'leafer-ui';
import '@leafer-in/editor';
import '@leafer-in/viewport';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { actions, geo, solo } from '../../shared/editor-kit.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Each button tints one set: the 8 resize points, the 8 hidden rotate points, the 4 resize lines.' });
  const g = geo(stage);
  const app = stage.own(new App({ view: stage.view, editor: { middlePoint: {} } }));
  const rect = solo(stage, g, { fill: '#FEB027', cornerRadius: 0 });
  app.tree.add(rect);
  const { editBox } = app.editor;
  const reselect = (): void => {
    app.editor.cancel();
    app.editor.select(rect); // load() restyles every point
  };
  reselect();

  actions(
    stage,
    [
      {
        name: 'editBox.resizePoints (8): topLeft, top, ...',
        run: () => editBox.resizePoints.forEach((p, i) => (p.fill = i % 2 ? '#e4572e' : '#32cd79')),
      },
      { name: 'editBox.rotatePoints (8)', run: () => editBox.rotatePoints.forEach((p) => (p.fill = 'rgba(228,87,46,0.35)')) },
      { name: 'editBox.resizeLines (4)', run: () => editBox.resizeLines.forEach((p) => (p.fill = 'rgba(50,120,255,0.35)')) },
    ],
    { reset: reselect, gap: 1500 },
  );
  return stage.dispose;
};

export default mount;
