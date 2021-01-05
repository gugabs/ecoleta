<p align="center">
<img src="https://github.com/gugabs/ecoleta/blob/main/web/src/assets/img/home-background.svg" width="450px">
</p>

<hr>

# :recycle: Ecoleta
<p align="justify">
<b>Ecoleta</b> é uma aplicação desenvolvida durante a Next Level Week (1.0) da <b>Rocketseat</b> utilizando as tecnologias TypeScript, NodeJS e React.
</p>

# :rocket: Objetivo
<p align="justify">
Com o objetivo de solucionar o problema do descarte inadequado de lixo e facilitar o processo de reciclagem, a aplicação tem a finalidade de conectar entidades que coletam  resíduos (sejam eles orgânicos ou inorgânicos) a pessoas e/ou entidades que necessitam constantemente descartar esses tipos de resíduos.
</p>

# :hammer_and_wrench: Tecnologias

Server (NodeJS + TypeScript)
<ul>
  <li>CORS</li>
  <li>Express</li>
  <li>KnexJS</li>
  <li>SQLite</li>
  <li>ts-node</li>
</ul>

Website (React + TypeScript)
<ul>
  <li>Axios</li>
  <li>React Dropzone</li>
  <li>React Icons</li>
  <li>React Leaflet</li>
  <li>React Router Dom</li>
  <li>Leaflet</li>
</ul>

# :heavy_check_mark: Como utilizar

### Configurações iniciais

Primeiro, você deve possuir o <b>NodeJS</b> instalado em sua máquina.
<br><br>
Após isso, instale as dependências do <b>React</b>.

```
$ npm install create-react-app -g
```

Em seguida, instale as dependências contidas nos arquivos <b>package.json</b> que se encontram no diretório do <b>servidor</b> e no diretório do <b>website</b>.
<br>
```
# Instalando as dependências do servidor:

$ cd ./ecoleta/server
$ npm install

# Instalando as dependências do website:

$ cd ./ecoleta/web
$ npm install
```

### Utilizando o servidor

```
# Abrindo o diretório do servidor:

$ cd ./ecoleta/server

# Executando a aplicação em modo de desenvolvimento:

$ npm run dev

# Criando o banco de dados:

$ npm run knex:migrate

# Povoando o banco de dados:

$ npm run knex:seed
```

### Utilizando o website

```
# Abrindo o diretório do website:

$ cd ./ecoleta/web

# Executando a aplicação em modo de desenvolvimento:

$ npm start
```

# :page_facing_up: Licença

Este repositório está licenciado nos termos da licença <b>MIT</b>.
