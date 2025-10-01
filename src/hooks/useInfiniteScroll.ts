import { useEffect, useRef, useState } from 'react';

interface IUseInfiniteScrollOptions {
  initialVisibleCount?: number;
  loadMoreCount?: number;
  totalItemsCount: number;
  rootMargin?: string;
}

interface IUseInfiniteScrollReturn {
  visibleCount: number;
  loaderRef: React.RefObject<HTMLDivElement | null>;
  hasMoreItems: boolean;
}

export function useInfiniteScroll({
  initialVisibleCount = 24,
  loadMoreCount = 24,
  totalItemsCount,
  rootMargin = '200px',
}: IUseInfiniteScrollOptions): IUseInfiniteScrollReturn {
  const [visibleCount, setVisibleCount] = useState(initialVisibleCount);
  const loaderRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setVisibleCount(initialVisibleCount);
  }, [totalItemsCount, initialVisibleCount]);

  useEffect(() => {
    const loaderElement = loaderRef.current;
    if (!loaderElement) return;

    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const firstEntry = entries[0];
        if (firstEntry.isIntersecting) {
          setVisibleCount((currentVisibleCount) =>
            Math.min(currentVisibleCount + loadMoreCount, totalItemsCount)
          );
        }
      },
      { rootMargin }
    );

    intersectionObserver.observe(loaderElement);

    return () => {
      intersectionObserver.disconnect();
    };
  }, [loadMoreCount, totalItemsCount, rootMargin]);

  const hasMoreItems = visibleCount < totalItemsCount;

  return {
    visibleCount,
    loaderRef,
    hasMoreItems,
  };
}
