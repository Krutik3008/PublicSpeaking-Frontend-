import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { scriptsAPI } from '../services/api';
import Card from '../components/common/Card';
import Loading from '../components/common/Loading';

const Profile = () => {
    const { user, logout, isAuthenticated, loading: authLoading } = useAuth();
    const [savedScripts, setSavedScripts] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            navigate('/login');
        }
    }, [authLoading, isAuthenticated, navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            fetchSavedScripts();
        }
    }, [isAuthenticated]);

    const fetchSavedScripts = async () => {
        try {
            const response = await scriptsAPI.getSaved();
            setSavedScripts(response.data.data);
        } catch (error) {
            console.error('Error fetching saved scripts:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUnsave = async (scriptId) => {
        try {
            await scriptsAPI.unsave(scriptId);
            setSavedScripts(savedScripts.filter(s => s._id !== scriptId));
        } catch (error) {
            console.error('Error removing script:', error);
        }
    };

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    if (authLoading) {
        return <Loading />;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div style={{ paddingTop: '100px', minHeight: '100vh' }}>
            <div className="container">
                {/* Profile Header */}
                <div style={{
                    background: 'var(--gradient-primary)',
                    borderRadius: 'var(--radius-2xl)',
                    padding: 'var(--space-10)',
                    color: 'white',
                    marginBottom: 'var(--space-8)'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>👋</div>
                            <h1 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: '0.5rem' }}>
                                Hello, {user?.name}!
                            </h1>
                            <p style={{ opacity: 0.9 }}>{user?.email}</p>
                        </div>
                        <button
                            className="btn btn-secondary"
                            onClick={handleLogout}
                        >
                            Logout
                        </button>
                    </div>
                </div>

                {/* Stats */}
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                    gap: 'var(--space-6)',
                    marginBottom: 'var(--space-10)'
                }}>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem' }}>📝</div>
                            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', color: 'var(--primary-600)' }}>
                                {savedScripts.length}
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>Saved Scripts</div>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem' }}>🎯</div>
                            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', color: 'var(--success-600)' }}>
                                Ready
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>To Speak Up</div>
                        </div>
                    </Card>
                    <Card>
                        <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: '3rem' }}>💪</div>
                            <div style={{ fontSize: 'var(--font-size-3xl)', fontWeight: '700', color: 'var(--accent-600)' }}>
                                Growing
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>Your Confidence</div>
                        </div>
                    </Card>
                </div>

                {/* Saved Scripts */}
                <div className="section-header" style={{ marginBottom: 'var(--space-6)' }}>
                    <h2 className="section-title">Your Saved Scripts</h2>
                    <p className="section-subtitle">
                        Quick access to your favorite scripts for speaking up
                    </p>
                </div>

                {loading ? (
                    <Loading />
                ) : savedScripts.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-state-icon">📝</div>
                        <h3 className="empty-state-title">No saved scripts yet</h3>
                        <p>Browse scenarios and save scripts you find helpful</p>
                        <button
                            className="btn btn-primary"
                            style={{ marginTop: '1rem' }}
                            onClick={() => navigate('/scenarios')}
                        >
                            Browse Scenarios
                        </button>
                    </div>
                ) : (
                    <div className="scenarios-grid">
                        {savedScripts.map((script) => (
                            <Card key={script._id}>
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '1rem' }}>
                                    <span className="card-badge">{script.tone} tone</span>
                                    <button
                                        className="btn btn-ghost btn-sm"
                                        onClick={() => handleUnsave(script._id)}
                                        title="Remove from saved"
                                    >
                                        ❌
                                    </button>
                                </div>
                                <h3 className="card-title" style={{ fontSize: '1rem' }}>
                                    {script.scenario?.title || 'Custom Script'}
                                </h3>
                                <p className="card-description" style={{ marginTop: '0.5rem' }}>
                                    "{script.openingLine}"
                                </p>
                                <button
                                    className="btn btn-secondary btn-sm"
                                    style={{ marginTop: '1rem', width: '100%' }}
                                    onClick={() => {
                                        navigator.clipboard.writeText(`${script.openingLine} ${script.bodyScript} ${script.closingLine}`);
                                        alert('Script copied!');
                                    }}
                                >
                                    📋 Copy Script
                                </button>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Quick Actions */}
                <div style={{
                    marginTop: 'var(--space-12)',
                    padding: 'var(--space-8)',
                    background: 'var(--bg-light)',
                    borderRadius: 'var(--radius-2xl)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Need help right now?</h3>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn-primary"
                            onClick={() => navigate('/generate')}
                        >
                            ⚡ Quick Help Generator
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/scenarios')}
                        >
                            📚 Browse Scenarios
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/tips')}
                        >
                            💡 Read Tips
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
