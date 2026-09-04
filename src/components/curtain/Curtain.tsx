"use client";

import "./Curtain.css";

interface CurtainProps {
  open?: boolean;
  animate?: boolean;
  showStage?: boolean;
}

export default function Curtain({
  open = false,
  animate = true,
  showStage = true

}: CurtainProps) {
  return (
    <div
      className={`
        curtain-wrapper
        ${open ? "curtain-open" : "curtain-closed"}
        ${animate ? "curtain-animate" : ""}
      `}
    >
      {showStage && <div className="stage-light" />}

      <div className="stage-background">
        <div className="stage-glow" />
      </div>

      <div className="curtain curtain-left">
        <div className="curtain-folds" />
        <div className="curtain-shadow" />
      </div>

      <div className="curtain curtain-right">
        <div className="curtain-folds" />
        <div className="curtain-shadow" />
      </div>

      <div className="curtain-top">
        <div className="top-folds" />
      </div>

      <div className="curtain-fringe" />
    </div>
  );
}