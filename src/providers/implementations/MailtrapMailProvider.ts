import { IMailProvider, IMessage } from "../IMailProvider"
import nodemailer from 'nodemailer'
import Mail from "nodemailer/lib/mailer"

export class MailtrapMailProvider implements IMailProvider {
    private transporter: Mail

    constructor() {
        this.transporter = nodemailer.createTransport({
            host: 'put your host here',
            port: 2525,
            auth: {
                user: 'seu usuario',
                pass: 'sua senha'
            }
        })
    }

    async sendMail(message: IMessage): Promise<void> {
        await this.transporter.sendMail({
            to: {
                name: message.to.name,
                address: message.to.email
            },
            from: {
                name: message.from.name,
                address: message.from.email
            },
            subject: message.subject,
            html: message.body
        })
    }
}
