/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

import { Platform } from "react-native";

export const StaticColors = {
  best: "#fbf318",
  starYellow: "#d4cc30",
  levelOrange: "#cc8743",
  buttonBlue: "#19b3d9",
};

export const RarityStyles = {
  commonMain: "#6ab98c",
  commonTint: "#2cd045",
  commonText: "#24602d",
  uncommonMain: "#5e9ad2",
  uncommonTint: "#10c1e1",
  uncommonText: "#24355b",
  rareMain: "#c75757",
  rareTint: "#e13434",
  rareText: "#501f1f",
  epicMain: "#9f55e0",
  epicTint: "#8f1ade",
  epicText: "#442460",
  legendaryMain: "#dbd75b",
  legendaryTint: "#e6a038",
  legendaryText: "#523720",
};

export const Colors = {
  light: {
    text: "#000000",
    textOpposite: "#ffffff",
    textHighlight: "#d33adc",
    mainBackground: "#cfc6dd",
    contentBackground: "#bdaad8",
    contentBorder: "#8c75a1",
    tabBackground: "#967ea9",
    iconDefault: "#200b21",
    iconSelected: "#a1199b",
  },
  dark: {
    text: "#ffffff",
    textOpposite: "#000000",
    textHighlight: "#f985ff",
    mainBackground: "#564b67",
    contentBackground: "#74599b",
    contentBorder: "#3e3857",
    tabBackground: "#3f2c4e",
    iconDefault: "#ffffff",
    iconSelected: "#e068b2",
  },
};

export const Fonts = Platform.select({
  ios: {
    /** iOS `UIFontDescriptorSystemDesignDefault` */
    sans: "system-ui",
    /** iOS `UIFontDescriptorSystemDesignSerif` */
    serif: "ui-serif",
    /** iOS `UIFontDescriptorSystemDesignRounded` */
    rounded: "ui-rounded",
    /** iOS `UIFontDescriptorSystemDesignMonospaced` */
    mono: "ui-monospace",
  },
  default: {
    sans: "normal",
    serif: "serif",
    rounded: "normal",
    mono: "monospace",
  },
  web: {
    sans: "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
    serif: "Georgia, 'Times New Roman', serif",
    rounded:
      "'SF Pro Rounded', 'Hiragino Maru Gothic ProN', Meiryo, 'MS PGothic', sans-serif",
    mono: "SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
  },
});
