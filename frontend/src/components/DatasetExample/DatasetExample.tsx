import { DivProps } from "@/utils/defaultInterfaces";
import styles from "./datasetExample.module.scss";
import { useState } from "react";
import { useEffect } from "react";
import Prism from "prismjs";
require("prismjs/components/prism-javascript");
require("prismjs/components/prism-json");
require("prismjs/components/prism-csv");
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";

interface Props extends DivProps {}

export default function DatasetExample({ className }: Props) {
  const NDJsonCode = [
    '{"id": "102931", "text": ["Just witnessed the most breathtaking sunset. Nature never ceases to amaze me.", "Coffee is my love language."]}',
    '{"id": "94823", "text": ["Finally finished writing my novel! Time to celebrate!", "Life\'s too short to wear boring socks. #SockGameStrong"]}',
    '{"id": "34578", "text": ["Can\'t stop listening to this new song on repeat. It\'s pure magic.", "Be a voice, not an echo. #Inspiration"]}',
    '{"id": "16243", "text": ["Spontaneous road trips are the best kind of adventures.", "I just adopted the most adorable puppy. Meet my new best friend!"]}',
    '{"id": "16243", "text": ["Success is a journey, not a destination. Keep striving. #Motivation", "Nothing beats a warm hug on a cold day. Sending virtual hugs to everyone!"]}',
    '{"id": "16243", "text": ["Chasing dreams and catching memories.", "Pizza is life. No arguments, please."]}',
    '{"id": "16243", "text": ["Just booked my dream vacation. Counting down the days! ", "Rainy days are perfect for cozying up with a good book."]}',
    '{"id": "16243", "text": ["Inhale confidence, exhale doubt. #SelfLove", "Sometimes all you need is a good laugh to brighten your day."]}',
    '{"id": "16243", "text": ["Embrace the chaos and find beauty in the unexpected. #LifeLessons", "I\'m a firm believer in the power of positive vibes."]}',
    '...'
  ];

  const CSVCode = [
    "id,text",
    "102931,Just witnessed the most breathtaking sunset. Nature never ceases to amaze me.",
    "102931,Coffee is my love language.",
    "94823,Finally finished writing my novel! Time to celebrate!",
    "94823,Life's too short to wear boring socks. #SockGameStrong",
    "34578,Can't stop listening to this new song on repeat. It's pure magic.",
    "34578,Be a voice, not an echo. #Inspiration",
    "16243,Spontaneous road trips are the best kind of adventures.",
    "16243,I just adopted the most adorable puppy. Meet my new best friend!",
    "16243,Success is a journey, not a destination. Keep striving. #Motivation",
    "16243,Nothing beats a warm hug on a cold day. Sending virtual hugs to everyone!",
    "..."
  ];

  const handleClick = (code: string[]) => {
    setCode(code);
    setLanguage(code === NDJsonCode ? "json" : "csv");
  };

  const [language, setLanguage] = useState<"json" | "csv">("json");
  const [code, setCode] = useState(NDJsonCode);

  useEffect(() => {
    Prism.highlightAll();
  }, [language, code]);

  return (
    <div className={className}>
      <div className={styles.codeContainer}>
        <div className={styles.fileNameContainer}>
          <DescriptionRoundedIcon />
          <span>{`dataset.${language === "json" ? "ndjson" : language}`}</span>
        </div>
        {code.map((line, index) => (
          <div key={index} className={styles.codeLineContainer}>
            <div className={styles.lineNumber}>
              <span>{index + 1}</span>
            </div>
            <pre className={styles.codeLine}>
              <code className={`language-${language}`}>{line}</code>
            </pre>
          </div>
        ))}
      </div>
      <div className={styles.buttonsContainer}>
        <button
          className={styles.formatButton}
          onClick={() => handleClick(NDJsonCode)}
          data-selected={language === "json"}
        >
          NDJSON
        </button>
        <button
          className={styles.formatButton}
          onClick={() => handleClick(CSVCode)}
          data-selected={language === "csv"}
        >
          CSV
        </button>
      </div>
    </div>
  );
}
