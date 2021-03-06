import * as Yup from 'yup';
import HelpOrder from '../schemas/helpOrder';
import Student from '../models/Student';

import Queue from '../../lib/Queue';
import answerdQuestion from '../jobs/answerdQuestion';

class CheckinController {
	async indexAllOpen(req, res) {
		const { page = 1, per_page = 10 } = req.query;

		const orders = await HelpOrder.find({
			answer: { $eq: null },
		})
			.limit(parseInt(per_page, 10))
			.skip((parseInt(page, 10) - 1) * parseInt(per_page, 10));

		return res.json(orders);
	}

	async indexAll(req, res) {
		const orders = await HelpOrder.find({});

		return res.json(orders);
	}

	async index(req, res) {
		const { student_id } = req.params;

		const orders = await HelpOrder.find({
			student_id,
		});

		return res.json(orders);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			question: Yup.string().required(),
		});
		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { student_id } = req.params;

		const student = await Student.findByPk(student_id);
		if (!student) {
			return res.status(400).json({ error: 'Invalid student' });
		}

		const help = await HelpOrder.create({
			student_id,
			question: req.body.question,
			answer: null,
			answer_at: null,
		});

		return res.json(help);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			answer: Yup.string().required(),
			_id: Yup.string(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { student_id } = req.params;

		const { _id, answer } = req.body;

		let orders;

		if (_id) {
			orders = await HelpOrder.find({ _id });
		} else {
			orders = await HelpOrder.find({ student_id, answer: null });
		}

		if (orders.length === 0) {
			return res
				.status(400)
				.json({ error: 'Student without help orders' });
		}

		let order = orders[0];

		order.answer = answer;
		order.answer_at = new Date();

		order = await order.save();

		const { name, email } = await Student.findByPk(student_id);

		await Queue.add(answerdQuestion.key, {
			order,
			name,
			email,
		});
		return res.json(order);
	}
}

export default new CheckinController();
