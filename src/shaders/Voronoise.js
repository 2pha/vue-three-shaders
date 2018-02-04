export default {
  name: 'Voronoise',
  path: '!voronoise',
  uniforms: {
    amount: {
      type: 'f',
      value: 24,
      min: 0,
      max: 100,
      step: 1.0
    },
    jitter: {
      type: 'f',
      value: 1,
      min: 0, // only used for dat.gui, not needed for production
      max: 1, // only used for dat.gui, not needed for production
      step: 0.1
    },
    blur: {
      type: 'f',
      value: 1,
      min: 0, // only used for dat.gui, not needed for production
      max: 1, // only used for dat.gui, not needed for production
      step: 0.1
    }
  },
  vertexShader: `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}`,
  fragmentShader: `
varying vec2 vUv;
uniform float amount;
uniform float jitter;
uniform float blur;
vec3 hash3( vec2 p )
{
    vec3 q = vec3( dot(p,vec2(127.1,311.7)),
            dot(p,vec2(269.5,183.3)),
            dot(p,vec2(419.2,371.9)) );
  return fract(sin(q)*43758.5453);
}

float iqnoise( in vec2 x, float u, float v )
{
    vec2 p = floor(x);
    vec2 f = fract(x);

  float k = 1.0+63.0*pow(1.0-v,4.0);

  float va = 0.0;
  float wt = 0.0;
    for( int j=-2; j<=2; j++ )
    for( int i=-2; i<=2; i++ )
    {
        vec2 g = vec2( float(i),float(j) );
    vec3 o = hash3( p + g )*vec3(u,u,1.0);
    vec2 r = g - f + o.xy;
    float d = dot(r,r);
    float ww = pow( 1.0-smoothstep(0.0,1.414,sqrt(d)), k );
    va += o.z*ww;
    wt += ww;
  }

    return va/wt;
}

void main(void)
{
  vec2 p = 0.5 - 0.5*sin( vUv );

  p = p*p*(3.0-2.0*p);
  p = p*p*(3.0-2.0*p);
  p = p*p*(3.0-2.0*p);

  float f = iqnoise( amount*vUv, jitter, blur );

  gl_FragColor = vec4( f, f, f, 1.0 );
}`
};
