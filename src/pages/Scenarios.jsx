import { useState, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../context/AuthContext';
import { scenariosAPI, scriptsAPI } from '../services/api';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';
import Modal from '../components/common/Modal';
import AnimatedBackground from '../components/common/AnimatedBackground';
import {
    Search,
    Zap,
    Copy,
    FileText,
    ArrowRight,
    PlusCircle,
    Lock,
    Send
} from '../components/common/IconMap';

const Scenarios = () => {
    const [scenarios, setScenarios] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('all');
    const [categories, setCategories] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedScenario, setSelectedScenario] = useState(null);
    const [scripts, setScripts] = useState([]);
    // Add Scenario State
    const [addModalOpen, setAddModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [newScenario, setNewScenario] = useState({
        title: '',
        description: '',
        category: 'general',
        difficulty: 'medium',
        emotionalContext: ''
    });
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();
    const { id } = useParams();

    useEffect(() => {
        const categoryParam = searchParams.get('category');
        if (categoryParam) {
            setSelectedCategory(categoryParam);
        }
    }, [searchParams]);

    useEffect(() => {
        fetchCategories();
        fetchScenarios();
    }, [selectedCategory]);

    useEffect(() => {
        if (id) {
            fetchScenarioDetail(id);
        }
    }, [id]);

    const fetchCategories = async () => {
        try {
            const response = await scenariosAPI.getCategories();
            setCategories(response.data.data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
    };

    const fetchScenarios = async () => {
        setLoading(true);
        try {
            const params = selectedCategory !== 'all' ? { category: selectedCategory } : {};
            const response = await scenariosAPI.getAll(params);
            setScenarios(response.data.data);
        } catch (error) {
            console.error('Error fetching scenarios:', error);
        } finally {
            setLoading(false);
        }
    };

    const fetchScenarioDetail = async (scenarioId) => {
        try {
            const [scenarioRes, scriptsRes] = await Promise.all([
                scenariosAPI.getById(scenarioId),
                scriptsAPI.getForScenario(scenarioId)
            ]);
            setSelectedScenario(scenarioRes.data.data);
            setScripts(scriptsRes.data.data);
            setModalOpen(true);
        } catch (error) {
            console.error('Error fetching scenario detail:', error);
        }
    };

    const handleSearch = async () => {
        if (!searchQuery.trim()) {
            fetchScenarios();
            return;
        }
        setLoading(true);
        try {
            const response = await scenariosAPI.search(searchQuery);
            setScenarios(response.data.data);
        } catch (error) {
            console.error('Error searching:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleScenarioClick = (scenario) => {
        navigate(`/scenarios/${scenario._id}`);
    };

    const closeModal = () => {
        setModalOpen(false);
        setSelectedScenario(null);
        setScripts([]);
        navigate('/scenarios');
    };

    const copyToClipboard = (text) => {
        navigator.clipboard.writeText(text);
        alert('Script copied to clipboard!');
    };

    const handleAddClick = () => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        setAddModalOpen(true);
    };

    const handleCreateScenario = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await scenariosAPI.create(newScenario);
            setAddModalOpen(false);
            setNewScenario({
                title: '',
                description: '',
                category: 'general',
                difficulty: 'medium',
                emotionalContext: ''
            });
            // Refresh list
            fetchScenarios();
        } catch (error) {
            console.error('Error creating scenario:', error);
        } finally {
            setSubmitting(false);
        }
    };

    const filteredScenarios = scenarios.filter(scenario =>
        scenario.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        scenario.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Map category ids to icons
    const getCategoryIcon = (catId) => {
        const iconMap = {
            'billing': '💳',
            'safety': '⚠️',
            'unfair-treatment': '⚖️',
            'misinformation': '📢',
            'service': '🛎️',
            'general': '💬'
        };
        return iconMap[catId] || '💬';
    };

    return (
        <div className="scenarios-section" style={{ paddingTop: '100px' }}>
            <AnimatedBackground />
            <div className="container">
                <motion.div
                    className="section-header"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="section-title">Speaking Scenarios</h1>
                    <p className="section-subtitle">
                        Browse common situations and get ready-to-use scripts for speaking up confidently
                    </p>
                    <motion.button
                        className="btn btn-primary"
                        style={{ marginTop: '1rem', display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}
                        onClick={handleAddClick}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <PlusCircle size={18} />
                        Share Your Scenario
                    </motion.button>
                </motion.div>

                {/* Search */}
                <motion.div
                    style={{ maxWidth: '500px', margin: '0 auto 2rem' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="Search scenarios..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                        />
                        <motion.button
                            className="btn btn-primary"
                            onClick={handleSearch}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                            <Search size={20} />
                        </motion.button>
                    </div>
                </motion.div>

                {/* Category Filter */}
                <motion.div
                    className="tips-categories"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <motion.button
                        className={`category-btn ${selectedCategory === 'all' ? 'active' : ''}`}
                        onClick={() => setSelectedCategory('all')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        All
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

                {/* Scenarios Grid */}
                {loading ? (
                    <Loading />
                ) : filteredScenarios.length === 0 ? (
                    <motion.div
                        className="empty-state"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className="empty-state-icon">
                            <Search size={64} strokeWidth={1} />
                        </div>
                        <h3 className="empty-state-title">No scenarios found</h3>
                        <p>Try a different search or category</p>
                    </motion.div>
                ) : (
                    <div className="scenarios-grid">
                        {filteredScenarios.map((scenario, index) => (
                            <Card
                                key={scenario._id}
                                icon={scenario.icon}
                                title={scenario.title}
                                description={scenario.description}
                                badge={scenario.difficulty}
                                onClick={() => handleScenarioClick(scenario)}
                                delay={index * 0.05}
                            />
                        ))}
                    </div>
                )}
            </div>

            {/* Scenario Detail Modal */}
            <Modal isOpen={modalOpen} onClose={closeModal} title={selectedScenario?.title}>
                {selectedScenario && (
                    <div>
                        <p style={{ marginBottom: '1rem', color: 'var(--text-secondary)' }}>
                            {selectedScenario.description}
                        </p>

                        <div style={{ marginBottom: '1.5rem', padding: '1rem', background: 'var(--primary-50)', borderRadius: 'var(--radius-lg)' }}>
                            <strong>Why speaking up feels hard:</strong>
                            <p style={{ margin: '0.5rem 0 0', color: 'var(--text-secondary)' }}>
                                {selectedScenario.emotionalContext}
                            </p>
                        </div>

                        <h4 style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <FileText size={20} />
                            Ready-to-Use Scripts:
                        </h4>

                        {scripts.length > 0 ? (
                            scripts.map((script, index) => (
                                <motion.div
                                    key={index}
                                    className="script-result"
                                    style={{ marginBottom: '1rem' }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 }}
                                >
                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                                        <span className="card-badge">{script.tone} tone</span>
                                        <motion.button
                                            className="btn btn-sm btn-secondary"
                                            onClick={() => copyToClipboard(`${script.openingLine} ${script.bodyScript} ${script.closingLine}`)}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}
                                        >
                                            <Copy size={14} />
                                            Copy
                                        </motion.button>
                                    </div>
                                    <div className="script-section">
                                        <div className="script-section-title">Opening</div>
                                        <p className="script-text" style={{ fontSize: '1rem' }}>{script.openingLine}</p>
                                    </div>
                                    <div className="script-section">
                                        <div className="script-section-title">Main Message</div>
                                        <p className="script-text" style={{ fontSize: '1rem' }}>{script.bodyScript}</p>
                                    </div>
                                    <div className="script-section">
                                        <div className="script-section-title">Closing</div>
                                        <p className="script-text" style={{ fontSize: '1rem' }}>{script.closingLine}</p>
                                    </div>
                                </motion.div>
                            ))
                        ) : (
                            <p>No scripts available. Try the Quick Help generator!</p>
                        )}

                        <motion.button
                            className="btn btn-primary"
                            style={{ width: '100%', marginTop: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                            onClick={() => navigate('/generate')}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Zap size={18} />
                            Generate Custom Script
                        </motion.button>
                    </div>
                )}
            </Modal>

            {/* Add Scenario Modal */}
            <Modal
                isOpen={addModalOpen}
                onClose={() => setAddModalOpen(false)}
                title="Share a Solution Scenario"
            >
                <form onSubmit={handleCreateScenario}>
                    <div className="form-group">
                        <label className="form-label">Title</label>
                        <input
                            type="text"
                            className="form-input"
                            placeholder="e.g., Charged extra for sauce"
                            value={newScenario.title}
                            onChange={(e) => setNewScenario({ ...newScenario, title: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">Description</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe the situation..."
                            value={newScenario.description}
                            onChange={(e) => setNewScenario({ ...newScenario, description: e.target.value })}
                            required
                        />
                    </div>

                    <div className="form-grid">
                        <div className="form-group">
                            <label className="form-label">Category</label>
                            <select
                                className="form-select"
                                value={newScenario.category}
                                onChange={(e) => setNewScenario({ ...newScenario, category: e.target.value })}
                            >
                                {categories.map(cat => (
                                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label className="form-label">Difficulty</label>
                            <select
                                className="form-select"
                                value={newScenario.difficulty}
                                onChange={(e) => setNewScenario({ ...newScenario, difficulty: e.target.value })}
                            >
                                <option value="easy">Easy</option>
                                <option value="medium">Medium</option>
                                <option value="challenging">Challenging</option>
                            </select>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Emotional Context (Why it's hard)</label>
                        <textarea
                            className="form-textarea"
                            placeholder="e.g., Fear of looking cheap..."
                            value={newScenario.emotionalContext}
                            onChange={(e) => setNewScenario({ ...newScenario, emotionalContext: e.target.value })}
                            required
                        />
                    </div>

                    <div style={{
                        padding: '1rem',
                        background: 'rgba(0, 0, 0, 0.2)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        borderRadius: 'var(--radius-lg)',
                        marginBottom: '1rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem'
                    }}>
                        <Lock size={18} style={{ color: 'var(--primary-600)' }} />
                        <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                            Your scenario will help others practice!
                        </p>
                    </div>

                    <motion.button
                        type="submit"
                        className="btn btn-primary"
                        style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}
                        disabled={submitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                    >
                        <Send size={18} />
                        {submitting ? 'Creating...' : 'Create Scenario'}
                    </motion.button>
                </form>
            </Modal>
        </div>
    );
};

export default Scenarios;
