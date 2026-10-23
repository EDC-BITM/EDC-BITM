import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ChevronLeft, ChevronRight } from "lucide-react";

gsap.registerPlugin(SplitText);

const wrapIndex = (index, length) =>
  length ? ((index % length) + length) % length : 0;

const modulo = (value, length) => ((value % length) + length) % length;

export function ZoomSliderComp({
  sliderData,
  textOnHover = true,
  scaleOnHover = true,
  easeScrollPercentage = 70,
}) {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const imageWrapRefs = useRef([]);
  const textRefs = useRef([]);
  const stateRef = useRef({
    current: 0,
    target: 0,
    isDragging: false,
    lastX: 0,
    velocity: 0,
    frame: null,
  });
  const [stageSize, setStageSize] = useState({ width: 0, height: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const reduceMotion =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  const count = sliderData.length;

  useEffect(() => {
    const stage = stageRef.current;
    if (!stage) return undefined;

    const observer = new ResizeObserver(() => {
      setStageSize({ width: stage.clientWidth, height: stage.clientHeight });
    });
    observer.observe(stage);
    setStageSize({ width: stage.clientWidth, height: stage.clientHeight });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!count || !stageSize.width || !stageSize.height) return undefined;

    const stage = stageRef.current;
    const state = stateRef.current;
    const isMobile = stageSize.width < 640;
    const cardWidthMax = Math.min(
      isMobile ? stageSize.width * 0.74 : stageSize.width * 0.56,
      isMobile ? 300 : 620,
    );
    const cardWidthMin = Math.min(isMobile ? 74 : 120, cardWidthMax * 0.38);
    const cardHeightMax = stageSize.height * 0.78;
    const cardHeightMin = stageSize.height * 0.2;
    const cardStep = cardWidthMax;
    const loopWidth = count * cardStep;
    const easingDistance =
      2 * stageSize.width * (Math.max(20, easeScrollPercentage) / 100);

    const mapPosition = (value) => {
      if (value <= 0) return 0;
      if (value >= easingDistance) return value - easingDistance / 2;
      return (value * value) / (2 * easingDistance);
    };

    const positionCards = (offset) => {
      const normalizedOffset = modulo(offset, loopWidth);
      const startIndex = Math.floor(normalizedOffset / cardStep);
      const fractionalOffset = (normalizedOffset % cardStep) / cardStep;

      for (let order = 0; order < count; order += 1) {
        const index = (startIndex + order) % count;
        const visualOffset = (order - fractionalOffset) * cardStep;
        const x = mapPosition(visualOffset);
        const nextX = mapPosition(visualOffset + cardStep);
        const width = Math.max(cardWidthMin, nextX - x);
        const scale = Math.min(1, width / cardWidthMax);
        const height = cardHeightMin + scale * (cardHeightMax - cardHeightMin);
        const fadeStart = cardWidthMax * 0.28;
        const fadeRange = cardWidthMax * 0.13;
        const visibility = Math.max(0, Math.min(1, (width - fadeStart) / fadeRange));
        const card = cardRefs.current[index];
        const imageWrap = imageWrapRefs.current[index];

        if (!card || !imageWrap) continue;
        card.style.transform = `translate3d(${x}px, ${stageSize.height - height}px, 0)`;
        card.style.zIndex = String(count - order);
        card.style.opacity = String(visibility);
        card.style.pointerEvents = visibility > 0.9 ? "auto" : "none";
        imageWrap.style.width = `${width}px`;
        imageWrap.style.height = `${height}px`;
      }

      const nextActive = wrapIndex(startIndex, count);
      setActiveIndex((previous) => (previous === nextActive ? previous : nextActive));
    };

    const tick = () => {
      if (!state.isDragging && !reduceMotion && Math.abs(state.velocity) > 0.1) {
        state.target += state.velocity;
        state.velocity *= 0.9;
      } else if (!state.isDragging) {
        state.velocity = 0;
      }

      const easing = reduceMotion ? 1 : state.isDragging ? 0.24 : 0.08;
      state.current += (state.target - state.current) * easing;

      if (Math.abs(state.current - state.target) < 0.1) {
        const shift = Math.round(state.current / loopWidth) * loopWidth;
        state.current -= shift;
        state.target -= shift;
      }

      positionCards(state.current);
      state.frame = requestAnimationFrame(tick);
    };

    const onWheel = (event) => {
      event.preventDefault();
      state.target += event.deltaY || event.deltaX;
    };
    const onPointerDown = (event) => {
      if (event.button !== 0 && event.pointerType === "mouse") return;
      state.isDragging = true;
      state.lastX = event.clientX;
      state.velocity = 0;
      stage.setPointerCapture(event.pointerId);
    };
    const onPointerMove = (event) => {
      if (!state.isDragging) return;
      const delta = state.lastX - event.clientX;
      state.target += delta;
      state.velocity = state.velocity * 0.5 + delta * 0.5;
      state.lastX = event.clientX;
    };
    const endPointer = () => {
      state.isDragging = false;
    };

    stage.addEventListener("wheel", onWheel, { passive: false });
    stage.addEventListener("pointerdown", onPointerDown);
    stage.addEventListener("pointermove", onPointerMove);
    stage.addEventListener("pointerup", endPointer);
    stage.addEventListener("pointercancel", endPointer);
    positionCards(state.current);
    state.frame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(state.frame);
      stage.removeEventListener("wheel", onWheel);
      stage.removeEventListener("pointerdown", onPointerDown);
      stage.removeEventListener("pointermove", onPointerMove);
      stage.removeEventListener("pointerup", endPointer);
      stage.removeEventListener("pointercancel", endPointer);
    };
  }, [count, easeScrollPercentage, reduceMotion, stageSize]);

  useEffect(() => {
    if (!textOnHover) return undefined;

    const cleanups = [];
    sliderData.forEach((_item, index) => {
      const imageWrap = imageWrapRefs.current[index];
      const textElement = textRefs.current[index];
      const imageElement = imageWrap?.querySelector("img");
      if (!imageWrap || !textElement) return;

      const split = SplitText.create(textElement.querySelectorAll("[data-split]"), {
        type: "lines",
        mask: "lines",
      });
      gsap.set(split.lines, { yPercent: 100 });
      gsap.set(textElement, { autoAlpha: 0 });

      const onEnter = () => {
        gsap.to(textElement, { autoAlpha: 1, duration: 0.2, overwrite: true });
        gsap.to(split.lines, {
          yPercent: 0,
          duration: reduceMotion ? 0 : 0.45,
          stagger: 0.04,
          ease: "power3.out",
          overwrite: true,
        });
        if (scaleOnHover && imageElement && !reduceMotion) {
          gsap.to(imageElement, { scale: 1.05, duration: 0.6, ease: "power2.out" });
        }
      };
      const onLeave = () => {
        gsap.to(textElement, {
          autoAlpha: 0,
          duration: reduceMotion ? 0 : 0.3,
          ease: "power1.out",
          overwrite: true,
        });
        gsap.to(split.lines, {
          yPercent: 100,
          duration: reduceMotion ? 0 : 0.25,
          stagger: 0.02,
          overwrite: true,
        });
        if (imageElement) {
          gsap.to(imageElement, { scale: 1, duration: 0.5, ease: "power2.out" });
        }
      };

      imageWrap.addEventListener("mouseenter", onEnter);
      imageWrap.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        imageWrap.removeEventListener("mouseenter", onEnter);
        imageWrap.removeEventListener("mouseleave", onLeave);
        gsap.killTweensOf([textElement, split.lines, imageElement]);
        split.revert();
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [reduceMotion, scaleOnHover, sliderData, textOnHover]);

  const moveByCard = (direction) => {
    if (!stageSize.width || !count) return;
    const isMobile = stageSize.width < 640;
    const cardWidthMax = Math.min(
      isMobile ? stageSize.width * 0.74 : stageSize.width * 0.56,
      isMobile ? 300 : 620,
    );
    stateRef.current.target += direction * cardWidthMax;
  };

  const goToIndex = (index) => {
    if (!stageSize.width || !count) return;
    const isMobile = stageSize.width < 640;
    const cardStep = Math.min(
      isMobile ? stageSize.width * 0.74 : stageSize.width * 0.56,
      isMobile ? 300 : 620,
    );
    const currentStart = Math.floor(modulo(stateRef.current.target, count * cardStep) / cardStep);
    let difference = index - currentStart;
    if (difference > count / 2) difference -= count;
    if (difference < -count / 2) difference += count;
    stateRef.current.target += difference * cardStep;
  };

  if (!count) return null;

  return (
    <div className="w-full">
      <div
        ref={stageRef}
        className="relative h-[clamp(360px,42vw,520px)] w-full touch-pan-y select-none overflow-hidden"
        style={{ touchAction: "pan-y" }}
        aria-label="Captured moments slider. Scroll or drag to explore."
      >
        {sliderData.map((item, index) => (
          <div
            key={`${item.number}-${item.src}`}
            ref={(element) => {
              cardRefs.current[index] = element;
            }}
            className="absolute left-0 top-0"
            style={{ willChange: "transform" }}
          >
            <div
              ref={(element) => {
                textRefs.current[index] = element;
              }}
              className="absolute bottom-[calc(100%+10px)] left-0 z-10 flex w-full flex-col gap-1 px-1 pb-1"
              style={{ visibility: "hidden" }}
            >
              <span data-split className="text-[10px] font-bold uppercase tracking-[0.18em] text-black/55">
                {item.number}
              </span>
              {item.title && (
                <span className="max-h-[2.5em] overflow-hidden text-sm font-extrabold uppercase leading-tight tracking-[0.08em] text-gray-900">
                  {item.title}
                </span>
              )}
            </div>
            <div
              ref={(element) => {
                imageWrapRefs.current[index] = element;
              }}
              className="relative overflow-hidden rounded-md bg-black/10 shadow-lg"
              style={{ width: 120, height: 100, willChange: "width, height" }}
            >
              <img
                src={item.src}
                alt={item.alt || item.title}
                draggable="false"
                loading={index < 3 ? "eager" : "lazy"}
                className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
                style={{ objectPosition: "center bottom", willChange: "transform" }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-4">
        <span className="min-w-16 text-xs font-semibold tabular-nums text-gray-700" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            onClick={() => moveByCard(-1)}
            className="rounded-full p-2 text-gray-800 transition hover:bg-black/10"
            aria-label="Previous captured moment"
            title="Previous captured moment"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          {sliderData.map((item, index) => (
            <button
              key={`dot-${item.number}`}
              type="button"
              onClick={() => goToIndex(index)}
              className={`h-2 rounded-full transition-all ${
                index === activeIndex ? "w-5 bg-gray-900" : "w-2 bg-gray-900/30 hover:bg-gray-900/60"
              }`}
              aria-label={`Go to ${item.title || `image ${item.number}`}`}
              aria-current={index === activeIndex ? "true" : undefined}
            />
          ))}
          <button
            type="button"
            onClick={() => moveByCard(1)}
            className="rounded-full p-2 text-gray-800 transition hover:bg-black/10"
            aria-label="Next captured moment"
            title="Next captured moment"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ZoomSlider(props) {
  return <ZoomSliderComp {...props} />;
}