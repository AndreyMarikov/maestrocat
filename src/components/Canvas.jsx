import { useRef, useEffect } from "react";

function MyCanvasComponent({
  correctAnswers,
  incorrectAnswers,
  createImage,
  onImageReady,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    if (!createImage) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");

    const img = new Image();

    img.onload = async () => {
      canvas.width = img.width;
      canvas.height = img.height;

      ctx.drawImage(img, 0, 0);

      const font = new FontFace(
        "Nunito",
        "url(/maestrocat/Nunito-ExtraBold.ttf)"
      );

      await font.load();
      document.fonts.add(font);

      ctx.font = "bold 80px Nunito";
      ctx.fillStyle = "white";

      const x = 190;

      ctx.fillText(String(correctAnswers), x, 565);
      ctx.fillText(String(incorrectAnswers), x, 747);

      const percent = Math.round(
        (correctAnswers / (correctAnswers + incorrectAnswers)) * 100
      );

      ctx.fillText(percent + "%", x, 928);

      requestAnimationFrame(() => {
        const dataUrl = canvas.toDataURL("image/png");
        onImageReady?.(dataUrl);
      });
    };

    img.onerror = () => {
      console.error("Failed to load image");
    };

    img.src = "/maestrocat/card.png";
  }, [createImage]);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "fixed", top: -9999, left: -9999 }}
    />
  );
}

export default MyCanvasComponent;
