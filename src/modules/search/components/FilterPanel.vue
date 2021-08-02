<template>
  <div class="filter-panel">
    <el-row>
      <el-col :span="24">
        <el-select
          class="field-selection"
          v-model="searchByField"
          :placeholder="fieldPlaceholder"
          filterable
          @change="handleFieldSelection"
        >
          <el-option 
            v-for="item in fieldList" 
            :key="item"
            :label="item"
            :value="item"
            ></el-option>
        </el-select>
        <el-select
          class="field-value-selection"
          v-model="selectedFieldValues"
          :placeholder="fieldValuePlaceholder"
          multiple
          filterable
          collapse-tags
          @change="handleFieldValueSelection"
        >
          <el-option 
            v-for="value in fieldValues" 
            :key="value"
            :label="value"
            :value="value"
            ></el-option>
        </el-select>
      </el-col>
    </el-row>
    <el-row class="selected-filter-container">
      <selected-filters :selectedFilters="selectedFilters" @remove-filter="handleFilterRemoval"></selected-filters>
    </el-row>
  </div>
</template>

<script>
import SelectedFilters from './SelectedFilters'
export default {
  name: 'FilterPanel',
  components: {
    SelectedFilters
  },
  props: {
    masterData: Array
  },
  data () {
    return {
      searchByField: undefined,
      selectedFieldValues: [],
      fieldValues: [],
      selectedFilters: {}
    }
  },
  created () {
  },
  computed: {
    entityType () {
      return this.$route?.query?.by || ''
    },
    fieldPlaceholder () {
      return this.entityType && `Query by ${this.entityType} field` || ''
    },
    fieldValuePlaceholder () {
      return this.searchByField && `Select ${this.searchByField} value(s)`
    },
    fieldList () {
      return this.masterData?.length && Object.keys(this.masterData[0]) || []
    }
    
  },
  methods: {
    handleFieldSelection () {
      this.selectedFieldValues = []
      this.fieldValues = new Set([...this.masterData.map(data => data[this.searchByField])])
    },
    handleFieldValueSelection () {
      this.selectedFilters[this.searchByField]= this.selectedFieldValues
      if(!this.selectedFieldValues.length) {
        delete this.selectedFilters[this.searchByField]
      }
      this.$emit('selected-filter', this.selectedFilters)
    },
    handleFilterRemoval (removedFilter = {}) {
      const fieldValues = this.selectedFilters[removedFilter?.field]
      if(!fieldValues || !fieldValues.length) {
        return
      }

      const valuePos = fieldValues.indexOf(removedFilter?.value)
      fieldValues.splice(valuePos, 1)
      if(!fieldValues.length) {
        delete this.selectedFilters[removedFilter?.field]
      }
      this.$emit('selected-filter', this.selectedFilters)
    }
  }
}
</script>

<style lang="scss" scoped>
.filter-panel {
  .el-select {
    +.el-select {
      margin-left: 15px;
    }
  }
  .field-selection {
    &.el-select {
      min-width: 220px;
    }
  }
  .field-value-selection {
    &.el-select {
      min-width: 400px;
    }
  }
  .search-button {
    margin-left: 10px;
  }
  .selected-filter-container {
    margin: 10px 0;
  }
}

</style>