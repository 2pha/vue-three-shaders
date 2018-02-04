import * as THREE from 'three';

export default {
  name: 'Polka Noise',
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
      value: 8.0,
      min: 1.0, // only used for dat.gui, not needed for production
      max: 100, // only used for dat.gui, not needed for production
      step: 1.0
    },
    radius1: {
      type: 'f',
      value: 1.0,
      min: 0, // only used for dat.gui, not needed for production
      max: 1, // only used for dat.gui, not needed for production
      step: 0.1
    },
    radius2: {
      type: 'f',
      value: 0.5,
      min: 0, // only used for dat.gui, not needed for production
      max: 1, // only used for dat.gui, not needed for production
      step: 0.1
    },
    box: {
      type: 'i',
      value: 0,
      checkbox: true // only used for dat.gui, not needed for production
      //min: 0, // only used for dat.gui, not needed for production
      //max: 1, // only used for dat.gui, not needed for production
      //step: 1.0
    }
  },
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
// This was found at:
// https://github.com/BrianSharpe/GPU-Noise-Lib
// https://briansharpe.wordpress.com/2011/12/24/polkadot-and-star-noises/

varying vec2 vUv;
uniform vec3 color1;
uniform vec3 color2;
uniform float amount;
uniform float radius1;
uniform float radius2;
uniform bool box;


vec4 FAST32_hash_2D_Cell( vec2 gridcell )	//	generates 4 different random numbers for the single given cell point
{
  //	gridcell is assumed to be an integer coordinate
  const vec2 OFFSET = vec2( 26.0, 161.0 );
  const float DOMAIN = 71.0;
  const vec4 SOMELARGEFLOATS = vec4( 951.135664, 642.949883, 803.202459, 986.973274 );
  vec2 P = gridcell - floor(gridcell * ( 1.0 / DOMAIN )) * DOMAIN;
  P += OFFSET.xy;
  P *= P;
  return fract( (P.x * P.y) * ( 1.0 / SOMELARGEFLOATS.xyzw ) );
}

float Falloff_Xsq_C2( float xsq ) { xsq = 1.0 - xsq; return xsq*xsq*xsq; }  // ( 1.0 - x*x )^3.   NOTE: 2nd derivative is 0.0 at x=1.0, but non-zero at x=0.0

float PolkaDot2D( 	vec2 P,
  float radius_low,		//	radius range is 0.0->1.0
  float radius_high	)
{
  //	establish our grid cell and unit position
  vec2 Pi = floor(P);
  vec2 Pf = P - Pi;

  //	calculate the hash.
  //	( various hashing methods listed in order of speed )
  vec4 hash = FAST32_hash_2D_Cell( Pi );

  //	user variables
  float RADIUS = max( 0.0, radius_low + hash.z * ( radius_high - radius_low ) );
  float VALUE = RADIUS / max( radius_high, radius_low );	//	new keep value in proportion to radius.  Behaves better when used for bumpmapping, distortion and displacement

  //	calc the noise and return
  RADIUS = 2.0/RADIUS;
  Pf *= RADIUS;
  Pf -= ( RADIUS - 1.0 );
  Pf += hash.xy * ( RADIUS - 2.0 );
  if(box){
    Pf *= Pf;   //  this gives us a cool box looking effect
  }
  return Falloff_Xsq_C2( min( dot( Pf, Pf ), 1.0 ) ) * VALUE;
}

void main() {
  float n = PolkaDot2D(vUv*amount, radius1, radius2);
  gl_FragColor = vec4(mix(color2, color1, n), 1.0);
}`
};
