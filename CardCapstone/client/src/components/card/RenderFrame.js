import React from "react";
import { Parser } from "html-to-react";

import belwe from "../../static/BelweBoldBT.ttf";
import belweMed from "../../static/BelweMediumBT.ttf";

const parser = new Parser();

export const RenderFrame = ({ children }) => (
  <svg style={{ width: "100%", height: "100%" }} viewBox="0 0 751 1041">
    <defs>
      <clipPath id="image-clip-path">
        <ellipse id="card-clip" cx="390.5" cy="376.5" rx="217.5" ry="309" />
      </clipPath>
    </defs>
    <g
      id="Page-1"
      stroke="none"
      strokeWidth="1"
      fill="none"
      fillRule="evenodd"
      type="MSPage"
    >
      <g
        id="Card"
        type="MSLayerGroup"
        transform="translate(-14.000000, -59.000000)"
      >
        {/*
      Rendering order is important.
      If we don't put Frame first, then it will not let us see the elements that are behind it.
      Order should always be: Image, Frame, Cost, Race, Health, Strength, Rarity, Title, Set and Text.
      We can solve this in different ways:
      * Put them in the correct place. This is what we are doing right now because it's the simplest option.
      * Use z-index
      * Reorder children by type
    */}
        {children}
      </g>
    </g>
    <style>{`
  @font-face {
    font-family: 'Belwe';
    src: url(${belwe}) format('truetype');

  }
`}</style>
  </svg>
);

export const Frame = () => (
  <image
    id="mNeutral"
    type="MSBitmapLayer"
    x="57"
    y="0"
    width="663"
    height="760"
    href={"/images/card-assets/svg/pFrame.webp"}
  />
);

export const Image = ({ id, clip }) => (
  <image
    id=""
    type="MSBitmapLayer"
    x="117"
    y="101"
    width="563"
    height="563"
    href={id}
    clipPath={clip && "url(#image-clip-path)"}
  />
);

export const Strength = ({ children, fontFamily }) => (
  <g id="Attack" transform="translate(0.000000, 862.000000)">
    <image
      id="attack"
      type="MSBitmapLayer"
      x="150"
      y="-375"
      width="175"
      height="250"
      href={"/images/card-assets/svg/attack.png"}
    />
    {children && (
      <text
        id="value"
        stroke="#000000"
        strokeWidth="13px"
        fill="#D8D8D8"
        type="MSTextLayer"
        fontFamily={fontFamily || "sans-serif"}
        paintOrder="stroke"
        fontSize="130"
        fontWeight="400"
        alignment="middle"
      >
        <tspan x="220" y="-205" fill="#FFF">
          {children}
        </tspan>
      </text>
    )}
  </g>
);

export const Health = ({ children, fontFamily }) => (
  <g id="Health" transform="translate(598.000000, 882.000000)">
    <image
      id="health"
      type="MSBitmapLayer"
      x="-125"
      y="-400"
      width="125"
      height="250"
      href={"/images/card-assets/svg/health.png"}
    />
    {children && (
      <text
        id="value"
        stroke="#000000"
        strokeWidth="13px"
        fill="#D8D8D8"
        type="MSTextLayer"
        fontFamily={fontFamily || "sans-serif"}
        paintOrder="stroke"
        fontSize="130"
        fontWeight="400"
        alignment="middle"
      >
        <tspan x="-85" y="-230" fill="#FFF">
          {children}
        </tspan>
      </text>
    )}
  </g>
);
