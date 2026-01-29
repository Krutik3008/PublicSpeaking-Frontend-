import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Shield, Wind, ArrowLeft } from '../components/common/IconMap';

const Emergency = () => {
    const navigate = useNavigate();
    const [breathingStep, setBreathingStep] = useState('Inhale');

    // 4-4-4 Breathing Logic
    useEffect(() => {
        const interval = setInterval(() => {
            setBreathingStep(prev => {
                if (prev === 'Inhale') return 'Hold';
                if (prev === 'Hold') return 'Exhale';
                return 'Inhale';
            });
        }, 4000);
        return () => clearInterval(interval);
    }, []);

    const emergencyScripts = [
        "I’m going to need a moment to process this.",
        "Could you please repeat that? I want to make sure I understand.",
        "I’m not comfortable with this.",
        "Let’s take a step back.",
        "I need to speak with a manager, please."
    ];

    return (
        <div style={{
            minHeight: '100vh',
            background: '#111827',
            color: 'white',
            padding: '2rem',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            position: 'relative'
        }}>
            <button
                onClick={() => navigate(-1)}
                style={{
                    position: 'absolute',
                    top: '1rem',
                    left: '1rem',
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    cursor: 'pointer'
                }}
            >
                <ArrowLeft /> Back
            </button>

            <div style={{
                background: '#ef4444',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                marginBottom: '2rem',
                fontWeight: 'bold'
            }}>
                <Shield size={20} fill="white" />
                EMERGENCY MODE
            </div>

            {/* Breathing Interaction */}
            <motion.div
                animate={{
                    scale: breathingStep === 'Inhale' ? 1.5 : breathingStep === 'Hold' ? 1.5 : 1,
                    opacity: breathingStep === 'Hold' ? 0.8 : 1
                }}
                transition={{ duration: 4 }}
                style={{
                    width: '120px',
                    height: '120px',
                    borderRadius: '50%',
                    background: 'rgba(56, 189, 248, 0.3)',
                    border: '2px solid #38bdf8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '3rem'
                }}
            >
                <div style={{ textAlign: 'center' }}>
                    <Wind size={24} style={{ marginBottom: '0.25rem' }} />
                    <div style={{ fontWeight: 'bold' }}>{breathingStep}</div>
                </div>
            </motion.div>

            {/* One-Liner Scripts */}
            <div style={{ width: '100%', maxWidth: '500px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <h2 style={{ fontSize: '1.25rem', textAlign: 'center', marginBottom: '1rem' }}>Instant Scripts</h2>
                {emergencyScripts.map((script, idx) => (
                    <div
                        key={idx}
                        style={{
                            background: 'rgba(255,255,255,0.1)',
                            padding: '1rem',
                            borderRadius: '0.75rem',
                            fontSize: '1.1rem',
                            textAlign: 'center',
                            cursor: 'pointer',
                            border: '1px solid rgba(255,255,255,0.1)'
                        }}
                        onClick={() => navigator.clipboard.writeText(script)}
                    >
                        "{script}"
                    </div>
                ))}
            </div>

            <div style={{ marginTop: 'auto', textAlign: 'center', color: '#9ca3af', fontSize: '0.9rem' }}>
                <p>Stand tall. Shoulders back. You are safe.</p>
            </div>
        </div>
    );
};

export default Emergency;
