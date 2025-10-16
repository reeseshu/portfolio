"use client";

import React from "react";

type CursorState = {
  targetX: number;
  targetY: number;
  renderX: number;
  renderY: number;
  isHovering: boolean;
  isHidden: boolean;
};

const lerp = (start: number, end: number, alpha: number): number => {
  return start + (end - start) * alpha;
};

export function CustomCursor() {
  const isMountedRef = React.useRef<boolean>(false);
  const requestRef = React.useRef<number | null>(null);
  const cursorOutlineRef = React.useRef<HTMLDivElement | null>(null);
  const cursorDotRef = React.useRef<HTMLDivElement | null>(null);

  const stateRef = React.useRef<CursorState>({
    targetX: 0,
    targetY: 0,
    renderX: 0,
    renderY: 0,
    isHovering: false,
    isHidden: false,
  });

  React.useEffect(() => {
    isMountedRef.current = true;

    // Avoid rendering on touch-only devices
    if (typeof window === "undefined") return;
    const hasCoarsePointer = window.matchMedia("(pointer: coarse)").matches;
    if (hasCoarsePointer) {
      return () => {
        isMountedRef.current = false;
      };
    }

    const handleMouseMove = (e: MouseEvent) => {
      const next = stateRef.current;
      next.targetX = e.clientX;
      next.targetY = e.clientY;
      next.isHidden = false;
    };

    const handleMouseEnter = () => {
      stateRef.current.isHidden = false;
    };

    const handleMouseLeave = () => {
      stateRef.current.isHidden = true;
    };

    const setHoverState = (hovering: boolean) => {
      stateRef.current.isHovering = hovering;
    };

    // Mark interactive elements that should trigger hover state
    const interactiveSelectors = [
      "a",
      "button",
      "[role=button]",
      "input",
      "select",
      "textarea",
      "[data-cursor-hover]",
    ].join(",");

    const onInteractiveEnter = () => setHoverState(true);
    const onInteractiveLeave = () => setHoverState(false);

    const attachInteractiveListeners = () => {
      const nodes = document.querySelectorAll<HTMLElement>(interactiveSelectors);
      nodes.forEach((el) => {
        el.addEventListener("mouseenter", onInteractiveEnter);
        el.addEventListener("mouseleave", onInteractiveLeave);
      });
      return () => {
        nodes.forEach((el) => {
          el.removeEventListener("mouseenter", onInteractiveEnter);
          el.removeEventListener("mouseleave", onInteractiveLeave);
        });
      };
    };

    const detachInteractive = attachInteractiveListeners();

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseenter", handleMouseEnter);
    window.addEventListener("mouseleave", handleMouseLeave);

    const animate = () => {
      if (!isMountedRef.current) return;

      const state = stateRef.current;
      state.renderX = lerp(state.renderX, state.targetX, 0.18);
      state.renderY = lerp(state.renderY, state.targetY, 0.18);

      const outline = cursorOutlineRef.current;
      const dot = cursorDotRef.current;

      if (outline) {
        outline.style.transform = `translate3d(${state.renderX}px, ${state.renderY}px, 0)`;
        outline.style.opacity = state.isHidden ? "0" : "1";
        outline.dataset.hover = state.isHovering ? "true" : "false";
      }

      if (dot) {
        dot.style.transform = `translate3d(${state.targetX}px, ${state.targetY}px, 0)`;
        dot.style.opacity = state.isHidden ? "0" : "1";
        dot.dataset.hover = state.isHovering ? "true" : "false";
      }

      requestRef.current = window.requestAnimationFrame(animate);
    };

    requestRef.current = window.requestAnimationFrame(animate);

    const observer = new MutationObserver(() => {
      detachInteractive();
      attachInteractiveListeners();
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      isMountedRef.current = false;
      if (requestRef.current !== null) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseenter", handleMouseEnter);
      window.removeEventListener("mouseleave", handleMouseLeave);
      detachInteractive();
      observer.disconnect();
    };
  }, []);

  // Render two elements: an outline circle and a small dot.
  return (
    <>
      <div ref={cursorOutlineRef} id="custom-cursor" aria-hidden="true" />
      <div ref={cursorDotRef} id="custom-cursor-dot" aria-hidden="true" />
    </>
  );
}

export default CustomCursor;


