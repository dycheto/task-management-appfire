export default function Button({
    className,
    title,
    handleClick
}) {

    return (
        <button className={className} onClick={handleClick}>
            {title} 
        </button>
    );
};