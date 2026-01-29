import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toolsAPI } from '../../services/api';
import {
    Target,
    Eye,
    User,
    Volume2,
    Mic,
    Shuffle,
    CheckCircle,
    Clock,
    Play,
    Square
} from '../common/IconMap';

const PracticeMode = () => {
    const [isRecording, setIsRecording] = useState(false);
    const [practiceScript, setPracticeScript] = useState('');
    const [timer, setTimer] = useState(0);
    const [feedback, setFeedback] = useState(null);
    const [scripts, setScripts] = useState([]);
    const [loading, setLoading] = useState(true);
    const timerRef = useRef(null);

    useEffect(() => {
        const fetchScripts = async () => {
            try {
                const response = await toolsAPI.getScripts();
                // Map the object array to just text strings if needed, 
                // or keep objects and use .text property
                setScripts(response.data.data);
            } catch (error) {
                console.error('Error fetching scripts:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchScripts();
    }, []);

    const tips = [
        { icon: Target, title: "Speak Slowly", desc: "Aim for a calm, measured pace" },
        { icon: Eye, title: "Imagine Eye Contact", desc: "Look at an imaginary person" },
        { icon: User, title: "Stand Tall", desc: "Practice with good posture" },
        { icon: Volume2, title: "Project Voice", desc: "Speak clearly, not loudly" }
    ];

    useEffect(() => {
        if (isRecording) {
            timerRef.current = setInterval(() => {
                setTimer(t => t + 1);
            }, 1000);
        } else {
            clearInterval(timerRef.current);
        }
        return () => clearInterval(timerRef.current);
    }, [isRecording]);

    const startPractice = () => {
        setIsRecording(true);
        setTimer(0);
        setFeedback(null);
    };

    const stopPractice = () => {
        setIsRecording(false);
        // Generate mock feedback
        const feedbackOptions = [
            { rating: "Great!", message: "You spoke clearly and confidently. Keep it up!", color: "var(--success-500)" },
            { rating: "Good!", message: "Nice job! Try to slow down a bit more next time.", color: "var(--accent-500)" },
            { rating: "Practice More", message: "Keep practicing! Confidence comes with repetition.", color: "var(--primary-500)" }
        ];
        setFeedback(feedbackOptions[Math.floor(Math.random() * feedbackOptions.length)]);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const selectRandomScript = () => {
        if (scripts.length === 0) return;
        const random = scripts[Math.floor(Math.random() * scripts.length)];
        setPracticeScript(random.text);
    };

    return (
        <motion.div
            className="glass"
            style={{
                width: '100%',
                padding: 'var(--space-8)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <div style={{ textAlign: 'center', marginBottom: 'var(--space-6)' }}>
                <h3 style={{ marginBottom: 'var(--space-2)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Mic size={24} />
                    Practice Mode
                </h3>
                <p style={{ color: 'var(--text-secondary)' }}>
                    Practice saying your script out loud to build confidence
                </p>
            </div>

            {/* Tips */}
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
                gap: 'var(--space-3)',
                marginBottom: 'var(--space-6)'
            }}>
                {tips.map((tip, i) => {
                    const TipIcon = tip.icon;
                    return (
                        <motion.div
                            key={i}
                            style={{
                                textAlign: 'center',
                                padding: 'var(--space-3)',
                                background: 'rgba(255, 255, 255, 0.05)',
                                borderRadius: 'var(--radius-lg)'
                            }}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <div style={{ marginBottom: 'var(--space-2)', color: 'var(--primary-600)' }}>
                                <TipIcon size={28} strokeWidth={1.5} />
                            </div>
                            <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: '600' }}>{tip.title}</div>
                            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-muted)' }}>{tip.desc}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Script Input */}
            <div style={{ marginBottom: 'var(--space-6)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-2)' }}>
                    <label style={{ fontWeight: '600' }}>Your Practice Script</label>
                    <motion.button
                        onClick={selectRandomScript}
                        className="btn btn-ghost btn-sm"
                        style={{ fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Shuffle size={14} />
                        Random Script
                    </motion.button>
                </div>
                <textarea
                    value={practiceScript}
                    onChange={(e) => setPracticeScript(e.target.value)}
                    placeholder="Type or paste the script you want to practice..."
                    style={{
                        width: '100%',
                        minHeight: '100px',
                        padding: 'var(--space-4)',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'white',
                        borderRadius: 'var(--radius-lg)',
                        fontFamily: 'inherit',
                        fontSize: 'var(--font-size-base)',
                        resize: 'vertical'
                    }}
                />
            </div>

            {/* Practice Controls */}
            <div style={{ textAlign: 'center' }}>
                {!isRecording ? (
                    <motion.button
                        onClick={startPractice}
                        disabled={!practiceScript.trim()}
                        className="btn btn-primary btn-lg"
                        style={{ minWidth: '200px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Play size={20} />
                        Start Practice
                    </motion.button>
                ) : (
                    <div>
                        <motion.div
                            style={{
                                fontSize: '3rem',
                                fontWeight: '700',
                                color: 'var(--primary-600)',
                                marginBottom: 'var(--space-4)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '0.5rem'
                            }}
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        >
                            <Clock size={32} />
                            {formatTime(timer)}
                        </motion.div>
                        <div style={{
                            padding: 'var(--space-4)',
                            background: 'var(--primary-50)',
                            borderRadius: 'var(--radius-lg)',
                            marginBottom: 'var(--space-4)',
                            fontSize: 'var(--font-size-lg)',
                            lineHeight: '1.6'
                        }}>
                            {practiceScript}
                        </div>
                        <motion.button
                            onClick={stopPractice}
                            className="btn btn-primary btn-lg"
                            style={{ background: 'var(--success-500)', minWidth: '200px', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <CheckCircle size={20} />
                            Done Practicing
                        </motion.button>
                    </div>
                )}

                {/* Feedback */}
                <AnimatePresence>
                    {feedback && (
                        <motion.div
                            style={{
                                marginTop: 'var(--space-6)',
                                padding: 'var(--space-6)',
                                background: feedback.color,
                                color: 'white',
                                borderRadius: 'var(--radius-lg)',
                            }}
                            initial={{ opacity: 0, y: 20, scale: 0.9 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        >
                            <div style={{ fontSize: 'var(--font-size-xl)', fontWeight: '700', marginBottom: 'var(--space-2)' }}>
                                {feedback.rating}
                            </div>
                            <p>{feedback.message}</p>
                            <p style={{ marginTop: 'var(--space-3)', opacity: 0.9, fontSize: 'var(--font-size-sm)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.25rem' }}>
                                <Clock size={14} />
                                Practice time: {formatTime(timer)}
                            </p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

export default PracticeMode;
