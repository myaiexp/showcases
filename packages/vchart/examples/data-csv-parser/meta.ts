// vchart example: CSV text as a data source
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: 'CSV text as a data source',
  summary:
    'A data entry takes CSV text when its parser type is csv, then a fold transform flattens the columns. The full view edits the CSV in a text area and pushes it with updateData and the csv parser option; the card alternates two CSV strings.',
  section: 'Concepts: Series, Marks and Data',
  tags: ['data.values string', 'parser: csv', 'fold', 'updateData', 'IParserOptions'],
  docs: ['repo/docs/assets/guide/en/tutorial_docs/Chart_Concepts/Data/Data_Types_and_Interface.md', 'repo/docs/assets/option/en/common/data.md', 'repo/docs/assets/api/en/API/vchart.md'],
  provenance: 'pure',
  added: '2026-11-14',
});
