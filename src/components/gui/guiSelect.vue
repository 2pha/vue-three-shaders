<template>
  <select v-on:change="handleSelect">
    <option v-bind:key="index" v-for="(option, index) in listOptions">{{option}}</option>
  </select>
</template>

<script>
export default {
  name: 'guiSelect',
  props: { options: { type: Array }, onChange: { type: Function } },
  computed: {
    listOptions() {
      return this.options;
    }
  },
  methods: {
    handleSelect(e) {
      //if (this.props.onChange) {
      //this.props.onChange(e.target.value);
      this.$emit('optionSelected', e.target.value);
      //}
    }
  }
};
</script>

<style scoped>

</style>
