import * as THREE from 'three';

export default {
  name: 'Basic Color',
  uniforms: {
    diffuse: { type: 'c', value: new THREE.Color(0xff0000) }
  },
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
uniform vec3 diffuse;
void main() {
  gl_FragColor = vec4(diffuse.x, diffuse.y, diffuse.z, 1.0);
}`
};
