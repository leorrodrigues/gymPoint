import React, { useState, useEffect } from 'react';

import { Input, Select } from '@rocketseat/unform';
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
	student: Yup.number().required('Student ID is required'),
	plan: Yup.number().required('Plan ID is required'),
	start_date: Yup.date().required('The start date is required'),
});

export default function EnrollmentsNew() {
	const [plans, setPlans] = useState([]);
	const [students, setStudents] = useState([]);
	const [enrollment, setEnrollment] = useState({ plan: '', start_date: '' });

	async function loadPlans() {
		try {
			const { data } = await api.get('plans');

			setPlans(data);
		} catch (e) {
			toast.error('Error in load plans data');
		}
	}

	async function loadStudents() {
		try {
			const { data } = await api.get('students');

			data.map(value => {
				value.title = value.name;
				return value;
			});

			setStudents(data);
		} catch (e) {
			toast.error('Error in load students data');
		}
	}

	useEffect(() => {
		loadPlans();
		loadStudents();
	}, []);

	// eslint-disable-next-line no-shadow
	async function insertEnrollment({ student, plan, start_date }) {
		try {
			await api.post('enrollments', {
				student_id: student,
				plan_id: plan,
				start_date,
			});
			toast.success('Enrollment registered with success');
			history.push('/enrollments/');
		} catch (e) {
			toast.error(e.response.data.error);
		}
	}

	function handlePlanChange(selection) {
		const plan_id = Number(selection.target.value);
		const plan_selected = plans.find(x => x.id === plan_id);
		setEnrollment({ ...enrollment, plan: plan_selected });
	}

	function handleDateChange(element) {
		setEnrollment({
			...enrollment,
			start_date: new Date(element.target.value),
		});
	}

	useEffect(() => {
		if (enrollment.plan && enrollment.start_date) {
			setEnrollment({
				...enrollment,
				end_date: format(
					addMonths(enrollment.start_date, enrollment.plan.duration),
					"yyyy'-'MM'-'dd"
				),
				total: enrollment.plan.duration * enrollment.plan.price,
			});
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [enrollment.plan, enrollment.start_date]);

	return (
		<Container>
			<TopItems>
				<strong>Enrollments Registry</strong>
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
				onSubmit={insertEnrollment}
				initialData={enrollment}>
				<label htmlFor="student">
					STUDENT
					<Select
						name="student"
						options={students}
						placeholder="Select the student"
					/>
				</label>
				<div>
					<label htmlFor="plan">
						PLAN
						<Select
							name="plan"
							options={plans}
							onChange={handlePlanChange}
							placeholder="Select the plan"
						/>
					</label>

					<label htmlFor="start_date">
						START DATE
						<Input
							name="start_date"
							type="date"
							placeholder="Chose the date"
							onChange={handleDateChange}
						/>
					</label>
					<label htmlFor="end_date">
						END DATE
						<Input name="end_date" type="date" disabled />
					</label>

					<label htmlFor="total">
						Total Price
						<Input name="total" disabled placeholder="$0" />
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
