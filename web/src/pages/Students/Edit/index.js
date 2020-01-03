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

export default function StudentsEdit() {
	const [student, setStudent] = useState();

	const { id } = useParams();

	async function loadStudent() {
		try {
			const { data } = await api.get('students', {
				params: { id },
			});

			setStudent(data);
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

	return (
		<Container>
			<TopItems>
				<strong>Students Edition</strong>
				<div>
					<ReturnButton
						type="button"
						onClick={() => history.push('/students/')}>
						BACK
					</ReturnButton>
					<SaveButton type="submit" form="Form">
						UPDATE
					</SaveButton>
				</div>
			</TopItems>
			<RegistryForm
				id="Form"
				schema={schema}
				onSubmit={insertStudent}
				initialData={student}>
				<label htmlFor="name">
					COMPLETE NAME
					<Input name="name" />
				</label>
				<label htmlFor="email">
					E-MAIL ADDRESS
					<Input name="email" type="email" />
				</label>
				<div>
					<label htmlFor="age">
						AGE
						<Input name="age" />
					</label>

					<label htmlFor="weight">
						WEIGHT (Kg)
						<Input name="weight" />
					</label>

					<label htmlFor="height">
						Height (cm)
						<Input name="height" />
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
