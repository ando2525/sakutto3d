import styles from "../components/page/thanks/Thanks.module.scss";
import { Header } from "../components/global/Header/Index";

export default function Thanks() {
  return (
    <>
      <div className={styles.thanks}>
        <Header />
        <div className={styles.wrapper}>
          <div className={styles.container}>
            <div className={styles.inner}>
              <div className={styles.title}>
                お問い合わせありがとうございます。
                <br />
                48時間以内にお返事致しますので、しばらくお待ちください。
              </div>
            </div>
            <div className={styles["button-border-gradient-wrap"]}>
              <a
                href=""
                className={`${styles.button} ${styles["button-border-gradient"]}`}
              >
                <span className={styles["button-span"]}>ホームに戻る</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
