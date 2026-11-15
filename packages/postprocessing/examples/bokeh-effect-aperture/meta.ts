// postprocessing example: Bokeh effect: aperture and maxBlur
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Bokeh effect: aperture and maxBlur',
  summary:
    "In BokehEffect a bigger aperture blurs everything outside the sharp band harder, like a wider lens opening. maxBlur puts a ceiling on that blur, so the far end of the corridor stops smearing at some point.",
  section: 'Depth of Field',
  tags: ['BokehEffect', 'aperture', 'maxBlur', 'uniforms'],
  docs: ['repo/README.md', 'repo/src/effects/BokehEffect.js', 'repo/src/effects/glsl/bokeh.frag'],
  provenance: 'pure',
  added: '2026-11-15',
});
