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
	Paginate,
	PaginateButton,
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
	const [currentPage, setCurrentPage] = useState(1);

	const perPage = 10;

	async function loadEnrollments() {
		try {
			const { data } = await api.get('enrollments', {
				params: { page: currentPage, per_page: perPage },
			});
			setEnrollments(data);
		} catch (e) {
			toast.error('Error in load enrollments data');
		}
	}

	useEffect(() => {
		loadEnrollments();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, perPage]);

	async function handleDeleteEnrollment({
		Student,
		Plan,
		student_id,
		plan_id,
	}) {
		if (
			// eslint-disable-next-line no-alert
			window.confirm(
				`Are you sure to delete the enrollment "${Plan.title}" of user ${Student.name} ? `
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
				start_date,
				end_date,
				active,
				student_id,
				plan_id,
			} = enrollment;
			const { name } = enrollment.Student;
			const { title } = enrollment.Plan;

			return (
				<tr key={Math.random()}>
					<td>{name}</td>
					<td>{title}</td>
					<td>
						{format(parseISO(start_date), "MMMM, dd 'of' yyyy")}
					</td>
					<td>{format(parseISO(end_date), "MMMM, dd 'of' yyyy")}</td>
					<td>{active ? 'Yes' : 'No'}</td>
					<td>
						<EditButton
							type="button"
							onClick={() =>
								history.push(
									`/enrollments/${student_id}/${plan_id}/edit`
								)
							}>
							Edit
						</EditButton>
					</td>
					<td>
						<DeleteButton
							type="button"
							onClick={() => handleDeleteEnrollment(enrollment)}>
							Delete
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
			<Paginate>
				<PaginateButton
					page={currentPage}
					onClick={() => setCurrentPage(currentPage - 1)}
					type="prev">
					Previus
				</PaginateButton>
				{currentPage}
				<PaginateButton
					onClick={() => setCurrentPage(currentPage + 1)}
					end={String(enrollments.length < perPage)}
					type="next">
					Next
				</PaginateButton>
			</Paginate>
		</Container>
	);
}
