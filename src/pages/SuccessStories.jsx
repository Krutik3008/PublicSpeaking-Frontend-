import { useState, useEffect, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import Modal from '../components/common/Modal';
import AnimatedBackground from '../components/common/AnimatedBackground';
import { storiesAPI, statsAPI } from '../services/api';
import {
    Star,
    MessageCircle,
    Heart,
    TrendingUp,
    Smile,
    User,
    CreditCard,
    AlertTriangle,
    Scale,
    Megaphone,
    Bell,
    MessageSquare,
    Edit,
    Check,
    Lock
} from '../components/common/IconMap';

const API_URL = '/api';

// Animated Counter Component
const Counter = ({ value, label, icon: Icon, delay = 0 }) => {
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

            const timer = setTimeout(() => {
                const interval = setInterval(() => {
                    start += increment;
                    if (start >= target) {
                        setCount(target);
                        clearInterval(interval);
                    } else {
                        setCount(Math.floor(start));
                    }
                }, 16);
            }, delay * 1000);
            return () => clearTimeout(timer);
        }
    }, [isInView, target, delay]);

    return (
        <motion.div
            ref={ref}
            className="glass"
            style={{
                padding: '1.5rem',
                borderRadius: '1.5rem',
                textAlign: 'center',
                display: 'flex',
                alignItems: 'center',
                gap: '1.5rem',
                border: '1px solid rgba(255,255,255,0.1)'
            }}
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ delay, type: "spring" }}
            whileHover={{ scale: 1.02, background: 'rgba(255,255,255,0.08)' }}
        >
            <div style={{
                background: 'var(--gradient-primary)',
                padding: '1rem',
                borderRadius: '1rem',
                color: 'white',
                boxShadow: '0 8px 20px rgba(99, 102, 241, 0.3)'
            }}>
                <Icon size={28} />
            </div>
            <div style={{ textAlign: 'left' }}>
                <div style={{ fontSize: '2rem', fontWeight: '800', color: 'var(--text-primary)', lineHeight: 1 }}>
                    {count}{suffix}
                </div>
                <div style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', fontWeight: '500' }}>
                    {label}
                </div>
            </div>
        </motion.div>
    );
};

