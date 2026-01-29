import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
    AlertTriangle,
    CreditCard,
    Shield,
    FileWarning,
    MicOff,
    MoreHorizontal,
    ArrowRight
} from '../common/IconMap';

const situations = [
    {
        id: 'misinformation', // Changed from wrong-info
        icon: FileWarning,
        title: "Wrong Information",
        desc: "Counter staff gave incorrect details",
        color: "var(--accent-500)"
    },
    {
        id: 'unfair-treatment',
        icon: MicOff,
        title: "Unfair Treatment",
        desc: "Being ignored or treated poorly",
        color: "var(--primary-500)"
    },
    {
        id: 'billing', // Changed from billing-error
        icon: CreditCard,
        title: "Billing Error",
        desc: "Overcharged or price discrepancy",
        color: "var(--success-500)"
    },
    {
        id: 'safety', // Changed from safety-concern
        icon: Shield,
        title: "Public Safety",
        desc: "Hazard or unsafe situation",
        color: "#ef4444" // Red for safety
    },
    {
        id: 'misinformation', // merged with wrong-info, or 'misinformation' is the backend cat
        icon: AlertTriangle,
        title: "Bad Announcement",
        desc: "Misleading public information",
        color: "#f59e0b" // Amber/Orange
    },
    {
        id: 'general', // Changed from other
        icon: MoreHorizontal,
        title: "Other Situation",
        desc: "Describe your specific issue",
        color: "var(--text-secondary)"
    }
];

const SituationGrid = () => {
    const navigate = useNavigate();

    return (
        <div className="scenarios-grid">
            {situations.map((item, index) => (
                <motion.div
                    key={item.id}
                    className="glass card-hover"
                    onClick={() => navigate(`/scenarios?category=${item.id}`)}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{
                        padding: 'var(--space-6)',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'flex-start',
                        gap: 'var(--space-4)',
                        cursor: 'pointer',
                        border: '1px solid rgba(255, 255, 255, 0.05)'
                    }}
                >
                    <div style={{
                        background: `rgba(255, 255, 255, 0.05)`,
                        padding: 'var(--space-3)',
                        borderRadius: 'var(--radius-lg)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}>
                        <item.icon size={28} color={item.color} />
                    </div>

                    <div>
                        <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: '0.25rem' }}>
                            {item.title}
                        </h3>
                        <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                            {item.desc}
                        </p>
                    </div>

                    <div style={{
                        marginTop: 'auto',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--text-secondary)',
                        fontWeight: '500'
                    }}>
                        Get Script <ArrowRight size={14} />
                    </div>
                </motion.div>
            ))}
        </div>
    );
};

export default SituationGrid;
