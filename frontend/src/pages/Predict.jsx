import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { predict } from '../utils/api';

const Predict = () => {
    const [formData, setFormData] = useState({
        gender: '2',
        height: '',
        weight: '',
        ap_hi: '',
        ap_lo: '',
        cholesterol: '1',
        gluc: '1',
        smoke: '0',
        alco: '0',
        active: '1',
        age_years: '',
        BMI: '',
    });

    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));

        // Auto-calculate BMI when height or weight changes
        if (name === 'height' || name === 'weight') {
            const height = name === 'height' ? parseFloat(value) : parseFloat(formData.height);
            const weight = name === 'weight' ? parseFloat(value) : parseFloat(formData.weight);
            if (height > 0 && weight > 0) {
                const bmi = weight / ((height / 100) ** 2);
                setFormData(prev => ({ ...prev, BMI: bmi.toFixed(2) }));
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setResult(null);

        try {
            // Convert form data to numbers
            const data = {
                gender: parseInt(formData.gender),
                height: parseInt(formData.height),
                weight: parseFloat(formData.weight),
                ap_hi: parseInt(formData.ap_hi),
                ap_lo: parseInt(formData.ap_lo),
                cholesterol: parseInt(formData.cholesterol),
                gluc: parseInt(formData.gluc),
                smoke: parseInt(formData.smoke),
                alco: parseInt(formData.alco),
                active: parseInt(formData.active),
                age_years: parseInt(formData.age_years),
                BMI: parseFloat(formData.BMI),
            };

            const response = await predict(data);
            setResult(response.data);
            setShowModal(true);
        } catch (err) {
            setError(err.response?.data?.detail || 'Failed to get prediction. Please check if the backend server is running.');
        } finally {
            setLoading(false);
        }
    };

    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Cardiovascular Risk Prediction
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Enter your health metrics to get an instant risk assessment
                    </p>
                </motion.div>

                {/* Form */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="glass-card p-8"
                >
                    <form onSubmit={handleSubmit} className="space-y-8">
                        {/* Personal Information */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="text-2xl mr-2">👤</span>
                                Personal Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <div>
                                    <label className="input-label">Gender</label>
                                    <select name="gender" value={formData.gender} onChange={handleChange} className="input-field">
                                        <option value="1">Female</option>
                                        <option value="2">Male</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="input-label">Age (years)</label>
                                    <input
                                        type="number"
                                        name="age_years"
                                        value={formData.age_years}
                                        onChange={handleChange}
                                        min="30"
                                        max="80"
                                        placeholder="e.g., 50"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Height (cm)</label>
                                    <input
                                        type="number"
                                        name="height"
                                        value={formData.height}
                                        onChange={handleChange}
                                        min="100"
                                        max="250"
                                        placeholder="e.g., 168"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Weight (kg)</label>
                                    <input
                                        type="number"
                                        name="weight"
                                        value={formData.weight}
                                        onChange={handleChange}
                                        min="30"
                                        max="200"
                                        step="0.1"
                                        placeholder="e.g., 70"
                                        className="input-field"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Vital Signs */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="text-2xl mr-2">💉</span>
                                Vital Signs
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="input-label">Systolic BP (mmHg)</label>
                                    <input
                                        type="number"
                                        name="ap_hi"
                                        value={formData.ap_hi}
                                        onChange={handleChange}
                                        min="80"
                                        max="200"
                                        placeholder="e.g., 120"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="input-label">Diastolic BP (mmHg)</label>
                                    <input
                                        type="number"
                                        name="ap_lo"
                                        value={formData.ap_lo}
                                        onChange={handleChange}
                                        min="40"
                                        max="140"
                                        placeholder="e.g., 80"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="input-label">BMI (auto-calculated)</label>
                                    <input
                                        type="number"
                                        name="BMI"
                                        value={formData.BMI}
                                        readOnly
                                        placeholder="Auto"
                                        className="input-field bg-gray-100 dark:bg-gray-700"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Medical Indicators */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="text-2xl mr-2">🔬</span>
                                Medical Indicators
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="input-label">Cholesterol Level</label>
                                    <select name="cholesterol" value={formData.cholesterol} onChange={handleChange} className="input-field">
                                        <option value="1">Normal</option>
                                        <option value="2">Above Normal</option>
                                        <option value="3">Well Above Normal</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="input-label">Glucose Level</label>
                                    <select name="gluc" value={formData.gluc} onChange={handleChange} className="input-field">
                                        <option value="1">Normal</option>
                                        <option value="2">Above Normal</option>
                                        <option value="3">Well Above Normal</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Lifestyle Factors */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200 flex items-center">
                                <span className="text-2xl mr-2">🏃</span>
                                Lifestyle Factors
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div>
                                    <label className="input-label">Smoking</label>
                                    <select name="smoke" value={formData.smoke} onChange={handleChange} className="input-field">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="input-label">Alcohol Consumption</label>
                                    <select name="alco" value={formData.alco} onChange={handleChange} className="input-field">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="input-label">Physical Activity</label>
                                    <select name="active" value={formData.active} onChange={handleChange} className="input-field">
                                        <option value="0">No</option>
                                        <option value="1">Yes</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Error Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-red-100 dark:bg-red-900/30 border-l-4 border-red-500 p-4 rounded"
                            >
                                <p className="text-red-700 dark:text-red-400 flex items-center">
                                    <span className="text-xl mr-2">⚠️</span>
                                    {error}
                                </p>
                            </motion.div>
                        )}

                        {/* Submit Button */}
                        <div className="flex justify-center">
                            <motion.button
                                type="submit"
                                disabled={loading}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="btn-gradient px-12 py-4 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <span className="flex items-center">
                                        <div className="spinner mr-3"></div>
                                        Analyzing Your Health Data...
                                    </span>
                                ) : (
                                    <span className="flex items-center">
                                        <span className="text-2xl mr-2">🔍</span>
                                        Get Prediction
                                    </span>
                                )}
                            </motion.button>
                        </div>
                    </form>
                </motion.div>
            </div>

            {/* Results Modal */}
            <AnimatePresence>
                {showModal && result && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                            className="glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Close Button */}
                            <button
                                onClick={closeModal}
                                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                            >
                                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Header */}
                            <div className="text-center mb-8">
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                                    className="text-6xl mb-4"
                                >
                                    {result.risk_level === 'Low Risk' ? '✅' : result.risk_level === 'Moderate Risk' ? '⚠️' : '🚨'}
                                </motion.div>
                                <h2 className="text-3xl font-bold gradient-text mb-2">
                                    Prediction Results
                                </h2>
                                <p className="text-gray-600 dark:text-gray-400">
                                    Based on your health metrics
                                </p>
                            </div>

                            {/* Risk Level Card */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3 }}
                                className={`p-6 rounded-2xl mb-6 text-center ${result.risk_level === 'Low Risk'
                                        ? 'bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20'
                                        : result.risk_level === 'Moderate Risk'
                                            ? 'bg-gradient-to-br from-yellow-100 to-yellow-50 dark:from-yellow-900/30 dark:to-yellow-800/20'
                                            : 'bg-gradient-to-br from-red-100 to-red-50 dark:from-red-900/30 dark:to-red-800/20'
                                    }`}
                            >
                                <div className={`text-3xl font-bold mb-2 ${result.risk_level === 'Low Risk'
                                        ? 'text-green-700 dark:text-green-400'
                                        : result.risk_level === 'Moderate Risk'
                                            ? 'text-yellow-700 dark:text-yellow-400'
                                            : 'text-red-700 dark:text-red-400'
                                    }`}>
                                    {result.risk_level}
                                </div>
                                <p className="text-gray-700 dark:text-gray-300">
                                    Cardiovascular Disease Risk
                                </p>
                            </motion.div>

                            {/* Probability Display */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4 }}
                                className="mb-6"
                            >
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Disease Probability
                                    </span>
                                    <span className="text-2xl font-bold gradient-text">
                                        {result.probability}%
                                    </span>
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${result.probability}%` }}
                                        transition={{ duration: 1, delay: 0.5, ease: 'easeOut' }}
                                        className="h-full bg-gradient-to-r from-primary-500 via-secondary-500 to-primary-600 rounded-full"
                                    />
                                </div>
                            </motion.div>

                            {/* Message */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.6 }}
                                className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl mb-6"
                            >
                                <p className="text-gray-700 dark:text-gray-300 text-center leading-relaxed">
                                    {result.message}
                                </p>
                            </motion.div>

                            {/* Disclaimer */}
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4 text-center"
                            >
                                <strong>Important:</strong> This prediction is for educational purposes only.
                                Always consult with a healthcare professional for medical advice.
                            </motion.div>

                            {/* Action Buttons */}
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.8 }}
                                className="flex gap-4 mt-6"
                            >
                                <button
                                    onClick={closeModal}
                                    className="flex-1 btn-outline"
                                >
                                    Close
                                </button>
                                <button
                                    onClick={() => {
                                        closeModal();
                                        window.scrollTo({ top: 0, behavior: 'smooth' });
                                    }}
                                    className="flex-1 btn-gradient"
                                >
                                    New Prediction
                                </button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Predict;
