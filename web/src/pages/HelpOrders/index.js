import React, { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { Form, Input } from '@rocketseat/unform';

import * as Yup from 'yup';
import api from '~/services/api';

import {
	Container,
	TopItems,
	ListQuestions,
	EmptyList,
	AnswerButton,
	AnswerModal,
} from './styles';

const headerTableItems = ['STUDENT', 'QUESTION PREVIEW', ''];

const schema = Yup.object().shape({
	answer: Yup.string().required('The answer is required'),
});

export default function Students() {
	const [helpOrders, setHelpOrders] = useState([]);
	const [students, setStudents] = useState([]);
	const [show, setShow] = useState(false);
	const [selectedOrder, setSelectedOrder] = useState();

	async function loadHelpOrders() {
		try {
			const { data } = await api.get('help-orders');

			const filteredData = data.filter(order => {
				return !order.answer;
			});

			setHelpOrders(filteredData);
		} catch (e) {
			toast.error('Error in load help orders');
		}
	}

	async function loadStudents() {
		try {
			const { data } = await api.get('students');
			setStudents(data);
		} catch (e) {
			toast.error('Error in load plan data');
		}
	}

	useEffect(() => {
		loadHelpOrders();
		loadStudents();
	}, []);

	function renderTableHeader() {
		return headerTableItems.map(key => {
			return <th key={Math.random()}>{key.toUpperCase()}</th>;
		});
	}

	function renderTableData() {
		return helpOrders.map(order => {
			const student = students.find(
				x => x.id === Number(order.student_id)
			);

			return (
				<tr key={order._id}>
					<td>{student && student.name}</td>
					<td>{order.question}</td>
					<td>
						<AnswerButton>
							<button
								type="button"
								onClick={() => {
									setSelectedOrder(order);
									setShow(true);
								}}>
								Answer
							</button>
						</AnswerButton>
					</td>
				</tr>
			);
		});
	}

	async function handleSubmit() {
		try {
			await api.put(`/students/${selectedOrder.student_id}/answer`, {
				_id: selectedOrder._id,
				answer: selectedOrder.answer,
			});

			toast.success('Answer made with success');

			loadHelpOrders();
			setShow(false);
		} catch (e) {
			toast.error('Erro in submit the answer');
		}
	}

	return (
		<Container>
			<TopItems>
				<strong>Assistance Requests</strong>
			</TopItems>
			{helpOrders.length !== 0 ? (
				<ListQuestions>
					<table id="HelpOrders">
						<tbody>
							<tr>{renderTableHeader()}</tr>
							{renderTableData()}
						</tbody>
					</table>
				</ListQuestions>
			) : (
				<EmptyList>
					<strong>The gym has no assistance requests</strong>
				</EmptyList>
			)}
			<AnswerModal
				isOpen={show}
				onRequestClose={() => setShow(false)}
				ariaHideApp={false}>
				<span>
					<strong>Student Question</strong>
				</span>
				<span>{selectedOrder && selectedOrder.question}</span>
				<span>
					<strong>Gym Point Answer</strong>
				</span>
				<Form schema={schema} onSubmit={handleSubmit}>
					<Input
						multiline
						name="answer"
						type="text"
						placeholder="Answer"
						onChange={e =>
							setSelectedOrder({
								...selectedOrder,
								answer: e.target.value,
							})
						}
					/>
					<div>
						<button type="button" onClick={() => setShow(false)}>
							Cancel
						</button>
						<button type="submit">Answer</button>
					</div>
				</Form>
			</AnswerModal>
		</Container>
	);
}
