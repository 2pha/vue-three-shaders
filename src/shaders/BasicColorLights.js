import * as THREE from 'three';

export default {
  name: 'Basic color with lights',
  uniforms: {
    diffuse: { type: 'c', value: new THREE.Color(0x0000ff) }
  },
  vertexShader: `
varying vec2 vUv;
varying vec3 vPos;
varying vec3 vNormal;
void main() {
  vUv = uv;
  vNormal = normalMatrix * normal;
  vPos = (modelViewMatrix * vec4(position, 1.0 )).xyz;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
uniform vec3 diffuse;
varying vec3 vPos;
varying vec3 vNormal;

struct PointLight {
  vec3 position;
  vec3 color;
  float distance;
  float decay;
  int shadow;
  float shadowBias;
  float shadowRadius;
  vec2 shadowMapSize;
};
uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

void main() {
  vec4 addedLights = vec4(0.0,0.0,0.0, 1.0);

  for(int l = 0; l < NUM_POINT_LIGHTS; l++) {
    float diffuseCoefficient = max( 1.0 - (distance(pointLights[l].position,vPos) / 500.0 ), 0.0);
    addedLights.rgb += diffuseCoefficient * pointLights[l].color;
  }
  gl_FragColor = mix(vec4(diffuse.x, diffuse.y, diffuse.z, 1.0), addedLights, addedLights);
}
`
};
