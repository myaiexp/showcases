// VFX-JS: AsciiEffect ramps, the built-in presets and custom chars
import { VFX } from '@vfx-js/core';
import { ASCII_PRESETS, AsciiEffect, type AsciiPresetName } from '@vfx-js/effects';
import type { Mount } from '@/types.ts';
import { select, slider, textInput } from '../../shared/controls.ts';
import { picture } from '../../shared/pictures.ts';
import { createStage } from '../../shared/stage.ts';

const NAMES = Object.keys(ASCII_PRESETS) as AsciiPresetName[];

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const img = await picture('landscape', ctx.preview ? 200 : 420);
  stage.root.append(img);
  const vfx = stage.own(new VFX({ ...stage.vfxOpts }));

  const ascii = new AsciiEffect({ grid: 10, preset: 'standard', colorFromSource: true, background: [0, 0, 0, 1] });
  await vfx.add(img, { effect: ascii });

  // preset and chars are baked into the glyph atlas, so a change needs updateAtlas().
  const show = async (name: AsciiPresetName): Promise<void> => {
    ascii.setParams({ preset: name, chars: undefined });
    await ascii.updateAtlas();
    stage.say(`preset "${name}": ${ASCII_PRESETS[name]}`);
  };

  if (stage.bar) {
    select(stage.bar, 'preset', NAMES.map((n) => [n, n] as const), (n) => void show(n));
    textInput(
      stage.bar,
      'custom chars (dark to light)',
      ' .:-=+*#%@',
      (v) => {
        if (v.length < 2) return;
        ascii.setParams({ chars: v });
        void ascii.updateAtlas();
        stage.say(`chars: "${v}"`);
      },
      14,
    );
    slider(stage.bar, 'dither', 0, 1, 0.05, 0, (v) => (ascii.params.dither = v));
    void show('standard');
  } else {
    stage.cycle(NAMES, 2200, (n) => void show(n));
  }
  return () => stage.dispose();
};

export default mount;
