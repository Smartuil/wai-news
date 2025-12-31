# 脚本说明

## news_to_json.py

将 `news.txt` 转换为 `news.json` 格式。

### 使用方法

```bash
# 方法 1：在 scripts 目录下运行
cd scripts
python news_to_json.py

# 方法 2：使用完整路径
python "c:\Users\liubo\Desktop\Github\wai-news\scripts\news_to_json.py"
```

### 输入格式 (news.txt)

```
toutiao | 今日头条
1. 标题 [URL:https://www.toutiao.com/xxx]
2. 标题 [URL:https://www.toutiao.com/xxx]

baidu | 百度热搜
1. 标题 [URL:https://www.baidu.com/xxx]
2. 标题 [URL:https://www.baidu.com/xxx]
```

### 输出格式 (news.json)

```json
{
  "toutiao": {
    "name": "今日头条",
    "items": [
      {
        "title": "标题",
        "url": "https://www.toutiao.com/xxx"
      }
    ]
  }
}
```

### 功能特点

- ✅ 自动识别数据源和新闻条目
- ✅ 支持多个数据源
- ✅ 保留 JSON 格式化（indent=2）
- ✅ 支持 UTF-8 编码
- ✅ 统计转换结果（数据源数量、新闻条目数）
