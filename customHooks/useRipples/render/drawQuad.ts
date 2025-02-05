import { ripplesRenderDataWarehouse } from '../rippersData/renderData';
import { Ripples } from '../ripplesClass';

/**************************************
 *
 * 绘制 GL 数据流
 *
 **************************************/
export function drawQuad(this: Ripples) {
  const gl = this.gl;
  const renderData = ripplesRenderDataWarehouse[this.sole];
  gl.bindBuffer(gl.ARRAY_BUFFER, renderData.quad);
  gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);
  gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
}
