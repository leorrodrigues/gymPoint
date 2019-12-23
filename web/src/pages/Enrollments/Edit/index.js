import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

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
	start_date: Yup.date(),
});

export default function EnrollmentsNew() {
	const [plans, setPlans] = useState([]);
	const [students, setStudents] = useState([]);

	const [plan, setPlan] = useState();
	const [student, setStudent] = useState();
	const [total, setTotal] = useState(0);
	const [startDate, setStartDate] = useState();
	const [endDate, setEndDate] = useState();

	const { student_id, plan_id } = useParams();

	async function loadPlans() {
		try {
			const { data } = await api.get('plans');

			await setPlans(data);
		} catch (e) {
			toast.error('Error in load plan data');
		}
	}

	async function loadPlan() {
		const selected_plan = plans.find(x => x.id === Number(plan_id));
		setPlan(selected_plan);
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

	async function loadStudent() {
		const selected_student = students.find(
			x => x.id === Number(student_id)
		);
		setStudent(selected_student);
	}

	useEffect(() => {
		async function loadEnroll() {
			const { data } = await api.get('enrollments', {
				params: { student_id, plan_id },
			});

			const date = format(new Date(data.start_date), "yyyy'-'MM'-'dd");
			setStartDate(date);
		}

		loadEnroll();
	}, [plan_id, student_id]);

	useEffect(() => {
		loadPlan();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [plans]);

	useEffect(() => {
		loadStudent();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [students]);

	useEffect(() => {
		loadPlans();
		loadStudents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
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
	async function updateEnrollment({ start_date }) {
		try {
			await api.put(`enrollments/${student.id}/${plan.id}`, {
				start_date,
			});
			toast.success('Enrollment registered with success');
			history.push('/enrollments/');
		} catch (e) {
			toast.error(e.response.data.error);
		}
	}

	function handlePlanChange(selection) {
		const plan_new_id = Number(selection.target.value);
		const plan_selected = plans.find(x => x.id === plan_new_id);
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
				<strong>Enrollments Edition</strong>
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
			<RegistryForm id="Form" schema={schema} onSubmit={updateEnrollment}>
				<label htmlFor="student">
					STUDENT
					<Select
						name="student"
						options={students}
						placeholder={
							student ? student.name : 'Select the student'
						}
						disabled
					/>
				</label>
				<div>
					<label htmlFor="plan">
						PLAN
						<Select
							name="plan"
							options={plans}
							onChange={handlePlanChange}
							placeholder={plan ? plan.title : 'Select the plan'}
							disabled
						/>
					</label>

					<label htmlFor="start_date">
						START DATE
						<Input
							name="start_date"
							type="date"
							value={startDate}
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
