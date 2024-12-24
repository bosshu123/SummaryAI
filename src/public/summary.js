class ArticleSummary {
  constructor(options = {}) {
    this.options = {
      selector: options.selector || '#article-content',
      apiUrl: options.apiUrl || 'http://localhost:3000/api/summary',
      maxLength: options.maxLength || 200,
      position: options.position || 'before', // 'before' 或 'after'
      ...options
    };
    
    this.init();
  }

  async init() {
    const articleElement = document.querySelector(this.options.selector);
    if (!articleElement) {
      console.error('未找到文章内容元素');
      return;
    }

    const text = articleElement.textContent.trim();
    if (!text) {
      console.error('文章内容为空');
      return;
    }

    try {
      const summaryElement = document.createElement('div');
      summaryElement.className = 'article-summary';
      summaryElement.innerHTML = '<div class="summary-loading">正在生成摘要...</div>';

      if (this.options.position === 'before') {
        articleElement.parentNode.insertBefore(summaryElement, articleElement);
      } else {
        articleElement.parentNode.insertBefore(summaryElement, articleElement.nextSibling);
      }

      const summary = await this.generateSummary(text);
      this.renderSummary(summaryElement, summary);
    } catch (error) {
      console.error('生成摘要失败:', error);
    }
  }

  async generateSummary(text) {
    const response = await fetch(this.options.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        text,
        maxLength: this.options.maxLength
      })
    });

    if (!response.ok) {
      throw new Error('API请求失败');
    }

    const data = await response.json();
    return data.summary;
  }

  renderSummary(element, summary) {
    element.innerHTML = `
      <div class="summary-content">
        <div class="summary-header">
          <span class="summary-icon">📝</span>
          <span class="summary-title">AI摘要</span>
        </div>
        <div class="summary-text">${summary}</div>
      </div>
    `;
  }
}

// 导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ArticleSummary;
} else {
  window.ArticleSummary = ArticleSummary;
} 