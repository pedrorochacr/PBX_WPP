const express = require('express');
const axios = require('axios');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
require('dotenv').config();
app.use(express.json());
app.post('/api/client', async (req, res) => {      
  try {
    const { name, number,mensagem, token, urlImagem, urlArquivo, nomeArquivo  } = req.body;
       
    console.log(name)
    console.log(number)

    if(mensagem && !urlImagem){
      console.log("Enviou mensagem")
      const body = {
        "type": "0",
        "token": token,
        "numero": "55"+number,
        "text": mensagem
      };
      response = await axios.post(process.env.APIWhatssApp, body);
    }
    if(urlImagem){
      const body = {
        "type": "1",
        "token": token,
        "numero": "55"+number,
        "text": mensagem,
        "url_arquivo": urlImagem
      };
      response = await axios.post(process.env.APIWhatssApp, body);
    }
    if(urlArquivo){
      const body = {
        "type": "2",
        "token": token,
        "numero": "55"+number,
        "filename": nomeArquivo,
        "url_arquivo": urlArquivo


      };
      response = await axios.post(process.env.APIWhatssApp, body);
    }

    console.log(response.data)
    if (!name | !number ) {
      console.log("Faltando alguma variável")
      return res.status(400).json({ error: 'Nome e número  são obrigatórios' });
    }
    else{
      console.log("Sucesso!")
      return res.status(200).json({mensagem:"solicitação enviada com sucesso", name: name})
    }
    
  } catch (error) {
    console.error('Erro na chamada da segunda API:', error);
    res.status(500).json({ error: error });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});