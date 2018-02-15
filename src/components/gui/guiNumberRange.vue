<template>
  <div>
    <div class="gui-label">{{label}}</div>
    <input ref="range" type="range" :value="value" :min="min" :max="max" :step="step" v-on:input="valueChange"/>
    <input ref="text" type="text" :value="value" v-on:change="valueChange"/>
  </div>
</template>

<script>
export default {
  name: 'NumberRange',
  props: {
    label: { type: String, default: '' },
    value: { type: Number, default: 0 },
    min: { type: Number, default: 0.0 },
    max: { type: Number, default: 100 },
    step: { type: Number, default: 0.1 }
  },
  methods: {
    valueChange(e) {
      let newval = parseFloat(e.target.value);
      if (isNaN(newval)) {
        return;
      }
      if (newval < this.min) {
        newval = this.min;
      } else if (newval > this.max) {
        newval = this.max;
      }
      this.$refs.range.value = this.$refs.text.value = newval;
      this.$emit('change', this.label, newval);
    }
  }
};
</script>


