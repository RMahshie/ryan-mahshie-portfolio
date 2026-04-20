import { useRef, useEffect } from 'react';

export const InteractiveGrid = ({ className = '' }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationId;
    let dots = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let running = true;
    const mouse = { x: -1000, y: -1000 };

    function sizeCanvas() {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.scale(dpr, dpr);
      width = rect.width;
      height = rect.height;
    }

    function buildGrid() {
      dots = [];
      const isMobile = width < 768;
      const spacing = isMobile ? 24 : 16;
      const cols = Math.ceil(width / spacing) + 1;
      const rows = Math.ceil(height / spacing) + 1;

      for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
          dots.push({
            x: col * spacing,
            y: row * spacing,
            baseOpacity: 0.08 + Math.random() * 0.12,
            opacity: 0,
            size: 2,
            pulseSpeed: 0.3 + Math.random() * 0.7,
            pulseOffset: Math.random() * Math.PI * 2,
            blinkTimer: Math.floor(Math.random() * 200),
            blinkDuration: 0,
            isBlinking: false,
          });
        }
      }
    }

    function animate() {
      if (!running) return;
      ctx.clearRect(0, 0, width, height);
      frame++;

      const mouseRadius = 150;

      for (const dot of dots) {
        const pulse = Math.sin(frame * 0.02 * dot.pulseSpeed + dot.pulseOffset);
        const pulseOpacity = dot.baseOpacity + pulse * 0.05;

        const dx = mouse.x - dot.x;
        const dy = mouse.y - dot.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const mouseFactor = Math.max(0, 1 - dist / mouseRadius);
        const mouseBoost = mouseFactor * mouseFactor * 0.6;

        dot.blinkTimer--;
        if (dot.blinkTimer <= 0 && !dot.isBlinking) {
          if (Math.random() < 0.003) {
            dot.isBlinking = true;
            dot.blinkDuration = 8 + Math.floor(Math.random() * 12);
          }
          dot.blinkTimer = 60 + Math.floor(Math.random() * 180);
        }

        let blinkBoost = 0;
        if (dot.isBlinking) {
          dot.blinkDuration--;
          blinkBoost = 0.5;
          if (dot.blinkDuration <= 0) dot.isBlinking = false;
        }

        dot.opacity = Math.min(1, pulseOpacity + mouseBoost + blinkBoost);

        if (dot.opacity > 0.01) {
          const accentMix = mouseFactor * mouseFactor;
          if (accentMix > 0.01) {
            const r = Math.round(140 + accentMix * (168 - 140));
            const g = Math.round(140 + accentMix * (85 - 140));
            const b = Math.round(150 + accentMix * (247 - 150));
            ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.opacity})`;
          } else {
            ctx.fillStyle = `rgba(140, 140, 150, ${dot.opacity})`;
          }
          ctx.fillRect(dot.x - dot.size / 2, dot.y - dot.size / 2, dot.size, dot.size);
        }
      }

      // Cursor glow layer
      if (mouse.x > 0 && mouse.y > 0) {
        const gradient = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 120);
        gradient.addColorStop(0, 'rgba(168, 85, 247, 0.06)');
        gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
      }

      animationId = requestAnimationFrame(animate);
    }

    function startAnimation() {
      if (!running) {
        running = true;
        animate();
      }
    }

    function stopAnimation() {
      running = false;
      cancelAnimationFrame(animationId);
    }

    // Initial setup
    sizeCanvas();
    buildGrid();
    animate();

    // Resize handling
    const resizeObserver = new ResizeObserver(() => {
      sizeCanvas();
      buildGrid();
    });
    resizeObserver.observe(canvas.parentElement);

    // Mouse tracking on parent
    const container = canvas.parentElement;

    function handleMouseMove(e) {
      const rect = container.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    }

    function handleMouseLeave() {
      mouse.x = -1000;
      mouse.y = -1000;
    }

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    // Pause when off-screen
    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          startAnimation();
        } else {
          stopAnimation();
        }
      },
      { threshold: 0 }
    );
    intersectionObserver.observe(canvas.parentElement);

    return () => {
      running = false;
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        willChange: 'contents',
      }}
    />
  );
};
