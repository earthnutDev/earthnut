/**
 *
 */
export const vertexShader = `
      attribute vec2 vertex;
      varying vec2 coord;
      void main() {
        coord = vertex * 0.5 + 0.5;
        gl_Position = vec4(vertex, 0.0, 1.0);
      }`;

/**
 *
 *
 *
 */
export const updateProgramFragmentSource = `
      precision highp float;

      uniform sampler2D texture;
      uniform vec2 delta;

      varying vec2 coord;

      void main() {
        vec4 info = texture2D(texture, coord);
  
        vec2 dx = vec2(delta.x, 0.0);
        vec2 dy = vec2(0.0, delta.y);
  
        float average = (
          texture2D(texture, coord - dx).r +
          texture2D(texture, coord - dy).r +
          texture2D(texture, coord + dx).r +
          texture2D(texture, coord + dy).r
        ) * 0.25;
  
        info.g += (average - info.r) * 2.0;
        info.g *= 0.995;
        info.r += info.g;
  
        gl_FragColor = info;
      }
      `;

/**
 *
 *
 *
 */
export const renderVertexSource = `
        precision highp float;

        attribute vec2 vertex;
        uniform vec2 topLeft;
        uniform vec2 bottomRight;
        uniform vec2 containerRatio;
        varying vec2 ripplesCoord;
        varying vec2 backgroundCoord;
        void main() {
          backgroundCoord = mix(topLeft, bottomRight, vertex * 0.5 + 0.5);
          backgroundCoord.y = 1.0 - backgroundCoord.y;
          ripplesCoord = vec2(vertex.x, -vertex.y) * containerRatio * 0.5 + 0.5;
          gl_Position = vec4(vertex.x, -vertex.y, 0.0, 1.0);
        }
      `;
/**
 *
 *
 *
 */

export const renderProgramFragmentSource = `
        precision highp float;

        uniform sampler2D samplerBackground;
        uniform sampler2D samplerRipples;
        uniform vec2 delta;

        uniform float perturbance;
        varying vec2 ripplesCoord;
        varying vec2 backgroundCoord;

        void main() {
          float height = texture2D(samplerRipples, ripplesCoord).r;
          float heightX = texture2D(samplerRipples, vec2(ripplesCoord.x + delta.x, ripplesCoord.y)).r;
          float heightY = texture2D(samplerRipples, vec2(ripplesCoord.x, ripplesCoord.y + delta.y)).r;
          vec3 dx = vec3(delta.x, heightX - height, 0.0);
          vec3 dy = vec3(0.0, heightY - height, delta.y);
          vec2 offset = -normalize(cross(dy, dx)).xz;
          float specular = pow(max(0.0, dot(offset, normalize(vec2(-0.6, 1.0)))), 4.0);
          gl_FragColor = texture2D(samplerBackground, backgroundCoord + offset * perturbance) + specular;
        }`;
/**
 *
 * fragmentSource
 *
 */
export const dropProgramFragmentSource = `precision highp float;

      const float PI = 3.141592653589793;
      uniform sampler2D texture;
      uniform vec2 center;
      uniform float radius;
      uniform float strength;

      varying vec2 coord;

      void main() {
        vec4 info = texture2D(texture, coord);

        float drop = max(0.0, 1.0 - length(center * 0.5 + 0.5 - coord) / radius);
        drop = 0.5 - cos(drop * PI) * 0.5;
        info.r += drop * strength;
        gl_FragColor = info;
      }`;
