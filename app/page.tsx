"use client";

import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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

  useEffect(() => {
    const extractedHeadings = extractHeadings(selectedContent);
    setHeadings(extractedHeadings);
  }, [selectedContent]);

  const handleMenuClick = (content) => {
    setSelectedContent(content);
  };

  // 自定义渲染标题，添加 id 以支持导航定位
  const components = {
    h1: ({children}) => <h1 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h1>,
    h2: ({children}) => <h2 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h2>,
    h3: ({children}) => <h3 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h3>,
    h4: ({children}) => <h4 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h4>,
    h5: ({children}) => <h5 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h5>,
    h6: ({children}) => <h6 id={children.toLowerCase().replace(/\s+/g, '-')}>{children}</h6>,
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Menu */}
      <aside className="w-1/4 p-4 border-r bg-gray-50">
        <h2 className="text-xl font-bold mb-4">目录</h2>
        <ul>
          {menuData.map((item, index) => (
            <li key={index} className="mb-2">
              <a 
                href="#" 
                className="text-blue-600 hover:text-blue-800 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  handleMenuClick(item.content);
                }}
              >
                {item.title}
              </a>
              {item.children && (
                <ul className="ml-4 mt-2">
                  {item.children.map((child, childIndex) => (
                    <li key={childIndex} className="mb-2">
                      <a 
                        href="#" 
                        className="text-blue-600 hover:text-blue-800 hover:underline"
                        onClick={(e) => {
                          e.preventDefault();
                          handleMenuClick(child.content);
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
      </aside>

      {/* Content Display */}
      <main className="w-1/2 p-8 overflow-auto">
        <div className="prose max-w-none">
          <ReactMarkdown 
            remarkPlugins={[remarkGfm]}
            components={components}
          >
            {selectedContent}
          </ReactMarkdown>
        </div>
      </main>

      {/* Navigation */}
      <nav className="w-1/4 p-4 border-l bg-gray-50">
        <h2 className="text-xl font-bold mb-4">导航</h2>
        <ul>
          {headings.map((heading, index) => (
            <li 
              key={index} 
              className="mb-2"
              style={{ paddingLeft: `${(heading.level - 1) * 1}rem` }}
            >
              <a 
                href={`#${heading.id}`}
                className="text-blue-600 hover:text-blue-800 hover:underline"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
} 