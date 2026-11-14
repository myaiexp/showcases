// upload-with-progress-recipe example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Upload a file with a progress bar",
  summary:
    "A small uploadFile(file) helper sends one file and reports whole percentages as it goes. A queue of files uploads one after the other, each with its own bar, and the helper returns where the server stored it.",
  section: 'Recipes',
  tags: ['formData', 'onUpload', 'progress', 'post', 'json'],
  docs: ['repo/RECIPES.md', 'repo/src/addons/progress.ts', 'repo/src/addons/formData.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
