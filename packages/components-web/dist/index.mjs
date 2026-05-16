// src/components/Button/Button.tsx
import React from "react";
import { clsx } from "clsx";
import { jsx, jsxs } from "react/jsx-runtime";
var Button = React.forwardRef(
  ({ className, size = "default-size", variant = "default", icon, leftIcon, rightIcon, children, ...props }, ref) => {
    const resolvedVariant = variant === "default" ? "secondary" : variant === "text" ? "text-secondary" : variant;
    const leadingIcon = leftIcon != null ? leftIcon : icon;
    return /* @__PURE__ */ jsxs(
      "button",
      {
        ref,
        className: clsx(
          "xds-btn",
          `xds-btn--${size}`,
          `xds-btn--${resolvedVariant}`,
          className
        ),
        ...props,
        children: [
          leadingIcon ? /* @__PURE__ */ jsx("span", { className: "xds-btn__icon xds-btn__icon--left", children: leadingIcon }) : null,
          variant === "icon" ? null : children,
          rightIcon ? /* @__PURE__ */ jsx("span", { className: "xds-btn__icon xds-btn__icon--right", children: rightIcon }) : null
        ]
      }
    );
  }
);
Button.displayName = "Button";

// src/components/Charts/Charts.tsx
import React2 from "react";
import { clsx as clsx2 } from "clsx";
import { jsx as jsx2, jsxs as jsxs2 } from "react/jsx-runtime";
function readVar(name) {
  if (typeof window === "undefined") return "";
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim();
}
function getCategoricalColors() {
  return [
    readVar("--data-chart-1b"),
    readVar("--data-chart-2"),
    readVar("--data-chart-3"),
    readVar("--data-chart-4"),
    readVar("--data-chart-7"),
    readVar("--data-chart-8"),
    readVar("--data-chart-9")
  ].filter(Boolean);
}
function getCategoricalColorsWithPrimary() {
  return [
    readVar("--data-chart-1a"),
    readVar("--data-chart-2"),
    readVar("--data-chart-3"),
    readVar("--data-chart-4"),
    readVar("--data-chart-7"),
    readVar("--data-chart-8"),
    readVar("--data-chart-9")
  ].filter(Boolean);
}
function getSequentialColors() {
  return [
    readVar("--data-chart-1a"),
    readVar("--data-chart-1b"),
    readVar("--data-chart-2"),
    readVar("--data-chart-3"),
    readVar("--data-chart-4"),
    readVar("--data-chart-5"),
    readVar("--data-chart-6"),
    readVar("--data-chart-7"),
    readVar("--data-chart-8"),
    readVar("--data-chart-9")
  ].filter(Boolean);
}
function getWaterfallColors() {
  return {
    positive: readVar("--data-chart-8"),
    negative: readVar("--data-chart-9")
  };
}
var DEFAULT_LINE_VALUES = [
  { month: "1\u6708", value: 22, series: "\u7CFB\u52171" },
  { month: "2\u6708", value: 13, series: "\u7CFB\u52171" },
  { month: "3\u6708", value: 25, series: "\u7CFB\u52171" },
  { month: "4\u6708", value: 29, series: "\u7CFB\u52171" },
  { month: "5\u6708", value: 38, series: "\u7CFB\u52171" },
  { month: "6\u6708", value: 32, series: "\u7CFB\u52171" },
  { month: "7\u6708", value: 35, series: "\u7CFB\u52171" },
  { month: "1\u6708", value: 18, series: "\u7CFB\u52172" },
  { month: "2\u6708", value: 25, series: "\u7CFB\u52172" },
  { month: "3\u6708", value: 18, series: "\u7CFB\u52172" },
  { month: "4\u6708", value: 32, series: "\u7CFB\u52172" },
  { month: "5\u6708", value: 28, series: "\u7CFB\u52172" },
  { month: "6\u6708", value: 35, series: "\u7CFB\u52172" },
  { month: "7\u6708", value: 29, series: "\u7CFB\u52172" }
];
var DEFAULT_BAR_VALUES = [
  { category: "\u4EA7\u54C1A", value: 200 },
  { category: "\u4EA7\u54C1B", value: 150 },
  { category: "\u4EA7\u54C1C", value: 120 },
  { category: "\u4EA7\u54C1D", value: 80 },
  { category: "\u4EA7\u54C1E", value: 70 }
];
var DEFAULT_BAR_HORIZONTAL_VALUES = [
  { category: "\u5546\u5BB6\u81EA\u64AD+\u4EE3\u64AD", value: 290 },
  { category: "\u8FBE\u4EBA\u4E00\u5E26\u591A", value: 230 },
  { category: "\u8FBE\u4EBA\u4E00\u5E26\u591A2", value: 200 },
  { category: "\u8FBE\u4EBA\u4E00\u5E26\u4E00", value: 170 },
  { category: "\u670D\u52A1\u5546\u4EE3\u64AD", value: 150 }
];
var DEFAULT_PIE_VALUES = [
  { type: "\u76F4\u64AD", value: 35 },
  { type: "\u89C6\u9891", value: 25 },
  { type: "\u5546\u54C1", value: 20 },
  { type: "\u5176\u4ED6", value: 20 }
];
var DEFAULT_SCATTER_VALUES = Array.from({ length: 30 }, (_, i) => ({
  x: i + Math.random() * 6,
  y: 20 + Math.random() * 60,
  series: i % 3 === 0 ? "\u7CFB\u5217A" : i % 3 === 1 ? "\u7CFB\u5217B" : "\u7CFB\u5217C"
}));
var DEFAULT_WATERFALL_VALUES = [
  { name: "\u521D\u59CB", value: 100 },
  { name: "\u589E\u52A0A", value: 30 },
  { name: "\u589E\u52A0B", value: 20 },
  { name: "\u51CF\u5C11A", value: -25 },
  { name: "\u51CF\u5C11B", value: -10 },
  { name: "\u6700\u7EC8", value: 115 }
];
function getLineSpec(values) {
  return {
    type: "line",
    data: [{ id: "lineData", values: (values == null ? void 0 : values.length) ? values : DEFAULT_LINE_VALUES }],
    xField: "month",
    yField: "value",
    seriesField: "series",
    color: { type: "ordinal", range: getCategoricalColors() },
    point: { visible: true, size: 6 },
    line: { style: { lineWidth: 2 } },
    crosshair: { xField: { visible: true } },
    tooltip: { visible: true }
  };
}
function getBarSpec(values) {
  return {
    type: "bar",
    data: [{ id: "barData", values: (values == null ? void 0 : values.length) ? values : DEFAULT_BAR_VALUES }],
    xField: "category",
    yField: "value",
    seriesField: "category",
    color: { type: "ordinal", range: getCategoricalColorsWithPrimary() },
    crosshair: { yField: { visible: true } },
    tooltip: { visible: true }
  };
}
function getBarHorizontalSpec(values) {
  return {
    type: "bar",
    data: [{ id: "barhData", values: (values == null ? void 0 : values.length) ? values : DEFAULT_BAR_HORIZONTAL_VALUES }],
    xField: "value",
    yField: "category",
    direction: "horizontal",
    seriesField: "category",
    color: { type: "ordinal", range: getSequentialColors() },
    tooltip: { visible: true }
  };
}
function getPieSpec(values) {
  return {
    type: "pie",
    data: [{ id: "pieData", values: (values == null ? void 0 : values.length) ? values : DEFAULT_PIE_VALUES }],
    valueField: "value",
    categoryField: "type",
    outerRadius: 0.8,
    innerRadius: 0.5,
    color: { type: "ordinal", range: getCategoricalColorsWithPrimary() },
    tooltip: { visible: true },
    legends: { visible: true, position: "right" }
  };
}
function getScatterSpec(values) {
  return {
    type: "scatter",
    data: [{ id: "scatterData", values: (values == null ? void 0 : values.length) ? values : DEFAULT_SCATTER_VALUES }],
    xField: "x",
    yField: "y",
    seriesField: "series",
    color: { type: "ordinal", range: getCategoricalColors() },
    tooltip: { visible: true }
  };
}
function getWaterfallSpec(values) {
  const colors = getWaterfallColors();
  return {
    type: "waterfall",
    data: [{ id: "waterfallData", values: (values == null ? void 0 : values.length) ? values : DEFAULT_WATERFALL_VALUES }],
    xField: "name",
    yField: "value",
    total: { type: "end" },
    bar: {
      style: {
        fill: (datum) => datum.value >= 0 ? colors.positive : colors.negative
      }
    },
    tooltip: { visible: true }
  };
}
function getSpecByType(type, values) {
  switch (type) {
    case "line":
      return getLineSpec(values);
    case "bar":
      return getBarSpec(values);
    case "bar-horizontal":
      return getBarHorizontalSpec(values);
    case "pie":
      return getPieSpec(values);
    case "scatter":
      return getScatterSpec(values);
    case "waterfall":
      return getWaterfallSpec(values);
    default:
      return getBarSpec(values);
  }
}
var Charts = React2.forwardRef(
  ({ className, type = "bar", spec, data, height = 400, emptyText = "VChart \u672A\u52A0\u8F7D", ...props }, ref) => {
    const chartRef = React2.useRef(null);
    React2.useEffect(() => {
      var _a, _b;
      const container = chartRef.current;
      const Constructor = window.VChart;
      if (!container || !Constructor) return;
      const finalSpec = spec != null ? spec : getSpecByType(type, data);
      const chart = new Constructor(finalSpec, { dom: container });
      (_a = chart.renderSync) == null ? void 0 : _a.call(chart);
      (_b = chart.render) == null ? void 0 : _b.call(chart);
      return () => {
        var _a2;
        return (_a2 = chart.release) == null ? void 0 : _a2.call(chart);
      };
    }, [spec, type, data]);
    return /* @__PURE__ */ jsxs2("div", { className: clsx2("xds-chart", className), ...props, children: [
      /* @__PURE__ */ jsx2(
        "div",
        {
          ref: (node) => {
            chartRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          },
          className: "xds-chart__canvas",
          style: { height }
        }
      ),
      !window.VChart ? /* @__PURE__ */ jsx2("div", { className: "xds-chart__empty", children: emptyText }) : null
    ] });
  }
);
Charts.displayName = "Charts";

// src/components/Icon/Icon.tsx
import React3 from "react";
import { clsx as clsx3 } from "clsx";
import { jsx as jsx3 } from "react/jsx-runtime";
var Icon = React3.forwardRef(
  ({ name, className, ...props }, ref) => {
    return /* @__PURE__ */ jsx3("svg", { ref, className: clsx3("icon", className), ...props, children: /* @__PURE__ */ jsx3("use", { href: `#${name}` }) });
  }
);
Icon.displayName = "Icon";

// src/components/Capsule/Capsule.tsx
import React4 from "react";
import { clsx as clsx4 } from "clsx";
import { jsx as jsx4, jsxs as jsxs3 } from "react/jsx-runtime";
var Capsule = React4.forwardRef(
  ({ className, size = "default-size", label, disabled, ...props }, ref) => {
    return /* @__PURE__ */ jsxs3("label", { className: clsx4("xds-capsule-wrapper", className, disabled && "is-disabled"), children: [
      /* @__PURE__ */ jsx4("input", { type: "radio", ref, disabled, ...props }),
      /* @__PURE__ */ jsx4("span", { className: clsx4("xds-capsule", `xds-capsule--${size}`), children: label })
    ] });
  }
);
Capsule.displayName = "Capsule";

