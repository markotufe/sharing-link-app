"use client";

import React from "react";
import Icon, { IconKey } from "./ui/Icon";
import { v4 as uuidv4 } from "uuid";
import { Link, Rectangle } from "@/types/link-store";

type RectangleWithTextProps = {
  data: Rectangle;
};

const RectangleWithText = ({ data }: RectangleWithTextProps) => {
  if (!data.text)
    return (
      <rect
        key={uuidv4()}
        width={237}
        height={44}
        x={35}
        y={data.y}
        fill="#EEEE"
        rx={8}
      />
    );

  return (
    <a href={data.href} target="_blank" rel="noopener noreferrer">
      <g>
        <rect
          x={data.x}
          y={data.y}
          width={data.width}
          height={data.height}
          fill={data.fill}
          rx={8}
        />
        <Icon
          name={data.icon as IconKey}
          y={data.y + 13}
          x={data.x + 16}
          fill="#ffff"
        />
        <text
          x={data.x + 45}
          y={data.y + data.height / 2}
          dominantBaseline="middle"
          textAnchor="start"
          fill="white"
          fontSize="16"
        >
          {data.text}
        </text>
      </g>
    </a>
  );
};

type CircleWithImageProps = {
  imageUrl: string;
  circleRadius: number;
  borderWidth: number;
};

const CircleWithImage = ({
  imageUrl,
  circleRadius,
  borderWidth
}: CircleWithImageProps) => {
  const cx = 153.5;
  const cy = 112;

  return (
    <g>
      <circle
        cx={cx}
        cy={cy}
        r={circleRadius - borderWidth / 2}
        fill="none"
        stroke="#633CFF"
        strokeWidth={borderWidth}
      />

      <defs>
        <clipPath id="circleClip">
          <circle cx={cx} cy={cy} r={circleRadius - borderWidth} />
        </clipPath>
      </defs>

      <image
        href={imageUrl}
        x={cx - circleRadius + borderWidth}
        y={cy - circleRadius + borderWidth}
        width={2 * (circleRadius - borderWidth)}
        height={2 * (circleRadius - borderWidth)}
        clipPath="url(#circleClip)"
        preserveAspectRatio="xMidYMid slice"
      />
    </g>
  );
};

type MobileMockupProps = {
  imageUrl: string;
  userData: {
    email: string;
    firstName: string;
    lastName: string;
  };
  links: Link[];
};

const MobileMockup = ({ imageUrl, userData, links }: MobileMockupProps) => {
  const renderPlaceholder = (index: number) => (
    <rect
      key={uuidv4()}
      width={237}
      height={44}
      x={35}
      y={278 + index * 64}
      fill="#EEEE"
      rx={8}
    />
  );

  const renderedRectangles = links.map((link) => (
    <RectangleWithText key={link.id} data={link.rectangle} />
  ));

  const placeholdersCount = Math.max(5 - links.length, 0);
  const renderedPlaceholders = [...Array(placeholdersCount).keys()].map(
    (_, index) => renderPlaceholder(index + links.length)
  );

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={308}
      height={632}
      fill="none"
    >
      <path
        stroke="#737373"
        d="M1 54.5C1 24.953 24.953 1 54.5 1h199C283.047 1 307 24.953 307 54.5v523c0 29.547-23.953 53.5-53.5 53.5h-199C24.953 631 1 607.047 1 577.5v-523Z"
      />
      <path
        fill="#fff"
        stroke="#737373"
        d="M12 55.5C12 30.923 31.923 11 56.5 11h24C86.851 11 92 16.149 92 22.5c0 8.008 6.492 14.5 14.5 14.5h95c8.008 0 14.5-6.492 14.5-14.5 0-6.351 5.149-11.5 11.5-11.5h24c24.577 0 44.5 19.923 44.5 44.5v521c0 24.577-19.923 44.5-44.5 44.5h-195C31.923 621 12 601.077 12 576.5v-521Z"
      />

      {imageUrl ? (
        <CircleWithImage
          imageUrl={imageUrl}
          circleRadius={50}
          borderWidth={4}
        />
      ) : (
        <circle cx={153.5} cy={112} r={48} fill="#EEE" />
      )}

      {userData?.firstName || userData?.lastName ? (
        <g>
          <text
            x="50%"
            y={198}
            fontSize="18"
            fontWeight="bold"
            fill="#333333"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {userData.firstName} {userData?.lastName}
          </text>
        </g>
      ) : (
        <rect width={160} height={16} x={73.5} y={185} fill="#EEE" rx={8} />
      )}

      {userData?.email ? (
        <g>
          <text
            x="50%"
            y={222}
            fontSize="14"
            fill="#737373"
            dominantBaseline="middle"
            textAnchor="middle"
          >
            {userData.email}
          </text>
        </g>
      ) : (
        <rect width={72} height={8} x={117.5} y={214} fill="#EEE" rx={4} />
      )}

      {renderedPlaceholders}
      {renderedRectangles}
    </svg>
  );
};

export default MobileMockup;
