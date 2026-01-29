import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { tipsAPI } from '../services/api';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import Modal from '../components/common/Modal';
import AnimatedBackground from '../components/common/AnimatedBackground';
import {
    PlusCircle,
    Lightbulb,
    Heart,
    Lock,
    Send
} from '../components/common/IconMap';

const Tips = () => {
    const [tips, setTips] = useState([]);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [loading, setLoading] = useState(true);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newTip, setNewTip] = useState({ category: 'general', content: '' });
    const [submitting, setSubmitting] = useState(false);
    const [searchParams] = useSearchParams();

    useEffect(() => {
        fetchCategories();

        // Check for category in URL
        const urlCategory = searchParams.get('category');
        if (urlCategory) {
            setSelectedCategory(urlCategory);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchTips();
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const response = await tipsAPI.getCategories();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchTips = async () => {
        setLoading(true);
        try {
            const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
            const response = await tipsAPI.getAll(params);
            setTips(response.data.data);
        } catch (error) {
            console.error('Error fetching tips:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleLike = async (tipId) => {
        try {
            await tipsAPI.like(tipId);
            setTips(tips.map(tip =>
                tip._id === tipId ? { ...tip, likes: tip.likes + 1 } : tip
            ));
        } catch (error) {
            console.error('Error liking tip:', error);
        }
    };

    const handleAddTip = async (e) => {
        e.preventDefault();
        if (!newTip.content.trim()) return;

        setSubmitting(true);
        try {
            const response = await tipsAPI.add(newTip);
            setTips([response.data.data, ...tips]);
            setNewTip({ category: 'general', content: '' });
            setShowAddModal(false);
            alert('Thank you for sharing your wisdom!');
        } catch (error) {
            console.error('Error adding tip:', error);
            alert('Failed to add tip. Please try again.');
        } finally {
            setSubmitting(false);
        }
    };

    // Map category ids to icons
    const getCategoryIcon = (categoryId) => {
        const iconMap = {
            'general': '💬',
            'body-language': '🧍',
            'tone': '🎵',
            'timing': '⏰',
            'mindset': '🧠',
            'preparation': '📝'
        };
        return iconMap[categoryId] || '💡';
    };

    return (
        <div className="tips-section" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <AnimatedBackground />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="section-title">Community Wisdom</h1>
                    <p className="section-subtitle">
                        Tips and insights from people who've learned to speak up with confidence
                    </p>
                    <motion.button
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        onClick={() => setShowAddModal(true)}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PlusCircle size={18} />
                        Share Your Tip
                    </motion.button>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="tips-categories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <motion.button
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        All Tips
                    </motion.button>
                    {categories.map((cat) => (
                        <motion.button
                            key={cat.id}
                            className={`category-btn ${selectedCategory === cat.id ? 'active' : ''}`}
                            onClick={() => setSelectedCategory(cat.id)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {getCategoryIcon(cat.id)} {cat.name}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Tips Grid */}
                {loading ? (
                    <Loading />
                ) : tips.length === 0 ? (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="empty-state-icon">
                            <Lightbulb size={64} strokeWidth={1} />
                        </div>
                        <h3 className="empty-state-title">No tips yet</h3>
                        <p>Be the first to share your wisdom!</p>
                        <motion.button
                            className="btn btn-primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => setShowAddModal(true)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Share a Tip
                        </motion.button>
                    </motion.div>
                ) : (
                    <div className="tips-grid">
                        {tips.map((tip, index) => (
                            <Card key={tip._id} className="tip-card" delay={index * 0.05}>
                                <p className="tip-content">
                                    "{tip.content}"
                                </p>
                                <div className="tip-footer">
                                    <span className="tip-category">
                                        {getCategoryIcon(tip.category)} {tip.category}
                                    </span>
                                    <motion.button
                                        className="like-button"
                                        onClick={() => handleLike(tip._id)}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                    >
                                        <Heart size={16} fill={tip.likes > 0 ? '#f87171' : 'none'} color="#f87171" />
                                        {tip.likes}
                                    </motion.button>
                                </div>
                            </Card>
                        ))}
                    </div>
                )}
            </div>

            {/* Add Tip Modal */}
            <Modal
                isOpen={showAddModal}
                onClose={() => setShowAddModal(false)}
                title="Share Your Wisdom"
            >
                <form onSubmit={handleAddTip}>
                    <div className="form-group">
                        <label className="form-label">Category</label>
                        <select
                            className="form-select"
                            value={newTip.category}
                            onChange={(e) => setNewTip({ ...newTip, category: e.target.value })}
                        >
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {getCategoryIcon(cat.id)} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Your Tip</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Share a tip that helped you speak up with confidence..."
                            value={newTip.content}
                            onChange={(e) => setNewTip({ ...newTip, content: e.target.value })}
                            required
                            maxLength={500}
                        />
                        <small style={{ color: 'var(--text-muted)' }}>
                            {newTip.content.length}/500 characters
                        </small>
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'var(--primary-50)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <Lock size={18} style={{ color: 'var(--primary-600)' }} />
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            All tips are submitted <strong>anonymously</strong>. We never share personal information.
                        </p>
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        disabled={submitting || !newTip.content.trim()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Send size={18} />
                        {submitting ? 'Submitting...' : 'Submit Tip'}
                    </motion.button>
                </form>
            </Modal>
        </div>
    );
};

export default Tips;
