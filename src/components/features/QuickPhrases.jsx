import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { toolsAPI } from '../../services/api';
import {
    BookOpen,
    Rocket,
    MessageSquare,
    Users,
    CheckCircle,
    Copy,
    Check
} from '../common/IconMap';

const QuickPhrases = () => {
    const [copiedIndex, setCopiedIndex] = useState(null);
    const [phrases, setPhrases] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPhrases = async () => {
            try {
                const response = await toolsAPI.getPhrases();
                setPhrases(response.data.data);
            } catch (error) {
                console.error('Error fetching phrases:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchPhrases();
    }, []);

    const groupedPhrases = phrases.reduce((acc, phrase) => {
        if (!acc[phrase.category]) {
            acc[phrase.category] = {
                title: phrase.category,
                icon: phrase.icon === 'Rocket' ? Rocket :
                    phrase.icon === 'MessageSquare' ? MessageSquare :
                        phrase.icon === 'Users' ? Users : CheckCircle,
                phrases: []
            };
        }
        acc[phrase.category].phrases.push(phrase.text);
        return acc;
    }, {});

    const displayCategories = Object.values(groupedPhrases);

    const copyPhrase = (phrase, index) => {
        navigator.clipboard.writeText(phrase);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    if (loading) return <div>Loading phrases...</div>;

    return (
        <motion.div
            className="glass"
            style={{
                width: '100%',
                padding: 'var(--space-6)'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
        >
            <h3 style={{ marginBottom: 'var(--space-2)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                <BookOpen size={24} />
                Quick Phrases Library
            </h3>
            <p style={{ textAlign: 'center', color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                Click any phrase to copy it instantly
            </p>

            {displayCategories.length > 0 ? displayCategories.map((category, catIndex) => {
                const CategoryIcon = category.icon;
                return (
                    <motion.div
                        key={catIndex}
                        style={{ marginBottom: 'var(--space-6)' }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: catIndex * 0.1 }}
                    >
                        <h4 style={{
                            marginBottom: 'var(--space-3)',
                            fontSize: 'var(--font-size-base)',
                            color: 'var(--primary-600)',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem'
                        }}>
                            <CategoryIcon size={18} />
                            {category.title}
                        </h4>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                            {category.phrases.map((phrase, phraseIndex) => {
                                const globalIndex = `${catIndex}-${phraseIndex}`;
                                const isCopied = copiedIndex === globalIndex;
                                return (
                                    <motion.button
                                        key={phraseIndex}
                                        onClick={() => copyPhrase(phrase, globalIndex)}
                                        style={{
                                            padding: 'var(--space-2) var(--space-3)',
                                            background: isCopied ? 'var(--success-500)' : 'rgba(255, 255, 255, 0.05)',
                                            color: 'white',
                                            border: '1px solid rgba(255, 255, 255, 0.1)',
                                            borderRadius: 'var(--radius-full)',
                                            fontSize: 'var(--font-size-sm)',
                                            cursor: 'pointer',
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.25rem'
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        {isCopied ? (
                                            <>
                                                <Check size={14} />
                                                Copied!
                                            </>
                                        ) : (
                                            phrase
                                        )}
                                    </motion.button>
                                );
                            })}
                        </div>
                    </motion.div>
                );
            }) : <p>No phrases available.</p>}
        </motion.div>
    );
};

export default QuickPhrases;
