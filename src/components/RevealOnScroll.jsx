import { useRef, useEffect } from "react";

export const RevealOnScroll = ({ children, className = "", delay = 0 }) => {
  const ref = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    let hasRevealed = element.classList.contains("visible");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (hasRevealed) return;

          if (!entry.isIntersecting) {
            if (timeoutRef.current !== null) {
              window.clearTimeout(timeoutRef.current);
              timeoutRef.current = null;
            }
            return;
          }

          if (timeoutRef.current !== null) return;

          timeoutRef.current = window.setTimeout(() => {
            entry.target.classList.add("visible");
            hasRevealed = true;
            timeoutRef.current = null;
            observer.unobserve(entry.target);
          }, delay);
        });
      },
      {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    if (!hasRevealed) observer.observe(element);

    return () => {
      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
      observer.disconnect();
    };
  }, [delay]);

  return (
    <div ref={ref} className={`reveal ${className}`}>
      {children}
    </div>
  );
};
