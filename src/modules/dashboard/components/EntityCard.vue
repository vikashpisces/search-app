<template>
  <el-card 
    class="entity-card"
    v-loading="entity.isLoading">
    <div class="entity-data items-center">
      <h4 class="col label">{{ entity.title }}</h4>
      <div class="col value" v-if="!entity.isLoading"> {{ entity.count }}</div>
    </div>
    <div class="action items-center justify-center">
      <el-button type="primary" :disabled="!entity.searchEnabled" icon="el-icon-search" @click="handleSearch(entity.title)"> Search
      </el-button>
    </div>
  </el-card>
</template>

<script>
export default {
  name: 'EntityCard',
  props: {
    entity: { type: Object, default: () => ({title: '', isLoading: false, searchEnabled: false, count: 0 }) }
  },
  methods: {
    handleSearch (entity = '') {
      entity = entity.toLowerCase()
      this.$router.push({ path: '/search', query: { by: entity } })
    }
  }
}
</script>

<style lang="scss">
.entity-card {
  border-radius: 10px;
  height: 200px;
  padding: 20px 40px;
  position: relative;
  background-color: #65d169;
  .entity-data {
    display: flex;
    flex-direction: column;
  }
  .action {
    position: absolute;
    bottom: 5px;
    width: 100%;
    margin: 0 25%;
  }
}
</style>