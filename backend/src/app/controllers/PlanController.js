import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
    async index(req, res) {
        const { page = 1, per_page = 10 } = req.query;

        const plans = await Plan.findAll({
            limit: per_page,
            offset: (page - 1) * per_page,
            order: ['id'],
        });
        return res.json(plans);
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string().required(),
            duration: Yup.number().required(),
            price: Yup.number().required(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const plan = await Plan.findOne({ where: { title: req.body.title } });

        if (plan) {
            return res
                .status(400)
                .json({ error: 'Already exists a plan with this title' });
        }

        const { title, duration, price } = await Plan.create(req.body);

        return res.json({ title, duration, price });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            title: Yup.string(),
            duration: Yup.number(),
            price: Yup.number(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            return res.status(400).json({ error: 'Invalid plan title' });
        }

        const { title, duration, price } = await plan.update(req.body);

        return res.json({ title, duration, price });
    }

    async delete(req, res) {
        const plan = await Plan.findByPk(req.params.id);

        if (!plan) {
            return res.status(400).json({ error: 'Invalid plan' });
        }
        Plan.destroy({ where: { id: plan.id } });

        return res.json();
    }
}

export default new PlanController();
