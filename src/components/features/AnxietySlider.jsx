import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Smile,
    Meh,
    Frown,
    AlertCircle,
    ArrowRight
} from '../common/IconMap';

const AnxietySlider = ({ onComplete }) => {
    const [level, setLevel] = useState(5);

    const getAnalysis = (val) => {
        if (val <= 4) return { text: "You've got this! Let's get straight to the point.", color: "var(--success-500)", icon: Smile };
        if (val <= 7) return { text: "It's normal to feel nervous. We'll take it slow.", color: "var(--primary-500)", icon: Meh };
        return { text: "Deep breaths. We'll focus on staying calm first.", color: "#ef4444", icon: AlertCircle };
    };

    const analysis = getAnalysis(level);
    const StatusIcon = analysis.icon;

    return (
        <div style={{ textAlign: 'center', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                key={level}
                style={{ marginBottom: '2rem' }}
            >
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: `rgba(255,255,255,0.05)`,
                    border: `2px solid ${analysis.color}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1rem',
                    boxShadow: `0 0 20px ${analysis.color}40`
                }}>
                    <StatusIcon size={40} color={analysis.color} />
                </div>
                <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '0.5rem' }}>
                    {level}/10
                </h3>
                <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                    {analysis.text}
                </p>
            </motion.div>

            <div style={{ marginBottom: '3rem', padding: '0 1rem' }}>
                <input
                    type="range"
                    min="1"
                    max="10"
                    value={level}
                    onChange={(e) => setLevel(parseInt(e.target.value))}
                    style={{
                        width: '100%',
                        height: '8px',
                        background: 'rgba(255,255,255,0.1)',
                        borderRadius: '4px',
                        outline: 'none',
                        cursor: 'pointer',
                        accentColor: analysis.color
                    }}
                />
                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.5rem', color: 'var(--text-muted)', fontSize: '0.875rem' }}>
                    <span>Calm</span>
                    <span>Anxious</span>
                    <span>Panicked</span>
                </div>
            </div>

            <motion.button
                className="btn btn-primary btn-lg"
                onClick={() => onComplete(level)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{ width: '100%' }}
            >
                Get My Personal Plan
                <ArrowRight size={20} />
            </motion.button>
        </div>
    );
};

export default AnxietySlider;
