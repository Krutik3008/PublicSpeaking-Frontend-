import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import AnimatedBackground from '../components/common/AnimatedBackground';
import AnxietySlider from '../components/features/AnxietySlider';
import { Shield } from '../components/common/IconMap';

const AnxietyCheck = () => {
    const navigate = useNavigate();

    const handleAnalysis = (level) => {
        if (level >= 8) {
            // High Anxiety -> Breathing Exercise
            navigate('/tools?feature=breathing&autoStart=true');
        } else if (level >= 5) {
            // Medium Anxiety -> Confidence Booster
            navigate('/tools?feature=booster&autoStart=true');
        } else {
            // Low Anxiety -> Direct to Scenarios (Script Gen)
            navigate('/scenarios');
        }
    };

    return (
        <div style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '2rem',
            position: 'relative'
        }}>
            <AnimatedBackground />

            <motion.div
                className="glass"
                style={{
                    width: '100%',
                    maxWidth: '600px',
                    padding: '3rem 2rem',
                    position: 'relative',
                    zIndex: 10
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <div style={{
                        display: 'inline-flex',
                        padding: '1rem',
                        borderRadius: '50%',
                        background: 'rgba(99, 102, 241, 0.1)',
                        marginBottom: '1.5rem'
                    }}>
                        <Shield size={32} color="var(--primary-400)" />
                    </div>
                    <h1 style={{ marginBottom: '1rem', fontSize: '2.5rem' }}>Current Vibe Check</h1>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '1.1rem' }}>
                        Knowing how you feel is the first step. <br />
                        We'll adapt the experience to match your needs.
                    </p>
                </div>

                <AnxietySlider onComplete={handleAnalysis} />
            </motion.div>
        </div>
    );
};

export default AnxietyCheck;
