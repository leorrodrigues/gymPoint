import { format, parseISO, getYear } from 'date-fns';
import { resolve } from 'path';

import Mail from '../../lib/Mail';

class Confirmationconfirmation {
    get key() {
        return 'confirmationconfirmationMail';
    }

    async handle({ data }) {
        const { confirmation } = data;

        const img_path = resolve(__dirname, '..', '..', '..', 'images');

        await Mail.sendMail({
            to: `${confirmation.student_name} <${confirmation.student_email}>`,
            subject: 'Confirmation',
            template: 'confirmation',
            context: {
                name: confirmation.student_name,
                plan: confirmation.plan_title,
                end_date: format(
                    parseISO(confirmation.end_date),
                    "dd MMMM', at' H:mm'h'"
                ),
                price: confirmation.plan_price,
                price_total: confirmation.total_price,
                year: getYear(new Date()),
            },
            attachments: [
                {
                    filename: 'welcome.jpg',
                    path: resolve(img_path, 'welcome.jpg'),
                    cid: 'welcome',
                    // content: request(opts.imageUrl), // <-- Error here
                },
                {
                    filename: 'enroll.jpg',
                    path: resolve(img_path, 'enroll.jpg'),
                    cid: 'enroll',
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

export default new Confirmationconfirmation();
