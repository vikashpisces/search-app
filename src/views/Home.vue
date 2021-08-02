<template>
  <app-layout 
    :showLeftDrawer="false"
    page-title="Search App"
    >
    <router-view />
  </app-layout>
</template>

<script>
import AppLayout from '@/layouts/AppLayout.vue'

export default {
  name: 'Home',
  components: {
    AppLayout
  }
}
</script>

<style>

</style>