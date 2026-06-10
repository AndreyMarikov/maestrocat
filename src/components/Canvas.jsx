import { useRef, useEffect } from "react";

// ─── Module-level asset cache ────────────────────────────────────────────────
// Loading starts the moment this module is imported (app startup), so by the
// time the game ends and Canvas mounts, both promises are already resolved.

let imagePromise = null;
let fontPromise = null;

function getImage() {
  if (!imagePromise) {
    imagePromise = new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => {
        imagePromise = null; // allow retry on failure
        reject(new Error("Failed to load card.png"));
      };
      img.src = "/maestrocat/card.png";
    });
  }
  return imagePromise;
}

function getFont() {
  if (!fontPromise) {
    fontPromise = new FontFace("Nunito", "url(/maestrocat/Nunito-ExtraBold.ttf)")
      .load()
      .then(font => {
        document.fonts.add(font);
      })
      .catch(err => {
        fontPromise = null; // allow retry on failure
        throw err;
      });
  }
  return fontPromise;
}

// Kick off loading immediately on import
getImage();
getFont();

// ─── Component ───────────────────────────────────────────────────────────────

function Canvas({ correctAnswers, incorrectAnswers, createImage, onImageReady }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!createImage) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    let cancelled = false;

    // By the time this runs, getImage() and getFont() are almost certainly
    // already resolved — Promise.all() returns in the same microtask tick.
    Promise.all([getImage(), getFont()])
      .then(([img]) => {
        if (cancelled) return;

        canvas.width = img.width;
        canvas.height = img.height;

        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0);
        ctx.font = "bold 80px Nunito";
        ctx.fillStyle = "white";

        const total = correctAnswers + incorrectAnswers;
        const percent = total > 0
          ? Math.round((correctAnswers / total) * 100)
          : 0;
        const x = 190;

        ctx.fillText(String(correctAnswers), x, 565);
        ctx.fillText(String(incorrectAnswers), x, 747);
        ctx.fillText(`${percent}%`, x, 928);

        // toDataURL is synchronous — no requestAnimationFrame needed
        onImageReady?.(canvas.toDataURL("image/png"));
      })
      .catch(err => console.error("Canvas generation failed:", err));

    return () => { cancelled = true; };
  }, [createImage, correctAnswers, incorrectAnswers, onImageReady]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: -9999, left: -9999 }}
    />
  );
}

export default Canvas;
