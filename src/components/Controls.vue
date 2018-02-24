<template>
  <div id="controls" style="color: #fff">
    <gui-select label="Shape" :options="shapeNames" @optionSelected="shapeSelected"/>
    <gui-select label="Shader" :options="shaderNames" @optionSelected="shaderSelected"/>
    <div v-bind:key="key" v-for="(uniform, key) in customUniforms">
      <!-- Have to use v-bind (:) here so a number is passed to props instead of string. https://vuejs.org/v2/guide/components.html#Literal-vs-Dynamic -->
      <gui-number-range v-if="uniform.type == 'f' && !Boolean(uniform.hidden)" :label="key" :value="uniform.value" :min="uniform.min" :max="uniform.max" :step="uniform.step" v-on:change="numberUniformChange"/>
      <gui-color v-if="uniform.type == 'c' && !Boolean(uniform.hidden)" :label="key" :red="parseInt(uniform.value.r * 256, 10)" :green="parseInt(uniform.value.g * 256, 10)" :blue="parseInt(uniform.value.b * 256, 10)" v-on:change="colorUniformChange" />
    </div>
    <gui-button label="view shader code" @click="codeButtonClick"/>
  </div>
</template>

<script>
import guiSelect from './gui/guiSelect';
import guiNumberRange from './gui/guiNumberRange';
import guiColor from './gui/guiColor';
import guiButton from './gui/guiButton';

export default {
  name: 'Controls',
  components: {
    guiSelect,
    guiNumberRange,
    guiColor,
    guiButton
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
      this.currentShader.uniforms[key].value = value;
    },
    colorUniformChange(key, value) {
      this.currentShader.uniforms[key].value.setRGB(
        value.red / 256,
        value.green / 256,
        value.blue / 256
      );
    },
    codeButtonClick(e) {
      this.$emit('codeButtonClick', e);
    }
  }
};
</script>

<style>
#controls {
  position: fixed;
  right: 8px;
  top: 0px;
  font-size: 11px;
  font-family: Arial, Helvetica, sans-serif;
  line-height: normal;
}
input,
select {
  background-color: rgb(68, 68, 68);
  border: none;
  outline: none;
  color: rgb(0, 255, 170);
  font-size: 11px;
  line-height: 18;
  font-family: Arial;
  height: 18px;
  user-select: none;
  cursor: pointer;
}
.gui-item {
  border-bottom: 1px solid rgb(51, 51, 51);
  background-color: rgb(26, 26, 26);
  min-height: 24px;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  flex-flow: row wrap;
  align-items: center;
}
.gui-label {
  width: 96px;
  padding: 3px;
  color: rgb(255, 255, 255);
  cursor: default;
  user-select: none;
}
.gui-controller {
  width: 192px;
  color: rgb(0, 255, 170);
}
</style>
