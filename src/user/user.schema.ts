import {Prop, Schema, SchemaFactory} from '@nestjs/mongoose';
import {Document} from 'mongoose';
import * as bcrypt from 'bcrypt';

export type UserDocument = User & Document;

@Schema()
export class User {
    @Prop({
        required: true,
    })
    firstname: string;

    @Prop({
        required: true,
    })
    lastname: string;


    @Prop({
        required: true,
        unique: true,
    })
    email: string;

    @Prop({
    })
    tel: string;

    @Prop({
        required: true,
        minLength: 8
    })
    password: string;

    @Prop({
        type: Date,
    })
    createdAt: Date;




}

export const UserSchema = SchemaFactory.createForClass(User);



const SALT_WORK_FACTOR = 10;

UserSchema.pre('save', function(next) {
    let user = this;

    if (!user.isModified('password')) return next();


    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

UserSchema.pre('findOneAndUpdate', async function (next) {
    let update = {...this.getUpdate()};
    try {
        if (update['$set'].password) {
            update['$set'].password = await bcrypt.hash(update['$set'].password, 10);
        }
        next();
    } catch (err) {
        return next(err);
    }
});

UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if (err) return cb(err);
        cb(null, isMatch);
    });
};
