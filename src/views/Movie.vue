<script>
export default {
  name: 'Movie',
  created() {
    console.log(this.$route.query.id);
  },
};
</script>

<template>
  <div>
    Hello there
  </div>
</template>

<style>

</style>
