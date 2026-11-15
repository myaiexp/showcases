/** @jsxImportSource @antv/infographic */
// A custom item made of an ItemLabel and an ItemValue with a formatter prop
import { Group, ItemLabel, ItemValue, getItemProps, registerItem } from '@antv/infographic';
import type { BaseItemProps } from '@antv/infographic';

export const ITEM = 'showcase-component-item-value';

interface ValueItemProps extends BaseItemProps {
  formatter?: (value: number) => string | number;
  fontSize?: number;
}

const ValueItem = (props: ValueItemProps) => {
  const [{ indexes, datum, formatter, fontSize = 22, themeColors }, rest] = getItemProps(props, ['formatter', 'fontSize']);
  return (
    <Group {...rest}>
      <ItemLabel indexes={indexes} width={120} alignHorizontal="center" fill={themeColors.colorText}>
        {datum.label}
      </ItemLabel>
      <ItemValue indexes={indexes} y={30} width={120} alignHorizontal="center" value={datum.value ?? 0} formatter={formatter} fontSize={fontSize} fill={themeColors.colorPrimary} fontWeight="bold" />
    </Group>
  );
};

registerItem(ITEM, { component: ValueItem as never, composites: ['label', 'value'] });
