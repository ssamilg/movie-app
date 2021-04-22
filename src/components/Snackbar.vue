<script>
export default {
  name: 'Snackbar',
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  mounted() {
    setTimeout(() => {
      this.$emit('close');
    }, 4000);
  },
  computed: {
    cardStyle() {
      let style = '';

      switch (this.type) {
        case 'warning':
          style = 'border: 1px solid #dda703; background-color: #fbbd08;';
          break;
        case 'error':
          style = 'border: 1px solid #c02121; background-color: #DB2828;';
          break;
        case 'success':
          style = 'border: 1px solid #1c9c3a; background-color: #21BA45;';
          break;

        default:
          break;
      }

      return style;
    },
  },
};
</script>

<template>
  <div id="snackbar">
    <div class="ui card" :style="cardStyle">
      <div class="content">
        <div class="header">
          {{ text }}
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#snackbar {
  position: absolute;
  padding: 16px;
  z-index: 999;
  width: 20%;
  bottom: 3%;
  right: 2%;
  animation: fadeIn .5s;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
</style>
