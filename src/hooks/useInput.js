/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useCallback } from "react";

export const useInput = (initialValue, validator) => {
  const [value, setValue] = useState(initialValue);

  /**
   * useCallback<T extends (...args: any[]) => any>(callback: T, deps: DependencyList): T;
   * 성능을 최적화 할 때 사용
   * functional component 안에서 handling function을 정의하면 리렌더링 할 때 마다 function이 재생성된다.
   * useCallback hook을 사용하면 2번 째 파라미터인 배열의 값이 변경될 때만 function이 재생성된다.
   *
   * reference: https://velog.io/@velopert/react-hooks#6.-usecallback
   */

  const onChange = useCallback(event => {
    const {
      target: { value }
    } = event;
    let willUpdate = true;
    if (typeof validator === "function") {
      willUpdate = validator(value);
    }
    if (willUpdate) {
      setValue(value);
    }
  }, []);

  return [value, onChange];
};
