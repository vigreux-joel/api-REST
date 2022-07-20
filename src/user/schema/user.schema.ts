import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt';
import {User} from "../entities/user.entity";

export type UserDocument = User & Document;

export const UserSchema = SchemaFactory.createForClass(User);

const SALT_WORK_FACTOR = 10;

// UserSchema.pre('save', function(next) {
//     let user = this;
//
//     if (!user.isModified('password')) return next();
//
//
//     bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
//         if (err) return next(err);
//         bcrypt.hash(user.password, salt, function(err, hash) {
//             if (err) return next(err);
//             user.password = hash;
//             next();
//         });
//     });
// });

// UserSchema.pre('findOneAndUpdate', async function (next) {
//     let update = {...this.getUpdate()};
//     try {
//         if (update['$set'].password) {
//             update['$set'].password = await bcrypt.hash(update['$set'].password, 10);
//         }
//         next();
//     } catch (err) {
//         return next(err);
//     }
// });

// UserSchema.methods.comparePassword = function(candidatePassword, cb) {
//     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
//         if (err) return cb(err);
//         cb(null, isMatch);
//     });
// };
