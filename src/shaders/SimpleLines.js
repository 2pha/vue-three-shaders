import * as THREE from 'three';

export default {
  name: 'Simple lines',
  uniforms: {
    color1: {
      type: 'c',
      value: new THREE.Color(0xffffff)
    },
    alpha1: {
      type: 'f',
      value: 1.0,
      min: 0.0,
      max: 1.0,
      step: 0.1
    },
    color2: {
      type: 'c',
      value: new THREE.Color(0x000000)
    },
    alpha2: {
      type: 'f',
      value: 1.0,
      min: 0.0,
      max: 1.0,
      step: 0.1
    },
    lines: {
      type: 'f',
      value: 14,
      min: 1,
      max: 100,
      step: 1.0
    },
    linewidth: {
      type: 'f',
      value: 5.0,
      min: 0.0,
      max: 100.0,
      step: 1.0
    }
  },
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
uniform vec3 color1;
uniform float alpha1;
uniform vec3 color2;
uniform float alpha2;
uniform float lines;
uniform float linewidth;
varying vec2 vUv;
void main() {
  float p = abs(fract(lines*vUv.y)*2.0-1.0);
  if(p < linewidth / 100.0){
    gl_FragColor = vec4(color1, alpha1);
  }else{
    gl_FragColor = vec4(color2, alpha2);
  }
}`
};
