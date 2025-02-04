"use server";

import { compare, hash } from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  return await hash(password, Number(process.env.SALT ?? 10));
};

/**
 * Returns boolean by compare password.
 *
 * @remarks
 * This method is part of the {@link utils/password}.
 *
 * @param password - 1st input number
 * @param hash - The second input number
 * @returns The boolean mean of `password` and `hash`
 *
 * @beta
 */
export const comparePassword = async (
  password: string,
  hash: string,
): Promise<boolean> => {
  return await compare(password, hash);
};
