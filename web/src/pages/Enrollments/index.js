import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';

import api from '~/services/api';
import history from '~/services/history';

import {
	Container,
	TopItems,
	List,
	EmptyList,
	EditButton,
	DeleteButton,
} from './styles';

const headerTableItems = [
	'STUDENT',
	'PLAN',
	'START DATE',
	'END DATE',
	'VALID',
	'',
	'',
];

export default function Enrollments() {
	const [enrollments, setEnrollments] = useState([]);
	const [students, setStudents] = useState([]);
	const [plans, setPlans] = useState([]);

	async function loadEnrollments() {
		const { data } = await api.get('enrollments');

		setEnrollments(data);
	}

	async function loadStudents() {
		const { data } = await api.get('students');

		setStudents(data);
	}

	async function loadPlans() {
		const { data } = await api.get('plans');

		setPlans(data);
	}

	useEffect(() => {
		loadEnrollments();
		loadStudents();
		loadPlans();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handleDeleteEnrollment({ student_id, plan_id }) {
		const student = students.find(x => x.id === student_id);

		const plan = plans.find(x => x.id === plan_id);
		if (
			// eslint-disable-next-line no-alert
			window.confirm(
				`Are you sure to delete the enrollment "${plan.title}" of user ${student.name} ? `
			)
		) {
			try {
				await api.delete(`enrollments/${student_id}/${plan_id}`);

				toast.success('Enrollment deleted with success');
				loadEnrollments();
			} catch (e) {
				toast.error('Error in delete the enrollment');
			}
		}
	}

	function renderTableHeader() {
		return headerTableItems.map(key => {
			return <th key={Math.random()}>{key.toUpperCase()}</th>;
		});
	}

	function renderTableData() {
		return enrollments.map(enrollment => {
			const {
				student_id,
				plan_id,
				start_date,
				end_date,
				active,
			} = enrollment; // destructuring

			const student = students.find(x => x.id === student_id);

			const plan = plans.find(x => x.id === plan_id);

			return (
				<tr key={Math.random()}>
					<td>{student ? student.name : ''}</td>
					<td>{plan ? plan.title : ''}</td>
					<td>
						{format(parseISO(start_date), "MMMM, dd 'of' yyyy")}
					</td>
					<td>{format(parseISO(end_date), "MMMM, dd 'of' yyyy")}</td>
					<td>{active ? 'Yes' : 'No'}</td>
					<td>
						<EditButton>
							<button
								type="button"
								onClick={() =>
									history.push(
										`/enrollments/${student.id}/${plan.id}/edit`
									)
								}>
								Edit
							</button>
						</EditButton>
					</td>
					<td>
						<DeleteButton>
							<button
								type="button"
								onClick={() =>
									handleDeleteEnrollment(enrollment)
								}>
								Delete
							</button>
						</DeleteButton>
					</td>
				</tr>
			);
		});
	}

	return (
		<Container>
			<TopItems>
				<strong>Enrollments Management</strong>
				<button
					type="button"
					onClick={() => history.push('/enrollments/new')}>
					<span>REGISTER</span>
				</button>
			</TopItems>
			{enrollments.length !== 0 ? (
				<List>
					<table id="enrollments">
						<tbody>
							<tr>{renderTableHeader()}</tr>
							{renderTableData()}
						</tbody>
					</table>
				</List>
			) : (
				<EmptyList>
					<strong>The gym has no enrollments</strong>
				</EmptyList>
			)}
		</Container>
	);
}
