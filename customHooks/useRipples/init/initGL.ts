import { step } from '../render/step';
import { ripplesRenderDataWarehouse } from '../rippersData/renderData';
import { Ripples } from '../ripplesClass';
import { setupPointerEvents } from './initEvent';
import { initShaders } from './initShaders';
import { initTexture } from './initTexture';
import { loadImage, setTransparentTexture } from './loadImage';

/**************************
 * 初始化 webGL
 **************************/
export function initGL(this: Ripples) {
  if (!this.config) return;
  const renderData = ripplesRenderDataWarehouse[this.sole];
  const { resolution, textures, framebuffers } = renderData;
  const gl = this.gl;
  const _resolution = 1 / resolution;
  renderData.textureDelta = new Float32Array([_resolution, _resolution]); // 纹理增量
  /// 加载扩展
  this.config.extensions.forEach(currentName => gl.getExtension(currentName));
  this.updateSize = this.updateSize.bind(this); /// 大哥说这样可以让他变成新的
  window.addEventListener('resize', this.updateSize);

  const arrayType = this.config.arrayType;
  const textureData = arrayType ? new arrayType(resolution * resolution * 4) : null;
  const config = this.config;

  for (let i = 0; i < 2; i++) {
    /**  初始化 WebGLTexture 对象  */
    const texture = gl.createTexture();
    /**  初始化 WebGLFramebuffer 对象  */
    const framebuffer = gl.createFramebuffer();
    /**  将给定的 WebGLFramebuffer 绑定到目标  */
    gl.bindFramebuffer(gl.FRAMEBUFFER, framebuffer);
    /**  将给定的 WebGLTexture 绑定给目标（绑定点）  */
    gl.bindTexture(gl.TEXTURE_2D, texture);
    /**  动画纹理  */
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MIN_FILTER,
      config.linearSupport ? gl.LINEAR : gl.NEAREST,
    );
    gl.texParameteri(
      gl.TEXTURE_2D,
      gl.TEXTURE_MAG_FILTER,
      config.linearSupport ? gl.LINEAR : gl.NEAREST,
    );
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    /**************************************
     *
     * (指定二维纹理图像)[https://developer.mozilla.org/zh-CN/docs/Web/API/WebGLRenderingContext/texImage2D]
     *
     **************************************/
    gl.texImage2D(
      gl.TEXTURE_2D,
      0,
      gl.RGBA,
      resolution,
      resolution,
      0,
      gl.RGBA,
      config.type,
      textureData,
    );

    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, texture, 0);
    textures.push(texture);
    framebuffers.push(framebuffer);
  }

  // 初始化 gl 数据流
  renderData.quad = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, renderData.quad);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, +1, -1, +1, +1, -1, +1]),
    gl.STATIC_DRAW,
  );
  Reflect.apply(initShaders, this, []);
  Reflect.apply(initTexture, this, []);
  Reflect.apply(setTransparentTexture, this, []);
  // Load the image either from the options or CSS rules
  Reflect.apply(loadImage, this, []);
  // Set correct clear color and blend mode (regular alpha blending)
  gl.clearColor(0, 0, 0, 0);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

  // 插件初始化成功
  renderData.visible = true;
  renderData.running = true;

  // this.#initialized = true;
  Reflect.apply(setupPointerEvents, this, []); /// 初始化监听事件
  renderData.animationFrameId = requestAnimationFrame(() => Reflect.apply(step, this, []));
}
