<template>
  <div class="dashboard-view">
    <dashboard-module></dashboard-module>
  </div>
</template>

<script>
import DashboardModule from '@/modules/dashboard'
export default {
  name: 'Dashboard',
  components: {
    DashboardModule
  }
}
</script>

<style lang="scss" scoped>
.dashboard-view {
  height: 100%;
}
</style>