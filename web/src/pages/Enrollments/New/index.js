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

	const [plan, setPlan] = useState();
	// const [student, setStudent] = useState();
	const [total, setTotal] = useState(0);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	async function loadPlan() {
		try {
			const { data } = await api.get('plans');

			setPlans(data);
		} catch (e) {
			toast.error('Error in load plan data');
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
			toast.error('Error in load plan data');
		}
	}

	useEffect(() => {
		loadPlan();
		loadStudents();
	}, []);

	useEffect(() => {
		if (plan) {
			const d = plan.duration || 0;
			const p = plan.price || 0;
			setTotal(d * p);
		} else {
			setTotal(0);
		}
	}, [plan]);

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

	// function handleStudentChange(selection) {
	// 	const student_id = Number(selection.target.value);
	// 	const students_selected = students.find(x => x.id === student_id);
	// 	// setStudent(students_selected);
	// }

	function handlePlanChange(selection) {
		const plan_id = Number(selection.target.value);
		const plan_selected = plans.find(x => x.id === plan_id);
		setPlan(plan_selected);
	}

	useEffect(() => {
		if (plan && startDate) {
			const eDate = format(
				addMonths(new Date(startDate), plan.duration),
				"yyyy'-'MM'-'dd"
			);

			setEndDate(eDate);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [plan, startDate]);

	function handleDateChange(element) {
		const date = element.target.value;
		setStartDate(date);
	}

	return (
		<Container>
			<TopItems>
				<strong>Enrollments Registry</strong>
				<div>
					<ReturnButton>
						<button
							type="button"
							onClick={() => history.push('/enrollments/')}>
							BACK
						</button>
					</ReturnButton>
					<SaveButton>
						<button type="submit" form="Form">
							SAVE
						</button>
					</SaveButton>
				</div>
			</TopItems>
			<RegistryForm id="Form" schema={schema} onSubmit={insertEnrollment}>
				<label htmlFor="student">
					STUDENT
					<Select
						name="student"
						options={students}
						// onChange={handleStudentChange}
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
						<Input
							name="end_date"
							type="date"
							value={endDate}
							// onChange={handleStartDateChange}
							disabled
						/>
					</label>

					<label htmlFor="total">
						Total Price
						<Input
							name="total"
							disabled
							value={`$${Number(total).toFixed(2)}`}
						/>
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
