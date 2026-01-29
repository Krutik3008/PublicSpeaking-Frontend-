const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    icon = false,
    className = '',
    disabled = false,
    onClick,
    type = 'button',
    ...props
}) => {
    const classes = [
        'btn',
        `btn-${variant}`,
        size !== 'md' && `btn-${size}`,
        icon && 'btn-icon',
        className
    ].filter(Boolean).join(' ');

    return (
        <button
            type={type}
            className={classes}
            disabled={disabled}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};

export default Button;
