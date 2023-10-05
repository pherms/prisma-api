import {db} from "../src/utils/db.server";

type User = {
    fullName: string;
    emailAddress: string;
    userName: string;
    password: string;
    salt: string;
    sessionToken: string;
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
                    userName: User.userName,
                    password: User.password,
                    salt: User.salt,
                    sessionToken: User.sessionToken,
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
            userName: "pherms",
            password: "randompassword1",
            salt: "asdjfhsjlkefsjklg",
            sessionToken: "",
            isActive: true,
            forgotPassword: "",
        },
        {
            fullName: "Tinus Teennagel",
            emailAddress: "tinus.teennagel@outlook.com",
            userName: "tteennagel",
            password: "iwe rioq4w erhfjawelfhqwekf",
            salt: "82347589345709345730",
            sessionToken: "",
            isActive: true,
            forgotPassword: "sjdkfhgjsdfhgsjkldfg",
        }
        ,
        {
            fullName: "Jannes Soepstengel",
            emailAddress: "jsoepstengel@gmail.com",
            userName: "jsoepstengel",
            password: "dflsghjsdlfghjsdfjlghsjdfklgh sjkdfgl ksd",
            salt: "9348758903475893",
            sessionToken: "",
            isActive: true,
            forgotPassword: "skhjdfg;sldhfjaskhgsjkdfgkhjsdfg",
        }
    ]
}
