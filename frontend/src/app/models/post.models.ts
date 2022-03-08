export class Post {
    id!: number;
    title!: string;
    content!: string;
    attachment!: string;
    likes!: number;
    UserId!: number;
    createdAt!: Date;
    updatedAt!: Date;
    User!: {
        username: string
    };
}