// src/components/Diagnosis/Diagnosis.tsx
import React5 from "react";
import { clsx as clsx5 } from "clsx";
import { jsx as jsx5, jsxs as jsxs4 } from "react/jsx-runtime";
function renderPart(part, key, onPartClick) {
  var _a, _b, _c;
  if (part.button) {
    return /* @__PURE__ */ jsx5("span", { className: "xds-diagnosis__item-button", children: /* @__PURE__ */ jsx5(
      Button,
      {
        variant: (_a = part.buttonType) != null ? _a : "text-primary",
        size: (_b = part.buttonSize) != null ? _b : "default-size",
        rightIcon: part.iconRight,
        onClick: () => {
          var _a2;
          (_a2 = part.onButtonClick) == null ? void 0 : _a2.call(part, part);
          onPartClick == null ? void 0 : onPartClick(part);
        },
        children: part.text
      }
    ) }, key);
  }
  if (part.link) {
    const classes = clsx5(
      "xds-diagnosis__item-part",
      "xds-diagnosis__item-link",
      part.bold && "is-bold",
      part.color && `is-${part.color}`
    );
    return /* @__PURE__ */ jsx5(
      "a",
      {
        href: (_c = part.link.url) != null ? _c : "#",
        className: classes,
        style: part.customColor ? { color: part.customColor } : void 0,
        onClick: (event) => {
          var _a2, _b2, _c2;
          if (!((_a2 = part.link) == null ? void 0 : _a2.url) || part.link.url === "#") {
            event.preventDefault();
          }
          (_c2 = (_b2 = part.link) == null ? void 0 : _b2.onClick) == null ? void 0 : _c2.call(_b2, event);
          onPartClick == null ? void 0 : onPartClick(part);
        },
        children: part.text
      },
      key
    );
  }
  if (part.title) {
    return /* @__PURE__ */ jsx5("span", { className: "xds-diagnosis__item-title is-inline", children: part.text }, key);
  }
  return /* @__PURE__ */ jsx5(
    "span",
    {
      className: clsx5(
        "xds-diagnosis__item-part",
        part.bold && "is-bold",
        part.color && `is-${part.color}`
      ),
      style: part.customColor ? { color: part.customColor } : void 0,
      children: part.text
    },
    key
  );
}
function renderContent(item, onPartClick) {
  var _a;
  if ((_a = item.parts) == null ? void 0 : _a.length) {
    return item.parts.map((part, index) => renderPart(part, index, onPartClick));
  }
  return item.text;
}
var Diagnosis = React5.forwardRef(
  ({ className, title, cards, buttons = [], layout = "single", onButtonClick, onPartClick, ...props }, ref) => {
    return /* @__PURE__ */ jsxs4("div", { ref, className: clsx5("xds-diagnosis", `xds-diagnosis--${layout}`, className), ...props, children: [
      title ? /* @__PURE__ */ jsx5("div", { className: "xds-diagnosis__title", children: title }) : null,
      /* @__PURE__ */ jsx5("div", { className: "xds-diagnosis__content", children: cards.map((card, cardIndex) => {
        var _a;
        return /* @__PURE__ */ jsxs4("div", { className: "xds-diagnosis__card", children: [
          card.sections.map((section, sectionIndex) => /* @__PURE__ */ jsxs4("section", { className: "xds-diagnosis__section", children: [
            section.title ? /* @__PURE__ */ jsx5("div", { className: "xds-diagnosis__section-title", children: section.title }) : null,
            /* @__PURE__ */ jsx5("ol", { className: "xds-diagnosis__list", children: section.items.map((item, itemIndex) => /* @__PURE__ */ jsxs4("li", { className: "xds-diagnosis__list-item", children: [
              /* @__PURE__ */ jsx5("span", { className: "xds-diagnosis__item-index", children: itemIndex + 1 }),
              /* @__PURE__ */ jsxs4("span", { className: "xds-diagnosis__item-content", children: [
                item.title ? /* @__PURE__ */ jsx5("span", { className: "xds-diagnosis__item-title", children: item.title }) : null,
                renderContent(item, onPartClick)
              ] })
            ] }, itemIndex)) })
          ] }, sectionIndex)),
          ((_a = card.buttons) == null ? void 0 : _a.length) ? /* @__PURE__ */ jsx5("div", { className: "xds-diagnosis__footer", children: card.buttons.map((button, buttonIndex) => {
            var _a2;
            return /* @__PURE__ */ jsx5(
              Button,
              {
                size: "small",
                variant: (_a2 = button.type) != null ? _a2 : "secondary",
                onClick: () => onButtonClick == null ? void 0 : onButtonClick(buttonIndex, button, cardIndex),
                children: button.text
              },
              buttonIndex
            );
          }) }) : null
        ] }, cardIndex);
      }) }),
      buttons.length && layout === "single" ? /* @__PURE__ */ jsx5("div", { className: "xds-diagnosis__footer", children: buttons.map((button, buttonIndex) => {
        var _a;
        return /* @__PURE__ */ jsx5(
          Button,
          {
            size: "small",
            variant: (_a = button.type) != null ? _a : "secondary",
            onClick: () => onButtonClick == null ? void 0 : onButtonClick(buttonIndex, button),
            children: button.text
          },
          buttonIndex
        );
      }) }) : null
    ] });
  }
);
Diagnosis.displayName = "Diagnosis";

