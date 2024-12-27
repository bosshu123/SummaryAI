<?php
/*
Plugin Name: SummaryAI
Plugin URI: https://github.com/bosshu123/SummaryAI
Description: 一个基于AI的文章摘要自动生成系统，可以为WordPress文章内容生成简洁、准确的摘要。
Version: 1.0.0
Author: Boss Hu
Author URI: https://github.com/bosshu123
License: Proprietary
*/

// 防止直接访问
if (!defined('ABSPATH')) {
    exit;
}

// 注册激活钩子
register_activation_hook(__FILE__, 'summaryai_activate');

// 注册停用钩子
register_deactivation_hook(__FILE__, 'summaryai_deactivate');

// 激活插件时的操作
function summaryai_activate() {
    // 设置默认的基础URL
    add_option('summaryai_base_url', 'https://summary-ai-blond.vercel.app');
}

// 停用插件时的操作
function summaryai_deactivate() {
    // 清理操作
}

// 添加管理菜单
function summaryai_add_admin_menu() {
    add_options_page(
        'SummaryAI设置', 
        'SummaryAI', 
        'manage_options',
        'summaryai-settings',
        'summaryai_settings_page'
    );
}
add_action('admin_menu', 'summaryai_add_admin_menu');

// 注册设置
function summaryai_register_settings() {
    register_setting('summaryai_options', 'summaryai_base_url');
}
add_action('admin_init', 'summaryai_register_settings');

// 设置页面HTML
function summaryai_settings_page() {
    ?>
    <div class="wrap">
        <h2>SummaryAI设置</h2>
        <form method="post" action="options.php">
            <?php settings_fields('summaryai_options'); ?>
            <table class="form-table">
                <tr>
                    <th scope="row">基础URL</th>
                    <td>
                        <input type="url" name="summaryai_base_url" 
                               value="<?php echo esc_attr(get_option('summaryai_base_url', 'https://summary-ai-blond.vercel.app')); ?>" 
                               class="regular-text">
                        <p class="description">请输入不包含结尾斜杠的基础URL</p>
                    </td>
                </tr>
            </table>
            <?php submit_button(); ?>
        </form>
    </div>
    <?php
}

// 修改加载脚本的函数
function summaryai_enqueue_scripts() {
    $base_url = get_option('summaryai_base_url', 'https://summary-ai-blond.vercel.app');
    
    // 注册并加载CSS
    wp_enqueue_style(
        'summaryai-style',
        $base_url . '/style.css',
        array(),
        '1.0.0'
    );

    // 注册并加载JavaScript
    wp_enqueue_script(
        'summaryai-script',
        $base_url . '/summary.js',
        array(),
        '1.0.0',
        true
    );

    // 添加必要的JavaScript配置
    wp_localize_script('summaryai-script', 'summaryAiConfig', array(
        'apiUrl' => $base_url . '/api/summary'
    ));
}
add_action('wp_enqueue_scripts', 'summaryai_enqueue_scripts');

// 在文章内容后初始化摘要生成器
function summaryai_init_summary($content) {
    if (is_single() && !is_admin()) {
        $script = "
        <script>
            document.addEventListener('DOMContentLoaded', function() {
                new ArticleSummary({
                    selector: '.entry-content',
                    maxLength: 200,
                    position: 'before',
                    apiUrl: summaryAiConfig.apiUrl
                });
            });
        </script>
        ";
        return $content . $script;
    }
    return $content;
}
add_filter('the_content', 'summaryai_init_summary'); 