// Labels: labelResolution sets how many segments each text curve gets, close up
import Globe from 'globe.gl';
import type { Mount } from '@/types.ts';
import { slider } from '../../shared/controls.ts';
import { createStage } from '../../shared/stage.ts';
import { texture } from '../../shared/textures.ts';

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx, {
    panes: ['labelResolution 1', 'labelResolution 12'],
    hint: 'Both globes show the same text, zoomed in. The low-resolution one turns every curve into a few straight edges.',
  });
  const dark = await texture('dark');

  // The same big label in each pane; the data is copied so the globes never share objects.
  const spec = (resolution: number, pane: (typeof stage.panes)[number]) => {
    const globe = stage.own(new Globe(pane.container), pane)
      .globeImageUrl(dark)
      .labelsData([{ lat: 0, lng: 0, text: 'Sg8' }])
      .labelSize(3)
      .labelIncludeDot(false)
      .labelColor(() => '#7fd1ff')
      .labelResolution(resolution);
    globe.pointOfView({ lat: 0, lng: 0, altitude: 0.35 });
    return globe;
  };
  const low = spec(1, stage.panes[0]!);
  const high = spec(12, stage.panes[1]!);

  if (stage.bar) {
    slider(stage.bar, 'Left globe resolution', 1, 12, 1, 1, (v) => low.labelResolution(v));
  }
  // Sway the camera a little so the card is not a still frame.
  if (stage.preview) {
    stage.loop((_dt, t) => {
      const pov = { lat: 1.5 * Math.sin(t * 0.7), lng: 1.5 * Math.sin(t * 0.45), altitude: 0.35 };
      low.pointOfView(pov);
      high.pointOfView(pov);
    });
  }

  return stage.dispose;
};

export default mount;
