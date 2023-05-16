const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(express.json());

app.post('/api/client', async (req, res) => {      
  try {
    const { name, number,mensagem } = req.body;
   
    // Aqui você pode adicionar a lógica necessária para manipular os dados do cliente
    
    console.log(name)
    console.log(number)


    const body = {
        "type": "0",
        "token": "OFJ50-97793-20246-96818",
        "numero": "55"+number,
        "text": mensagem
      };
  
  
    response = await axios.post('https://app.growhats.com.br/sendmsg/', body)
   
    
    
    if (!name | !number | !mensagem) {
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