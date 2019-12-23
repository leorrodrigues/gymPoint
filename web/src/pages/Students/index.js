import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
	Container,
	TopItems,
	ListStudents,
	EmptyList,
	EditButton,
	DeleteButton,
} from './styles';

const headerTableItems = ['NAME', 'E-MAIL', 'AGE', '', ''];

export default function Students() {
	const [studentName, setStudentName] = useState('');
	const [students, setStudents] = useState([]);

	async function loadStudents() {
		const { data } = await api.get('students', {
			params: { name: studentName },
		});

		setStudents(data);
	}

	useEffect(() => {
		loadStudents();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studentName]);

	function handleStudentNameChange(text) {
		setStudentName(text.target.value);
	}

	async function handleDeleteStudent({ id, name }) {
		// eslint-disable-next-line no-alert
		if (window.confirm(`Are you sure to delete the student "${name}"? `)) {
			try {
				await api.delete(`students/${id}`);

				toast.success('Student deleted with success');
				loadStudents();
			} catch (e) {
				toast.error('Error in delete the student');
			}
		}
	}

	function renderTableHeader() {
		return headerTableItems.map(key => {
			return <th key={Math.random()}>{key.toUpperCase()}</th>;
		});
	}

	function renderTableData() {
		return students.map(student => {
			const { id, name, age, email } = student; // destructuring
			return (
				<tr key={id}>
					<td>{name}</td>
					<td>{email}</td>
					<td>{age}</td>
					<td>
						<EditButton>
							<button
								type="button"
								onClick={() =>
									history.push(`/students/${student.id}/edit`)
								}>
								Edit
							</button>
						</EditButton>
					</td>
					<td>
						<DeleteButton>
							<button
								type="button"
								onClick={() => handleDeleteStudent(student)}>
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
				<strong>Students Management</strong>
				<div>
					<button
						type="button"
						onClick={() => history.push('/students/new')}>
						<span>REGISTER</span>
					</button>
					<input
						name="studentName"
						placeholder="Search student"
						onKeyDown={event =>
							event.key === 'Enter' && loadStudents()
						}
						onChange={handleStudentNameChange}
					/>
				</div>
			</TopItems>
			{students.length !== 0 ? (
				<ListStudents>
					<table id="students">
						<tbody>
							<tr>{renderTableHeader()}</tr>
							{renderTableData()}
						</tbody>
					</table>
				</ListStudents>
			) : (
				<EmptyList>
					<strong>The gym has no students</strong>
				</EmptyList>
			)}
		</Container>
	);
}
