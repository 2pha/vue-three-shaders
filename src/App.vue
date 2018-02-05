<template>
  <div id="app">
    <Scene :currentShape="state.currentShape"/>
    <Stats/>
    <Controls :shapes="shapes" :shaders="shaders" @shapeSelected="changeShape" @shaderSelected="testing"/>
  </div>
</template>

<script>
import * as THREE from 'three';

import Scene from './components/Scene';
import Stats from './components/Stats';
import Controls from './components/Controls';

import basicColor from './shaders/BasicColor';
import basicColorLights from './shaders/BasicColorLights';
import checker from './shaders/Checker';
import dots from './shaders/Dots';
import simpleLines from './shaders/SimpleLines';
import fadedLines from './shaders/FadedLines';
import starburst from './shaders/Starburst';
import matrix from './shaders/Matrix';
import normal from './shaders/Normal';
import voronoise from './shaders/Voronoise';
import woodGrain from './shaders/WoodGrain';
import simplexNoise3D from './shaders/SimplexNoise3D';
import perlinNoise3D from './shaders/PerlinNoise3D';
import perlinVertexDisp from './shaders/PerlinVertexDisp';
import polkaNoise from './shaders/PolkaNoise';
import fresnel2Color from './shaders/Fresnel2Color';

export default {
  name: 'App',
  components: {
    Scene,
    Stats,
    Controls
  },
  testing: 'hmmm',
  data() {
    return {
      shaders: [
        basicColor,
        basicColorLights,
        checker,
        dots,
        simpleLines,
        fadedLines,
        starburst,
        normal,
        matrix,
        voronoise,
        woodGrain,
        simplexNoise3D,
        perlinNoise3D,
        perlinVertexDisp,
        polkaNoise,
        fresnel2Color
      ],
      shapes: [
        {
          name: 'Cube',
          class: 'BoxGeometry',
          args: [200, 200, 200, 50, 50, 50]
        },
        { name: 'Sphere', class: 'SphereGeometry', args: [150, 32, 32] },
        {
          name: 'Cylinder',
          class: 'CylinderGeometry',
          args: [100, 100, 200, 32, 100]
        },
        {
          name: 'Torus Knot',
          class: 'TorusKnotGeometry',
          args: [100, 30, 100, 16]
        }
      ],
      state: {
        currentShader: {},
        currentShaderObject: {},
        currentShape: {
          name: 'Cube',
          class: 'BoxGeometry',
          args: [200, 200, 200, 50, 50, 50]
        },
        showCode: false
      },
      clock: new THREE.Clock(),
      threeVersion: THREE.REVISION
    };
  },
  methods: {
    setShaderFromName() {},
    getShapeFromName(name) {
      return this.shapes.find(x => x.name === name);
    },
    animateCallback() {},
    getShapeFromName(name) {
      return this.shapes.find(x => x.name === name);
    },
    changeShape(shapeName) {
      this.state.currentShape = this.getShapeFromName(shapeName);
      //this.setState({ currentShape: this.getShapeFromName(shapeName) });
    },
    testing(e) {
      console.log('testing');
      console.log(e);
    }
  },
  created() {
    //console.log(this);
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
