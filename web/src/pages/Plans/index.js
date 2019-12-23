import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';

import api from '~/services/api';
import history from '~/services/history';

import {
	Container,
	TopItems,
	ListPlans,
	EmptyList,
	EditButton,
	DeleteButton,
} from './styles';

const headerTableItems = ['TITLE', 'DURATION', 'MONTHLY VALUE', '', ''];

export default function Plans() {
	const [plans, setPlans] = useState([]);

	async function loadPlans() {
		const { data } = await api.get('plans');

		setPlans(data);
	}

	useEffect(() => {
		loadPlans();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	async function handleDeletePlan({ id, title }) {
		// eslint-disable-next-line no-alert
		if (window.confirm(`Are you sure to delete the plan "${title}"? `)) {
			try {
				await api.delete(`plans/${id}`);

				toast.success('Plan deleted with success');
				loadPlans();
			} catch (e) {
				toast.error('Error in delete the plan');
			}
		}
	}

	function renderTableHeader() {
		return headerTableItems.map(key => {
			return <th key={Math.random()}>{key.toUpperCase()}</th>;
		});
	}

	function renderTableData() {
		return plans.map(plan => {
			const { id, title, duration, price } = plan; // destructuring
			return (
				<tr key={id}>
					<td>{title}</td>
					<td>
						{duration === 1
							? `${duration} month`
							: `${duration} months`}
					</td>
					<td>{`$${price.toFixed(2)}`}</td>
					<td>
						<EditButton>
							<button
								type="button"
								onClick={() =>
									history.push(`/plans/${plan.id}/edit`)
								}>
								Edit
							</button>
						</EditButton>
					</td>
					<td>
						<DeleteButton>
							<button
								type="button"
								onClick={() => handleDeletePlan(plan)}>
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
				<strong>Plans Management</strong>
				<button
					type="button"
					onClick={() => history.push('/plans/new')}>
					<span>REGISTER</span>
				</button>
			</TopItems>
			{plans.length !== 0 ? (
				<ListPlans>
					<table id="plans">
						<tbody>
							<tr>{renderTableHeader()}</tr>
							{renderTableData()}
						</tbody>
					</table>
				</ListPlans>
			) : (
				<EmptyList>
					<strong>The gym has no plans</strong>
				</EmptyList>
			)}
		</Container>
	);
}
