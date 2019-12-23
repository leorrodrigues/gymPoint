import { format, parseISO, getYear } from 'date-fns';
import { resolve } from 'path';

import Mail from '../../lib/Mail';

class AnswerdQuestion {
	get key() {
		return 'answerdconfirmationMail';
	}

	async handle({ data }) {
		const { order, name, email } = data;

		const img_path = resolve(__dirname, '..', '..', '..', 'images');

		await Mail.sendMail({
			to: `${name} <${email}>`,
			subject: 'Your question has been answerd',
			template: 'answer_question',
			context: {
				name,
				question: order.question,
				answer: order.answer,
				answer_date: format(
					parseISO(order.answer_at),
					" dd MMMM', at' H:mm'h'"
				),
				year: getYear(new Date()),
			},
			attachments: [
				{
					filename: 'question.jpg',
					path: resolve(img_path, 'question.jpg'),
					cid: 'question',
					// content: request(opts.imageUrl), // <-- Error here
				},
				{
					filename: 'fb_logo.png',
					path: resolve(img_path, 'fb_logo.png'),
					cid: 'fb_logo',
					// content: request(opts.imageUrl), // <-- Error here
				},
				{
					filename: 'twitter_logo.png',
					path: resolve(img_path, 'twitter_logo.png'),
					cid: 'twitter_logo',
					// content: request(opts.imageUrl), // <-- Error here
				},
			],
		});
	}
}

export default new AnswerdQuestion();