// src/components/Dropdown/Dropdown.tsx
import React6 from "react";
import { clsx as clsx6 } from "clsx";
import { jsx as jsx6 } from "react/jsx-runtime";
var Dropdown = React6.forwardRef(
  ({ className, options, value, open = false, closeOnClickOutside = true, onClose, onChange, ...props }, ref) => {
    const innerRef = React6.useRef(null);
    React6.useEffect(() => {
      if (!open || !closeOnClickOutside || !onClose) return;
      const handler = (event) => {
        if (innerRef.current && !innerRef.current.contains(event.target)) {
          onClose();
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [open, closeOnClickOutside, onClose]);
    return /* @__PURE__ */ jsx6(
      "div",
      {
        ref: (node) => {
          innerRef.current = node;
          if (typeof ref === "function") ref(node);
          else if (ref) ref.current = node;
        },
        className: clsx6("xds-dropdown", open && "is-open", className),
        ...props,
        children: /* @__PURE__ */ jsx6("div", { className: "xds-dropdown__list", role: "listbox", children: options.map((option) => {
          const selected = option.value === value;
          return /* @__PURE__ */ jsx6(
            "button",
            {
              type: "button",
              role: "option",
              "aria-selected": selected,
              disabled: option.disabled,
              className: clsx6("xds-dropdown__option", selected && "is-selected"),
              onClick: () => onChange == null ? void 0 : onChange(option.value, option),
              children: option.label
            },
            option.value
          );
        }) })
      }
    );
  }
);
Dropdown.displayName = "Dropdown";

// src/components/Input/Input.tsx
import React7 from "react";
import { clsx as clsx7 } from "clsx";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var Input = React7.forwardRef(
  ({
    className,
    wrapperClassName,
    size = "default-size",
    prefixIcon,
    suffixIcon,
    clearable,
    onClear,
    disabled,
    isFocused,
    error = false,
    type,
    ...props
  }, ref) => {
    const [passwordVisible, setPasswordVisible] = React7.useState(false);
    const hasPasswordToggle = type === "password";
    const renderedType = hasPasswordToggle ? passwordVisible ? "text" : "password" : type;
    return /* @__PURE__ */ jsxs5(
      "div",
      {
        className: clsx7(
          "xds-input-wrapper",
          `xds-input-wrapper--${size}`,
          prefixIcon && "has-prefix",
          (suffixIcon || clearable || hasPasswordToggle) && "has-suffix",
          disabled && "is-disabled",
          isFocused && "is-focused",
          error && "is-error",
          type === "search" && "is-search",
          type === "password" && "is-password",
          wrapperClassName
        ),
        children: [
          prefixIcon && /* @__PURE__ */ jsx7("span", { className: "xds-input__prefix", children: prefixIcon }),
          /* @__PURE__ */ jsx7(
            "input",
            {
              ref,
              className: clsx7("xds-input", className),
              disabled,
              type: renderedType,
              ...props
            }
          ),
          clearable && /* @__PURE__ */ jsx7("button", { type: "button", className: "xds-input__clear", onClick: onClear, "aria-label": "Clear input", children: /* @__PURE__ */ jsx7("span", { "aria-hidden": "true", children: "\xD7" }) }),
          hasPasswordToggle && /* @__PURE__ */ jsx7(
            "button",
            {
              type: "button",
              className: "xds-input__toggle",
              onClick: () => setPasswordVisible((current) => !current),
              "aria-label": passwordVisible ? "Hide password" : "Show password",
              children: /* @__PURE__ */ jsx7(Icon, { name: "ic-hide-line" })
            }
          ),
          suffixIcon && /* @__PURE__ */ jsx7("span", { className: "xds-input__suffix", children: suffixIcon })
        ]
      }
    );
  }
);
Input.displayName = "Input";

// src/components/Filter/Filter.tsx
import React8 from "react";
import { clsx as clsx8 } from "clsx";
import { jsx as jsx8, jsxs as jsxs6 } from "react/jsx-runtime";
var getDefaultRightIconName = (type) => {
  if (type === "select") return "ic-arrow-down-line";
  if (type === "date") return "ic-calendar-line";
  if (type === "time") return "ic-time-round-line";
  return null;
};
var isFilledValue = (value) => {
  if (value === null || value === void 0) return false;
  if (typeof value === "string") return value.trim().length > 0;
  return true;
};
var Filter = React8.forwardRef((props, ref) => {
  const {
    size = "default-size",
    label,
    placeholder,
    disabled = false,
    isActive = false,
    rightIcon,
    width
  } = props;
  if (props.type === "input") {
    const { className: className2, value: value2, defaultValue, onChange, inputProps, style: style2, ...rest2 } = props;
    const filled2 = isFilledValue(value2 != null ? value2 : defaultValue);
    return /* @__PURE__ */ jsxs6(
      "div",
      {
        ref,
        className: clsx8(
          "xds-filter",
          `xds-filter--${size}`,
          "xds-filter--input",
          {
            "is-disabled": disabled,
            "is-active": isActive,
            "is-filled": filled2
          },
          className2
        ),
        style: { ...width !== void 0 ? { width } : null, ...style2 },
        onMouseDown: (e) => {
          var _a;
          if ((_a = e.target) == null ? void 0 : _a.closest("input")) return;
          const input = e.currentTarget.querySelector("input");
          input == null ? void 0 : input.focus();
        },
        ...rest2,
        children: [
          /* @__PURE__ */ jsx8("span", { className: "xds-filter__label", children: label }),
          /* @__PURE__ */ jsx8("span", { className: "xds-filter__divider", "aria-hidden": "true" }),
          /* @__PURE__ */ jsx8("span", { className: "xds-filter__control", children: /* @__PURE__ */ jsx8(
            "input",
            {
              className: "xds-filter__input",
              disabled,
              value: value2,
              defaultValue,
              placeholder: typeof placeholder === "string" ? placeholder : void 0,
              onChange: (e) => onChange == null ? void 0 : onChange(e.target.value, e),
              ...inputProps
            }
          ) })
        ]
      }
    );
  }
  const { type, className, value, onClick, style, ...rest } = props;
  const filled = isFilledValue(value);
  const defaultIconName = getDefaultRightIconName(type);
  const iconNode = rightIcon != null ? rightIcon : defaultIconName ? /* @__PURE__ */ jsx8(Icon, { name: defaultIconName, className: "xds-filter__icon-svg", "aria-hidden": "true" }) : null;
  return /* @__PURE__ */ jsxs6(
    "button",
    {
      ref,
      type: "button",
      className: clsx8(
        "xds-filter",
        `xds-filter--${size}`,
        `xds-filter--${type}`,
        {
          "is-disabled": disabled,
          "is-active": isActive,
          "is-filled": filled
        },
        className
      ),
      style: { ...width !== void 0 ? { width } : null, ...style },
      disabled,
      onClick,
      ...rest,
      children: [
        /* @__PURE__ */ jsx8("span", { className: "xds-filter__label", children: label }),
        /* @__PURE__ */ jsx8("span", { className: "xds-filter__divider", "aria-hidden": "true" }),
        /* @__PURE__ */ jsx8("span", { className: "xds-filter__control", children: /* @__PURE__ */ jsx8("span", { className: "xds-filter__value", children: filled ? value : placeholder != null ? placeholder : value }) }),
        iconNode ? /* @__PURE__ */ jsx8("span", { className: "xds-filter__icon", children: iconNode }) : null
      ]
    }
  );
});
Filter.displayName = "Filter";

// src/components/FilterGroup/FilterGroup.tsx
import React9 from "react";
import { clsx as clsx9 } from "clsx";
import { Fragment, jsx as jsx9, jsxs as jsxs7 } from "react/jsx-runtime";
var FilterGroup = React9.forwardRef(
  ({
    className,
    size = "small",
    minItemWidth = 294,
    gap = 12,
    onQuery,
    onReset,
    showActions,
    actions,
    queryText = "\u67E5\u8BE2",
    resetText = "\u91CD\u7F6E",
    children,
    style,
    ...props
  }, ref) => {
    const shouldShowDefaultActions = Boolean(showActions != null ? showActions : onQuery || onReset);
    const shouldRenderActionsRow = Boolean(actions || shouldShowDefaultActions);
    return /* @__PURE__ */ jsxs7(
      "div",
      {
        ref,
        className: clsx9("xds-filter-group", className),
        style: {
          ...style,
          // CSS vars for responsive grid behaviour.
          ["--xds-filter-group-min-item-width"]: `${minItemWidth}px`,
          ["--xds-filter-group-gap"]: `${gap}px`
        },
        ...props,
        children: [
          /* @__PURE__ */ jsx9("div", { className: "xds-filter-group__grid", children }),
          shouldRenderActionsRow ? /* @__PURE__ */ jsx9("div", { className: "xds-filter-group__actions-row", children: actions ? actions : /* @__PURE__ */ jsxs7(Fragment, { children: [
            onQuery ? /* @__PURE__ */ jsx9(Button, { variant: "secondary", size, onClick: onQuery, children: queryText }) : null,
            onReset ? /* @__PURE__ */ jsx9(Button, { variant: "default", size, onClick: onReset, children: resetText }) : null
          ] }) }) : null
        ]
      }
    );
  }
);
FilterGroup.displayName = "FilterGroup";

// src/components/Loading/Loading.tsx
import React10 from "react";
import { clsx as clsx10 } from "clsx";
import { jsx as jsx10, jsxs as jsxs8 } from "react/jsx-runtime";
var Loading = React10.forwardRef(
  ({ className, size = "default-size", text, minHeight = 200, style, ...props }, ref) => {
    return /* @__PURE__ */ jsxs8("div", { ref, className: clsx10("xds-loading", className), style: { minHeight, ...style }, ...props, children: [
      /* @__PURE__ */ jsx10("span", { className: clsx10("xds-loading__spinner", `xds-loading__spinner--${size}`), "aria-hidden": "true", children: /* @__PURE__ */ jsx10("span", { className: "xds-loading__spinner-circle" }) }),
      text ? /* @__PURE__ */ jsx10("span", { className: "xds-loading__text", children: text }) : null
    ] });
  }
);
Loading.displayName = "Loading";

// src/components/MetricCard/MetricCard.tsx
import React11 from "react";
import { clsx as clsx11 } from "clsx";
import { jsx as jsx11, jsxs as jsxs9 } from "react/jsx-runtime";
function getMetricValue(metric) {
  if (typeof metric.value === "object" && metric.value !== null && "value" in metric.value) {
    return metric.value;
  }
  return { value: metric.value };
}
var MetricCard = React11.forwardRef(
  ({
    className,
    title,
    value,
    currency,
    unit,
    metrics = [],
    theme = "color-1",
    size = "default-size",
    selected = false,
    showInfo = false,
    arrowDirection = "bottom",
    clickable,
    onClick,
    children,
    ...props
  }, ref) => {
    const isClickable = clickable !== void 0 ? clickable : Boolean(onClick);
    return /* @__PURE__ */ jsxs9(
      "button",
      {
        ref,
        type: "button",
        onClick,
        className: clsx11(
          "xds-metric-card",
          `xds-metric-card--theme-${theme}`,
          `xds-metric-card--${size}`,
          isClickable && "is-clickable",
          selected && "is-selected",
          `xds-metric-card--arrow-${arrowDirection}`,
          className
        ),
        ...props,
        children: [
          /* @__PURE__ */ jsxs9("div", { className: "xds-metric-card__content", children: [
            /* @__PURE__ */ jsx11("div", { className: "xds-metric-card__header", children: /* @__PURE__ */ jsxs9("div", { className: "xds-metric-card__title-wrap", children: [
              /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__title", children: title }),
              showInfo ? /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__info", "aria-hidden": "true", children: /* @__PURE__ */ jsx11(Icon, { name: "ic-question-line" }) }) : null
            ] }) }),
            /* @__PURE__ */ jsxs9("div", { className: "xds-metric-card__body", children: [
              /* @__PURE__ */ jsxs9("div", { className: "xds-metric-card__value-row", children: [
                currency ? /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__currency", children: currency }) : null,
                /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__value", children: value }),
                unit ? /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__unit", children: unit }) : null
              ] }),
              metrics.length ? /* @__PURE__ */ jsx11("div", { className: "xds-metric-card__metrics", children: metrics.map((metric, index) => {
                const metricValue = getMetricValue(metric);
                return /* @__PURE__ */ jsxs9("div", { className: "xds-metric-card__metric", children: [
                  metric.label ? /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__metric-label", children: metric.label }) : null,
                  /* @__PURE__ */ jsx11(
                    "span",
                    {
                      className: clsx11(
                        "xds-metric-card__metric-value",
                        metricValue.type && metricValue.type !== "default" && `is-${metricValue.type}`
                      ),
                      children: metricValue.value
                    }
                  )
                ] }, index);
              }) }) : null,
              children
            ] })
          ] }),
          /* @__PURE__ */ jsx11("span", { className: "xds-metric-card__arrow", "aria-hidden": "true", children: /* @__PURE__ */ jsx11("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "12", viewBox: "0 0 32 12", fill: "none", children: /* @__PURE__ */ jsx11(
            "path",
            {
              d: "M31.25 -7.75V0.75H25.9229C24.4799 0.75 23.1143 1.40549 22.2129 2.53223L16.9766 9.0791C16.4762 9.70461 15.5238 9.70461 15.0234 9.0791L9.78711 2.53223C8.88569 1.40549 7.5201 0.75 6.07715 0.75H0.75V-7.75H31.25Z",
              fill: "currentColor",
              stroke: "currentColor",
              strokeWidth: "1.5"
            }
          ) }) })
        ]
      }
    );
  }
);
MetricCard.displayName = "MetricCard";
var MetricCardGroup = React11.forwardRef(
  ({ className, cards, value, defaultValue, selectable = true, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React11.useState(defaultValue);
    const activeValue = value !== void 0 ? value : internalValue;
    const handleSelect = (nextValue) => {
      if (!selectable) return;
      if (value === void 0) {
        setInternalValue(nextValue);
      }
      onChange == null ? void 0 : onChange(nextValue);
    };
    return /* @__PURE__ */ jsx11("div", { ref, className: clsx11("xds-metric-card-group", className), ...props, children: cards.map(({ id, onClick, clickable, ...card }) => /* @__PURE__ */ jsx11(
      MetricCard,
      {
        ...card,
        clickable: clickable !== void 0 ? clickable : selectable,
        selected: id === activeValue,
        onClick: selectable ? (event) => {
          handleSelect(id);
          onClick == null ? void 0 : onClick(event);
        } : onClick
      },
      id
    )) });
  }
);
MetricCardGroup.displayName = "MetricCardGroup";

// src/components/Tabs/Tabs.tsx
import React12, { createContext, useContext, useState } from "react";
import { clsx as clsx12 } from "clsx";
import { jsx as jsx12 } from "react/jsx-runtime";
var TabsContext = createContext({});
var Tabs = React12.forwardRef(
  ({ className, variant = "primary", size = "small", defaultValue, value, onChange, children, ...props }, ref) => {
    const [internalValue, setInternalValue] = useState(defaultValue);
    const activeValue = value !== void 0 ? value : internalValue;
    const handleChange = (newValue) => {
      if (value === void 0) {
        setInternalValue(newValue);
      }
      onChange == null ? void 0 : onChange(newValue);
    };
    return /* @__PURE__ */ jsx12(TabsContext.Provider, { value: { activeValue, onChange: handleChange }, children: /* @__PURE__ */ jsx12(
      "div",
      {
        ref,
        className: clsx12("xds-tabs", `xds-tabs--${variant}`, `xds-tabs--${size}`, className),
        ...props,
        children
      }
    ) });
  }
);
Tabs.displayName = "Tabs";
var Tab = React12.forwardRef(
  ({ className, value, active, disabled, children, onClick, ...props }, ref) => {
    const context = useContext(TabsContext);
    const isActive = value !== void 0 && context.activeValue === value || active;
    const handleClick = (e) => {
      var _a;
      if (disabled) {
        e.preventDefault();
        return;
      }
      if (value !== void 0) {
        (_a = context.onChange) == null ? void 0 : _a.call(context, value);
      }
      onClick == null ? void 0 : onClick(e);
    };
    return /* @__PURE__ */ jsx12(
      "a",
      {
        ref,
        className: clsx12("xds-tab", isActive && "is-active", disabled && "is-disabled", className),
        onClick: handleClick,
        ...props,
        children
      }
    );
  }
);
Tab.displayName = "Tab";

// src/components/TabNav/TabNav.tsx
import React13 from "react";
import { clsx as clsx13 } from "clsx";
import { jsx as jsx13, jsxs as jsxs10 } from "react/jsx-runtime";
var TabNav = React13.forwardRef(
  ({ className, items = [], value, defaultValue, size = "default-size", onChange, rightContent, ...props }, ref) => {
    var _a;
    const [internalValue, setInternalValue] = React13.useState(defaultValue != null ? defaultValue : (_a = items[0]) == null ? void 0 : _a.value);
    const activeValue = value !== void 0 ? value : internalValue;
    const handleSelect = (nextValue, disabled) => {
      if (disabled) return;
      if (value === void 0) {
        setInternalValue(nextValue);
      }
      onChange == null ? void 0 : onChange(nextValue);
    };
    return /* @__PURE__ */ jsxs10("div", { ref, className: clsx13("xds-tab-nav", `xds-tab-nav--${size}`, className), ...props, children: [
      /* @__PURE__ */ jsx13("div", { className: "xds-tab-nav__items", role: "tablist", children: items.map((item) => {
        const active = item.value === activeValue;
        return /* @__PURE__ */ jsx13(
          "button",
          {
            type: "button",
            role: "tab",
            "aria-selected": active,
            disabled: item.disabled,
            className: clsx13("xds-tab-nav__item", active && "is-active"),
            onClick: () => handleSelect(item.value, item.disabled),
            children: item.label
          },
          item.value
        );
      }) }),
      rightContent ? /* @__PURE__ */ jsx13("div", { className: "xds-tab-nav__right", children: rightContent }) : null
    ] });
  }
);
TabNav.displayName = "TabNav";

// src/components/Navbar/Navbar.tsx
import React14 from "react";
import { clsx as clsx14 } from "clsx";
import { jsx as jsx14, jsxs as jsxs11 } from "react/jsx-runtime";
var Navbar = React14.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsxs11("div", { ref, className: clsx14("xds-navbar", className), ...props, children: [
    /* @__PURE__ */ jsx14("div", { className: "xds-navbar__left", children: /* @__PURE__ */ jsx14("div", { className: "xds-navbar__logo", "aria-label": "\u6765\u5BA2 Logo", children: /* @__PURE__ */ jsx14("span", { className: "xds-navbar__logo-image", "aria-hidden": "true" }) }) }),
    /* @__PURE__ */ jsxs11("div", { className: "xds-navbar__middle", children: [
      /* @__PURE__ */ jsx14("div", { className: "xds-navbar__search", children: /* @__PURE__ */ jsx14(
        Input,
        {
          size: "default-size",
          prefixIcon: /* @__PURE__ */ jsx14(Icon, { name: "ic-search-line" }),
          placeholder: "\u4F60\u53EF\u4EE5\u95EE\uFF1A\u5728\u54EA\u91CC\u4FEE\u6539\u5B98\u65B9\u6296\u97F3\u53F7",
          readOnly: true
        }
      ) }),
      /* @__PURE__ */ jsxs11("nav", { className: "xds-navbar__nav", children: [
        /* @__PURE__ */ jsx14("a", { href: "#", className: "xds-navbar__nav-item is-active", children: "\u9996\u9875" }),
        /* @__PURE__ */ jsx14("a", { href: "#", className: "xds-navbar__nav-item", children: "\u751F\u610F\u7ECF" }),
        /* @__PURE__ */ jsx14("a", { href: "#", className: "xds-navbar__nav-item", children: "\u672C\u5730\u63A8" }),
        /* @__PURE__ */ jsx14("a", { href: "#", className: "xds-navbar__nav-item", children: "\u5B66\u4E60\u4E2D\u5FC3" })
      ] })
    ] }),
    /* @__PURE__ */ jsxs11("div", { className: "xds-navbar__right", children: [
      /* @__PURE__ */ jsxs11("div", { className: "xds-navbar__action", children: [
        /* @__PURE__ */ jsx14(Icon, { name: "ic-reset-line" }),
        /* @__PURE__ */ jsx14("span", { children: "\u8FD4\u56DE\u65E7\u7248" })
      ] }),
      /* @__PURE__ */ jsx14("div", { className: "xds-navbar__divider" }),
      /* @__PURE__ */ jsxs11("div", { className: "xds-navbar__action", children: [
        /* @__PURE__ */ jsx14(Icon, { name: "ic-mobile-line" }),
        /* @__PURE__ */ jsx14("span", { children: "App\u4E0B\u8F7D" })
      ] }),
      /* @__PURE__ */ jsx14("div", { className: "xds-navbar__divider" }),
      /* @__PURE__ */ jsxs11("div", { className: "xds-navbar__user", children: [
        /* @__PURE__ */ jsx14("div", { className: "xds-navbar__avatar xds-navbar__avatar--preset", "aria-hidden": "true", children: "85" }),
        /* @__PURE__ */ jsxs11("div", { className: "xds-navbar__user-info", children: [
          /* @__PURE__ */ jsx14("span", { className: "xds-navbar__username", children: "\u5317\u4EAC\u516B\u5341\u4E94\u5EA6..." }),
          /* @__PURE__ */ jsx14(Icon, { name: "ic-arrow-down-line" })
        ] })
      ] })
    ] })
  ] })
);
Navbar.displayName = "Navbar";

// src/components/Menu/Menu.tsx
import React15, { useState as useState2 } from "react";
import { clsx as clsx15 } from "clsx";
import { jsx as jsx15, jsxs as jsxs12 } from "react/jsx-runtime";
var DEFAULT_MENU_GROUPS = [
  {
    key: "common",
    title: "\u5E38\u7528",
    icon: "ic-all-line",
    items: [
      { key: "common-store-management", label: "\u95E8\u5E97\u7BA1\u7406" },
      { key: "common-group-buy-product-management", label: "\u56E2\u8D2D\u5546\u54C1\u7BA1\u7406" },
      { key: "common-store-decoration", label: "\u5E97\u94FA\u88C5\u4FEE" },
      { key: "common-review-management", label: "\u8BC4\u4EF7\u7BA1\u7406" }
    ]
  },
  {
    key: "store",
    title: "\u5E97\u94FA",
    icon: "ic-store-line",
    items: [
      { key: "store-merchant-info", label: "\u5546\u5BB6\u4FE1\u606F" },
      { key: "store-store-management", label: "\u95E8\u5E97\u7BA1\u7406" },
      { key: "store-area-management", label: "\u533A\u57DF\u7BA1\u7406" },
      { key: "store-auth-management", label: "\u6388\u6743\u7BA1\u7406" },
      { key: "store-qualification-center", label: "\u8D44\u8D28\u4E2D\u5FC3" },
      { key: "store-store-decoration", label: "\u5E97\u94FA\u88C5\u4FEE" },
      { key: "store-cooperation-management", label: "\u5408\u4F5C\u7BA1\u7406" },
      { key: "store-business-center", label: "\u4E1A\u52A1\u4E2D\u5FC3" },
      { key: "store-review-management", label: "\u8BC4\u4EF7\u7BA1\u7406" },
      { key: "store-approval-center", label: "\u5BA1\u6279\u4E2D\u5FC3" },
      { key: "store-service-app-auth", label: "\u670D\u52A1\u5E94\u7528\u6388\u6743" },
      { key: "store-talent-management", label: "\u804C\u4EBA\u7BA1\u7406" },
      { key: "store-official-douyin", label: "\u5B98\u65B9\u6296\u97F3\u53F7" },
      { key: "store-charity-project", label: "\u516C\u76CA\u9879\u76EE" }
    ]
  },
  {
    key: "order",
    title: "\u8BA2\u5355",
    icon: "ic-menu-trade-line",
    items: [
      { key: "order-group-buy-coupon", label: "\u56E2\u8D2D\u5238\u5904\u7406" },
      { key: "order-after-sale", label: "\u552E\u540E\u5904\u7406" }
    ]
  },
  {
    key: "finance",
    title: "\u8D22\u52A1",
    icon: "ic-wallet-line",
    items: [
      { key: "finance-daily-income", label: "\u6BCF\u65E5\u6536\u76CA" },
      { key: "finance-daily-arrival", label: "\u6BCF\u65E5\u5230\u8D26" },
      { key: "finance-withdraw-record", label: "\u63D0\u73B0\u8BB0\u5F55" },
      { key: "finance-service-fee-return", label: "\u670D\u52A1\u8D39\u8FD4\u8FD8\u8FD8" },
      { key: "finance-payment-account", label: "\u6536\u6B3E\u8D26\u6237" },
      { key: "finance-deposit", label: "\u4FDD\u8BC1\u91D1" },
      { key: "finance-relief-loan", label: "\u653E\u5FC3\u501F" },
      { key: "finance-marketing-account", label: "\u8425\u9500\u8D26\u6237" },
      { key: "finance-self-invoice", label: "\u81EA\u52A9\u5F00\u7968" },
      { key: "finance-merchant-invoice", label: "\u5546\u5BB6\u4EA4\u7968" }
    ]
  },
  {
    key: "creator-commerce",
    title: "\u8FBE\u4EBA\u5E26\u8D27",
    icon: "ic-commoditynew-line",
    items: [
      { key: "creator-commerce-store-promotion", label: "\u5168\u5E97\u63A8\u5E7F" },
      { key: "creator-commerce-plan-management", label: "\u8BA1\u5212\u7BA1\u7406" },
      { key: "creator-commerce-creator-square", label: "\u8FBE\u4EBA\u5E7F\u573A" },
      { key: "creator-commerce-ocean-engine-xingtu", label: "\u5DE8\u91CF\u661F\u56FE" }
    ]
  },
  {
    key: "content-promotion",
    title: "\u5185\u5BB9\u63A8\u5E7F",
    icon: "ic-trumpet-line",
    items: [
      { key: "content-promotion-customer-card", label: "\u83B7\u5BA2\u5361" },
      { key: "content-promotion-video-management", label: "\u89C6\u9891\u7BA1\u7406" },
      { key: "content-promotion-live-management", label: "\u76F4\u64AD\u7BA1\u7406" },
      { key: "content-promotion-live-pro", label: "\u76F4\u64AD\u4E13\u4E1A\u7248" },
      { key: "content-promotion-live-assistant", label: "\u76F4\u64AD\u52A9\u624B" },
      { key: "content-promotion-cash-wallet", label: "\u73B0\u91D1\u94B1\u5305" }
    ]
  }
];
var Menu = React15.forwardRef(
  ({
    className,
    activeItemKey,
    defaultActiveItemKey = "store-store-management",
    onItemChange,
    ...props
  }, ref) => {
    const [innerActiveItemKey, setInnerActiveItemKey] = useState2(defaultActiveItemKey);
    const [collapsedMap, setCollapsedMap] = useState2(
      () => Object.fromEntries(DEFAULT_MENU_GROUPS.map((group) => [group.key, Boolean(group.defaultCollapsed)]))
    );
    const effectiveActiveItemKey = activeItemKey != null ? activeItemKey : innerActiveItemKey;
    return /* @__PURE__ */ jsx15("div", { ref, className: clsx15("xds-menu", className), ...props, children: DEFAULT_MENU_GROUPS.map((group) => {
      var _a;
      const collapsed = (_a = collapsedMap[group.key]) != null ? _a : false;
      return /* @__PURE__ */ jsxs12("div", { className: clsx15("xds-menu-group", collapsed && "is-collapsed"), children: [
        /* @__PURE__ */ jsxs12(
          "div",
          {
            className: "xds-menu-group__header",
            onClick: () => setCollapsedMap((prev) => ({
              ...prev,
              [group.key]: !collapsed
            })),
            children: [
              /* @__PURE__ */ jsx15(Icon, { name: group.icon }),
              /* @__PURE__ */ jsx15("span", { className: "xds-menu-group__title", children: group.title }),
              /* @__PURE__ */ jsx15(Icon, { className: "xds-menu-group__action", name: collapsed ? "ic-arrow-down-line" : "ic-arrow-up-line" })
            ]
          }
        ),
        /* @__PURE__ */ jsx15("div", { className: "xds-menu-group__content", children: group.items.map((item) => /* @__PURE__ */ jsx15(
          "div",
          {
            className: clsx15(
              "xds-menu-item",
              item.key === effectiveActiveItemKey && "is-active"
            ),
            onClick: () => {
              if (activeItemKey === void 0) {
                setInnerActiveItemKey(item.key);
              }
              onItemChange == null ? void 0 : onItemChange(item.key);
            },
            children: item.label
          },
          item.key
        )) })
      ] }, group.key);
    }) });
  }
);
Menu.displayName = "Menu";

// src/components/PageHeader/PageHeader.tsx
import React16 from "react";
import { clsx as clsx16 } from "clsx";
import { jsx as jsx16, jsxs as jsxs13 } from "react/jsx-runtime";
var PageHeader = React16.forwardRef(
  ({ className, title, description, tabs, ...props }, ref) => {
    return /* @__PURE__ */ jsxs13("div", { ref, className: clsx16("xds-page-header", className), ...props, children: [
      /* @__PURE__ */ jsxs13("div", { className: "xds-page-header__heading", children: [
        /* @__PURE__ */ jsx16("h1", { className: "xds-page-header__title", children: title }),
        description ? /* @__PURE__ */ jsx16("p", { className: "xds-page-header__description", children: description }) : null
      ] }),
      tabs && /* @__PURE__ */ jsx16("div", { className: "xds-page-header__tabs", children: tabs })
    ] });
  }
);
PageHeader.displayName = "PageHeader";

// src/components/Table/Table.tsx
import React18 from "react";
import { clsx as clsx18 } from "clsx";

// src/components/Tag/Tag.tsx
import React17 from "react";
import { clsx as clsx17 } from "clsx";
import { jsx as jsx17, jsxs as jsxs14 } from "react/jsx-runtime";
var Tag = React17.forwardRef(
  ({
    className,
    size = "default-size",
    variant = "light",
    color = "gray",
    leftIcon,
    rightIcon,
    special,
    children,
    ...props
  }, ref) => {
    const isInteractive = typeof props.onClick === "function";
    return /* @__PURE__ */ jsxs14(
      "span",
      {
        ref,
        className: clsx17(
          "xds-tag",
          `xds-tag--${size}`,
          `xds-tag--${variant}`,
          `xds-tag--${color}`,
          special && `xds-tag--${special}`,
          {
            "xds-tag--interactive": isInteractive,
            "xds-tag--special": Boolean(special)
          },
          className
        ),
        ...props,
        children: [
          leftIcon ? /* @__PURE__ */ jsx17("span", { className: "xds-tag__icon xds-tag__icon--left", children: leftIcon }) : null,
          children ? /* @__PURE__ */ jsx17("span", { className: "xds-tag__content", children }) : null,
          rightIcon ? /* @__PURE__ */ jsx17("span", { className: "xds-tag__icon xds-tag__icon--right", children: rightIcon }) : null
        ]
      }
    );
  }
);
Tag.displayName = "Tag";

// src/components/Table/Table.tsx
import { Fragment as Fragment2, jsx as jsx18, jsxs as jsxs15 } from "react/jsx-runtime";
var NormalTableWrapper = React18.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("div", { ref, className: clsx18("xds-table-wrapper", className), ...props })
);
NormalTableWrapper.displayName = "NormalTableWrapper";
var NormalTable = React18.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("table", { ref, className: clsx18("xds-table", className), ...props })
);
NormalTable.displayName = "NormalTable";
var Thead = React18.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("thead", { ref, className: clsx18("xds-table__thead", className), ...props })
);
Thead.displayName = "Thead";
var Tbody = React18.forwardRef(
  (props, ref) => /* @__PURE__ */ jsx18("tbody", { ref, ...props })
);
Tbody.displayName = "Tbody";
var Tr = React18.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("tr", { ref, className: clsx18("xds-table__row", className), ...props })
);
Tr.displayName = "Tr";
var Th = React18.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("th", { ref, className: clsx18("xds-table__th", className), ...props })
);
Th.displayName = "Th";
var Td = React18.forwardRef(
  ({ className, ...props }, ref) => /* @__PURE__ */ jsx18("td", { ref, className: clsx18("xds-table__td", className), ...props })
);
Td.displayName = "Td";
var TableCellProduct = ({ img, title, tag, tagVariant = "default", id }) => /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell--product", children: [
  /* @__PURE__ */ jsx18("img", { src: img, alt: "\u5546\u54C1\u56FE", className: "xds-table-cell__product-img" }),
  /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell__product-info", children: [
    /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell__product-title-wrap", children: [
      /* @__PURE__ */ jsx18("h4", { className: "xds-table-cell__product-title", children: title }),
      tag && /* @__PURE__ */ jsx18(
        Tag,
        {
          size: "small",
          variant: tagVariant === "default" ? "outline" : "light",
          color: tagVariant === "orange" ? "orange" : tagVariant === "red" ? "red" : "gray",
          children: tag
        }
      )
    ] }),
    /* @__PURE__ */ jsx18("div", { className: "xds-table-cell__product-meta", children: /* @__PURE__ */ jsxs15("span", { className: "xds-table-cell__product-id", children: [
      "\u5546\u54C1ID\uFF1A",
      id
    ] }) })
  ] })
] });
var TableCellAmount = ({ children }) => /* @__PURE__ */ jsx18("div", { className: "xds-table-cell--amount", children });
var TableCellOperation = ({ children }) => /* @__PURE__ */ jsx18("div", { className: "xds-table-cell--operation", children });
var TableCellAction = React18.forwardRef(
  ({ className, danger, ...props }, ref) => /* @__PURE__ */ jsx18("a", { ref, className: clsx18("xds-table-cell__action", danger && "is-danger", className), ...props })
);
TableCellAction.displayName = "TableCellAction";
function getStickyCellStyle(leafIndex, frozenColumnCount) {
  if (leafIndex >= frozenColumnCount) return void 0;
  return {
    left: `${leafIndex * 200}px`
  };
}
function getLeafCount(col) {
  if (!col.children || col.children.length === 0) return 1;
  return col.children.reduce((sum, child) => sum + getLeafCount(child), 0);
}
function getMaxDepth(columns, depth = 1) {
  let max = depth;
  columns.forEach((col) => {
    if (col.children && col.children.length > 0) {
      max = Math.max(max, getMaxDepth(col.children, depth + 1));
    }
  });
  return max;
}
function getLeafColumns(columns) {
  const leaves = [];
  const collect = (cols) => {
    cols.forEach((col) => {
      if (col.children && col.children.length > 0) {
        collect(col.children);
      } else {
        leaves.push(col);
      }
    });
  };
  collect(columns);
  return leaves;
}
function collectLevelColumns(columns, targetDepth, level, maxDepth, currentDepth, leafStartIndex, parent = null) {
  columns.forEach((col) => {
    col.parent = parent;
    if (currentDepth === targetDepth) {
      const isLeaf = !col.children || col.children.length === 0;
      const colSpan = getLeafCount(col);
      const rowSpan = isLeaf ? maxDepth - currentDepth : 1;
      level.push({
        title: col.title,
        colSpan,
        rowSpan,
        isLeaf,
        originalCol: col,
        leafStartIndex: leafStartIndex.value
      });
      leafStartIndex.value += colSpan;
    } else if (col.children && col.children.length > 0) {
      collectLevelColumns(col.children, targetDepth, level, maxDepth, currentDepth + 1, leafStartIndex, col);
    }
  });
}
function getHeaderLevels(columns) {
  const levels = [];
  const maxDepth = getMaxDepth(columns);
  for (let depth = 0; depth < maxDepth; depth++) {
    const level = [];
    const leafStartIndex = { value: 0 };
    collectLevelColumns(columns, depth, level, maxDepth, 0, leafStartIndex);
    levels.push(level);
  }
  return levels;
}
function isMultiLevel(columns) {
  return columns.some((col) => !!col.children && col.children.length > 0);
}
function renderSubMetrics(subItems) {
  return /* @__PURE__ */ jsx18("div", { className: "xds-table-cell__sub-metrics", children: subItems.map((subItem, index) => {
    let values = [];
    if (Array.isArray(subItem.values)) {
      values = subItem.values.map(
        (v) => typeof v === "object" && v !== null && "value" in v ? v : { value: v }
      );
    } else if (subItem.value !== void 0) {
      const v = subItem.value;
      values = [typeof v === "object" && v !== null && "value" in v ? v : { value: v }];
    }
    if (subItem.type !== void 0) {
      values = values.map((v) => {
        var _a;
        return { ...v, type: (_a = v.type) != null ? _a : subItem.type };
      });
    }
    return /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell__sub-metric-item", children: [
      subItem.label ? /* @__PURE__ */ jsx18("span", { className: "xds-table-cell__sub-metric-label", children: subItem.label }) : null,
      values.map((v, i) => /* @__PURE__ */ jsx18(
        "span",
        {
          className: clsx18("xds-table-cell__sub-metric-value", v.type && v.type !== "default" && `is-${v.type}`),
          children: v.value
        },
        i
      ))
    ] }, index);
  }) });
}
function renderStandardCell(value) {
  if (typeof value === "object" && value !== null) {
    const v = value;
    return /* @__PURE__ */ jsxs15(Fragment2, { children: [
      v.main !== void 0 ? /* @__PURE__ */ jsx18("div", { className: "xds-table-cell__main", children: v.main }) : null,
      v.sub !== void 0 ? Array.isArray(v.sub) ? renderSubMetrics(v.sub) : /* @__PURE__ */ jsx18("div", { className: "xds-table-cell__sub", children: v.sub }) : null
    ] });
  }
  return /* @__PURE__ */ jsx18("div", { className: "xds-table-cell__main", children: value });
}
function renderMetricCell(value) {
  return /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell__metric-wrapper", children: [
    /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell__metric", children: [
      /* @__PURE__ */ jsxs15("div", { className: "xds-table-cell__metric-value-group", children: [
        value.currency ? /* @__PURE__ */ jsx18("span", { className: "xds-table-cell__metric-currency", children: value.currency }) : null,
        value.number !== void 0 ? /* @__PURE__ */ jsx18("span", { className: "xds-table-cell__metric-number", children: value.number }) : null
      ] }),
      value.unit ? /* @__PURE__ */ jsx18("span", { className: "xds-table-cell__metric-unit", children: value.unit }) : null
    ] }),
    value.sub !== void 0 ? Array.isArray(value.sub) ? renderSubMetrics(value.sub) : /* @__PURE__ */ jsx18("div", { className: "xds-table-cell__metric-sub", children: value.sub }) : null
  ] });
}
var Table = React18.forwardRef(
  ({
    className,
    data,
    columns,
    frozenColumnCount = 0,
    multiLevelHeader,
    lastRowBorder = true,
    groupDividerLeafIndices = [],
    ...props
  }, ref) => {
    const internalColumns = columns;
    const useMultiLevel = multiLevelHeader !== void 0 ? multiLevelHeader : isMultiLevel(internalColumns);
    const leafColumns = getLeafColumns(internalColumns);
    const headerLevels = useMultiLevel ? getHeaderLevels(internalColumns) : null;
    return /* @__PURE__ */ jsx18(
      "div",
      {
        ref,
        className: clsx18(
          "xds-table-wrapper",
          "xds-table-container",
          frozenColumnCount > 0 && "has-frozen-column",
          !lastRowBorder && "no-last-row-border",
          className
        ),
        ...props,
        children: /* @__PURE__ */ jsxs15("table", { className: "xds-table", children: [
          /* @__PURE__ */ jsx18("thead", { className: "xds-table__thead", children: useMultiLevel && headerLevels ? headerLevels.map((level, levelIndex) => {
            let currentLeafIndex = 0;
            return /* @__PURE__ */ jsx18("tr", { className: "xds-table__row xds-table__row--head", children: level.map((cell, cellIndex) => {
              const colSpan = cell.colSpan || 1;
              const isFrozen = currentLeafIndex < frozenColumnCount;
              const partiallyFrozen = currentLeafIndex < frozenColumnCount && currentLeafIndex + colSpan > frozenColumnCount;
              const isLastColumn = cellIndex === level.length - 1;
              const isGroupLastLeaf = cell.isLeaf && cell.originalCol.parent && cell.originalCol.parent.children && cell.originalCol.parent.children.indexOf(cell.originalCol) === cell.originalCol.parent.children.length - 1;
              const className2 = clsx18(
                "xds-table__th",
                isFrozen && !partiallyFrozen && "is-frozen",
                cell.isLeaf && "is-leaf-header",
                !isLastColumn && !cell.isLeaf && "has-right-border",
                cell.isLeaf && !isLastColumn && (isGroupLastLeaf || !cell.originalCol.parent) && "has-right-border"
              );
              const th = /* @__PURE__ */ jsx18(
                "th",
                {
                  colSpan,
                  rowSpan: cell.rowSpan || 1,
                  className: className2,
                  style: isFrozen && !partiallyFrozen ? getStickyCellStyle(currentLeafIndex, frozenColumnCount) : void 0,
                  children: cell.title
                },
                cellIndex
              );
              currentLeafIndex += colSpan;
              return th;
            }) }, levelIndex);
          }) : /* @__PURE__ */ jsx18("tr", { className: "xds-table__row xds-table__row--head", children: leafColumns.map((col, colIndex) => /* @__PURE__ */ jsx18(
            "th",
            {
              className: clsx18(
                "xds-table__th",
                "is-leaf-header",
                colIndex < frozenColumnCount && "is-frozen",
                groupDividerLeafIndices.includes(colIndex) && "is-group-divider"
              ),
              style: colIndex < frozenColumnCount ? getStickyCellStyle(colIndex, frozenColumnCount) : void 0,
              children: col.title
            },
            colIndex
          )) }) }),
          /* @__PURE__ */ jsx18("tbody", { className: "xds-table__tbody", children: data.map((row, rowIndex) => /* @__PURE__ */ jsx18("tr", { className: clsx18("xds-table__row", row.isSummary && "is-summary-row"), children: leafColumns.map((col, colIndex) => {
            const value = col.key !== void 0 ? row[col.key] : void 0;
            const cellContent = col.render ? col.render(value, row, rowIndex) : col.isMetric && col.metricStyle === "enhanced" ? renderMetricCell(value) : renderStandardCell(value);
            return /* @__PURE__ */ jsx18(
              "td",
              {
                className: clsx18(
                  "xds-table__td",
                  col.isMetric && col.metricStyle === "enhanced" && "xds-table__metric-cell",
                  colIndex < frozenColumnCount && "is-frozen",
                  groupDividerLeafIndices.includes(colIndex) && "is-group-divider"
                ),
                style: colIndex < frozenColumnCount ? getStickyCellStyle(colIndex, frozenColumnCount) : void 0,
                children: cellContent
              },
              colIndex
            );
          }) }, rowIndex)) })
        ] })
      }
    );
  }
);
Table.displayName = "Table";

