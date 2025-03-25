"use client";

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Book1 } from 'iconsax-react';

// 解析标题的函数
const extractHeadings = (content: string) => {
  const headingRegex = /^(#{1,6})\s+(.+)$/gm;
  const headings = [];
  let match;

  while ((match = headingRegex.exec(content)) !== null) {
    headings.push({
      level: match[1].length,
      text: match[2],
      id: match[2].toLowerCase().replace(/\s+/g, '-')
    });
  }

  return headings;
};

const menuData = [
  {
    title: '文档 1',
    content: `# 文档 1

这是文档 1 的内容。它包含了许多有趣的信息和细节。

## 特点
- 支持 Markdown 语法
- 可以使用列表
- 支持代码块

\`\`\`javascript
const example = "这是一个代码示例";
console.log(example);
\`\`\`
`,
    children: [
      { 
        title: '子文档 1-1', 
        content: `## 子文档 1-1

这是子文档 1-1 的内容，详细描述了相关主题。

### 示例表格
| 列1 | 列2 |
|-----|-----|
| 内容1 | 内容2 |
| 内容3 | 内容4 |
` 
      },
      { 
        title: '子文档 1-2', 
        content: `## 子文档 1-2

这是子文档 1-2 的内容，提供了更多的背景信息。

> 这是一个引用示例
> 可以包含多行内容

**加粗文本** 和 *斜体文本*
` 
      },
    ],
  },
  {
    title: '文档 2',
    content: `# 文档 2

这是文档 2 的内容，涵盖了不同的主题和观点。

1. 第一点
2. 第二点
3. 第三点

---

更多内容...
`,
    children: [
      { 
        title: '子文档 2-1', 
        content: `## 子文档 2-1

这是子文档 2-1 的内容，深入探讨了特定问题。

### 图片示例
![示例图片](https://via.placeholder.com/150)

` 
      },
      { 
        title: '子文档 2-2', 
        content: `## 子文档 2-2

这是子文档 2-2 的内容，包含了实用的建议和技巧。

\`\`\`python
def hello_world():
    print("Hello, World!")
\`\`\`
` 
      },
    ],
  },
  {
    title: '文档 3',
    content: `# 文档 3

这是文档 3 的内容，介绍了基本概念和原理。

## 链接示例
[访问 Google](https://www.google.com)

### 任务列表
- [x] 已完成任务
- [ ] 未完成任务
- [ ] 待办事项
`,
  },
];

export default function Home() {
  const [selectedContent, setSelectedContent] = useState(menuData[0].content);
  const [headings, setHeadings] = useState([]);
  const [activeHeading, setActiveHeading] = useState('');
  const [activeMenu, setActiveMenu] = useState(menuData[0].title);
  const [breadcrumb, setBreadcrumb] = useState([menuData[0].title]);

  useEffect(() => {
    const extractedHeadings = extractHeadings(selectedContent);
    setHeadings(extractedHeadings);
  }, [selectedContent]);

  const handleMenuClick = (content, title, parentTitle = null) => {
    setSelectedContent(content);
    setActiveMenu(title);
    setBreadcrumb(parentTitle ? [parentTitle, title] : [title]);
  };

  // 自定义渲染标题，添加 id 以支持导航定位
  const components = {
    h1: ({children}) => <h1 id={children.toLowerCase().replace(/\s+/g, '-')} className="text-3xl font-bold mb-6">{children}</h1>,
    h2: ({children}) => <h2 id={children.toLowerCase().replace(/\s+/g, '-')} className="text-2xl font-semibold mb-4 mt-8">{children}</h2>,
    h3: ({children}) => <h3 id={children.toLowerCase().replace(/\s+/g, '-')} className="text-xl font-medium mb-3 mt-6">{children}</h3>,
    h4: ({children}) => <h4 id={children.toLowerCase().replace(/\s+/g, '-')} className="text-lg font-medium mb-2 mt-4">{children}</h4>,
    h5: ({children}) => <h5 id={children.toLowerCase().replace(/\s+/g, '-')} className="text-base font-medium mb-2 mt-4">{children}</h5>,
    h6: ({children}) => <h6 id={children.toLowerCase().replace(/\s+/g, '-')} className="text-sm font-medium mb-2 mt-4">{children}</h6>,
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left Menu */}
      <aside className="w-64 border-r border-gray-200 bg-white">
        <div className="p-6">
          <h2 className="flex items-center text-lg font-semibold text-gray-900 mb-6">
            <Book1 size={24} className="mr-2" variant="Bold"/>
            目录
          </h2>
          <ul className="space-y-2">
            {menuData.map((item, index) => (
              <li key={index}>
                <a 
                  href="#" 
                  className={`flex items-center text-gray-700 hover:text-black transition-colors duration-150 p-2 rounded-lg ${
                    activeMenu === item.title ? 'bg-gray-200' : 'hover:bg-gray-100'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleMenuClick(item.content, item.title);
                  }}
                >
                  {item.title}
                </a>
                {item.children && (
                  <ul className="ml-6 mt-2 space-y-2 border-l border-gray-200 pl-4">
                    {item.children.map((child, childIndex) => (
                      <li key={childIndex}>
                        <a 
                          href="#" 
                          className={`flex items-center text-gray-600 hover:text-black transition-colors duration-150 p-2 rounded-lg ${
                            activeMenu === child.title ? 'bg-gray-200' : 'hover:bg-gray-100'
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleMenuClick(child.content, child.title, item.title);
                          }}
                        >
                          {child.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* Content Display */}
      <main className="flex-1 overflow-auto">
        <div className="max-w-4xl mx-auto p-8">
          {/* Breadcrumb Navigation */}
          <nav className="mb-6">
            <ol className="flex items-center space-x-2 text-sm text-gray-600">
              {breadcrumb.map((item, index) => (
                <li key={index} className="flex items-center">
                  {index > 0 && <span className="mx-2">/</span>}
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (index === 0) {
                        // Find the parent document
                        const parentDoc = menuData.find(doc => doc.title === item);
                        if (parentDoc) {
                          handleMenuClick(parentDoc.content, parentDoc.title);
                        }
                      }
                    }}
                    className={`hover:text-black transition-colors duration-150 ${
                      index === breadcrumb.length - 1 ? 'text-black font-medium' : ''
                    }`}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ol>
          </nav>
          <div className="prose prose-lg prose-black max-w-none">
            <ReactMarkdown 
              remarkPlugins={[remarkGfm]}
              components={components}
            >
              {selectedContent}
            </ReactMarkdown>
          </div>
        </div>
      </main>

      {/* Navigation */}
      <nav className="w-64 border-l border-gray-200 bg-white">
        <div className="p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-6">导航</h2>
          <ul className="space-y-2">
            {headings.map((heading, index) => (
              <li 
                key={index} 
                style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
              >
                <a 
                  href={`#${heading.id}`}
                  className={`text-sm text-gray-600 hover:text-black transition-colors duration-150 block ${
                    activeHeading === heading.id ? 'text-black font-medium' : ''
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveHeading(heading.id);
                    document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
} 