<template>
  <section class="content">
    <section class="item" v-for="(obj, key) in details" :key="key">
      <label class="label">{{obj.label}}</label>
      <div class="value">{{obj.value}}</div>
    </section>
  </section>
</template>

<script>
export default {
  name: 'UserDetail',
  props: {
    details: Object
  }
}
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  .item {
    display: flex;
    .label {
      color: #a9a9a9;
      font-weight: 500;
    }
    .value {
      margin-left: 5px;
    }
  }
}
</style>