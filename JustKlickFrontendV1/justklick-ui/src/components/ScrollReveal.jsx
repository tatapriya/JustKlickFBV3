import { useEffect, useRef, useState } from "react";

export default function ScrollReveal({
  children,
  delay = 0,
  className = "",
  distance = 45,
  direction = "up", // up | left | right
}) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  const getTransform = () => {
    if (isVisible) return "translate(0px, 0px)";

    if (direction === "left") return `translateX(-${distance}px)`;
    if (direction === "right") return `translateX(${distance}px)`;

    return `translateY(${distance}px)`;
  };

  useEffect(() => {
    const currentSection = sectionRef.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -70px 0px",
      }
    );

    if (currentSection) {
      observer.observe(currentSection);
    }

    return () => {
      if (currentSection) {
        observer.unobserve(currentSection);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={className}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: getTransform(),
        transition: `opacity 750ms ease ${delay}ms, transform 750ms ease ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}