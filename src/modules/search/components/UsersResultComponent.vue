<template>
  <div class="users-result-component">
    <el-table 
      :data="searchResult"
      height="100%"
      empty-text="Users not found...">
      <el-table-column
        v-for="column in gridColumns"
        :key="`result-column-${column.label}`"
        :prop="column.prop"
        :label="column.label"
        sortable
      >
        <template v-if="column.prop === 'name'" #default="scope">
          <el-button type="text" @click="handleNameClick(scope.row)">{{scope.row.name}}</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <el-dialog
    :title="dialogTitle"
    width="100%"
    v-model="showUserDetailDialog"
    >
    <user-detail :selected-user="selectedUser"></user-detail>
  </el-dialog>
</template>

<script>
import UserDetail from './UserDetail.vue'
export default {
  name: 'UsersResultComponent',
  components: {
    UserDetail
  },
  props: {
    searchResult: Array
  },
  data () {
    return {
      gridData: [],
      gridColumns: [
        {
          prop: 'name',
          label: 'Name'
        },
        {
          prop: 'alias',
          label: 'Alias'
        },
        {
          prop: 'email',
          label: 'Email'
        },
        {
          prop: 'last_login_at',
          label: 'Last Login at'
        }
      ],
      selectedUser: {},
      showUserDetailDialog: false
    }
  },
  computed: {
    dialogTitle () {
      return `User Detail - ${this.selectedUser?.name}`
    }
  },
  methods: {
    handleNameClick (user) {
      this.selectedUser = user
      this.showUserDetailDialog = true
    }
  }
}
</script>

<style lang="scss" scoped>
.users-result-component {
  height: 100%;
}
</style>