const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());
app.post('/api/client', async (req, res) => {      
  try {
    const { name, number,mensagem, token } = req.body;
   
    // Aqui você pode adicionar a lógica necessária para manipular os dados do cliente
    
    console.log(name)
    console.log(number)


    const body = {
        "type": "0",
        "token": token,
        "numero": "55"+number,
        "text": mensagem
      };
     
    urlWpp = process.env.APIWhatssApp
    response = await axios.post(urlWpp, body)
    
    if (!name | !number ) {
      console.log("Faltando alguma variável")
      console.log(response.data)
      return res.status(400).json({ error: 'Nome, número e mensagem são obrigatórios' });
    }
    else{
      console.log("Sucesso!")
      console.log(response.data)
      return res.status(200).json({mensagem:"solicitação enviada com sucesso", name: name})
    }
  } catch (error) {
    console.error('Erro na chamada da segunda API:', error);
    res.status(500).json({ error: 'Erro na chamada da segunda API' });
  }
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});