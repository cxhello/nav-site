'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import NavCard from '@/components/NavCard';
import BackToTop from '@/components/BackToTop';
import siteData from '@/data/sites.json';
import { Category } from '@/types/navigation';

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all'); // 默认显示全部
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(siteData.categories);

  // 处理标签点击
  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
    setActiveCategory('all'); // 点击标签时切换到全部分类
  };

  useEffect(() => {
    const filtered = siteData.categories
      .map(category => ({
        ...category,
        items: category.items.filter(item =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
        )
      }))
      .filter(category => 
        // 如果有搜索词，显示所有匹配的项目
        // 如果是"全部"分类或有搜索词，显示所有分类
        // 否则只显示当前选中的分类
        searchQuery || activeCategory === 'all' ? category.items.length > 0 : category.id === activeCategory
      );
    
    setFilteredCategories(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Header onSearch={setSearchQuery} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 分类导航 */}
        <div className="flex gap-4 overflow-x-auto pb-4 sticky top-20 bg-gray-50 dark:bg-gray-900 z-40">
          <button
            onClick={() => {
              setActiveCategory('all');
              setSearchQuery('');
            }}
            className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
              ${activeCategory === 'all'
                ? 'bg-blue-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
              }`}
          >
            ALL
          </button>
          {siteData.categories.map((category) => (
            <button
              key={category.id}
              onClick={() => {
                setActiveCategory(category.id);
                setSearchQuery('');
              }}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition-colors
                ${activeCategory === category.id
                  ? 'bg-blue-500 text-white'
                  : 'bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300'
                }`}
            >
              {category.name}
            </button>
          ))}
        </div>

        {/* 网站卡片网格 */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredCategories.map(category =>
            category.items.map(item => (
              <NavCard 
                key={item.url} 
                item={item} 
                onTagClick={handleTagClick}
              />
            ))
          )}
        </div>

        {/* 无结果提示 */}
        {filteredCategories.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 mt-8">
            没有找到匹配的内容
          </div>
        )}
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}
