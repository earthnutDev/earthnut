/****************************************************************************
 * @Author earthnut
 * @Email earthnut.dev@outlook.com
 * @ProjectName website
 * @FileName index.tsx
 * @CreateDate  周四  12/12/2024
 * @Description 涟漪
 ****************************************************************************/
import { forwardRef, useImperativeHandle, useRef } from 'react';
import React from 'react';
import { BackgroundRipplesProps, RipplesOptions } from '../../customHooks/useRipples/types';
import { useRipples } from '../../customHooks/useRipples';
import { useOptionUpdate } from './useOptionUpdate';
import { RippleEle } from './types';
import { isUndefined } from 'a-type-of-js';
import styled from 'styled-components';

/**  内容组件  */
const Content = styled.div`
  position: relative;
  top: 0px;
  left: 0px;
  z-index: 1;
  width: 100%;
  height: 100%;
  min-width: 1px;
  min-height: 1px;
  contain: layout paint style;
  will-change: transform, opacity;
`;
/**
 *
 * ### 一个 ripple 背景组件
 *
 *
 * *需要为该组件或父组件设置背景，否则即便的渲染了，效果不明显*
 *
 *  参数 props 属性：
 * - children 内嵌的 ReactNode
 * - style    更改显示的样式
 * - option   初始化 ripples 的原始数据
 * @param props  使用参数
 * @version 0.0.1
 * @see https://earthnut.dev/earthnut/background-ripple
 * @example
 * 使用：
 *
 * ```ts
 *  import { BackgroundRipple } from 'earthnut/BackgroundRipple';
 *  // 也可以全量导入
 *  // import { BackgroundRipple } from 'earthnut';
 *  ...
 *  const animationFrameId = useAnimationFrame();
 *
 *  return <BackgroundRipple>
 *            ...
 *         </BackgroundRipple>
 * ```
 *
 */
const BackgroundRipple = forwardRef<RippleEle, BackgroundRipplesProps>(
  ({ children, style, ...props }, ref) => {
    /**  canvas 元素  */
    const canvas = useRef<HTMLCanvasElement>(null);
    /**  使用 ripples  */
    const ripplesRef = useRipples(canvas, props);

    ///  使用 配置更新
    useOptionUpdate(ripplesRef, props);

    // 抛出事件 (自定义抛出事件)
    useImperativeHandle(ref, () => ({
      toggleState: () => {
        ripplesRef.current?.changePlayingState();
      },
      get state() {
        return ripplesRef.current?.options.playingState ?? false;
      },
      pause() {
        ripplesRef.current?.pause();
      },
      set(options?: RipplesOptions): void {
        if (isUndefined(options)) return;
        const keys = Object.keys(options) as (keyof RipplesOptions)[];
        for (let i = 0, j = keys.length; i < j; i++) {
          const key = keys[i];
          ripplesRef.current?.set(key, options[key] as unknown);
        }
      },
    }));

    return (
      <Content
        style={{
          backgroundRepeat: 'round',

          // backgroundSize: 'cover',
          // backgroundPosition: 'center',
          ...style,
        }}
      >
        <canvas ref={canvas} data-earthnut-ui="canvas" />
        {children}
      </Content>
    );
  },
);

BackgroundRipple.displayName = 'en-background-ripple';

export { BackgroundRipple };
