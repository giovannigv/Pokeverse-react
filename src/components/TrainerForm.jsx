import { useState, useEffect } from 'react';
import { usePokeverse, ACTIONS } from '../context/PokeverseContext';

import styles from './TrainerForm.module.css';

const regions = ['Kanto', 'Johto', 'Hoenn', 'Sinnoh'];
const types = ['Fire', 'Water', 'Grass', 'Electric', 'Psychic'];

function TrainerForm({ isOpen, setIsOpen }) {

    const { state, dispatch } = usePokeverse();

    const [form, setForm] = useState({
        name: state.trainer?.name || '',
        email: state.trainer?.email || '',
        region: state.trainer?.region || '',
        favoriteType: state.trainer?.favoriteType || '',
        acceptTerms: state.trainer?.acceptTerms || false
    });

    const [saved, setSaved] = useState(false);

    useEffect(() => {
        if (!saved) return;
        const timer = setTimeout(() => { setSaved(false); setIsOpen(false) }, 2000);
        return () => clearTimeout(timer);
    }, [saved, setIsOpen]);

    const [errors, setErrors] = useState({});

    function handleChange(e) {
        const { name, value, type, checked } = e.target;
        setForm(prevForm => ({ ...prevForm, [name]: type === 'checkbox' ? checked : value }));
    }

    function validate() {
        const errors = {}
        if (!form.name.trim()) errors.name = 'Name is required'
        if (!form.email.trim()) errors.email = 'Email is required'
        else if (!/\S+@\S+\.\S+/.test(form.email)) errors.email = 'Email is invalid'
        if (!form.region) errors.region = 'Region is required'
        if (!form.favoriteType) errors.favoriteType = 'Favorite type is required'
        if (!form.acceptTerms) errors.acceptTerms = 'You must accept the terms'
        return errors;
    }

    function handleSubmit(e) {
        e.preventDefault();

        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        setErrors({});
        dispatch({ type: ACTIONS.SET_TRAINER, payload: form });
        setSaved(true);
    }

    return (
        <div className={styles.overlay}>
            <div className={styles.card}>

                <div className={styles.formHeader}>
                    <h2 className={styles.formTitle}>🏋️ Trainer Profile</h2>
                    <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>✕</button>
                </div>

                {saved && (
                    <div className={styles.successMsg}>
                        ✅ Profile saved!
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className={styles.field}>
                        <label className={styles.label}>Trainer Name</label>
                        <input
                            className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                            name="name" type="text" value={form.name} onChange={handleChange}
                        />
                        {errors.name && <span className={styles.errorMsg}>⚠️ {errors.name}</span>}
                    </div>
                    <div className={styles.field}>
                        <label className={styles.label}>Email</label>
                        <input
                            className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                            name="email" type="email" value={form.email} onChange={handleChange}
                        />
                        {errors.email && <span className={styles.errorMsg}>⚠️ {errors.email}</span>}
                    </div>

                    {/* Select */}
                    <div className={styles.field}>
                        <label className={styles.label}>Region</label>
                        <select className={styles.select} name="region" value={form.region} onChange={handleChange}>
                            <option value="">Select a region</option>
                            {regions.map(r => <option key={r} value={r}>{r}</option>)}
                        </select>
                        {errors.region && <span className={styles.errorMsg}>⚠️ {errors.region}</span>}
                    </div>

                    {/* Radio */}
                    <div className={styles.field}>
                        <label className={styles.label}>Favorite Type</label>
                        <div className={styles.radioGroup}>
                            {types.map(type => (
                                <label
                                    key={type}
                                    className={`${styles.radioLabel} ${form.favoriteType === type ? styles.radioLabelActive : ''}`}
                                >
                                    <input
                                        type="radio" name="favoriteType"
                                        value={type} checked={form.favoriteType === type}
                                        onChange={handleChange}
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                        {errors.favoriteType && <span className={styles.errorMsg}>⚠️ {errors.favoriteType}</span>}
                    </div>

                    {/* Checkbox */}
                    <div className={styles.field}>
                        <label className={styles.checkboxLabel}>
                            <input type="checkbox" name="acceptTerms"
                                checked={form.acceptTerms} onChange={handleChange}
                            />
                            I accept the Pokémon League rules
                        </label>
                        {errors.acceptTerms && <span className={styles.errorMsg}>⚠️ {errors.acceptTerms}</span>}
                    </div>

                    <button type="submit" className={styles.submitBtn}>
                        Save Profile
                    </button>
                </form>
            </div>
        </div>
    );
}

export default TrainerForm;