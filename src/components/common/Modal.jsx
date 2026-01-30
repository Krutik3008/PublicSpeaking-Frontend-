import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react'; // Import directly to ensure visibility

const Modal = ({ isOpen, onClose, title, children }) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isOpen]);

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    style={{
                        position: 'fixed',
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        background: 'rgba(0, 0, 0, 0.8)',
                        backdropFilter: 'blur(8px)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        zIndex: 1000,
                        padding: '1rem'
                    }}
                    onClick={onClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <motion.div
                        className="modal-content"
                        style={{
                            background: 'var(--bg-primary)',
                            borderRadius: '1.5rem',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
                            border: '1px solid rgba(255, 255, 255, 0.1)',
                            width: '100%',
                            maxWidth: '500px',
                            maxHeight: '90vh',
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                        onClick={(e) => e.stopPropagation()}
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    >
                        {/* Header */}
                        <div
                            className="modal-header"
                            style={{
                                padding: '1.5rem 2rem',
                                borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'space-between',
                                background: 'rgba(255, 255, 255, 0.02)',
                                position: 'relative' // Added for absolute positioning context
                            }}
                        >
                            <h2
                                className="modal-title"
                                style={{
                                    margin: 0,
                                    fontSize: '1.5rem',
                                    fontWeight: '700',
                                    color: 'var(--text-primary)',
                                    paddingRight: '3rem', // Add space for the absolute button
                                    width: '100%'
                                }}
                            >
                                {title}
                            </h2>
                            <motion.button
                                onClick={onClose}
                                style={{
                                    position: 'absolute',
                                    right: '1.25rem',
                                    top: '1.5rem',
                                    background: 'rgba(255, 255, 255, 0.15)',
                                    border: 'none',
                                    borderRadius: '50%',
                                    width: '36px',
                                    height: '36px',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    cursor: 'pointer',
                                    color: 'white',
                                    zIndex: 50
                                }}
                                whileHover={{
                                    scale: 1.1,
                                    background: 'rgba(255, 255, 255, 0.25)',
                                    color: 'white'
                                }}
                                whileTap={{ scale: 0.9 }}
                                transition={{ type: "spring", stiffness: 400 }}
                            >
                                <X size={20} />
                            </motion.button>
                        </div>

                        {/* Content */}
                        <div style={{
                            padding: '2rem',
                            maxHeight: 'calc(90vh - 100px)',
                            overflowY: 'auto'
                        }}>
                            {children}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default Modal;
