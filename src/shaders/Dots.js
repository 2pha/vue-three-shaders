import * as THREE from 'three';

export default {
  name: 'Dots',
  uniforms: {
    color1: {
      type: 'c',
      value: new THREE.Color(0xffffff)
    },
    color2: {
      type: 'c',
      value: new THREE.Color(0x000000)
    },
    radius1: {
      type: 'f',
      value: 0.3,
      min: 0, // only used for dat.gui, not needed for production
      max: 1, // only used for dat.gui, not needed for production
      step: 0.01 // only used for gui, not needed for production
    },
    radius2: {
      type: 'f',
      value: 0.32,
      min: 0, // only used for dat.gui, not needed for production
      max: 1, // only used for dat.gui, not needed for production
      step: 0.01 // only used for gui, not needed for production
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
uniform float radius1;
uniform float radius2;
uniform float amount;
varying vec2 vUv;
void main() {
  float p = smoothstep(radius1, radius2, length(fract(amount*vUv)-0.5));
  vec3 col = mix(color1, color2, vec3(p));
  gl_FragColor = vec4(col, 1.0);
}`
};
