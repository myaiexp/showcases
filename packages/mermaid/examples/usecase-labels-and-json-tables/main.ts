// Use case diagrams: label forms, Markdown strings with line breaks, entity codes and JSON tables
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Unquoted labels are taken literally, so markers, digits, punctuation and non-ASCII stay as typed.
const UNQUOTED = `usecase-beta
actor Analyst(*Analyst*)
Literal(**Literal markers**)
Priced[Costs 19.95 EUR — VAT included!]
Analyst -- files R&D report --> Literal
Analyst --> Priced`;

// Mermaid Markdown strings use "\`...\`": formatting works and a physical newline is a line break.
const MARKDOWN = `usecase-beta
actor Reviewer("\`*Reviewer*\`")
Literal("**Literal markers**")
Formatted("\`**Formatted label**
with a physical line break\`")
Reviewer -- "\`opens **form**\`" --> Formatted
Reviewer --> Literal`;

// Entity codes put reserved characters in a label: #quot; for a double quote, #40; and #41; for parentheses.
const ENTITIES = `usecase-beta
actor User
Quoted("Show #quot;quoted#quot; text")
Parens("Call support #40;24/7#41;")
User --> Quoted
User --> Parens`;

// A json declaration is a table titled by its identifier; nested leaves get paths like address.city.
const JSON_TABLE = `usecase-beta
Inspect("Inspect payload")
json Payload@{
  "2": "second in source",
  "1": "first after 2",
  "enabled": true,
  "count": 3,
  "missing": null,
  "colors": ["Red", "Green"],
  "address": { "city": "Oslo" },
  "items": [{ "name": "Book" }],
  "emptyObject": {},
  "emptyArray": []
}:::data
Inspect --> Payload
classDef data stroke:#3572a5
style Payload stroke-width:2px`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Unquoted labels', code: UNQUOTED },
      { label: 'Markdown strings', code: MARKDOWN },
      { label: 'Entity codes', code: ENTITIES },
      { label: 'JSON table', code: JSON_TABLE },
    ],
  });

export default mount;
