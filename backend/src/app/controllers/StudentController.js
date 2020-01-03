import * as Yup from 'yup';
import { Op } from 'sequelize';
import Student from '../models/Student';

class StudentController {
	async index(req, res) {
		const { page = 1, per_page = 10 } = req.query;

		if (req.query.id !== undefined) {
			const student = await Student.findByPk(req.query.id);
			return res.json(student);
		}
		if (req.query.name === undefined) {
			const students = await Student.findAll({
				limit: per_page,
				offset: (page - 1) * per_page,
				order: ['name'],
			});
			return res.json(students);
		}

		const students = await Student.findAll({
			where: {
				name: { [Op.like]: `%${req.query.name}%` },
			},
			limit: per_page,
			offset: (page - 1) * per_page,
			order: ['name'],
		});
		return res.json(students);
	}

	async store(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string().required(),
			email: Yup.string()
				.email()
				.required(),
			age: Yup.number().required(),
			weight: Yup.number().required(),
			height: Yup.number().required(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const studentExists = await Student.findOne({
			where: { email: req.body.email },
		});

		if (studentExists) {
			return res.status(400).json({ error: 'Student already exists' });
		}

		const { id, name, email, age, weight, height } = await Student.create(
			req.body
		);

		return res.json({ id, name, email, age, weight, height });
	}

	async update(req, res) {
		const schema = Yup.object().shape({
			name: Yup.string(),
			email: Yup.string()
				.email()
				.required(),
			newEmail: Yup.string().email(),
			age: Yup.number(),
			weight: Yup.number(),
			height: Yup.number(),
		});

		if (!(await schema.isValid(req.body))) {
			return res.status(400).json({ error: 'Validation fails' });
		}

		const student = await Student.findOne({
			where: { email: req.body.email },
		});

		if (!student) {
			return res.status(401).json({ error: 'Invalid e-mail' });
		}

		if (req.body.newEmail) {
			if (req.body.newEmail !== student.email) {
				const studentExists = await Student.findOne({
					where: { email: req.body.newEmail },
				});

				if (studentExists) {
					return res
						.status(400)
						.json({ error: 'E-mail already exists.' });
				}
			} else {
				return res.status(400).json({
					error: "New e-mail can't be the same as current e-mail",
				});
			}
			req.body.email = req.body.newEmail;
		}

		const { id, name, email, age, weight, height } = await student.update(
			req.body
		);

		return res.json({ id, name, email, age, weight, height });
	}

	async delete(req, res) {
		const student = await Student.findByPk(req.params.id);

		if (!student) {
			return res.status(401).json({ error: 'Student not found' });
		}

		Student.destroy({ where: { id: student.id } });

		return res.json();
	}
}

export default new StudentController();
