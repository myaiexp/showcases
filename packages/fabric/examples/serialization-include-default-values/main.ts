// includeDefaultValues false leaves out values equal to the class defaults
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'canvas.toJSON()'],
    scene: SCENE,
    hint: 'Toggle canvas.includeDefaultValues. Off, every object is written without the properties that equal its class defaults.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  canvas.add(...sampleScene());

  const refresh = (): void => {
    const data = canvas.toJSON();
    show(pretty(data, stage.preview));
    say(`${JSON.stringify(data).length} chars, defaults ${canvas.includeDefaultValues ? 'on' : 'off'}`);
  };
  refresh();

  if (stage.bar) {
    checkbox(stage.bar, 'includeDefaultValues', canvas.includeDefaultValues, (on) => {
      canvas.includeDefaultValues = on;
      refresh();
    });
  } else {
    stage.every(1800, () => {
      canvas.includeDefaultValues = !canvas.includeDefaultValues;
      refresh();
    });
  }

  return stage.dispose;
};

export default mount;
