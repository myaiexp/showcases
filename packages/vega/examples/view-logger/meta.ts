// vega example: View: Logger
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'View: A Custom Logger',
  summary:
    'A hand-made logger object handed to the View: expression calls to warn, info and debug, and Vega\'s own messages, are filtered by view.logLevel and printed in a console drawn inside the chart instead of the browser console.',
  section: 'View API',
  tags: ['view.logger', 'view.logLevel', 'expression.warn', 'expression.info', 'expression.debug'],
  docs: ['repo/docs/docs/api/view.md', 'repo/docs/docs/api/util.md', 'repo/docs/docs/expressions.md'],
  provenance: 'pure',
  added: '2026-11-15',
});
