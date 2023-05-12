const express = require('express');
const nodemailer = require('nodemailer');

async function sendEmail(user) {
    // create a transport object
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'tvoj.mealplanner@gmail.com',
        pass: 'wlyfkrntpccakimn'
      }
    });
  
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: 'tvoj.mealplanner@gmail.com',
      to: user.email,
      subject: 'Register confirmation',
      text: 'Hello ' + user.name +  '\n' + '\n' +

      'Thank you for registering with MealPlanner. We\'re glad to have you as part of our community!' + '\n' +
      
      'Your account has been activated, and you can now sign in with your username and password.' + '\n' +
      
      'If you\'ve forgotten your password, you can use our password reset feature, which will send instructions to your email address.' + '\n' +
      
      'If you have any questions or experience any issues while using our website, please contact us.' + '\n' +
      
      'We hope you enjoy your experience on our website!' + '\n' + '\n' +

      'Best wishes,' + '\n' +

      'MealPlanner'
    });
  
    console.log('Message sent: %s', info.messageId);
  };

  module.exports.sendEmail = sendEmail;