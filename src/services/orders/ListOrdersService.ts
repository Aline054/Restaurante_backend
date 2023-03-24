import prismaClient from "../../prisma";

class ListOrdersService{
    async execute(){

        const orders = await prismaClient.order.findFirst({
            where:{
                draft: false,
                status: false,
            },
            orderBy:{
                created_at: 'desc'
            }
        })
        return orders;

    }
}

export { ListOrdersService}