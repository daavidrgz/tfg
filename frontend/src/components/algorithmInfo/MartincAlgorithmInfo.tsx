import ScoreTable from "../scoreTable/ScoreTable";
import styles from "./algorithmInfo.module.scss";

export default function MartincAlgorithmInfo() {
  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Martinc Algorithm</h2>
      <p className={styles.body}>
        The Martinc algorithm is a profiling algorithm that uses the
        <span className="bold"> TF-IDF</span>, a statistical measure that
        evaluates the relevance of each word in a collection of documents.
        <br />
        <br />
        It was trained using a{" "}
        <span className="bold">
          collection of tweets from 48335 celebrities
        </span>{" "}
        from the dataset offered by the{" "}
        <a
          className="link"
          href="https://pan.webis.de/clef19/pan19-web/celebrity-profiling.html"
          target="_blank"
        >
          Celebrity Profiling PAN competition (2019).
        </a>
        <br />
        <br />
        The algorithm obtains the following score for each class:
      </p>
      <ScoreTable
        className={styles.scoreTable}
        score={{
          // 0.4654277351491647
          birthDecade: { name: "Birth Decade", f1: 0.46543 },
          // 0.9032125213870843
          gender: { name: "Gender", f1: 0.90321 },
          // 0.7483208875349275
          occupation: { name: "Occupation", f1: 0.74832 },
          // 0.7780803314633018
          fame: { name: "Fame", f1: 0.77808 },
        }}
      />
      <p className={styles.cite}>
        Martinc, M., Skrlj, B., & Pollak, S. (2019, September). Who is Hot and
        Who is Not? Profiling Celebs on Twitter.{" "}
        <a
          className="link"
          href="https://ceur-ws.org/Vol-2380/paper_203.pdf"
          target="_blank"
        >
          (https://ceur-ws.org/Vol-2380/paper_203.pdf)
        </a>
      </p>
    </div>
  );
}