// src/components/Checkbox/Checkbox.tsx
import { forwardRef, useState as useState3 } from "react";
import { clsx as clsx19 } from "clsx";
import { jsx as jsx19, jsxs as jsxs16 } from "react/jsx-runtime";
var CHECKED_ICON_PATHS = {
  large: {
    viewBox: "0 0 22 22",
    path: "M14.3926 7.28591C14.7382 6.85522 15.3681 6.78612 15.7989 7.13162C16.2295 7.47719 16.2987 8.10708 15.9532 8.53787L10.8399 14.9129C10.6581 15.1393 10.3869 15.2752 10.0967 15.2859C9.80655 15.2966 9.52606 15.181 9.32815 14.9685L6.26761 11.6814C5.89159 11.2773 5.91449 10.6446 6.31839 10.2683C6.72262 9.89203 7.35614 9.91392 7.73245 10.3181L10.003 12.7576L14.3926 7.28591Z"
  },
  "default-size": {
    viewBox: "0 0 20 20",
    path: "M13.1746 6.48142C13.53 6.05876 14.161 6.00402 14.5837 6.35935C15.0064 6.71475 15.0611 7.34583 14.7058 7.76853L9.76538 13.6435C9.57861 13.8656 9.30457 13.9958 9.01441 14C8.72415 14.0041 8.44572 13.8818 8.25269 13.665L5.69312 10.79C5.32591 10.3775 5.36269 9.74515 5.77515 9.37791C6.18763 9.01074 6.82002 9.04749 7.18726 9.45994L8.97827 11.4717L13.1746 6.48142Z"
  },
  small: {
    viewBox: "0 0 18 18",
    path: "M11.5469 5.93752C11.8574 5.54938 12.4244 5.48639 12.8125 5.79689C13.2006 6.1074 13.2636 6.67438 12.9531 7.06252L8.95312 12.0625C8.79321 12.2624 8.55539 12.3843 8.2998 12.3985C8.04419 12.4126 7.79429 12.3178 7.61327 12.1367L5.11327 9.63674C4.7618 9.28527 4.7618 8.71477 5.11327 8.3633C5.46475 8.01183 6.03524 8.01183 6.38671 8.3633L8.1748 10.1514L11.5469 5.93752Z"
  }
};
var INDETERMINATE_ICON_PATHS = {
  large: {
    viewBox: "0 0 22 22",
    path: "M15.5 10C16.0523 10 16.5 10.4477 16.5 11C16.5 11.5523 16.0523 12 15.5 12H6.5C5.94772 12 5.5 11.5523 5.5 11C5.5 10.4477 5.94772 10 6.5 10H15.5Z"
  },
  "default-size": {
    viewBox: "0 0 20 20",
    path: "M14 9C14.5523 9 15 9.44772 15 10C15 10.5523 14.5523 11 14 11H6C5.44772 11 5 10.5523 5 10C5 9.44772 5.44772 9 6 9H14Z"
  },
  small: {
    viewBox: "0 0 18 18",
    path: "M12 8.25C12.4142 8.25 12.75 8.58579 12.75 9C12.75 9.41421 12.4142 9.75 12 9.75H6C5.58579 9.75 5.25 9.41421 5.25 9C5.25 8.58579 5.58579 8.25 6 8.25H12Z"
  }
};
var Checkbox = forwardRef(
  ({
    className,
    size = "default-size",
    indeterminate = false,
    showLabel = false,
    label,
    checked,
    disabled = false,
    readOnly = false,
    onChange,
    ...props
  }, ref) => {
    const [internalChecked, setInternalChecked] = useState3(() => {
      return Boolean(props.defaultChecked);
    });
    const isControlled = checked !== void 0;
    const currentChecked = isControlled ? checked : internalChecked;
    const iconConfig = indeterminate ? INDETERMINATE_ICON_PATHS[size] : CHECKED_ICON_PATHS[size];
    const handleChange = (e) => {
      if (disabled || readOnly) return;
      if (!isControlled) {
        setInternalChecked(e.target.checked);
      }
      onChange == null ? void 0 : onChange(e);
    };
    return /* @__PURE__ */ jsxs16(
      "label",
      {
        className: clsx19(
          "xds-checkbox",
          `xds-checkbox--${size}`,
          {
            "xds-checkbox--checked": currentChecked && !indeterminate,
            "xds-checkbox--indeterminate": indeterminate,
            "xds-checkbox--disabled": disabled
          },
          className
        ),
        children: [
          /* @__PURE__ */ jsxs16("span", { className: "xds-checkbox__input-wrapper", children: [
            /* @__PURE__ */ jsx19(
              "input",
              {
                type: "checkbox",
                className: "xds-checkbox__input",
                checked: currentChecked,
                disabled,
                readOnly,
                "aria-checked": indeterminate ? "mixed" : currentChecked,
                onChange: handleChange,
                ref,
                ...props
              }
            ),
            /* @__PURE__ */ jsx19("span", { className: "xds-checkbox__inner", children: /* @__PURE__ */ jsx19("span", { className: "xds-checkbox__icon", children: /* @__PURE__ */ jsx19("svg", { viewBox: iconConfig.viewBox, fill: "none", xmlns: "http://www.w3.org/2000/svg", "aria-hidden": "true", children: /* @__PURE__ */ jsx19("path", { d: iconConfig.path, fill: "currentColor" }) }) }) })
          ] }),
          showLabel && label ? /* @__PURE__ */ jsx19("span", { className: "xds-checkbox__label", children: label }) : null
        ]
      }
    );
  }
);
Checkbox.displayName = "Checkbox";

