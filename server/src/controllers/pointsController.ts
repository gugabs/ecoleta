import {Request, Response} from "express";
import knex from "../database/connection";

class PointsController
{
    async create(request: Request, response: Response)
    {
        const {
            name,
            email,
            whatsapp,
            state,
            city,
            latitude,
            longitude,
            items
        } = request.body;
    
        const trx = await knex.transaction();
    
        const insertedId = await trx("points").insert({
            name,
            email,
            whatsapp,
            state,
            city,
            latitude,
            longitude,
            image: request.file.filename
        });
    
        const point_id = insertedId[0];
    
        const itemsOfPoint = items
            .split(',')
            .map((item: string) => Number(item.trim()))
            .map((item_id: number) => {

                return {

                    point_id,
                    item_id

                }

        });
    
        await trx("points_items").insert(itemsOfPoint);
    
        await trx.commit();

        return response.json({ success: true });
    }

    async show(request: Request, response: Response)
    {
        const {
            id
        } = request.params;

        const point = await knex("points").where("id", id).first();

        if(!point)
            return response.status(400).json({ message: "Point not found." });

        const items = await knex("items")
            .join("points_items", "items.id", "=", "points_items.item_id")
            .where("points_items.point_id", id)
            .select("items.title");

        return response.json({ point, items });
    }

    async index(request: Request, response: Response)
    {
        const { state, city, items } = request.query;

        const parsedItems = String(items)
            .split(',')
            .map(item => Number(item.trim()));

        const points = await knex("points")
            .join("points_items", "points.id", "=", "points_items.point_id")
            .whereIn("points_items.item_id", parsedItems)
            .where("state", String(state))
            .where("city", String(city))
            .distinct()
            .select("points.*")

        return response.json(points);
    }
}

export default PointsController;
