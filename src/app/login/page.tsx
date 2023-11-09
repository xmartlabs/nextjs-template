"use client";

import { FormEventHandler, useState } from "react";

import { Button } from "@/common/button";
import { TextField } from "@/common/text-field";
import styles from "./login.module.scss";
import { SessionsController } from "@/networking/controllers/sessions-controller";
import { ApiError } from "@/networking/api-error";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<ApiError | null>(null);
  const router = useRouter();

  const formValid = !!email && !!password;

  const onSubmit: FormEventHandler = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await SessionsController.login(email, password);
      router.push("/");
    } catch (error) {
      console.log(error);
      setError(error as ApiError);
    }
  };

  return (
    <div className={styles.container}>
      <form className={styles.form} onSubmit={onSubmit}>
        <TextField
          className={styles.field}
          label="Email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          className={styles.field}
          label="Password"
          name="password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        {!!error && <p>{error.message}</p>}
        <Button
          className={styles.submitButton}
          type="submit"
          disabled={!formValid}
        >
          Submit
        </Button>
      </form>
    </div>
  );
}
