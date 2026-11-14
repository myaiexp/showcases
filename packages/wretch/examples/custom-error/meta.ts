// custom-error example metadata
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Read the error the server explained",
  summary:
    ".customError() reads the JSON in an error response and merges it into the error, so catchers can use error.code and error.message. The details appear in an alert box.",
  section: "Helper methods",
  tags: ["customError", "catcher"],
  docs: ["repo/README.md", "repo/src/types.ts"],
  provenance: 'pure',
  added: '2026-11-14',
});
