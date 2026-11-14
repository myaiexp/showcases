// multipart-profile-update example metadata for the wretch package
import { defineMeta } from '@/types.ts';

export default defineMeta({
  title: "Send a profile with an avatar",
  summary:
    "Saving a profile sends an id, nested details and a picture in one request. By default the nested details become [object Object]; recursive: true unpacks them but loses the picture; recursive: ['avatar'] keeps both.",
  section: 'Recipes',
  tags: ['formData', 'recursive', 'post', 'File'],
  docs: ['repo/RECIPES.md', 'repo/src/addons/formData.ts'],
  provenance: 'pure',
  added: '2026-11-14',
});
