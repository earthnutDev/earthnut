import { Ripples } from '../../ripplesClass';
import { createCanvasElementBySize } from './createCanvasElementBySize';
import { circleDataList } from './circleDataList';
import { dog } from 'dog';
import { getRandomString } from 'a-js-tools';
/**
 *
 * 设置透明的纹理
 *
 *
 * 透明的纹理*默认会自动切换*
 *
 */
export function setTransparentTexture(this: Ripples, executeImmediately: boolean = true) {
  dog.type = true;
  const { fadeData } = this;

  const { backgroundInfo, toBeList } = fadeData;
  const { width, height } = backgroundInfo;
  const tag = getRandomString({
    length: 8,
    includeNumbers: true,
    includeUppercaseLetters: true,
  });
  circleDataList.build(); // 构建新的执行图（很重要）
  dog('添加默认纹理', tag);
  // if (fadeData.isTransitioning)
  //   /// 当前处于渐变过程，仅保留第一个
  //   fadeData.toBeList = [fadeData.toBeList[0]];
  // else
  //   /// 当前不在渐变状态，直接清空渲染层
  //   fadeData.toBeList = [];
  //   当前渲染的纹理（下一个）
  toBeList.push({
    resource: createCanvasElementBySize(width, height),
    width,
    height,
    kind: 'default',
    tag,
  });

  dog.type = true;

  if (executeImmediately) fadeData.run(); // 开启渐变
}
