// format.parse: leave CSV fields as text, infer types with "auto", or name the type of each field
import type { Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "no parse" | "parse: auto" | "parse: explicit";

// A CSV string as `values`: "other data types (such as CSV strings) may be used, subject to the format settings".
const csv = `id,price,when,flag
1,9.5,2024-03-01,true
2,12,2024-06-15,false
3,7.25,2024-09-30,true
4,31,2024-12-24,false`;

const formats: Record<Mode, object> = {
  "no parse": { type: "csv" },
  "parse: auto": { type: "csv", parse: "auto" },
  "parse: explicit": {
    type: "csv",
    parse: { id: "number", price: "number", when: "date", flag: "boolean" },
  },
};

// What kind of value a cell holds, as an expression.
const kind = (f: string): string =>
  `isString(datum.${f}) ? 'string' : isNumber(datum.${f}) ? 'number' : isDate(datum.${f}) ? 'date' : isBoolean(datum.${f}) ? 'boolean' : '?'`;

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const fields = ["id", "price", "when", "flag"];

  const make = (mode: Mode): Spec => ({
    width: 400,
    height: 150,
    padding: 8,
    data: [
      {
        name: "rows",
        values: csv as unknown as object[], // the docs allow a CSV/TSV string here; the Spec type only lists arrays and objects
        format: formats[mode] as never,
        transform: [{ type: "window", ops: ["row_number"], as: ["n"] }],
      },
    ],
    marks: [
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 0 },
            y: { value: 10 },
            fill: { value: "#e0b252" },
            text: { value: `format: ${JSON.stringify(formats[mode])}` },
            fontSize: { value: 10 },
          },
        },
      },
      ...fields.flatMap((f, c) => [
        {
          type: "text" as const,
          encode: {
            enter: {
              x: { value: c * 104 },
              y: { value: 38 },
              fill: { value: "#aaa" },
              fontWeight: { value: "bold" as const },
              text: { value: f },
            },
          },
        },
        {
          type: "text" as const,
          from: { data: "rows" },
          encode: {
            update: {
              x: { value: c * 104 },
              y: { signal: "38 + datum.n * 26" },
              // Each cell shows its value and, after it, the type Vega gave it.
              text: {
                signal: `(isDate(datum.${f}) ? utcFormat(datum.${f}, '%Y-%m-%d') : datum.${f}) + '  ' + (${kind(f)})`,
              },
              fill: { signal: `isString(datum.${f}) ? '#ddd' : '#6ec6a5'` },
              fontSize: { value: 11 },
            },
          },
        },
      ]),
    ],
  });

  await modes(stage, Object.keys(formats) as Mode[], make, {
    label: "format.parse",
    ms: 2500,
  });
  return () => stage.dispose();
};

export default mount;
