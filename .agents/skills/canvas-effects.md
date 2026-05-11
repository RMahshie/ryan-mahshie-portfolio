---
name: interactive-canvas-effects
description: Create performant, interactive canvas-based background effects for dark-themed sites. Use this skill when building animated backgrounds, dot/particle grids, hover-reactive visual elements, or any canvas-based decorative effect. Covers the dot grid pattern, mouse interaction, pulse cycling, glow rendering, and performance optimization. These effects are purely decorative — they must never interfere with content readability or interaction.
---

# Interactive Canvas Effects

Canvas-based backgrounds create visual depth and interactivity that CSS alone can't achieve. This skill focuses on the specific patterns used in modern dark SaaS landing pages — particularly the interactive dot grid, which creates a subtle living texture that responds to user input.

## Core Architecture

Every canvas background effect follows the same structural pattern:

```
1. Canvas element sized to its container
2. Resize observer to handle viewport changes  
3. Data model (array of particles/dots with properties)
4. Animation loop via requestAnimationFrame
5. Mouse tracking for interactivity
6. Cleanup function to stop animation and remove listeners
```

### React Component Pattern

The canvas effect should be a self-contained component that mounts a canvas, runs the animation, and cleans up on unmount.

```jsx
import { useRef, useEffect } from 'react';

function InteractiveGrid({ className }) {
  const canvasRef = useRef(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;
    let mouse = { x: -1000, y: -1000 }; // off-screen default
    
    // ... setup, animation loop, event listeners ...
    
    return () => {
      cancelAnimationFrame(animationId);
      // remove event listeners
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
        pointerEvents: 'none', // CRITICAL: don't block clicks on content above
      }}
    />
  );
}
```

**Critical rules:**
- Canvas always has `pointer-events: none` in its own styles
- The PARENT container needs `pointer-events: auto` and the mousemove listener goes on the parent, not the canvas
- Canvas is positioned absolute within a relative parent
- Content sits above the canvas via z-index
- Always return a cleanup function that cancels the animation frame

### Canvas Sizing

The canvas `width` and `height` attributes must match its display size multiplied by `devicePixelRatio` for crisp rendering on retina displays.

```javascript
function sizeCanvas(canvas) {
  const dpr = window.devicePixelRatio || 1;
  const rect = canvas.getBoundingClientRect();
  canvas.width = rect.width * dpr;
  canvas.height = rect.height * dpr;
  const ctx = canvas.getContext('2d');
  ctx.scale(dpr, dpr);
  return { width: rect.width, height: rect.height };
}
```

Use a `ResizeObserver` on the canvas parent to re-run sizing when the container changes:

```javascript
const observer = new ResizeObserver(() => {
  const { width, height } = sizeCanvas(canvas);
  // Regenerate dot positions based on new dimensions
  rebuildGrid(width, height);
});
observer.observe(canvas.parentElement);
```

## The Dot Grid Effect

This is the primary effect — a grid of small squares or circles that pulse with random opacity and brighten near the cursor.

### Grid Data Model

Each dot is an object with fixed position and animated properties:

```javascript
function createGrid(width, height, spacing) {
  const dots = [];
  const cols = Math.ceil(width / spacing);
  const rows = Math.ceil(height / spacing);
  
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      dots.push({
        x: col * spacing + spacing / 2,
        y: row * spacing + spacing / 2,
        
        // Base visual properties
        baseOpacity: 0.08 + Math.random() * 0.12,  // 0.08-0.20 range
        opacity: 0,       // current rendered opacity (animated)
        size: 2,           // dot size in px (2-3px for subtle, 4-6px for bolder)
        
        // Pulse animation
        pulseSpeed: 0.3 + Math.random() * 0.7,      // how fast this dot pulses
        pulseOffset: Math.random() * Math.PI * 2,    // phase offset so dots don't sync
        
        // Blink animation (random occasional bright flash)
        blinkTimer: Math.random() * 200,   // frames until next blink
        blinkDuration: 0,                  // remaining blink frames
        isBlinking: false,
      });
    }
  }
  return dots;
}
```

**Key parameters:**
- `spacing`: 16-24px for dense grid (CodeRabbit style), 30-40px for sparse
- `baseOpacity`: Keep low. 0.05-0.20. The dots should be barely visible at rest
- `size`: 2-3px for squares, 2-4px radius for circles. Subtle is better
- Use squares (`fillRect`) not circles (`arc`) for the grid look. Circles are for particle effects

### Animation Loop

