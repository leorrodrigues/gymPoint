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
	Paginate,
	PaginateButton,
} from './styles';

const headerTableItems = ['TITLE', 'DURATION', 'MONTHLY VALUE', '', ''];

export default function Plans() {
	const [plans, setPlans] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);

	const perPage = 10;

	async function loadPlans() {
		try {
			const { data } = await api.get('plans', {
				params: { page: currentPage, per_page: perPage },
			});

			setPlans(data);
		} catch (e) {
			toast.error('Error in load plans data');
		}
	}

	useEffect(() => {
		loadPlans();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage, perPage]);

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
						<EditButton
							type="button"
							onClick={() =>
								history.push(`/plans/${plan.id}/edit`)
							}>
							Edit
						</EditButton>
					</td>
					<td>
						<DeleteButton
							type="button"
							onClick={() => handleDeletePlan(plan)}>
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
					end={String(plans.length < perPage)}
					type="next">
					Next
				</PaginateButton>
			</Paginate>
		</Container>
	);
}
