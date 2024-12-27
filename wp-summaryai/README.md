# SummaryAI WordPress Plugin

一个基于AI的WordPress文章摘要自动生成插件，可以为文章内容生成简洁、准确的摘要。

## 功能特点

- 🚀 自动为文章生成摘要
- 💾 支持自定义摘要长度
- 🎨 美观的摘要显示样式
- 📱 完全响应式设计
- ⚡ 简单易用
- 🔒 安全的WordPress集成

## 安装说明

1. 下载插件压缩包
2. 在WordPress后台进入"插件"→"安装插件"
3. 点击"上传插件"按钮
4. 选择下载的压缩包并安装
5. 启用插件

## 使用方法

插件安装并启用后会自动在文章页面生成摘要，无需额外配置。

### 自定义选项

可以通过修改主题文件中的代码来自定义摘要的显示：

```php
add_filter('summaryai_options', function($options) {
    return array_merge($options, array(
        'maxLength' => 300,        // 摘要最大字数
        'position' => 'after',     // 摘要显示位置（before/after）
        'selector' => '.content'   // 文章内容选择器
    ));
});
```

## 常见问题

### 摘要没有显示？

- 确认插件已经正确安装并启用
- 检���主题是否使用标准的WordPress文章结构
- 确认文章内容选择器(.entry-content)存在

### 如何调整摘要样式？

可以在主题的style.css中覆盖默认样式：

```css
.summaryai-container {
    /* 自定义样式 */
}
```

## 技术支持

如有问题或建议，请访问GitHub仓库提交issue：
[https://github.com/bosshu123/SummaryAI](https://github.com/bosshu123/SummaryAI)

## 许可证

保留所有权利。未经授权，不得用于商业用途。 