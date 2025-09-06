import { StringExpressionOperatorReturningBoolean } from "mongoose";
import User from "../model/User";
import catchError from "../utils/catchError";
import { Request, Response } from "express";

type DuplicateErrors = {
    displayName?: string;
    email?: string;
}

type RegisterBody = {
    firstName: string;
    lastName: string;
    email: string;
    displayName: string;
    password: string;
}

const registerHandler = catchError(async (req: Request<{}, {}, RegisterBody>, res: Response) => {
    const { firstName, lastName, email, displayName, password } = req.body;

    const [duplicateDisplayName, duplicateEmail] = await Promise.all([
        User.findOne({ displayName }),
        User.findOne({ email }),
    ]);

    const errors: DuplicateErrors = {};
    if (duplicateDisplayName) {
        errors.displayName = "Display Name Already Taken";
    }
    if (duplicateEmail) {
        errors.email = "Email Already Taken";
    }

    if (Object.keys(errors).length > 0) {
        return res.status(409).json({ errors });
    }

    const newUser = new User({
        firstName,
        lastName,
        email,
        displayName,
        password,
    });
    await newUser.save()
    return res.status(201).json(newUser.omitPassword())
})

export default registerHandler