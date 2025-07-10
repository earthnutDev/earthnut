import { BackgroundRipple } from 'components';
import React, { useRef, useState } from 'react';
import styles from './index.module.scss';
import { xcn } from 'xcn';
import { RippleEle } from 'components/ripples/types';
/**
 * 涟漪页
 */
export default function RipplesPage() {
  const rippleRef = useRef<RippleEle>(null);
  const [background, setBackground] = useState<string | string[] | null>(null);

  /**
   * 切换状态
   */
  function togglePlayingState(e: React.MouseEvent) {
    rippleRef.current?.toggleState();
    e.preventDefault();
    e.stopPropagation();
  }

  /**  更改当前的样式  */
  function setBackgroundValue(e: React.MouseEvent<HTMLButtonElement>) {
    const target = e.target as HTMLButtonElement;
    const index = Number(target.dataset['index']);
    setBackground(
      [['#f00'], ['#a63', '#361', '#009'], '/image/defaultBackground.png', null][index],
    );
    e.stopPropagation();
    e.preventDefault();
    return false;
  }

  return (
    <div
      className={styles.page}
      id="ripple"
      onContextMenu={togglePlayingState}
      data-alias="ripple 外壳"
    >
      <BackgroundRipple
        ref={rippleRef}
        style={{
          position: 'static',
          // backgroundColor: '#333',
          // backgroundImage: 'linear-gradient(black, transparent)',
          // backgroundImage: 'url(/image/defaultBackground.png)',
        }}
        option={{
          // imgUrl: '/image/defaultBackground.png',
          // accelerating: 1,
          // dropRadius: 10,
          // // resolution: 366,
          // perturbance: 0.01,
          raindropsTimeInterval: 4800,
          imgUrl: background,
        }}
      >
        <div className={xcn('en-center')}>
          <h1>侠客行</h1>
          <div className={xcn('en-text-right', 'en-text-small')}>(唐)李白</div>
          {[
            '赵客缦胡缨，吴钩霜月明。',
            '银鞍照白马，飒沓如流星。',
            '十步杀一人，千里不留行。',
            '事了拂衣去，深藏功与名。',
            '闲过信陵饮，脱剑膝前横。',
            '将炙啖朱亥，持觞劝侯嬴。',
            '三杯吐然诺，五岳倒为轻。',
            '眼花耳热后，意气素霓生。',
            '救赵挥金槌，邯郸先震惊。',
            '千秋二壮士，烜赫大梁城。',
            '纵死侠骨香，不惭世上英。',
            '谁能书阁下，白首太玄经。',
          ].map(e => (
            <div key={e} className={xcn(styles.p)}>
              {e}
            </div>
          ))}
          <div>
            {['纯色', '渐变', '图片', '没有值'].map((e, i) => (
              <button
                key={e}
                data-index={i}
                style={{
                  margin: '10px 9px',
                  borderRadius: '10px',
                  border: 'none',
                  boxShadow: '1px 1px 6px #f369',
                }}
                onClick={setBackgroundValue}
              >
                {e}
              </button>
            ))}
          </div>
        </div>
      </BackgroundRipple>
    </div>
  );
}
