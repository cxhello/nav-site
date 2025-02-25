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
  const [activeCategory, setActiveCategory] = useState('all');
  const [filteredCategories, setFilteredCategories] = useState<Category[]>(siteData.categories);

  // 处理搜索
  const handleSearch = (query: string) => {
    setSearchQuery(query);
  };

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
        searchQuery || activeCategory === 'all' ? category.items.length > 0 : category.id === activeCategory
      );
    
    setFilteredCategories(filtered);
  }, [searchQuery, activeCategory]);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      {/* 搜索框和暗黑模式切换按钮 */}
      <Header onSearch={handleSearch} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* 标题和介绍文本 */}
        <div className="max-w-4xl mx-auto text-center px-4 py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 text-gray-900 dark:text-white">
            AI Navigation - 精选人工智能工具导航
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            欢迎来到 AI Navigation，这里汇集了当下最实用的人工智能工具和资源。从 DeepSeek、ChatGPT、Claude 等智能对话助手，到 Midjourney 等 AI 绘画工具，再到各类 AI 编程和设计工具，帮助您快速发现和使用最适合的 AI 工具，提升工作效率和创意表达。
          </p>
        </div>
        
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
