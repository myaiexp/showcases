// babylon-js example: Material plugins on a single material
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Material plugins on a single material',
  summary:
    'Two MaterialPluginBase subclasses inject GLSL into StandardMaterial shaders: one at CUSTOM_FRAGMENT_MAIN_END turns the result grey, the other declares tint and time uniforms in the UBO, binds them in bindForSubMesh and darkens moving scanlines, toggled through its define. Both are instantiated with one material each instead of registered for every material.',
  section: 'Materials',
  tags: ['MaterialPluginBase', 'getCustomCode', 'getUniforms', 'bindForSubMesh', 'prepareDefines'],
  docs: ['repo/content/features/featuresDeepDive/materials/using/materialPlugins.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
