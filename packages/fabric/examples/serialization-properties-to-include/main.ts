// Serialization: toObject(propertiesToInclude) adds custom properties to the JSON
import { Canvas } from 'fabric';
import type { Mount } from '@/types.ts';
import { briefStatus, codePanel, pretty } from '../../shared/code-panel.ts';
import { checkbox } from '../../shared/controls.ts';
import { sampleScene, SCENE } from '../../shared/sample-scene.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['canvas', 'toObject(list)'],
    scene: SCENE,
    hint: 'Objects carry the extra properties name and zone. fabric only writes them when their names are in the list.',
  });
  const canvas = stage.own(new Canvas(stage.el));
  const show = codePanel(stage.panes[1]!, stage.preview);
  const say = briefStatus(stage);
  // Leave out values equal to the class defaults, so the extra properties are easy to spot.
  canvas.includeDefaultValues = false;
  canvas.add(...sampleScene());

  const include = new Set<string>(['name']);
  const refresh = (): void => {
    const list = [...include];
    // The list is the argument: fabric copies these own properties of every object into its output.
    show(pretty(canvas.toObject(list), stage.preview));
    say(`toObject([${list.map((p) => `'${p}'`).join(', ')}])`);
  };

  if (stage.bar) {
    for (const prop of ['name', 'zone']) {
      checkbox(stage.bar, prop, include.has(prop), (on) => {
        if (on) include.add(prop);
        else include.delete(prop);
        refresh();
      });
    }
  } else {
    const steps = [['name'], ['name', 'zone'], ['zone'], []];
    let i = 0;
    stage.every(1500, () => {
      include.clear();
      for (const p of steps[++i % steps.length]!) include.add(p);
      refresh();
    });
  }
  refresh();

  return stage.dispose;
};

export default mount;
