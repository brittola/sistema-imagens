# sistema-imagens
API REST de upload e compartilhamento de imagens (como o site Imgur).<br/>
Projeto criado para praticar testes com Jest, além de fixar conceitos como<br/>
middlewares, autenticação com JWT e arquitetura de projeto.

### O que foi utilizado?
- Express
- Bcrypt
- JWT
- MongoDB (Mongoose)
- Multer
- Jest

### Como funciona o salvamento de imagens?
O servidor tem um diretório /media, que salva o arquivo das imagens recebidas.<br/>
No banco de dados, é salvo o nome da imagem gerado no processo de salvamento + id do usuário que fez upload.

-------------------------------------------------------------------
## Endpoints - Usuário
### POST /user
**Parâmetros**
- Recebe um JSON com {email, name, password} (strings) e cria um usuário no banco de dados, caso não haja um com o mesmo e-mail.

**Respostas**
- Status 400 se *email, name* ou *password* forem inválidos ou se já houver usuário cadastrado com o email recebido;
- Status 200 + JSON com email do novo usuário cadastrado, se criação ocorrer com sucesso.

### POST /auth
**Parâmetros**
- Recebe um JSON com {email, password} (strings) e verifica se há usuário com o email, comparando a senha com hash se houver.

**Respostas**
- Status 400 se não houver usuário com aquele e-mail ou se não receber senha na requisição;
- Status 401 se a senha estiver incorreta;
- Status 200 + JSON com JWT caso as credenciais estejam corretas.

-------------------------------------------------------------------
## Endpoints - Imagens

### POST /image
**Parâmetros**
- Recebe uma imagem via Multipart Form (multipart/form-data);
- Recebe JWT no cabeçalho da requisição.

**Respostas**
- Status 401 caso o JWT seja inválido;
- Status 400 caso imagem não seja enviada;
- Status 200 + JSON com url de compartilhamento da imagem e nome do arquivo salvo (para testes).

### GET /image/:id
**Parâmetros**
- Recebe o id da imagem pela url.

**Respostas**
- Status 404 caso não haja imagem salva com o id recebido;
- Arquivo de imagem caso id seja válido.

### DELETE /image/:id
**Parâmetros**
- Recebe o id da imagem pela url;
- Recebe JWT no cabeçalho da requisição.

**Respostas**
- Status 401 caso o JWT seja inválido;
- Status 400 caso imagem não seja encontrada com aquele id ou não pertença ao usuário que solicitou exclusão;
- Status 200 caso imagem seja deletada com sucesso.
