// ER attribute types ending in ?, unicode entity names and markdown formatting in names
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// A type that ends in ? marks an optional (nullable) attribute.
const OPTIONAL = `erDiagram
    PERSON {
        string firstName
        string? middleName
        string lastName
    }`;

// Optional types sit beside keys and comments, and work with the other type characters (digits, brackets).
const KEYS = `erDiagram
    CUSTOMER ||--o{ ORDER : places
    CUSTOMER {
        int id PK
        string name
        string? phone "only if they gave one"
        varchar(100)? nickname
    }
    ORDER {
        int id PK
        int customerId FK
        date? shippedAt
        float[]? weights
    }`;

// Unicode in entity names, attribute names and relationship labels.
const UNICODE = `erDiagram
    "This ❤ Unicode"
    "顧客" ||--o{ "注文" : "出す"
    "顧客" {
        string 名前
        int 年齢
    }`;

// Markdown inside a quoted name: bold and italics render.
const MARKDOWN = `erDiagram
    "This **is** _Markdown_"
    "Quoted names can have spaces" ||--|| "**Bold** parent" : "_has_"`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Optional types', code: OPTIONAL },
      { label: 'Beside keys and comments', code: KEYS },
      { label: 'Unicode', code: UNICODE },
      { label: 'Markdown', code: MARKDOWN },
    ],
  });

export default mount;
