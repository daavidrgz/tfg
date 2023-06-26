import { ProfilingAlgorithm } from "@/model/algorithm";
import { motion } from "framer-motion";
import styles from "./algorithmSelector.module.scss";
import MartincAlgorithmCard from "../algorithmCard/MartincAlgorithmCard";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";

interface Props {
  setAlgorithm: (algorithm: ProfilingAlgorithm) => void;
  goBack: () => void;
}

export default function AlgorithmSelector({ goBack, setAlgorithm }: Props) {
  return (
    <motion.div
      key="algithmSelector"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className={styles.container}
    >
      <h2 className={styles.title}>
        <ArrowBackRoundedIcon onClick={goBack} />
        <span>SELECT YOUR ALGORITHM</span>
      </h2>
      <div className={styles.algorithmsContainer}>
        <MartincAlgorithmCard setAlgorithm={setAlgorithm} />
      </div>
    </motion.div>
  );
}