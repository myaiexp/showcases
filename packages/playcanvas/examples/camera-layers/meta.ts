// playcanvas example: Camera layers
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Camera layers",
  summary:
    "A camera renders only the layers in its layers list. A ghost lives on one custom layer and a marker on another, and two side by side cameras each see the shared World layer plus just one of them; the full view adds the missing layers to each camera.",
  section: "Graphics: Cameras",
  tags: ["layers","Layer","LayerComposition.push","render layers"],
  docs: ["repo/docs/user-manual/graphics/cameras/multiple-cameras.md"],
  provenance: 'pure',
  added: '2026-11-14',
});
