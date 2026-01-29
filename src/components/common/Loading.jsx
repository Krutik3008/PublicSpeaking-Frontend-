import { motion } from 'framer-motion';

const Loading = () => {
    return (
        <div className="loading">
            <motion.div
                className="spinner"
                animate={{ rotate: 360 }}
                transition={{
                    duration: 1,
                    repeat: Infinity,
                    ease: "linear"
                }}
            />
        </div>
    );
};

export default Loading;
