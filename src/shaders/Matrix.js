import * as THREE from 'three';

export default {
  name: 'Matrix',
  uniforms: {
    colour: {
      type: 'c',
      value: new THREE.Color(0x89ff89)
    },
    rows: {
      type: 'f',
      value: 15,
      min: 1,
      max: 100,
      step: 1.0
    },
    glow: {
      type: 'f',
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.1
    },
    glowRadius: {
      type: 'f',
      value: 1.0,
      min: 0,
      max: 1,
      step: 0.1
    },
    charDetail: {
      type: 'f',
      value: 3.0,
      min: 0,
      max: 10,
      step: 0.1
    },
    speed: {
      type: 'f',
      value: 10.0,
      min: 0,
      max: 100,
      step: 1.0
    },
    iGlobalTime: {
      type: 'f',
      value: 0.0,
      hidden: 1
    }
  },
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
uniform vec3 colour;
uniform float rows;
uniform float glow;
uniform float glowRadius;
uniform float charDetail;
uniform float speed;
uniform float iGlobalTime;
varying vec2 vUv;

float random(in float x){
    return fract(sin(x)*43758.5453);
}

float random(in vec2 st){
    return fract(sin(dot(st.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float randomChar(in vec2 outer,in vec2 inner){
    float grid = charDetail;
    vec2 margin = vec2(.2,.05);
    float seed = 23.;
    vec2 borders = step(margin,inner)*step(margin,1.-inner);
    return step(.5,random(outer*seed+floor(inner*grid))) * borders.x * borders.y;
}

vec3 matrix(in vec2 st){
    vec2 ipos = floor(st*rows)+vec2(1.,0.);

    ipos += vec2(.0,floor(iGlobalTime*speed*random(ipos.x)));

    vec2 fpos = fract(st*rows);
    vec2 center = (.5-fpos);

    float pct = random(ipos);
    float glowamount = (glowRadius-dot(center,center)*3.)*glow;

    return vec3(randomChar(ipos,fpos) * pct * glowamount) * colour;
}

void main() {
    gl_FragColor = vec4(matrix(vUv),1.0);
}`,
  update: function(uniforms, clock) {
    uniforms.iGlobalTime.value = clock.getElapsedTime();
  }
};
