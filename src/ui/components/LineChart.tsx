"use client";
/*
 * Documentation:
 * Line Chart — https://app.subframe.com/library?component=Line+Chart_22944dd2-3cdd-42fd-913a-1b11a3c1d16d
 */

import React from "react";
import * as SubframeCore from "@subframe/core";
import * as SubframeUtils from "../utils";

interface LineChartRootProps
  extends React.ComponentProps<typeof SubframeCore.LineChart> {
  className?: string;
}

const LineChartRoot = React.forwardRef<
  React.ElementRef<typeof SubframeCore.LineChart>,
  LineChartRootProps
>(function LineChartRoot(
  { className, ...otherProps }: LineChartRootProps,
  ref
) {
  return (
    <SubframeCore.LineChart
      className={SubframeUtils.twClassNames("h-80 w-full", className)}
      ref={ref}
      colors={[
        "#ff5c71",
        "#ffb9c3",
        "#df4e61",
        "#ff98a6",
        "#bf4152",
        "#ff798b",
      ]}
      {...otherProps}
    />
  );
});

export const LineChart = LineChartRoot;
