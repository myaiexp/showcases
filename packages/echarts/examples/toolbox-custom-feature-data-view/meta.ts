// echarts example: Toolbox custom tool and dataView content
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'Toolbox custom tool and dataView content',
  summary:
    'A toolbox with two user-defined tools (shuffle the data, sort the bars) next to a dataView whose panel is a table of editable numbers. Switch to the default textarea, make it read-only, or relabel its buttons.',
  section: 'Option: Components',
  tags: ['toolbox', 'feature', 'myTool', 'onclick', 'icon', 'dataView', 'optionToContent', 'contentToOption', 'readOnly', 'lang'],
  docs: ['repo/en/option/component/toolbox.md', 'repo/contents/en/best-practices/security.md'],
  provenance: 'pure',
  added: '2026-11-13',
});
