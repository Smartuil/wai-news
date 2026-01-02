<script setup lang="ts">
import { useNextHolidayApi } from '../composables/useNextHolidayApi'
import { useTodayInfoApi } from '../composables/useTodayInfoApi'
import { getTime, getWeekday, getYear, getMonth, getDay } from '../helpers/date'
import type { IContentBaseProps } from '../types'

const props = defineProps<IContentBaseProps>()
const { isDayOff } = useTodayInfoApi(props.date)
const { name, rest } = useNextHolidayApi(props.date)

function formatBuildTimeToBeijing(iso: string): string {
  if (!iso) return ''

  const dateUtc = new Date(iso)
  if (Number.isNaN(dateUtc.getTime())) return ''

  const beijingMs = dateUtc.getTime() + 8 * 60 * 60 * 1000
  const d = new Date(beijingMs)
  const pad = (n: number) => String(n).padStart(2, '0')

  return `${d.getUTCFullYear()}-${pad(d.getUTCMonth() + 1)}-${pad(d.getUTCDate())} ${pad(
    d.getUTCHours(),
  )}:${pad(d.getUTCMinutes())}:${pad(d.getUTCSeconds())}`
}

const buildTime: string = formatBuildTimeToBeijing(__BUILD_TIME__)
</script>




<template>
  <section id="datetime">
    <p id="moment">{{ getTime(props.date) }}</p>
    <p>
      今天是<span class="hightlight">{{ getYear(props.date) }}</span
      >年<span class="hightlight">{{ getMonth(props.date) }}</span
      >月<span class="hightlight">{{ getDay(props.date) }}</span
      >日<span class="hightlight">{{ getWeekday(props.date) }}</span>
    </p>
    <p v-if="isDayOff">今天是<span class="hightlight">休息日</span>，放松一下吧</p>
    <p v-else>
      距离下一个休息日<span class="hightlight">{{ name }}</span
      >还有<span class="hightlight">{{ rest }}</span
      >天
    </p>
    <p v-if="buildTime" class="news-update">
      新闻更新时间：<span class="hightlight">{{ buildTime }}</span>
    </p>
  </section>

</template>

<style scoped>
p {
  margin: 4px;
  font-size: 1.2rem;
  line-height: 1.4;
}

.news-update {
  margin-top: 12px;
  font-size: 1.5rem;
}

.hightlight {
  margin: 6px;
  font-size: 1.5rem;
  font-weight: bold;
}

#datetime {
  margin-bottom: 24px;
  text-align: center;
}

#moment {
  font-size: 5rem;
  font-weight: bold;
  line-height: 1.2;
}
</style>

