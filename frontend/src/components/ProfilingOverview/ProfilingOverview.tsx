import styles from "./profilingOverview.module.scss";
import DescriptionRoundedIcon from "@mui/icons-material/DescriptionRounded";
import { formatBytes } from "@/utils/formatter";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import ProfilingService from "@/services/ProfilingService";
import { useNotifications } from "@/components/Providers/NotificationProvider/NotificationProvider";
import { useData } from "../Providers/DataProvider/DataProvider";
import { useRouter } from "next/router";
import { toProfilingData } from "@/model/profilingDataDto";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LinearProgressBar from "../UI/LinearProgressBar/LinearProgressBar";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import { ProfilingAlgorithm } from "@/model/profilingAlgorithm";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import AlgorithmCard from "@/components/Algorithms/AlgorithmCard/AlgorithmCard";

interface Props {
  file: File | null;
  username: string | null;
  algorithm: ProfilingAlgorithm;
  removeFile: () => void;
  goBack: () => void;
}

export default function ProfilingOverview({
  file,
  username,
  algorithm,
  removeFile,
  goBack,
}: Props) {
  const { createSuccessNotification, createErrorNotification } =
    useNotifications();
  const { setData } = useData();
  const router = useRouter();
  const [isProcessing, setIsProcessing] = useState(false);

  const waitForResult = (profilingId: string) => {
    ProfilingService.getProfilingData(profilingId)
      .then((profilingDataDto) => {
        if (profilingDataDto.status == "PENDING") {
          setTimeout(() => waitForResult(profilingId), 500);
          return;
        }

        createSuccessNotification("Profiling successfull", 5000);
        setData(toProfilingData(profilingDataDto));
        setIsProcessing(false);

        setTimeout(() => router.push("/results"), 1000);
      })
      .catch((error) => {
        setIsProcessing(false);
        createErrorNotification(error.message, 5000);
      });
  };

  const handleClick = () => {
    setIsProcessing(true);
    if (username) {
      ProfilingService.predictUsername(username, algorithm)
        .then((profilingId) => waitForResult(profilingId))
        .catch((error) => {
          createErrorNotification(error.message, 5000);
          setIsProcessing(false);
        });
    } else if (file) {
      ProfilingService.predict(file, algorithm)
        .then((profilingId) => waitForResult(profilingId))
        .catch((error) => {
          createErrorNotification(error.message, 5000);
          setIsProcessing(false);
        });
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 0.25 } }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      key="filePreviewContainer"
      className={styles.container}
    >
      <h2 className={styles.title}>
        <ArrowBackRoundedIcon onClick={goBack} />
        <span>OVERVIEW</span>
      </h2>
      <AnimatePresence>
        <motion.div
          key="overviewContainer"
          layout
          transition={{ duration: 0.2 }}
          className={styles.overviewContainer}
        >
          {file && (
            <div
              className={styles.fileInfoContainer}
              data-disabled={isProcessing}
            >
              <DescriptionRoundedIcon className={styles.fileIcon} />
              <div className={styles.fileInfo}>
                <div className={styles.fileName}>{file.name}</div>
                <div className={styles.fileSize}>{formatBytes(file.size)}</div>
              </div>
              {!isProcessing && (
                <div className={styles.deleteOverlay}>
                  <div className={styles.deleteContainer} onClick={removeFile}>
                    <DeleteRoundedIcon />
                    <span>DELETE</span>
                  </div>
                </div>
              )}
            </div>
          )}

          <AlgorithmCard algorithm={algorithm} />
        </motion.div>

        {isProcessing && (
          <motion.div
            key="processing"
            className={styles.barContainer}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <LinearProgressBar label="Processing dataset..." />
          </motion.div>
        )}

        <motion.button
          layout
          transition={{ duration: 0.2 }}
          key="startButton"
          data-disabled={isProcessing}
          className={styles.startButton}
          onClick={handleClick}
        >
          <span>START PROFILING</span>
          <PlayArrowRoundedIcon />
        </motion.button>
      </AnimatePresence>
    </motion.div>
  );
}
