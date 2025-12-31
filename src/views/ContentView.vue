<script setup lang="ts">
import { ref, watch } from 'vue'
import DateTime from '../components/DateTime.vue'
import SettingsMenu from '../components/SettingsMenu.vue'
import HotNews from '../components/HotNews.vue'
import { useMode } from '../composables/useMode'
import { useMoment } from '../composables/useMoment'

const { moment } = useMoment()
const { mode, config } = useMode()
const transform = ref(`rotate(${config.turn}turn)`)

watch(config, (n) => (transform.value = `rotate(${n.turn}turn)`))
</script>

<template>
  <main id="container">
    <section id="content">
      <section id="w1">
        <DateTime :date="moment" />
      </section>
      <section id="w2">
        <HotNews />
      </section>
    </section>
    <section id="setting">
      <SettingsMenu v-model="mode" />
    </section>
  </main>
</template>

<style lang="scss" scoped>
#container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}

#content {
  transform: v-bind('transform');
  overflow: visible;
  display: flex;
  flex-direction: column;
  /* 正方形容器：取视口宽高的较小值 */
  width: min(95vw, 95vh);
  height: min(95vw, 95vh);
}

#w1 {
  flex-shrink: 0;
  padding: 8px 16px;
}

#w2 {
  flex: 1;
  min-height: 0;
  overflow: hidden;
}

@media (max-width: 820px) {
  #content {
    transform: none;
    width: min(100vw, 100vh);
    height: min(100vw, 100vh);
  }
}

#setting {
  position: absolute;
  top: 16px;
  right: 16px;
}
</style>
