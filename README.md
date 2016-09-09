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
POST /login username/password #login
POST /register username/password/password_confirmation #register an user
GET /api/tasks # get all tasks
GET /api/tastks/:task_id # get a task with task_id
PUT /api/tastks/:task_id # complete a task
POST /api/tasks title/desc # create a task
DELETE /api/tasks/:task_id # delete a task
```