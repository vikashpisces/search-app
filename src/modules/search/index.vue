<template>
  <div class="search-module">
    <el-row>
      <el-col class="filter-section col">
        <filter-panel :master-data="searchData" @selected-filter="handleSelectedFilerChange"></filter-panel>
      </el-col>
    </el-row>
    <el-container class="search-results">
      <template v-if="!filterExists">
        <el-alert
          effect="dark"
          title="Please select field and their values to search"
          type="info" />
      </template>
      <template v-else >
        <component :is="resultView" class="result-container" :search-result="searchResult"></component>
      </template>
    </el-container>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import FilterPanel from './components/FilterPanel'
import UsersResultComponent from './components/UsersResultComponent'
export default {
  name: 'SearchModule',
  components: {
    FilterPanel,
    UsersResultComponent
  },
  data () {
    return {
      selectedFilters: {},
      searchResult: []
    }
  },
  computed: {
    ...mapState('entities', ['users', 'tickets', 'organizations']),
    queryBy () {
      return this.$route?.query?.by || ''
    },
    searchData () {
      const searchByField = this.queryBy
      return this[searchByField] || []
    },
    filterExists () {
      return Object.keys(this.selectedFilters || {})?.length > 0
    },
    resultView () {
      const searchByField = this.queryBy
      return `${searchByField}-result-component`
    }
  },
  methods: {
    handleSelectedFilerChange (selectedFilters) {
      this.selectedFilters = selectedFilters
      this.fetchSearchResult()
    },
    fetchSearchResult () {
      if(this.queryBy?.toLowerCase() === 'users') {
        this.fetchUserSearchResult()
      }
    },
    fetchUserSearchResult () {
      this.searchResult = []
      this.searchResult = this.users.filter(this.findUser)
    },
    findUser (user) {
      const fieldToFilter = Object.keys(this.selectedFilters)
      return fieldToFilter.every( field => field in user && this.selectedFilters[field].includes(user[field]))
    }
  }
}
</script>

<style lang="scss" scoped>
.search-module {
  height: 100%;
  display: flex;
  flex-direction: column;
  .filter-section {
    width: 100%;
  }
  .search-results{ 
    height: 100%;
    overflow: auto;
    flex-direction: column;
    .el-alert {
      height: 35px;
    }
   .result-container {
      height: 100%;
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.search-results {
  .el-overlay {
    overflow: hidden !important;
    .el-dialog {
      width: 99% !important;
      height: 98% !important;
      margin: 0.5% !important;
      &__body {
        height: calc(100% - 115px);
        overflow: auto;
      }
    }
  }
}
</style>