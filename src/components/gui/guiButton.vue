<template>
  <div class="gui-item">
    <div class="gui-label"></div>
    <div class="gui-controller gui-button">
      <div @click="handleClick">{{label}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guiButton',
  props: {
    label: { type: String, required: true }
  },
  methods: {
    handleClick(e) {
      this.$emit('click', e);
    }
  }
};
</script>

<style scoped>
.gui-button {
  text-align: center;
  background-color: rgb(68, 68, 68);
  cursor: pointer;
  user-select: none;
  padding: 3px;
}
</style>


