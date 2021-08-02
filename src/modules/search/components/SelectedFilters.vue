<template>
  <el-row class="selected-filters">
    <template v-for="(values,field) in selectedFilters">
      <div 
        v-if="values.length"
        class="selected-filter" 
        :key="field">
        <el-tag type="success" class="filter-name" size="mini" effect="dark">{{field}}</el-tag>
        <el-tag 
          class="filter-value"
          v-for="value in values"
          :key="`${field}-${value}`"
          closable
          size="mini"
          type="info"
          @close="removeFilterValue(field, value)">
          {{value}}  
        </el-tag>
      </div>
    </template>
  </el-row>
</template>

<script>
export default {
  name: 'SelectedFilters',
  props: {
    selectedFilters: { type: Object, default: () => ({}) }
  },
  methods: {
    removeFilterValue (field, value) {
      this.$emit('remove-filter', {field, value})
    }
  }
}
</script>

<style lang="scss" scoped>
.selected-filters {
  border: 1px solid #c1c1c1;
  border-radius: 5px;
  padding: 10px 20px;
  background: #fff;
  min-width: 100%;
  min-height: 50px;
  .selected-filter {
    margin: 5px 0;
    width: 100%;
    .filter-name {
      margin-right: 5px;
    }
    .filter-value {
      +.filter-value {
        margin-left: 5px;
      }
      &:last-of-type {
        margin-right: 10px;
      }
    }
  }
}
</style>