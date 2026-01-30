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
        <div style={{ paddingTop: '100px', paddingBottom: '20px', minHeight: '100vh' }}>
            <div className="container">
                {/* Profile Header */}
                {/* Profile Header */}
                <div style={{
                    background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, rgba(139, 92, 246, 0.1) 100%)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '2rem',
                    padding: '2.5rem',
                    marginBottom: '2rem',
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden'
                }}>
                    <div style={{ position: 'relative', zIndex: 1 }}>
                        <div style={{
                            fontSize: '3rem',
                            marginBottom: '1rem',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: '80px',
                            height: '80px',
                            background: 'rgba(255, 255, 255, 0.05)',
                            borderRadius: '50%',
                            border: '1px solid rgba(255, 255, 255, 0.1)'
                        }}>
                            👋
                        </div>
                        <h1 style={{
                            fontSize: '2rem',
                            fontWeight: '800',
                            marginBottom: '0.5rem',
                            background: 'linear-gradient(to right, #fff, #a5b4fc)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent'
                        }}>
                            Hello, {user?.name}!
                        </h1>
                        <p style={{
                            color: 'var(--text-secondary)',
                            fontSize: '1.1rem',
                            marginBottom: '1.5rem'
                        }}>
                            {user?.email}
                        </p>
                        <button
                            onClick={handleLogout}
                            style={{
                                background: 'rgba(239, 68, 68, 0.15)',
                                color: '#f87171',
                                border: '1px solid rgba(239, 68, 68, 0.3)',
                                padding: '0.75rem 2rem',
                                borderRadius: '1rem',
                                fontSize: '1rem',
                                fontWeight: '600',
                                cursor: 'pointer',
                                transition: 'all 0.2s ease',
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '0.5rem'
                            }}
                            onMouseOver={(e) => {
                                e.target.style.background = 'rgba(239, 68, 68, 0.25)';
                                e.target.style.transform = 'translateY(-2px)';
                            }}
                            onMouseOut={(e) => {
                                e.target.style.background = 'rgba(239, 68, 68, 0.15)';
                                e.target.style.transform = 'none';
                            }}
                        >
                            Log Out
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
                                Crafting
                            </div>
                            <div style={{ color: 'var(--text-secondary)' }}>Your Story</div>
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



                {/* Quick Actions */}
                <div style={{
                    marginTop: 'var(--space-12)',
                    marginBottom: 'var(--space-12)',
                    padding: 'var(--space-8)',
                    background: 'rgba(255, 255, 255, 0.05)',
                    backdropFilter: 'blur(10px)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: 'var(--radius-2xl)',
                    textAlign: 'center'
                }}>
                    <h3 style={{ marginBottom: '1rem' }}>Need help right now?</h3>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/generate')}
                            style={{ minWidth: '200px' }}
                        >
                            ⚡ Quick Help Generator
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/scenarios')}
                            style={{ minWidth: '200px' }}
                        >
                            📚 Browse Scenarios
                        </button>
                        <button
                            className="btn btn-secondary"
                            onClick={() => navigate('/tips')}
                            style={{ minWidth: '200px' }}
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
