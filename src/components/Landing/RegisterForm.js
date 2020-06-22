import React from 'react';

function RegisterForm(props) {
	return (
		<div>
			<h4>Register</h4>
			<form onSubmit={(ev) => props.register(ev)}>
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
					<span>Email: </span>
					<input
						className='input'
						type='email'
						placeholder='email'
						name='email'
						value={props.email}
						onChange={(ev) => props.setEmail(ev.target.value)}
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
					<input className='authBtn' type='submit' value='Register' />
				</div>
			</form>
			<span>
				Already have an account?{' '}
				<input
					readOnly
					id='clickToReg'
					type='text'
					value='Click here to login'
					onClick={() => props.needAcct(false)}
				/>
			</span>
		</div>
	);
}

export default RegisterForm;
