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
    Comments!: [
        {
            id: number;
            postId: number;
            userId: number;
            content: string;
            createdAt: Date;
            user: {
                username:string;
            }
        }
    ]
    Likes!: [
        {
            postId: number,
            userId: number
        }
    ]
}