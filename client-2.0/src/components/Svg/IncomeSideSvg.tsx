import React from "react";

const IncomeSideSvg = ({height, width}:any) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="200 0 95 440"
      style={{
        shapeRendering: "geometricPrecision",
        textRendering: "geometricPrecision",
        imageRendering: "auto",
        fillRule: "evenodd",
        clipRule: "evenodd",
      }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        style={{
          opacity: 1,
          fill: "currentcolor",
        }}
        d="M 268.5,-0.5 C 271.167,-0.5 273.833,-0.5 276.5,-0.5C 334.742,28.287 393.075,57.1203 451.5,86C 453.393,88.9172 453.893,92.0838 453,95.5C 433.364,135.272 413.864,175.105 394.5,215C 409.387,223.262 418.554,235.762 422,252.5C 422.5,269.83 422.667,287.163 422.5,304.5C 432.689,307.861 438.856,314.861 441,325.5C 441.667,344.167 441.667,362.833 441,381.5C 438.927,391.651 433.094,398.651 423.5,402.5C 422.667,424.826 422.167,447.159 422,469.5C 417.547,491.784 404.381,505.784 382.5,511.5C 287.5,511.5 192.5,511.5 97.5,511.5C 76.5149,506.014 63.3483,492.681 58,471.5C 57.3333,398.167 57.3333,324.833 58,251.5C 60.4583,238.575 66.9583,228.242 77.5,220.5C 78.7292,207.201 84.7292,196.701 95.5,189C 101.931,186 108.431,183.5 115,181.5C 125.866,134.369 137.2,87.369 149,40.5C 150.853,38.4076 153.186,37.4076 156,37.5C 184.568,41.5095 213.068,45.8428 241.5,50.5C 250.766,33.6346 259.766,16.6346 268.5,-0.5 Z M 275.5,17.5 C 284.738,21.1185 293.738,25.2852 302.5,30C 292.127,42.875 279.127,47.0416 263.5,42.5C 267.784,34.2666 271.784,25.9333 275.5,17.5 Z M 316.5,36.5 C 342.597,49.0481 368.597,61.8815 394.5,75C 389.866,94.647 394.033,112.48 407,128.5C 410.167,131 413.333,133.5 416.5,136C 403.882,160.685 391.549,185.518 379.5,210.5C 374.631,210.689 369.631,210.689 364.5,210.5C 363.347,173.531 346.014,147.364 312.5,132C 276.015,119.579 244.182,127.079 217,154.5C 203.75,170.743 196.917,189.41 196.5,210.5C 191.456,210.827 186.456,210.494 181.5,209.5C 206.728,159.045 231.395,108.379 255.5,57.5C 280.764,64.1918 301.097,57.1918 316.5,36.5 Z M 160.5,53.5 C 170.461,55.1134 180.461,56.4468 190.5,57.5C 185.841,72.2721 175.674,80.2721 160,81.5C 157.855,81.604 156.021,80.9373 154.5,79.5C 157.132,70.9719 159.132,62.3053 160.5,53.5 Z M 205.5,60.5 C 215.586,61.3933 225.586,62.8933 235.5,65C 211.977,113.213 188.311,161.379 164.5,209.5C 150.846,210.666 137.179,210.833 123.5,210C 133.046,171.98 142.046,133.813 150.5,95.5C 174.124,98.9375 191.624,90.2708 203,69.5C 204.43,66.6473 205.263,63.6473 205.5,60.5 Z M 409.5,82.5 C 418.612,86.2223 427.279,90.7223 435.5,96C 431.558,104.719 427.224,113.219 422.5,121.5C 410.379,111.137 406.046,98.1366 409.5,82.5 Z M 269.5,141.5 C 310.433,138.953 336.599,157.287 348,196.5C 348.994,201.118 349.494,205.785 349.5,210.5C 340.143,210.832 330.81,210.498 321.5,209.5C 326.3,190.605 318.967,179.605 299.5,176.5C 291.687,176.823 285.52,180.156 281,186.5C 277.567,194.533 273.733,202.366 269.5,210C 264.167,210.667 258.833,210.667 253.5,210C 259.733,198.367 265.567,186.534 271,174.5C 271.541,164.4 267.207,161.733 258,166.5C 254.829,172.842 251.662,179.176 248.5,185.5C 243.511,182.755 238.345,180.422 233,178.5C 225.549,180.222 223.549,184.556 227,191.5C 231.812,194.485 236.645,197.318 241.5,200C 240.097,203.473 238.43,206.806 236.5,210C 228.173,210.5 219.84,210.666 211.5,210.5C 214.268,173.411 233.601,150.411 269.5,141.5 Z M 296.5,192.5 C 309.01,193.19 311.676,198.857 304.5,209.5C 298.528,210.664 292.528,210.83 286.5,210C 289.481,203.86 292.814,198.026 296.5,192.5 Z M 108.5,199.5 C 109.497,199.47 110.164,199.97 110.5,201C 109.434,204.094 108.768,207.26 108.5,210.5C 93.2556,215.51 91.5889,212.676 103.5,202C 105.315,201.243 106.981,200.41 108.5,199.5 Z M 104.5,225.5 C 196.531,225.015 288.531,225.515 380.5,227C 392.84,230.673 401.34,238.507 406,250.5C 407.428,267.786 407.928,285.119 407.5,302.5C 363.453,302.021 319.453,302.521 275.5,304C 264.346,308.829 258.179,317.329 257,329.5C 256.333,345.5 256.333,361.5 257,377.5C 258.843,391.675 266.677,400.508 280.5,404C 322.832,404.5 365.165,404.667 407.5,404.5C 407.5,421.5 407.5,438.5 407.5,455.5C 340.166,455.333 272.833,455.5 205.5,456C 199.347,460.252 199.014,464.919 204.5,470C 271.833,470.333 339.167,470.667 406.5,471C 401.965,484.203 392.965,492.537 379.5,496C 286.167,496.667 192.833,496.667 99.5,496C 85.5594,491.726 76.726,482.56 73,468.5C 72.5,400.501 72.3333,332.501 72.5,264.5C 137.501,264.667 202.501,264.5 267.5,264C 268.416,263.626 269.25,263.126 270,262.5C 271.483,259.298 271.817,255.964 271,252.5C 270.097,251.299 268.931,250.465 267.5,250C 203.164,249.833 138.831,249.333 74.5,248.5C 80.4799,235.512 90.4799,227.846 104.5,225.5 Z M 282.5,317.5 C 327.168,317.333 371.835,317.5 416.5,318C 421,319.833 424.167,323 426,327.5C 426.959,345.566 426.626,363.566 425,381.5C 423.01,385.49 419.843,387.99 415.5,389C 371.167,389.667 326.833,389.667 282.5,389C 278.173,387.427 275.007,384.593 273,380.5C 271,362.5 271,344.5 273,326.5C 274.775,321.888 277.942,318.888 282.5,317.5 Z M 303.5,342.5 C 315.615,341.442 320.449,346.776 318,358.5C 313.313,364.935 307.479,366.102 300.5,362C 294.586,354.409 295.586,347.909 303.5,342.5 Z"
      />
      <g />
    </svg>
  );
};

export default IncomeSideSvg;