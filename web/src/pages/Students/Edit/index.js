import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Input } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import history from '~/services/history';
import api from '~/services/api';

import {
	Container,
	TopItems,
	ReturnButton,
	SaveButton,
	RegistryForm,
} from './styles';

const schema = Yup.object().shape({
	name: Yup.string().required('Name is required'),
	email: Yup.string()
		.email()
		.required('E-mail is required'),
	age: Yup.number()
		.positive()
		.typeError('Invalid value inserted')
		.required('Age is required'),
	weight: Yup.number()
		.positive()
		.typeError('Invalid value inserted')
		.required('Weight is required'),
	height: Yup.number()
		.positive()
		.typeError('Invalid value inserted')
		.required('height is required'),
});

export default function StudentsNew() {
	const [name, setName] = useState('John Doe');
	const [email, setEmail] = useState('example@email.com');
	const [age, setAge] = useState('18');
	const [weight, setWeight] = useState('70');
	const [height, setHeight] = useState('1.80');

	const { id } = useParams();

	async function loadStudent() {
		try {
			const { data } = await api.get('students', {
				params: { id },
			});

			setName(data.name);
			setEmail(data.email);
			setAge(data.age);
			setWeight(data.weight);
			setHeight(data.height);
		} catch (e) {
			toast.error('Error in load student data');
		}
	}

	useEffect(() => {
		loadStudent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	async function insertStudent(data) {
		try {
			await api.put('students', data);
			toast.success('Student updated with success');
			history.push('/students/');
		} catch (e) {
			toast.error(e.response.data.error);
		}
	}

	function handleNameChange(text) {
		setName(text.target.value);
	}

	function handleEmailChange(text) {
		setEmail(text.target.value);
	}

	function handleAgeChange(text) {
		setAge(text.target.value);
	}

	function handleWeightChange(text) {
		setWeight(text.target.value);
	}

	function handleHeightChange(text) {
		setHeight(text.target.value);
	}

	return (
		<Container>
			<TopItems>
				<strong>Students Edition</strong>
				<div>
					<ReturnButton>
						<button
							type="button"
							onClick={() => history.push('/students/')}>
							BACK
						</button>
					</ReturnButton>
					<SaveButton>
						<button type="submit" form="Form">
							UPDATE
						</button>
					</SaveButton>
				</div>
			</TopItems>
			<RegistryForm id="Form" schema={schema} onSubmit={insertStudent}>
				<label htmlFor="name">
					COMPLETE NAME
					<Input
						name="name"
						value={name}
						onChange={handleNameChange}
					/>
				</label>
				<label htmlFor="email">
					E-MAIL ADDRESS
					<Input
						name="email"
						type="email"
						value={email}
						onChange={handleEmailChange}
					/>
				</label>
				<div>
					<label htmlFor="age">
						AGE
						<Input
							name="age"
							value={age}
							onChange={handleAgeChange}
						/>
					</label>

					<label htmlFor="weight">
						WEIGHT (Kg)
						<Input
							name="weight"
							value={weight}
							onChange={handleWeightChange}
						/>
					</label>

					<label htmlFor="height">
						Height (cm)
						<Input
							name="height"
							value={height}
							onChange={handleHeightChange}
						/>
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
