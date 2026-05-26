import { CMSNavigationLink } from "../../../types/cms";
import { normalizeSlug } from "./wordpress";

export interface WpMenuItem {
  id: number;
  title: string;
  url: string;
  menu_item_parent: string; // "0" for top level or parent id string
  menu_order: number;
}

/**
 * Normalizes flat WordPress menu lists into a tree structure.
 */
export function normalizeNavigation(wpItems: WpMenuItem[]): CMSNavigationLink[] {
  if (!wpItems || !Array.isArray(wpItems)) return [];

  // Sort by menu order
  const sorted = [...wpItems].sort((a, b) => a.menu_order - b.menu_order);

  // Map to core navigation structure
  return sorted.map((item) => ({
    id: String(item.id),
    label: item.title,
    href: normalizeSlug(item.url),
    order: item.menu_order,
  }));
}
