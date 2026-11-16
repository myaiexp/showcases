// App & engine config: native 2D context settings
import { Leafer, Rect } from 'leafer-ui';
import type { Mount } from '@/types.ts';
import { createStage } from '../../shared/stage.ts';
import { GREEN, label, sizer } from '../../shared/basics.ts';
import { select, checkbox } from '../../shared/controls.ts';

const mount: Mount = (el, ctx) => {
  const stage = createStage(el, ctx, { hint: 'Change a setting: the engine is rebuilt with it and the readout shows the attributes.', paper: 'transparent' });
  const u = sizer(stage);

  const say = label(stage, '', true);
  const settings = { alpha: true, colorSpace: 'srgb' as 'srgb' | 'display-p3', willReadFrequently: false };
  let leafer: Leafer | null = null;
  function build(): void {
    if (leafer) stage.release(leafer);
    leafer = stage.own(new Leafer({ view: stage.view, fill: '#333', contextSettings: { ...settings } }));
    leafer.add(Rect.one({ fill: GREEN }, u(80), u(50), u(110), u(90)));
    const attrs = (leafer.canvas.context as CanvasRenderingContext2D).getContextAttributes();
    say(`alpha ${attrs.alpha}   colorSpace ${attrs.colorSpace}   willReadFrequently ${attrs.willReadFrequently}`);
  }
  build();

  if (stage.preview) {
    stage.every(2200, () => {
      settings.willReadFrequently = !settings.willReadFrequently;
      settings.alpha = !settings.alpha;
      build();
    });
  } else {
    checkbox(stage.bar!, 'alpha', true, (v) => ((settings.alpha = v), build()));
    checkbox(stage.bar!, 'willReadFrequently', false, (v) => ((settings.willReadFrequently = v), build()));
    select(stage.bar!, 'colorSpace', ['srgb', 'display-p3'], (v) => ((settings.colorSpace = v), build()), 'srgb');
  }

  return stage.dispose;
};

export default mount;
