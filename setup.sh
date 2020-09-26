# Install python dependencies
python3 -m venv .env
pip3 install -r server/db-auth-services/requirements.txt

# Make Migrations
python3 server/db-auth-services/db-auth/manage.py makemigration
python3 server/db-auth-services/db-auth/manage.py migrate

# Intall npm package
npm install --prefix server
npm run build --prefix server
cd server && npx prisma generate
cd ..
