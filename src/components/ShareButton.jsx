import { Share } from "@capacitor/share";
import { useSearchParams } from "react-router-dom";
import Canvas from "./Canvas";
import { useState, useRef, useCallback } from "react";
import { Capacitor } from "@capacitor/core";
import { Filesystem, Directory } from "@capacitor/filesystem";

// ─── Helpers ─────────────────────────────────────────────────────────────────

/**
 * Synchronous data-URL → Blob conversion.
 * Avoids the async fetch(dataUrl).blob() round-trip, saving ~10-30 ms on tap.
 */
function dataUrlToBlob(dataUrl) {
  const [header, base64] = dataUrl.split(",");
  const mime = header.match(/:(.*?);/)[1];
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return new Blob([bytes], { type: mime });
}

// ─── Component ───────────────────────────────────────────────────────────────

function ShareButton({ correctAnswers, incorrectAnswers }) {
  const [searchParams] = useSearchParams();
  const language = searchParams.get("lang");

  const dataUrlRef = useRef(null);
  const nativeUriRef = useRef(null); // pre-written cache URI (native only)
  const [imageReady, setImageReady] = useState(false);

  // ── Share handler ──────────────────────────────────────────────────────────
  // Everything expensive has already happened before this runs:
  //   • image is rendered in Canvas
  //   • native file is already written to cache (see handleImageReady)
  //   • web blob conversion is synchronous
  async function handleShare() {
    const dataUrl = dataUrlRef.current;
    if (!dataUrl) return;

    const total = correctAnswers + incorrectAnswers;
    const isEnglish = language === "english";

    const title = isEnglish ? "My MaestroCat result" : "Мой результат в MaestroCat";
    const text = isEnglish
      ? `I got ${correctAnswers} out of ${total} notes correct in MaestroCat. Can you do the same?`
      : `Я набрал ${correctAnswers} из ${total} правильных ответов в MaestroCat. А сколько наберёшь ты?`;
    const url = isEnglish ? "https://andreymarikov.github.io/maestrocat/" : undefined;

    if (Capacitor.isNativePlatform()) {
      // File was pre-written during image generation — no write delay here
      await Share.share({
        title,
        text,
        files: !isEnglish && nativeUriRef.current ? [nativeUriRef.current] : undefined,
        url,
      });
    } else {
      // Synchronous conversion — no async overhead before navigator.share
      const blob = dataUrlToBlob(dataUrl);
      const file = new File([blob], "maestrocat-result.png", { type: "image/png" });
      await navigator.share({
        title,
        text,
        files: !isEnglish ? [file] : undefined,
        url,
      });
    }
  }

  // ── Image-ready callback ───────────────────────────────────────────────────
  // Fires as soon as Canvas has drawn the result card — well before the user
  // taps Share. On native we immediately write the file to cache so that tap
  // → share sheet is instant.
  const handleImageReady = useCallback(async (dataUrl) => {
    dataUrlRef.current = dataUrl;

    if (Capacitor.isNativePlatform()) {
      try {
        const saved = await Filesystem.writeFile({
          path: "maestrocat-result.png",
          data: dataUrl.split(",")[1],
          directory: Directory.Cache,
        });
        nativeUriRef.current = saved.uri;
      } catch (err) {
        console.error("Pre-save failed:", err);
        // Share will still work; the file just won't be attached
      }
    }

    setImageReady(true);
  }, []);

  return (
    <>
      <button
        onClick={handleShare}
        disabled={!imageReady}
        className="btn btn-green share-button"
        style={{
          width: "60px",
          borderRadius: "12px",
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          opacity: imageReady ? 1 : 0.5,
        }}
      >
        <i className="fa-solid fa-share" />
      </button>

      {/* Canvas is hidden off-screen and starts rendering immediately on mount */}
      <Canvas
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        createImage
        onImageReady={handleImageReady}
      />
    </>
  );
}

export default ShareButton;
