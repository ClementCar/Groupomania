export class Comment {
    id!: number;
    postId!: number;
    userId!: number;
    content!: string;
    createdAt!: Date;
    user!: {
        username: string;
    }
}