```javascript
let frame = 0;

function animate() {
  ctx.clearRect(0, 0, width, height);
  frame++;
  
  for (const dot of dots) {
    // 1. Calculate pulse
    const pulse = Math.sin(frame * 0.02 * dot.pulseSpeed + dot.pulseOffset);
    const pulseOpacity = dot.baseOpacity + pulse * 0.05; // subtle oscillation
    
    // 2. Calculate mouse proximity boost
    const dx = mouse.x - dot.x;
    const dy = mouse.y - dot.y;
    const dist = Math.sqrt(dx * dx + dy * dy);
    const mouseRadius = 150; // px — how far the mouse influence reaches
    const mouseFactor = Math.max(0, 1 - dist / mouseRadius);
    const mouseBoost = mouseFactor * mouseFactor * 0.6; // quadratic falloff, max 0.6 boost
    
    // 3. Handle random blinks
    dot.blinkTimer--;
    if (dot.blinkTimer <= 0 && !dot.isBlinking) {
      // Chance to start blinking
      if (Math.random() < 0.003) { // ~0.3% chance per frame
        dot.isBlinking = true;
        dot.blinkDuration = 8 + Math.floor(Math.random() * 12); // 8-20 frames
      }
      dot.blinkTimer = 60 + Math.floor(Math.random() * 180); // reset timer
    }
    
    let blinkBoost = 0;
    if (dot.isBlinking) {
      dot.blinkDuration--;
      blinkBoost = 0.5; // bright flash
      if (dot.blinkDuration <= 0) {
        dot.isBlinking = false;
      }
    }
    
    // 4. Compose final opacity
    dot.opacity = Math.min(1, pulseOpacity + mouseBoost + blinkBoost);
    
    // 5. Determine color
    // Near mouse: tinted with accent color. Far from mouse: neutral gray
    const accentMix = mouseFactor * mouseFactor; // 0 far away, 1 at cursor
    
    if (dot.opacity > 0.01) { // skip invisible dots for performance
      if (accentMix > 0.01) {
        // Blend between neutral gray and accent purple based on mouse proximity
        const r = Math.round(140 + accentMix * (168 - 140)); // gray → purple R
        const g = Math.round(140 + accentMix * (85 - 140));  // gray → purple G  
        const b = Math.round(150 + accentMix * (247 - 150)); // gray → purple B
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${dot.opacity})`;
      } else {
        ctx.fillStyle = `rgba(140, 140, 150, ${dot.opacity})`;
      }
      
      ctx.fillRect(
        dot.x - dot.size / 2,
        dot.y - dot.size / 2,
        dot.size,
        dot.size
      );
    }
  }
  
  animationId = requestAnimationFrame(animate);
}
```

### Mouse Tracking

Track mouse position relative to the canvas container. Use the parent element for the listener so it captures events even though the canvas has `pointer-events: none`.

```javascript
const container = canvas.parentElement;

function handleMouseMove(e) {
  const rect = container.getBoundingClientRect();
  mouse.x = e.clientX - rect.left;
  mouse.y = e.clientY - rect.top;
}

function handleMouseLeave() {
  // Smoothly move mouse position off-screen so glow fades out
  mouse.x = -1000;
  mouse.y = -1000;
}

container.addEventListener('mousemove', handleMouseMove);
container.addEventListener('mouseleave', handleMouseLeave);

