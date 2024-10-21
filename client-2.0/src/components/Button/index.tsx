import ButtonLoader from "../Loader/ButtonLoader";

export default function Button({ ...props }) {
    return (
        <button
            className={props.className || `tablet-xl:h-[38px] tablet:h-[26px] rounded-full tablet:font-extrabold tablet-lg:font-bold w-full tablet:py-4 flex justify-between items-center ${props.extraClassName}`
            }
            data-testid="button"
            onClick={props.handleClick}
            disabled={props.loading}
            id={props?.id || props?.label?.split(" ")?.join("_")}
            type={props?.type}
        >
            {props.loading ? (
                props?.loader || <ButtonLoader />
            ) : (
                <>
                    {props.icon}
                    <span className={props.icon ? `${props.lableClass} ml-2` : "w-full"}>{props.label}</span>
                </>
            )}
        </button>
    );
}
