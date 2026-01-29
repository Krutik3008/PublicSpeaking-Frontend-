import { motion } from 'framer-motion';
import { getIcon } from './IconMap';

const Card = ({
    children,
    className = '',
    onClick,
    icon,
    title,
    description,
    badge,
    delay = 0,
    ...props
}) => {
    const classes = ['card', className, onClick && 'scenario-card'].filter(Boolean).join(' ');

    // Check if icon is a string (emoji) and convert to Lucide icon
    const renderIcon = () => {
        if (!icon) return null;

        // If icon is a React element, render it directly
        if (typeof icon === 'object') {
            return <div className="card-icon">{icon}</div>;
        }

        // Try to get Lucide icon from the map
        const lucideIcon = getIcon(icon, { size: 40, strokeWidth: 1.5 });
        if (lucideIcon) {
            return (
                <motion.div
                    className="card-icon icon-wrapper gradient"
                    style={{ width: '64px', height: '64px', marginBottom: 'var(--space-4)' }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 400 }}
                >
                    {lucideIcon}
                </motion.div>
            );
        }

        // Fallback to emoji if no icon found
        return <div className="card-icon">{icon}</div>;
    };

    // If icon, title, description provided, render structured card
    if (icon || title) {
        return (
            <motion.div
                className={classes}
                onClick={onClick}
                {...props}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay }}
                whileHover={{
                    y: -8,
                    boxShadow: "0 20px 40px -10px rgba(102, 126, 234, 0.25)"
                }}
            >
                {renderIcon()}
                {title && <h3 className="card-title">{title}</h3>}
                {description && <p className="card-description">{description}</p>}
                {badge && <span className="card-badge">{badge}</span>}
                {children}
            </motion.div>
        );
    }

    // Otherwise render children directly
    return (
        <motion.div
            className={classes}
            onClick={onClick}
            {...props}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay }}
            whileHover={{ y: -8 }}
        >
            {children}
        </motion.div>
    );
};

export default Card;
