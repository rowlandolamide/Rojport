"use client"
import { RefObject, useCallback, useRef, useState } from "react";

function useRefWithCallback<T extends HTMLSpanElement | HTMLDivElement | HTMLParagraphElement>(): [
    boolean,
    (node: any) => void,
    RefObject<T>
  ] {
    const ref = useRef<T | null>(null);
    const [toggle, setToggle] = useState(false);
    const refCallback = useCallback(node => {
      ref.current = node;
      setToggle(val => !val);
    }, []);
  
    return [toggle, refCallback, ref];
  }
  
  export default useRefWithCallback;