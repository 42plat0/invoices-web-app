import {hash, compare} from "bcryptjs";

export const hashPw = async (pw) => await hash(pw, 10);

export const isCorrPw = async (pw, dbPw) => await compare(pw, dbPw);

