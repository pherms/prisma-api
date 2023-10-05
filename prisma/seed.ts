import {db} from "../src/utils/db.server";

type User = {
    fullName: string;
    emailAddress: string;
    password: string;
    salt: string;
    isActive: boolean;
    forgotPassword: string
};

async function seed() {
    await Promise.all(
        getUsers().map((User) => {
            return db.user.create({
                data: {
                    fullName: User.fullName,
                    emailAddress: User.emailAddress,
                    password: User.password,
                    salt: User.salt,
                    isActive: User.isActive,
                    forgotPassword: User.forgotPassword,
                }
            })
        })
    );
    const user = await db.user.findFirst({
        where: {
            fullName: "Pascal Herms",
        },
    });
}

seed();

function getUsers(): Array<User> {
    return [
        {
            fullName: "Pascal Herms",
            emailAddress: "pherms@outlook.com",
            password: "randompassword1",
            salt: "asdjfhsjlkefsjklg",
            isActive: true,
            forgotPassword: "",
        },
        {
            fullName: "Tinus Teennagel",
            emailAddress: "tinus.teennagel@outlook.com",
            password: "iwe rioq4w erhfjawelfhqwekf",
            salt: "82347589345709345730",
            isActive: true,
            forgotPassword: "sjdkfhgjsdfhgsjkldfg",
        }
        ,
        {
            fullName: "Jannes Soepstengel",
            emailAddress: "jsoepstengel@gmail.com",
            password: "dflsghjsdlfghjsdfjlghsjdfklgh sjkdfgl ksd",
            salt: "9348758903475893",
            isActive: true,
            forgotPassword: "skhjdfg;sldhfjaskhgsjkdfgkhjsdfg",
        }
    ]
}
