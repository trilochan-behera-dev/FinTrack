import Dropdown from "../Svg/Dropdown"

export default function Select({ className, onChange, options, selectedData }: any) {

    return (
        <>

            <select
                className={className}
                onChange={onChange}
            >
                {options.map((op: any, i:any) => (
                    <option value={op} selected={selectedData?.categoryType === op} className="capitalize" key={i}>{op}</option>
                ))}
            </select>
            <span className="absolute top-1/2 right-4 -translate-y-1/2">
                <Dropdown />
            </span>

        </>
    )
}