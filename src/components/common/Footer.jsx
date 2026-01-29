import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mic, XCircle, CheckCircle } from './IconMap';

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <footer className="footer">
            <motion.div
                className="footer-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={containerVariants}
            >
                <motion.div variants={itemVariants}>
                    <div className="footer-brand">
                        <motion.span
                            whileHover={{ scale: 1.1, rotate: 10 }}
                            transition={{ type: "spring", stiffness: 400 }}
                        >
                            <Mic size={24} />
                        </motion.span>
                        <span>SpeakUp</span>
                    </div>
                    <p className="footer-description">
                        Helping people speak up confidently in public situations.
                        Find your voice, overcome hesitation, and make your words count.
                    </p>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h4 className="footer-title">Quick Links</h4>
                    <div className="footer-links">
                        <Link to="/" className="footer-link">Home</Link>
                        <Link to="/scenarios" className="footer-link">Scenarios</Link>
                        <Link to="/generate" className="footer-link">Quick Help</Link>
                        <Link to="/tips" className="footer-link">Tips</Link>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h4 className="footer-title">Resources</h4>
                    <div className="footer-links">
                        <Link to="/tips?category=mindset" className="footer-link">Mindset Tips</Link>
                        <Link to="/tips?category=body-language" className="footer-link">Body Language</Link>
                        <Link to="/tips?category=tone" className="footer-link">Tone & Voice</Link>
                    </div>
                </motion.div>

                <motion.div variants={itemVariants}>
                    <h4 className="footer-title">Our Promise</h4>
                    <div className="footer-links">
                        <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <XCircle size={16} style={{ color: '#f87171' }} />
                            No shaming anyone
                        </span>
                        <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <XCircle size={16} style={{ color: '#f87171' }} />
                            No recording
                        </span>
                        <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <XCircle size={16} style={{ color: '#f87171' }} />
                            No conflict escalation
                        </span>
                        <span className="footer-link" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                            <CheckCircle size={16} style={{ color: '#48bb78' }} />
                            Only confidence
                        </span>
                    </div>
                </motion.div>
            </motion.div>

            <motion.div
                className="footer-bottom"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
            >
                <p>© {new Date().getFullYear()} SpeakUp. Built to help you find your voice.</p>
            </motion.div>
        </footer>
    );
};

export default Footer;