// src/components/Tags/Tags.tsx
import React20 from "react";
import { clsx as clsx20 } from "clsx";
import { jsx as jsx20 } from "react/jsx-runtime";
var Tags = React20.forwardRef(({ className, ...props }, ref) => {
  return /* @__PURE__ */ jsx20("div", { ref, className: clsx20("xds-tags", className), ...props });
});
Tags.displayName = "Tags";

// src/components/Pagination/Pagination.tsx
import React21, { useEffect, useMemo, useState as useState4 } from "react";
import { clsx as clsx21 } from "clsx";
import { jsx as jsx21, jsxs as jsxs17 } from "react/jsx-runtime";
function clampInt(n, min, max) {
  if (!Number.isFinite(n)) return min;
  const x = Math.trunc(n);
  return Math.min(max, Math.max(min, x));
}
function range(start, end) {
  const out = [];
  for (let i = start; i <= end; i += 1) out.push(i);
  return out;
}
function getPageItems(current, totalPages, siblingCount) {
  const totalNumbers = siblingCount * 2 + 5;
  if (totalPages <= totalNumbers) return range(1, totalPages);
  const leftSiblingIndex = Math.max(current - siblingCount, 1);
  const rightSiblingIndex = Math.min(current + siblingCount, totalPages);
  const showLeftEllipsis = leftSiblingIndex > 2;
  const showRightEllipsis = rightSiblingIndex < totalPages - 1;
  const firstPageIndex = 1;
  const lastPageIndex = totalPages;
  if (!showLeftEllipsis && showRightEllipsis) {
    const leftItemCount = 3 + 2 * siblingCount;
    const leftRange = range(1, leftItemCount);
    return [...leftRange, "ellipsis", lastPageIndex];
  }
  if (showLeftEllipsis && !showRightEllipsis) {
    const rightItemCount = 3 + 2 * siblingCount;
    const rightRange = range(totalPages - rightItemCount + 1, totalPages);
    return [firstPageIndex, "ellipsis", ...rightRange];
  }
  const middleRange = range(leftSiblingIndex, rightSiblingIndex);
  return [firstPageIndex, "ellipsis", ...middleRange, "ellipsis", lastPageIndex];
}
var Pagination = React21.forwardRef(
  ({
    className,
    size = "default-size",
    total,
    current,
    defaultCurrent = 1,
    pageSize,
    defaultPageSize,
    pageSizeOptions = [10, 20, 50],
    showSizeChanger = true,
    showQuickJumper = true,
    hideOnSinglePage = true,
    disabled = false,
    siblingCount = 1,
    onChange,
    onPageSizeChange,
    showTotal,
    ...props
  }, ref) => {
    const isPageControlled = current !== void 0;
    const isPageSizeControlled = pageSize !== void 0;
    const [innerCurrent, setInnerCurrent] = useState4(() => defaultCurrent);
    const [innerPageSize, setInnerPageSize] = useState4(() => {
      var _a;
      return (_a = defaultPageSize != null ? defaultPageSize : pageSizeOptions[0]) != null ? _a : 10;
    });
    const [jumpValue, setJumpValue] = useState4("");
    const effectivePageSize = isPageSizeControlled ? pageSize : innerPageSize;
    const totalPages = Math.max(1, Math.ceil(Math.max(0, total) / Math.max(1, effectivePageSize)));
    const effectiveCurrent = clampInt(isPageControlled ? current : innerCurrent, 1, totalPages);
    useEffect(() => {
      if (!isPageControlled && innerCurrent !== effectiveCurrent) {
        setInnerCurrent(effectiveCurrent);
      }
    }, [effectiveCurrent, isPageControlled, totalPages]);
    const items = useMemo(() => {
      return getPageItems(effectiveCurrent, totalPages, siblingCount);
    }, [effectiveCurrent, totalPages, siblingCount]);
    const pageRange = useMemo(() => {
      if (total <= 0) return [0, 0];
      const start = (effectiveCurrent - 1) * effectivePageSize + 1;
      const end = Math.min(total, effectiveCurrent * effectivePageSize);
      return [start, end];
    }, [effectiveCurrent, effectivePageSize, total]);
    const emitChange = (nextPage, nextPageSize) => {
      onChange == null ? void 0 : onChange(nextPage, nextPageSize);
    };
    const setPage = (nextPage) => {
      if (disabled) return;
      const p = clampInt(nextPage, 1, totalPages);
      if (!isPageControlled) setInnerCurrent(p);
      emitChange(p, effectivePageSize);
    };
    const setSize = (nextSize) => {
      if (disabled) return;
      const nextPageSize = Math.max(1, Math.trunc(nextSize));
      if (!isPageSizeControlled) setInnerPageSize(nextPageSize);
      onPageSizeChange == null ? void 0 : onPageSizeChange(nextPageSize);
      if (!isPageControlled) setInnerCurrent(1);
      emitChange(1, nextPageSize);
    };
    const handleQuickJumpCommit = () => {
      if (disabled) return;
      const trimmed = jumpValue.trim();
      if (!trimmed) return;
      const parsed = Number(trimmed);
      if (!Number.isFinite(parsed)) return;
      setPage(parsed);
      setJumpValue("");
    };
    if (hideOnSinglePage && totalPages <= 1) return null;
    const canPrev = effectiveCurrent > 1;
    const canNext = effectiveCurrent < totalPages;
    return /* @__PURE__ */ jsxs17(
      "nav",
      {
        ref,
        className: clsx21("xds-pagination", `xds-pagination--${size}`, className),
        "aria-label": "Pagination",
        ...props,
        children: [
          showTotal ? /* @__PURE__ */ jsx21("span", { className: "xds-pagination__total", children: showTotal(total, pageRange) }) : null,
          /* @__PURE__ */ jsxs17("div", { className: "xds-pagination__pages", children: [
            /* @__PURE__ */ jsx21(
              "button",
              {
                type: "button",
                className: "xds-pagination__arrow xds-pagination__arrow--prev",
                onClick: () => setPage(effectiveCurrent - 1),
                disabled: disabled || !canPrev,
                "aria-label": "Previous Page",
                children: /* @__PURE__ */ jsx21(Icon, { className: "xds-pagination__icon", name: "ic-arrow-left-line", "aria-hidden": "true" })
              }
            ),
            items.map((it, idx) => {
              if (it === "ellipsis") {
                return /* @__PURE__ */ jsx21("span", { className: "xds-pagination__ellipsis", "aria-hidden": "true", children: "..." }, `ellipsis-${idx}`);
              }
              const page = it;
              const isActive = page === effectiveCurrent;
              return /* @__PURE__ */ jsx21(
                "button",
                {
                  type: "button",
                  className: clsx21("xds-pagination__item", isActive && "is-active"),
                  onClick: () => setPage(page),
                  disabled,
                  "aria-current": isActive ? "page" : void 0,
                  "aria-label": `Page ${page}`,
                  children: page
                },
                page
              );
            }),
            /* @__PURE__ */ jsx21(
              "button",
              {
                type: "button",
                className: "xds-pagination__arrow xds-pagination__arrow--next",
                onClick: () => setPage(effectiveCurrent + 1),
                disabled: disabled || !canNext,
                "aria-label": "Next Page",
                children: /* @__PURE__ */ jsx21(Icon, { className: "xds-pagination__icon", name: "ic-arrow-right-line", "aria-hidden": "true" })
              }
            )
          ] }),
          showSizeChanger ? /* @__PURE__ */ jsxs17("div", { className: "xds-pagination__size-changer", children: [
            /* @__PURE__ */ jsx21(
              "select",
              {
                className: "xds-pagination__size-select",
                value: effectivePageSize,
                onChange: (e) => setSize(Number(e.target.value)),
                disabled,
                "aria-label": "Page Size",
                children: pageSizeOptions.map((n) => /* @__PURE__ */ jsxs17("option", { value: n, children: [
                  n,
                  "\u6761/\u9875"
                ] }, n))
              }
            ),
            /* @__PURE__ */ jsxs17("span", { className: "xds-pagination__size-label", children: [
              effectivePageSize,
              "\u6761/\u9875"
            ] }),
            /* @__PURE__ */ jsx21(Icon, { className: "xds-pagination__size-icon", name: "ic-arrow-down-line", "aria-hidden": "true" })
          ] }) : null,
          showQuickJumper ? /* @__PURE__ */ jsxs17("div", { className: "xds-pagination__quick-jumper", children: [
            /* @__PURE__ */ jsx21("span", { className: "xds-pagination__quick-text", children: "\u8DF3\u81F3" }),
            /* @__PURE__ */ jsx21("span", { className: "xds-pagination__quick-input", children: /* @__PURE__ */ jsx21(
              Input,
              {
                size: "small",
                value: jumpValue,
                onChange: (e) => setJumpValue(e.target.value),
                onKeyDown: (e) => {
                  if (e.key === "Enter") handleQuickJumpCommit();
                },
                onBlur: handleQuickJumpCommit,
                disabled,
                inputMode: "numeric",
                pattern: "[0-9]*",
                placeholder: "",
                "aria-label": "Jump To Page"
              }
            ) }),
            /* @__PURE__ */ jsx21("span", { className: "xds-pagination__quick-text", children: "\u9875" })
          ] }) : null
        ]
      }
    );
  }
);
Pagination.displayName = "Pagination";

