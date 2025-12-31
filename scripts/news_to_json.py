#!/usr/bin/env python
# -*- coding: utf-8 -*-
from __future__ import print_function
import json
import re
import io
import os
import sys

# Python 2 UTF-8 兼容
if sys.version_info[0] < 3:
    reload(sys)
    sys.setdefaultencoding('utf-8')
    import codecs
    sys.stdout = codecs.getwriter('utf-8')(sys.stdout)


def parse_news_file(input_file, output_file):
    """
    将 news.txt 格式转换为 news.json 格式
    """
    data = {}
    current_source = None
    current_source_name = None

    with io.open(input_file, 'r', encoding='utf-8') as f:
        for line in f:
            line = line.strip()
            if not line:
                continue

            # 优先解析新闻条目（如：1. 标题 [URL:xxx]）
            item_match = re.match(r'^\d+\.\s+(.+?)\s+\[URL:(.+)\]$', line)
            if item_match and current_source:
                title = item_match.group(1).strip()
                url = item_match.group(2).strip()
                data[current_source]["items"].append({
                    "title": title,
                    "url": url
                })
                continue

            # 检测到新的数据源（如：toutiao | 今日头条）
            source_match = re.match(r'^(.+?)\s*\|\s*(.+)$', line)
            if source_match:
                current_source = source_match.group(1).strip()
                current_source_name = source_match.group(2).strip()
                data[current_source] = {
                    "name": current_source_name,
                    "items": []
                }
                continue

    # 写入 JSON 文件
    json_str = json.dumps(data, ensure_ascii=False, indent=2)
    with io.open(output_file, 'w', encoding='utf-8') as f:
        if isinstance(json_str, bytes):
            json_str = json_str.decode('utf-8')
        f.write(json_str)

    total_items = sum(len(source["items"]) for source in data.values())
    print(u"✓ 转换完成！")
    print(u"  - 输入: " + input_file)
    print(u"  - 输出: " + output_file)
    print(u"  - 数据源数量: " + str(len(data)))
    print(u"  - 新闻条目数: " + str(total_items))


if __name__ == "__main__":
    # 获取脚本所在目录
    script_dir = os.path.dirname(os.path.abspath(__file__))

    # 文件路径
    input_file = os.path.join(script_dir, "./news.txt")
    output_file = os.path.join(script_dir, "../src/data/news.json")

    # 执行转换
    parse_news_file(input_file, output_file)
