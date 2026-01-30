import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { Mic, Menu, X, LogOut, LogIn, UserPlus, User, Shield } from './IconMap';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const location = useLocation();
    const { user, logout, isAuthenticated } = useAuth();

    const isActive = (path) => location.pathname === path;

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/scenarios', label: 'Scenarios' },
        { path: '/generate', label: 'Quick Help' },
        { path: '/tools', label: 'Tools' },
        { path: '/stories', label: 'Stories' },
        { path: '/tips', label: 'Tips' },
    ];

    return (
        <motion.nav
            className="navbar"
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 20 }}
        >
            <div className="navbar-container">
                <Link to="/" className="navbar-logo">
                    <motion.span
                        className="navbar-logo-icon"
                        whileHover={{ scale: 1.1, rotate: 10 }}
                        transition={{ type: "spring", stiffness: 400 }}
                    >
                        <Mic size={28} strokeWidth={2.5} />
                    </motion.span>
                    <span className="text-gradient">SpeakUp</span>
                </Link>

                <Link to="/emergency" style={{
                    marginLeft: '1rem',
                    background: '#ef4444',
                    color: 'white',
                    padding: '0.25rem 0.75rem',
                    borderRadius: '999px',
                    fontSize: '0.75rem',
                    fontWeight: 'bold',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    textDecoration: 'none',
                    border: '1px solid rgba(255,255,255,0.2)'
                }}>
                    <Shield size={12} fill="white" />
                    HELP NOW
                </Link>

                <motion.button
                    className="navbar-mobile-toggle"
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Toggle menu"
                    whileTap={{ scale: 0.9 }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.span
                                key="close"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <X size={24} />
                            </motion.span>
                        ) : (
                            <motion.span
                                key="menu"
                                initial={{ rotate: 90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: -90, opacity: 0 }}
                                transition={{ duration: 0.2 }}
                            >
                                <Menu size={24} />
                            </motion.span>
                        )}
                    </AnimatePresence>
                </motion.button>

                <div className={`navbar-nav ${isOpen ? 'open' : ''}`}>
                    {navLinks.map((link, index) => (
                        <motion.div
                            key={link.path}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Link
                                to={link.path}
                                className={`navbar-link ${isActive(link.path) ? 'active' : ''}`}
                                onClick={() => setIsOpen(false)}
                                style={{
                                    display: 'block',
                                    padding: '0.75rem 1rem',
                                    borderRadius: '0.75rem',
                                    background: isActive(link.path) ? 'rgba(99, 102, 241, 0.2)' : 'transparent'
                                }}
                            >
                                {link.label}
                            </Link>
                        </motion.div>
                    ))}

                    {/* Mobile-only auth links */}
                    {isOpen && (
                        <motion.div
                            className="mobile-auth-links"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '0.75rem',
                                paddingTop: '1.25rem',
                                marginTop: '1rem',
                                borderTop: '1px solid rgba(255, 255, 255, 0.15)'
                            }}>
                            {isAuthenticated ? (
                                <>
                                    <Link
                                        to="/profile"
                                        onClick={() => setIsOpen(false)}
                                        className="mobile-user-greeting"
                                        style={{ textDecoration: 'none', cursor: 'pointer' }}
                                    >
                                        <div className="user-avatar">
                                            {user?.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <span>Hi, {user?.name?.split(' ')[0] || 'User'}</span>
                                    </Link>
                                    <button
                                        onClick={() => { logout(); setIsOpen(false); }}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            background: 'rgba(239, 68, 68, 0.15)',
                                            border: '1px solid rgba(239, 68, 68, 0.3)',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '0.75rem',
                                            cursor: 'pointer',
                                            color: '#f87171',
                                            fontWeight: '500',
                                            width: '100%',
                                            fontSize: '1rem'
                                        }}>
                                        <LogOut size={20} /> Logout
                                    </button>
                                </>
                            ) : (
                                <>
                                    <Link
                                        to="/login"
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '0.75rem',
                                            background: 'rgba(255, 255, 255, 0.05)',
                                            color: 'white',
                                            fontWeight: '500'
                                        }}>
                                        <LogIn size={20} /> Login
                                    </Link>
                                    <Link
                                        to="/register"
                                        onClick={() => setIsOpen(false)}
                                        style={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            gap: '0.75rem',
                                            padding: '0.75rem 1rem',
                                            borderRadius: '0.75rem',
                                            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                                            color: 'white',
                                            fontWeight: '600'
                                        }}>
                                        <UserPlus size={20} /> Sign Up
                                    </Link>
                                </>
                            )}
                        </motion.div>
                    )}

                </div>

                <div className="navbar-actions desktop-only">
                    {isAuthenticated ? (
                        <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/profile" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <User size={18} />
                                    Hi, {user?.name?.split(' ')[0]}
                                </Link>
                            </motion.div>
                            <motion.button
                                onClick={logout}
                                className="btn btn-secondary btn-sm"
                                style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <LogOut size={16} />
                                Logout
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/login" className="btn btn-ghost btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <LogIn size={16} />
                                    Login
                                </Link>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                                <Link to="/register" className="btn btn-primary btn-sm" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                    <UserPlus size={16} />
                                    Sign Up
                                </Link>
                            </motion.div>
                        </>
                    )}
                </div>
            </div>
        </motion.nav>
    );
};

export default Navbar;
