import { z } from "zod";

export const CreateSession = z.object({
  email: z.string().email(),
  password: z.string(),
});

export type CreateSession = z.infer<typeof CreateSession>;
