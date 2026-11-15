// postprocessing example: ShaderPass input uniform name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'ShaderPass: the input uniform name',
  summary:
    'A posterising ShaderMaterial reads its picture from a uniform called tDiffuse. ShaderPass.input tells the pass which uniform gets the input buffer; with the default name the pass finds no such uniform and the material samples an empty texture.',
  section: 'Passes',
  tags: ['ShaderPass', 'input', 'setInput', 'ShaderMaterial', 'uniforms'],
  docs: ['repo/src/passes/ShaderPass.js', 'repo/src/passes/Pass.js'],
  provenance: 'pure',
  added: '2026-11-15',
});
