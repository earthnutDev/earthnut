import { Ripples } from '../../ripplesClass';

import { createCanvasElementBySize } from './createCanvasElementBySize';

/// 该文件已废弃 #FFFF00
/**
 * 创建一个隐含像素数据的区域
 *
 * 用于构建默认的背景图
 */
export function createImageData(this: Ripples, bindImage: () => void) {
  const { fadeData } = this;
  const { width, height } = fadeData.backgroundInfo;
  fadeData.lastDrawImage = {
    resource: createCanvasElementBySize(width, height),
    width,
    height,
    kind: 'default',
    tag: '',
  };
  Reflect.apply(bindImage, this, []);

  // const { backgroundInfo } = renderData;
  // const { width, height } = backgroundInfo;
  //   Reflect.apply(bindImage, this, [image]);
  // /**  是透明的背景  */
  // const isTransparent = [
  //   '#0000',
  //   'rgba(0,0,0,0)',
  //   'transparent',
  //   'none',
  //   '',
  //   'unset',
  //   'inherit',
  //   'initial',
  // ].some(e => lastUseStyle.backgroundColor.replace(/\s*/g, '') === e);
  // /** 是否没有背景图   */
  // const isNotBackgroundImage =
  //   isBusinessEmptyString(lastUseStyle.backgroundImage) || lastUseStyle.backgroundImage === 'none';

  // const image = new Image(width, height);
  // image.width = width;
  // image.height = height;

  // image.src = getImageSrcBySize(width, height);
  // image.onload = () => {
  //   renderData.lastDrawImage = Reflect.apply(createCanvasElement, this, [image]);
  //   Reflect.apply(bindImage, this, [image]);
  // };
}
