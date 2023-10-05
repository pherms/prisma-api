import {db} from "../src/utils/db.server";

type User = {
    fullName: string;
    emailAddress: string;
};

type Authentication = {
    password: string;
    salt: string;
};

async function seed() {
    await Promise.all(
        getUsers().map((User) => {
            return db.user.create({
                data: {
                    fullName: User.fullName,
                    emailAddress: User.emailAddress
                }
            })
        })
    );
    const user = await db.user.findFirst({
        where: {
            fullName: "Pascal Herms",
        },
    });

    await Promise.all(
        getAuthentication().map((Authentication) => {
            const {password,salt} = Authentication;
            return db.authentication.create({
                data: {
                    password: Authentication.password,
                    salt: Authentication.salt,
                    userId: user.id,
                },
            });
        })
    );
}

seed();

function getUsers(): Array<User> {
    return [
        {
            fullName: "Pascal Herms",
            emailAddress: "pherms@outlook.com",
        },
        {
            fullName: "Tinus Teennagel",
            emailAddress: "tinus.teennagel@outlook.com",
        }
        ,
        {
            fullName: "Jannes Soepstengel",
            emailAddress: "jsoepstengel@gmail.com",
        }
    ]
}

function getAuthentication(): Array<Authentication> {
    return [
        {
            password: "Supergeheeim",
            salt: "randomnumbers",
        },
        {
            password: "Supergeheeim",
            salt: "randomnumbers",
        },
        {
            password: "Supergeheeim",
            salt: "randomnumbers",
        }
    ]
}