// config locale: number and date formats follow a locale given in the config
import type { Config, Spec } from "vega";
import type { Mount } from "@/types.ts";
import { modes } from "../../shared/spec-kit.ts";
import { createStage } from "../../shared/stage.ts";

type Mode = "default (en-US)" | "config locale (de-DE)";

const german: Config = {
  locale: {
    number: {
      decimal: ",",
      thousands: ".",
      grouping: [3],
      currency: ["", " €"],
    },
    time: {
      dateTime: "%A, der %e. %B %Y, %X",
      date: "%d.%m.%Y",
      time: "%H:%M:%S",
      periods: ["AM", "PM"],
      days: [
        "Sonntag",
        "Montag",
        "Dienstag",
        "Mittwoch",
        "Donnerstag",
        "Freitag",
        "Samstag",
      ],
      shortDays: ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"],
      months: [
        "Januar",
        "Februar",
        "März",
        "April",
        "Mai",
        "Juni",
        "Juli",
        "August",
        "September",
        "Oktober",
        "November",
        "Dezember",
      ],
      shortMonths: [
        "Jan",
        "Feb",
        "Mrz",
        "Apr",
        "Mai",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Okt",
        "Nov",
        "Dez",
      ],
    },
  },
};

const mount: Mount = async (el, ctx) => {
  const stage = createStage(el, ctx);
  const sales = [
    12400, 15800, 14100, 21700, 26300, 24900, 31200, 29800, 33500, 38100, 41600,
    47250,
  ];
  const rows = sales.map((v, i) => ({ t: Date.UTC(2024, i, 15), v }));

  const make = (mode: Mode): Spec => ({
    width: 380,
    height: 150,
    padding: 8,
    config: mode === "default (en-US)" ? {} : german,
    data: [{ name: "table", values: rows }],
    scales: [
      {
        name: "x",
        type: "utc",
        domain: { data: "table", field: "t" },
        range: "width",
        padding: 14,
      },
      { name: "y", domain: [0, 50000], range: "height" },
    ],
    // Axis labels and the text mark below all format through the view's locale.
    axes: [
      { orient: "bottom", scale: "x", format: "%b", tickCount: "month" },
      { orient: "left", scale: "y", format: ",.0f", tickCount: 5 },
    ],
    marks: [
      {
        type: "line",
        from: { data: "table" },
        encode: {
          enter: {
            x: { scale: "x", field: "t" },
            y: { scale: "y", field: "v" },
            stroke: { value: "orange" },
            strokeWidth: { value: 2.5 },
          },
        },
      },
      {
        type: "text",
        encode: {
          enter: {
            x: { value: 70 },
            y: { value: 12 },
            text: {
              signal:
                "format(47250.5, '$,.2f') + '   ' + utcFormat(datetime(2024, 11, 24), '%A, %e. %B %Y')",
            },
          },
        },
      },
    ],
  });

  await modes(
    stage,
    ["default (en-US)", "config locale (de-DE)"] as Mode[],
    make,
    { label: "locale", ms: 2400 },
  );
  return () => stage.dispose();
};

export default mount;
