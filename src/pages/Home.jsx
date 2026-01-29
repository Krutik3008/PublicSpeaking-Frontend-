import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { scenariosAPI } from '../services/api';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import AnimatedBackground from '../components/common/AnimatedBackground';
import {
    Mic,
    Target,
    FileText,
    Zap,
    Rocket,
    Sparkles,
    ArrowRight,
    XCircle,
    CheckCircle,
    Star,
    Users,
    Shield,
    Award,
    Play,
    ChevronRight
} from '../components/common/IconMap';
import SituationGrid from '../components/home/SituationGrid';

const Home = () => {
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchScenarios();
    }, []);

    const fetchScenarios = async () => {
        try {
            const response = await scenariosAPI.getAll({ limit: 6 });
            setScenarios(response.data.data);
        } catch (error) {
            console.error('Error fetching scenarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const howItWorks = [
        { icon: <Target size={32} />, title: 'Choose Your Situation', description: 'Browse common scenarios or describe your specific situation' },
        { icon: <FileText size={32} />, title: 'Get Your Script', description: 'Receive a clear, respectful script tailored to your tone preference' },
        { icon: <Zap size={32} />, title: 'Speak With Confidence', description: 'Use the tips and script to speak up without fear' }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.15,
                delayChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { type: "spring", stiffness: 100, damping: 12 }
        }
    };

    // Floating elements for hero
    const floatingElements = [
        { icon: Star, x: -140, y: -100, delay: 0, size: 20 },
        { icon: Users, x: 160, y: -80, delay: 0.3, size: 22 },
        { icon: Shield, x: -160, y: 80, delay: 0.6, size: 18 },
        { icon: Award, x: 140, y: 100, delay: 0.9, size: 24 },
    ];

    return (
        <div>
            <AnimatedBackground />

            {/* Hero Section */}
            <section className="hero">
                <div className="hero-container">
                    <motion.div
                        className="hero-content"
                        initial="hidden"
                        animate="visible"
                        variants={containerVariants}
                    >
                        {/* Badge */}
                        <motion.span
                            className="hero-badge"
                            variants={itemVariants}
                        >
                            <motion.span
                                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                                transition={{ duration: 3, repeat: Infinity }}
                            >
                                <Sparkles size={16} color="#f59e0b" />
                            </motion.span>
                            Your Voice Matters
                        </motion.span>

                        {/* Main Title */}
                        <motion.h1 className="hero-title" variants={itemVariants}>
                            Speak Up With
                            <br />
                            <span className="text-gradient">Confidence</span>
                        </motion.h1>

                        {/* Subtitle */}
                        <motion.p className="hero-subtitle" variants={itemVariants}>
                            Stop hesitating. Get instant scripts and tips to speak up
                            confidently in any situation — no confrontation, just clear communication.
                        </motion.p>

                        {/* CTA Buttons */}
                        <motion.div className="hero-actions" variants={itemVariants}>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/generate" className="btn btn-primary btn-lg">
                                    <Play size={20} />
                                    Get Started Free
                                </Link>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05, y: -3 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Link to="/scenarios" className="btn btn-secondary btn-lg">
                                    Browse Scenarios
                                    <ChevronRight size={20} />
                                </Link>
                            </motion.div>
                        </motion.div>

                        {/* Stats */}
                        <motion.div
                            variants={itemVariants}
                            style={{
                                display: 'flex',
                                gap: '3rem',
                                marginTop: '3rem'
                            }}
                        >
                            {[
                                { value: '10K+', label: 'Scripts Generated' },
                                { value: '50+', label: 'Scenarios' },
                                { value: '100%', label: 'Free' }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0.5 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.8 + index * 0.15, type: "spring" }}
                                >
                                    <div style={{
                                        fontSize: '2rem',
                                        fontWeight: '800',
                                        background: 'var(--gradient-vibrant)',
                                        WebkitBackgroundClip: 'text',
                                        WebkitTextFillColor: 'transparent',
                                        lineHeight: 1
                                    }}>
                                        {stat.value}
                                    </div>
                                    <div style={{
                                        fontSize: '0.875rem',
                                        color: 'var(--text-muted)',
                                        marginTop: '0.25rem'
                                    }}>
                                        {stat.label}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>

                    {/* Hero Visual */}
                    <motion.div
                        className="hero-visual"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.3, type: "spring" }}
                    >
                        {/* Glow rings */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '400px',
                                height: '400px',
                                borderRadius: '50%',
                                background: 'radial-gradient(circle, rgba(99, 102, 241, 0.15) 0%, transparent 70%)',
                            }}
                            animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                            transition={{ duration: 4, repeat: Infinity }}
                        />

                        {/* Orbit ring */}
                        <motion.div
                            style={{
                                position: 'absolute',
                                width: '320px',
                                height: '320px',
                                borderRadius: '50%',
                                border: '1px solid rgba(255, 255, 255, 0.1)',
                            }}
                            animate={{ rotate: 360 }}
                            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                        />

                        {/* Floating icons */}
                        {floatingElements.map((item, index) => {
                            const IconComponent = item.icon;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{
                                        opacity: 1,
                                        scale: 1,
                                        y: [0, -15, 0],
                                    }}
                                    transition={{
                                        delay: 0.5 + item.delay,
                                        y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut" }
                                    }}
                                    style={{
                                        position: 'absolute',
                                        left: '50%',
                                        top: '50%',
                                        transform: `translate(calc(-50% + ${item.x}px), calc(-50% + ${item.y}px))`,
                                        background: 'rgba(255, 255, 255, 0.05)',
                                        backdropFilter: 'blur(10px)',
                                        borderRadius: '50%',
                                        padding: '1rem',
                                        border: '1px solid rgba(255, 255, 255, 0.1)',
                                    }}
                                >
                                    <IconComponent size={item.size} color="var(--primary-400)" />
                                </motion.div>
                            );
                        })}

                        {/* Main Icon */}
                        <motion.div
                            animate={{
                                y: [0, -10, 0],
                            }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            style={{
                                background: 'var(--gradient-primary)',
                                borderRadius: '50%',
                                padding: '3.5rem',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                boxShadow: '0 30px 80px rgba(99, 102, 241, 0.4), inset 0 -5px 20px rgba(0,0,0,0.2)',
                                position: 'relative',
                                zIndex: 2,
                            }}
                        >
                            <motion.div
                                animate={{ rotate: [0, 5, -5, 0] }}
                                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <Mic size={100} color="white" strokeWidth={1.5} />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Quick Help */}
            <section className="quick-help">
                <div className="container">
                    <motion.h2
                        className="quick-help-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Need Help Right Now?
                    </motion.h2>
                    <motion.p
                        className="quick-help-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Get an instant, personalized script in under 30 seconds
                    </motion.p>
                    <motion.button
                        className="btn btn-lg"
                        onClick={() => navigate('/generate')}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Rocket size={22} />
                        Generate My Script
                    </motion.button>
                </div>
            </section>

            {/* How It Works */}
            <section className="section">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-subtitle">
                            Three simple steps to find your voice and speak with confidence
                        </p>
                    </motion.div>
                    <div className="scenarios-grid">
                        {howItWorks.map((step, index) => (
                            <Card
                                key={index}
                                icon={step.icon}
                                title={step.title}
                                description={step.description}
                                badge={`Step ${index + 1}`}
                                delay={index * 0.1}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Situation Selector Section */}
            <section className="scenarios-section" id="situations">
                <div className="container">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        <h2 className="section-title">Select Your Situation</h2>
                        <p className="section-subtitle">
                            What's happening right now? Click a card to get instant support.
                        </p>
                    </motion.div>

                    <SituationGrid />

                    <motion.div
                        style={{ textAlign: 'center', marginTop: '3rem' }}
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    >
                        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                            <Link to="/scenarios" className="btn btn-secondary">
                                View Full Library
                                <ArrowRight size={18} />
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Promise Section */}
            <section className="quick-help" style={{ background: 'rgba(255, 255, 255, 0.02)' }}>
                <div className="container">
                    <motion.h2
                        className="quick-help-title"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                    >
                        Your Right to Speak
                    </motion.h2>
                    <motion.p
                        className="quick-help-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                    >
                        Speaking up isn't about being difficult — it's about being heard.
                    </motion.p>
                    <motion.div
                        style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                    >
                        {[
                            { icon: <XCircle size={18} />, text: 'No shaming', color: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.3)' },
                            { icon: <XCircle size={18} />, text: 'No conflict', color: 'rgba(248, 113, 113, 0.15)', border: 'rgba(248, 113, 113, 0.3)' },
                            { icon: <CheckCircle size={18} />, text: 'Just confidence', color: 'rgba(34, 197, 94, 0.15)', border: 'rgba(34, 197, 94, 0.3)', highlight: true }
                        ].map((item, index) => (
                            <motion.span
                                key={index}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    background: item.color,
                                    border: `1px solid ${item.border}`,
                                    borderRadius: '9999px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '0.5rem',
                                    color: item.highlight ? '#22c55e' : '#f87171',
                                    fontWeight: 600
                                }}
                                whileHover={{ scale: 1.05, y: -2 }}
                            >
                                {item.icon}
                                {item.text}
                            </motion.span>
                        ))}
                    </motion.div>
                </div>
            </section>
        </div>
    );
};

export default Home;
