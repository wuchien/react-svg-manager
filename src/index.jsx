import React from "react";
import PropTypes from "prop-types";

import { forOwn } from "./utils/funcs";

import DrawPath from "./components/DrawPath";
import palette from "./utils/palette";
import styles from "./style.css";

const SvgManager = (svgBlueprint, rootConfig) => {
  return ({ svgName, anime = {}, setting = {} }) => {
    if (typeof svgName !== "string" || svgName === "") {
      throw new Error("Expected the svgName to be a valid string.");
    }

    const { width, height, dFunc } = setting;
    const {
      rootStrokeWidth = "2",
      rootDefaultStrokeColor = "#ddd",
      rootAnimatingStrokeColor = palette.sui_yellow,
      rootFulfilledStrokeColor = palette.sui_green,
      rootRejectedStrokeColor = palette.sui_red
    } = rootConfig;
    const {
      w = width,
      h = height,
      paths = {},
      x = 0,
      y = 0,
      svgShouldFill = false,
      svgAnimeType = "dash",
      svgStrokeWidth = rootStrokeWidth,
      svgTotalLength = "L300",
      svgDefaultStrokeColor = rootDefaultStrokeColor,
      svgAnimatingStrokeColor = rootAnimatingStrokeColor,
      svgFulfilledStrokeColor = rootFulfilledStrokeColor,
      svgRejectedStrokeColor = rootRejectedStrokeColor
    } = svgBlueprint[svgName];

    // object -> array
    const pathArr = [];
    forOwn(paths, value => {
      pathArr.push(value);
    });

    // object -> array
    const animeArr = [];
    forOwn(anime, value => {
      animeArr.push(value);
    });

    const shouldDrawPath = ({ name, isAnimating, fulfilled, rejected }) => {
      pathShouldFill = paths[name].pathShouldFill || svgShouldFill;
      pathAnimeType = paths[name].pathAnimeType || svgAnimeType;
      pathStrokeWidth = paths[name].pathStrokeWidth || svgStrokeWidth;
      pathTotalLength = paths[name].pathTotalLength || svgTotalLength;
      pathDefaultStrokeColor =
        paths[name].pathDefaultStrokeColor || svgDefaultStrokeColor;
      pathAnimatingStrokeColor =
        paths[name].pathAnimatingStrokeColor || svgAnimatingStrokeColor;
      pathFulfilledStrokeColor =
        paths[name].pathFulfilledStrokeColor || svgFulfilledStrokeColor;
      pathRejectedStrokeColor =
        paths[name].pathRejectedStrokeColor || svgRejectedStrokeColor;

      if (isAnimating) {
        if (pathShouldFill) {
          return (
            <path
              key={name}
              className={styles.blinking}
              fill={pathAnimatingStrokeColor}
              stroke={pathAnimatingStrokeColor}
              strokeWidth={pathStrokeWidth}
              strokeMiterlimit="10"
              d={paths[name].d({ width, height, dFunc })}
            />
          );
        } else {
          return (
            <DrawPath
              key={name}
              setting={{
                d: paths[name].d({ width, height, dFunc }),
                shouldFill: pathShouldFill,
                type: pathAnimeType,
                strokeWidth: pathStrokeWidth,
                totalLength: pathTotalLength,
                stroke: pathAnimatingStrokeColor,
                stroke2: pathDefaultStrokeColor
              }}
            />
          );
        }
      } else if (fulfilled || rejected) {
        const color = rejected
          ? pathRejectedStrokeColor
          : pathFulfilledStrokeColor;
        return (
          <path
            key={name}
            fill={svgShouldFill ? color : "transparent"}
            stroke={color}
            strokeWidth={pathStrokeWidth}
            strokeMiterlimit="10"
            d={paths[name].d({ width, height, dFunc })}
          />
        );
      }
      return null;
    };

    return (
      <svg x={x} y={y} width={w} height={h} viewBox={`${x} ${y} ${w} ${h}`}>
        {pathArr.map((value, key) => {
          const {
            d,
            pathDefaultStrokeColor = svgDefaultStrokeColor,
            pathStrokeWidth = svgStrokeWidth
          } = value;
          return (
            <path
              key={key}
              fill={svgShouldFill ? pathDefaultStrokeColor : "transparent"}
              stroke={pathDefaultStrokeColor}
              strokeWidth={pathStrokeWidth}
              strokeMiterlimit="10"
              d={d({ width, height, dFunc })}
            />
          );
        })}
        {animeArr.map((anime, i) => {
          return shouldDrawPath(anime);
        })}
      </svg>
    );
  };
};

SvgManager.propTypes = {
  svgBlueprint: PropTypes.object.isRequired,
  rootConfig: PropTypes.object.isRequired
};

export default SvgManager;
