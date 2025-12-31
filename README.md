<p align="center">
  <img width="128" height="128" src="./public/icons/logo128.png" />
</p>

<h1 align="center">歪脖子新闻</h1>

<p align="center">
  一款可以预防颈椎病的网站，同时聚合多平台热点新闻
</p>

<p align="center">
  <img alt="GitHub" src="https://img.shields.io/github/license/Smartuil/wai-news" />
  <img alt="Node" src="https://img.shields.io/badge/node-%3E%3D20-brightgreen" />
  <img alt="Vue" src="https://img.shields.io/badge/vue-3.5-blue" />
  <img alt="Vite" src="https://img.shields.io/badge/vite-6.x-purple" />
</p>

<p align="center">
  <!-- Keep these links. Translations will automatically update with the README. -->
  <a href="https://zdoc.app/de/Smartuil/awesome-websites">Deutsch</a> | 
  <a href="https://zdoc.app/en/Smartuil/awesome-websites">English</a> | 
  <a href="https://zdoc.app/es/Smartuil/awesome-websites">Español</a> | 
  <a href="https://zdoc.app/fr/Smartuil/awesome-websites">français</a> | 
  <a href="https://zdoc.app/ja/Smartuil/awesome-websites">日本語</a> | 
  <a href="https://zdoc.app/ko/Smartuil/awesome-websites">한국어</a> | 
  <a href="https://zdoc.app/pt/Smartuil/awesome-websites">Português</a> | 
  <a href="https://zdoc.app/ru/Smartuil/awesome-websites">Русский</a> | 
  <a href="https://zdoc.app/zh/Smartuil/awesome-websites">中文</a>
</p>

## 预览

🌐 [在线体验](https://wainews.bonan.online/)

## 功能特性

- 🦒 **活动脖子** - 页面内容随机旋转，预防颈椎病
- 📰 **热点新闻聚合** - 支持多平台热搜（今日头条、百度、微博、B站、知乎、抖音等 12+ 平台）
- 🗓️ **休息日指南** - 快速知晓距离下一个休息日还有几天
- ⚙️ **三种工作模式** - 强度自己选择

### 工作模式

| 模式 | 说明 |
|------|------|
| 柔和模式 | 内容小范围摆动 |
| 连续模式 | 每隔 4s 自动左右摆动 |
| 全面模式 | 内容随机角度摆动（默认） |

### 支持的新闻平台

今日头条 · 百度热搜 · 微博 · B站热搜 · 知乎 · 抖音 · 澎湃新闻 · 华尔街见闻 · 财联社 · 凤凰网 · 贴吧

## 技术栈

- **框架**: Vue 3 + TypeScript
- **构建**: Vite 6
- **样式**: SCSS
- **后端**: Supabase Edge Functions
- **API**: [免费节假日 API](https://timor.tech/api/holiday)

## 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览构建结果
npm run preview
```

## 项目结构

```
src/
├── components/        # Vue 组件
│   ├── DateTime.vue      # 日期时间 + 休息日倒计时
│   ├── HotNews.vue       # 热点新闻网格
│   ├── SettingsMenu.vue  # 设置菜单
│   └── ...
├── composables/       # 组合式函数
│   ├── useNextHolidayApi.ts  # 下一个休息日 API
│   ├── useMode.ts            # 工作模式管理
│   └── ...
├── services/          # API 服务
├── helpers/           # 工具函数
├── data/              # 数据文件（自动生成）
└── views/             # 页面视图
```

## 鸣谢

本项目源自 [dukeluo/wai](https://github.com/dukeluo/wai)，感谢原作者的创意和开源精神。

- 休息日指南由 [免费节假日 API](https://timor.tech/api/holiday) 驱动
- 应用图标由 [OpenClipart-Vectors](https://pixabay.com/zh/users/openclipart-vectors-30363/) 在 Pixabay 上发布

## 支持作者

如果这个项目对你有帮助，欢迎 Star ⭐ 或者请作者喝杯咖啡：

- [Buy Me a Coffee](https://buymeacoffee.com/smartuil)
- [赞助页面](https://www.bonan.online/Sponsor)

<p>
  <img src="https://unrealenginelibrary-1252512735.cos.ap-guangzhou.myqcloud.com/image/ecfbdb054f5f49d5392c5526e23ec43b.png" width="45%" />
  <img src="https://unrealenginelibrary-1252512735.cos.ap-guangzhou.myqcloud.com/image/10ecab65182fc7bf4453b5a16c206fe5.jpg" width="45%" />
</p>
## License

[MPL-2.0](./LICENSE)
