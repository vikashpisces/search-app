<template>
  <div class="user-detail">
    <el-collapse v-model="activeTabName">
      <el-collapse-item title="User Info" name="users">
        <user-info :details="userDetails" key="users"></user-info>
      </el-collapse-item>
      <el-collapse-item title="Organization" name="org">
        <user-info :details="orgDetails" key="org"></user-info>
      </el-collapse-item>
      <el-collapse-item title="Tickets Assigned" name="tickets">
        <ticket-info :details="ticketDetails"></ticket-info>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import UserInfo from './UserInfo'
import TicketInfo from './TicketInfo'
export default {
  name: 'UserDetail',
  components: {
    UserInfo,
    TicketInfo
  },
  props: {
    selectedUser: Object
  },
  data () {
    return {
      activeTabName: 'users',
      userDetails: [],
      orgDetails: [],
      ticketDetails: [],
    }
  },
  computed: {
    ...mapState('entities', ['users', 'organizations', 'tickets'])
  },
  watch: {
    selectedUser: {
      handler: function () {
        this.fetchUserDetails()
        this.fetchOrgDetails()
        this.fetchTicketDetails()
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    fetchUserDetails () {
      this.userDetails = []
      const requiredFields = [
        {key: 'name', label: 'Name'},
        {key: 'alias', label: 'Alias'},
        {key: 'email', label: 'Email'},
        {key: 'last_login_at', label: 'Last Login at'},
        {key: 'phone', label: 'Phone no'},
        {key: 'signature', label: 'Tagline'},
        {key: 'timeZone', label: 'Region'},
        {key: 'locale', label: 'Region'},
      ]

      requiredFields.forEach(field => {
        if(field.key in this.selectedUser) {
          this.userDetails.push({...field, value: this.selectedUser[field.key]})
        }
      })
    },
    fetchOrgDetails () {
      this.orgDetails = []
      const requiredFields = [
        {key: 'name', label: 'Name'},
        {key: 'details', label: 'About'},
        {key: 'created_at', label: 'Established on'},
        {key: 'domain_names', label: 'Domains'},
      ]

      const availableOrgs = this.organizations.find(org => org._id === this.selectedUser.organization_id)
      requiredFields.forEach(field => {
        if(field.key in availableOrgs) {
          let value = availableOrgs[field.key]
          this.orgDetails.push({...field, value: Array.isArray(value) ? value.join(', ') : value})
        }
      })
    },
    fetchTicketDetails () {
      this.tickets.forEach(ticket => {
        if(ticket.assignee_id === this.selectedUser._id) {
          const reporter = this.users.find(user => user._id === ticket.submitter_id)?.name
          this.ticketDetails.push({
            ...ticket, reporter
          })
        }
      })
    }
  }
}
</script>

<style lang="scss">
.user-detail {
  .el-collapse {
    border: none;
    &-item{
      position: relative;
      &__header {
        border: none;
        font-size: 1.2em;
        color: #173753;
        padding-left: 10px;
      }
      &__arrow {
        position: absolute;
        left: -10px;
      }
      &__content {
        padding: 5px 10px 25px;
      }
      &__wrap {
        border: none;
      }
    }
  }
}
</style>