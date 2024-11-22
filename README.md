[![Build Status](https://runbot.odoo.com/runbot/badge/flat/1/master.svg)](https://runbot.odoo.com/runbot)
[![Tech Doc](https://img.shields.io/badge/master-docs-875A7B.svg?style=flat&colorA=8F8F8F)](https://www.odoo.com/documentation/master)
[![Help](https://img.shields.io/badge/master-help-875A7B.svg?style=flat&colorA=8F8F8F)](https://www.odoo.com/forum/help-1)
[![Nightly Builds](https://img.shields.io/badge/master-nightly-875A7B.svg?style=flat&colorA=8F8F8F)](https://nightly.odoo.com/)

Odoo
----

Odoo is a suite of web based open source business apps.

The main Odoo Apps include an <a href="https://www.odoo.com/page/crm">Open Source CRM</a>,
<a href="https://www.odoo.com/app/website">Website Builder</a>,
<a href="https://www.odoo.com/app/ecommerce">eCommerce</a>,
<a href="https://www.odoo.com/app/inventory">Warehouse Management</a>,
<a href="https://www.odoo.com/app/project">Project Management</a>,
<a href="https://www.odoo.com/app/accounting">Billing &amp; Accounting</a>,
<a href="https://www.odoo.com/app/point-of-sale-shop">Point of Sale</a>,
<a href="https://www.odoo.com/app/employees">Human Resources</a>,
<a href="https://www.odoo.com/app/social-marketing">Marketing</a>,
<a href="https://www.odoo.com/app/manufacturing">Manufacturing</a>,
<a href="https://www.odoo.com/">...</a>

Odoo Apps can be used as stand-alone applications, but they also integrate seamlessly so you get
a full-featured <a href="https://www.odoo.com">Open Source ERP</a> when you install several Apps.

Getting started with Odoo
-------------------------

For a standard installation please follow the <a href="https://www.odoo.com/documentation/master/administration/install/install.html">Setup instructions</a>
from the documentation.

To learn the software, we recommend the <a href="https://www.odoo.com/slides">Odoo eLearning</a>, or <a href="https://www.odoo.com/page/scale-up-business-game">Scale-up</a>, the <a href="https://www.odoo.com/page/scale-up-business-game">business game</a>. Developers can start with <a href="https://www.odoo.com/documentation/master/developer/howtos.html">the developer tutorials</a>


Installing Odoo
-------------------------
1. Install **Python 3.10** or later
2. Create a **PostreSQL** database and a user
````
CREATE USER odoo WITH PASSWORD 'odoo_password';
ALTER USER odoo CREATEDB;
CREATE DATABASE odoo_db OWNER odoo;
````
3. Create the `odoo.conf` file in the root directory and add the database configuration
```
addons_path = addons
db_host = localhost
db_name = odoo_db
db_password = odoo_password
db_port = 5432
db_user = odoo
```
4. Create a python virtual environment and install the dependencies
```
python -m venv odoo-venv
odoo-venv\Scripts\activate
pip install -r requirements.txt
```
5. Upgrade the database and run Odoo. 
```
python odoo-bin -c odoo.conf -d odoo_db -u all
```
Wait until you see the message *Registry loaded* and check that the database was successfully upgraded. (There should be many tables created)

Open the browser and navigate to http://localhost:8069 to see the project. Login with the admin user.
- email: admin
- password: admin

6. Go to **Apps** and activate the **Point of Sale** app.

After completing these steps, you can also run Odoo with the following command. 
````
python odoo-bin -c odoo.conf --dev xml
````
This command will reflect changes made to xml files by just refreshing the page instead of restarting the server. 