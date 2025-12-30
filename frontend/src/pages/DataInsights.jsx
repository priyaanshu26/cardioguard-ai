import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getDataStats } from '../utils/api';

const DataInsights = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStats = async () => {
            try {
                const response = await getDataStats();
                setStats(response.data);
            } catch (error) {
                console.error('Error fetching data stats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchStats();
    }, []);

    const featureDescriptions = {
        gender: 'Patient gender (1: Female, 2: Male)',
        height: 'Height in centimeters',
        weight: 'Weight in kilograms',
        ap_hi: 'Systolic blood pressure (mmHg)',
        ap_lo: 'Diastolic blood pressure (mmHg)',
        cholesterol: 'Cholesterol level (1: Normal, 2: Above normal, 3: Well above normal)',
        gluc: 'Glucose level (1: Normal, 2: Above normal, 3: Well above normal)',
        smoke: 'Smoking status (0: No, 1: Yes)',
        alco: 'Alcohol intake (0: No, 1: Yes)',
        active: 'Physical activity (0: No, 1: Yes)',
        age_years: 'Age in years',
        BMI: 'Body Mass Index (calculated from height and weight)',
    };

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
                        Data Insights
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Explore the dataset used to train our model
                    </p>
                </motion.div>

                <div className="space-y-8">
                    {/* Dataset Overview */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            📊 Dataset Overview
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="text-center p-6 bg-gradient-to-br from-primary-100 to-primary-50 dark:from-primary-900/30 dark:to-primary-800/20 rounded-xl">
                                <div className="text-4xl font-bold text-primary-600 dark:text-primary-400 mb-2">
                                    {stats?.total_samples.toLocaleString()}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300 font-medium">
                                    Total Samples
                                </div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-secondary-100 to-secondary-50 dark:from-secondary-900/30 dark:to-secondary-800/20 rounded-xl">
                                <div className="text-4xl font-bold text-secondary-600 dark:text-secondary-400 mb-2">
                                    {stats?.features.length}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300 font-medium">
                                    Features
                                </div>
                            </div>
                            <div className="text-center p-6 bg-gradient-to-br from-green-100 to-green-50 dark:from-green-900/30 dark:to-green-800/20 rounded-xl">
                                <div className="text-4xl font-bold text-green-600 dark:text-green-400 mb-2">
                                    {stats?.feature_stats.avg_bmi}
                                </div>
                                <div className="text-gray-700 dark:text-gray-300 font-medium">
                                    Average BMI
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Target Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            🎯 Target Distribution
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats?.target_distribution && Object.entries(stats.target_distribution).map(([key, value]) => {
                                const percentage = ((value / stats.total_samples) * 100).toFixed(1);
                                return (
                                    <div key={key} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                {key}
                                            </span>
                                            <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                                                {value.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.5 }}
                                                className={`h-full ${key === 'No Disease'
                                                        ? 'bg-gradient-to-r from-green-500 to-green-600'
                                                        : 'bg-gradient-to-r from-red-500 to-red-600'
                                                    }`}
                                            />
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {percentage}% of total samples
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Gender Distribution */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            👥 Gender Distribution
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {stats?.feature_stats.gender_distribution && Object.entries(stats.feature_stats.gender_distribution).map(([key, value]) => {
                                const percentage = ((value / stats.total_samples) * 100).toFixed(1);
                                return (
                                    <div key={key} className="space-y-3">
                                        <div className="flex justify-between items-center">
                                            <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                                                {key}
                                            </span>
                                            <span className="text-2xl font-bold text-secondary-600 dark:text-secondary-400">
                                                {value.toLocaleString()}
                                            </span>
                                        </div>
                                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4 overflow-hidden">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${percentage}%` }}
                                                transition={{ duration: 1, delay: 0.7 }}
                                                className="h-full bg-gradient-to-r from-secondary-500 to-secondary-600"
                                            />
                                        </div>
                                        <div className="text-sm text-gray-600 dark:text-gray-400">
                                            {percentage}% of total samples
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </motion.div>

                    {/* Feature Descriptions */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            📝 Feature Descriptions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {Object.entries(featureDescriptions).map(([feature, description]) => (
                                <div
                                    key={feature}
                                    className="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg hover:shadow-md transition-shadow"
                                >
                                    <h3 className="font-bold text-primary-600 dark:text-primary-400 mb-1">
                                        {feature.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                    </h3>
                                    <p className="text-sm text-gray-600 dark:text-gray-400">
                                        {description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Data Cleaning Steps */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.5 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            🧹 Data Cleaning & Preprocessing
                        </h2>
                        <div className="space-y-4">
                            <div className="flex items-start">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                        Outlier Removal
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Removed unrealistic values for blood pressure, height, and weight
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                        Feature Engineering
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Created age_years from age in days and calculated BMI from height and weight
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                        Data Validation
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Ensured all categorical variables have valid values
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <span className="text-2xl mr-3">✅</span>
                                <div>
                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-1">
                                        Normalization
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-400">
                                        Applied StandardScaler to normalize all features for better model performance
                                    </p>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Additional Stats */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6 }}
                        className="glass-card p-8"
                    >
                        <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200">
                            📈 Additional Statistics
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-blue-100 to-blue-50 dark:from-blue-900/30 dark:to-blue-800/20 p-6 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Age Range
                                </h3>
                                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                                    {stats?.feature_stats.age_range}
                                </p>
                            </div>
                            <div className="bg-gradient-to-br from-purple-100 to-purple-50 dark:from-purple-900/30 dark:to-purple-800/20 p-6 rounded-xl">
                                <h3 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                                    Data Source
                                </h3>
                                <p className="text-lg text-purple-600 dark:text-purple-400">
                                    Cardiovascular Disease Dataset
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default DataInsights;
