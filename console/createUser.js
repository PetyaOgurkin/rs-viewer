const User = require("../models/User");
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const config = require('config');
const colors = require('colors');

async function create() {
    try {
        const login = process.argv[2]
        const password = process.argv[3]

        if (!login || !password) {
            return console.error(`
                Error, write [name] and [password]
                ----------------------------------
                npm run account [name] [password]
                ----------------------------------
                `.green);
        }

        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        })

        const candidate = await User.findOne({ login });
        if (candidate) {
            console.log('this login already exists'.red);
            process.exit();
        }

        const hashedPassword = await bcrypt.hash(password, 8);

        const user = new User({ login, password: hashedPassword })
        await user.save()

        console.log(`user ${login} has created`.yellow);
        process.exit();
    } catch (e) {
        console.log('error'.red, e.message.red);
        process.exit();
    }
}

create()