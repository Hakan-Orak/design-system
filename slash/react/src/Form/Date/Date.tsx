import "@axa-fr/design-system-slash-css/dist/Form/Date/Date.scss";
import { ComponentPropsWithRef, forwardRef, useMemo } from "react";
import { getComponentClassName } from "../../utilities";

type Props = Omit<ComponentPropsWithRef<"input">, "value"> & {
  classModifier?: string;
  defaultValue?: Date;
  value?: Date;
};

const formatDateValue = (dateValue: Date) => {
  const formattedDateValue = new globalThis.Date(dateValue);
  const monthFormatted = `0${formattedDateValue.getMonth() + 1}`.slice(-2);
  const dayFormatted = `0${formattedDateValue.getDate()}`.slice(-2);
  return `${formattedDateValue.getFullYear()}-${monthFormatted}-${dayFormatted}`;
};

const Date = forwardRef<HTMLInputElement, Props>(
  ({ className, classModifier, defaultValue, value, ...otherProps }, ref) => {
    const componentClassName = getComponentClassName(
      className,
      classModifier,
      "af-form__input-date",
    );

    const currentValue = useMemo(() => {
      return value ? formatDateValue(value) : undefined;
    }, [value]);

    const currentDefaultValue = useMemo(() => {
      return defaultValue ? formatDateValue(defaultValue) : undefined;
    }, [defaultValue]);

    return (
      <input
        className={componentClassName}
        type="date"
        defaultValue={currentDefaultValue}
        value={currentValue}
        ref={ref}
        disabled={classModifier?.includes("disabled")}
        required={classModifier?.includes("required")}
        {...otherProps}
      />
    );
  },
);

Date.displayName = "Date";

export { Date };
