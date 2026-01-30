import { motion, useInView } from 'framer-motion';
import { useRef, useEffect, useState } from 'react';
import BreathingExercise from '../components/features/BreathingExercise';
import ConfidenceBooster from '../components/features/ConfidenceBooster';
import QuickPhrases from '../components/features/QuickPhrases';
import PracticeMode from '../components/features/PracticeMode';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { toolsAPI } from '../services/api';
import { Wrench, Heart, Zap, Shield, Sparkles } from '../components/common/IconMap';

// Animated Counter Component
const Counter = ({ value, label, icon: Icon }) => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const [count, setCount] = useState(0);
    const target = parseInt(value.toString().replace(/\D/g, ''));
    const suffix = value.toString().replace(/[0-9]/g, '');

    useEffect(() => {
        if (isInView) {
            let start = 0;
            const duration = 2000;
            const increment = target / (duration / 16);

            const timer = setInterval(() => {
                start += increment;
                if (start >= target) {
                    setCount(target);
                    clearInterval(timer);
                } else {
                    setCount(Math.floor(start));
                }
            }, 16);
            return () => clearInterval(timer);
        }
    }, [isInView, target]);

    return (
        <motion.div
            ref={ref}
            className="glass"
            style={{
                padding: '1.5rem',
                borderRadius: '1rem',
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '0.5rem'
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ type: "spring", stiffness: 200 }}
            whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(99, 102, 241, 0.2)' }}
        >
            <div style={{
                background: 'var(--gradient-primary)',
                padding: '0.75rem',
                borderRadius: '50%',
                marginBottom: '0.5rem',
                color: 'white'
            }}>
                <Icon size={24} />
            </div>
            <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)' }}>
                {count}{suffix}
            </div>
            <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                {label}
            </div>
        </motion.div>
    );
};

const Tools = () => {
    const [toolsStats, setToolsStats] = useState({
        totalPhrases: 0,
        totalAffirmations: 0,
        totalScripts: 0
    });

    useEffect(() => {
        fetchToolsStats();
    }, []);

    const fetchToolsStats = async () => {
        try {
            const [phrasesRes, affirmationsRes, scriptsRes] = await Promise.all([
                toolsAPI.getPhrases(),
                toolsAPI.getAffirmations(),
                toolsAPI.getScripts()
            ]);

            setToolsStats({
                totalPhrases: phrasesRes.data.count || 0,
                totalAffirmations: affirmationsRes.data.count || 0,
                totalScripts: scriptsRes.data.count || 0
            });
        } catch (error) {
            console.error('Error fetching tools stats:', error);
            // Use fallback stats
            setToolsStats({
                totalPhrases: 4,
                totalAffirmations: 4,
                totalScripts: 1
            });
        }
    };

    const totalTools = 4; // Fixed number of tool components
    const totalPhrases = toolsStats.totalPhrases + toolsStats.totalAffirmations;

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <AnimatedBackground />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.2, type: "spring" }}
                        style={{ display: 'inline-flex', marginBottom: '1rem' }}
                    >
                        <span className="hero-badge">
                            <Wrench size={16} />
                            Practice & Prepare
                        </span>
                    </motion.div>

                    <h1 className="section-title">
                        Confidence <span className="text-gradient">Tools</span>
                    </h1>
                    <p className="section-subtitle">
                        Everything you need to prepare yourself before speaking up.
                        Practice here so you're ready when it happens.
                    </p>
                </motion.div>

                {/* Animated Counters */}
                <div className="tools-counters" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(45%, 150px), 1fr))',
                    gap: '1rem',
                    marginBottom: '3rem',
                    maxWidth: '1000px',
                    margin: '0 auto 3rem auto'
                }}>
                    <Counter value={totalTools} label="Power Tools" icon={Wrench} />
                    <Counter
                        value={totalPhrases > 0 ? `${totalPhrases}+` : '8+'}
                        label="Practice Phrases"
                        icon={Sparkles}
                    />
                    <Counter value="2min" label="Calm Down Time" icon={Heart} />
                    <Counter value="100%" label="Confidence Boost" icon={Zap} />
                </div>

                {/* Tools Grid */}
                <div className="tools-grid" style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 400px), 1fr))',
                    gap: '2rem',
                    marginBottom: '4rem'
                }}>
                    {/* Breathing Exercise */}
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        <BreathingExercise />
                    </motion.div>

                    {/* Confidence Booster */}
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        <ConfidenceBooster />
                    </motion.div>
                </div>

                {/* Quick Phrases */}
                <motion.div
                    style={{ marginBottom: '4rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                >
                    <QuickPhrases />
                </motion.div>

                {/* Practice Mode */}
                <motion.div
                    style={{ marginBottom: '4rem' }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4 }}
                >
                    <PracticeMode />
                </motion.div>

                {/* Inspiration Card */}
                <motion.div
                    className="glass"
                    style={{
                        padding: '3rem',
                        borderRadius: '2rem',
                        textAlign: 'center',
                        position: 'relative',
                        overflow: 'hidden',
                        border: '1px solid rgba(255,255,255,0.1)',
                        marginBottom: '4rem'
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                >
                    {/* Background glow */}
                    <div style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        width: '300px',
                        height: '300px',
                        background: 'radial-gradient(circle, rgba(99, 102, 241, 0.2) 0%, transparent 70%)',
                        filter: 'blur(40px)',
                        zIndex: -1
                    }} />

                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
                        transition={{ duration: 4, repeat: Infinity }}
                        style={{ marginBottom: '1.5rem', display: 'inline-block' }}
                    >
                        <Shield size={64} style={{ color: '#818cf8' }} />
                    </motion.div>

                    <h3 style={{ fontSize: '2rem', fontWeight: '800', marginBottom: '1rem', color: 'white' }}>
                        You Are Ready
                    </h3>
                    <p style={{ fontSize: '1.25rem', color: 'var(--text-secondary)', maxWidth: '600px', margin: '0 auto' }}>
                        "Courage starts with showing up and getting yourself ready.
                        Use these tools whenever you need a boost."
                    </p>
                </motion.div>
            </div>
        </div>
    );
};

export default Tools;
