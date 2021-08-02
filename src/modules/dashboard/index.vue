<template>
  <div class="dashboard-module justify-evenly items-center">
    <el-row :gutter="10">
      <el-col 
        :sm="24" :md="12" :lg="8" 
        v-for="(entity, index) in entityList" :key="`card-${index}`">
        <entity-card :entity="entity"/>
      </el-col> 
    </el-row>
    
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import EntityCard from './components/EntityCard'
import $http from '@/services/httpClient'

export default {
  name: 'DashboardModule',
  components: {
    EntityCard
  },
  data () {
    return {
      entityList: [
        { title: 'Organizations', count: 0, isLoading: false, searchEnabled: false },
        { title: 'Users', count: 0, isLoading: false, searchEnabled: true },
        { title: 'Tickets', count: 0, isLoading: false, searchEnabled: false }
      ]
    }
  },
  created() {
    this.init()
  },
  methods: {
    ...mapActions('entities', [ 'saveUsers', 'saveTickets', 'saveOrganizations']),
    init () {
      this.fetchEntitiesData()
    },
    fetchEntitiesData () {
      this.entityList.forEach(this.fetchEntityData)
    },
    async fetchEntityData (entity) {
      try {
        entity.isLoading = true
        const url = `/${entity.title.toLowerCase()}`
        const response = await $http.get(url)
        const data = response?.data || []
        // this.saveUsers(data)
        this[`save${entity.title}`](data)
        entity.count = data.length
      } catch (error) {
        console.log(`Error while fetching entity ${entity.title} data: `, error)
      } finally {
        entity.isLoading = false
      }
    }
  }
}
</script>

<style lang="scss">
.dashboard-module {
  .entity-card {
    .value {
      font-size: 5em;
    }
  }
}
</style>