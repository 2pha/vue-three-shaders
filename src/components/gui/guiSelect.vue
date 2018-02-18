<template>
  <div class="gui-item gui-select">
    <div class="gui-label">{{label}}</div>
    <div class="gui-controller">
      <select v-on:change="handleSelect">
        <option v-bind:key="index" v-for="(option, index) in listOptions">{{option}}</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guiSelect',
  props: {
    label: { type: String },
    options: { type: Array },
    onChange: { type: Function }
  },
  computed: {
    listOptions() {
      return this.options;
    }
  },
  methods: {
    handleSelect(e) {
      this.$emit('optionSelected', e.target.value);
    }
  }
};
</script>

<style scoped>

</style>
