import { NavItem } from '@/types/navigation';
import Image from 'next/image';
import { useState } from 'react';

interface NavCardProps {
  item: NavItem;
  onTagClick?: (tag: string) => void;
}

export default function NavCard({ item, onTagClick }: NavCardProps) {
  const [imageError, setImageError] = useState(false);

  // 从URL获取域名作为备选文本
  const getDomainFromUrl = (url: string) => {
    try {
      const domain = new URL(url).hostname;
      return domain.charAt(0).toUpperCase();
    } catch {
      return item.name.charAt(0);
    }
  };

  // 获取favicon URL
  const getFaviconUrl = (url: string) => {
    // 使用Google的favicon服务
    return `https://www.google.com/s2/favicons?domain=${url}&sz=128`;
    
    // 或者使用其他服务
    // return `https://icon.horse/icon/${new URL(url).hostname}`;
    // return `https://favicon.yandex.net/favicon/${new URL(url).hostname}`;
    // return `https://${new URL(url).hostname}/favicon.ico`;
  };

  const renderIcon = () => {
    if (item.icon) {
      // 优先使用本地SVG图标
      return (
        <Image
          src={item.icon}
          alt={item.name}
          width={32}
          height={32}
          className="rounded-lg"
        />
      );
    } else {
      // 使用自动获取的favicon或自定义favicon
      const iconUrl = item.favicon || getFaviconUrl(item.url);
      return !imageError ? (
        <Image
          src={iconUrl}
          alt={item.name}
          width={32}
          height={32}
          className="rounded-lg"
          onError={() => setImageError(true)}
        />
      ) : (
        // 如果加载失败，显示首字母图标
        <div className="w-8 h-8 rounded-lg bg-blue-500 text-white flex items-center justify-center font-semibold">
          {getDomainFromUrl(item.url)}
        </div>
      );
    }
  };

  const handleTagClick = (e: React.MouseEvent, tag: string) => {
    e.preventDefault(); // 阻止默认行为
    e.stopPropagation(); // 阻止事件冒泡
    onTagClick?.(tag);
  };

  const handleClick = (name: string, url: string) => {
    // 跟踪外链点击
    window.gtag?.('event', 'click', {
      event_category: 'outbound',
      event_label: name,
      value: url
    });
  };

  return (
    <a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => handleClick(item.name, item.url)}
      className="group block p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm 
                 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
    >
      <div className="flex items-start gap-3 min-h-[88px]">
        {renderIcon()}
        <div className="flex flex-col h-full">
          <h3 className="font-medium text-gray-900 dark:text-white">{item.name}</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 mb-auto min-h-[20px]">
            {item.description}
          </p>
          <div className="flex flex-wrap gap-2 mt-2">
            {item.tags.map((tag) => (
              <button
                key={tag}
                onClick={(e) => handleTagClick(e, tag)}
                className="px-2 py-1 text-xs rounded-full bg-gray-100 dark:bg-gray-700 
                         text-gray-600 dark:text-gray-300 hover:bg-gray-200 
                         dark:hover:bg-gray-600 transition-colors"
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      </div>
    </a>
  );
} 