import { treaty } from "@elysiajs/eden";
import { type app } from "@backend";

const api = treaty<app>("localhost:3000");

let userId: number;

{
  const name = crypto.randomUUID();

  const { data } = await api.users.index.post({
    name,
    email: `${name}@mail.com`,
  });

  console.log("Insert user: ", data);

  userId = data!.id;
}

{
  const { data } = await api.users.index.get();

  console.log("Get all users: ", data);
}

{
  const { data } = await api.users({ id: userId }).get();

  console.log("Get User: ", data);
}
