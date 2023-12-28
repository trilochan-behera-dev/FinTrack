import * as React from "react"
const Dropdown = ({ height = 18, weight = 18, color = "#8e8e8e" }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={height}
        height={weight}
        fill={color}
        viewBox="0 0 20 20"
    >
        <path
            fill="#637381"
            d="M5.293 8.293a1 1 0 0 1 1.414 0L12 13.586l5.293-5.293a1 1 0 1 1 1.414 1.414l-6 6a1 1 0 0 1-1.414 0l-6-6a1 1 0 0 1 0-1.414Z"
            opacity={0.8}
        />
    </svg>
)
export default Dropdown
