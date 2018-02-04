import * as THREE from 'three';

export default {
  name: 'Fresnel 2 Color',
  uniforms: {
    color1: {
      type: 'c',
      value: new THREE.Color(0xffffff)
    },
    color2: {
      type: 'c',
      value: new THREE.Color(0x0000ff)
    },
    fresnelBias: {
      type: 'f',
      value: 0.1,
      min: 0.0, // only used for dat.gui, not needed for production
      max: 1.0, // only used for dat.gui, not needed for production
      step: 0.1
    },
    fresnelScale: {
      type: 'f',
      value: 1.0,
      min: 0.0, // only used for dat.gui, not needed for production
      max: 10.0, // only used for dat.gui, not needed for production
      step: 1.0
    },
    fresnelPower: {
      type: 'f',
      value: 2.0,
      min: 0.0, // only used for dat.gui, not needed for production
      max: 10.0, // only used for dat.gui, not needed for production
      step: 1.0
    }
  },
  vertexShader: `
uniform float fresnelBias;
uniform float fresnelScale;
uniform float fresnelPower;

varying float vReflectionFactor;

void main() {
  vec4 mvPosition = modelViewMatrix * vec4( position, 1.0 );
  vec4 worldPosition = modelMatrix * vec4( position, 1.0 );

  vec3 worldNormal = normalize( mat3( modelMatrix[0].xyz, modelMatrix[1].xyz, modelMatrix[2].xyz ) * normal );

  vec3 I = worldPosition.xyz - cameraPosition;

  vReflectionFactor = fresnelBias + fresnelScale * pow( 1.0 + dot( normalize( I ), worldNormal ), fresnelPower );

  gl_Position = projectionMatrix * mvPosition;
}`,
  fragmentShader: `
uniform vec3 color1;
uniform vec3 color2;

varying float vReflectionFactor;

void main() {
  gl_FragColor = vec4(mix(color2, color1, vec3(clamp( vReflectionFactor, 0.0, 1.0 ))), 1.0);
}`
};
