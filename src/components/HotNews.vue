<script setup lang="ts">
import { onMounted, ref } from 'vue'
import newsData from '../data/news.json'

interface NewsItem {
  title: string
  url: string
}

interface NewsSource {
  name: string
  items: NewsItem[]
}

const sources = Object.keys(newsData) as (keyof typeof newsData)[]

// 为每个平台生成随机旋转角度 (0, 90, 180, 270)
const rotations = ref<Record<string, number>>({})

const generateRotations = () => {
  const angles = [0, 90, 180, 270]
  sources.forEach((key) => {
    rotations.value[key] = angles[Math.floor(Math.random() * angles.length)]
  })
}

onMounted(() => {
  generateRotations()
})

const getSourceData = (key: keyof typeof newsData): NewsSource => {
  return newsData[key] as NewsSource
}
</script>

<template>
  <section class="hot-news-grid">
    <div
      v-for="sourceKey in sources"
      :key="sourceKey"
      class="news-card"
      :class="[`rotate-${rotations[sourceKey] || 0}`]"
    >
      <div class="card-inner">
        <h3 class="card-title">
          {{ getSourceData(sourceKey).name }}
        </h3>
        <div class="news-list">
          <a
            v-for="(item, index) in getSourceData(sourceKey).items"
            :key="index"
            :href="item.url"
            target="_blank"
            rel="noopener noreferrer"
            class="news-item"
          >
            <span class="index">{{ index + 1 }}</span>
            <span class="news-title">{{ item.title }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
@import '../variables';

.hot-news-grid {
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;
  gap: 10px;
  padding: 8px;
  box-sizing: border-box;
  overflow: hidden;
}

.news-card-shell {
  width: 100%;
  height: 100%;
  min-width: 0;
  min-height: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.news-card {
  /* 固定尺寸，让 flex 自动换行 */
  width: calc(25% - 10px);
  aspect-ratio: 1;
  flex-shrink: 0;
  
  /* 样式 */
  background: rgba($color-primary, 0.05);
  border: 2px solid $color-text-dark;
  border-radius: 8px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  box-sizing: border-box;
  transform-origin: center center;

  &.rotate-0 {
    transform: rotate(0deg);
  }

  &.rotate-90 {
    transform: rotate(90deg);
  }

  &.rotate-180 {
    transform: rotate(180deg);
  }

  &.rotate-270 {
    transform: rotate(270deg);
  }
}

.card-inner {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.card-title {
  font-size: 0.9rem;
  font-weight: bold;
  color: $color-danger;
  margin: 0 0 4px 0;
  padding-bottom: 3px;
  border-bottom: 2px solid $color-text-dark;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-list {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
  overflow-y: auto;
  padding-right: 4px;

  &::-webkit-scrollbar {
    width: 4px;
  }

  &::-webkit-scrollbar-track {
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 2px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: rgba(0, 0, 0, 0.3);
  }
}

.news-item {
  display: flex;
  align-items: flex-start;
  gap: 6px;
  font-size: 0.95rem;
  line-height: 1.4;
  text-decoration: none;
  color: $color-text-dark;
  transition: color 0.2s;

  &:hover {
    color: $color-danger;
  }

  .index {
    flex-shrink: 0;
    width: 1.3em;
    height: 1.3em;
    display: flex;
    align-items: center;
    justify-content: center;
    background: $color-danger;
    color: white;
    font-size: 0.75rem;
    font-weight: bold;
    border-radius: 3px;
    margin-top: 2px;
  }

  &:nth-child(n + 4) .index {
    background: #999;
  }

  .news-title {
    flex: 1;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
    word-break: break-all;
  }
}

@media (max-width: 1200px) {
  .news-card {
    width: calc(33.33% - 10px);
  }
}

@media (max-width: 900px) {
  .news-card {
    width: calc(50% - 10px);
  }
}

@media (max-width: 600px) {
  .news-card {
    width: calc(100% - 10px);

    &.rotate-90,
    &.rotate-270 {
      transform: rotate(0deg);
    }
  }
}
</style>
