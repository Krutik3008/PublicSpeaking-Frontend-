import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toolsAPI } from '../../services/api';
import {
    Zap,
    Mic,
    Users,
    Sparkles,
    Wind,
    Megaphone,
    Rocket,
    Wrench,
    TrendingUp,
    Award,
    RefreshCw
} from '../common/IconMap';

const ConfidenceBooster = () => {
    const [currentAffirmation, setCurrentAffirmation] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const [affirmations, setAffirmations] = useState([]);
    const [loading, setLoading] = useState(true);

    const iconMap = {
        Zap, Mic, Users, Sparkles, Wind,
        Megaphone, Rocket, Wrench, TrendingUp, Award
    };

    useEffect(() => {
        const fetchAffirmations = async () => {
            try {
                const response = await toolsAPI.getAffirmations();
                setAffirmations(response.data.data);
            } catch (error) {
                console.error('Error fetching affirmations:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAffirmations();
    }, []);

    const nextAffirmation = () => {
        if (affirmations.length === 0) return;
        setIsAnimating(true);
        setTimeout(() => {
            setCurrentAffirmation((prev) => (prev + 1) % affirmations.length);
            setIsAnimating(false);
        }, 300);
    };

    useEffect(() => {
        if (affirmations.length > 0) {
            const interval = setInterval(nextAffirmation, 5000);
            return () => clearInterval(interval);
        }
    }, [affirmations]);

    if (loading) return <div>Loading...</div>;
    if (affirmations.length === 0) return <div>No affirmations loaded.</div>;

    const currentItem = affirmations[currentAffirmation];
    const CurrentIcon = iconMap[currentItem.icon] || Sparkles;

    return (
        <motion.div
            className="glass"
            style={{
                width: '100%',
                padding: 'var(--space-8)',
                textAlign: 'center',
                cursor: 'pointer'
            }}
            onClick={nextAffirmation}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <div style={{ fontSize: '0.875rem', color: 'var(--primary-600)', marginBottom: 'var(--space-4)', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Sparkles size={16} />
                CONFIDENCE BOOSTER
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={currentAffirmation}
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        margin: '0 auto var(--space-6)',
                        width: '160px',
                        height: '175px',
                        borderRadius: '50%',
                        background: 'var(--gradient-primary)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }}
                >
                    <CurrentIcon size={64} color="white" strokeWidth={1.5} />
                </motion.div>
            </AnimatePresence>

            <AnimatePresence mode="wait">
                <motion.p
                    key={currentAffirmation}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.3 }}
                    style={{
                        fontSize: 'var(--font-size-xl)',
                        fontWeight: '600',
                        color: 'white',
                        marginBottom: 'var(--space-4)'
                    }}
                >
                    "{currentItem.text}"
                </motion.p>
            </AnimatePresence>

            <p style={{ fontSize: 'var(--font-size-sm)', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <RefreshCw size={14} />
                Click for another boost • {currentAffirmation + 1}/{affirmations.length}
            </p>
        </motion.div>
    );
};

export default ConfidenceBooster;
