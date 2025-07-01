import { isNull } from 'a-type-of-js';
import { Ripples } from '../ripplesClass';
import { loadImage } from '../buildBackground/loadImage';

/**
 * 重新加载背景图片
 *
 */
export function reloadBackground(this: Ripples) {
  const { renderData, fadeData } = this;
  if (isNull(renderData)) return;
  const { parentElement } = renderData;
  const { backgroundInfo } = fadeData;
  const width = parentElement.offsetWidth,
    height = parentElement.offsetHeight;
  this.canvas.width = backgroundInfo.width = width;
  this.canvas.height = backgroundInfo.height = height;

  Reflect.apply(loadImage, this, []);
}
