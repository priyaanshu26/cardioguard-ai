import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getModelInfo, getMetrics } from '../utils/api';

const ModelInfo = () => {
    const [modelInfo, setModelInfo] = useState(null);
    const [metrics, setMetrics] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [infoRes, metricsRes] = await Promise.all([
                    getModelInfo(),
                    getMetrics()
                ]);
                setModelInfo(infoRes.data);
                setMetrics(metricsRes.data);
            } catch (error) {
                console.error('Error fetching model data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner w-12 h-12 border-4"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen py-12 px-4 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
            <div className="max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 gradient-text">
                        Model Information
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Technical details about our machine learning model
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {/* Model Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            🤖 Model Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">Model Type</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {modelInfo?.model_type}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">Training Samples</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {modelInfo?.training_samples.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">Test Samples</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {modelInfo?.test_samples.toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-600 dark:text-gray-400 mb-2">Number of Features</p>
                                <p className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                                    {modelInfo?.features.length}
                                </p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Hyperparameters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            ⚙️ Hyperparameters
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {modelInfo?.parameters && Object.entries(modelInfo.parameters).map(([key, value]) => (
                                <div key={key} className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg">
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                                        {key.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </p>
                                    <p className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                        {value === null ? 'None' : value.toString()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Performance Metrics */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            📊 Performance Metrics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                            {[
                                { label: 'Test Accuracy', value: metrics?.test_accuracy, color: 'primary' },
                                { label: 'Precision', value: (metrics?.precision * 100).toFixed(2), color: 'secondary' },
                                { label: 'Recall', value: (metrics?.recall * 100).toFixed(2), color: 'primary' },
                                { label: 'F1-Score', value: (metrics?.f1_score * 100).toFixed(2), color: 'secondary' },
                            ].map((metric, index) => (
                                <div key={index} className="text-center">
                                    <div className={`text-4xl font-bold mb-2 ${metric.color === 'primary' ? 'text-primary-600 dark:text-primary-400' : 'text-secondary-600 dark:text-secondary-400'
                                        }`}>
                                        {metric.value}%
                                    </div>
                                    <div className="text-gray-600 dark:text-gray-400 font-medium">
                                        {metric.label}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Confusion Matrix */}
                        <div>
                            <h3 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">
                                Confusion Matrix
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full border-collapse">
                                    <thead>
                                        <tr>
                                            <th className="border border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-800"></th>
                                            <th className="border border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-800 font-semibold">
                                                Predicted: No Disease
                                            </th>
                                            <th className="border border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-800 font-semibold">
                                                Predicted: Has Disease
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-800 font-semibold">
                                                Actual: No Disease
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 p-3 text-center bg-green-100 dark:bg-green-900/30 font-bold text-green-700 dark:text-green-400">
                                                {metrics?.confusion_matrix[0][0].toLocaleString()}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 p-3 text-center bg-red-100 dark:bg-red-900/30 font-bold text-red-700 dark:text-red-400">
                                                {metrics?.confusion_matrix[0][1].toLocaleString()}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td className="border border-gray-300 dark:border-gray-600 p-3 bg-gray-100 dark:bg-gray-800 font-semibold">
                                                Actual: Has Disease
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 p-3 text-center bg-red-100 dark:bg-red-900/30 font-bold text-red-700 dark:text-red-400">
                                                {metrics?.confusion_matrix[1][0].toLocaleString()}
                                            </td>
                                            <td className="border border-gray-300 dark:border-gray-600 p-3 text-center bg-green-100 dark:bg-green-900/30 font-bold text-green-700 dark:text-green-400">
                                                {metrics?.confusion_matrix[1][1].toLocaleString()}
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </motion.div>

                    {/* Features Used */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            📝 Features Used
                        </h2>
                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {modelInfo?.features.map((feature, index) => (
                                <div
                                    key={index}
                                    className="bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 p-4 rounded-lg text-center"
                                >
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Training Methodology */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            🎓 Training Methodology
                        </h2>
                        <div className="space-y-4 text-gray-700 dark:text-gray-300">
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Data Preprocessing</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Removed outliers and invalid data points</li>
                                    <li>Feature engineering: Created age_years and BMI features</li>
                                    <li>StandardScaler normalization applied to all features</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Model Training</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>80/20 train-test split with random_state=42</li>
                                    <li>GridSearchCV for hyperparameter tuning</li>
                                    <li>5-fold cross-validation</li>
                                    <li>Best model selected based on CV accuracy</li>
                                </ul>
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg mb-2">Model Validation</h3>
                                <ul className="list-disc list-inside space-y-1 ml-4">
                                    <li>Train accuracy: {metrics?.train_accuracy}%</li>
                                    <li>Test accuracy: {metrics?.test_accuracy}%</li>
                                    <li>Good balance indicates no overfitting</li>
                                </ul>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default ModelInfo;
