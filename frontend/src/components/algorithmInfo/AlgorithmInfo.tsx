import MartincAlgorithmInfo from "./MartincAlgorithmInfo";

interface Props {
  algorithm: string;
}

export default function AlgorithmInfo({ algorithm }: Props) {
  if (algorithm === "martinc_celebrity") {
    return <MartincAlgorithmInfo />;
  } else {
    return <></>;
  }
}