const SuccessStories = () => {
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const [stories, setStories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [stats, setStats] = useState({
        totalStories: 0,
        totalLikes: 0,
        empoweredPercentage: 98
    });
    const [newStory, setNewStory] = useState({
        situation: '',
        whatISaid: '',
        outcome: '',
        feeling: 'proud',
        category: 'general'
    });
    const [submitting, setSubmitting] = useState(false);

    const feelings = [
        { id: 'proud', name: 'Proud', emoji: '🏆' },
        { id: 'relieved', name: 'Relieved', emoji: '😌' },
        { id: 'empowered', name: 'Empowered', emoji: '💪' },
        { id: 'nervous-but-glad', name: 'Nervous but Glad', emoji: '😅' },
        { id: 'confident', name: 'Confident', emoji: '😎' }
    ];

    const categories = [
        { id: 'billing', name: 'Billing', icon: <CreditCard size={16} /> },
        { id: 'safety', name: 'Safety', icon: <AlertTriangle size={16} /> },
        { id: 'unfair-treatment', name: 'Unfair Treatment', icon: <Scale size={16} /> },
        { id: 'misinformation', name: 'Misinformation', icon: <Megaphone size={16} /> },
        { id: 'service', name: 'Service', icon: <Bell size={16} /> },
        { id: 'general', name: 'General', icon: <MessageSquare size={16} /> }
    ];

    useEffect(() => {
        fetchStories();
        fetchStats();
    }, [selectedCategory]);

    const fetchStats = async () => {
        try {
            const response = await statsAPI.getStats();
            setStats(response.data.data);
        } catch (error) {
            console.error('Error fetching stats:', error);
            // Set to zero when no data
            setStats({
                totalStories: 0,
                totalLikes: 0,
                empoweredPercentage: 0
            });
        }
    };

    const fetchStories = async () => {
        setLoading(true);
        try {
            const params = {};
            if (selectedCategory !== 'all') params.category = selectedCategory;

            const response = await storiesAPI.getAll(params);
            setStories(response.data.data);
        } catch (error) {
            console.error('Error fetching stories:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (storyId) => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        try {
            const response = await storiesAPI.like(storyId);
            const { likes, hasLiked, action } = response.data.data;

            setStories(stories.map(story =>
                story._id === storyId ? {
                    ...story,
                    likes: likes,
                    hasLiked: hasLiked
                } : story
            ));

            // Update stats based on action
            if (action === 'liked') {
                setStats(prev => ({ ...prev, totalLikes: prev.totalLikes + 1 }));
            } else {
                setStats(prev => ({ ...prev, totalLikes: Math.max(0, prev.totalLikes - 1) }));
            }
        } catch (error) {
            console.error('Error liking story:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!isAuthenticated) {
            navigate('/login');
            return;
        }

        setSubmitting(true);

        try {
            const response = await storiesAPI.add(newStory);
            setStories([response.data.data, ...stories]);
            setStats(prev => ({ ...prev, totalStories: prev.totalStories + 1 }));
            setNewStory({ situation: '', whatISaid: '', outcome: '', feeling: 'proud', category: 'general' });
            setShowAddModal(false);
        } catch (error) {
            console.error('Error adding story:', error);
            if (error.response?.status === 401) {
                navigate('/login');
            }
        } finally {
            setSubmitting(false);
        }
    };

    const handleAddStoryClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setShowAddModal(true);
    };

    const getFeelingEmoji = (feelingId) => {
        const feeling = feelings.find(f => f.id === feelingId);
        return feeling?.emoji || '🎉';
    };

    return (
        <div className="stories-section" style={{ paddingTop: '100px', paddingBottom: '4rem', minHeight: '100vh' }}>
            <AnimatedBackground />

            <div className="container">
                {/* Header Section */}
                <div className="section-header">
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        style={{ display: 'inline-flex', marginBottom: '1.5rem' }}
                    >
                        <span className="hero-badge">
                            <Star size={16} />
                            Community Voices
                        </span>
                    </motion.div>

                    <motion.h1
                        className="section-title"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                    >
                        Success <span className="text-gradient">Stories</span>
                    </motion.h1>

                    <motion.p
                        className="section-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        Real stories from people who found their voice.
                        Inspiring confidence, one story at a time.
                    </motion.p>

                    <motion.button
                        className="btn btn-primary btn-lg"
                        style={{ marginTop: '2rem' }}
                        onClick={handleAddStoryClick}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Edit size={20} />
                        Share Your Story
                    </motion.button>
                </div>

                {/* Stats Section (The Counting Part!) */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                    gap: '1.5rem',
                    marginBottom: '4rem',
                    maxWidth: '1200px',
                    margin: '0 auto 4rem auto'
                }}>
                    <Counter
                        value={stats.totalStories}
                        label="Stories Shared"
                        icon={MessageCircle}
                        delay={0}
                    />
                    <Counter
                        value={stats.totalLikes}
                        label="Community Likes"
                        icon={Heart}
                        delay={0.1}
                    />
                    <Counter
                        value={stats.empoweredPercentage > 0 ? `${stats.empoweredPercentage}%` : '0%'}
                        label="Felt Empowered"
                        icon={TrendingUp}
                        delay={0.2}
                    />
                </div>

                {/* Category Filter */}
                <motion.div
                    className="tips-categories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                >
                    <button
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                    >
                        All Stories
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.id}
                            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                            style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </motion.div>

                {/* Stories Grid */}
                {loading ? (
                    <Loading />
                ) : stories.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">🌟</div>
                        <h3 className="empty-state-title">No stories yet</h3>
                        <p>Be the first to share your success story!</p>
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '1.5rem' }}
                            onClick={handleAddStoryClick}
                        >
                            Share Your Story
                        </button>
                    </div>
                ) : (
                    <motion.div
                        className="scenarios-grid"
                        initial="hidden"
                        animate="visible"
                        variants={{
                            hidden: { opacity: 0 },
                            visible: {
                                opacity: 1,
                                transition: { staggerChildren: 0.1 }
                            }
                        }}
                    >
                        <AnimatePresence>
                            {stories.map((story) => (
                                <motion.div
                                    key={story._id}
                                    variants={{
                                        hidden: { opacity: 0, y: 20 },
                                        visible: { opacity: 1, y: 0 }
                                    }}
                                    layout
                                >
                                    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'flex-start',
                                            marginBottom: '1.5rem'
                                        }}>
                                            <span className="card-badge" style={{ marginTop: 0 }}>
                                                {story.category}
                                            </span>
                                            <div style={{ fontSize: '2rem', lineHeight: 1 }}>
                                                {getFeelingEmoji(story.feeling)}
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                color: 'var(--primary-400)',
                                                fontWeight: '700',
                                                marginBottom: '0.5rem'
                                            }}>
                                                The Situation
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)' }}>{story.situation}</p>
                                        </div>

                                        <div style={{ marginBottom: '1.5rem' }}>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                color: 'var(--success-500)',
                                                fontWeight: '700',
                                                marginBottom: '0.5rem'
                                            }}>
                                                What I Said
                                            </div>
                                            <div style={{
                                                padding: '1rem',
                                                background: 'rgba(34, 197, 94, 0.1)',
                                                borderLeft: '3px solid var(--success-500)',
                                                borderRadius: '0.5rem',
                                                color: 'var(--text-primary)',
                                                fontStyle: 'italic'
                                            }}>
                                                "{story.whatISaid}"
                                            </div>
                                        </div>

                                        <div style={{ marginBottom: 'auto' }}>
                                            <div style={{
                                                fontSize: '0.75rem',
                                                textTransform: 'uppercase',
                                                letterSpacing: '0.05em',
                                                color: 'var(--accent-400)',
                                                fontWeight: '700',
                                                marginBottom: '0.5rem'
                                            }}>
                                                The Outcome
                                            </div>
                                            <p style={{ color: 'var(--text-secondary)' }}>{story.outcome}</p>
                                        </div>

                                        <div style={{
                                            display: 'flex',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            marginTop: '1.5rem',
                                            paddingTop: '1rem',
                                            borderTop: '1px solid rgba(255,255,255,0.1)'
                                        }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
                                                <User size={14} />
                                                <span style={{ fontSize: '0.875rem' }}>Anonymous</span>
                                            </div>
                                            <motion.button
                                                className="like-button"
                                                onClick={() => handleLike(story._id)}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                                style={{
                                                    display: 'flex',
                                                    alignItems: 'center',
                                                    gap: '0.25rem',
                                                    background: 'none',
                                                    border: 'none',
                                                    cursor: 'pointer',
                                                    color: story.hasLiked ? '#ef4444' : 'var(--text-secondary)',
                                                    transition: 'all 0.2s ease'
                                                }}
                                            >
                                                <Heart
                                                    size={16}
                                                    fill={story.hasLiked ? "#ef4444" : "none"}
                                                    color={story.hasLiked ? "#ef4444" : "var(--text-secondary)"}
                                                />
                                                <span>{story.likes || 0}</span>
                                            </motion.button>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </motion.div>
                )}
            </div>

            {/* Add Story Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Share Your Success Story"
            >
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="form-label">The Situation</label>
                        <textarea
                            className="form-textarea"
                            placeholder="What happened? (e.g., I was overcharged...)"
                            value={newStory.situation}
                            onChange={(e) => setNewStory({ ...newStory, situation: e.target.value })}
                            required
                            maxLength={200}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">What You Said</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Your exact words..."
                            value={newStory.whatISaid}
                            onChange={(e) => setNewStory({ ...newStory, whatISaid: e.target.value })}
                            required
                            maxLength={500}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">The Outcome</label>
                        <textarea
                            className="form-textarea"
                            placeholder="How did they react?"
                            value={newStory.outcome}
                            onChange={(e) => setNewStory({ ...newStory, outcome: e.target.value })}
                            required
                            maxLength={300}
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">How did it feel?</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                            {feelings.map((f) => (
                                <button
                                    key={f.id}
                                    type="button"
                                    onClick={() => setNewStory({ ...newStory, feeling: f.id })}
                                    className={newStory.feeling === f.id ? 'category-btn active' : 'category-btn'}
                                    style={{ padding: '0.5rem 1rem', fontSize: '0.875rem' }}
                                >
                                    {f.emoji} {f.name}
                                </button>
                            ))}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%' }}
                        disabled={submitting}
                    >
                        <Check size={20} />
                        {submitting ? 'Sharing...' : 'Share Story Anonymously'}
                    </button>
                </form>
            </Modal>
        </div>
    );
};

export default SuccessStories;
