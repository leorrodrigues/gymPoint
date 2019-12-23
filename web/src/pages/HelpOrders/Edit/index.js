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
		.typeError('Invalid value inserted')
		.required('duration is required'),
	price: Yup.number()
		.positive()
		.typeError('Invalid value inserted')
		.required('monthly price is required'),
});

export default function PlansNew() {
	const [title, setTitle] = useState('Example Plan');
	const [duration, setDuration] = useState(1);
	const [price, setPrice] = useState(10);
	const [total, setTotal] = useState(0);

	const { id } = useParams();

	useEffect(() => {
		const d = duration || 0;
		const p = price || 0;
		setTotal(d * p);
	}, [duration, price]);

	async function loadPlan() {
		try {
			const { data } = await api.get('plans', {
				params: { id },
			});

			setTitle(data.title);
			setDuration(data.duration);
			setPrice(data.price);
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

	function handleTitleChange(text) {
		setTitle(text.target.value);
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
			<RegistryForm id="Form" schema={schema} onSubmit={updatePlan}>
				<label htmlFor="title">
					TITLE
					<Input
						name="title"
						placeholder="Example"
						value={title}
						onChange={handleTitleChange}
					/>
				</label>
				<div>
					<label htmlFor="duration">
						DURATION
						<Input
							name="duration"
							type="number"
							placeholder="0"
							value={duration}
							onChange={handleDurationChange}
						/>
					</label>

					<label htmlFor="price">
						MONTHLY PRICE
						<Input
							name="price"
							type="number"
							placeholder="$0.00"
							value={price}
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
