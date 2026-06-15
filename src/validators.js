export const validateEmail = value => {
	if (!value) return 'Email не должен быть пустым';
	if (!/\S+@\S+\.\S+/.test(value)) return 'Неверный формат email';
	return null;
};

export const validatePassword = value => {
	if (!value) return 'Пароль не должен быть пустым';
	if (!/^[\w_]*$/.test(value)) return 'Только латиница, цифры, _';
	if (value.length !== 8) return 'Длина пароля должна быть 8 символов';
	return null;
};

export const validateRepeatPassword = (value, password) => {
	if (!value) return 'Подтверждение не должно быть пустым';
	if (value !== password) return 'Пароли не совпадают';
	return null;
};
