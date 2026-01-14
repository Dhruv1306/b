const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/uni_assignment';

async function seedAdmin(){
    await mongoose.connect(MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true});

    const email = 'admin@example.com';            // seed admin email (change as needed)
    const plainPassword = 'Admin@123';            // seed admin password (change after first run)

    // don't duplicate if already exists
    const existing = await User.findOne({ email });
    if (existing) {
        console.log('Admin already exists:', email);
        await mongoose.disconnect();
        return;
    }

    const hashed = await bcrypt.hash(plainPassword, 12);  // hash with bcrypt
    const admin = new User({ email, password: hashed, role: 'admin'});
    await admin.save();
    console.log('Admin created: ', email);
    await mongoose.disconnect();
}

seedAdmin().catch(err => {                  // Error case
  console.error('Seed error:', err);
  mongoose.disconnect();
  process.exit(1);
});