import { motion } from 'framer-motion';

const Disclaimer = () => {
    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Disclaimer
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Important information about using this prediction system
                    </p>
                </motion.div>

                <div className="space-y-6">
                    {/* Main Disclaimer */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8 border-l-4 border-red-500"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400 flex items-center">
                            <span className="text-3xl mr-3">⚠️</span>
                            Medical Disclaimer
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            This cardiovascular disease prediction system is designed for <strong>educational and research purposes only</strong>.
                            It should <strong>NOT</strong> be used as a substitute for professional medical advice, diagnosis, or treatment.
                            Always seek the advice of your physician or other qualified health provider with any questions you may have
                            regarding a medical condition.
                        </p>
                    </motion.div>

                    {/* Model Limitations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            🔍 Model Limitations
                        </h2>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-primary-500 mr-2 mt-1">•</span>
                                <span>
                                    The model has a test accuracy of 73.21%, which means it may produce incorrect predictions
                                    in approximately 27% of cases.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-500 mr-2 mt-1">•</span>
                                <span>
                                    The model was trained on a specific dataset and may not generalize well to all populations
                                    or individual cases.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-500 mr-2 mt-1">•</span>
                                <span>
                                    Many important factors for cardiovascular disease risk (such as family history, stress levels,
                                    diet quality, and specific medical conditions) are not included in this model.
                                </span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-primary-500 mr-2 mt-1">•</span>
                                <span>
                                    The predictions are based on statistical patterns and should not be interpreted as definitive
                                    medical diagnoses.
                                </span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Intended Use */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            ✅ Intended Use
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 mb-4">
                            This system is intended for:
                        </p>
                        <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Educational purposes to understand machine learning in healthcare</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Demonstrating the application of Random Forest algorithms</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Academic research and learning about cardiovascular disease prediction</span>
                            </li>
                            <li className="flex items-start">
                                <span className="text-green-500 mr-2 mt-1">✓</span>
                                <span>Understanding the importance of various health metrics</span>
                            </li>
                        </ul>
                    </motion.div>

                    {/* Data Privacy */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            🔒 Data Privacy
                        </h2>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                            All predictions are processed locally on the server and are not stored or shared with third parties.
                            We do not collect, store, or transmit any personal health information. The data you enter is used
                            solely for generating predictions and is discarded immediately after the prediction is made.
                        </p>
                    </motion.div>

                    {/* Recommendations */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            💡 Recommendations
                        </h2>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <p>
                                If you receive a high-risk prediction or have concerns about your cardiovascular health:
                            </p>
                            <ul className="space-y-3">
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">1.</span>
                                    <span>
                                        <strong>Consult a healthcare professional</strong> immediately for proper medical evaluation
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">2.</span>
                                    <span>
                                        <strong>Get comprehensive testing</strong> including ECG, blood tests, and other diagnostic procedures
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">3.</span>
                                    <span>
                                        <strong>Maintain a healthy lifestyle</strong> with regular exercise, balanced diet, and stress management
                                    </span>
                                </li>
                                <li className="flex items-start">
                                    <span className="text-primary-500 mr-2 mt-1">4.</span>
                                    <span>
                                        <strong>Monitor your health metrics</strong> regularly and keep track of changes over time
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </motion.div>

                    {/* Emergency Notice */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-card p-8 bg-red-50 dark:bg-red-900/20 border-2 border-red-300 dark:border-red-700"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400 flex items-center">
                            <span className="text-3xl mr-3">🚨</span>
                            Emergency Notice
                        </h2>
                        <p className="text-gray-800 dark:text-gray-200 leading-relaxed">
                            If you are experiencing symptoms such as chest pain, shortness of breath, severe headache,
                            sudden numbness, or any other medical emergency, <strong>call emergency services immediately</strong>.
                            Do not rely on this prediction system in emergency situations.
                        </p>
                    </motion.div>

                    {/* Contact Information */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.7 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                            📧 Contact Information
                        </h2>
                        <div className="text-gray-700 dark:text-gray-300 space-y-2">
                            <p>
                                <strong>Project Developer:</strong> Priyanshu Choudhary
                            </p>
                            <p>
                                <strong>Roll Number:</strong> 23010101052
                            </p>
                            <p>
                                <strong>Institution:</strong> Darshan University
                            </p>
                            <p>
                                <strong>Course:</strong> ML & DL Project (Semester 6)
                            </p>
                            <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                                For questions about this project, please contact through official university channels.
                            </p>
                        </div>
                    </motion.div>

                    {/* Acknowledgment */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.8 }}
                        className="glass-card p-6 bg-gradient-to-r from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20"
                    >
                        <p className="text-center text-gray-700 dark:text-gray-300">
                            By using this cardiovascular disease prediction system, you acknowledge that you have read,
                            understood, and agree to this disclaimer and its terms.
                        </p>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default Disclaimer;
