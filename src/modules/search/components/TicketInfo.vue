<template>
  <el-table 
    :data="details"
    empty-text="No tickets are assigned yet"
  >
    <el-table-column
      v-for="column in gridColumns"
      :key="`ticket-column-${column.label}`"
      :prop="column.prop"
      :label="column.label"
      :width="column.width"
      sortable
    ></el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'TicketInfo',
  props: {
    details: Array
  },
  data () {
    return {
      gridColumns: [
        {prop: 'subject', label: 'Subject'},
        {prop: 'priority', label: 'Priority', width: '100'},
        {prop: 'status', label: 'Status', width: '100'},
        {prop: 'type', label: 'Type'},
        {prop: 'via', label: 'Created via'},
        {prop: 'created_at', label: 'Created at'},
        {prop: 'reporter', label: 'Reporter'},
        {prop: 'description', label: 'Description',width: '350'},
      ]
    }
  }
}
</script>

<style>

</style>