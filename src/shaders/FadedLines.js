import * as THREE from 'three';

export default {
  name: 'Faded lines',
  uniforms: {
    color1: {
      type: 'c',
      value: new THREE.Color(0xffffff)
    },
    color2: {
      type: 'c',
      value: new THREE.Color(0x000000)
    },
    amount: {
      type: 'f',
      value: 5,
      min: 1, // only used for dat.gui, not needed for production
      max: 100, // only used for dat.gui, not needed for production
      step: 1.0 // only used for gui, not needed for production
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
uniform vec3 color2;
uniform float amount;
varying vec2 vUv;
void main() {
  float p = abs(fract(amount*vUv.x)*2.0-1.0);
  vec3 col = mix(color1, color2, vec3(p));
  gl_FragColor = vec4(col, 1.0);
}`
};
