import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { scenariosAPI } from '../../services/api';
import {
    AlertTriangle,
    CreditCard,
    Shield,
    FileWarning,
    MicOff,
    MoreHorizontal,
    ArrowRight
} from '../common/IconMap';

const iconMap = {
    'billing': CreditCard,
    'safety': Shield,
    'unfair-treatment': MicOff,
    'misinformation': FileWarning,
    'service': AlertTriangle,
    'general': MoreHorizontal
};

const colorMap = {
    'billing': 'var(--success-500)',
    'safety': '#ef4444',
    'unfair-treatment': 'var(--primary-500)',
    'misinformation': 'var(--accent-500)',
    'service': '#f59e0b',
    'general': 'var(--text-secondary)'
};

const SituationGrid = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchCategories();
    }, []);

    const fetchCategories = async () => {
        try {
            const response = await scenariosAPI.getCategories();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
            // Fallback to hardcoded categories if API fails
            setCategories([
                { id: 'billing', name: 'Billing Error', description: 'Overcharged or price discrepancy' },
                { id: 'safety', name: 'Public Safety', description: 'Hazard or unsafe situation' },
                { id: 'unfair-treatment', name: 'Unfair Treatment', description: 'Being ignored or treated poorly' },
                { id: 'misinformation', name: 'Wrong Information', description: 'Counter staff gave incorrect details' },
                { id: 'service', name: 'Service Problems', description: 'Poor service, unmet expectations' },
                { id: 'general', name: 'Other Situation', description: 'Describe your specific issue' }
            ]);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="scenarios-grid">
                {[...Array(6)].map((_, index) => (
                    <div key={index} className="glass" style={{ padding: 'var(--space-6)', minHeight: '200px' }}>
                        <div style={{ background: 'rgba(255,255,255,0.1)', borderRadius: '8px', height: '20px', marginBottom: '1rem' }} />
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '16px', marginBottom: '0.5rem' }} />
                        <div style={{ background: 'rgba(255,255,255,0.05)', borderRadius: '4px', height: '16px', width: '80%' }} />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="scenarios-grid">
            {categories.map((category, index) => {
                const IconComponent = iconMap[category.id] || MoreHorizontal;
                const color = colorMap[category.id] || 'var(--text-secondary)';
                
                return (
                    <motion.div
                        key={category.id}
                        className="glass card-hover"
                        onClick={() => navigate(`/scenarios?category=${category.id}`)}
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
                            <IconComponent size={28} color={color} />
                        </div>

                        <div>
                            <h3 style={{ fontSize: 'var(--font-size-lg)', marginBottom: '0.25rem' }}>
                                {category.name}
                            </h3>
                            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)' }}>
                                {category.description}
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
                );
            })}
        </div>
    );
};

export default SituationGrid;
