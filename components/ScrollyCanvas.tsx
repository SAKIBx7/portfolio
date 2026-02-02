'use client';

import { useEffect, useRef, useState } from 'react';
import { useMotionValue } from 'framer-motion';
import { Overlay } from './Overlay';

export default function ScrollyCanvas() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const containerRef = useRef<HTMLDivElement>(null);
    const [images, setImages] = useState<HTMLImageElement[]>([]);
    const [isLoaded, setIsLoaded] = useState(false);

    const scrollYProgress = useMotionValue(0);
    const frameCount = 90;

    // 1. Preload Images
    useEffect(() => {
        let loadedCount = 0;
        const imgs: HTMLImageElement[] = [];

        for (let i = 0; i < frameCount; i++) {
            const img = new Image();
            img.src = `/sequence/img_${i.toString().padStart(3, '0')}.png`;
            img.onload = () => {
                loadedCount++;
                if (loadedCount === frameCount) setIsLoaded(true);
            };
            img.onerror = () => console.error("Failed to load:", img.src);
            imgs.push(img);
        }
        setImages(imgs);
    }, []);

    // 2. Render Logic
    const render = (index: number, currentImages: HTMLImageElement[]) => {
        const canvas = canvasRef.current;
        if (!canvas || !currentImages[index]) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        const img = currentImages[index];

        // Draw Image - Object Fit Cover
        const imgRatio = img.width / img.height;
        const canvasRatio = canvas.width / canvas.height;

        let w, h, x, y;
        if (imgRatio > canvasRatio) {
            h = canvas.height;
            w = h * imgRatio;
            x = (canvas.width - w) / 2;
            y = 0;
        } else {
            w = canvas.width;
            h = w / imgRatio;
            x = 0;
            y = (canvas.height - h) / 2;
        }

        ctx.drawImage(img, x, y, w, h);
    };

    // 3. Scroll Logic
    useEffect(() => {
        if (!isLoaded) return;

        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                const dpr = window.devicePixelRatio || 1;
                canvasRef.current.width = window.innerWidth * dpr;
                canvasRef.current.height = window.innerHeight * dpr;
                const ctx = canvasRef.current.getContext('2d');
                if (ctx) ctx.scale(dpr, dpr);

                // Redraw
                const p = scrollYProgress.get();
                const f = Math.floor(p * (frameCount - 1));
                render(f, images);
            }
        };

        const handleScroll = () => {
            if (!containerRef.current) return;
            // "containerRef" is now just the spacer.
            const rect = containerRef.current.getBoundingClientRect();

            // Calculate progress based on how much of the SPACER has passed the top of viewport
            // Start: Spacer Top = 0. Progress = 0.
            // End: Spacer Bottom = Viewport Bottom. Progress = 1.
            // Wait, we want the animation to finish when the projects section arrives?
            // Projects section arrives when Spacer Bottom = Viewport Bottom.
            // Logic:
            // ScrollDistance = -rect.top (How many pixels top of spacer is above viewport top)
            // MaxScroll = rect.height - window.innerHeight

            const maxScroll = rect.height - window.innerHeight;
            const currentScroll = -rect.top;

            let progress = 0;
            if (maxScroll > 0) {
                progress = Math.max(0, Math.min(1, currentScroll / maxScroll));
            }

            scrollYProgress.set(progress);

            const frame = Math.floor(progress * (frameCount - 1));
            requestAnimationFrame(() => render(frame, images));
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        window.addEventListener('resize', handleResize);
        handleResize(); // Initial render

        return () => {
            window.removeEventListener('scroll', handleScroll);
            window.removeEventListener('resize', handleResize);
        };
    }, [isLoaded, images, scrollYProgress]);

    return (
        <>
            {/* FIXED CANVAS CONTAINER - Stays put, always fullscreen */}
            {/* z-0 ensures it sits behind content that follows */}
            <div className="fixed inset-0 h-[100dvh] w-full z-0 overflow-hidden">
                <canvas
                    ref={canvasRef}
                    className="block w-full h-full object-cover"
                    style={{ width: '100%', height: '100%' }}
                />

                <Overlay scrollYProgress={scrollYProgress} />

                {!isLoaded && (
                    <div className="absolute inset-0 z-50 flex items-center justify-center bg-[#121212] text-white">
                        <p className="animate-pulse text-xl tracking-widest">LOADING EXPERIENCE</p>
                    </div>
                )}
            </div>

            {/* SPACER - Invisible div that creates the scroll height */}
            <div
                ref={containerRef}
                className="relative w-full pointer-events-none"
                style={{ height: '500vh' }}
                aria-hidden="true"
            />
        </>
    );
}
