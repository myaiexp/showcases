// playcanvas example: Logging from a script
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Logging from a script',
  summary:
    "The console is the first debugging tool: an ESM script logs with console.log for status, info for events, warn for suspicious values, error for failures and debug for verbose detail, each with the entity name and the value that matters, and only on the frame a condition changes. A walker chases an orbiting target; a negative speed warns once a second, crossing the 0.4 distance logs a debug line, and deleting the target makes initialize log an error and disable the script. Every message is also mirrored over the canvas, coloured by level; in the full view the real browser console gets them too.",
  section: 'Debugging and Optimization',
  tags: ['Script', 'console.log', 'console.warn', 'console.error', 'console.info', 'console.debug', 'initialize', 'update', 'KEY_SPACE'],
  docs: ['repo/docs/user-manual/debugging/console-logging.md', 'repo/docs/user-manual/debugging/index.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
