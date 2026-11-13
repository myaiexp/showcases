// Sample editor text: syntax-coloured runs with tabs and newlines
import type { Run } from './paint.ts';

export const REGULAR = '400 13px "JetBrains Mono"';
const BOLD = '700 13px "JetBrains Mono"';
export const FONTS = [REGULAR, BOLD];
export const LINE_HEIGHT = 20;

const plain = (text: string): Run => ({ text, font: REGULAR });
const keyword = (text: string): Run => ({ text, font: BOLD, cls: 'kw' });
const string = (text: string): Run => ({ text, font: REGULAR, cls: 'str' });
const comment = (text: string): Run => ({ text, font: REGULAR, cls: 'com' });

export const PIECES: Run[] = [
  comment('// greet everyone on the list\n'),
  keyword('function'),
  plain(' greet(names) {\n\t'),
  keyword('const'),
  plain(' prefix = '),
  string('"Hello, "'),
  plain(';\n\t'),
  keyword('for'),
  plain(' ('),
  keyword('const'),
  plain(' name '),
  keyword('of'),
  plain(' names) {\n\t\tconsole.log(prefix + name + '),
  string('"!"'),
  plain('); '),
  comment('// one line each'),
  plain('\n\t}\n}\n'),
];
