import { useTransition } from "@react-spring/three";
import classNames from "classnames";
import React, { useCallback } from "react";
import useBreakpoint from "use-breakpoint";
import { animated as a } from "@react-spring/web";

import { toggleIsOpen } from "../features/gamelist/gamelistSlice";
import { useAppDispatch, useAppSelector } from "./hooks";
import ScreenHeightWraper from "../presentational/ScreenHeightWrapper";

// default tailwind breakpoints
const BREAKPOINTS = {
  xs: 0,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
};

const SidebarRightSide: React.FC = ({ children }) => {
  const dispatch = useAppDispatch();
  const isSidebarOpen = useAppSelector((state) => state.gamelist.isOpen);

  const { breakpoint } = useBreakpoint(BREAKPOINTS);

  const onClick = useCallback(() => dispatch(toggleIsOpen()), [dispatch]);

  const breakcond = breakpoint === "xs" || breakpoint === "sm";
  const condition = isSidebarOpen && breakcond;

  const transitions = useTransition(condition, {
    from: { opacity: 0 },
    enter: { opacity: 0.5 },
    leave: { opacity: 0 },
  });

  return (
    <ScreenHeightWraper className="w-full min-w-0">
      <div
        className={classNames(
          "flex-auto overflow-auto h-full",
          breakcond && "min-w-[100vw]"
        )}
      >
        {children}
        {transitions(
          (styles, value) =>
            value && (
              <a.div
                className="absolute top-0 right-0 bottom-0 left-0 bg-black"
                onClick={onClick}
                // @ts-ignore
                style={styles}
              ></a.div>
            )
        )}
      </div>
    </ScreenHeightWraper>
  );
};

export default SidebarRightSide;
