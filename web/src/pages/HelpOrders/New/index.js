import React, { useState, useEffect } from 'react';

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
		.typeError('Invalid value inserted')
		.required('duration is required'),
	price: Yup.number()
		.positive()
		.typeError('Invalid value inserted')
		.required('monthly price is required'),
});

export default function PlansNew() {
	const [duration, setDuration] = useState(0);
	const [price, setPrice] = useState(0);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		const d = duration || 0;
		const p = price || 0;
		setTotal(d * p);
	}, [duration, price]);

	async function insertPlan(data) {
		try {
			await api.post('plans', data);
			toast.success('Plan registered with success');
			history.push('/plans/');
		} catch (e) {
			toast.error(e.response.data.error);
		}
	}

	function handleDurationChange(text) {
		setDuration(text.target.value);
	}

	function handlePriceChange(text) {
		setPrice(text.target.value);
	}

	return (
		<Container>
			<TopItems>
				<strong>Plans Registry</strong>
				<div>
					<ReturnButton
						type="button"
						onClick={() => history.push('/plans/')}>
						BACK
					</ReturnButton>
					<SaveButton type="submit" form="Form">
						SAVE
					</SaveButton>
				</div>
			</TopItems>
			<RegistryForm id="Form" schema={schema} onSubmit={insertPlan}>
				<label htmlFor="title">
					TITLE
					<Input name="title" placeholder="Example" />
				</label>
				<div>
					<label htmlFor="duration">
						DURATION
						<Input
							name="duration"
							type="number"
							placeholder="0"
							onChange={handleDurationChange}
						/>
					</label>

					<label htmlFor="price">
						MONTHLY PRICE
						<Input
							name="price"
							type="number"
							placeholder="$0.00"
							value={`${price}`}
							onChange={handlePriceChange}
						/>
					</label>

					<label htmlFor="Total">
						Total Price
						<Input
							name="Total"
							disabled
							value={`$${Number(total).toFixed(2)}`}
						/>
					</label>
				</div>
			</RegistryForm>
		</Container>
	);
}
