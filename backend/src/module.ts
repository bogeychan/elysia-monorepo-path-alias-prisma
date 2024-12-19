import { Elysia, t } from "elysia";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const plugin = new Elysia().group("/users", (app) =>
  app
    .post("/", ({ body }) => prisma.user.create({ data: body }), {
      body: t.Object({
        name: t.String(),
        email: t.String({ format: "email" }),
      }),
    })
    .get("/", () => prisma.user.findMany())
    .get(
      "/:id",
      ({ params: { id } }) => prisma.user.findUnique({ where: { id } }),
      { params: t.Object({ id: t.Number() }) }
    )
);
