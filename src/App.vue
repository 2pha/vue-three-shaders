<template>
  <div id="app">
    <Scene/>
  </div>
</template>

<script>
import * as THREE from 'three';

import Scene from './components/Scene';

export default {
  name: 'App',
  components: {
    Scene
  },
  data: function() {
    return {
      shaders: [],
      shapes: [],
      state: {},
      clock: new THREE.Clock(),
      threeVersion: THREE.REVISION
    };
  },
  methods: {
    setShaderFromName: function() {},
    getShapeFromName: function(name) {
      return this.shapes.find(x => x.name === name);
    },
    animateCallback: function() {}
  },
  created() {
    console.log(this);
  }
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
canvas {
  display: block;
  position: fixed;
}
div {
  box-sizing: border-box;
}
</style>
