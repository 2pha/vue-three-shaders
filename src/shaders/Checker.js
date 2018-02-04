import * as THREE from 'three';

export default {
  name: 'Checker',
  uniforms: {
    color1: {
      type: 'c',
      value: new THREE.Color(0xffffff)
    },
    color2: {
      type: 'c',
      value: new THREE.Color(0x000000)
    },
    scale: {
      type: 'f',
      value: 5,
      min: 1, // only used for gui, not needed for production
      max: 50, // only used for gui, not needed for production
      step: 0.5 // only used for gui, not needed for production
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
uniform float scale;
varying vec2 vUv;
void main() {
  vec2 center = -1.0 + 2.0 * vUv;
  vec2 uv = floor(center.xy * scale);
  if(mod(uv.x + uv.y, 2.0) > 0.5){
    gl_FragColor = vec4(color1, 1.0);
  }else{
    gl_FragColor = vec4(color2, 1.0);
  }
}`
};
