<script>
export default {
  name: 'Datatable',
  props: {
    items: {
      type: Array,
      required: true,
    },
    headers: {
      type: Array,
      required: true,
    },
  },
};
</script>

<template>
    <table class="ui celled table">
      <thead>
        <tr>
          <th v-for="header in headers" :key=header>
            {{ header }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="item in items" :key="item.id">
          <template v-for="header in headers">
            <td :key="header" :data-label="header">
              <template v-if="header === 'Poster'">
                <img :src="item.Poster" height="200">
              </template>

              <template v-else>
                <div class="text-truncate">
                  {{ item[header] }}
                </div>
              </template>
            </td>
          </template>
        </tr>
      </tbody>
    </table>
</template>

<style lang="scss">
.text-truncate {
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
}
</style>
