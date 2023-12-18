import * as React from "react"
const Plus = ({ height = 600, weight = 600, color = "#8e8e8e" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={weight}
        height={height}
        fill={color}
        viewBox="0 0 24 24"
    >
        <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={3}
            d="M4 12h16m-8-8v16"
        />
    </svg>
)
export default Plus
