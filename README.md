# MarketPlace

## API Rest para Gerenciamento de um E-commerce.

## Instalação

```
$ git clone https://github.com/FernandoCendretti/gonode-modulo-3.git
$ cd gonode-modulo-3/
$ npm install || yarn
```

É necessário ter o mongo e o redis instalado, caso tenha o Docker, basta executar os comandos:

```
sudo docker run --name mongonode -p 27017:27017 -d -t mongo
sudo docker run --name noderedis -p 6379:6379 -d -t redis:alpine
```

Para executar o sistema basta executar o comando:

```
yarn start
```
