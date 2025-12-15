require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Servir arquivos estáticos (HTML, CSS, JS)
app.use(express.static('.'));

// Configuração do Nodemailer com Gmail
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: process.env.EMAIL_SECURE === 'true', // true para porta 465, false para outras portas
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Verificar conexão com o servidor SMTP
transporter.verify((error, success) => {
  if (error) {
    console.log('❌ Erro ao conectar com o servidor de email:', error);
    console.log('⚠️  Verifique as credenciais no arquivo .env');
  } else {
    console.log('✅ Servidor de email pronto para enviar mensagens');
  }
});

// Endpoint para receber dados do formulário
app.post('/api/contact', async (req, res) => {
  const { name, email, phone, company } = req.body;

  // Validação básica
  if (!name || !email || !phone) {
    return res.status(400).json({
      success: false,
      message: 'Por favor, preencha todos os campos obrigatórios.'
    });
  }

  // Configuração do email
  const mailOptions = {
    from: `"Prolicen - Formulário de Contato" <${process.env.EMAIL_FROM}>`,
    to: process.env.EMAIL_TO,
    replyTo: email,
    subject: `Nova solicitação de demonstração - ${name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
          }
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f9f9f9;
          }
          .header {
            background-color: #6fa647;
            color: white;
            padding: 20px;
            text-align: center;
            border-radius: 5px 5px 0 0;
          }
          .content {
            background-color: white;
            padding: 30px;
            border-radius: 0 0 5px 5px;
          }
          .field {
            margin-bottom: 15px;
            padding: 10px;
            background-color: #f5f5f5;
            border-left: 4px solid #6fa647;
          }
          .label {
            font-weight: bold;
            color: #6fa647;
          }
          .footer {
            text-align: center;
            margin-top: 20px;
            font-size: 12px;
            color: #666;
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h2>Nova Solicitação de Demonstração</h2>
          </div>
          <div class="content">
            <p>Você recebeu uma nova solicitação de demonstração através do formulário de contato do site Prolicen.</p>

            <div class="field">
              <span class="label">Nome:</span><br>
              ${name}
            </div>

            <div class="field">
              <span class="label">E-mail:</span><br>
              <a href="mailto:${email}">${email}</a>
            </div>

            <div class="field">
              <span class="label">Telefone:</span><br>
              ${phone}
            </div>

            ${company ? `
            <div class="field">
              <span class="label">Empresa:</span><br>
              ${company}
            </div>
            ` : ''}

            <div class="footer">
              <p>Mensagem enviada automaticamente pelo sistema Prolicen</p>
              <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
            </div>
          </div>
        </div>
      </body>
      </html>
    `,
    text: `
      Nova Solicitação de Demonstração - Prolicen

      Nome: ${name}
      E-mail: ${email}
      Telefone: ${phone}
      ${company ? `Empresa: ${company}` : ''}

      Data: ${new Date().toLocaleString('pt-BR')}
    `
  };

  try {
    // Enviar email
    await transporter.sendMail(mailOptions);

    console.log(`✅ Email enviado com sucesso para ${process.env.EMAIL_TO}`);
    console.log(`📧 Contato: ${name} (${email})`);

    res.status(200).json({
      success: true,
      message: 'Obrigado! Sua solicitação foi enviada com sucesso. Entraremos em contato em breve.'
    });

  } catch (error) {
    console.error('❌ Erro ao enviar email:', error);

    res.status(500).json({
      success: false,
      message: 'Desculpe, ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.'
    });
  }
});

// Rota de teste
app.get('/api/status', (req, res) => {
  res.json({
    status: 'ok',
    message: 'Servidor Prolicen funcionando corretamente',
    timestamp: new Date().toISOString()
  });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
  console.log('🚀 Servidor Prolicen iniciado!');
  console.log(`📡 Rodando em: http://localhost:${PORT}`);
  console.log(`📧 Emails serão enviados para: ${process.env.EMAIL_TO}`);
  console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
});