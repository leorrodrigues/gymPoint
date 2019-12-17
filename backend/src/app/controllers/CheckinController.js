import { startOfDay, endOfDay, subDays } from 'date-fns';
import { Op } from 'sequelize';
import Checkin from '../models/Checkin';
import Student from '../models/Student';

class CheckinController {
    async index(req, res) {
        const { page = 1, per_page = 10 } = req.query;

        const checkins = await Checkin.findAll({
            where: {
                student_id: req.params.student_id,
            },
            limit: per_page,
            offset: (page - 1) * per_page,
            order: ['id'],
        });

        if (!checkins) {
            return res.status(400).json({
                error: "The studenty don't make any checkin in the gym",
            });
        }

        return res.json(checkins);
    }

    async store(req, res) {
        const { student_id } = req.params;

        const student = await Student.findByPk(student_id);

        if (!student) {
            return res.status(400).json({ error: 'Invalid student' });
        }

        const current_date = new Date();
        const last_week = subDays(current_date, 7);

        const total_checkins = await Checkin.findAndCountAll({
            where: {
                student_id,
                created_at: {
                    [Op.between]: [
                        startOfDay(last_week),
                        endOfDay(current_date),
                    ],
                },
            },
        });

        if (total_checkins.count === 5) {
            return res.status(401).json({
                error:
                    "You're limited to make only 5 checkins during 7 consecutive days",
            });
        }

        const checkin = await Checkin.create({
            student_id,
        });

        return res.json(checkin);
    }
}

export default new CheckinController();
