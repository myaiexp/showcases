// Image filters: the three Grayscale modes side by side, with a picture picker
import type { Mount } from '@/types.ts';
import { filters } from 'fabric';
import { select } from '../../shared/controls.ts';
import { cycle, filterStage, shot, type Shot } from '../../shared/filter-demo.ts';
import { status } from '../../shared/status.ts';

const MODES = ['average', 'lightness', 'luminosity'] as const;

const mount: Mount = (el, ctx) => {
  // Three canvases in the full view, one in a card that steps through the modes.
  const stage = filterStage(el, ctx, ctx.preview ? undefined : MODES);
  const say = status(stage);
  // mode picks the grey formula: the mean of r, g, b; the mean of min and max; or weighted by eye sensitivity.
  const shots: Shot[] = stage.panes.map((pane, i) => {
    const s = shot(stage, 'fruit', pane);
    s.show([new filters.Grayscale({ mode: MODES[i]! })]);
    return s;
  });

  if (stage.bar) {
    select(stage.bar, 'picture', ['fruit', 'portrait', 'city', 'landscape'] as const, (kind) => {
      for (const s of shots) s.setPicture(kind);
    });
  } else {
    say(`Grayscale({ mode: 'average' })`);
    cycle(stage, MODES, (mode) => {
      shots[0]!.show([new filters.Grayscale({ mode })]);
      say(`Grayscale({ mode: '${mode}' })`);
    });
  }
  return stage.dispose;
};

export default mount;
