import { Share } from "@capacitor/share";
import { useSearchParams } from "react-router-dom";
import Canvas from "./Canvas";
import { useState } from "react";
import { Capacitor } from "@capacitor/core";

function ShareButton({ correctAnswers, incorrectAnswers }) {
  const [searchParams] = useSearchParams();
  const language = searchParams.get("lang");

  const [createImage, setCreateImage] = useState(false);

  async function handleShare() {
    setCreateImage(true);
  }

  async function handleImageReady(dataUrl) {
    const blob = await (await fetch(dataUrl)).blob();
    const file = new File(
      [blob],
      "maestrocat-result.png",
      { type: "image/png" }
    );
    const englishText = `I got ${correctAnswers} out of ${correctAnswers + incorrectAnswers} notes correct in MaestroCat. Can you do the same?`;
    const russianText = `Я набрал ${correctAnswers} из ${correctAnswers + incorrectAnswers} правильных ответов в MaestroCat. А сколько наберёшь ты?`;

    if (Capacitor.isNativePlatform()) {
      await Share.share({
        title:
          language === "english"
            ? "My MaestroCat result"
            : "Мой результат в MaestroCat",

        text:
          language === "english"
            ? englishText
            : russianText,

        files: language == "russian" ? [file] : undefined,
        url: language == "english" ? "https://andreymarikov.github.io/maestrocat/" : undefined
      });
    } else {
      await navigator.share({
        title:
          language === "english"
            ? "My MaestroCat result"
            : "Мой результат в MaestroCat",

        text:
          language === "english"
            ? englishText
            : russianText,

        files: language == "russian" ? [file] : undefined,
        url: language == "english" ? "https://andreymarikov.github.io/maestrocat/" : undefined
      });
    }

    setCreateImage(false);
  }

  return (
    <>
      <button
        onClick={handleShare}
        style={{
          width: "60px",
          borderRadius: "12px",
          fontSize: "24px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
        className="btn btn-green share-button"
      >
        <i className="fa-solid fa-share"></i>
      </button>

      <Canvas
        correctAnswers={correctAnswers}
        incorrectAnswers={incorrectAnswers}
        createImage={createImage}
        onImageReady={handleImageReady}
      />
    </>
  );
}

export default ShareButton;