// Don't forget to remove in cleanup:
// container.removeEventListener('mousemove', handleMouseMove);
// container.removeEventListener('mouseleave', handleMouseLeave);
```

**Important:** On mobile, there is no hover. The grid should still look good without mouse interaction — the pulse and blink animations provide ambient life. Do not add touch-based interaction; it's unnecessary and creates awkward behavior.

### Cursor Glow Layer

In addition to brightening individual dots, add a soft radial glow circle that follows the cursor. This is rendered as a separate pass on top of the dots.

```javascript
// Draw after the dot loop
if (mouse.x > 0 && mouse.y > 0) {
  const gradient = ctx.createRadialGradient(
    mouse.x, mouse.y, 0,
    mouse.x, mouse.y, 120
  );
  gradient.addColorStop(0, 'rgba(168, 85, 247, 0.06)');  // accent at center
  gradient.addColorStop(1, 'rgba(168, 85, 247, 0)');      // transparent at edge
  
  ctx.fillStyle = gradient;
  ctx.fillRect(mouse.x - 120, mouse.y - 120, 240, 240);
}
```

This creates the ambient purple glow that follows the cursor — separate from the individual dot brightening.

## Performance Optimization

Canvas effects can easily kill performance if not managed carefully. Follow these rules:

### Frame Budget

Target 60fps (16.6ms per frame). A dot grid with 2000-4000 dots should render in under 4ms.

```javascript
// Development only — measure frame time
const start = performance.now();
// ... render loop ...
const elapsed = performance.now() - start;
if (elapsed > 10) console.warn(`Frame took ${elapsed.toFixed(1)}ms`);
```

### Skip Invisible Dots

Never render dots with opacity below a threshold. The `if (dot.opacity > 0.01)` check in the loop above prevents rendering thousands of invisible rectangles.

### Batch fillStyle Changes

Changing `fillStyle` is expensive. If most dots share the same color (far from mouse), batch them:

```javascript
// Collect dots by color bucket, draw all same-color dots together
// This reduces fillStyle switches from N to ~5-10
```

For a grid of <3000 dots, this optimization is optional. For larger grids, it matters.

### Reduce Dot Count on Mobile

Detect mobile and increase spacing to reduce dot count:

```javascript
const isMobile = window.innerWidth < 768;
const spacing = isMobile ? 24 : 16;
```

### Use `will-change` and Layer Promotion

```css
canvas {
  will-change: contents;
}
```

### RequestAnimationFrame Only

Never use `setInterval` or `setTimeout` for animation. `requestAnimationFrame` automatically pauses when the tab is inactive, preventing unnecessary CPU usage.

### Cleanup

Always cancel the animation frame and remove listeners when the component unmounts or the section leaves the viewport. For sections far below the fold, consider starting the animation only when the section enters the viewport via IntersectionObserver.

```javascript
const observer = new IntersectionObserver(([entry]) => {
  if (entry.isIntersecting) {
    startAnimation();
  } else {
    stopAnimation();
  }
}, { threshold: 0 });
observer.observe(canvas.parentElement);
```

## Variants and Extensions

### Dot Grid With Lines (Connection Effect)

Draw faint lines between dots that are both close to the cursor. This creates a "constellation" effect.

```javascript
// After drawing all dots, draw connecting lines
for (let i = 0; i < dots.length; i++) {
  const a = dots[i];
  const distA = Math.sqrt((mouse.x - a.x) ** 2 + (mouse.y - a.y) ** 2);
  if (distA > mouseRadius) continue;
  
  for (let j = i + 1; j < dots.length; j++) {
    const b = dots[j];
    const distB = Math.sqrt((mouse.x - b.x) ** 2 + (mouse.y - b.y) ** 2);
    if (distB > mouseRadius) continue;
    
    const distAB = Math.sqrt((a.x - b.x) ** 2 + (a.y - b.y) ** 2);
    if (distAB < spacing * 2) {
      const lineOpacity = (1 - distAB / (spacing * 2)) * 0.15;
      ctx.strokeStyle = `rgba(168, 85, 247, ${lineOpacity})`;
      ctx.lineWidth = 0.5;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
    }
  }
}
```

**Warning:** This is O(n²) in the dots near the cursor. Only use if the mouse radius captures <100 dots, otherwise it'll tank performance.

### Floating Particle Field

Instead of a fixed grid, dots drift slowly in random directions. Same rendering approach but positions update each frame:

```javascript
dot.x += dot.vx; // velocity: -0.2 to 0.2 px/frame
dot.y += dot.vy;

// Wrap around edges
if (dot.x < 0) dot.x = width;
if (dot.x > width) dot.x = 0;
if (dot.y < 0) dot.y = height;
if (dot.y > height) dot.y = 0;
```

This gives a more organic, living feel compared to the rigid grid. Use for less structured sections.

### Spotlight Mask (CodeRabbit Stats Section)

This is a CSS-based effect, not canvas. A section has a textured or patterned background that's only visible through a radial gradient mask following the cursor.

```css
.spotlight-container {
  position: relative;
  overflow: hidden;
}
.spotlight-container .background-pattern {
  position: absolute;
  inset: 0;
  /* The dot grid can be a CSS background-image pattern */
  background-image: radial-gradient(circle, rgba(140,140,150,0.3) 1px, transparent 1px);
  background-size: 20px 20px;
  
  /* Mask reveals only near cursor */
  mask-image: radial-gradient(
    300px at var(--mx, 50%) var(--my, 50%),
    white,
    transparent 80%
  );
  -webkit-mask-image: radial-gradient(
    300px at var(--mx, 50%) var(--my, 50%),
    white,
    transparent 80%
  );
}
```

```javascript
// Update CSS custom properties on mousemove
container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;
  container.style.setProperty('--mx', `${x}px`);
  container.style.setProperty('--my', `${y}px`);
});
```

This is lighter weight than a canvas grid and works well for sections that need a subtle hover-reveal effect without a full animation loop.

## Anti-Patterns

1. **Don't animate on scroll.** Canvas redraw on every scroll event is a performance nightmare. Use scroll for triggering start/stop of animations via IntersectionObserver, not for driving animation state
2. **Don't use canvas for text.** Text in canvas can't be selected, searched, or read by screen readers. All text content goes in the DOM above the canvas
3. **Don't block interaction.** The canvas must have `pointer-events: none`. Users must be able to click buttons, select text, and interact with content that sits above the canvas
4. **Don't overdo the effect.** The grid should be barely noticeable at rest — ambient texture, not a screensaver. If someone comments "cool animation," it's probably too strong. If they say "the site feels alive," that's right
5. **Don't forget cleanup.** Leaked animation frames cause memory leaks and CPU drain. Always cancel on unmount
6. **Don't use large dot sizes.** Keep dots 2-4px. Larger sizes look like a game, not a background
7. **Don't run on mobile at full density.** Increase spacing or reduce dot count. Mobile GPUs are weaker and the effect has no hover interaction anyway