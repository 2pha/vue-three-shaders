<template>
  <div class="gui-item gui-number-range">
    <div class="gui-label">{{label}}</div>
    <div class="gui-controller">
      <input ref="range" type="range" :value="value" :min="min" :max="max" :step="step" @input="valueChange"/>
      <input ref="text" type="text" :value="value" @change="valueChange"/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'guiNumberRange',
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

<style scoped>
input[type='range'] {
  -webkit-appearance: none; /* Hides the slider so that custom slider can be made */
  background: transparent; /* Otherwise white in Chrome */

  width: 65%;
  height: 18px;
  margin: 0px; /* needed for firefox */
}
input[type='range']:focus {
  outline: none;
}

/* CHROME */
input[type='range']::-webkit-slider-thumb {
  -webkit-appearance: none;

  height: 11px;
  width: 11px;
  border-radius: 0px;
  background: rgb(68, 68, 68);
  border: 1px solid rgb(0, 255, 170);
  cursor: pointer;
  margin-top: -5px; /* You need to specify a margin in Chrome, but in Firefox and IE it is automatic*/
}
input[type='range']::-webkit-slider-runnable-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: rgb(68, 68, 68);
  border-radius: 0px;
  border: 0px solid #010101;
  margin-top: 11px;
}
input[type='range']:focus::-webkit-slider-runnable-track {
  background: rgb(68, 68, 68);
}
/* FIREFOX */
input[type='range']::-moz-range-thumb {
  border: 1px solid rgb(0, 255, 170);
  height: 11px;
  width: 11px;
  border-radius: 0px;
  background: rgb(68, 68, 68);
  cursor: pointer;
}
input[type='range']::-moz-range-track {
  width: 100%;
  height: 1px;
  cursor: pointer;
  background: rgb(68, 68, 68);
  border-radius: 0px;
  border: none;
  margin-top: 11px;
}

/* FUCK MICROSOFT BROWSERS */
/* input[type='range']::-ms-track {
  width: 65%;
  cursor: pointer;

  background: transparent;
  border-color: transparent;
  color: transparent;
} */

input[type='text'] {
  width: 30%;
}
</style>




