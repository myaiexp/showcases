// vega example: Utilities: Logger Levels
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Utilities: Logger Levels',
  summary:
    'The five log level constants and a grid showing which of error, warn, info and debug a logger writes at each level, plus level() as a getter and setter.',
  section: 'Util',
  tags: ['util.logger', 'util.None', 'util.Warn', 'util.Info', 'util.Debug'],
  docs: ['repo/docs/docs/api/util.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
