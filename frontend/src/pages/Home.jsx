import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
    const features = [
        {
            icon: '🎯',
            title: 'High Accuracy',
            description: '73.21% test accuracy with Random Forest model',
        },
        {
            icon: '⚡',
            title: 'Fast Predictions',
            description: 'Get instant cardiovascular risk assessment',
        },
        {
            icon: '📊',
            title: 'Data-Driven',
            description: 'Trained on 68,547 real patient records',
        },
        {
            icon: '🔒',
            title: 'Privacy First',
            description: 'Your data is processed locally and securely',
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                type: 'spring',
                stiffness: 100,
            },
        },
    };

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative overflow-hidden bg-gradient-to-br from-primary-50 via-white to-secondary-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-20 px-4">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="text-center"
                    >
                        <motion.h1
                            className="text-5xl md:text-7xl font-bold mb-6"
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <span className="gradient-text">Cardiovascular Disease</span>
                            <br />
                            <span className="text-gray-800 dark:text-gray-200">Prediction System</span>
                        </motion.h1>

                        <motion.p
                            className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            Advanced machine learning model to predict cardiovascular disease risk
                            with <span className="font-bold text-primary-600 dark:text-primary-400">73.21% accuracy</span>
                        </motion.p>

                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                        >
                            <Link to="/predict" className="btn-gradient">
                                Try Prediction Now
                            </Link>
                            <Link to="/model-info" className="btn-outline">
                                Learn More
                            </Link>
                        </motion.div>
                    </motion.div>

                    {/* Floating Stats */}
                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto"
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {[
                            { label: 'Test Accuracy', value: '73.21%' },
                            { label: 'Training Samples', value: '54,837' },
                            { label: 'Features Used', value: '12' },
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="stat-card"
                            >
                                <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">
                                    {stat.value}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-primary-300 dark:bg-primary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse-slow"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-secondary-300 dark:bg-secondary-900 rounded-full mix-blend-multiply dark:mix-blend-soft-light filter blur-3xl opacity-20 animate-pulse-slow animation-delay-400"></div>
            </section>

            {/* Features Section */}
            <section className="py-20 px-4 bg-white dark:bg-gray-900">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                            Why Choose Our System?
                        </h2>
                        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                            Built with cutting-edge machine learning technology and trained on extensive medical data
                        </p>
                    </motion.div>

                    <motion.div
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                className="feature-card"
                            >
                                <div className="text-5xl mb-4">{feature.icon}</div>
                                <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">
                                    {feature.title}
                                </h3>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {feature.description}
                                </p>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-secondary-600 dark:from-primary-800 dark:to-secondary-800">
                <motion.div
                    className="max-w-4xl mx-auto text-center text-white"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Ready to Check Your Heart Health?
                    </h2>
                    <p className="text-xl mb-8 opacity-90">
                        Get your cardiovascular risk assessment in seconds
                    </p>
                    <Link
                        to="/predict"
                        className="inline-block bg-white text-primary-600 font-bold py-4 px-10 rounded-xl shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                        Start Prediction
                    </Link>
                </motion.div>
            </section>

            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gray-800 py-8 px-4">
                <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
                    <p className="mb-2">
                        <strong>Disclaimer:</strong> This tool is for educational purposes only and should not replace professional medical advice.
                    </p>
                    <p className="text-sm">
                        Developed by Priyanshu Choudhary | Roll No: 23010101052
                    </p>
                    <p className="text-sm mt-2">
                        ML & DL Project | Darshan University
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
