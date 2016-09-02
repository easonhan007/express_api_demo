# Setup

## Install coffee-script and sequelize
```
cnpm install -g coffee-script
cnpm install -g sequelize-cli
```

## Install dependencies  
```
git clone
cd express_api_demo
npm install #or cnpm install
```

## Database config
* modify config/config.json
* create a database smile_task_development

```
sequelize db:migrate
```

## Run

```
npm start
```

# API
```
POST /login username/password
POST /register username/password/password_confirmation
GET /api/tasks
GET /api/tastks/:task_id
POST /api/tasks title/desc
DELETE /api/tasks/:task_id
```

# TODO

add finish task api
