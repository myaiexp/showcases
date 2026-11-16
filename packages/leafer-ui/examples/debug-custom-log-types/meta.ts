// leafer-ui example: Debug: custom log types, filter and exclude
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Debug: custom log types, filter and exclude",
  summary: "Debug.get('Name') makes a logger of your own; Debug.enable, filter, exclude and showWarn decide what is printed. Each step sets the options, calls the loggers and shows the lines that reached the console (options are put back straight after).",
  section: "Utilities",
  tags: ["Debug", "Debug.get", "enable", "filter", "exclude", "showWarn"],
  docs: ["pages/www-leaferjs-com/ui/en/reference/debug/basic.md"],
  provenance: 'pure',
  added: '2026-11-16',
});
