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
	title: Yup.string().required('Name is required'),
	duration: Yup.number()
		.positive()
		.typeError('Invalid value inserted'),
	// .required('duration is required'),
	price: Yup.number()
		.positive()
		.typeError('Invalid value inserted')
		.required('monthly price is required'),
});

export default function PlansEdit() {
	const [plan, setPlan] = useState();

	// const [total, setTotal] = useState(0);

	const { id } = useParams();

	async function loadPlan() {
		try {
			const { data } = await api.get('plans', {
				params: { id },
			});

			setPlan({ ...data, total: data.duration * data.price });
		} catch (e) {
			toast.error('Error in load plan data');
		}
	}

	useEffect(() => {
		loadPlan();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id]);

	async function updatePlan(data) {
		try {
			await api.put(`plans/${id}`, data);
			toast.success('Plan updated with success');
			history.push('/plans');
		} catch (e) {
			toast.error(e.response.data.error);
		}
	}

	function handleDurationChange(text) {
		const value = parseInt(text.target.value, 10);

		// eslint-disable-next-line no-restricted-globals
		if (isNaN(value)) {
			setPlan({
				...plan,
				duration: 0,
				total: 0,
			});
		} else {
			setPlan({
				...plan,
				duration: value,
				total: value * plan.price,
			});
		}
	}

	function handlePriceChange(text) {
		const { value } = text.target;

		// eslint-disable-next-line no-restricted-globals
		if (isNaN(value)) {
			setPlan({
				...plan,
				price: 0,
				total: 0,
			});
		} else {
			setPlan({
				...plan,
				price: value,
				total: value * plan.duration,
			});
		}
	}

	return (
		<Container>
			<TopItems>
				<strong>Plans Edition</strong>
				<div>
					<ReturnButton
						type="button"
						onClick={() => history.push('/plans/')}>
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
				onSubmit={updatePlan}
				initialData={plan}>
				<label htmlFor="title">
					TITLE
					<Input name="title" placeholder="Example" />
				</label>
				<div>
					<label htmlFor="duration">
						DURATION
						<Input
							name="duration"
							placeholder="0 month"
							onChange={handleDurationChange}
						/>
					</label>

					<label htmlFor="price">
						MONTHLY PRICE
						<Input
							name="price"
							type="number"
							placeholder="$0.00"
							onChange={handlePriceChange}
						/>
					</label>

					<label htmlFor="total">
						TOTAL PRICE
						<Input name="total" disabled placeholder="$0.00" />
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
