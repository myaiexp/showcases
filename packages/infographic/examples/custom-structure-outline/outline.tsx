/** @jsxImportSource @antv/infographic */
// Outline: nested children, one row each, indented by level
import type { BaseStructureProps, ComponentType, ItemDatum, JSXElement } from '@antv/infographic';
import { FlexLayout, getElementBounds, getThemeColors, Group, ItemsGroup, Rect } from '@antv/infographic';

export interface OutlineProps extends BaseStructureProps {
  indent?: number;
  rowGap?: number;
}

export const Outline: ComponentType<OutlineProps> = (props) => {
  const { Title, Items, data, options, indent = 32, rowGap = 8 } = props;
  const { title, desc, items = [] } = data;
  const color = getThemeColors({}, options).colorPrimary;

  const itemElements: JSXElement[] = [];
  const decor: JSXElement[] = [];
  let y = 0;

  // One row per node; the level picks the component, the last one repeats for deeper levels.
  const place = (datum: ItemDatum, indexes: number[]) => {
    const level = indexes.length - 1;
    const Item = (Items[level] ?? Items[Items.length - 1]) as (typeof Items)[number];
    const bounds = getElementBounds(<Item indexes={indexes} data={data} datum={datum} />);
    const x = level * indent;
    itemElements.push(<Item indexes={indexes} data={data} datum={datum} x={x} y={y} />);
    if (level > 0) decor.push(<Rect x={x - indent / 2} y={y + bounds.height / 2 - 1} width={indent / 2 - 6} height={2} fill={color} opacity={0.6} />);
    y += bounds.height + rowGap;
    (datum.children ?? []).forEach((child: ItemDatum, i: number) => place(child, [...indexes, i]));
  };
  items.forEach((root, i) => place(root, [i]));

  return (
    <FlexLayout id="infographic-container" flexDirection="column" justifyContent="center" alignItems="center">
      {Title ? <Title title={title} desc={desc} /> : null}
      <Group>
        <Group>{decor}</Group>
        <ItemsGroup>{itemElements}</ItemsGroup>
      </Group>
    </FlexLayout>
  );
};
