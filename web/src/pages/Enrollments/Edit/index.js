import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { Input, Scope } from '@rocketseat/unform';
import * as Yup from 'yup';
import { toast } from 'react-toastify';

import { format, addMonths } from 'date-fns';

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
	start_date: Yup.date(),
});

export default function EnrollmentsEdit() {
	const [enrollment, setEnrollment] = useState();

	const { student_id, plan_id } = useParams();

	useEffect(() => {
		async function loadEnroll() {
			try {
				const { data } = await api.get('enrollments', {
					params: { student_id, plan_id },
				});

				setEnrollment({
					...data,
					start_date: format(
						new Date(data.start_date),
						"yyyy'-'MM'-'dd"
					),
					end_date: format(new Date(data.end_date), "yyyy'-'MM'-'dd"),
					total: data.Plan.duration * data.Plan.price,
				});
			} catch (e) {
				toast.error('Error in load enrollment data');
			}
		}

		loadEnroll();
	}, [plan_id, student_id]);

	// eslint-disable-next-line no-shadow
	async function updateEnrollment({ start_date }) {
		try {
			await api.put(
				`enrollments/${enrollment.student_id}/${enrollment.plan_id}`,
				{
					start_date,
				}
			);
			toast.success('Enrollment registered with success');
			history.push('/enrollments/');
		} catch (e) {
			toast.error(e.response);
		}
	}

	function handleDateChange(element) {
		setEnrollment({
			...enrollment,
			start_date: format(
				new Date(element.target.value),
				"yyyy'-'MM'-'dd"
			),
			end_date: format(
				addMonths(
					new Date(element.target.value),
					enrollment.Plan.duration
				),
				"yyyy'-'MM'-'dd"
			),
		});
	}

	return (
		<Container>
			<TopItems>
				<strong>Enrollments Edition</strong>
				<div>
					<ReturnButton
						type="button"
						onClick={() => history.push('/enrollments/')}>
						BACK
					</ReturnButton>
					<SaveButton type="submit" form="Form">
						SAVE
					</SaveButton>
				</div>
			</TopItems>
			<RegistryForm
				id="Form"
				schema={schema}
				onSubmit={updateEnrollment}
				initialData={enrollment}>
				<label htmlFor="student">
					STUDENT
					<Scope path="Student">
						<Input name="name" disabled />
					</Scope>
				</label>
				<div>
					<label htmlFor="plan">
						PLAN
						<Scope path="Plan">
							<Input name="title" disabled />
						</Scope>
					</label>

					<label htmlFor="start_date">
						START DATE
						<Input
							name="start_date"
							type="date"
							onChange={handleDateChange}
						/>
					</label>
					<label htmlFor="end_date">
						END DATE
						<Input name="end_date" type="date" disabled />
					</label>

					<label htmlFor="total">
						Total Price
						<Input name="total" disabled />
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
