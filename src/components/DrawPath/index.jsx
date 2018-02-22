import React from "react";
import PropTypes from "prop-types";

import styles from "./style.css";

const DrawPath = ({ setting }) => {
  const {
    d,
    type,
    totalLength,
    stroke,
    stroke2,
    strokeWidth,
    shouldFill
  } = setting;

  return (
    <g>
      <path
        className={styles.path}
        fill={shouldFill ? stroke : "transparent"}
        stroke={stroke}
        strokeWidth={strokeWidth}
        strokeMiterlimit="10"
        d={d}
        style={{
          strokeDashoffset: totalLength,
          strokeDasharray: totalLength + " " + totalLength
        }}
      />
      {type === "dash"
        ? <path
            className={styles.path2}
            fill={shouldFill ? stroke2 : "transparent"}
            stroke={stroke2}
            strokeWidth={strokeWidth}
            strokeMiterlimit="10"
            d={d}
            style={{
              strokeDashoffset: totalLength,
              strokeDasharray: totalLength + " " + totalLength
            }}
          />
        : null}
    </g>
  );
};

DrawPath.propTypes = {
  setting: PropTypes.object.isRequired
};

export default DrawPath;
