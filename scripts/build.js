#!/usr/bin/env node
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const scriptDir = __dirname;
const newsTxtPath = path.join(scriptDir, './news.txt');
const newsJsonPath = path.join(scriptDir, '../src/data/news.json');
const pythonScriptPath = path.join(scriptDir, 'news_to_json.py');

console.log('🔄 开始解析 news.txt...');

// 检查 news.txt 是否存在
if (!fs.existsSync(newsTxtPath)) {
  console.error('❌ news.txt 不存在，跳过解析');
  process.exit(0);
}

try {
  // 检测 Python 是否可用
  let pythonCmd;
  try {
    execSync('python --version', { stdio: 'ignore' });
    pythonCmd = 'python';
  } catch {
    try {
      execSync('python3 --version', { stdio: 'ignore' });
      pythonCmd = 'python3';
    } catch {
      console.warn('⚠️  未检测到 Python，尝试使用 Node.js 解析...');
      // 如果 Python 不可用，使用 Node.js 直接解析
      parseNewsTxt(newsTxtPath, newsJsonPath);
      console.log('✓ news.txt 解析完成 (Node.js)');
      process.exit(0);
    }
  }

  // 使用 Python 解析
  execSync(`${pythonCmd} news_to_json.py`, {
    cwd: scriptDir,
    stdio: 'inherit',
    shell: true
  });
  console.log('✓ news.txt 解析完成 (Python)');
} catch (error) {
  console.error('❌ 解析失败:', error.message);
  process.exit(1);
}

/**
 * Node.js 版本的 news.txt 解析器（备用方案）
 */
function parseNewsTxt(inputPath, outputPath) {
  const content = fs.readFileSync(inputPath, 'utf-8');
  const lines = content.split('\n');
  const data = {};
  let currentSource = null;
  let currentSourceName = null;

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    // 检测新闻条目
    const itemMatch = trimmed.match(/^(\d+)\.\s+(.+?)\s+\[URL:(.+)\]$/);
    if (itemMatch && currentSource) {
      const title = itemMatch[2].trim();
      const url = itemMatch[3].trim();
      data[currentSource].items.push({ title, url });
      continue;
    }

    // 检测数据源
    const sourceMatch = trimmed.match(/^(.+?)\s*\|\s*(.+)$/);
    if (sourceMatch) {
      currentSource = sourceMatch[1].trim();
      currentSourceName = sourceMatch[2].trim();
      data[currentSource] = {
        name: currentSourceName,
        items: []
      };
      continue;
    }
  }

  // 确保输出目录存在
  const outputDir = path.dirname(outputPath);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // 写入 JSON 文件
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2), 'utf-8');
}
