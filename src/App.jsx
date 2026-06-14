import { useState, useRef } from 'react';
import styles from './App.module.css';

function App() {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [repeatPassword, setRepeatPassword] = useState('');
	const [emailError, setEmailError] = useState(null);
	const [passwordError, setPasswordError] = useState(null);
	const [repeatPasswordError, setRepeatPasswordError] = useState(null);

	const submitButtonRef = useRef(null);

	const isFormValid =
		email !== '' &&
		password !== '' &&
		repeatPassword !== '' &&
		emailError === null &&
		passwordError === null &&
		repeatPasswordError === null;

	const checkFormAndFocus = (
		curEmail,
		curPassword,
		curRepeatPassword,
		curEmailError,
		curPasswordError,
		curRepeatPasswordError,
	) => {
		setTimeout(() => {
			const isValid =
				curEmail !== '' &&
				curPassword !== '' &&
				curRepeatPassword !== '' &&
				curEmailError === null &&
				curPasswordError === null &&
				curRepeatPasswordError === null;

			if (isValid && submitButtonRef.current) {
				submitButtonRef.current.focus();
			}
		}, 0);
	};

	const onRepeatPasswordChange = ({ target }) => {
		const newRepeatPassword = target.value;

		setRepeatPassword(newRepeatPassword);

		let error = null;

		if (target.value === '') {
			error = 'Пароль не должен быть пустым';
		} else if (password !== newRepeatPassword) {
			error = 'Пароли не совпадают';
		}
		setRepeatPasswordError(error);

		checkFormAndFocus(
			email,
			password,
			newRepeatPassword,
			emailError,
			passwordError,
			error,
		);
	};

	const onPasswordChange = ({ target }) => {
		setPassword(target.value);

		let error = null;

		if (target.value === '') {
			error = 'Пароль не должен быть пустым';
		} else if (!/^[\w_]*$/.test(target.value)) {
			error = 'Должен состоять из латиницы. Не допустимые символы.';
		} else if (target.value.length !== 8) {
			error = 'Длина пароля должна быть 8 символов.';
		}
		setPasswordError(error);

		if (repeatPassword !== '') {
			if (repeatPassword !== target.value) {
				setRepeatPasswordError('Пароли не совпадают');
			} else {
				setRepeatPasswordError(null);
			}
		}

		checkFormAndFocus(
			email,
			target.value,
			repeatPassword,
			emailError,
			error,
			repeatPasswordError,
		);
	};

	const onEmailChange = ({ target }) => {
		setEmail(target.value);

		let error = null;

		if (target.value === '') {
			error = 'Email не должен быть пустой строкой';
		} else if (!/^[^\s@]+@[^\s@]+\.[^\s@]*$/.test(target.value)) {
			error = 'Email должен быть в формате user@example.com';
		}
		setEmailError(error);

		checkFormAndFocus(
			target.value,
			password,
			repeatPassword,
			error,
			passwordError,
			repeatPasswordError,
		);
	};

	const onSubmit = event => {
		event.preventDefault();
		console.log({ email, password, repeatPassword });
	};

	return (
		<div className={styles.app}>
			<form onSubmit={onSubmit}>
				{emailError && <div className={styles.errorLabel}>{emailError}</div>}
				{passwordError && (
					<div className={styles.errorLabel}>{passwordError}</div>
				)}
				{repeatPasswordError && (
					<div className={styles.errorLabel}>{repeatPasswordError}</div>
				)}
				<input
					className={styles.inputApp}
					type="email"
					name="email"
					value={email}
					placeholder="Почта пользователя..."
					onChange={onEmailChange}
				/>
				<input
					className={styles.inputApp}
					type="password"
					name="password"
					value={password}
					placeholder="Пароль..."
					onChange={onPasswordChange}
				/>
				<input
					className={styles.inputApp}
					type="password"
					name="repeatPassword"
					value={repeatPassword}
					placeholder="Подтвердить пароль..."
					onChange={onRepeatPasswordChange}
				/>
				<button ref={submitButtonRef} type="submit" disabled={!isFormValid}>
					Зарегистрироваться
				</button>
			</form>
		</div>
	);
}

export default App;
