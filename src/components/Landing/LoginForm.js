import React from 'react';

function LoginForm(props) {
	return (
		<div>
			<h4>Login</h4>
			<form onSubmit={(ev) => props.login(ev)}>
				<div>
					<span>Username: </span>
					<input
						className='input'
						type='text'
						placeholder='username'
						name='username'
						value={props.username}
						onChange={(ev) => props.setUser(ev.target.value)}
					/>
				</div>
				<div>
					<span>Password: </span>
					<input
						className='input'
						type='password'
						placeholder='password'
						name='password'
						value={props.password}
						onChange={(ev) => props.setPass(ev.target.value)}
					/>
				</div>
				<div id='authBtnBox'>
					<input className='authBtn' type='submit' value='Login' />
				</div>
			</form>
			<span>
				Need an account?
				<input
					readOnly
					id='clickToReg'
					type='text'
					value='Click here to register'
					onClick={() => props.needAcct(true)}
				/>
			</span>
		</div>
	);
}

export default LoginForm;
