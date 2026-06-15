import InputField from '../InputField/InputField';
import { useState, useRef } from 'react';
import {
	validateEmail,
	validatePassword,
	validateRepeatPassword,
} from '../../validators';
import styles from './RegistrationForm.module.css';

function RegistrationForm() {
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

		const error = validateRepeatPassword(target.value);

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

		const error = validatePassword(target.value);

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

		const error = validateEmail(target.value);
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
		<form className={styles.formRegistration} onSubmit={onSubmit}>
			<InputField
				type="email"
				name="email"
				value={email}
				onChange={onEmailChange}
				placeholder="Почта пользователя..."
				error={emailError}
			/>
			<InputField
				type="password"
				name="password"
				value={password}
				onChange={onPasswordChange}
				placeholder="Пароль..."
				error={passwordError}
			/>
			<InputField
				type="password"
				name="repeatPassword"
				value={repeatPassword}
				onChange={onRepeatPasswordChange}
				placeholder="Введите пароль повторно..."
				error={repeatPasswordError}
			/>
			<button
				className={styles.submitButton}
				ref={submitButtonRef}
				type="submit"
				disabled={!isFormValid}>
				Зарегистрироваться
			</button>
		</form>
	);
}

export default RegistrationForm;
