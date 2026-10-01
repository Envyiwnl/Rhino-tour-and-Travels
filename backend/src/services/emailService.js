import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const subjectLabels = {
  general: "General Enquiry",
  trip: "Trip Planning",
  booking: "Booking Enquiry",
  feedback: "Feedback",
};

export const sendContactEmail = async ({
  name,
  email,
  phone,
  subject,
  message,
}) => {
  return transporter.sendMail({
    from: `"${process.env.EMAIL_FROM_NAME}" <${process.env.SMTP_USER}>`,
    to: process.env.CONTACT_RECEIVER_EMAIL,
    replyTo: email,

    subject: `Website Contact: ${subjectLabels[subject] || subject}`,

    text: `
New contact enquiry from Rhino Tours & Travels website

Name: ${name}
Email: ${email}
Phone: ${phone || "Not provided"}
Subject: ${subjectLabels[subject] || subject}

Message:
${message}
    `.trim(),
  });
};
