import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onSearch: (query: string) => void;
}

export default function Header({ onSearch }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-sm dark:bg-gray-900/80 py-4 px-6 w-full">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="搜索导航..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-full px-4 py-2 rounded-full bg-gray-100 dark:bg-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 
                       transition-all duration-300 pl-10"
            />
            <div className="absolute left-3 top-2.5 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
