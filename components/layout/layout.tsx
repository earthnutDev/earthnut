import * as React from 'react';
import { InternalValueH as LayoutHeader } from './header';
import { InternalValueS as LayoutSideBar } from './sideBar';
import { InternalValueC as LayoutContent } from './content';
import { InternalValueF as LayoutFooter } from './footer';
import styles from './style/index.module.scss';

import { LayoutFooterProps, LayoutHeaderProps, LayoutProps, LayoutSideBarProps } from './types';
import { xcn } from 'xcn';
import { isNumber, isTrue } from 'a-type-of-js';

/**
 *
 * ## layout
 *
 * 布局组件，用于构建页面布局。
 *
 * ***为了照顾在 next.js 中的服务端组件中使用，在拥有 `side bar` 时 `Layout` 的 `height` 为百分比时会触发 side bar 滚动***
 *
 * @param {string} className  布局的类名
 * @param {React.CSSProperties} style  布局的样式
 * @param {string | number} width  布局的宽
 * @param {string | number} height  布局的高
 * @example
 *
 * ```jsx
 *  <Layout>
 *    <LayoutHeader> 头部 </LayoutHeader>
 *    <LayoutSideBar> 侧边栏 </LayoutSideBar>
 *    <LayoutContent> 内容区 </LayoutContent>
 *    <LayoutFooter> 页脚 </LayoutFooter>
 *  </Layout>
 *
 * ```
 *
 * 该组件仅接受 `LayoutHeader`、`LayoutSideBar`、`LayoutContent` 和 `LayoutFooter` 作为（直接）子组件。
 *
 * 可任意搭配使用，但不推荐使用无 `LayoutContent` 使用。
 *
 * 目前已知当 `Layout` 嵌套 `Layout` 时，需要设定内部 `Layout` 的 `width` 和 `height`。
 *
 * ```jsx
 *  <Layout width="100%" height="100%">
 *    <Layout width="100%" height="100%">
 *      <LayoutSideBar width="150px"> 侧边栏 </LayoutSideBar>
 *      <LayoutContent> 内容区 </LayoutContent>
 *    </Layout>
 *    <LayoutFooter> 页脚 </LayoutFooter>
 *  </Layout>
 * ```
 *
 *
 */
const Layout = React.forwardRef<HTMLDivElement, LayoutProps>(
  ({ className, children, style, width = '100vw', height = '100vh', ...props }, ref) => {
    /**  子组件的个数  */
    // const childCount = React.Children.count(children);
    /**  头部 header 是否粘连影响下的样式  */
    // console.log('子元素个数', childCount);
    /**  头部 header 组件  */
    let Header,
      /** 当前的样式   */
      layout: string = 'simple',
      headerNoSticky: string = '',
      /**  是否拥有头部（header）  */
      hasHeader: boolean = false,
      /**  侧边栏组件  */
      SideBar,
      /**  是否拥有侧边（side bar）  */
      hasSideBar: boolean = false,
      /**  内容区，该内容区与 Content、SideBar 组成的 .content 不同  */
      Content,
      /**  是否拥有内容（Content）  */
      hasContent: boolean = false,
      /**  页脚区（Footer）  */
      Footer,
      /**  是否拥有页脚区  */
      hasFooter: boolean = false,
      /**  侧边的宽度，缺省值 `150（px）`  */
      sideWidth: string | number = 150,
      /**  头部的高度，缺省值 `2.8rem`  */
      headerHeight: string | number = '2.8rem',
      /**  页脚的高度，缺省值为 `2rem`  */
      footerHeight: string | number = '2rem',
      /**  侧边是否占据所有尺寸（发生于 side bar 的 full 为 true 和仅有 side bar 时）   */
      sideFull: boolean = false;

    React.Children.forEach(children, child => {
      if (!React.isValidElement(child)) return;
      if (!hasHeader && child.type === LayoutHeader) {
        /** 头部组件的参数们   */
        const headerProps = child.props as LayoutHeaderProps;
        headerHeight = headerProps.height || headerHeight;
        headerNoSticky = headerProps.noSticky ? styles['en-layout-header-no-sticky'] : '';
        Header = child;
        hasHeader = true;
      } else if (!hasSideBar && child.type === LayoutSideBar) {
        const sideBarProps = child.props as LayoutSideBarProps;
        sideWidth = sideBarProps.width || sideWidth;
        layout =
          sideBarProps.right && sideBarProps.full
            ? 'side-right-full'
            : sideBarProps.right
              ? 'side-right'
              : sideBarProps.full
                ? 'side-full'
                : 'simple';
        sideFull = isTrue(sideBarProps.full);
        SideBar = child;
        hasSideBar = true;
      } else if (!hasContent && child.type === LayoutContent) {
        Content = child;
        hasContent = true;
      } else if (!hasContent && child.type === Layout) {
        Content = (
          <main data-earthnut-ui="layout-content" className={xcn(styles['en-layout-main'])}>
            {child}
          </main>
        );
        hasContent = true;
      } else if (!hasFooter && child.type === LayoutFooter) {
        footerHeight = (child.props as LayoutFooterProps).height || footerHeight;
        Footer = child;
        hasFooter = true;
      }
    });
    /**  组件在子组件不同下的样式值  */
    const layoutClassName: string =
      (hasHeader && hasSideBar && hasContent && hasFooter && styles[`en-layout-${layout}-all`]) ||
      // (hasContent && hasHeader && hasFooter && styles['no-side-bar']) ||
      (hasHeader && hasContent && hasSideBar && styles[`en-layout-${layout}-no-footer`]) ||
      (hasSideBar && hasContent && hasFooter && styles[`en-layout-${layout}-no-header`]) ||
      (hasContent && hasFooter && styles['en-layout-only-footer']) ||
      (hasContent && hasHeader && styles['en-layout-only-header']) ||
      (hasContent && hasSideBar && (sideFull = true) && styles[`en-layout-${layout}-only-side`]) ||
      '';

    return (
      <div
        ref={ref}
        className={xcn(
          styles['en-layout'],
          sideFull && styles['en-layout-side-full'],
          layoutClassName,
          headerNoSticky,
          className,
        )}
        style={{
          /**  @ts-expect-error: 自定义侧边栏的宽度  */
          '--layout-width': getValue(width),
          '--layout-height': getValue(height),
          '--layout-side-bar-width': getValue(sideWidth),
          '--layout-header-height': getValue(headerHeight),
          '--layout-footer-height': getValue(footerHeight),
          ...style,
        }}
        {...props}
        data-earthnut-ui="layout"
      >
        {!/side.*full/.test(layout) ? (
          <>
            {Header}
            {hasFooter ? (
              <div className={xcn(styles['en-layout-content'])}>
                {SideBar}
                {Content}
              </div>
            ) : (
              <>
                {SideBar}
                {Content}
              </>
            )}
            {Footer}
          </>
        ) : (
          <>
            {SideBar}
            {Header}
            {Content}
            {Footer}
          </>
        )}
      </div>
    );
  },
);
Layout.displayName = 'Layout';

function getValue(value: number | string) {
  if (isNumber(value) || parseInt(value) === Number(value)) return value + 'px';
  return value || 0;
}

export { Layout, LayoutHeader, LayoutSideBar, LayoutContent, LayoutFooter };
