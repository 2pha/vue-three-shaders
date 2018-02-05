<template>
  <div id="controls" style="color: #fff">
    <gui-select :options="shapeNames" @optionSelected="shapeSelected"/>
    <gui-select :options="shaderNames" @optionSelected="shaderSelected"/>
  </div>
</template>

<script>
import guiSelect from './gui/guiSelect';

export default {
  name: 'Controls',
  components: {
    guiSelect
  },
  props: {
    shapes: { type: Array, required: true },
    onShapeSelect: { type: Function },
    shaders: { type: Array, required: true },
    currentShader: { type: Object },
    onShaderSelect: { type: Function },
    onCodeButtonClick: { type: Function }
  },
  computed: {
    shapeNames() {
      return this.shapes.map(shape => shape.name);
    },
    shaderNames() {
      return this.shaders.map(shader => shader.name);
    }
  },
  methods: {
    shapeSelected(shapeName) {
      this.$emit('shapeSelected', shapeName);
    },
    shaderSelected(value) {
      this.$emit('shaderSelected', value);
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
