/** @jsxImportSource @antv/infographic */
// SwatchItem: one coloured chip per themeColors field, with its name
import type { BaseItemProps, ComponentType } from '@antv/infographic';
import { getItemProps, Group, ItemLabel, Rect, Text } from '@antv/infographic';

export interface SwatchItemProps extends BaseItemProps {
  width?: number;
}

const FIELDS = [
  'colorPrimary',
  'colorPrimaryBg',
  'colorPrimaryText',
  'colorText',
  'colorTextSecondary',
  'colorBgElevated',
] as const;

export const SwatchItem: ComponentType<SwatchItemProps> = (props) => {
  const [{ indexes, datum, themeColors, width = 120 }, restProps] = getItemProps(props, ['width']);
  const row = 22;
  return (
    <Group {...restProps}>
      <ItemLabel indexes={indexes} width={width} fill={themeColors.colorText} alignHorizontal="center">
        {datum.label}
      </ItemLabel>
      {FIELDS.map((field, i) => (
        <Group y={32 + i * (row + 4)}>
          <Rect width={row} height={row} rx={5} fill={themeColors[field]} stroke={themeColors.colorTextSecondary} strokeWidth={0.5} />
          <Text x={row + 6} width={width - row - 6} height={row} fontSize={10} alignVertical="middle" fill={themeColors.colorText}>
            {field.replace('color', '')}
          </Text>
        </Group>
      ))}
    </Group>
  );
};
