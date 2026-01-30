import { useState } from 'react';
import { scriptsAPI } from '../services/api';
import Button from '../components/common/Button';

const ScriptGenerator = () => {
    const [situation, setSituation] = useState('');
    const [tone, setTone] = useState('calm');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [copied, setCopied] = useState(false);

    const tones = [
        { id: 'calm', label: '🧘 Calm', description: 'Gentle and understanding' },
        { id: 'assertive', label: '💪 Assertive', description: 'Direct and clear' },
        { id: 'friendly', label: '😊 Friendly', description: 'Warm and approachable' },
        { id: 'firm', label: '🎯 Firm', description: 'Professional and serious' }
    ];

    const handleGenerate = async (e) => {
        e.preventDefault();
        if (!situation.trim()) return;

        setLoading(true);
        setCopied(false);
        try {
            const response = await scriptsAPI.generate({ situation, tone });
            setResult(response.data.data);
        } catch (error) {
            console.error('Error generating script:', error);
            alert('Failed to generate script. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const copyFullScript = () => {
        if (result) {
            navigator.clipboard.writeText(result.fullScript);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const exampleSituations = [
        "I was charged for something I didn't order",
        "Someone cut in front of me in line",
        "The employee gave wrong information to customers",
        "I noticed a safety hazard that no one addressed",
        "The service I received was not what was promised"
    ];

    return (
        <div className="script-generator" style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="generator-container">
                <div className="section-header">
                    <h1 className="section-title">
                        ⚡ Quick Help Generator
                    </h1>
                    <p className="section-subtitle">
                        Describe your situation and get an instant script to help you speak up
                    </p>
                </div>

                {/* Generator Form */}
                <form className="generator-form" onSubmit={handleGenerate}>
                    <div className="form-group">
                        <label className="form-label">What's the situation?</label>
                        <textarea
                            className="form-textarea"
                            placeholder="Describe what happened or what you need to address..."
                            value={situation}
                            onChange={(e) => setSituation(e.target.value)}
                            required
                        />
                        <div style={{
                            marginTop: '1rem',
                            padding: '1rem',
                            background: 'rgba(99, 102, 241, 0.08)',
                            borderRadius: '1rem',
                            border: '1px solid rgba(99, 102, 241, 0.15)'
                        }}>
                            <div style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.5rem',
                                marginBottom: '0.75rem',
                                color: 'var(--primary-400)',
                                fontWeight: '600',
                                fontSize: '0.85rem'
                            }}>
                                💡 Quick examples:
                            </div>
                            <div style={{
                                display: 'flex',
                                flexWrap: 'wrap',
                                gap: '0.5rem'
                            }}>
                                {exampleSituations.map((ex, i) => (
                                    <button
                                        key={i}
                                        type="button"
                                        onClick={() => setSituation(ex)}
                                        style={{
                                            padding: '0.5rem 0.875rem',
                                            fontSize: '0.8rem',
                                            borderRadius: '2rem',
                                            background: 'rgba(255, 255, 255, 0.06)',
                                            border: '1px solid rgba(255, 255, 255, 0.12)',
                                            color: 'var(--text-secondary)',
                                            cursor: 'pointer',
                                            transition: 'all 0.2s ease',
                                            whiteSpace: 'normal',
                                            textAlign: 'left',
                                            lineHeight: '1.4'
                                        }}
                                        onMouseOver={(e) => {
                                            e.target.style.background = 'rgba(99, 102, 241, 0.2)';
                                            e.target.style.borderColor = 'rgba(99, 102, 241, 0.4)';
                                            e.target.style.color = 'white';
                                        }}
                                        onMouseOut={(e) => {
                                            e.target.style.background = 'rgba(255, 255, 255, 0.06)';
                                            e.target.style.borderColor = 'rgba(255, 255, 255, 0.12)';
                                            e.target.style.color = 'var(--text-secondary)';
                                        }}
                                    >
                                        {ex}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">Choose your tone</label>
                        <div className="tone-options">
                            {tones.map((t) => (
                                <label
                                    key={t.id}
                                    className={`tone-option ${tone === t.id ? 'active' : ''}`}
                                >
                                    <input
                                        type="radio"
                                        name="tone"
                                        value={t.id}
                                        checked={tone === t.id}
                                        onChange={(e) => setTone(e.target.value)}
                                    />
                                    <div>
                                        <strong>{t.label}</strong>
                                        <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                                            {t.description}
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        variant="primary"
                        size="lg"
                        disabled={loading || !situation.trim()}
                        style={{ width: '100%' }}
                    >
                        {loading ? '⏳ Generating...' : '✨ Generate My Script'}
                    </Button>
                </form>

                {/* Result */}
                {result && (
                    <div className="script-result animate-fadeIn">
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                            <h3 style={{ margin: 0 }}>Your Confidence Script</h3>
                            <Button
                                variant={copied ? 'primary' : 'secondary'}
                                size="sm"
                                onClick={copyFullScript}
                            >
                                {copied ? '✓ Copied!' : '📋 Copy All'}
                            </Button>
                        </div>

                        {/* Full Script */}
                        <div className="script-section">
                            <div className="script-section-title">What to Say</div>
                            <p className="script-text">{result.fullScript}</p>
                        </div>

                        {/* Quick Reminders */}
                        <div className="script-section">
                            <div className="script-section-title">Quick Reminders</div>
                            <div className="script-tips">
                                {result.quickReminders.map((reminder, i) => (
                                    <span key={i} className="script-tip">{reminder}</span>
                                ))}
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="script-section">
                            <div className="script-section-title">💡 Tips</div>
                            <div className="script-tips">
                                {result.tips.map((tip, i) => (
                                    <span key={i} className="script-tip" style={{ background: 'var(--primary-500)' }}>{tip}</span>
                                ))}
                            </div>
                        </div>

                        {/* Body Language */}
                        <div className="script-section">
                            <div className="script-section-title">🧍 Body Language</div>
                            <div className="script-tips">
                                {result.bodyLanguageTips.map((tip, i) => (
                                    <span key={i} className="script-tip" style={{ background: 'var(--accent-500)' }}>{tip}</span>
                                ))}
                            </div>
                        </div>

                        {/* What NOT to do */}
                        <div className="script-section">
                            <div className="script-section-title">❌ Avoid</div>
                            <div className="script-tips">
                                {result.doNot.map((item, i) => (
                                    <span key={i} className="script-tip script-donot">{item}</span>
                                ))}
                            </div>
                        </div>

                        {/* Encouragement */}
                        <div style={{
                            marginTop: '2rem',
                            padding: '1.5rem',
                            background: 'var(--gradient-calm)',
                            borderRadius: 'var(--radius-lg)',
                            textAlign: 'center'
                        }}>
                            <p style={{ margin: 0, fontSize: '1.1rem', color: 'var(--text-primary)' }}>
                                💪 <strong>You've got this!</strong> Speaking up helps everyone — including you.
                            </p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ScriptGenerator;
