import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Wind, Play, Square } from '../common/IconMap';

const BreathingExercise = () => {
    const [isActive, setIsActive] = useState(false);
    const [phase, setPhase] = useState('ready'); // ready, inhale, hold, exhale
    const [countdown, setCountdown] = useState(0);
    const [cycles, setCycles] = useState(0);

    const phases = {
        inhale: { duration: 4, next: 'hold', instruction: 'Breathe In', color: '#667eea' },
        hold: { duration: 4, next: 'exhale', instruction: 'Hold', color: '#ed8936' },
        exhale: { duration: 6, next: 'inhale', instruction: 'Breathe Out', color: '#48bb78' }
    };

    const startExercise = useCallback(() => {
        setIsActive(true);
        setCycles(0);
        setPhase('inhale');
        setCountdown(phases.inhale.duration);
    }, []);

    const stopExercise = useCallback(() => {
        setIsActive(false);
        setPhase('ready');
        setCountdown(0);
    }, []);

    useEffect(() => {
        let timer;
        if (isActive && countdown > 0) {
            timer = setTimeout(() => setCountdown(countdown - 1), 1000);
        } else if (isActive && countdown === 0 && phase !== 'ready') {
            const currentPhase = phases[phase];
            const nextPhase = currentPhase.next;

            if (nextPhase === 'inhale') {
                setCycles(c => c + 1);
                if (cycles >= 2) {
                    stopExercise();
                    return;
                }
            }

            setPhase(nextPhase);
            setCountdown(phases[nextPhase].duration);
        }
        return () => clearTimeout(timer);
    }, [isActive, countdown, phase, cycles, stopExercise]);

    const getCircleScale = () => {
        if (phase === 'inhale') return 1 + ((phases.inhale.duration - countdown) / phases.inhale.duration) * 0.5;
        if (phase === 'hold') return 1.5;
        if (phase === 'exhale') return 1.5 - ((phases.exhale.duration - countdown) / phases.exhale.duration) * 0.5;
        return 1;
    };

    return (
        <motion.div
            className="glass"
            style={{
                width: '100%',
                padding: 'var(--space-8)',
                textAlign: 'center'
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
        >
            <h3 style={{ marginBottom: 'var(--space-2)', fontSize: 'var(--font-size-xl)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <Wind size={24} />
                Calm Your Nerves First
            </h3>
            <p style={{ opacity: 0.9, marginBottom: 'var(--space-6)' }}>
                Take a moment to breathe before speaking up
            </p>

            {/* Breathing Circle */}
            <div style={{
                width: '150px',
                height: '150px',
                margin: '0 auto var(--space-6)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
            }}>
                <motion.div
                    style={{
                        width: '100px',
                        height: '100px',
                        borderRadius: '50%',
                        background: phase !== 'ready' ? phases[phase]?.color : 'rgba(255,255,255,0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        boxShadow: '0 0 30px rgba(255,255,255,0.3)'
                    }}
                    animate={{ scale: getCircleScale() }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {isActive ? (
                        <div>
                            <motion.div
                                style={{ fontSize: '2rem', fontWeight: '700' }}
                                key={countdown}
                                initial={{ scale: 1.2, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ duration: 0.2 }}
                            >
                                {countdown}
                            </motion.div>
                            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>
                                {phases[phase]?.instruction}
                            </div>
                        </div>
                    ) : (
                        <Wind size={40} strokeWidth={1.5} />
                    )}
                </motion.div>
            </div>

            {/* Controls */}
            {!isActive ? (
                <motion.button
                    onClick={startExercise}
                    className="btn btn-primary"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                >
                    <Play size={18} />
                    Start Breathing Exercise
                </motion.button>
            ) : (
                <div>
                    <p style={{ marginBottom: 'var(--space-4)', opacity: 0.9 }}>
                        Cycle {cycles + 1} of 3
                    </p>
                    <motion.button
                        onClick={stopExercise}
                        className="btn btn-secondary"
                        style={{ background: 'transparent', border: '2px solid white', color: 'white', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Square size={16} fill="white" />
                        Stop
                    </motion.button>
                </div>
            )}
        </motion.div>
    );
};

export default BreathingExercise;
