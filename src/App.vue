<script>
import HelloWorld from './components/HelloWorld.vue'
import { defineAsyncComponent } from 'vue'

export default {
  components: {
    HelloWorld: defineAsyncComponent(() => import('./components/HelloWorld.vue')),
  },
}
</script>

<template>
  <Suspense>
    <!-- component with nested async dependencies -->
    <HelloWorld />

    <!-- loading state via #fallback slot -->
    <template #fallback></template>
  </Suspense>
</template>
