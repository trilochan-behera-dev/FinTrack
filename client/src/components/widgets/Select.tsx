import Dropdown from "../SVG/Dropdown"

export default function Select({ className, onChange, options, selectedData }: any) {

    return (
        <>

            <select
                className={className}
                onChange={onChange}
            >
                {options.map((op: any) => (
                    <option value={op} selected={selectedData?.categoryType === op} className="capitalize" >{op}</option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 z-10 -translate-y-1/2">
                <Dropdown />
            </span>

        </>
    )
}