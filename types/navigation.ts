export interface NavItem {
  name: string;
  url: string;
  description: string;
  tags: string[];
  icon?: string; // 本地SVG路径
  favicon?: string; // 可选的自定义favicon URL
}

export interface Category {
  id: string;
  name: string;
  items: NavItem[];
} 