// src/components/Select/Select.tsx
import React22 from "react";
import { clsx as clsx22 } from "clsx";
import { Fragment as Fragment3, jsx as jsx22, jsxs as jsxs18 } from "react/jsx-runtime";
var Select = React22.forwardRef(
  ({ className, label, placeholder = "\u8BF7\u9009\u62E9", options, value, defaultValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React22.useState(defaultValue);
    const [open, setOpen] = React22.useState(false);
    const containerRef = React22.useRef(null);
    const activeValue = value !== void 0 ? value : internalValue;
    const selectedOption = options.find((option) => option.value === activeValue);
    React22.useEffect(() => {
      const handleDocumentClick = (event) => {
        var _a;
        if (!((_a = containerRef.current) == null ? void 0 : _a.contains(event.target))) {
          setOpen(false);
        }
      };
      document.addEventListener("mousedown", handleDocumentClick);
      return () => document.removeEventListener("mousedown", handleDocumentClick);
    }, []);
    return /* @__PURE__ */ jsxs18(
      "div",
      {
        ref: (node) => {
          containerRef.current = node;
          if (typeof ref === "function") {
            ref(node);
          } else if (ref) {
            ref.current = node;
          }
        },
        className: clsx22("xds-select", open && "is-open", className),
        ...props,
        children: [
          /* @__PURE__ */ jsxs18("button", { type: "button", className: "xds-select__trigger", onClick: () => setOpen((current) => !current), children: [
            label ? /* @__PURE__ */ jsxs18(Fragment3, { children: [
              /* @__PURE__ */ jsx22("span", { className: "xds-select__label", children: label }),
              /* @__PURE__ */ jsx22("span", { className: "xds-select__divider" })
            ] }) : null,
            /* @__PURE__ */ jsx22("span", { className: clsx22("xds-select__value", selectedOption && "has-value"), children: selectedOption ? selectedOption.label : placeholder }),
            /* @__PURE__ */ jsx22("span", { className: "xds-select__arrow", "aria-hidden": "true", children: /* @__PURE__ */ jsx22(Icon, { name: "ic-arrow-down-line" }) })
          ] }),
          /* @__PURE__ */ jsx22("div", { className: "xds-select__dropdown", children: /* @__PURE__ */ jsx22(
            Dropdown,
            {
              options,
              value: activeValue,
              open,
              onChange: (nextValue, option) => {
                if (value === void 0) {
                  setInternalValue(nextValue);
                }
                setOpen(false);
                onChange == null ? void 0 : onChange(nextValue, option);
              }
            }
          ) })
        ]
      }
    );
  }
);
Select.displayName = "Select";

// src/components/TimeFilter/TimeFilter.tsx
import React23 from "react";
import { clsx as clsx23 } from "clsx";
import { jsx as jsx23, jsxs as jsxs19 } from "react/jsx-runtime";
var DEFAULT_STAT_OPTIONS = [
  { value: "7d", label: "\u8FD17\u5929" },
  { value: "30d", label: "\u8FD130\u5929" },
  { value: "week", label: "\u672C\u5468" },
  { value: "month", label: "\u672C\u6708" }
];
var DEFAULT_COMPARE_OPTIONS_MAP = {
  "7d": [
    { value: "last-period", label: "\u4E34\u671F\u73AF\u6BD4" }
  ],
  "30d": [
    { value: "last-period", label: "\u4E34\u671F\u73AF\u6BD4" }
  ],
  week: [
    { value: "last-week", label: "\u8F83\u4E0A\u5468" }
  ],
  month: [
    { value: "last-month", label: "\u8F83\u4E0A\u6708" },
    { value: "last-month-end", label: "\u8F83\u4E0A\u6708\u672B" }
  ],
  custom: [
    { value: "last-period", label: "\u4E34\u671F\u73AF\u6BD4" }
  ]
};
function pad(n) {
  return String(n).padStart(2, "0");
}
function formatDate(date) {
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}
function formatDateRange(start, end) {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const formatShort = (d) => `${pad(d.getMonth() + 1)}.${pad(d.getDate())}`;
  if (start.getFullYear() === currentYear && end.getFullYear() === currentYear) {
    return `${formatShort(start)}-${formatShort(end)}`;
  }
  return `${formatDate(start)}-${formatDate(end)}`;
}
function getStatRange(value, customStart, customEnd) {
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start = null;
  let end = null;
  switch (value) {
    case "7d":
      start = new Date(today);
      start.setDate(start.getDate() - 6);
      end = today;
      break;
    case "30d":
      start = new Date(today);
      start.setDate(start.getDate() - 29);
      end = today;
      break;
    case "week": {
      const dow = today.getDay();
      const offset = dow === 0 ? -6 : 1 - dow;
      start = new Date(today);
      start.setDate(start.getDate() + offset);
      end = today;
      break;
    }
    case "month":
      start = new Date(today.getFullYear(), today.getMonth(), 1);
      end = today;
      break;
    case "custom":
      if (customStart && customEnd) {
        start = customStart;
        end = customEnd;
      }
      break;
  }
  return start && end ? { start, end } : null;
}
function getCompareRange(statValue, compareValue, statCustomStart, statCustomEnd, compareCustomStart, compareCustomEnd) {
  const now = /* @__PURE__ */ new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  let start = null;
  let end = null;
  if (compareValue === "custom") {
    if (compareCustomStart && compareCustomEnd) return { start: compareCustomStart, end: compareCustomEnd };
    return null;
  }
  switch (statValue) {
    case "7d":
      if (compareValue === "last-period") {
        start = new Date(today);
        start.setDate(start.getDate() - 13);
        end = new Date(today);
        end.setDate(end.getDate() - 7);
      }
      break;
    case "30d":
      if (compareValue === "last-period") {
        start = new Date(today);
        start.setDate(start.getDate() - 59);
        end = new Date(today);
        end.setDate(end.getDate() - 30);
      }
      break;
    case "week":
      if (compareValue === "last-week") {
        const dow = today.getDay();
        const offset = dow === 0 ? -6 : 1 - dow;
        start = new Date(today);
        start.setDate(start.getDate() + offset - 7);
        end = new Date(start);
        end.setDate(end.getDate() + 6);
      }
      break;
    case "month":
      if (compareValue === "last-month") {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth() - 1, today.getDate());
      } else if (compareValue === "last-month-end") {
        start = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        end = new Date(today.getFullYear(), today.getMonth(), 0);
      }
      break;
    case "custom":
      if (compareValue === "last-period" && statCustomStart && statCustomEnd) {
        const days = Math.ceil((statCustomEnd.getTime() - statCustomStart.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
        end = new Date(statCustomStart);
        end.setDate(end.getDate() - 1);
        start = new Date(end);
        start.setDate(start.getDate() - days + 1);
      }
      break;
  }
  return start && end ? { start, end } : null;
}
var WEEKDAYS = ["\u65E5", "\u4E00", "\u4E8C", "\u4E09", "\u56DB", "\u4E94", "\u516D"];
var DatePicker = ({ initialStart, initialEnd, onConfirm, onCancel }) => {
  const [currentMonth, setCurrentMonth] = React23.useState(() => initialStart || /* @__PURE__ */ new Date());
  const [start, setStart] = React23.useState(initialStart != null ? initialStart : null);
  const [end, setEnd] = React23.useState(initialEnd != null ? initialEnd : null);
  const [selectingStart, setSelectingStart] = React23.useState(true);
  const year = currentMonth.getFullYear();
  const month = currentMonth.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const prevMonthLastDay = new Date(year, month, 0).getDate();
  const today = React23.useMemo(() => {
    const t = /* @__PURE__ */ new Date();
    t.setHours(0, 0, 0, 0);
    return t;
  }, []);
  const cells = [];
  for (let i = firstDay - 1; i >= 0; i--) {
    cells.push({ date: new Date(year, month - 1, prevMonthLastDay - i), otherMonth: true });
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ date: new Date(year, month, d), otherMonth: false });
  }
  const remaining = 42 - cells.length;
  for (let d = 1; d <= remaining; d++) {
    cells.push({ date: new Date(year, month + 1, d), otherMonth: true });
  }
  const handleDayClick = (date) => {
    const d = new Date(date);
    d.setHours(0, 0, 0, 0);
    if (selectingStart || !start) {
      setStart(d);
      setEnd(null);
      setSelectingStart(false);
    } else {
      if (d < start) {
        setEnd(start);
        setStart(d);
      } else {
        setEnd(d);
      }
      setSelectingStart(true);
    }
  };
  const navMonth = (delta) => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + delta);
    setCurrentMonth(next);
  };
  const navYear = (delta) => {
    const next = new Date(currentMonth);
    next.setFullYear(next.getFullYear() + delta);
    setCurrentMonth(next);
  };
  return /* @__PURE__ */ jsxs19("div", { className: "xds-date-picker-popup", onClick: (e) => e.stopPropagation(), children: [
    /* @__PURE__ */ jsxs19("div", { className: "xds-date-picker__header", children: [
      /* @__PURE__ */ jsxs19("div", { className: "xds-date-picker__nav", children: [
        /* @__PURE__ */ jsx23("button", { type: "button", className: "xds-date-picker__nav-btn", onClick: () => navYear(-1), "aria-label": "\u4E0A\u4E00\u5E74", children: /* @__PURE__ */ jsx23("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M11 17l-5-5 5-5M18 17l-5-5 5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }),
        /* @__PURE__ */ jsx23("button", { type: "button", className: "xds-date-picker__nav-btn", onClick: () => navMonth(-1), "aria-label": "\u4E0A\u4E00\u6708", children: /* @__PURE__ */ jsx23(Icon, { name: "ic-arrow-left-line" }) })
      ] }),
      /* @__PURE__ */ jsx23("div", { className: "xds-date-picker__title", children: `${year}\u5E74 ${month + 1}\u6708` }),
      /* @__PURE__ */ jsxs19("div", { className: "xds-date-picker__nav", children: [
        /* @__PURE__ */ jsx23("button", { type: "button", className: "xds-date-picker__nav-btn", onClick: () => navMonth(1), "aria-label": "\u4E0B\u4E00\u6708", children: /* @__PURE__ */ jsx23(Icon, { name: "ic-arrow-right-line" }) }),
        /* @__PURE__ */ jsx23("button", { type: "button", className: "xds-date-picker__nav-btn", onClick: () => navYear(1), "aria-label": "\u4E0B\u4E00\u5E74", children: /* @__PURE__ */ jsx23("svg", { viewBox: "0 0 24 24", width: "16", height: "16", fill: "none", children: /* @__PURE__ */ jsx23("path", { d: "M13 17l5-5-5-5M6 17l5-5-5-5", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) })
      ] })
    ] }),
    /* @__PURE__ */ jsxs19("div", { className: "xds-date-picker__calendar", children: [
      WEEKDAYS.map((d) => /* @__PURE__ */ jsx23("div", { className: "xds-date-picker__weekday", children: d }, d)),
      cells.map(({ date, otherMonth }, idx) => {
        const isToday = date.toDateString() === today.toDateString();
        const isSelectedStart = start && date.toDateString() === start.toDateString();
        const isSelectedEnd = end && date.toDateString() === end.toDateString();
        const inRange = start && end && date > start && date < end;
        return /* @__PURE__ */ jsx23(
          "button",
          {
            type: "button",
            className: clsx23(
              "xds-date-picker__day",
              otherMonth && "is-other-month",
              isToday && "is-today",
              (isSelectedStart || isSelectedEnd) && "is-selected",
              inRange && "is-in-range"
            ),
            onClick: () => handleDayClick(date),
            children: date.getDate()
          },
          idx
        );
      })
    ] }),
    /* @__PURE__ */ jsxs19("div", { className: "xds-date-picker__footer", children: [
      /* @__PURE__ */ jsx23("button", { type: "button", className: "xds-date-picker__btn xds-date-picker__btn--cancel", onClick: onCancel, children: "\u53D6\u6D88" }),
      /* @__PURE__ */ jsx23(
        "button",
        {
          type: "button",
          className: "xds-date-picker__btn xds-date-picker__btn--confirm",
          disabled: !start || !end,
          onClick: () => start && end && onConfirm(start, end),
          children: "\u786E\u5B9A"
        }
      )
    ] })
  ] });
};
var TimeFilter = React23.forwardRef(
  ({
    className,
    statOptions = DEFAULT_STAT_OPTIONS,
    compareOptionsMap = DEFAULT_COMPARE_OPTIONS_MAP,
    defaultStat = "7d",
    defaultCompare,
    emphasis = false,
    onChange,
    ...props
  }, ref) => {
    var _a, _b;
    const [selectedStat, setSelectedStat] = React23.useState(defaultStat);
    const compareList = React23.useMemo(
      () => {
        var _a2, _b2;
        return (_b2 = (_a2 = compareOptionsMap[selectedStat]) != null ? _a2 : compareOptionsMap.custom) != null ? _b2 : [];
      },
      [compareOptionsMap, selectedStat]
    );
    const [selectedCompare, setSelectedCompare] = React23.useState(
      (_b = defaultCompare != null ? defaultCompare : (_a = compareList[0]) == null ? void 0 : _a.value) != null ? _b : "last-period"
    );
    const [statCustom, setStatCustom] = React23.useState(null);
    const [compareCustom, setCompareCustom] = React23.useState(null);
    const [openPicker, setOpenPicker] = React23.useState(null);
    const containerRef = React23.useRef(null);
    React23.useImperativeHandle(ref, () => containerRef.current);
    React23.useEffect(() => {
      if (!openPicker) return;
      const handler = (event) => {
        if (containerRef.current && !containerRef.current.contains(event.target)) {
          setOpenPicker(null);
        }
      };
      document.addEventListener("mousedown", handler);
      return () => document.removeEventListener("mousedown", handler);
    }, [openPicker]);
    const statRange = React23.useMemo(
      () => getStatRange(selectedStat, statCustom == null ? void 0 : statCustom.start, statCustom == null ? void 0 : statCustom.end),
      [selectedStat, statCustom]
    );
    const compareRange = React23.useMemo(
      () => getCompareRange(
        selectedStat,
        selectedCompare,
        statCustom == null ? void 0 : statCustom.start,
        statCustom == null ? void 0 : statCustom.end,
        compareCustom == null ? void 0 : compareCustom.start,
        compareCustom == null ? void 0 : compareCustom.end
      ),
      [selectedStat, selectedCompare, statCustom, compareCustom]
    );
    const fireChange = (nextStat, nextCompare, nextStatCustom = statCustom, nextCompareCustom = compareCustom) => {
      const sr = getStatRange(nextStat, nextStatCustom == null ? void 0 : nextStatCustom.start, nextStatCustom == null ? void 0 : nextStatCustom.end);
      const cr = getCompareRange(
        nextStat,
        nextCompare,
        nextStatCustom == null ? void 0 : nextStatCustom.start,
        nextStatCustom == null ? void 0 : nextStatCustom.end,
        nextCompareCustom == null ? void 0 : nextCompareCustom.start,
        nextCompareCustom == null ? void 0 : nextCompareCustom.end
      );
      onChange == null ? void 0 : onChange({ stat: nextStat, compare: nextCompare, statRange: sr, compareRange: cr });
    };
    const selectStat = (value) => {
      var _a2, _b2, _c, _d;
      const nextCompareList = (_b2 = (_a2 = compareOptionsMap[value]) != null ? _a2 : compareOptionsMap.custom) != null ? _b2 : [];
      const nextCompare = (_d = (_c = nextCompareList[0]) == null ? void 0 : _c.value) != null ? _d : "last-period";
      setSelectedStat(value);
      setSelectedCompare(nextCompare);
      setOpenPicker(null);
      fireChange(value, nextCompare);
    };
    const selectCompare = (value) => {
      setSelectedCompare(value);
      setOpenPicker(null);
      fireChange(selectedStat, value);
    };
    const handleStatCustomConfirm = (start, end) => {
      var _a2, _b2, _c;
      const nextStatCustom = { start, end };
      const nextCompareList = (_a2 = compareOptionsMap.custom) != null ? _a2 : [];
      const nextCompare = (_c = (_b2 = nextCompareList[0]) == null ? void 0 : _b2.value) != null ? _c : "last-period";
      setStatCustom(nextStatCustom);
      setSelectedStat("custom");
      setSelectedCompare(nextCompare);
      setOpenPicker(null);
      fireChange("custom", nextCompare, nextStatCustom);
    };
    const handleCompareCustomConfirm = (start, end) => {
      const nextCompareCustom = { start, end };
      setCompareCustom(nextCompareCustom);
      setSelectedCompare("custom");
      setOpenPicker(null);
      fireChange(selectedStat, "custom", statCustom, nextCompareCustom);
    };
    const renderOption = (option, group, active, range2) => {
      const label = active && range2 ? `${option.label}(${formatDateRange(range2.start, range2.end)})` : option.label;
      return /* @__PURE__ */ jsx23(
        "button",
        {
          type: "button",
          className: clsx23(
            "xds-time-filter__option",
            active && "is-active",
            active && emphasis && "is-emphasis"
          ),
          onClick: () => group === "stat" ? selectStat(option.value) : selectCompare(option.value),
          children: label
        },
        option.value
      );
    };
    const statCustomActive = selectedStat === "custom";
    const statCustomLabel = statCustomActive && statCustom ? formatDateRange(statCustom.start, statCustom.end) : "\u81EA\u5B9A\u4E49";
    const compareCustomActive = selectedCompare === "custom";
    const compareCustomLabel = compareCustomActive && compareCustom ? formatDateRange(compareCustom.start, compareCustom.end) : "\u81EA\u5B9A\u4E49";
    return /* @__PURE__ */ jsxs19("div", { ref: containerRef, className: clsx23("xds-time-filter", className), ...props, children: [
      /* @__PURE__ */ jsx23("div", { className: "xds-time-filter__section", children: /* @__PURE__ */ jsxs19("div", { className: "xds-time-filter__options", children: [
        statOptions.map((option) => renderOption(option, "stat", selectedStat === option.value, statRange)),
        /* @__PURE__ */ jsxs19("div", { className: "xds-time-filter__custom-wrap", children: [
          /* @__PURE__ */ jsxs19(
            "button",
            {
              type: "button",
              className: clsx23(
                "xds-time-filter__option",
                "is-custom",
                statCustomActive && "is-active",
                statCustomActive && emphasis && "is-emphasis"
              ),
              onClick: (e) => {
                e.stopPropagation();
                setOpenPicker(openPicker === "stat" ? null : "stat");
              },
              children: [
                /* @__PURE__ */ jsx23("span", { children: statCustomLabel }),
                /* @__PURE__ */ jsx23("span", { className: "xds-time-filter__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx23(Icon, { name: "ic-arrow-down-line" }) })
              ]
            }
          ),
          openPicker === "stat" ? /* @__PURE__ */ jsx23(
            DatePicker,
            {
              initialStart: statCustom == null ? void 0 : statCustom.start,
              initialEnd: statCustom == null ? void 0 : statCustom.end,
              onConfirm: handleStatCustomConfirm,
              onCancel: () => setOpenPicker(null)
            }
          ) : null
        ] })
      ] }) }),
      /* @__PURE__ */ jsx23("div", { className: "xds-time-filter__divider" }),
      /* @__PURE__ */ jsx23("div", { className: "xds-time-filter__section", children: /* @__PURE__ */ jsxs19("div", { className: "xds-time-filter__options", children: [
        compareList.map((option) => renderOption(option, "compare", selectedCompare === option.value, compareRange)),
        /* @__PURE__ */ jsxs19("div", { className: "xds-time-filter__custom-wrap", children: [
          /* @__PURE__ */ jsxs19(
            "button",
            {
              type: "button",
              className: clsx23(
                "xds-time-filter__option",
                "is-custom",
                compareCustomActive && "is-active",
                compareCustomActive && emphasis && "is-emphasis"
              ),
              onClick: (e) => {
                e.stopPropagation();
                setOpenPicker(openPicker === "compare" ? null : "compare");
              },
              children: [
                /* @__PURE__ */ jsx23("span", { children: compareCustomLabel }),
                /* @__PURE__ */ jsx23("span", { className: "xds-time-filter__icon", "aria-hidden": "true", children: /* @__PURE__ */ jsx23(Icon, { name: "ic-arrow-down-line" }) })
              ]
            }
          ),
          openPicker === "compare" ? /* @__PURE__ */ jsx23(
            DatePicker,
            {
              initialStart: compareCustom == null ? void 0 : compareCustom.start,
              initialEnd: compareCustom == null ? void 0 : compareCustom.end,
              onConfirm: handleCompareCustomConfirm,
              onCancel: () => setOpenPicker(null)
            }
          ) : null
        ] })
      ] }) })
    ] });
  }
);
TimeFilter.displayName = "TimeFilter";
export {
  Button,
  Capsule,
  Charts,
  Checkbox,
  Diagnosis,
  Dropdown,
  Filter,
  FilterGroup,
  Icon,
  Input,
  Loading,
  Menu,
  MetricCard,
  MetricCardGroup,
  Navbar,
  NormalTable,
  NormalTableWrapper,
  PageHeader,
  Pagination,
  Select,
  Tab,
  TabNav,
  Table,
  TableCellAction,
  TableCellAmount,
  TableCellOperation,
  TableCellProduct,
  Tabs,
  Tag,
  Tags,
  Tbody,
  Td,
  Th,
  Thead,
  TimeFilter,
  Tr
};
