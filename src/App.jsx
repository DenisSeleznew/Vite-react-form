// import { useState } from 'react'

import styles from './App.module.css';

function App() {
	return (
		<div className={styles.app}>
			<form>
				<input
					className={styles.inputApp}
					type="text"
					placeholder="Имя пользователя..."
				/>
				<input
					className={styles.inputApp}
					type="password"
					placeholder="Пароль..."
				/>
				<input
					className={styles.inputApp}
					type="password"
					placeholder="Подтвердить пароль..."
				/>
				<button type="submit">Зарегестрироваться</button>
			</form>
		</div>
	);
}

export default App;
