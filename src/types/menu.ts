export const MENU_TYPE = {
  ALL_CLEAR: "allClear",
} as const;

export type MenuType = (typeof MENU_TYPE)[keyof typeof MENU_TYPE];
