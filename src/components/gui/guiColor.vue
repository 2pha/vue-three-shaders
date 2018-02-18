<template>
  <div class="gui-item gui-color">
    <div class="gui-label">{{label}}</div>
    <div class="gui-controller">
      <div @click="toggleExpanded" class="gui-color-toggle" :style="colorBackgroundStyle">{{state.red}}, {{state.green}}, {{state.blue}}</div>
      <div class="gui-color-sliders" :class="{ closed: !state.expanded }">
        <gui-number-range label="red" @change="colorInputChange" :value="state.red" :min="0" :max="255" :step="1.0" />
        <gui-number-range label="green" @change="colorInputChange" :value="state.green" :min="0" :max="255" :step="1.0" />
        <gui-number-range label="blue" @change="colorInputChange" :value="state.blue" :min="0" :max="255" :step="1.0" />
      </div>
    </div>
  </div>
</template>

<script>
import guiNumberRange from './guiNumberRange';

export default {
  name: 'Color',
  components: {
    guiNumberRange
  },
  data() {
    return {
      state: {
        expanded: false,
        red: 0,
        green: 0,
        blue: 0
      }
    };
  },
  props: {
    label: { type: String, default: '' },
    red: { type: Number, default: 0 },
    green: { type: Number, default: 0 },
    blue: { type: Number, default: 0 }
  },
  watch: {
    red: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== this.state.red) {
          this.state.red = newVal;
        }
      }
    },
    green: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== this.state.green) {
          this.state.green = newVal;
        }
      }
    },
    blue: {
      immediate: true,
      handler(newVal, oldVal) {
        if (newVal !== this.state.blue) {
          this.state.blue = newVal;
        }
      }
    }
  },
  computed: {
    colorBackgroundStyle() {
      return {
        background: `rgb(
          ${this.state.red},
          ${this.state.green},
          ${this.state.blue})`
      };
    }
  },
  methods: {
    colorInputChange(col, newval) {
      if (this.state[col] !== newval) {
        this.state[col] = newval;
        this.$emit('change', this.label, {
          red: this.state.red,
          green: this.state.green,
          blue: this.state.blue
        });
      }
    },
    toggleExpanded() {
      this.state.expanded = !this.state.expanded;
    }
  }
};
</script>

<style scoped>
.closed {
  display: none;
}
.gui-color-toggle {
  font-size: 11px;
  line-height: 18px;
  height: 18px;
  width: 100%;
  text-align: center;
  color: white;
  text-shadow: black 0px 0px 4px, black 0px 0px 4px, black 0px 0px 4px,
    black 0px 0px 4px, black 0px 0px 4px;
  cursor: pointer;
  user-select: none;
}
</style>


