import React from 'react'

import cn from 'classnames';
import styles from "./ToggleButton.module.css";

function ToggleButton({ show, toggler, children, count }) {
  // let btnClasses = ["btn"];

  // if (!show) {
  //   btnClasses.push("active");
  // }

  const btnStyles = { marginBottom: "2rem" };

  return (
    <button
      // className={btnClasses.join(" ")}
      className={cn(styles.btn, {
          [styles.active]: !show,
          [styles.disabled]: !count })
        }
      // className={styles.btn}
      onClick={toggler}
      style={btnStyles}
      disabled={!count}
    >
      {children}
    </button>
  );
}

export default ToggleButton
