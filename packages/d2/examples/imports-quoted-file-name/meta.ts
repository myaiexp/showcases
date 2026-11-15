// d2 example: Import a file with dots in its name
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Import a file with dots in its name",
  summary:
    "Because `.` in an import targets an object inside the file, a file named schema-v0.1.2.d2 is imported as `@\"schema-v0.1.2\"`. Unquoted, D2 looks for a file schema-v0 and fails, as the second variant shows.",
  section: "Imports",
  tags: ["import", "quotes"],
  docs: [
    "repo/docs/tour/imports.md",
  ],
  provenance: 'pure',
  added: '2026-11-15',
});
