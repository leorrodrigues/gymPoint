import * as Yup from 'yup';
import { addMonths, parseISO } from 'date-fns';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';

import confirmationEnrollMail from '../jobs/confirmationEnroll';

import Queue from '../../lib/Queue';

class EnrollmentController {
	async index(req, res) {
		const { page = 1, per_page = 10 } = req.query;

		if (
			req.query.student_id !== undefined &&
			req.query.plan_id !== undefined
		) {
			const enroll = await Enrollment.findOne({
				where: {
					student_id: req.query.student_id,
					plan_id: req.query.plan_id,
				},
			});
			return res.json(enroll);
		}

		const enrollments = await Enrollment.findAll({
			limit: per_page,
			offset: (page - 1) * per_page,
			order: ['student_id'],
		});

		if (!enrollments) {
			return res
				.status(400)
				.json({ error: "Don't exists any enrollment" });
		}

		return res.json(enrollments);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			student_id: Yup.number().required(),
			plan_id: Yup.number().required(),
			start_date: Yup.date().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const { student_id, plan_id, start_date } = req.body;

		const plan = await Plan.findByPk(plan_id);

		if (!plan) {
			return res.status(400).json({ error: 'Invalid plan' });
		}

		const student = await Student.findByPk(student_id);

		if (!student) {
			return res.status(400).json({ error: 'Invalid student' });
		}

		// const e = await Enrollment.findOne({
		// 	where: { student_id: student.id, plan_id: plan.id },
		// });

		// if (e) {
		// 	return res
		// 		.status(400)
		// 		.json({ error: 'The student already has this plan' });
		// }

		const end_date = await addMonths(parseISO(start_date), plan.duration);
		const total_price = plan.price * plan.duration;

		const enrollment = await Enrollment.create({
			student_id,
			plan_id,
			start_date,
			end_date,
			price: total_price,
		});

		const confirmation = {
			total_price,
			end_date,
			student_name: student.name,
			student_email: student.email,
			plan_title: plan.title,
			plan_price: plan.price,
		};

		await Queue.add(confirmationEnrollMail.key, {
			confirmation,
		});

		return res.json(enrollment);
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			start_date: Yup.date().required(),
		});

		const { student_id, plan_id } = req.params;

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const enroll = await Enrollment.findOne({
			where: {
				student_id,
				plan_id,
			},
		});

		if (!enroll) {
			return res.statud(400).json({ error: 'Invalid plan or student' });
		}

		const { start_date } = await enroll.update(req.body);

		return res.json({ student_id, plan_id, start_date });
	}

	async delete(req, res) {
		const enroll = await Enrollment.findOne({
			where: {
				student_id: req.params.student_id,
				plan_id: req.params.plan_id,
			},
		});

		if (!enroll) {
			return res.status(400).json({ error: 'Invalid enrollment' });
		}

		enroll.destroy({ where: { id: enroll.id } });

		return res.json();
	}
}

export default new EnrollmentController();
