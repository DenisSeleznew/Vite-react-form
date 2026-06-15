import styles from './InputField.module.css';

function InputField({ type, name, value, onChange, placeholder, error }) {
	return (
		<div className={styles.field}>
			<input
				className={styles.input}
				type={type}
				name={name}
				value={value}
				onChange={onChange}
				placeholder={placeholder}
			/>
			{error && <div className={styles.error}>{error}</div>}
		</div>
	);
}

export default InputField;
