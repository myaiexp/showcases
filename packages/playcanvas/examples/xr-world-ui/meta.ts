// playcanvas example: World-space UI in XR
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'World-space UI in XR',
  summary:
    "In XR there is no flat screen, so an interface is a world-space screen in the scene. This one is 800 by 500 units at a scale of 0.001, which makes it 80 by 50 centimetres, an arm's length from the viewer. Its buttons are ordinary button elements: a controller or hand ray hovers them and a select clicks them, firing selectenter, selectleave and click, so the same listeners work with the mouse here. A label shows what the pointer is on, and the readout lists each input source's elementEntity in a session.",
  section: 'XR',
  tags: ['ScreenComponent', 'screenSpace: false', 'ElementInput', 'selectenter', 'selectleave', 'elementEntity', 'elementInput', 'ButtonComponent'],
  docs: ['repo/docs/user-manual/user-interface/xr.md', 'repo/docs/user-manual/xr/input-sources.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
