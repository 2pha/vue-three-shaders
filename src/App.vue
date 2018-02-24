<template>
  <div id="app">
    <scene :currentShape="state.currentShape" :currentShader="state.currentShader"  @animate="animateCallback"/>
    <stats/>
    <controls :shapes="shapes" :shaders="shaders" :currentShader="state.currentShader" @shapeSelected="changeShape" @shaderSelected="setShaderFromName" @codeButtonClick="showCode(true)"/>
    <div id="info">
          Three.js ShaderMaterial experiments.<br />
          Originals at
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://2pha.com/blog/experimenting-threejs-shaders-and-shadermaterial/"
          >
            this blog post
          </a>
          <br />
          Build with Three.js {{this.threeVersion}} and Vue.js<br />
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://github.com/2pha/vue-three-shaders"
          >
            https://github.com/2pha/vue-three-shaders
          </a>
        </div>
    <code-view @close="showCode(false)" :visible="state.showCode" :shaderName="state.currentShaderObject.name" :vertexShader="state.currentShaderObject.vertexShader" :fragmentShader="state.currentShaderObject.fragmentShader"></code-view>
  </div>
</template>

<script>
import * as THREE from 'three';
import * as Vue from 'vue';

import Scene from './components/Scene';
import Stats from './components/Stats';
import Controls from './components/Controls';
import CodeView from './components/CodeView';

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
    Controls,
    CodeView
  },
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
    getShaderFromName(name) {
      return this.shaders.find(x => x.name === name);
    },
    setShaderFromName(name) {
      let shader = this.getShaderFromName(name);
      //create the options object to send to ShaderMaterial.
      let shaderObject = {
        vertexShader: shader.vertexShader,
        fragmentShader: shader.fragmentShader,
        lights: true
      };
      // Add uniforms if present.
      if ('uniforms' in shader) {
        // Using UniformUtils will clone the shader files uniforms,
        shaderObject.uniforms = THREE.UniformsUtils.merge([
          THREE.UniformsLib['lights'],
          shader.uniforms
        ]);
      }
      // Set this new material on the mesh.
      let material = new THREE.ShaderMaterial(shaderObject);
      // add the original uniforms here so we can loop over them in the Controls, because other uniforms are added that we don't want controls for.
      material.customUniforms = shader.uniforms;

      //this.state.currentShader = material;
      //this.state.currentShaderObject = shader;
      this.state = Object.assign(this.state, {
        currentShader: material,
        currentShaderObject: shader
      });
      //this.setState({ currentShader: material, currentShaderObject: shader });
    },
    getShapeFromName(name) {
      return this.shapes.find(x => x.name === name);
    },
    animateCallback() {
      if (
        Boolean(this.state.currentShaderObject) &&
        Boolean(this.state.currentShaderObject.update)
      ) {
        this.state.currentShaderObject.update(
          this.state.currentShader.uniforms,
          this.clock
        );
      }
    },
    getShapeFromName(name) {
      return this.shapes.find(x => x.name === name);
    },
    changeShape(shapeName) {
      this.state.currentShape = this.getShapeFromName(shapeName);
      //this.setState({ currentShape: this.getShapeFromName(shapeName) });
    },
    showCode(show = false) {
      this.state.showCode = show;
    }
  },
  mounted() {
    this.setShaderFromName('Basic Color');
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

#info {
  padding: 10px;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 12px;
  line-height: 16px;
  color: #fff;
}
#info a {
  color: #fff;
}
</style>
