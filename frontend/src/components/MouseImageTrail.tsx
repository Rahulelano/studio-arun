import { useAnimate } from "framer-motion";
import React, { useRef } from "react";

export const MouseImageTrail = ({
    children,
    images,
    renderImageBuffer = 50,
    rotationRange = 25,
}: {
    children: React.ReactNode;
    images: string[];
    renderImageBuffer?: number;
    rotationRange?: number;
}) => {
    const [scope, animate] = useAnimate();
    const lastRenderPosition = useRef({ x: 0, y: 0 });
    const imageRenderCount = useRef(0);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const { clientX, clientY } = e;

        const distance = calculateDistance(
            clientX,
            clientY,
            lastRenderPosition.current.x,
            lastRenderPosition.current.y
        );

        if (distance >= renderImageBuffer) {
            lastRenderPosition.current.x = clientX;
            lastRenderPosition.current.y = clientY;

            renderNextImage();
        }
    };

    const calculateDistance = (
        x1: number,
        y1: number,
        x2: number,
        y2: number
    ) => {
        const deltaX = x2 - x1;
        const deltaY = y2 - y1;
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    };

    const renderNextImage = () => {
        const imageIndex = imageRenderCount.current % images.length;

        // We use a pool of 20 images to allow for a trail effect
        // We cycle through the DOM elements 0-19
        const selector = `[data-mouse-move-index="${imageRenderCount.current % 20}"]`;

        const el = document.querySelector(selector) as HTMLImageElement;

        // Use pageX/Y to account for scroll if the container is relative to document body, 
        // but if the container is "relative" and we use absolute positioning inside it, we need relative coordinates.
        // However, usually these trails are fixed or absolute to the *viewport* or *container*.
        // Since we attach onMouseMove to the container, clientX/Y gives viewport coords.
        // Ideally we want the image to spawn under the cursor.
        // If we use fixed positioning for images, clientX/Y works perfect.
        // If we use absolute, we need to account for scroll if the parent scrolls.
        // Let's use `fixed` position for the images to ensure they stick to the cursor regardless of container flow,
        // OR translate visual coordinates.
        // Using `fixed` is safest for "cursor follow" effects to avoid offset issues.

        if (el) {
            el.style.position = 'fixed';
            el.style.top = `${lastRenderPosition.current.y}px`;
            el.style.left = `${lastRenderPosition.current.x}px`;
            el.style.zIndex = "50"; // High Z-Index to be seen, but maybe adjust based on requirements
            el.style.opacity = "0";
            el.src = images[imageIndex]; // Dynamically set the source based on the global count

            const rotation = Math.random() * rotationRange * 2 - rotationRange;

            animate(
                selector,
                {
                    opacity: [0, 1],
                    scale: [0.5, 1],
                    rotate: rotation,
                },
                { type: "spring", damping: 15, stiffness: 200 }
            );

            animate(
                selector,
                {
                    opacity: [1, 0],
                },
                { ease: "linear", duration: 0.5, delay: 0.8 } // Stay visible for a bit then fade
            );

            imageRenderCount.current = imageRenderCount.current + 1;
        }
    };

    return (
        <div
            ref={scope}
            onMouseMove={handleMouseMove}
            className="relative overflow-hidden"
        // overflow-hidden prevents scrollbars if images fly off 
        // But if we use 'fixed', overflow-hidden on parent doesn't clip 'fixed' children in some browsers
        // typically. We'll rely on global overflow handling or just standard implementation.
        >
            {children}

            {/* Generate a pool of 20 image elements to reuse */}
            {Array.from({ length: 20 }).map((_, index) => (
                <img
                    className="pointer-events-none w-32 h-40 sm:w-40 sm:h-52 object-cover rounded-xl border-2 border-white/20 shadow-2xl backdrop-blur-sm"
                    key={index}
                    data-mouse-move-index={index}
                    alt={`trail-${index}`}
                    src={images[0]} // Initial src, will be replaced
                    style={{
                        position: "fixed",
                        top: 0,
                        left: 0,
                        opacity: 0,
                        pointerEvents: "none",
                        transform: "translate(-50%, -50%)", // Center on cursor
                    }}
                />
            ))}
        </div>
    );
};
