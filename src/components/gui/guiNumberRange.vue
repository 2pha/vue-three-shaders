<template>
  <div>
    <div class="gui-label">{{label}}</div>
    <input type="range" :value="value" :min="min" :max="max" :step="step" v-on:input="valueChange"/>
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
      //console.log(e);
      this.$emit('change', this.label, e.target.value);
    }
  }
};
</script>


