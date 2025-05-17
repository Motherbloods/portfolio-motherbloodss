import { useLayoutEffect } from "react";

const useResetScroll = () => {
  useLayoutEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    resetScroll();

    const scrollResetTimers = [
      setTimeout(resetScroll, 0),
      setTimeout(resetScroll, 50),
      setTimeout(resetScroll, 150),
    ];

    return () => {
      scrollResetTimers.forEach((timer) => clearTimeout(timer));
    };
  }, []);
};

export default useResetScroll;
