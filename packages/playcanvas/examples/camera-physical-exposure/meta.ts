// playcanvas example: Physical exposure
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Physical exposure",
  summary:
    "With scene.physicalUnits on, lights are in lux and the camera exposes like a real one: aperture, shutter and sensitivity decide the brightness. Cards open and close the aperture; the full view has sliders for all three and a switch back to scene.exposure.",
  section: "Graphics: Cameras",
  tags: ["physicalUnits","aperture","shutter","sensitivity","exposure","luminance"],
  docs: ["repo/docs/user-manual/graphics/cameras/tone-mapping.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
