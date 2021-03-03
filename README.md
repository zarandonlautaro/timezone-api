# World clock API

Is a Express JS application for dealing the timezone around the world.

## Installation

#### USING DOCKER

Attention before to make docker compose verify if you have both images _timezone-app_ & _image'timezone-api_

```bash
 git clone https://github.com/zarandonlautaro/timezone-api
 cd timezone-api
```

```bash
 docker build -t timezone-api .
 cd development/timezone-pwa
 docker-compose up --build
```

## Usage

Access by

```bash
http://localhost:8000/
```

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
