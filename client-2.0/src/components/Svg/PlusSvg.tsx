import React from "react";

const PlusSvg = ({ width = 20, height = 18 }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 1024 1024"
      xmlns="http://www.w3.org/2000/svg"
      className="fill-form-strokedark dark:fill-white"
    >
      <path d="M512 0C229.232 0 0 229.232 0 512c0 282.784 229.232 512 512 512 282.784 0 512-229.216 512-512C1024 229.232 794.784 0 512 0zm0 961.008c-247.024 0-448-201.984-448-449.01 0-247.024 200.976-448 448-448s448 200.977 448 448-200.976 449.01-448 449.01zM736 480H544V288c0-17.664-14.336-32-32-32s-32 14.336-32 32v192H288c-17.664 0-32 14.336-32 32s14.336 32 32 32h192v192c0 17.664 14.336 32 32 32s32-14.336 32-32V544h192c17.664 0 32-14.336 32-32s-14.336-32-32-32z" />
    </svg>
  );
};

export default PlusSvg;
