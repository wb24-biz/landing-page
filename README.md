# landing-page wb24.biz

Запрос для формы регистрации
https://dev.wb24.biz/swaggerui/#/Registration/post_signup_new

# Installing
Покрокова інструкція з розгортання Next.js на VPS
1. Підготовка VPS

    ОС: Зазвичай Ubuntu 22.04 LTS.

    Доступ: Підключись по SSH

    ssh username@your_server_ip

2. Встановлення Node.js та npm

curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
node -v
npm -v

3. (Рекомендовано) Встанови git

sudo apt-get install git

4. Передача коду на сервер

    Через git:

    git clone <ваш-репозиторій>
    cd <назва-папки>

    Або завантаж через SFTP (FileZilla, WinSCP) чи SCP.

5. Встановлення залежностей

npm install

6. Білд або запуск

    Білд (для продакшену, якщо потрібен SSR):

npm run build

Запуск:

    npm start

    або (якщо в тебе start викликає production сервер).

7. Налаштування процес-менеджера (PM2)

    PM2 забезпечує автозапуск та моніторинг процесу.

sudo npm install -g pm2
pm2 start npm --name "next-app" -- start
pm2 save
pm2 startup

Скопіюй команду, що видасть pm2 startup, та виконай її.
8. (Рекомендовано) Домен + HTTPS (Nginx як reverse proxy)

a) Встанови Nginx:

sudo apt install nginx

b) Додай проксі:
Відкрий файл /etc/nginx/sites-available/default і зміни (або створи новий під домен):

server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}

c) Перезапусти Nginx:

sudo systemctl restart nginx

d) SSL (через certbot):

sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx

9. Підтримка й оновлення

    Оновлення коду:

    git pull
    npm install
    npm run build
    pm2 restart next-app

Важливі деталі

    Port 3000 — стандартний для Next.js, проксі на 80/443 робить додаток публічно доступним.

    Захисти SSH — зміни порт, вимкни root-login, використовуй ключі.

    env-файли — не забудь скопіювати .env.production!

    PM2 логування:

pm2 logs
