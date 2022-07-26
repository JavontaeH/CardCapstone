// @flow
import React, { PropTypes } from "react";

export const CardElements = () => (
  <div className="cardElements">
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/GVG_096.jpg"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/mNeutral.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/gem.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/race.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/health.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/attack.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/rarity-common.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/title.png"} alt="" />
    </div>
    <div className="cardElement">
      <img src={"/images/card-assets/test-svg/bg-gvg.png"} alt="" />
    </div>
    <style>{`
    .cardElements {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      flex-wrap: wrap;
      flex-grow: 1;
      align-items: center;
      width: 100%;
      height: 100%;
      padding: 20px;
    }
    .cardElement {
      width: 33.3%;
      height: 33.3%;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .cardElement img {
      width: 100%;
    }
  `}</style>
  </div>
);
