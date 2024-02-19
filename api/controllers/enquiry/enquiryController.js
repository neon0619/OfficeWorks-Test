const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

const submitEnquiry = (req, res) => {
  const { name, email, message } = req.body;

  const emailContent = {
    to: email,
    from: 'career.christopher.castillo@gmail.com',
    subject: 'New Enquiry',
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  sgMail.send(emailContent)
    .then(() => {
      console.log('Email sent');
      res.json({ message: 'Thank you for your enquiry!' });
    })
    .catch((error) => {
      console.error(error);
      res.status(500).json({ error: 'Internal server error' });
    });
};

module.exports = {
  submitEnquiry,
};
