import { useInputIsComposing } from 'customHooks';
import React, { useEffect, useRef } from 'react';

/**
 * 使用输入框输入完成状态的测试页面
 */
export default function UseInputIsComposing() {
  const inputRef = useRef<HTMLInputElement>(null);
  const isOver = useInputIsComposing(inputRef);

  /**
   * 更改测试
   */
  function change(e: React.KeyboardEvent<HTMLInputElement>) {
    console.log(e);
  }

  useEffect(() => {
    return () => {};
  }, [isOver]);

  return (
    <div>
      <div>
        <form>
          <div className="text-3xl text-teal-300 w-full bg-slate-500 rounded-xl shadow-sm shadow-teal-900  md:w-32 lg:w-48 p-4">
            <input type="text" ref={inputRef} className="p-4" onKeyDown={change} />
          </div>
          <div className="p-4">
            <input type="text" required className="p-2" />
          </div>
          <button>1246</button>
        </form>
      </div>
    </div>
  );
}
