// overlay hides the element (default), keeps it, or sets its opacity
import { VFX, type VFXProps } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { headline } from '../../shared/subjects.ts';
import { createStage } from '../../shared/stage.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const rows: [string, VFXProps['overlay']][] = [
    ['default', undefined], // hide the element (opacity 0)
    ['overlay: true', true], // keep it visible under the effect
    ['overlay: 0.5', 0.5], // set its opacity
  ];
  for (const [label, overlay] of rows) {
    const h = headline(label, '#ffd34d');
    h.style.fontSize = ctx.preview ? '22px' : '40px';
    stage.root.append(h);
    // "spring" scales the drawn copy in and out, so the original shows where it differs.
    await vfx.add(h, { shader: 'spring', overlay });
  }
  stage.root.style.flexDirection = 'column';
  stage.say('The plain element shows through wherever overlay keeps it visible');
  return () => stage.dispose();
};

export default mount;
