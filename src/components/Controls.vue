<template>
  <div id="controls" style="color: #fff">
    <gui-select label="Shape" :options="shapeNames" @optionSelected="shapeSelected"/>
    <gui-select label="Shader" :options="shaderNames" @optionSelected="shaderSelected"/>
    <div v-bind:key="key" v-for="(uniform, key) in customUniforms">
      <!-- Have to use v-bind (:) here so a number is passed to props instead of string. https://vuejs.org/v2/guide/components.html#Literal-vs-Dynamic -->
      <gui-number-range v-if="uniform.type == 'f'" :label="key" :value="uniform.value" :min="uniform.min" :max="uniform.max" :step="uniform.step" v-on:change="numberUniformChange"/>
    </div>
  </div>
</template>

<script>
import guiSelect from './gui/guiSelect';
import guiNumberRange from './gui/guiNumberRange';

export default {
  name: 'Controls',
  components: {
    guiSelect,
    guiNumberRange
  },
  props: {
    shapes: { type: Array, required: true },
    shaders: { type: Array, required: true },
    currentShader: { type: Object, required: true }
  },
  computed: {
    shapeNames() {
      return this.shapes.map(shape => shape.name);
    },
    shaderNames() {
      return this.shaders.map(shader => shader.name);
    },
    customUniforms() {
      if (typeof this.currentShader.customUniforms !== 'undefined') {
        return this.currentShader.customUniforms;
      } else {
        return {};
      }
    }
  },
  methods: {
    shapeSelected(shapeName) {
      this.$emit('shapeSelected', shapeName);
    },
    shaderSelected(value) {
      this.$emit('shaderSelected', value);
    },
    numberUniformChange(key, value) {
      //console.log(key);
      //console.log(value);
      //console.log(this.currentShader);
      this.currentShader.uniforms[key].value = value;
    }
  }
};
</script>

<style scoped>
#controls {
  position: absolute;
  right: 0px;
  top: 0px;
}
</style>
