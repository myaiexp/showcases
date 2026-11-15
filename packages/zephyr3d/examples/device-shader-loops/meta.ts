// zephyr3d example: Shader loops: for, while and do-while
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Shader loops: for, while and do-while',
  summary:
    'One Julia-set iteration generated three ways with the shader builder: $for with a loop variable, $while, and $do followed by $while, each leaving early with $break. Switching the loop style gives an identical picture.',
  section: 'Device API',
  tags: ['$for', '$while', '$do', '$break', '$if', 'pb.main', 'screenProgram'],
  docs: ['repo/apps/doc/web/en/shader.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
