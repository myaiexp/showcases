// VFX-JS example: slideSpec gives each slide its own entering transition
import { Crossfade, Glitch, Swipe, Zoom } from '@vfx-js/transitions';
import type { RunOpts } from '@vfx-js/core';
import type { Mount } from '@/types.ts';
import { checkbox } from '../../shared/controls.ts';
import { drive, trKit } from '../../shared/tr-kit.ts';

const mount: Mount = async (el, ctx) => {
  const kit = await trKit(el, ctx);
  const { stage, vfx, box } = kit;

  const BY_TITLE: Record<string, { name: string; spec: RunOpts | undefined }> = {
    Dusk: { name: "none: the container's Swipe", spec: undefined },
    Night: { name: 'Zoom, 1.2 s', spec: { transition: Zoom, duration: 1.2 } },
    Meadow: { name: 'Glitch, 1 s', spec: { transition: Glitch, duration: 1 } },
  };
  const t = vfx.addTransition(box, {
    transition: Swipe,
    duration: 0.7,
    // Called with the slide that is about to show.
    slideSpec: (slide) => BY_TITLE[slide.querySelector('h3')?.textContent ?? '']?.spec,
  });

  let override = false;
  let entering = 'Dusk';
  drive(kit, t, {
    label: () => (override ? 'show() option Crossfade wins' : `${entering} enters with ${BY_TITLE[entering]!.name}`),
    onStep: (i) => (entering = kit.slides[i]!.title),
    // Options passed to show() go over the slide's spec.
    showOpts: () => (override ? { transition: Crossfade } : {}),
  });
  if (stage.bar) checkbox(stage.bar, 'show() passes transition: Crossfade', false, (v) => (override = v));
  return () => stage.dispose();
};

export default mount;
