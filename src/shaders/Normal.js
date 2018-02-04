export default {
  name: 'Normal',
  path: '!normal',
  uniforms: {},
  vertexShader: `
varying vec3 transformedNormal;
void main() {
  transformedNormal = normalMatrix * normal;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
varying vec3 transformedNormal;
void main() {
  gl_FragColor = vec4(normalize(transformedNormal), 1.0);
}`
};
