// Treemaps from indented sections and valued leaves, with classDef styling and value formats
import type { Mount } from '@/types.ts';
import { playground } from '../../shared/playground.ts';

// Quoted names nest by indentation; a leaf has a `: value`, which sets its area.
const PRODUCTS = `treemap-beta
"Products"
    "Electronics"
        "Phones": 50
        "Computers": 30
        "Accessories": 20
    "Clothing"
        "Men's": 40
        "Women's": 40`;

// valueFormat uses D3 format specifiers: '$0,0' prints dollars with thousands separators.
const BUDGET = `---
config:
  treemap:
    valueFormat: '$0,0'
---
treemap-beta
"Budget"
    "Operations"
        "Salaries": 700000
        "Equipment": 200000
        "Supplies": 100000
    "Marketing"
        "Advertising": 400000
        "Events": 100000`;

// :::class applies a classDef to a branch.
const STYLED = `treemap-beta
"Main"
    "A": 20
    "B":::important
        "B1": 10
        "B2": 15
    "C": 5

classDef important fill:#f96,stroke:#333,stroke-width:2px;`;

// A percentage format turns fractions into shares.
const SHARES = `---
config:
  treemap:
    valueFormat: '$.1%'
---
treemap-beta
"Market Share"
    "Company A": 0.35
    "Company B": 0.25
    "Company C": 0.15
    "Others": 0.25`;

const mount: Mount = (el, ctx) =>
  playground(el, ctx, {
    variants: [
      { label: 'Budget with $ format', code: BUDGET },
      { label: 'Product tree', code: PRODUCTS },
      { label: 'classDef branch', code: STYLED },
      { label: 'Percent format', code: SHARES },
    ],
  });

export default mount;
