import * as React from "react"
const UploadSvg = ({ color }: any) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={16}
        height={16}
        fill="none"
    >
        <path
            fill={color}
            d="M2 9.333c.368 0 .666.299.666.667v2.667a.667.667 0 0 0 .667.666h9.333a.667.667 0 0 0 .667-.666V10a.667.667 0 0 1 1.333 0v2.667a2 2 0 0 1-2 2H3.333a2 2 0 0 1-2-2V10c0-.368.298-.667.667-.667ZM7.529 1.529c.26-.26.682-.26.942 0l3.334 3.333a.667.667 0 1 1-.943.943L8 2.943 5.138 5.805a.667.667 0 1 1-.943-.943L7.53 1.529Z"
        />
        <path
            fill={color}
            d="M8 1.333c.368 0 .666.299.666.667v8a.667.667 0 1 1-1.333 0V2c0-.368.298-.667.667-.667Z"
        />
    </svg>
)
export default UploadSvg
