import {db} from "../src/utils/db.server";

type User = {
    fullName: string;
    emailAddress: string;
    userName: string;
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
            isActive: true,
            forgotPassword: "",
        },
        {
            fullName: "Tinus Teennagel",
            emailAddress: "tinus.teennagel@outlook.com",
            userName: "tteennagel",
            isActive: true,
            forgotPassword: "sjdkfhgjsdfhgsjkldfg",
        }
        ,
        {
            fullName: "Jannes Soepstengel",
            emailAddress: "jsoepstengel@gmail.com",
            userName: "jsoepstengel",
            isActive: true,
            forgotPassword: "skhjdfg;sldhfjaskhgsjkdfgkhjsdfg",
        }
    ]
}
